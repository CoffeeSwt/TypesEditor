<template>
    <div flex h-screen bg-base-light dark:bg-base-dark text-base-light-text dark:text-base-dark-text>
        <Aside></Aside>
        <div h-full flex flex-col flex-grow-1 overflow-hidden>
            <Header flex-shrink-0></Header>
            <div flex-grow-1 w-full box-border>
                <slot></slot>
            </div>
        </div>
    </div>

</template>

<script lang="ts" setup>
import Aside from './components/Aside.vue'
import Header from './components/Header.vue'
</script>
