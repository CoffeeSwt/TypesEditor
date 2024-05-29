import { defineStore } from 'pinia'
import { ref } from 'vue'

const useThemeStore = defineStore('theme', () => {
    const ID = ref(0)
    const token = ref('Eduardo')

    return { ID, token }
})

export { useThemeStore } 