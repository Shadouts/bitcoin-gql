import {
  BIP9Softforks,
  SoftFork
} from 'Types/BlockchainSubtypes';

export interface BlockChainInfoInterface {
  automatic_pruning?:boolean;
  bestblockhash?:string;
  bip9_softforks:BIP9Softforks; // This struture is a cheat, but messy.
  blocks?:number;
  chain?:string;
  chainwork?:string;
  difficulty?:number;
  headers?:number;
  initialblockdownload?:boolean;
  mediantime?:number;
  prune_target_size?:number;
  pruned?:boolean;
  pruneheight?:number;
  size_on_disk?:number;
  softforks?:SoftFork[];
  verificationprogress?:number;
  warnings?:string;
}
