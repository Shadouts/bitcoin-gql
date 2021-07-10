import RPC from 'Classes/RPC';
import { NetworkQueryMethod } from 'Types/NetworkQueryMethod';
import { PeerInfoInterface } from 'Types/PeerInfoInterface';

export default class PeerInfo {
  public addnode:boolean|undefined;
  public addr:string|undefined;
  public addrbind:string|undefined;
  public addrlocal:string|undefined;
  public banscore:number|undefined;
  // public bytesrecv_per_msg: How should this work?
  public bytesrecv:number|undefined;
  // public bytessent_per_msg: How should this work?
  public bytessent:number|undefined;
  public conntime:number|undefined;
  public id:number|undefined;
  public inbound:boolean|undefined;
  public inflight:number[]|undefined;
  public lastrecv:number|undefined;
  public lastsend:number|undefined;
  public minfeefilter:number|undefined;
  public minping:number|undefined;
  public pingtime:number|undefined;
  public pingwait:number|undefined;
  public relaytxes:boolean|undefined;
  public services:string|undefined;
  public startingheight:number|undefined;
  public subver:string|undefined;
  public synced_blocks:number|undefined;
  public synced_headers:number|undefined;
  public timeoffset:number|undefined;
  public version:number|undefined;
  public whitelisted:boolean|undefined;

  constructor (initVals:PeerInfoInterface) {
    Object.assign(this, initVals);
  }
}

export async function queryPeerInfo():Promise<PeerInfo[]> {
  let info:PeerInfoInterface[] = [];

  try {
    const rpc:RPC = new RPC();

    info = await rpc.query({
      method: NetworkQueryMethod.getpeerinfo
    });
  } catch (err) {
    console.error(err);
  } finally {
    return info.map(peerInfo => new PeerInfo(peerInfo));
  }
}
