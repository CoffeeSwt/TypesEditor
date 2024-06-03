<template>
    <MainWrapper>
        <div main-conetnt>
            <div ref="threeRef" size-full border border-solid border-gray></div>
        </div>
    </MainWrapper>
</template>

<script lang="ts" setup>
import MainWrapper from '@renderer/pages/layouts/index.vue'
import { onMounted, Ref, ref } from 'vue';
const threeRef: Ref<null | HTMLCanvasElement> = ref(null)
onMounted(() => {


})
</script>

<style scoped></style>