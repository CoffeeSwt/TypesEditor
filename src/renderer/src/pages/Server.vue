<template>
    <MainWrapper>
        <div main-conetnt flex flex-col overflow-auto>
            <header flex gap-4 mb-6 relative ref="menuHeaderRef">
                <template v-for="menuItem in headerMenu">
                    <div @click="router.push({ name: menuItem.routerName })" text-lg p-1 cursor-pointer duration-150>
                        <span>{{ menuItem.label }}</span>
                    </div>
                </template>
                <div :style="translateX" absolute translate-x-self--50 bottom-0 bg-active-blue w-5 h-1.2 rounded-full
                    duration-150>
                </div>
            </header>
            <main flex-grow-1 w-full flex flex-col>
                <router-view></router-view>
            </main>
        </div>
    </MainWrapper>
</template>

<script lang="ts" setup>
import MainWrapper from '@renderer/pages/layouts/index.vue'
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const menuHeaderRef = ref<null | HTMLHeadElement>(null)
const headerMenu = ref([
    {
        label: '安装',
        routerName: '服务器安装',
    },
    {
        label: '配置',
        routerName: '服务器配置',
    }
])
const translateX = computed(() => {
    const activeIndex = headerMenu.value.findIndex(i => i.routerName == router.currentRoute.value.name)
    const elem = menuHeaderRef.value?.children[activeIndex] as HTMLDivElement
    return `left:${elem?.offsetLeft + elem?.offsetWidth / 2}px;`
})
</script>

<style scoped></style>