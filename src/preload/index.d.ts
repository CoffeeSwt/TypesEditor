import { ElectronAPI } from '@electron-toolkit/preload'

export interface CustomAPIs {
  ping: () => void
  openFile: () => void
  minimize: () => void
  maximize: () => void
  restore: () => void
  close: () => void
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: CustomAPIs
  }
}
