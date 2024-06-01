// @unocss-include
const iconMap = new Map()
iconMap.set('文件编辑', 'i-material-symbols-light-edit-document-rounded')
iconMap.set('合成表查询', 'i-solar-book-2-bold')

export const getIconByName = (name: string) => {
    return iconMap.get(name)
}