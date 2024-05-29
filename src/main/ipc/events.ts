import { dialog } from 'electron'
import { IpcController } from "./index";

import('electron-store').then((Store: any) => {
    console.log(Store)
})


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

const init = async () => {
    const store = await import('electron-store')
    const setStoreHandler = () => {
        (_: any, key: any, value: any) => {
            //@ts-ignore
            store.set(key, value)
        }
    }
    ipcController.addOn('setStore', setStoreHandler)

    const getStoreHandler = () => {
        (_: { returnValue: any; }, key: any) => {
            //@ts-ignore
            let value = store.get(key)
            _.returnValue = value || ""
        }
    }
    ipcController.addOn('getStore', getStoreHandler)
}
init()






