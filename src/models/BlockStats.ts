import RPC from 'Classes/RPC';
import { BlockStatsInterface } from 'Types/BlockStatsInterface';
import { BlockchainQueryMethod } from 'Types/BlockchainQueryMethod';
import { GetBlockStatsParams } from 'Types/BlockchainQueryParams';

export default class BlockStats {
  public avgfee:number;
  public avgfeerate:number;
  public avgtxsize:number;
  public blockhash:string;
  public feerate_percentiles:number[]
  public height:number;
  public ins:number;
  public maxfee:number;
  public maxfeerate:number;
  public maxtxsize:number;
  public medianfee:number;
  public mediantime:number;
  public mediantxsize:number;
  public minfee:number;
  public minfeerate:number;
  public mintxsize:number;
  public outs:number;
  public subsidy:number;
  public swtotal_size:number;
  public swtotal_weight:number;
  public swtxs:number;
  public time:number;
  public total_out:number;
  public total_size:number;
  public total_weight:number;
  public totalfee:number;
  public txs:number;
  public utxo_increase:number;
  public utxo_size_inc:number;

  constructor(initVals:BlockStatsInterface) {
    Object.assign(this, initVals);
  }
}

export async function queryBlockStats(
  args:GetBlockStatsParams
):Promise<BlockStats> {
  let stats:BlockStatsInterface;

  try {
    const rpc:RPC = new RPC();

    stats = await rpc.query({
      method: BlockchainQueryMethod.getblockstats,
      params: [ args.height ]
    });
  } catch (err) {
    console.error();
  } finally {
    return new BlockStats(stats);
  }
}
