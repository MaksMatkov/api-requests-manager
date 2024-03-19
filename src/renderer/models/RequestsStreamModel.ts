import { Entity } from "../../domain/abstractions/BaseEntity";
import { IRequestsStream } from "../../domain/interfaces/IRequestsStream";
import { IRequestsStreamItem } from "../../domain/interfaces/IRequestsStreamItem";
import { IRequestsStreamResultLog } from "../../domain/interfaces/IRequestsStreamResultLog";
import { RequestsStreamEntity } from "../../main/entities/RequestsStreamEntity";
import { requestsStreamItemService } from "../services/RequestsStreamItemService";
import { requestsStreamResultLogService } from "../services/RequestsStreamResultLogService";

export class RequestsStreamModel extends Entity implements IRequestsStream {


  constructor(base: any = null) {
    super();
    base && this.FillFromJson(base);
  }


  public get requests_stream_result_logs(): Promise<IRequestsStreamResultLog[] | undefined>{
    return requestsStreamResultLogService.LoadAllByRequestsStreamId(this.id!);
  }

  public get requests_stream_items(): Promise<IRequestsStreamItem[] | undefined> {
    return requestsStreamItemService.LoadAllByRequestsStreamId(this.id!);
  }

  last_start: Date | undefined;
  name: string | undefined;

  FillFromJson(base: any): void {
    this.id = base.id;
    this.name = base.name;
    this.last_start = base.last_start;
  }

  ToEntity() : RequestsStreamEntity {
    return new RequestsStreamEntity(this);
  }
}
