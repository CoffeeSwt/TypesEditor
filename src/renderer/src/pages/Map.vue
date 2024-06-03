<template>
    <MainWrapper>
        <div main-conetnt>
            <div ref="threeRef" size-full box-border border border-solid border-gray></div>
        </div>
    </MainWrapper>
</template>

<script lang="ts" setup>
import MainWrapper from '@renderer/pages/layouts/index.vue'
import { onMounted, Ref, ref } from 'vue';
import { TEngine } from '@renderer/threeEngine';
import { api } from '@renderer/utils/ipcApi';
const threeRef: Ref<null | HTMLCanvasElement> = ref(null)
const tEngine: Ref<null | TEngine> = ref(null)

api.onSendImg((_e, buffer) => {
    console.log(buffer)
    const blob = new Blob([buffer])
    const url = URL.createObjectURL(blob)
    tEngine.value!.addPlaneGeometry({ width: 480, height: 480 }, url)
})
onMounted(() => {
    tEngine.value = new TEngine(threeRef.value!)
    api.getMapImg('map/chernarusplus/0/s_000_000_lco.png'.split('/'))
})
</script>

<style scoped></style>