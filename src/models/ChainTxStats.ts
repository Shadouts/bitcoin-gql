import RPC from 'Classes/RPC';
import { ChainTxStatsInterface } from 'Types/ChainTxStatsInterface';
import { BlockchainQueryMethod } from 'Types/BlockchainQueryMethod';
import { GetChainTxStatsParams } from 'Types/BlockchainQueryParams';

export default class ChainTxStats {
  public time:number|undefined;
  public txcount:number|undefined;
  public txrate:number|undefined;
  public window_block_count:number|undefined;
  public window_final_block_hash:string|undefined;
  public window_interval:number|undefined;
  public window_tx_count:number|undefined;

  constructor(initVals:ChainTxStatsInterface) {
    Object.assign(this, initVals);
  }
}

export async function queryChainTxStats(
  args:GetChainTxStatsParams
):Promise<ChainTxStats|null> {
  let stats:ChainTxStatsInterface|null = null;

  try {
    const rpc:RPC = new RPC();
    let params:(number|string)[] = [];

    if (args.nblocks) {
      params.push(args.nblocks);
    } else {
      params.push(0);
    }

    if (args.blockhash) {
      params.push(args.blockhash);
    }

    stats = await rpc.query({
      method: BlockchainQueryMethod.getchaintxstats,
      params
    });
  } catch (err) {
    console.error(err);
  } finally {
    if (stats) {
      return new ChainTxStats(stats);
    } else {
      return null
    }
  }
}
