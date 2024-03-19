// Disable no-unused-vars, broken for spread args
/* eslint no-unused-vars: off */
import { contextBridge, ipcMain, ipcRenderer, IpcRendererEvent } from 'electron';

export type Channels = 'ipc-example'
| 'HttpMethodController.LoadAll' | 'HttpMethodController.Delete'  | 'HttpMethodController.Save'  | 'HttpMethodController.LoadByID'
| 'RequestController.LoadAll' | 'RequestController.Delete'  | 'RequestController.Save'  | 'RequestController.LoadByID'
| 'HttpHeaderController.LoadByID' | 'HttpHeaderController.LoadAll' | 'HttpHeaderController.Delete' | 'HttpHeaderController.Save' | 'HttpHeaderController.LoadAllByRequestId'
| 'RequestsStreamController.LoadByID' | 'RequestsStreamController.LoadAll' | 'RequestsStreamController.Delete' | 'RequestsStreamController.Save' | 'RequestsStreamController.LoadAllByRequestId'
| 'RequestsStreamItemController.LoadByID' | 'RequestsStreamItemController.LoadAll' | 'RequestsStreamItemController.Delete' | 'RequestsStreamItemController.Save' | 'RequestsStreamItemController.LoadAllByRequestId'
| 'RequestsStreamResultLogController.LoadByID' | 'RequestsStreamResultLogController.LoadAll' | 'RequestsStreamResultLogController.Delete' | 'RequestsStreamResultLogController.Save' | 'RequestsStreamResultLogController.LoadAllByRequestId'
| 'RequestsStreamResultLogController.LoadAllByRequestsStreamId' | 'RequestsStreamItemController.LoadAllByRequestsStreamId';

const electronHandler = {
  ipcRenderer: {
    sendMessage(channel: Channels, ...args: unknown[]) {
      ipcRenderer.send(channel, ...args);
    },
    on(channel: Channels, func: (...args: unknown[]) => void) {
      const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
        func(...args);
      ipcRenderer.on(channel, subscription);

      return () => {
        ipcRenderer.removeListener(channel, subscription);
      };
    },
    once(channel: Channels, func: (...args: unknown[]) => void) {
      ipcRenderer.once(channel, (_event, ...args) => func(...args));
    },
  },
};

contextBridge.exposeInMainWorld('electron', electronHandler);


export type ElectronHandler = typeof electronHandler;
