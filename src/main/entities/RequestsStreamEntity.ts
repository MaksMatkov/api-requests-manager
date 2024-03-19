import { Entity } from "../../domain/abstractions/BaseEntity";
import { IRequestsStream } from "../../domain/interfaces/IRequestsStream";
import { IRequestsStreamItem } from "../../domain/interfaces/IRequestsStreamItem";
import { IRequestsStreamResultLog } from "../../domain/interfaces/IRequestsStreamResultLog";
import { dbContext } from "../context";

export class RequestsStreamEntity extends Entity implements IRequestsStream {

  name: string | undefined;
  last_start: Date | undefined;

  public get requests_stream_result_logs(): Promise<IRequestsStreamResultLog[] | undefined>{
    return dbContext.RequestsStreamResultLogController.LoadAllByRequestsStreamId(this.id || 0);
  }

  public get requests_stream_items(): Promise<IRequestsStreamItem[] | undefined>{
    return dbContext.RequestsStreamItemController.LoadAllByRequestsStreamId(this.id || 0);
  }

  constructor(base: any = null) {
    super();
    base && this.FillFromJson(base);
  }

  FillFromJson(base: any): void {
    this.id = base.id;
    this.name = base.name;
    this.last_start = base.last_start;
  }
}
