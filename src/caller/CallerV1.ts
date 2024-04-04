import { IRequest } from "../domain/interfaces/IRequest";
import { IRequestsStream } from "../domain/interfaces/IRequestsStream";
import { Caller } from "./abstraction/Caller";
import { CallBackKeys } from "./models/CallBackKeys";

export class CallerV1 extends Caller {

  constructor(requestStream : IRequestsStream, callBackKeys : CallBackKeys) {
    super(requestStream, callBackKeys);
  }


  async Map(): Promise<void> {
    if(this.CurrentIndex == 0)
      return;


  }


  Call(): void {
    fetch(this.CurrentRequest!.input, this.CurrentRequest?.init)
      .then(res => {
        return res.json();
      })
      .then(result =>{
        this.Responses[this.CurrentIndex] = result;
      })

    this.CurrentRequest = undefined;
  }
}
