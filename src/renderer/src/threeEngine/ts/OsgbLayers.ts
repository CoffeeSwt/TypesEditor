import { Group, Mesh } from 'three'
import { PostTile, transformMesh } from './utils'
//根节点的Type
export type osgbTiles = {
  rootPath: string //rootPath
  tiles: Array<string> //tileName
}
//osgb图层类
export class OsgbLayers {
  osgbTiles: osgbTiles
  rootTilesPath: Array<string>
  rootTileData: Array<Object>
  tilesSet: Array<Group>
  isLoading: boolean
  constructor(osgbTiles: osgbTiles) {
    this.isLoading = false
    this.osgbTiles = osgbTiles
    this.rootTilesPath = []
    this.rootTileData = []
    this.tilesSet = []
  }
  async init() {
    if (!(this.osgbTiles.tiles.length > 0)) return
    for (let i = 0, len = this.osgbTiles.tiles.length; i < len; i++) {
      this.rootTilesPath.push(
        `${this.osgbTiles.rootPath}/${this.osgbTiles.tiles[i]}/${this.osgbTiles.tiles[i]}.osgb`,
      )
    }
    for (let i = 0, len = this.rootTilesPath.length; i < len; i++) {
      let data = await PostTile(this.rootTilesPath[i])
      this.rootTileData.push(data)
    }
  }

  async loadTile(index: number) {
    if (this.isLoading) return //正在加载，需要等待上一次加载完成
    // this.isLoading = true
    if (!(this.rootTileData.length > 0)) return
    if (index == this.rootTileData.length) return

    let set = new Group()

    const getTile = async (tileData: any) => {
      if (tileData.Type == 'Osg::Geode') {
        console.log(tileData.Children[0])
        let mesh = transformMesh(tileData.Children[0])
        set.add(mesh as Mesh)
      } else if (tileData.Children.length > 1) {
        //group
        tileData.Children.forEach(async (child: any) => {
          await getTile(child)
        })
      } else {
        //PagedLOD，获取节点,再对节点递归，找到geode
        let tile = await PostTile(
          `${this.osgbTiles.rootPath}/${this.osgbTiles.tiles[index]}/${tileData.FileNames[1]}`,
        )
        await getTile(tile)
      }
      return
    }
    await getTile(this.rootTileData[index])
    this.tilesSet.push(set)
  }
  getTileNum() {
    return this.rootTileData.length
  }
  getTileSet() {
    return this.tilesSet
  }
}
