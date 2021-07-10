import RPC from 'Classes/RPC';
import Block, { queryBlock } from './Block';
import { ChainTipInterface } from 'Types/ChainTipInterface';
import { BlockchainQueryMethod } from 'Types/BlockchainQueryMethod';

export default class ChainTip {
  public height:number|undefined;
  public hash:string|undefined;
  public branchlen:number|undefined;
  public status:string|undefined;

  constructor(initVals:ChainTipInterface) {
    Object.assign(this, initVals);
  }

  public block():Promise<Block> {
    return queryBlock({ blockhash: this.hash || '' });
  }
}

export async function queryChainTips():Promise<ChainTip[]> {
  let tips:ChainTipInterface[] = [];

  try {
    const rpc:RPC = new RPC();
    tips = await rpc.query({ method: BlockchainQueryMethod.getchaintips });
  } catch (err) {
    console.error(err);
  } finally {
    return tips.map((tip:ChainTipInterface) => new ChainTip(tip));
  }
}
