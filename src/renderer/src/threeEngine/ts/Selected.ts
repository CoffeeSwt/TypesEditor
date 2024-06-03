import { TEngine } from './TEngine'
import {
  MeshBasicMaterial,
  Mesh,
  Object3D,
  Material,
  Color,
  MathUtils,
} from 'three'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
export class SelectedGeometry {
  selectedGeometry: { [index: string]: Mesh | Object3D }
  tempMaterial: { [index: string]: Material | Material[] }
  selectedGeometryController: { [index: string]: TransformControls }
  selectedMaterial: MeshBasicMaterial
  TE: TEngine
  constructor(TE: TEngine) {
    this.selectedGeometry = {}
    this.tempMaterial = {}
    this.selectedGeometryController = {}
    this.selectedMaterial = new MeshBasicMaterial({
      color: new Color('rgb(255,182,193)'),
    })
    this.TE = TE
    window.addEventListener('keydown', (event) => {
      let keys = Object.keys(this.selectedGeometry)
      switch (event.key) {
        case 'Shift': // Shift
          if (!(keys.length > 0)) return
          keys.forEach((key) => {
            this.selectedGeometryController[key].setTranslationSnap(5)
            this.selectedGeometryController[key].setRotationSnap(
              MathUtils.degToRad(15),
            )
            this.selectedGeometryController[key].setScaleSnap(0.25)
          })
          break
        case 'w': // W
          keys.forEach((key) => {
            this.selectedGeometryController[key].setMode('translate')
          })
          break
        case 'e': // E
          keys.forEach((key) => {
            this.selectedGeometryController[key].setMode('rotate')
          })
          break
        case 'r': // R
          keys.forEach((key) => {
            this.selectedGeometryController[key].setMode('scale')
          })
          break
        case 'c': // C
          const position = this.TE.camera.position.clone()

          this.TE.camera =
            this.TE.camera.type === 'PerspectiveCamera'
              ? this.TE.cameraOrtho
              : this.TE.cameraPersp
          this.TE.camera.position.copy(position)
          if (!this.TE.orbitControls) break
          this.TE.orbitControls.object = this.TE.camera
          keys.forEach((key) => {
            this.selectedGeometryController[key].camera = this.TE.camera
          })

          this.TE.camera.lookAt(
            this.TE.orbitControls.target.x,
            this.TE.orbitControls.target.y,
            this.TE.orbitControls.target.z,
          )
          this.TE.onWindowResize()
          break
        case '=': // +
          keys.forEach((key) => {
            this.selectedGeometryController[key].size += 0.1
          })
          break
        case '-': // -
          keys.forEach((key) => {
            this.selectedGeometryController[key].size -= 0.1
          })
          break
      }
    })
  }
  add(geometry: Mesh): void {
    if (this.selectedGeometry[geometry.id]) return

    //如果不存在
    this.selectedGeometry[geometry.id] = geometry //存储这个几何体
    this.tempMaterial[geometry.id] = geometry.material //存储他的材质
    geometry.material = this.selectedMaterial //将当前材质替换为选中后的材质
    this.selectedGeometryController[geometry.id] = new TransformControls(
      this.TE.camera,
      this.TE.dom,
    ) //定义其操作杆
    if (this.TE.orbitControls) {
      //禁用轨道控制
      this.TE.orbitControls.enabled = false
    }

    this.selectedGeometryController[geometry.id].attach(geometry) //将操作杆追加到此物体上
    this.TE.scene.add(this.selectedGeometryController[geometry.id]) //将操作杆添加到场景
  }
  remove(geometry: Mesh): void {
    if (!this.selectedGeometry[geometry.id]) return
    geometry.material = this.tempMaterial[geometry.id]
    delete this.tempMaterial[geometry.id]
    delete this.selectedGeometry[geometry.id]
    this.selectedGeometryController[geometry.id].detach()
    this.TE.scene.remove(this.selectedGeometryController[geometry.id])
    this.selectedGeometryController[geometry.id].dispose()

    if (!this.TE.orbitControls) return
    if (Object.keys(this.selectedGeometry).length > 0) return
    this.TE.orbitControls.enabled = true
  }
  getSelectGeometry(): {} {
    return this.selectedGeometry
  }

  removeAll(): void {
    if (!Object.keys(this.selectedGeometry)) return
    Object.keys(this.selectedGeometry).forEach((key) => {
      this.TE.scene.remove(this.selectedGeometry[key]) //从场景移除
      delete this.tempMaterial[key] //移除对应材质
      delete this.selectedGeometry[key] //移除索引Mesh
      this.selectedGeometryController[key].detach()
      this.TE.scene.remove(this.selectedGeometryController[key])
      this.selectedGeometryController[key].dispose()
    })
    if (!this.TE.orbitControls) return
    this.TE.orbitControls.enabled = true
  }

  deSelectAll() {
    const selectedGeometry = this.getSelectGeometry()
    const selectedGeometrys = this.selectedGeometry
    Object.keys(selectedGeometry).forEach((key: string) => {
      const mesh = selectedGeometrys[key] as Mesh
      mesh.material = this.tempMaterial[key]
      delete this.tempMaterial[key]
      delete this.selectedGeometry[key] //严格模式下无法直接写 delete mesh
      this.selectedGeometryController[key].detach()
      this.TE.scene.remove(this.selectedGeometryController[key])
      this.selectedGeometryController[key].dispose()
    })
    //释放轨道控制
    if (!this.TE.orbitControls) return
    if (Object.keys(selectedGeometrys).length > 0) return
    this.TE.orbitControls.enabled = true
  }
  selectAll() {
    this.TE.scene.children.forEach((child) => {
      if (!(child.type === 'Mesh')) return
      this.add(child as Mesh)
    })
  }
}
