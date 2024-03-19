interface IEntity  {
  id : number | undefined;
  FillFromJson(base : any) : void;
}

interface IHttpHeader extends IEntity {
  request_id : number | undefined;
  name : string | undefined;
  value : string | undefined;
}

interface IHttpMethod extends IEntity  {
  name : string | undefined;
}

interface IRequest extends IEntity  {
  name : string | undefined;
  path : string | undefined;
  body : string | undefined;
  http_method_id : number | undefined;
  http_method : IHttpMethod;
  http_headers : IHttpHeader[];
}

interface IRequestsStream extends IEntity  {
  name : string | undefined;
  last_start : Date | undefined;
  requests_stream_result_logs : Promise<IRequestsStreamResultLog[] | undefined>;
  requests_stream_items : IRequestsStreamItem[];
}

interface IRequestsStreamItem extends IEntity  {
  requests_stream_id : number | undefined;
  request_id : number | undefined;
  request_next_id : number | undefined;
  mapping_json : string | undefined;
  request : IRequest;
  request_next : IRequest;
}

interface IRequestsStreamResultLog extends IEntity {
  requests_stream_id : number | undefined;
  result_json : string | undefined;
  date : Date | undefined;
}

interface IMapping extends IEntity  {
  requests_stream_item_id : number | undefined;
  field_from_path : string| undefined;
  field_to_path : string| undefined;
}
