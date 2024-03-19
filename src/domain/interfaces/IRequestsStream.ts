import { IEntity } from "./IEntity";
import { IRequestsStreamItem } from "./IRequestsStreamItem";
import { IRequestsStreamResultLog } from "./IRequestsStreamResultLog";

export interface IRequestsStream extends IEntity  {
  name : string | undefined;
  last_start : Date | undefined;
  requests_stream_result_logs : Promise<IRequestsStreamResultLog[] | undefined>;
  requests_stream_items : Promise<IRequestsStreamItem[] | undefined>;
}
