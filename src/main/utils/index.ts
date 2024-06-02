export const getDataPath = () => {
    let idx = process.resourcesPath.indexOf('\\node_modules\\');
    if (idx == -1) {
        // 生成环境
        return process.resourcesPath + '\\..\\data\\';
    } else {
        // 开发环境
        return process.resourcesPath.substring(0, idx) + '\\data\\';
    }
}