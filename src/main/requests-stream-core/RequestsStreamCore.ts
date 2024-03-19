import { DbContext } from "../context";
import { RequestsStreamEntity } from "../entities/RequestsStreamEntity";
import { RequestsStreamItemEntity } from "../entities/RequestsStreamItemEntity";

export class RequestsStreamCore {

  private _requestsStream! : RequestsStreamEntity;
  private _requestsStreamItemList : RequestsStreamItemEntity[] | undefined;
  private _ipcResponseCodeCallbackLog = 'ipcResponseCodeCallbackLog';
  private _ipcResponseCodeCallbackError = 'ipcResponseCodeCallbackError';

  constructor(public db : DbContext){
  }

  public StartRequestsStream(RequestsStream : RequestsStreamEntity, event : Electron.IpcMainEvent){
    this._requestsStream = RequestsStream;

    this.Log("Start " + this._requestsStream.name, event);

    this._requestsStream.requests_stream_items
    .then(data => {
      this._requestsStreamItemList = data;
      if(!this._requestsStreamItemList){
        this.ThrowError("Requests Streeam is empty", event)
      }





      this.Log("End " + this._requestsStream.name, event);
    })
    .catch(err => this.ThrowError("Thomething went wrong", event))
  }

  private ThrowError(msg : string, event : Electron.IpcMainEvent){
    event.reply(this._ipcResponseCodeCallbackError, [Date.UTC, msg]);
  }

  private Log(msg : string, event : Electron.IpcMainEvent){
    event.reply(this._ipcResponseCodeCallbackLog, [Date.UTC, msg]);
  }





}
