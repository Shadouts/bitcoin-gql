export interface DecodeRawTransactionParams {
  hexstring:string;
  iswitness?:boolean;
}

export interface DecodeScriptParams {
  hexstring:string;
}

export interface GetRawTransactionParams {
  txid:string;
}
