import { Object3D } from 'three'
import { TEngine } from './TEngine'
type Layer = '2dMap' | 'osgbMap' | undefined
class map2d {}

class osgbMap {}
export class Layers {
  TE: TEngine
  map2d: Array<Object3D>
  osgbMap: Array<Object3D>
  constructor(TE: TEngine) {
    this.TE = TE
    this.map2d = []
    this.osgbMap = []
  }
  addLayer(layer: Layer) {
    if (!layer) return
  }
  removeLayer(layer: Layer) {
    if (!layer) return
  }
}
