import RPC from 'Classes/RPC';
import { NetworkQueryMethod } from 'Types/NetworkQueryMethod';
import { PeerInfoInterface } from 'Types/PeerInfoInterface';

export default class PeerInfo {
  public addnode:boolean;
  public addr:string;
  public addrbind:string;
  public addrlocal:string;
  public banscore:number;
  // public bytesrecv_per_msg: How should this work?
  public bytesrecv:number;
  // public bytessent_per_msg: How should this work?
  public bytessent:number;
  public conntime:number;
  public id:number;
  public inbound:boolean;
  public inflight:number[];
  public lastrecv:number;
  public lastsend:number;
  public minfeefilter:number;
  public minping:number;
  public pingtime:number;
  public pingwait:number;
  public relaytxes:boolean;
  public services:string;
  public startingheight:number;
  public subver:string;
  public synced_blocks:number;
  public synced_headers:number;
  public timeoffset:number;
  public version:number;
  public whitelisted:boolean;

  constructor (initVals:PeerInfoInterface) {
    Object.assign(this, initVals);
  }
}

export async function queryPeerInfo():Promise<PeerInfo[]> {
  let info:PeerInfoInterface[];

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
