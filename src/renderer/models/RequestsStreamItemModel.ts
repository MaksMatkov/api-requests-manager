import { Entity } from "../../domain/abstractions/BaseEntity";
import { IRequest } from "../../domain/interfaces/IRequest";
import { IRequestsStreamItem } from "../../domain/interfaces/IRequestsStreamItem";
import { RequestsStreamItemEntity } from "../../main/entities/RequestsStreamItemEntity";
import { requestService } from "../services/RequestService";

export class RequestsStreamItemModel extends Entity implements IRequestsStreamItem {


  constructor(base: any = null) {
    super();
    base && this.FillFromJson(base);
  }
  requests_stream_id: number | undefined;
  request_id: number | undefined;
  index: number | undefined;
  mapping_json: string | undefined;

  public get request() :  Promise<IRequest | undefined> {
    return requestService.LoadByID(this.request_id!);
  }

  public get request_next() :  Promise<IRequest | undefined> {
    return requestService.LoadByID(this.index!);
  }

  FillFromJson(base: any): void {
    this.id = base.id;
    this.requests_stream_id = base.requests_stream_id;
    this.request_id = base.request_id;
    this.index = base.request_next_id;
    this.mapping_json = base.mapping_json;
  }

  ToEntity() : RequestsStreamItemEntity {
    return new RequestsStreamItemEntity(this);
  }
}
