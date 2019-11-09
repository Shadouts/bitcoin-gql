export class LocalAddress {
  public address:string;
  public port:number;
  public score:number;
}

export class Network {
  public limited:boolean;
  public name:string;
  public proxy_randomize_credentials:boolean;
  public proxy:string;
  public reachable:boolean;
}
