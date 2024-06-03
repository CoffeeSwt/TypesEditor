import { TEngine } from './TEngine'
import { OsgbLayers } from './OsgbLayers'

export class Main {
  TE: TEngine
  constructor(dom: HTMLElement) {
    const animate = () => {}
    this.TE = new TEngine(dom, animate, {
      antialias: true,
      helper: true,
      orbitControls: true,
      stats: true,
    })
  }
  async init() {
    const osgbLayers = new OsgbLayers({
      rootPath: './CC/Data',
      tiles: ['Tile_+015_+008'],
    })

    await osgbLayers.init()
    console.log(osgbLayers.getTileNum())
    await osgbLayers.loadTile(0)
    this.TE.addobj(osgbLayers.getTileSet())
  }
}
