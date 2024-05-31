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
}
ipcController.addOn('ping', pingHandler)







