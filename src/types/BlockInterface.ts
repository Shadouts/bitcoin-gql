export interface BlockInterface {
  bits?:string;
  chainwork?:string;
  confirmations?:number;
  difficulty?:number;
  hash?:string;
  height?:number;
  hex?:string; // For verbosity 0. Serialized hex value of block
  mediantime?:number;
  merkleroot?:string;
  nextblockhash?:string;
  nonce?:number;
  nTx?:number;
  previousblockhash?:string;
  size?:number;
  strippedsize?:number;
  time?:number;
  tx?:string[];
  version?:number;
  versionHex?:string; // camelCasing exists in the RPC response
  weight?:number;
}
