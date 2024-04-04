import { IRequest } from "../domain/interfaces/IRequest";
import { IRequestsStream } from "../domain/interfaces/IRequestsStream";
import { Caller } from "./abstraction/Caller";
import { CallBackKeys } from "./models/CallBackKeys";

export class CallerV1 extends Caller {

  constructor(requestStream : IRequestsStream, callBackKeys : CallBackKeys) {
    super(requestStream, callBackKeys);
  }


  Map(): void {
    throw new Error("Method not implemented.");
  }


  Call(): void {
    fetch(this.CurrentRequestFullInfo!.input, this.CurrentRequestFullInfo?.init)
      .then(res => {
        return res.json();
      })
      .then(result =>{
        this.Responses[this.CurrentIndex] = result;
      })

    this.CurrentRequestFullInfo = undefined;
  }
}
