import { createRouter, createWebHashHistory, } from "vue-router";
import type { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    { path: '/', redirect: '/home' },

    {
        name: 'home',
        path: '/home',
        component: () => import('@renderer/pages/Home.vue')
    }
]

export const router = createRouter({
    routes,
    history: createWebHashHistory()
})