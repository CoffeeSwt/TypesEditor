import { IpcMain } from 'electron'
import { EventsController } from '../EventsController'

interface IpcEvnet {
    name: string,
    handler: () => unknown
}

export class IpcController extends EventsController {
    onEvents: IpcEvnet[]
    handleEvents: IpcEvnet[]
    constructor() {
        super()
        this.onEvents = []
        this.handleEvents = []
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

    addOn(name: string, handler: (...parms: any) => unknown) {
        this.onEvents.push({ name, handler })
    }
    addHandle(name: string, handler: (...parms: any) => unknown) {
        this.handleEvents.push({ name, handler })
    }
}