import RPC from 'Classes/RPC';
import { BlockStatsInterface } from 'Types/BlockStatsInterface';
import { BlockchainQueryMethod } from 'Types/BlockchainQueryMethod';
import { GetBlockStatsParams } from 'Types/BlockchainQueryParams';

export default class BlockStats {
  public avgfee:number|undefined;
  public avgfeerate:number|undefined;
  public avgtxsize:number|undefined;
  public blockhash:string|undefined;
  public feerate_percentiles:number[]|undefined;
  public height:number|undefined;
  public ins:number|undefined;
  public maxfee:number|undefined;
  public maxfeerate:number|undefined;
  public maxtxsize:number|undefined;
  public medianfee:number|undefined;
  public mediantime:number|undefined;
  public mediantxsize:number|undefined;
  public minfee:number|undefined;
  public minfeerate:number|undefined;
  public mintxsize:number|undefined;
  public outs:number|undefined;
  public subsidy:number|undefined;
  public swtotal_size:number|undefined;
  public swtotal_weight:number|undefined;
  public swtxs:number|undefined;
  public time:number|undefined;
  public total_out:number|undefined;
  public total_size:number|undefined;
  public total_weight:number|undefined;
  public totalfee:number|undefined;
  public txs:number|undefined;
  public utxo_increase:number|undefined;
  public utxo_size_inc:number|undefined;

  constructor(initVals:BlockStatsInterface) {
    Object.assign(this, initVals);
  }
}

export async function queryBlockStats(
  args:GetBlockStatsParams
):Promise<BlockStats|null> {
  let stats:BlockStatsInterface|null = null;

  try {
    const rpc:RPC = new RPC();

    stats = await rpc.query({
      method: BlockchainQueryMethod.getblockstats,
      params: [ args.height ]
    });
  } catch (err) {
    console.error();
  } finally {
    if (stats) {
      return new BlockStats(stats);
    } else {
      return null;
    }
  }
}
