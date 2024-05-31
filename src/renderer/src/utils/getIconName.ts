const iconMap = new Map()
iconMap.set('文件编辑', 'i-material-symbols-light-edit-document-rounded')



export const getIconByName = (name: string) => {
    console.log(iconMap.get(name))
    return iconMap.get(name)
}