import { Color, Material } from 'three'
export class MaterialSolector {
  color: Color | undefined
  selectedMaterial: Material | undefined
  constructor() {
    this.selectedMaterial = undefined
  }
  getMaterial() {
    return this.selectedMaterial
  }
}
