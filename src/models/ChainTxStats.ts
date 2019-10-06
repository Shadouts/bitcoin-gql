import RPC from 'Classes/RPC';
import { ChainTxStatsInterface } from 'Types/ChainTxStatsInterface';
import { BlockchainQueryMethod } from 'Types/BlockchainQueryMethod';
import { GetChainTxStatsParams } from 'Types/BlockchainQueryParams';

export default class ChainTxStats {
  public time:number;
  public txcount:number;
  public txrate:number;
  public window_block_count:number;
  public window_final_block_hash:string;
  public window_interval:number;
  public window_tx_count:number;

  constructor(initVals:ChainTxStatsInterface) {
    Object.assign(this, initVals);
  }
}

export async function queryChainTxStats(
  args:GetChainTxStatsParams
):Promise<ChainTxStats> {
  let stats:ChainTxStatsInterface;

  try {
    const rpc:RPC = new RPC();
    let params:(number|string)[] = [];

    if (args.nblocks) {
      params.push(args.nblocks);
    } else {
      params.push(null);
    }

    if (args.blockhash) {
      params.push(args.blockhash);
    }

    stats = await rpc.query({
      method: BlockchainQueryMethod.getchaintxstats,
      params
    });
    return this;
  } catch (err) {
    console.error(err);
  } finally {
    return new ChainTxStats(stats);
  }
}
