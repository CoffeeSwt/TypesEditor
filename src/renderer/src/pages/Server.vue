<template>
    <MainWrapper>
        <div main-conetnt>
            <header flex gap-4 mb-6>
                <template v-for="menuItem in headerMenu">
                    <div :class="{ activeMenuItem: menuItem.routerName == router.currentRoute.value.name }"
                        @click="navigateTo(menuItem.routerName)" text-lg p-1 cursor-pointer duration-150>
                        {{ menuItem.label }}
                    </div>
                </template>
            </header>
            <main>
                <router-view></router-view>
            </main>
        </div>
    </MainWrapper>
</template>

<script lang="ts" setup>
import MainWrapper from '@renderer/pages/layouts/index.vue'
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter()
const navigateTo = (name: string) => {
    router.push({ name })
}

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
</script>

<style scoped>
.activeMenuItem {
    position: relative;
}

.activeMenuItem::after {
    position: absolute;
    bottom: 0rem;
    left: 50%;
    content: '';
    width: 1.5rem;
    height: 0.3rem;
    border-radius: 1rem;
    background-color: #4f46e5;
    transform: translateX(-50%);

}
</style>