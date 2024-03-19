import {RequestEntity} from "../entities/RequestEntity"
import { BaseController } from "./BaseController";
import { DbContext } from "../context";

export class RequestController extends BaseController<RequestEntity> {
  constructor(_db : DbContext, table_name : string){
    super(_db, table_name, RequestEntity)
  }
}
