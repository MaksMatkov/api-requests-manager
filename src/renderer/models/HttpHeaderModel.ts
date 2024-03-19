import { Entity } from "../../domain/abstractions/BaseEntity";
import { IHttpHeader } from "../../domain/interfaces/IHttpHeader";

export class HttpHeaderModel extends Entity implements IHttpHeader {

  name: string | undefined;
  request_id: number | undefined;
  value: string | undefined;

  constructor(base: any = null) {
    super();
    base && this.FillFromJson(base);
  }

  FillFromJson(base: any) {
    this.id = base.id;
    this.name = base.name;
    this.value = base.value;
    this.request_id = base.request_id;

    return this;
  }
}
