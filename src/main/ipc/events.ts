import { app } from 'electron'
import { IpcController } from "./IpcController";
import { ConfigController } from '../utils/ConfigController';

export const ipcController = new IpcController()
export const configController = new ConfigController()

const pingHandler = () => {
    console.log('pong')
    console.log(app.getAppPath())
}
ipcController.addOn('ping', pingHandler)

















