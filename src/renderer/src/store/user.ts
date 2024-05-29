import { defineStore } from 'pinia'
import { ref } from 'vue'

const useUserStore = defineStore('user', () => {
    const ID = ref(0)
    const token = ref('Eduardo')

    return { ID, token }
})

export { useUserStore } 