import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Theme } from '@renderer/types'


const useThemeStore = defineStore('theme', () => {
    //default theme is light
    const currentTheme = ref<Theme>('light')
    const setThemeWithoutStorage = (theme: Theme, e?: MouseEvent) => {
        if (e) {
            document.documentElement.style.setProperty('--x', e.clientX + 'px')
            document.documentElement.style.setProperty('--y', e.clientY + 'px')
        }
        //先判断存储的theme是否为传入的theme 相同直接返回，否则赋值做切换动画
        if (theme == currentTheme.value) return
        currentTheme.value = theme
        //@ts-ignore
        if (document.startViewTransition) {
            //@ts-ignore
            document.startViewTransition(() => {
                document.documentElement.classList.toggle('dark')
            });
        } else {
            document.documentElement.classList.toggle('dark')
        }
    }

    const setTheme = (theme: Theme, e?: MouseEvent) => {
        // localStorage.setItem('theme', theme)
        setThemeWithoutStorage(theme, e)
    }
    const getCurrentTheme = () => {
        return currentTheme.value
    }
    const initTheme = () => {
        const localStorageTheme = 'light'
        if (localStorageTheme) {
            setThemeWithoutStorage(localStorageTheme)
        } else {
            setTheme('light')
        }
    }

    return { setTheme, getCurrentTheme, initTheme }
})

export { useThemeStore } 