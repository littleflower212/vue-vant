<template>
    <div class="van-index-container">
        <div class="linear-background">
            <!--搜索-->
            <van-search
                    v-model="searchForm.keywords"
                    placeholder="请输入搜索关键词"
                    shape="round"
                    @search="onSearch"></van-search>
            <!--快速导航-->
            <van-grid :border="false" :column-num="4">
                <van-grid-item v-for="(value, index) in list"
                               :key="value"
                               @click="goDetail(index)"
                               icon="photo-o"
                               text="文字"></van-grid-item></van-grid>
        </div>
        <!--广告位-->
        <div class="adv-banner">
            <van-swipe :autoplay="3000" indicator-color="orange">
                <van-swipe-item>
                    <van-image fit="cover"
                               width="100%"
                               height="100"
                               src="https://aecpm.alicdn.com/simba/img/TB1CWf9KpXXXXbuXpXXSutbFXXX.jpg_q50.jpg">
                    </van-image>
                </van-swipe-item>
                <van-swipe-item>
                    <van-image fit="cover"
                               width="100%"
                               height="100"
                               src="https://aecpm.alicdn.com/simba/img/TB14ab1KpXXXXclXFXXSutbFXXX.jpg_q50.jpg">
                    </van-image>
                </van-swipe-item>
                <van-swipe-item>
                    <van-image fit="cover"
                               width="100%"
                               height="100"
                               src="https://gw.alicdn.com/imgextra/i1/165/O1CN01C1N6061D5bvJQPJlt_!!165-0-lubanu.jpg">
                    </van-image>
                </van-swipe-item>
                <van-swipe-item>
                    <van-image fit="cover"
                               width="100%"
                               height="100"
                               src="https://gw.alicdn.com/imgextra/i2/127/O1CN01ly0Jun1CoCsCTOerq_!!127-0-lubanu.jpg">
                    </van-image>
                </van-swipe-item>
            </van-swipe>
        </div>
        <!--优惠专区-->
        <div class="index-item index-item__1">
            <p>优惠专区</p>
            <div class="on-sale-area">
                <van-grid :border="false" :column-num="3">
                    <van-grid-item v-for="n in 9" :key="n">
                        <van-image height="70" :src="imgList[n%3]" />
                        <p class="description">描述性文字</p>
                        <div class="van-row--flex van-row--align-center">
                            <div>
                                <p class="van-card__price sale-price">¥5699.00</p>
                                <p class="van-card__origin-price origin-price">¥7699.00</p>
                            </div>
                            <van-icon class="card-icon" @click="addToCart(imgList[n%3], $event)" name="cart-circle" />
                        </div>
                        <transition appear
                                    @before-appear="beforeEnter"
                                    @after-appear="afterEnter"
                                    v-for="(item,index) in showMoveDot"
                                    :key="index.id">
                            <div class="move_dot"
                                 :style="{left: elX + 'px', top: elY + 'px'}"
                                 ref="ball"
                                 v-if="item">
                                <img :src="dropImg"
                                     alt="">
                            </div>
                        </transition>
                    </van-grid-item>
                </van-grid>
            </div>
        </div>
    </div>
</template>

<script>
    import moveCartStore from '../store/moveCart'
    export default {
        name: "index",
        data() {
            return {
                isLoading: false,
                list: 8,
                searchForm: {
                    keywords: null
                },
                showMoveDot: [], // 控制下落的小圆点显示隐藏
                elX: 0,
                elY: 0,
                dropImg: null,
                imgList: ['https://img.yzcdn.cn/vant/apple-1.jpg', 'https://img.yzcdn.cn/vant/apple-2.jpg', 'https://img.yzcdn.cn/vant/apple-3.jpg']
            }
        },
        methods: {
            addToCart (product, e) {
                this.dropImg = product
                this.showMoveDot = [...this.showMoveDot, true];
                this.elX = e.target.getBoundingClientRect().left;
                this.elY = e.target.getBoundingClientRect().top;
                console.log('x:', this.elX)
                console.log('y:', this.elY)
                moveCartStore.commit('increment')
            },
            beforeEnter(el) {
                // 设置transform值
                el.style.left = this.elX - 30 + 'px'
                el.style.top = this.elY - 30
                // el.style.transform = `translate3d(${this.elX - 30}px,${this.elY - 30}px , 0)`;
                // 设置透明度
                el.style.opacity = 0;
            },
            afterEnter(el) {
                // 获取底部购物车徽标
                const badgePosition = document
                    .getElementById("shoppingCar")
                    .getBoundingClientRect();
                // 设置小球移动的位移
                el.style.left = badgePosition.left + 20 + 'px'
                el.style.top = badgePosition.top + 'px'
                // el.style.transform = `translate3d(${badgePosition.left}px,${badgePosition.top}px,0)`
                // 增加贝塞尔曲线
                el.style.transition = 'all .88s cubic-bezier(0.3, -0.25, 0.7, -0.15)';
                el.style.transition = 'all .88s linear';

                // eslint-disable-next-line
                this.showMoveDot = this.showMoveDot.map(item => false);
                // 设置透明度
                el.style.opacity = 1;

                el.addEventListener('transitionend', () => {
                    el.style.display = 'none';
                    this.listenInCart();
                })
                // 监听小球动画结束方法
                el.addEventListener('webkitAnimationEnd', () => {
                    el.style.display = 'none';
                    this.listenInCart();
                })

            },
            listenInCart () {
                // 拿到底部Tabbar购物车的DOM元素添加class
                document.getElementById("shoppingCar").classList.add('moveToCart');
                setTimeout(() => {
                    // 500毫秒后移除底部Tabbar购物车的DOM元素class
                    document.getElementById("shoppingCar").classList.remove('moveToCart');
                }, 500);
            },
            onSearch() {

            },
            onRefresh() {
                setTimeout(() => {
                    this.$toast('刷新成功');
                    this.isLoading = false;
                    this.list += 6
                }, 500);
            },
            goDetail(sysNo) {
                this.$router.push({'name': 'ProductDetail', params: {productSysNo: sysNo}})
            }
        }
    }
</script>

<style lang="scss" scoped>
    /deep/ {
        .van-search,
        .van-grid-item__content{
            background-color: transparent !important;
        }
        .van-grid-item{
            &__content {
                padding: 8px;
            }
            &__icon {
                width: 46px;
                height: 46px;
                background-color: wheat;
                text-align: center;
                line-height: 46px;
                border-radius: 50%;
                color: #fff;
            }
        }
        .van-swipe-item{
            img {
                width: 100%;
                height: 100px;
                display: block;
            }
            .van-image {
                display: block;
            }
            &:nth-child(even) {
                background-color: #85afed;
            }
            &:nth-child(odd) {
                background-color: #b1ddf2;
            }
        }
    }
    .adv-banner {
        margin-top: 20px;
    }
    .index-item {
        text-align: left;
        padding: 10px;
        color: #7d7e80;
    }
    .linear-background {
        background: linear-gradient(lightblue, white);
    }
    .van-index-container {
        min-height: 100%;
    }
    .default-button {
        min-width: 100px;
        font-size: 16px;
    }
    .on-sale-area {
        .description {
            font-size: 14px;
            color: #33333d;
            padding: 10px 0;
        }
        .sale-price {
            font-size: 12px;
        }
        .origin-price {
            margin-left: 0;
            font-size: 10px;
        }
        .card-icon {
            font-size: 20px;
            color: #04c504;
        }
    }
    .move_dot {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        /*background-color: red;*/
        position: fixed;
        z-index: 100;
        img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            animation: 0.9s mymove ease-in-out;
        }
    }
    @keyframes mymove {
        0% {
            transform: scale(1);
        }
        25% {
            transform: scale(0.8);
        }
        50% {
            transform: scale(0.6);
        }
        75% {
            transform: scale(0.4);
        }
        100% {
            transform: scale(0.2);
        }
    }
    /deep/ .moveToCart {
        animation: mymove 0.5s ease-in-out;
    }
</style>