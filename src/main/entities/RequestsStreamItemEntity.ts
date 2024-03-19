import { Entity } from "../../domain/abstractions/BaseEntity";
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

  public get request_next() :  Promise<IRequest | undefined> {
    return dbContext.RequestController.LoadByID(this.request_next_id!);
  }

  requests_stream_id: number | undefined;
  request_id: number | undefined;
  request_next_id: number | undefined;

  FillFromJson(base: any): void {
    this.id = base.id;
    this.requests_stream_id = base.requests_stream_id;
    this.request_id = base.request_id;
    this.request_next_id = base.request_next_id;
  }
}
