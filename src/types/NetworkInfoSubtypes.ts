export class LocalAddress {
  public address:string|undefined;
  public port:number|undefined;
  public score:number|undefined;
}

export class Network {
  public limited:boolean|undefined;
  public name:string|undefined;
  public proxy_randomize_credentials:boolean|undefined;
  public proxy:string|undefined;
  public reachable:boolean|undefined;
}
