<template>
    <div @click="navigateTo"
        :class="{ 'bg-active-blue': props.active, 'text-base-light': props.active, 'hover:bg-base-gray-light': !props.active, 'dark:hover:bg-base-gray-normal': !props.active }"
        cursor-pointer flex items-center h-10 w-full duration-150 p-2 box-border rounded-lg>
        <div class="icon" :class="props.icon" size-6 flex-shrink-0></div>
        <div v-show="props.showName" ml-2 whitespace-nowrap tracking-normal font-400>{{ props.name }}</div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';


const props = defineProps({
    name: String,
    icon: String,
    active: Boolean,
    showName: Boolean
})
const router = useRouter()
const navigateTo = () => {
    if (!props.name) return
    router.push({ name: props.name })
}
</script>

<style scoped>
.icon {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
}
</style>