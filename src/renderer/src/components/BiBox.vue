<template>
    <div v-show="props.show" w-full h-screen fixed left-0 top-0 z-999 text-white flex-center>

        <div bg-black w-20 h-20 @click="changeShow">关闭</div>

    </div>

</template>

<script setup lang="ts">
const props = defineProps({
    show: {
        type: Boolean,
        required: true
    }
})
const emits = defineEmits(['update:show'])

const changeShow = () => {
    emits('update:show', false)
}

</script>