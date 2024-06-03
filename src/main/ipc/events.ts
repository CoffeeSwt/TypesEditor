import { dialog } from 'electron'
import { IpcController } from "./IpcController";
import { ConfigController } from '../utils/ConfigController';
import { accessImgSync } from '../utils/img';


export const ipcController = new IpcController()
export const configController = new ConfigController()

const handleFileOpen = async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({})
    if (!canceled) {
        return filePaths[0]
    }
    console.log(canceled, filePaths)
    return
}
ipcController.addHandle('dialog:openFile', handleFileOpen)

const getMapImgHandler = (_event: any, filePath: Array<string>) => {
    const file = accessImgSync(filePath)
    if (!file) return
    ipcController.mainWindow?.webContents.send('sendImg', file, filePath)
}
ipcController.addOn('getMapImg', getMapImgHandler)

const pingHandler = () => {
    console.log('pong')
}
ipcController.addOn('ping', pingHandler)

const getConfigHandler = () => {
    const config = configController.readConfig()
    ipcController.mainWindow?.webContents.send('sendConfig', config)
}
ipcController.addOn('getConfig', getConfigHandler)

const setConfigHandler = (_event: any, configs: {}) => {
    Object.entries(configs).forEach((config) => {
        configController.setConfig(config[0], config[1] as string)
    })
    configController.writeConfig()
}
ipcController.addOn('setConfig', setConfigHandler)

const minimizeHandler = () => {
    const mainWindow = ipcController.getMainWindow()
    mainWindow?.minimize()
}
ipcController.addOn('minimize', minimizeHandler)

const maximizeHandler = () => {
    const mainWindow = ipcController.getMainWindow()
    mainWindow?.maximize()
}
ipcController.addOn('maximize', maximizeHandler)

const restoreHandler = () => {
    const mainWindow = ipcController.getMainWindow()
    mainWindow?.restore()
    // mainWindow?.unmaximize()
}
ipcController.addOn('restore', restoreHandler)

const closeHandler = () => {
    const mainWindow = ipcController.getMainWindow()
    mainWindow?.close()
}
ipcController.addOn('close', closeHandler)











