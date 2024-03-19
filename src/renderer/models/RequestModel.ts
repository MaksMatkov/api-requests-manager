import { Entity } from "../../domain/abstractions/BaseEntity";
import { IHttpMethod } from "../../domain/interfaces/IHttpMethod";
import { IRequest } from "../../domain/interfaces/IRequest";
import { RequestEntity } from "../../main/entities/RequestEntity";
import { httpHeaderService } from "../services/HttpHeaderService";
import { httpMethodService } from "../services/HttpMethodService";
import { HttpHeaderModel } from "./HttpHeaderModel";
import { HttpMethodModel } from "./HttpMethodModel";

export class RequestModel extends Entity implements IRequest {
  public name : string | undefined;
  public path : string | undefined;
  public body : string | undefined;
  public http_method_id : number | undefined;

  public get http_method(): Promise<HttpMethodModel | undefined>{
    return httpMethodService.LoadByID(this.http_method_id!);
  }

  public get http_headers(): Promise<HttpHeaderModel[] | undefined>{
    return httpHeaderService.LoadAllByRequestId(this.http_method_id!);
  }

  constructor(base: any = null) {
    super();
    base && this.FillFromJson(base);
  }

  FillFromJson(base: any): RequestModel {
    this.id = base.id;
    this.name = base.name;
    this.path = base.path;
    this.body = base.body;
    this.http_method_id = base.http_method_id;

    return this;
  }

  ToEntity() : RequestEntity {
    return new RequestEntity(this);
  }
}
