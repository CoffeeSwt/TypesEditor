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
    // {
    //     name: '游戏地图',
    //     path: '/map',
    //     component: () => import('@renderer/pages/Map.vue')
    // },
    {
        name: '设置',
        path: '/setting',
        component: () => import('@renderer/pages/Setting.vue')
    },
    {
        name: '服务器',
        path: '/server',
        component: () => import('@renderer/pages/Server.vue'),
        redirect: '/server/setup',
        children: [
            {
                name: '服务器安装',
                path: '/server/setup',
                component: () => import('@renderer/pages/Server/Setup.vue')
            },
            {
                name: '服务器配置',
                path: '/server/config',
                component: () => import('@renderer/pages/Server/Config.vue')
            }
        ]
    }
]