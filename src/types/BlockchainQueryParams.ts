export interface GetBlockParams {
  blockhash:string;
  verbosity?:number;
}

export interface GetBlockHashParams {
  height:number;
}

export interface GetBlockHeaderParams {
  blockhash:string;
}

export interface GetBlockStatsParams {
  height:number;
}

export interface GetChainTxStatsParams {
  nblocks?:number;
  blockhash?:string;
}

export interface GetMemPoolAncDescParams {
  txid:string;
}

export interface GetMemPoolEntryParams {
  txid:string;
}

export interface GetTxOutParams {
  txid:string;
  n:number;
  include_mempool?:boolean;
}

export interface GetTxOutProofParams {
  txids:string[],
  blockhash?:string
}

export interface VerifyChainParams {
  checklevel?:number;
  nblocks?:number;
}

export interface VerifyTxOutProofParams {
  proof:string;
}
