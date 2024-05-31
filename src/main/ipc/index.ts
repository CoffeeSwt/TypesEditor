import { BrowserWindow, IpcMain } from 'electron'

interface IpcEvnet {
    name: string,
    handler: () => unknown
}

export class IpcController {
    onEvents: IpcEvnet[]
    handleEvents: IpcEvnet[]
    mainWindow: BrowserWindow | null
    constructor() {
        this.onEvents = []
        this.handleEvents = []
        this.mainWindow = null
    }
    bindMainWindeow = (mainWindow: BrowserWindow) => {
        this.mainWindow = mainWindow
    }
    getMainWindow = () => {
        return this.mainWindow
    }
    registeIpcOnEvents(ipcMain: IpcMain): void {
        this.onEvents.forEach((event) => {
            ipcMain.on(event.name, event.handler)
        })
    }
    registeIpcHandleEvents(ipcMain: IpcMain): void {
        this.handleEvents.forEach((event) => {
            ipcMain.handle(event.name, event.handler)
        })
    }
    registeIpcEvents(ipcMain: IpcMain): void {
        this.registeIpcOnEvents(ipcMain)
        this.registeIpcHandleEvents(ipcMain)
    }

    addOn(name: string, handler: () => unknown) {
        this.onEvents.push({ name, handler })
    }
    addHandle(name: string, handler: () => unknown) {
        this.handleEvents.push({ name, handler })
    }
}


