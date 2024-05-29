import { ElectronAPI } from '@electron-toolkit/preload'

export interface CustomAPIs {
  openFile: () => void
  setStoreValue: (key: string, value: string | number) => void
  getStoreValue: (key: string) => number
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: CustomAPIs
  }
}
