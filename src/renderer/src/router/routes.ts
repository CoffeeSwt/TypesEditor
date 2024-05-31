import { RouteRecordRaw } from 'vue-router';

export const routes: Array<RouteRecordRaw> = [
    { path: '/', redirect: '/home' },

    {
        name: '文件编辑',
        path: '/home',
        component: () => import('@renderer/pages/Home.vue')
    }
]