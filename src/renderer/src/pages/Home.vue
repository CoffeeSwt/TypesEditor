<template>
    <div h-screen bg-white dark:bg-blue>
        <button @click="themeStore.setTheme('light')">set light</button>
        <button @click="themeStore.setTheme('dark')">set dark</button>
    </div>

</template>

<script lang="ts" setup>
import { useThemeStore } from '@renderer/store/theme';
import { ipcRenderer } from '@renderer/utils/ipcApi';
const themeStore = useThemeStore()
ipcRenderer.

console.log('hello')

</script>