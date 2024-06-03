<template>
    <div class="group/menu" h-screen flex flex-col w-45 :class="{ 'shrinkSide': windowStore.shrinkSide }" duration-200
        bg-aside-light dark:bg-aside-dark>
        <div h-18 flex-center text-2xl font-600>
            DayZ
        </div>
        <div px-4 pt-2 :class="{ 'px-0': windowStore.shrinkSide }">
            <template v-for="menuItem in menuList">
                <MenuItem mb-2 :active="menuItem.active" :name="(menuItem.name as string)" :icon="menuItem.icon"
                    :showName="!windowStore.shrinkSide">
                </MenuItem>
            </template>
        </div>
        <div flex-grow-1></div>
        <div v-show="!windowStore.shrinkSide" @click="windowStore.changShrinkSide" bg-base-gray-light invisible
            dark:bg-base-gray-normal class="group-hover/menu:visible group/leftArrow" w-full h-10 cursor-pointer
            flex-center>
            <div size-6 i-solar-square-double-alt-arrow-left-linear class="group-hover/leftArrow:size-6.5">
            </div>
            <div ml-2 whitespace-nowrap tracking-normal font-400>折叠边栏</div>
        </div>
        <div v-show="windowStore.shrinkSide" @click="windowStore.changShrinkSide" bg-base-gray-light invisible
            dark:bg-base-gray-normal class="group-hover/menu:visible group/rightArrow" w-full h-10 cursor-pointer
            flex-center>
            <div size-6 i-solar-square-double-alt-arrow-right-linear class="group-hover/rightArrow:size-6.5">
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

import { getIconByName } from '@renderer/utils/getIconName';
import MenuItem from './Aside/MenuItem.vue'

import { computed } from 'vue';
import { RouteRecordNormalized, useRouter } from 'vue-router';
import { useWindowStore } from '@renderer/store/window';

const windowStore = useWindowStore()
const router = useRouter()
const menuList = computed(() => {
    return router.getRoutes().filter(i => routeFilter(i)).map(route => {
        return {
            ...route,
            icon: getIconByName(route.name as string),
            active: router.currentRoute.value.name == route.name
        }
    })
})

const routeFilter = (route: RouteRecordNormalized) => {
    const path = route.path
    const filterList = ['/', '/setting']
    if (filterList.indexOf(path) == -1) {
        return true
    } else {
        return false
    }
}

</script>

<style scoped>
.shrinkSide {
    width: 4.5rem;
}
</style>
