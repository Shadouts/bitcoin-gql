import RPC from 'Classes/RPC';
import { NetworkQueryMethod } from 'Types/NetworkQueryMethod';
import { NetworkInfoInterface } from 'Types/NetworkInfoInterface';
import {
  LocalAddress,
  Network
} from 'Types/NetworkInfoSubtypes';

export default class NetworkInfo {
  public connections:number|undefined;
  public incrementalfee:number|undefined;
  public localaddresses:LocalAddress[]|undefined;
  public localrelay:boolean|undefined;
  public localservices:string|undefined;
  public networkactive:boolean|undefined;
  public networks:Network[]|undefined;
  public protocolversion:number|undefined;
  public relayfee:number|undefined;
  public subversion:string|undefined;
  public timeoffset:number|undefined;
  public version:number|undefined;
  public warnings:string|undefined;

  constructor (initVals:NetworkInfoInterface) {
    Object.assign(this, initVals);
  }
}

export async function queryNetworkInfo():Promise<NetworkInfo|null> {
  let info:NetworkInfoInterface|null = null;

  try {
    const rpc:RPC = new RPC();

    info = await rpc.query({
      method: NetworkQueryMethod.getnetworkinfo
    });
  } catch (err) {
    console.error(err);
  } finally {
    if (info) {
      return new NetworkInfo(info);
    } else {
      return null;
    }
  }
}
