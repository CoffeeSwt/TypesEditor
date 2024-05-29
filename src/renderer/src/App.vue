<template>
  <div class="main-window" h-screen bg-blue @click="ipcSend">111</div>
</template>

<script setup lang="ts">
import { ipcRenderer } from '@renderer/utils/ipcSender'
const ipcSend = () => {
  ipcRenderer.invoke('dialog:openFile')
}

</script>

<style>
.main-window {
  -webkit-app-region: drag;
}
</style>
