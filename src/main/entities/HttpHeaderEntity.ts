import { Entity } from "../../domain/abstractions/BaseEntity";
import { IHttpHeader } from "../../domain/interfaces/IHttpHeader";

export class HttpHeaderEntity extends Entity implements IHttpHeader {

  public name : string | undefined;

  constructor(base: any = null) {
    super();
    base && this.FillFromJson(base);
  }

  request_id: number | undefined;
  value: string | undefined;

  FillFromJson(base: any): void {
    this.id = base.id;
    this.name = base.name;
    this.request_id = base.request_id;
  }

}
