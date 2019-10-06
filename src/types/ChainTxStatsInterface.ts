export interface ChainTxStatsInterface {
  time?:number;
  txcount?:number;
  txrate?:number;
  window_block_count?:number;
  window_final_block_hash?:string;
  window_interval?:number;
  window_tx_count?:number;
}
