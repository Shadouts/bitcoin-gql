import RPC from 'Classes/RPC';
import Block, { queryBlock } from 'Models/Block';
import { BlockChainInfoInterface } from 'Types/BlockChainInfoInterface';
import { BlockchainQueryMethod } from 'Types/BlockchainQueryMethod';
import {
  BIP9Softforks,
  SoftFork
} from 'Types/BlockchainSubtypes';

export default class BlockChainInfo {
  public automatic_pruning:boolean;
  public bestblockhash:string;
  public bip9_softforks:BIP9Softforks;
  public blocks:number;
  public chain:string;
  public chainwork:string;
  public difficulty:number;
  public headers:number;
  public initialblockdownload:boolean;
  public mediantime:number;
  public pruned:boolean;
  public pruneheight:number;
  public prune_target_size:number;
  public size_on_disk:number;
  public softforks:SoftFork[];
  public verificationprogress:number;
  public warnings:string;

  constructor(initVals:BlockChainInfoInterface) {
    Object.assign(this, initVals);
  }

  public bestBlock(args:{ verbosity:number; }):Promise<Block> {
    return queryBlock({
      blockhash: this.bestblockhash,
      verbosity: args.verbosity
    });
  }
}

export async function queryBlockChainInfo():Promise<BlockChainInfo> {
  let info:BlockChainInfoInterface;

  try {
    const rpc:RPC = new RPC();

    info = await rpc.query({
      method:BlockchainQueryMethod.getblockchaininfo
    });
  } catch (err) {
    console.error(err);
  } finally {
    return new BlockChainInfo(info);
  }
}
