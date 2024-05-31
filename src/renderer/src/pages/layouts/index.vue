<template>
    <div flex h-screen>
        <Aside></Aside>
        <div h-full flex flex-col flex-grow-1>
            <Header flex-shrink-0></Header>
            <div flex-grow-1>
                <slot></slot>
            </div>
            <Footer flex-shrink-0></Footer>
        </div>
    </div>

</template>

<script lang="ts" setup>
import Aside from './components/Aside.vue'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>
