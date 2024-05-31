import { ElectronAPI } from '@electron-toolkit/preload'

export interface CustomAPIs {
  ping: () => void
  openFile: () => void
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: CustomAPIs
  }
}
