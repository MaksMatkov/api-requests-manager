import { Entity } from "../../domain/abstractions/BaseEntity";
import { IHttpHeader } from "../../domain/interfaces/IHttpHeader";
import { IHttpMethod } from "../../domain/interfaces/IHttpMethod";
import { IRequest } from "../../domain/interfaces/IRequest";
import { dbContext } from "../context";

export class RequestEntity extends Entity implements IRequest {

  public name : string | undefined;
  public path : string | undefined;
  public body : string | undefined;
  public http_method_id : number | undefined;

  constructor(base: any = null) {
    super();
    base && this.FillFromJson(base);
  }

  public get http_headers(): Promise<IHttpHeader[] | undefined> {
    return dbContext.HttpHeaderController.LoadAllByRequestId(this.id || 0);
  }

  public get http_method(): Promise<IHttpMethod | undefined>{
    return dbContext.HttpMethodController.LoadByID(this.http_method_id || 0);
  }

  FillFromJson(base: any): void {
    this.id = base.id;
    this.name = base.name;
    this.path = base.path;
    this.body = base.body;
    this.http_method_id = base.http_method_id;
  }
}

