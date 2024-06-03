import { Layers } from './Layers'
import { TEngine } from './TEngine'
export class ObjLoader {
  TE: TEngine
  layers: Layers
  constructor(TE: TEngine) {
    this.TE = TE
    this.layers = new Layers(TE)
  }
}
