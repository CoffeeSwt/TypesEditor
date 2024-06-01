<template>
    <div h-18 flex items-center gap-2 justify-end px-8 :class="{ 'drag-area': !windowStore.isMaximized }">
        <TooltipBox tooltip="切为夜间模式" size-6 @click="setTheme" v-show="themeStore.getCurrentTheme() == 'light'">
            <div size-full i-material-symbols-brightness-7-outline>
            </div>
        </TooltipBox>

        <TooltipBox tooltip="切为日间模式" size-6 @click="setTheme" v-show="themeStore.getCurrentTheme() == 'dark'">
            <div size-full i-material-symbols-bedtime-outline>
            </div>
        </TooltipBox>

        <div w-0.25 h-4 bg-base-gray-normal mx-2></div>

        <TooltipBox tooltip="最小化" size-6 @click="windowStore.minimize">
            <div size-full i-mingcute-minimize-fill></div>
        </TooltipBox>

        <TooltipBox tooltip="最大化" size-6 @click="windowStore.maximize" v-show="!windowStore.isMaximized">
            <div size-full i-material-symbols-square-outline-rounded>
            </div>
        </TooltipBox>
        <TooltipBox tooltip="还原最大化" size-6 @click="windowStore.restore" v-show="windowStore.isMaximized">
            <div size-full i-fluent-full-screen-minimize-16-filled>
            </div>
        </TooltipBox>
        <TooltipBox tooltip="关闭应用" size-6 @click="windowStore.close">
            <div size-full i-lets-icons-close-round>
            </div>
        </TooltipBox>
    </div>
</template>

<script lang="ts" setup>
import TooltipBox from '@renderer/components/TooltipBox.vue';
import { useThemeStore } from '@renderer/store/theme';
import { useWindowStore } from '@renderer/store/window';
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
</script>

<style scoped></style>
