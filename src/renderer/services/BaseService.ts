import { rejects } from "assert";
import { Entity } from "../../domain/abstractions/BaseEntity";
import { Channels } from "../../main/preload";
import { HttpMethodModel } from "../models/HttpMethodModel";
import { RequestModel } from "../models/RequestModel";

interface IBaseService<Entity>{
  channelLoadByID : Channels;
  channelLoadAll : Channels;
  channelDelete : Channels;
  channelSave : Channels;
  LoadByID(id : number) : Promise<Entity>;
  LoadAll() : Promise<Entity[]>;
  Delete(id : number) : Promise<boolean>;
  Save(item : Entity) : Promise<Entity>;
}

interface IModelConstructor<ModelType> {
  new (): ModelType;
}

export type Model = HttpMethodModel | RequestModel;

export abstract class BaseService<ModelType extends Entity> implements IBaseService<ModelType>{

  constructor(public channelLoadByID : Channels,
    public channelLoadAll : Channels,
    public channelDelete : Channels,
    public channelSave : Channels,
    protected modelConstructor: IModelConstructor<ModelType>){}


  LoadByID(id: number): Promise<ModelType> {
    return new Promise((resolve, reject) => {
      window.electron.ipcRenderer.once(this.channelLoadByID, (result) => {
        var res = new this.modelConstructor();
        res.FillFromJson(result);
        resolve(res);
      });
      window.electron.ipcRenderer.sendMessage(this.channelLoadByID, id);
    });
  }

  LoadAll(): Promise<ModelType[]> {
    return new Promise((resolve, reject) => {
      window.electron.ipcRenderer.once(this.channelLoadAll, (result : any) => {
        const results: ModelType[] = (result as any[]).map((row) => {
          const entity = new this.modelConstructor();
          entity.FillFromJson(row);
          return entity;
        });
        resolve(results);
      });
      window.electron.ipcRenderer.sendMessage(this.channelLoadAll);
    });
  }

  Delete(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      window.electron.ipcRenderer.once(this.channelDelete, (result : any) => {
        resolve(result);
      });
      window.electron.ipcRenderer.sendMessage(this.channelDelete, id);
    });
  }

  Save(item: ModelType): Promise<ModelType> {
    return new Promise((resolve, reject) => {
      window.electron.ipcRenderer.once(this.channelSave, (result) => {
        var res = new this.modelConstructor();
        res.FillFromJson(result);
        resolve(res);
      });
      window.electron.ipcRenderer.sendMessage(this.channelSave, item);
    });
  }

}
