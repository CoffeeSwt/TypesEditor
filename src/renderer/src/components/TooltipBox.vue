<template>
    <div class="group/button" cursor-pointer relative no-drag-area hover:text-base-dark dark:hover:text-base-light
        duration-150>
        <slot></slot>
        <div v-if="props.tooltip" text-nowrap p-2 invisible top-full no-drag-area absolute
            class="group-hover/button:visible" duration-100 text-xs left-center bg-base-dark dark:bg-base-light
            text-base-dark-text dark:text-base-light-text rounded-lg m-2>{{
                props.tooltip }}
        </div>
    </div>
</template>

<script lang="ts" setup>

const props = defineProps({
    tooltip: {
        type: String,
        required: false
    }
})
</script>