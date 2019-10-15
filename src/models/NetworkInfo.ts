import RPC from 'Classes/RPC';
import { NetworkQueryMethod } from 'Types/NetworkQueryMethod';
import { NetworkInfoInterface } from 'Types/NetworkInfoInterface';
import {
  LocalAddress,
  Network
} from 'Types/NetworkInfoSubtypes';

export default class NetworkInfo {
  public connections:number;
  public incrementalfee:number;
  public localaddresses:LocalAddress[];
  public localrelay:boolean;
  public localservices:string;
  public networkactive:boolean;
  public networks:Network[];
  public protocolversion:number;
  public relayfee:number;
  public subversion:string;
  public timeoffset:number;
  public version:number;
  public warnings:string;

  constructor (initVals:NetworkInfoInterface) {
    Object.assign(this, initVals);
  }
}

export async function queryNetworkInfo():Promise<NetworkInfo> {
  let info:NetworkInfoInterface;

  try {
    const rpc:RPC = new RPC();

    info = await rpc.query({
      method: NetworkQueryMethod.getnetworkinfo
    });
  } catch (err) {
    console.error(err);
  } finally {
    return new NetworkInfo(info);
  }
}
