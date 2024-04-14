import { Entity } from "../../domain/abstractions/BaseEntity";
import { IMapping } from "../../domain/interfaces/IMapping";
import { IRequest } from "../../domain/interfaces/IRequest";
import { IRequestsStreamItem } from "../../domain/interfaces/IRequestsStreamItem";
import { dbContext } from "../context";

export class RequestsStreamItemEntity extends Entity implements IRequestsStreamItem {
  constructor(base: any = null) {
    super();
    base && this.FillFromJson(base);
  }


  public get request() :  Promise<IRequest | undefined> {
    return dbContext.RequestController.LoadByID(this.request_id!);
  }

  public get mappings(): Promise<IMapping[] | undefined> {
    return dbContext.MappingController.LoadAllByRequestsStreamItemId(this.id!);
  }

  requests_stream_id: number | undefined;
  request_id: number | undefined;
  position_index: number | undefined;

  FillFromJson(base: any): void {
    this.id = base.id;
    this.requests_stream_id = base.requests_stream_id;
    this.request_id = base.request_id;
    this.position_index = base.position_index;
  }
}
