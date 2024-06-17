<template>
    <div flex items-center gap-4>
        <div p-2 border border-coffee-border-gray dark:border-dark-coffee-border-gray hover:bg-hover-gray dark:hover:bg-dark-hover-gray duration-150 rounded-xl cursor-pointer>检查安装</div>
        <div flex gap-4>
            <template v-for="item in Object.entries(state)">
                <div>{{ item[1].name }}</div>
            </template>
        </div>
    </div>

</template>

<script lang="ts" setup>
import { reactive } from 'vue';

const state = reactive({
    'SteamCMD': {
        name: 'SteamCMD',
        installed: false
    },
    'DayZServer': {
        name: 'DayZServer',
        installed: false
    }
})
</script>