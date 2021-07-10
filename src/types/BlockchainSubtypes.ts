class BIP9Softfork {
  public bit:number|undefined;
  public since:number|undefined;
  public startTime:number|undefined;
  public statistics:{
    count:number;
    elapsed:number;
    period:number;
    possible:boolean;
    threshold:number;
  }|undefined;
  public status:number|undefined;
  public timeout:number|undefined;
}

export class BIP9Softforks {
  public csv:BIP9Softfork|undefined;
  public segwit:BIP9Softfork|undefined;
}

export class SoftFork {
  public id:string|undefined;
  public reject:{
    found:number;
    required:number;
    status:boolean;
    window:number;
  }|undefined;
  public version:number|undefined;
}
