import { configController } from "../events"

export const setConfigHandler = (_event: any, configs: {}) => {
    Object.entries(configs).forEach((config) => {
        configController.setConfig(config[0], config[1] as string)
    })
    configController.writeConfig()
}
