import { accessImgFileSync } from "../../accessFile/accessImgFileSync"
import { ipcController } from "../events"

export const getMapImgHandler = (_event: any, filePath: Array<string>) => {
    const file = accessImgFileSync(filePath)
    if (!file) return
    ipcController.mainWindow?.webContents.send('sendImg', file, filePath)
}
