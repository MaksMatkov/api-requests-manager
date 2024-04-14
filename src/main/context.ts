import { Database } from 'sqlite3';
import { app, ipcMain } from 'electron';
import * as fs from 'fs';
import * as path from 'path';
import { RequestController } from './controllers/RequestController';
import {RequestEntity} from "./entities/RequestEntity"
import { HttpMethodController } from './controllers/HttpMethodController';
import { BaseController } from './controllers/BaseController';
import { HttpMethodEntity } from './entities/HttpMethodEntity';
import { Entity } from '../domain/abstractions/BaseEntity';
import { HttpHeaderController } from './controllers/HttpHeaderController';
import { HttpHeaderEntity } from './entities/HttpHeaderEntity';
import { RequestsStreamController } from './controllers/RequestsStreamController';
import { RequestsStreamEntity } from './entities/RequestsStreamEntity';
import { RequestsStreamResultLogController } from './controllers/RequestsStreamResultLogController';
import { RequestsStreamResultLogEntity } from './entities/RequestsStreamResultLogEntity';
import { RequestsStreamItemController } from './controllers/RequestsStreamItemController';
import { RequestsStreamItemEntity } from './entities/RequestsStreamItemEntity';
import { MappingController } from './controllers/MappingController';
import { MappingEntity } from './entities/MappingEntity';

export class DbContext extends Database {

  dbPath : string | undefined;

  RequestController! : RequestController;
  HttpMethodController! : HttpMethodController;
  HttpHeaderController! : HttpHeaderController;
  RequestsStreamController! : RequestsStreamController;
  RequestsStreamResultLogController! : RequestsStreamResultLogController;
  RequestsStreamItemController! : RequestsStreamItemController;
  MappingController! : MappingController;

  constructor(_dbPath : string, is_migration : boolean = false){

    is_migration && DeleteDb(_dbPath);

    super(_dbPath);
    this.dbPath = _dbPath;

    this.RequestController = new RequestController(this, 'request');
    this.HttpMethodController = new HttpMethodController(this, 'http_method');
    this.HttpHeaderController = new HttpHeaderController(this, 'http_header');
    this.RequestsStreamController = new RequestsStreamController(this, 'requests_stream');
    this.RequestsStreamResultLogController = new RequestsStreamResultLogController(this, 'requests_stream');
    this.RequestsStreamItemController = new RequestsStreamItemController(this, 'requests_stream_item');
    this.MappingController = new MappingController(this, 'mapping');

    this.InitIPCAims();
  }

  private InitIPCAims() : void {

    this.InitCRUDIPCAims<RequestEntity>(this.RequestController);
    this.InitCRUDIPCAims<HttpMethodEntity>(this.HttpMethodController);
    this.InitCRUDIPCAims<HttpHeaderEntity>(this.HttpHeaderController);
    this.InitCRUDIPCAims<RequestsStreamEntity>(this.RequestsStreamController);
    this.InitCRUDIPCAims<RequestsStreamResultLogEntity>(this.RequestsStreamResultLogController);
    this.InitCRUDIPCAims<RequestsStreamItemEntity>(this.RequestsStreamItemController);
    this.InitCRUDIPCAims<MappingEntity>(this.MappingController);

    ipcMain.on('HttpHeaderController.LoadAllByRequestId', async (event, arg) => {
      this.HttpHeaderController.LoadAllByRequestId(arg).then(res => {
        event.reply('HttpHeaderController.LoadAllByRequestId', res);
      });
    });

    ipcMain.on('RequestsStreamResultLogController.LoadAllByRequestsStreamId', async (event, arg) => {
      this.RequestsStreamResultLogController.LoadAllByRequestsStreamId(arg).then(res => {
        event.reply('RequestsStreamResultLogController.LoadAllByRequestsStreamId', res);
      });
    });

    ipcMain.on('MappingController.LoadAllByRequestsStreamItemId', async (event, arg) => {
      this.MappingController.LoadAllByRequestsStreamItemId(arg).then(res => {
        event.reply('MappingController.LoadAllByRequestsStreamItemId', res);
      });
    });
  }

  private InitCRUDIPCAims<T extends Entity>(controller : BaseController<T>) : void {

    let controllerName = controller.constructor.name;

    let SaveEndpoint = controllerName + ".Save";
    let LoadAllEndpoint = controllerName + ".LoadAll";
    let DeleteEndpoint = controllerName + ".Delete";
    let LoadByIDEndpoint = controllerName + ".LoadByID";

    ipcMain.on(SaveEndpoint, async (event, arg) => {
      controller.Save(arg).then(res => {
        event.reply(SaveEndpoint, res);
      });
    });

    ipcMain.on(LoadAllEndpoint, async (event, arg) => {
      controller.LoadAll().then(res => {
        event.reply(LoadAllEndpoint, res);
      });
    });

    ipcMain.on(DeleteEndpoint, async (event, arg) => {
      controller.Delete(arg).then(res => {
        event.reply(DeleteEndpoint, res);
      });
    });

    ipcMain.on(LoadByIDEndpoint, async (event, arg) => {
      controller.LoadByID(arg).then(res => {
        event.reply(LoadByIDEndpoint, res);
      });
    });
  }

  public SayHi(){
    console.log("Hi!");
  }
}

function DeleteDb(path : string){
  if(path && fs.existsSync(path)){
    fs.unlinkSync(path);
  }
}

let dbContext : DbContext = new DbContext(path.join(app.getPath('userData'), 'index.db'), true);
export {dbContext};


