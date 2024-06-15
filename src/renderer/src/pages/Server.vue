<template>
    <MainWrapper>
        <div main-conetnt>
            <header p-4 flex>
                <template v-for="menuItem in headerMenu">
                    <div :class="{ activeMenuItem: menuItem.routerName == router.currentRoute.value.name }"
                        @click="navigateTo(menuItem.routerName)" text-lg>
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
        label: '服务器安装',
        routerName: '服务器安装',
    }
])
</script>

<style scoped>
.activeMenuItem {
    position: relative;
}

.activeMenuItem::after {
    position: absolute;
    bottom: -0.35rem;
    left: 50%;
    content: '';
    width: 2rem;
    height: 0.5rem;
    border-radius: 1rem;
    background-color: aliceblue;
    transform: translateX(-50%);

}
</style>