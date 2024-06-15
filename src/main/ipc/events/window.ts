import { ipcController } from "../events"

export const minimizeHandler = () => {
    const mainWindow = ipcController.getMainWindow()
    mainWindow?.minimize()
}


export const maximizeHandler = () => {
    const mainWindow = ipcController.getMainWindow()
    mainWindow?.maximize()
}


export const restoreHandler = () => {
    const mainWindow = ipcController.getMainWindow()
    mainWindow?.restore()
    // mainWindow?.unmaximize()
}


export const closeHandler = () => {
    const mainWindow = ipcController.getMainWindow()
    mainWindow?.close()
}
