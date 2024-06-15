import { dialog } from "electron"
import { ipcController } from "../events"

const handleFileOpen = async () => {
    const { canceled, filePaths } = await dialog.showOpenDialog({})
    if (!canceled) {
        return filePaths[0]
    }
    console.log(canceled, filePaths)
    return
}
ipcController.addHandle('dialog:openFile', handleFileOpen)