import { configController, ipcController } from "../events"

const getConfigHandler = () => {
    const config = configController.readConfig()
    ipcController.mainWindow?.webContents.send('sendConfig', config)
}
ipcController.addOn('getConfig', getConfigHandler)