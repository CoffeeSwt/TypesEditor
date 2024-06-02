import { getDataPath } from "./index"
import path from 'node:path'
import { accessFileSync } from "./file"


export class ConfigController {
    directoryPath: string
    filePath: string
    defaultConfigContent: {}
    constructor() {
        this.directoryPath = `${getDataPath()}config`
        this.filePath = path.join(this.directoryPath, 'config.json');
        this.defaultConfigContent = { a: 111, b: 222 }
    }
    async readConfig() {
        const file = accessFileSync(this.directoryPath, this.filePath, this.defaultConfigContent)
        console.log(file)
    }
    async writeConfig() { }
}