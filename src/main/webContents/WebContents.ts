import { EventsController } from "../EventsController"

interface ContentEvent {
    name: string
    parms: []
}

export class WebContentsController extends EventsController {
    constructor() {
        super()
    }
    executeContentEvents(event: ContentEvent) {
        this.mainWindow?.webContents.send(event!.name, ...event!.parms)
    }
}