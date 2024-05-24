import { ElectronAPI } from '@electron-toolkit/preload'

interface CustomAPIs {
  createName: () => void
}

declare global {
  interface Window {
    electron: ElectronAPI
    api: CustomAPIs
  }
}
