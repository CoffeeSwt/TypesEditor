<template>
    <div cursor-pointer flex items-center h-10 w-full duration-150 hover:bg-base-gray-light p-2 box-border rounded-lg>
        <div :class="props.icon" size-6 mr-2></div>
        <div tracking-widest font-400>{{ props.name }}</div>
    </div>

</template>

<script lang="ts" setup>

const props = defineProps({
    name: String,
    icon: String
})
</script>

<style scoped></style>