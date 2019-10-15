export interface PeerInfoInterface {
  addnode:boolean;
  addr:string;
  addrbind:string;
  addrlocal:string;
  banscore:number;
  // bytesrecv_per_msg: How should this work?
  bytesrecv:number;
  // bytessent_per_msg: How should this work?
  bytessent:number;
  conntime:number;
  id:number;
  inbound:boolean;
  inflight:number[];
  lastrecv:number;
  lastsend:number;
  minfeefilter:number;
  minping:number;
  pingtime:number;
  pingwait:number;
  relaytxes:boolean;
  services:string;
  startingheight:number;
  subver:string;
  synced_blocks:number;
  synced_headers:number;
  timeoffset:number;
  version:number;
  whitelisted:boolean;
}
