import { defineStore } from 'pinia'
import { ref } from 'vue'
import { api } from '@renderer/utils/ipcApi'


const useWindowStore = defineStore('window', () => {
    const isMaximized = ref(false)
    const shrinkSide = ref(false)

    const changShrinkSide = () => {
        shrinkSide.value = !shrinkSide.value
    }

    const minimize = () => {
        api.minimize()
    }

    const maximize = () => {
        isMaximized.value = !isMaximized.value
        api.maximize()
    }

    const restore = () => {
        isMaximized.value = !isMaximized.value
        api.restore()
    }

    const close = () => {
        api.close()
    }

    return { isMaximized, minimize, maximize, restore, close, shrinkSide, changShrinkSide }
})

export { useWindowStore } 