import { RouteRecordRaw } from 'vue-router';

export const routes: Array<RouteRecordRaw> = [
    { path: '/', redirect: '/home' },

    {
        name: 'home',
        path: '/home',
        component: () => import('@renderer/pages/Home.vue')
    }
]