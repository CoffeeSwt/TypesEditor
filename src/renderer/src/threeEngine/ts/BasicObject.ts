import { BoxGeometry, MeshBasicMaterial, Object3D, Mesh, Color } from 'three'

export class BasicObject {
  ObjArray: Array<Object3D>
  constructor() {
    this.ObjArray = []
  }
  createBoxGeometry(
    width: number,
    height: number,
    depth: number,
    color: string,
  ): Mesh | void {
    const geometry = new BoxGeometry(width, height, depth)
    const material = new MeshBasicMaterial({
      color: color ? new Color(color) : undefined,
    })
    const box = new Mesh(geometry, material)
    this.ObjArray.push(box)
  }

  creatLabel() {}
  expportOBjArray() {
    return this.ObjArray
  }

  clearLoader() {
    if (!(this.ObjArray.length > 0)) return
    for (let i = 0, len = this.ObjArray.length; i < len; i++) {
      this.ObjArray.shift()
    }
  }
}
