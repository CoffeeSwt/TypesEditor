<template>
    <MainWrapper>
        <div size-full bg-white dark:bg-blue>
            <button @click="themeStore.setTheme('light')">set light</button>
            <button @click="themeStore.setTheme('dark')">set dark</button>
            <button @click="windowStore.minimize">最小化</button>
            <button @click="windowStore.maximize" v-show="!windowStore.isMaximized">最大化</button>
            <button @click="windowStore.restore" v-show="windowStore.isMaximized">还原最大化</button>
            <button @click="windowStore.close">关闭</button>
        </div>
    </MainWrapper>
</template>

<script lang="ts" setup>
import MainWrapper from '@renderer/pages/layouts/index.vue'
import { useThemeStore } from '@renderer/store/theme';
import { useWindowStore } from '@renderer/store/window';
import { api } from '@renderer/utils/ipcApi';
import { onMounted } from 'vue';
const themeStore = useThemeStore()
const windowStore = useWindowStore()
onMounted(() => {
    api.ping()
})

</script>