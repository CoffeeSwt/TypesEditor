import { accessCMDSync } from "../../utils/accessCMDSync"
import { ipcController } from "../events"

export const pingHandler = () => {
    console.log('pong')
    ipcController.mainWindow?.webContents.send('sendCMD', accessCMDSync())
}