<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { useConfigStore } from './store/config';
import { api } from '@renderer/utils/ipcApi'

const configStore = useConfigStore()
configStore.init()
api.ping()
api.onSendCMD((_, val) => {
  console.log(val)
})

// themeStore.setTheme('dark')
// console.log(themeStore.getCurrentTheme())
</script>

<style></style>
