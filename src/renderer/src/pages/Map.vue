<template>
    <MainWrapper>
        <div main-conetnt>
            <div ref="mapRef" size-full></div>
        </div>
    </MainWrapper>
</template>

<script lang="ts" setup>
import MainWrapper from '@renderer/pages/layouts/index.vue'
import { onMounted, reactive, Ref, ref, watchEffect } from 'vue';
import * as echarts from 'echarts';
import { EChartsType } from 'echarts';
import { api } from '@renderer/utils/ipcApi';
const mapRef: Ref<HTMLCanvasElement | null> = ref(null)
const myCharts: Ref<EChartsType | null> = ref(null)
const chartsOption = reactive({
    tooltip: {},
    series: [{
        type: 'map',
        map: 'chernarusplus',
        roam: true,
        aspectScale: 1,
    }]

})
api.getMapImg('map/chernarusplus.svg'.split('/'))
api.onSendImg((_e, svgString) => {
    echarts.registerMap('chernarusplus', { svg: svgString });
    myCharts.value!.setOption(chartsOption)
})

onMounted(() => {
    // 基于准备好的dom，初始化echarts实例
    myCharts.value = echarts.init(mapRef.value);

})

watchEffect(() => {
    // if (!myCharts.value) return
    // myCharts.value.setOption(chartsOption)
})


</script>