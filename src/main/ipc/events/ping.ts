import { install } from "../../cmd/install"
import { accessCMDSync } from "../../accessFile/accessCMDSync"
import { ipcController } from "../events"


export const pingHandler = () => {
    console.log('pong')
    ipcController.mainWindow?.webContents.send('sendCMD', accessCMDSync())
    install()
}

