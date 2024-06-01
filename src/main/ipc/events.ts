import { dialog } from 'electron'
import { IpcController } from "./index";


export const ipcController = new IpcController()


const handleFileOpen = async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({})
    if (!canceled) {
        return filePaths[0]
    }
    console.log(canceled, filePaths)
    return
}
ipcController.addHandle('dialog:openFile', handleFileOpen)


const pingHandler = () => {
    console.log('pong')
    // console.log(process.cwd())
    // console.log(__dirname)
}
ipcController.addOn('ping', pingHandler)

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











