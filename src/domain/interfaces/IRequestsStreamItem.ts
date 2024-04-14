import { IEntity } from "./IEntity";
import { IMapping } from "./IMapping";
import { IRequest } from "./IRequest";

export interface IRequestsStreamItem extends IEntity  {
  requests_stream_id : number | undefined;
  request_id : number | undefined;
  position_index : number | undefined;
  request : Promise<IRequest | undefined>;
  mappings : Promise<IMapping[] | undefined>;
}
