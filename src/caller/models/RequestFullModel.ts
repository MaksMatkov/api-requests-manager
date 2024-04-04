export class RequestFullModel {
  private _input: RequestInfo | URL;
  private _init?: RequestInit;

  public get input() : RequestInfo | URL {return this._input;}
  public get init() : RequestInit | undefined {return this._init;}

  constructor(input : RequestInfo | URL, init? : RequestInit){
    this._input = input;
    this._init = init;
  }
}
