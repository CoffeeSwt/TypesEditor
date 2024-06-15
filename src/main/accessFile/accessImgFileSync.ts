import fs from 'node:fs'
import path from 'node:path'
import { getDataPath } from '../utils/index'

export const accessImgFileSync = (filePath: Array<string>) => {
    const filePathResolve = path.join(...[`${getDataPath(`data`)}`, ...filePath]);
    // 判断文件是否存在
    if (!fs.existsSync(filePathResolve)) {
        return
    } else {
        const file = fs.readFileSync(filePathResolve)
        return file
    }

}

