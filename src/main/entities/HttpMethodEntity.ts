import { Entity } from "../../domain/abstractions/BaseEntity";
import { IHttpMethod } from "../../domain/interfaces/IHttpMethod";

export class HttpMethodEntity extends Entity implements IHttpMethod {

  public name : string | undefined;

  constructor(base: any = null) {
    super();
    base && this.FillFromJson(base);
  }

  FillFromJson(base: any): void {
    this.id = base.id;
    this.name = base.name;
  }
}
