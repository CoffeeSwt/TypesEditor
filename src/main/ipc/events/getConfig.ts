import { configController, ipcController } from "../events"

export const getConfigHandler = () => {
    const config = configController.readConfig()
    ipcController.mainWindow?.webContents.send('sendConfig', config)
}
