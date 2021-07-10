import RPC from 'Classes/RPC';
import Block, { queryBlock } from 'Models/Block';
import { BlockChainInfoInterface } from 'Types/BlockChainInfoInterface';
import { BlockchainQueryMethod } from 'Types/BlockchainQueryMethod';
import {
  BIP9Softforks,
  SoftFork
} from 'Types/BlockchainSubtypes';

export default class BlockChainInfo {
  public automatic_pruning:boolean|undefined;
  public bestblockhash:string|undefined;
  public bip9_softforks:BIP9Softforks|undefined;
  public blocks:number|undefined;
  public chain:string|undefined;
  public chainwork:string|undefined;
  public difficulty:number|undefined;
  public headers:number|undefined;
  public initialblockdownload:boolean|undefined;
  public mediantime:number|undefined;
  public pruned:boolean|undefined;
  public pruneheight:number|undefined;
  public prune_target_size:number|undefined;
  public size_on_disk:number|undefined;
  public softforks:SoftFork[]|undefined;
  public verificationprogress:number|undefined;
  public warnings:string|undefined;

  constructor(initVals:BlockChainInfoInterface) {
    Object.assign(this, initVals);
  }

  public bestBlock(args:{ verbosity:number; }):Promise<Block> {
    return queryBlock({
      blockhash: this.bestblockhash || '',
      verbosity: args.verbosity
    });
  }
}

export async function queryBlockChainInfo():Promise<BlockChainInfo|null> {
  let info:BlockChainInfoInterface|null = null;

  try {
    const rpc:RPC = new RPC();

    info = await rpc.query({
      method:BlockchainQueryMethod.getblockchaininfo
    });
  } catch (err) {
    console.error(err);
  } finally {
    if (info) {
      return new BlockChainInfo(info);
    } else {
      return null
    }
  }
}
