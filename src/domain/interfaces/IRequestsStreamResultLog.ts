import { IEntity } from "./IEntity";

export interface IRequestsStreamResultLog extends IEntity {
  requests_stream_id : number | undefined;
  result_json : string | undefined;
  date : Date | undefined;
}
