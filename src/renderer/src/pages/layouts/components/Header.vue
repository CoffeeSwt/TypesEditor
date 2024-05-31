<template>
    <div h-18 flex items-center gap-2 justify-end px-8 :class="{ 'drag-area': !windowStore.isMaximized }">
        <Button tooltip="切为夜间模式" size-6 @click="setTheme" v-show="themeStore.getCurrentTheme() == 'light'">
            <div size-full i-material-symbols-brightness-7-outline>
            </div>
        </Button>

        <Button tooltip="切为日间模式" size-6 @click="setTheme" v-show="themeStore.getCurrentTheme() == 'dark'">
            <div size-full i-material-symbols-bedtime-outline>
            </div>
        </Button>

        <Button tooltip="最小化" size-6 @click="windowStore.minimize">
            <div size-full i-mingcute-minimize-fill></div>
        </Button>

        <Button tooltip="最大化" size-6 @click="windowStore.maximize" v-show="!windowStore.isMaximized">
            <div size-full i-material-symbols-square-outline-rounded>
            </div>
        </Button>
        <Button tooltip="还原最大化" size-6 @click="windowStore.restore" v-show="windowStore.isMaximized">
            <div size-full i-fluent-full-screen-minimize-16-filled>
            </div>
        </Button>
        <Button tooltip="关闭应用" size-6 @click="windowStore.close">
            <div size-full i-lets-icons-close-round>
            </div>
        </Button>
    </div>
</template>

<script lang="ts" setup>
import Button from '@renderer/components/Button.vue';
import { useThemeStore } from '@renderer/store/theme';
import { useWindowStore } from '@renderer/store/window';
import { api } from '@renderer/utils/ipcApi';
import { onMounted } from 'vue';
const themeStore = useThemeStore()
const windowStore = useWindowStore()
const setTheme = (e: MouseEvent) => {
    const currentTheme = themeStore.getCurrentTheme()
    if (currentTheme == 'light') {
        themeStore.setTheme('dark', e)
    } else {
        themeStore.setTheme('light', e)
    }
}

onMounted(() => {
    api.ping()
})
</script>

<style scoped></style>
