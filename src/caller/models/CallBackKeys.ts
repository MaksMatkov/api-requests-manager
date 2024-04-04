export class CallBackKeys {
  private _LogKey : string;
  private _ErrorKey : string;
  private _ResultKey : string;

  public get LogKey() : string {return this._LogKey; }
  public get ErrorKey() : string {return this._ErrorKey; }
  public get ResultKey() : string {return this._ResultKey; }

  constructor(logKey : string, errorKey : string, resultKey : string){
    this._LogKey = logKey;
    this._ErrorKey = errorKey;
    this._ResultKey = resultKey;
  }
}
