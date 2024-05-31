<template>
    <div :class="props.icon"></div>
    <div>{{ props.itemName }}</div>
</template>

<script lang="ts" setup>
const props = defineProps({
    itemName: String,
    icon: String
})
</script>

<style scoped></style>