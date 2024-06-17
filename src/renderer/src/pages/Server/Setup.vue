<template>
    <div flex items-center gap-4 mb-4>
        <div p-2 border border-coffee-border-gray dark:border-dark-coffee-border-gray hover:bg-hover-gray
            dark:hover:bg-dark-hover-gray duration-150 rounded-xl cursor-pointer>检查安装</div @click=checkInstall>
        <div flex gap-4>
            <template v-for="item in Object.entries(state)">
                <div flex items-center gap-1>
                    <div v-if="item[1].installed" size-4 text-green i-material-symbols-check-circle-outline-rounded>
                    </div>
                    <div v-else size-4 text-red i-material-symbols-cancel-outline-rounded></div>
                    <div>{{ item[1].name }}</div>
                </div>
            </template>
        </div>
    </div>
    <div flex-grow-1 w-full overflow-auto>
        <div h-100 bg-red></div>
        <div h-100 bg-green></div>
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

const checkInstall = () => {

}
</script>