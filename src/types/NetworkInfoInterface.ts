import {
  LocalAddress,
  Network
} from 'Types/NetworkInfoSubtypes';

export interface NetworkInfoInterface {
  connections:number;
  incrementalfee:number;
  localaddresses:LocalAddress[];
  localrelay:boolean;
  localservices:string;
  networkactive:boolean;
  networks:Network[];
  protocolversion:number;
  relayfee:number;
  subversion:string;
  timeoffset:number;
  version:number;
  warnings:string;
}
