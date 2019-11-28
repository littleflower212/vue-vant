<template>
    <div class="van-container">
        <template v-if="!$route.meta.hideHeader">
            <van-nav-bar v-if="$route.meta.indexTab"
                         :title="$route.meta.title"></van-nav-bar>
            <van-nav-bar
                    v-else
                    :title="$route.meta.title"
                    left-text="返回"
                    left-arrow
                    @click-left="onClickLeft"
                    @click-right="onClickRight"></van-nav-bar>
        </template>
        <div class="van-content-container">
            <router-view></router-view>
        </div>
        <van-tabbar v-model="tabActive" v-if="$route.meta.indexTab">
            <van-tabbar-item name="home" icon="home-o" @click="goPage('home')">首页</van-tabbar-item>
            <van-tabbar-item name="search" icon="search" @click="goPage('category')">分类</van-tabbar-item>
            <van-tabbar-item name="friends" icon="shopping-cart-o" id="shoppingCar" @click="goPage('shoppingCar')">
                购物车<div class="van-info">{{getCurrentCount}}</div></van-tabbar-item>
            <van-tabbar-item name="setting" icon="user-o" @click="goPage('mine')">我的</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script>
    import {Toast} from 'vant'
    import moveCartStore from '../store/moveCart'
    export default {
        name: "layout",
        data() {
            return {
                tabActive: 'home'
            }
        },
        computed: {
          getCurrentCount() {
              return moveCartStore.state.count
          },
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1)
            },
            onClickRight() {
                Toast('按钮');
            },
            goPage(type) {
                switch (type) {
                    case 'home':
                        if(this.$route.name === 'Home') return false
                        this.$router.push({name: 'Home'})
                        break
                    case 'category':
                        if(this.$route.name === 'Category') return false
                        this.$router.push({name: 'Category'})
                        break
                    case 'shoppingCar':
                        if(this.$route.name === 'ShoppingCar') return false
                        this.$router.push({name: 'ShoppingCar'})
                        break
                    case 'mine':
                        if(this.$route.name === 'Mine') return false
                        this.$router.push({name: 'Mine'})
                        break
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import "../assets/style/common";
    @keyframes carmove {
        0% {
            transform: scale(1);
        }
        25% {
            transform: scale(0.8);
        }
        50% {
            transform: scale(1.1);
        }
        75% {
            transform: scale(0.9);
        }
        100% {
            transform: scale(1);
        }
    }
    #shoppingCar {
        position: relative;
        .van-info {
            top: 15px;
            right: 20px;
        }
    }
    /deep/ .moveToCart {
        animation: carmove 0.5s ease-in-out;
    }
</style>