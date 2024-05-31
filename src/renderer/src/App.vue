<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { useThemeStore } from '@renderer/store/theme';
const themeStore = useThemeStore()
themeStore.initTheme()
// themeStore.setTheme('dark')
console.log(themeStore.getCurrentTheme())
</script>

<style></style>
