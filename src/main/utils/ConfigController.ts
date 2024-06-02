import { getDataPath } from "./index"
import path from 'node:path'
import fs from 'node:fs'
import { accessFileSync } from "./file"


export class ConfigController {
    directoryPath: string
    filePath: string
    defaultConfigContent: {}
    config: {}
    constructor() {
        this.directoryPath = `${getDataPath()}config`
        this.filePath = path.join(this.directoryPath, 'config.json');
        this.defaultConfigContent = {}
        this.config = {}
    }
    setConfig(key: string, value: string) {
        this.config[key] = value
    }
    readConfig() {
        const config = accessFileSync(this.directoryPath, this.filePath, this.defaultConfigContent)
        if (config)
            this.config = config
        return this.config
    }
    writeConfig() {
        fs.writeFileSync(this.filePath, JSON.stringify(this.config, null, 2), 'utf-8');
    }
}