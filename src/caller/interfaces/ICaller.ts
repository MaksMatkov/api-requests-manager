import { RequestFullModel } from "../models/RequestFullModel";

export interface ICaller {
  Request : RequestFullModel[];
  CurrentIndex : number;
  Responses : string[];
  Procces() : void;
}
