import { IEntity } from "./IEntity"

export interface IHttpHeader extends IEntity {
  request_id : number | undefined;
  name : string | undefined;
  value : string | undefined;
}
