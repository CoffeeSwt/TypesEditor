import fs from 'node:fs'

export const accessFileSync = (directoryPath: string, filePath: string, defaultConfigContent: any) => {
    // 判断目录是否存在
    if (!fs.existsSync(directoryPath)) {
        console.log('Directory does not exist, creating...');
        try {
            fs.mkdirSync(directoryPath, { recursive: true });
            console.log('Directory created successfully!');
        } catch (err) {
            console.error('Error creating directory:', err);
        }
    }

    // 判断文件是否存在
    if (!fs.existsSync(filePath)) {
        console.log('File does not exist, creating...');
        try {
            fs.writeFileSync(filePath, JSON.stringify(defaultConfigContent, null, 2), 'utf-8');
        } catch (err) {
            console.error('Error creating file:', err);
        }
        return fs.readFileSync(filePath, 'utf-8')
    } else {
        return fs.readFileSync(filePath, 'utf-8')
    }

}

