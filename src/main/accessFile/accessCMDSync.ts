import fs from 'node:fs'
import path from 'node:path'
import { app } from 'electron';

export const steamCMDPath = path.join(app.getAppPath(), 'runtime')
export const steamcmd = path.join(steamCMDPath, 'steamcmd.exe')

export const accessCMDSync = () => {
    // 判断目录是否存在
    if (!fs.existsSync(steamCMDPath)) {
        console.log('Directory does not exist, creating...');
        try {
            fs.mkdirSync(steamCMDPath, { recursive: true });
            console.log('Directory created successfully!');
        } catch (err) {
            console.error('Error creating directory:', err);
        }
    }

    // 判断文件是否存在
    if (!fs.existsSync(steamcmd)) {
        console.log('Steamcmd not exists:...');
        try {
            return false
        } catch (err) {
            console.error('Steamcmd not exists:', err);
            return false
        }
    } else {
        return true
    }
}

