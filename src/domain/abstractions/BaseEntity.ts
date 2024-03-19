import { IEntity } from "../interfaces/IEntity";

export abstract class Entity implements IEntity {
  id : number | undefined;

  abstract FillFromJson(base : any) : void;

  constructor() {}


}
