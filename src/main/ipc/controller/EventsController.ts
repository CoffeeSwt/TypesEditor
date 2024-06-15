import { BrowserWindow } from 'electron'

export class EventsController {
    mainWindow: BrowserWindow | null
    constructor() {
        this.mainWindow = null
    }
    bindMainWindeow = (mainWindow: BrowserWindow) => {
        this.mainWindow = mainWindow
    }
    getMainWindow = () => {
        return this.mainWindow
    }
}