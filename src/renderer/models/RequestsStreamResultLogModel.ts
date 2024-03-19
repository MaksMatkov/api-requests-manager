import { Entity } from "../../domain/abstractions/BaseEntity";
import { IRequestsStreamResultLog } from "../../domain/interfaces/IRequestsStreamResultLog";
import { RequestsStreamResultLogEntity } from "../../main/entities/RequestsStreamResultLogEntity";


export class RequestsStreamResultLogModel extends Entity implements IRequestsStreamResultLog {


  constructor(base: any = null) {
    super();
    base && this.FillFromJson(base);
  }
  requests_stream_id: number | undefined;
  result_json: string | undefined;
  date: Date | undefined;



  FillFromJson(base: any): void {
    this.id = base.id;
    this.result_json = base.name;
    this.date = base.last_start;
    this.requests_stream_id = base.last_start;
  }

  ToEntity() : RequestsStreamResultLogEntity {
    return new RequestsStreamResultLogEntity(this);
  }
}
