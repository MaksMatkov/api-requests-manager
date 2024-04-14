import { Entity } from "../abstractions/BaseEntity";

export interface IEntityConvertable <T extends Entity> {
  ToEntity() : T;
}
