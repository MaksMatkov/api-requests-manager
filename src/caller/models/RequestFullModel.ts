export class RequestFullModel {
  private _input: RequestInfo | URL;
  private _init?: RequestInit;
  private _mappings_from_prev_request : [string, string][] | undefined;
  private index : number;

  public get input() : RequestInfo | URL {return this._input;}
  public get init() : RequestInit | undefined {return this._init;}
  public get mappings_from_prev_request() : [string, string][] | undefined {return this._mappings_from_prev_request;}

  constructor(input : RequestInfo | URL, index : number, init? : RequestInit, _mappings_from_prev_request? : [string, string][] | undefined){
    this._input = input;
    this._init = init;
    this._mappings_from_prev_request = _mappings_from_prev_request;
    this.index = index;


  }
}
