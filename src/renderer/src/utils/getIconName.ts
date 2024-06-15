// @unocss-include
//确保图标预加载
const iconMap = new Map()
iconMap.set('文件编辑', 'i-material-symbols-light-edit-document-rounded')
iconMap.set('合成表查询', 'i-solar-book-2-bold')
iconMap.set('游戏地图', 'i-material-symbols-map-outline-rounded')
iconMap.set('服务器', 'i-iconoir-server')

export const getIconByName = (name: string) => {
    return iconMap.get(name)
}