// @unocss-include
const iconMap = new Map()
iconMap.set('文件编辑', 'i-material-symbols-light-edit-document-rounded')

export const getIconByName = (name: string) => {
    return iconMap.get(name)
}