import osg from 'osg-serializer-browser/SourceESM'

export async function PostTile(url: string) {
  let response = await fetch(url)
  let data = await response.arrayBuffer()
  let osgObj = await osg.readBuffer(data, url)
  return osgObj
}
