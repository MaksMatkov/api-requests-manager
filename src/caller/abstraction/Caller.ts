import { IRequest } from "../../domain/interfaces/IRequest";
import { IRequestsStream } from "../../domain/interfaces/IRequestsStream";
import { IRequestsStreamItem } from "../../domain/interfaces/IRequestsStreamItem";
import { ICaller } from "../interfaces/ICaller";
import { CallBackKeys } from "../models/CallBackKeys";
import { RequestFullModel } from "../models/RequestFullModel";

export abstract class Caller implements ICaller {
  protected CurrentRequest: IRequest | undefined;
  CurrentIndex: number = 0;
  Responses!: string[];
  protected CurrentRequestFullInfo: RequestFullModel | undefined;
  RequestStreamItems!: IRequestsStreamItem[];
  protected CallBackKeys! : CallBackKeys;

  constructor(requestStream : IRequestsStream, callBackKeys : CallBackKeys){

    requestStream.requests_stream_items.then(requests_stream_items => {

        this.RequestStreamItems = requests_stream_items!;

        this.CurrentIndex = 0;
        this.Responses = new Array(this.RequestStreamItems.length);
        this.CallBackKeys = callBackKeys;

        this.RequestStreamItems[this.CurrentIndex].request.then(request => {
          this.CurrentRequest = request!;

          this.Procces();
        })

    })
  }



  async InitNext(): Promise<void> {
    this.CurrentRequest = undefined;

    if(this.CurrentIndex + 1 == this.RequestStreamItems.length)
      return;

    try{
      await this.RequestStreamItems[this.CurrentIndex].request.then(async res => {
        this.CurrentRequest = res;
        if(this.CurrentRequest){
          var httpHeaders : HeadersInit | undefined;
          await this.CurrentRequest.http_headers.then(res => {
            if(res){
              httpHeaders = res.map(el => [el.name!, el.value!])
            }
          })
          var method : string | undefined;
          await this.CurrentRequest.http_method.then(res => {
            if(res){
              method = res.name;
            }
          })

          var requestInit : RequestInit = {
            body: this.CurrentRequest.body,
            headers: httpHeaders,
            method: method
          }

          this.CurrentRequestFullInfo = new RequestFullModel(new URL(this.CurrentRequest.path!), requestInit);
        }
      });
    }
    catch(err) {throw err}
  }

  abstract Map(): void;
  abstract Call(): void;

  Procces() : void {
    this.RequestStreamItems.map(val => {
      try{
        this.ProccesNext();
      }
      catch(error){
        if (error instanceof Error) {
          console.error(error.message);
        }
      }

    });
  }

  ProccesNext(): void {
    this.InitNext().then(() => {

      if(this.CurrentIndex != 0 && this.Responses[this.CurrentIndex - 1])
        this.Map();

      if(this.CurrentRequestFullInfo)
        this.Call();
    })
  }
}
