import { ipcController } from "../events"

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