<template>
    <div h-screen flex flex-col w-45 :class="{ 'shrink': shrink }" duration-200>
        <div>1`11`</div>
        <button @click="changeShirnk">changeShirnk</button>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
const shrink = ref(false)
const changeShirnk = () => {
    shrink.value = !shrink.value
}
</script>

<style scoped>
.shrink {
    width: 5rem;
}
</style>
