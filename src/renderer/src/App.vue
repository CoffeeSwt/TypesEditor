<template>
  <div h-10 w-10 bg-black flex @click="ipcSend">111</div>
</template>

<script setup lang="ts">
import { ipcRenderer } from '@renderer/utils/ipcSender'
const ipcSend = () => {
  ipcRenderer.invoke('dialog:openFile')
}

</script>
