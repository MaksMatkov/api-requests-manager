import { Entity } from "../../domain/abstractions/BaseEntity";
import { IRequestsStreamResultLog } from "../../domain/interfaces/IRequestsStreamResultLog";

export class RequestsStreamResultLogEntity extends Entity implements IRequestsStreamResultLog {

  constructor(base: any = null) {
    super();
    base && this.FillFromJson(base);
  }

  requests_stream_id: number | undefined;
  result_json: string | undefined;
  date: Date | undefined;

  FillFromJson(base: any): void {
    this.id = base.id;
    this.requests_stream_id = base.requests_stream_id;
    this.result_json = base.result_json;
    this.date = base.date;
  }

}
