import {HttpMethodEntity} from "../entities/HttpMethodEntity"
import { BaseController } from "./BaseController";
import { DbContext } from "../context";

export class HttpMethodController extends BaseController<HttpMethodEntity> {
  constructor(_db : DbContext, table_name : string){
    super(_db, table_name, HttpMethodEntity)
  }
}
