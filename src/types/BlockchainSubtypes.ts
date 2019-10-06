class BIP9Softfork {
  public bit:number;
  public since:number;
  public startTime:number;
  public statistics:{
    count:number;
    elapsed:number;
    period:number;
    possible:boolean;
    threshold:number;
  };
  public status:number;
  public timeout:number;
}

export class BIP9Softforks {
  public csv:BIP9Softfork;
  public segwit:BIP9Softfork;
}

export class SoftFork {
  public id:string;
  public reject:{
    found:number;
    required:number;
    status:boolean;
    window:number;
  };
  public version:number;
}
