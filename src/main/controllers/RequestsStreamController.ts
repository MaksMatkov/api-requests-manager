import { DbContext } from "../context";
import { RequestsStreamEntity } from "../entities/RequestsStreamEntity";
import { BaseController } from "./BaseController";

export class RequestsStreamController extends BaseController<RequestsStreamEntity> {
  constructor(_db : DbContext, table_name : string){
    super(_db, table_name, RequestsStreamEntity)
  }
}
