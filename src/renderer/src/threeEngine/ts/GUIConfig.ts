import { TEngine } from './TEngine'
import { Vector3 } from 'three'

export class GUIConfig {
  TE: TEngine
  gui: any
  boxPrm: {
    width: number
    height: number
    depth: number
    color: string
  }
  position: {
    x: number
    y: number
    z: number
  }
  constructor(gui: any, TE: TEngine) {
    this.TE = TE
    this.gui = gui
    this.boxPrm = {
      width: 10,
      height: 10,
      depth: 10,
      color: '#ff00ff',
    }
    this.position = new Vector3(0, 0, 0)
    const colorRegex = /#[a-fA-F0-9]{6}\b/
    const funButton = {
      addBox: () => {
        const execResult = colorRegex.exec(this.boxPrm.color)
        if (!execResult) {
          console.warn(
            'ERROR: Please enter a valid color string ,such as #000000',
          )
          return
        }
        this.TE.BO.createBoxGeometry(
          this.boxPrm.width,
          this.boxPrm.height,
          this.boxPrm.depth,
          this.boxPrm.color,
        )
        this.TE.addobj(this.TE.BO.expportOBjArray())
        this.TE.BO.clearLoader()
      },
      remove: () => {
        this.TE.selectedGeometry.removeAll()
      },
      setPosition: () => {
        const selectedGeometry = this.TE.selectedGeometry.getSelectGeometry()
        const selectedGeometrys = this.TE.selectedGeometry.selectedGeometry
        Object.keys(selectedGeometry).forEach((key: string) => {
          const mesh = selectedGeometrys[key]
          mesh.position.set(this.position.x, this.position.y, this.position.z)
        })
      },
      selectAll: () => {
        this.TE.selectedGeometry.selectAll()
      },
      deSelectAll: () => {
        this.TE.selectedGeometry.deSelectAll()
      },
    }
    this.gui.add(funButton, 'selectAll')
    this.gui.add(funButton, 'deSelectAll')
    const folderGeometry = this.gui.addFolder('基本物体')
    folderGeometry.add(funButton, 'addBox')
    folderGeometry.add(funButton, 'remove')
    folderGeometry.close()
    const Position = this.gui.addFolder('位置设置')
    Position.add(this.position, 'x')
    Position.add(this.position, 'y')
    Position.add(this.position, 'z')
    Position.add(funButton, 'setPosition')
    Position.close()
    const BoxGeometry = folderGeometry.addFolder('BoxGeometry')
    BoxGeometry.add(this.boxPrm, 'width', 1, 1000, 1)
    BoxGeometry.add(this.boxPrm, 'height', 1, 1000, 1)
    BoxGeometry.add(this.boxPrm, 'depth', 1, 1000, 1)
    BoxGeometry.add(this.boxPrm, 'color')
    BoxGeometry.close()
  }
  getBoxPrm() {
    return this.boxPrm
  }
  getPosition() {
    return this.position
  }
}
