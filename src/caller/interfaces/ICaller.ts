import { IRequestsStreamItem } from "../../domain/interfaces/IRequestsStreamItem";

export interface ICaller {
  RequestStreamItems : IRequestsStreamItem[];
  CurrentIndex : number;
  Responses : string[];
  Procces() : void;
}
