import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Theme } from '@renderer/types'
// import { ipcRenderer } from '@renderer/utils/ipcApi'


const useThemeStore = defineStore('theme', () => {
    const currentTheme = ref<Theme>('light')
    const setThemeWithoutStorage = (theme: Theme) => {
        currentTheme.value = theme
        if (theme == 'light') {
            document.documentElement.classList.remove('dark')
        } else {
            document.documentElement.classList.add('dark')
        }
    }

    const setTheme = (theme: Theme) => {
        
        // localStorage.setItem('theme', theme)
        setThemeWithoutStorage(theme)
    }
    const getCurrentTheme = () => {
        return currentTheme.value
    }
    const initTheme = () => {
        // const storageTheme = api.ipcRenderer.getStoreValue('theme') as unknown as Theme | undefined
        const storageTheme = localStorage.getItem('theme') as Theme | undefined
        if (storageTheme) {
            setThemeWithoutStorage(storageTheme)
        } else {
            setTheme('light')
        }
    }

    return { setTheme, getCurrentTheme, initTheme }
})

export { useThemeStore } 