import { IEntity } from "./IEntity";
import { IHttpHeader } from "./IHttpHeader";
import { IHttpMethod } from "./IHttpMethod";

export interface IRequest extends IEntity  {
  name : string | undefined;
  path : string | undefined;
  body : string | undefined;
  http_method_id : number | undefined;
  http_method : Promise<IHttpMethod | undefined>;
  http_headers : Promise<IHttpHeader[] | undefined>;
}
