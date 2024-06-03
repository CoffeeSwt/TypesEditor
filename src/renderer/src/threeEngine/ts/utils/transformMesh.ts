import {
  Mesh,
  TextureLoader,
  MeshBasicMaterial,
  BufferGeometry,
  BufferAttribute,
} from 'three'

export function transformMesh(geometry: any): Mesh | undefined {
  //获取材质
  let osgStateSet = geometry.StateSet
  let osgImage = osgStateSet.TextureAttributeList[0].value.StateAttribute.Image
  let fileName = osgImage.Name
  const isJPEG = fileName.search(/\.jpe?g($|\?)/i) > 0
  const isPNG = fileName.search(/\.png($|\?)/i) > 0
  if (!isPNG && !isJPEG) return
  let mimeType = isPNG ? 'image/png' : 'image/jpeg'
  let imageUri: Blob | string = new Blob([osgImage.Data], { type: mimeType })
  imageUri = URL.createObjectURL(imageUri)

  //加载材质
  const textureLoader = new TextureLoader()
  const texture = textureLoader.load(imageUri)
  const material = new MeshBasicMaterial({
    map: texture,
  })

  //构建几何体
  let bufferGeometry = new BufferGeometry()
  let positions = new Float32Array(geometry.VertexArray.flat())
  let uvs = new Float32Array(geometry.TexCoordArray[0].flat())
  bufferGeometry.setAttribute('position', new BufferAttribute(positions, 3))
  bufferGeometry.setAttribute('uv', new BufferAttribute(uvs, 2))
  
  //索引转换
  let primitiveSet = geometry.PrimitiveSetList[0]
  let indices = primitiveSet.data
  if (primitiveSet.value == 7) {
    let newIndices = []
    for (let i = 0, len = indices.length; i < len; i += 4) {
      let i0 = indices[i],
        i1 = indices[i + 1],
        i2 = indices[i + 2],
        i3 = indices[i + 3]
      newIndices.push(i0, i1, i3, i1, i2, i3)
    }
    indices = newIndices
  }
  bufferGeometry.setIndex(indices)

  //创建Mesh
  let model = new Mesh(bufferGeometry, material)
  model.rotation.x = -Math.PI / 2 //调整坐标系到threejs
  return model
}
