import { accessImgSync } from "../../utils/img"
import { ipcController } from "../events"

const getMapImgHandler = (_event: any, filePath: Array<string>) => {
    const file = accessImgSync(filePath)
    if (!file) return
    ipcController.mainWindow?.webContents.send('sendImg', file, filePath)
}
ipcController.addOn('getMapImg', getMapImgHandler)