export interface RawTransactionInterface {
  blockhash?:string;
  blocktime?:number;
  confirmations?:number;
  hash?:string;
  hex?:string;
  locktime?:number;
  size?:number;
  time?:number;
  txid?:string;
  version?:number;
  vin?:object[];
  vout?:object[]
  vsize?:number;
}
