import fs from 'node:fs'
import path from 'node:path'
import { getDataPath } from './index';

const steamCMDPath = `${getDataPath('runtime')}`
const filePath = path.join(steamCMDPath, 'steamcmd.exe')

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
    if (!fs.existsSync(filePath)) {
        console.log('File does not exist, creating...');
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

