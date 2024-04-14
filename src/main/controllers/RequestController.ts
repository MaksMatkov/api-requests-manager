import { DbContext } from "../context";
import { RequestEntity } from "../entities/RequestEntity";
import { RequestsStreamEntity } from "../entities/RequestsStreamEntity";
import { BaseController } from "./BaseController";

export class RequestController extends BaseController<RequestEntity> {
  constructor(_db: DbContext, table_name: string) {
    var str = typeof(RequestEntity); // undefiend
    var str2 = typeof(RequestsStreamEntity); // function
    console.log(str)
    super(_db, table_name, RequestEntity);
  }
}
