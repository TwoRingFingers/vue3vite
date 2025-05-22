import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs';
import { createRouter, createWebHashHistory } from 'vue-router';
import { createPinia } from 'pinia';
import { useAllDataStore } from '@/store';

const routes = [
    {
        path: '/',
        name: 'main',
        component: () => import('@/views/Main.vue'),
        redirect: '/home', //重定向到home
        children: [
            // {
            //     path: 'home',
            //     name: 'home',
            //     component: () => import('@/views/Home.vue')
            // },
            // {
            //     path: 'user',
            //     name: 'user',
            //     component: () => import('@/views/User.vue')
            // },
            // {
            //     path: 'mall',
            //     name: 'mall',
            //     component: () => import('@/views/Mall.vue')
            // },
            // {
            //     path: '/:pathMatch(.*)*',
            //     name: 'NotFound',
            //     component: () => import('@/views/404.vue')
            // }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/Login.vue')
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/404.vue')
    },
    // 兜底路由
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('@/views/404.vue')
    }
];

const router = createRouter({
    //设置路由模式
    history: createWebHashHistory(),
    routes
});

function isRoute(to) {
    let res = router.getRoutes(); //查找当前所有路由
    let resFil = res.filter((item) => item.path === to.path); //过滤是否有当前路由
    return resFil.length > 0; //返回数组的判断值，是否匹配到路由
}
router.beforeEach((to, from) => {
    const store = useAllDataStore();
    if (to.path !== '/login' && !store.state.token) {
        //判断不在登录页面，并且没有token
        return { name: 'login' };
    }
    if (!isRoute(to)) {
        //没有匹配的路由
        return { name: '404' };
    }
});

export default router;
