import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Theme } from '@renderer/types'


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
        localStorage.setItem('theme', theme)
        setThemeWithoutStorage(theme)
    }
    const getCurrentTheme = () => {
        return currentTheme.value
    }
    const initTheme = () => {
        
    }

    return { setTheme, getCurrentTheme, initTheme }
})

export { useThemeStore } 