import { IRequestsStream } from "../../domain/interfaces/IRequestsStream";
import { ICaller } from "../interfaces/ICaller";
import { CallBackKeys } from "../models/CallBackKeys";
import { RequestFullModel } from "../models/RequestFullModel";

export abstract class Caller implements ICaller {
  protected CurrentRequest: RequestFullModel | undefined;
  CurrentIndex: number = 0;
  Responses!: string[];
  Request!: RequestFullModel[];
  protected CallBackKeys : CallBackKeys | undefined;

  constructor(requestStream : IRequestsStream, callBackKeys : CallBackKeys | undefined){
    this.CurrentIndex = 0;
    this.CallBackKeys = callBackKeys;
    this.ParseToRequestFullModel(requestStream).then(() => this.Procces());
  }

  private async ParseToRequestFullModel(requestStream : IRequestsStream): Promise<void> {

    await requestStream.requests_stream_items.then(async requests_stream_items => {

      if(!requests_stream_items)
        return;

      requests_stream_items.sort((a ,b) => a.position_index! - b.position_index!);
      this.Responses = new Array(requests_stream_items.length);

      await requests_stream_items.forEach(async requestStreamItem => {
        await requestStreamItem.request.then(async request => {
          if(request){
            var httpHeaders : HeadersInit | undefined;
            await request.http_headers.then(res => {
              if(res){
                httpHeaders = res.map(el => [el.name!, el.value!])
              }
            })
            var method : string | undefined;
            await request.http_method.then(res => {
              if(res){
                method = res.name;
              }
            })

            var requestInit : RequestInit = {
              body: request.body,
              headers: httpHeaders,
              method: method
            }

            var mappings : [string, string][] | undefined;
            requestStreamItem.mappings.then(mapping => {
              mappings = mapping?.map(el => [el.field_from_path!, el.field_to_path!])
            })

            this.Request.push(new RequestFullModel(new URL(request.path!), requestStreamItem.position_index!, requestInit, mappings));
          }
        });
      });

  })
  }

  abstract Map(): void;
  abstract Call(): void;

  Procces() : void {
    return;
    this.CurrentRequest = this.Request[this.CurrentIndex];
    this.Request.map(val => {
      try{
        this.ProccesNext();
        this.CurrentIndex++;
      }
      catch(error){
        if (error instanceof Error) {
          console.error(error.message);
        }
      }

    });
  }

  ProccesNext(): void {
    this.Map();
    this.Call();
  }
}
