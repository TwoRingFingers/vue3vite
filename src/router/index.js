import component from 'element-plus/es/components/tree-select/src/tree-select-option.mjs';
import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'main',
        component: () => import('@/views/Main.vue'),
        redirect: '/home', //重定向到home
        children: [
            {
                path: 'home',
                name: 'home',
                component: () => import('@/views/Home.vue')
            }
        ]
    }
];
const router = createRouter({
    //设置路由模式
    history: createWebHashHistory(),
    routes
});
export default router;
