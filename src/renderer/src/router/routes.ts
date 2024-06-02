import { RouteRecordRaw } from 'vue-router';

export const routes: Array<RouteRecordRaw> = [
    { path: '/', redirect: '/home' },

    {
        name: '文件编辑',
        path: '/home',
        component: () => import('@renderer/pages/Home.vue')
    },
    {
        name: '合成表查询',
        path: '/craft',
        component: () => import('@renderer/pages/Craft.vue')
    },
    {
        name: '游戏地图',
        path: '/map',
        component: () => import('@renderer/pages/Map.vue')
    }
]