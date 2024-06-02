import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {
  ping: () => ipcRenderer.send('ping'),
  openFile: () => ipcRenderer.invoke('dialog:openFile'),
  minimize: () => ipcRenderer.send('minimize'),
  maximize: () => ipcRenderer.send('maximize'),
  restore: () => ipcRenderer.send('restore'),
  close: () => ipcRenderer.send('close'),
  getConfig: () => ipcRenderer.send('getConfig'),
  onSendConfig: (callback: (event: Electron.IpcRendererEvent, config: object) => void) => ipcRenderer.on('sendConfig', (_event, value) => callback(_event, value)),
  setConfig: (config: object) => ipcRenderer.send('setConfig', config)
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
