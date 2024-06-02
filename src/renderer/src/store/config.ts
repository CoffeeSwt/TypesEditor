import { defineStore } from 'pinia'
import { reactive } from 'vue'
import { api } from '@renderer/utils/ipcApi';
import { toRaw } from 'vue';
import { useThemeStore } from './theme';

const useConfigStore = defineStore('config', () => {
    const themeStore = useThemeStore()
    const config = reactive({})
    const init = () => {
        api.getConfig()
        api.onSendConfig((_e, configs: object) => {
            if (configs) {
                Object.keys(configs).forEach(key => {
                    config[key] = configs[key]
                })
            }
            themeStore.initTheme()
        })
    }
    const getConfig = () => {
        return config
    }
    const getConfigByName = (configName: string) => {
        const configs = toRaw(config)
        return configs[configName]
    }
    const setConfig = (configName: string, value: any) => {
        config[configName] = value
        save()
    }
    const save = () => {
        //去除proxy代理
        api.setConfig(toRaw(config))
    }
    return { init, save, getConfigByName, setConfig, getConfig }
})

export { useConfigStore } 