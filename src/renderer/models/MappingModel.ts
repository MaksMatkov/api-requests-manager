import { Entity } from "../../domain/abstractions/BaseEntity";
import { IEntityConvertable } from "../../domain/interfaces/IEntityConvertable";
import { IMapping } from "../../domain/interfaces/IMapping";
import { MappingEntity } from "../../main/entities/MappingEntity";

export class MappingModel  extends Entity implements IMapping, IEntityConvertable<MappingEntity>{
  FillFromJson(base: any): void {
    this.requests_stream_item_id = base.requests_stream_item_id;
    this.field_to_path = base.field_to_path;
    this.field_from_path = base.field_from_path;
  }

  requests_stream_item_id: number | undefined;
  field_from_path: string | undefined;
  field_to_path: string | undefined;

  constructor(base: any = null) {
    super();
    base && this.FillFromJson(base);
  }

  ToEntity(): MappingEntity {
    return new MappingEntity(this);
  }

}
