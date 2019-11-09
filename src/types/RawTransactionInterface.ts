export interface RawTransactionInterface {
  blockhash?:string;
  blocktime?:number;
  confirmations?:number;
  hash?:string;
  hex?:string;
  in_active_chain?:boolean;
  locktime?:number;
  size?:number;
  time?:number;
  txid?:string;
  version?:number;
  vin?:object[];
  vout?:object[]
  vsize?:number;
  weight?:number;
}
