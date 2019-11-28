export default [
    {
        path: '/',
        component: resolve => require.ensure([], () => resolve(require('@/components/layout.vue')), ''),
        children:[
            {
                path: 'Home',
                name: 'Home',
                component: resolve => require.ensure([], () => resolve(require('@/views/index.vue')), 'layout'),
                meta: {
                    title: '首页',
                    indexTab: true,
                    hideHeader: true
                }
            },
            {
                path: 'Category',
                name: 'Category',
                component: resolve => require.ensure([], () => resolve(require('@/views/category/index.vue')), 'layout'),
                meta: {
                    title: '分类',
                    indexTab: true
                }
            },
            {
                path: 'ShoppingCar',
                name: 'ShoppingCar',
                component: resolve => require.ensure([], () => resolve(require('@/views/shopping-car/index.vue')), 'layout'),
                meta: {
                    title: '购物车',
                    indexTab: true
                }
            },
            {
                path: 'Mine',
                name: 'Mine',
                component: resolve => require.ensure([], () => resolve(require('@/views/mine/index.vue')), 'layout'),
                meta: {
                    title: '我的',
                    indexTab: true
                }
            },
            {
                path: 'Product',
                name: 'ProductList',
                component: resolve => require.ensure([], () => resolve(require('@/views/product/index.vue')), 'layout'),
                meta: {
                    title: '商品列表',
                },
                children: [
                    {
                        path: ':productSysNo',
                        name: 'ProductDetail',
                        component: resolve => require.ensure([], () => resolve(require('@/views/product/detail.vue')), 'layout'),
                        meta: {
                            title: '商品详情',
                        },
                    }
                ]

            }
        ]
    },
]
