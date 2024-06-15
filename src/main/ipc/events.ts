import { IpcController } from "./controller/IpcController";
import { ConfigController } from './controller/ConfigController';
import { pingHandler } from "./events/ping";
import { getConfigHandler } from "./events/getConfig";
import { getMapImgHandler } from "./events/getMapImg";
import { handleFileOpen } from "./events/openFile";
import { setConfigHandler } from "./events/setConfig";
import { closeHandler, minimizeHandler, restoreHandler, maximizeHandler } from "./events/window";

export const ipcController = new IpcController()
export const configController = new ConfigController()

ipcController.addOn('ping', pingHandler)
ipcController.addOn('getConfig', getConfigHandler)
ipcController.addOn('getMapImg', getMapImgHandler)
ipcController.addHandle('dialog:openFile', handleFileOpen)
ipcController.addOn('setConfig', setConfigHandler)
ipcController.addOn('close', closeHandler)
ipcController.addOn('minimize', minimizeHandler)
ipcController.addOn('restore', restoreHandler)
ipcController.addOn('maximize', maximizeHandler)

















