<template>
    <div relative h-screen flex flex-col w-45 duration-200 bg-aside-light dark:bg-aside-dark>
        <div h-18 flex-center text-2xl font-600>
            DayZ
        </div>
        <div px-4 pt-2>
            <template v-for="menuItem in menuList">
                <MenuItem :name="(menuItem.name as string)" :icon="getIconByName(menuItem.name as string)">
                </MenuItem>
            </template>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { getIconByName } from '@renderer/utils/getIconName';
import MenuItem from './Aside/MenuItem.vue'

import { ref } from 'vue';
import { useRouter } from 'vue-router';



const router = useRouter()
const menuList = ref([...router.getRoutes().filter(i => i.name != '/')])
console.log(menuList)

</script>

<style scoped>
.shrink {
    width: 5rem;
}
</style>
