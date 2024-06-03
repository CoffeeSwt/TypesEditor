import { ElectronAPI } from '@electron-toolkit/preload'

export interface CustomAPIs {
  ping: () => void
  openFile: () => void
  minimize: () => void
  maximize: () => void
  restore: () => void
  close: () => void
  getConfig: () => void
  onSendConfig: (callback: (event: Electron.IpcRendererEvent, config: object) => void) => Electron.IpcRenderer
  setConfig: (config: object) => void

  getMapImg: (filePath: string[]) => void
  onSendImg: (callback: (event: Electron.IpcRendererEvent, img: string, filePath: string[]) => void) => Electron.IpcRenderer
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: CustomAPIs
  }
}
