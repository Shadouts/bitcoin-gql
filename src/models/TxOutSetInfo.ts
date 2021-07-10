import RPC from 'Classes/RPC';
import Block, { queryBlock } from 'Models/Block';
import { TxOutSetInfoInterface } from 'Types/TxOutSetInfoInterface';
import { BlockchainQueryMethod } from 'Types/BlockchainQueryMethod';

export default class TxOutSetInfo {
  public bestblock:string|undefined;
  public bogosize:number|undefined;
  public disk_size:number|undefined;
  public hash_serialized_2:string|undefined;
  public height:number|undefined;
  public total_amount:number|undefined;
  public transactions:number|undefined;
  public txouts:number|undefined;

  constructor(initVals:TxOutSetInfoInterface) {
    Object.assign(this, initVals);
  }

  public bestBlockData():Promise<Block> {
    return queryBlock({ blockhash: this.bestblock || '' });
  }
}

export async function queryTxOutSetInfo():Promise<TxOutSetInfo|null> {
  let info:TxOutSetInfoInterface|null = null;

  try {
    const rpc:RPC = new RPC();
    info = await rpc.query({ method: BlockchainQueryMethod.gettxoutsetinfo });
  } catch (err) {
    console.error(err);
  } finally {
    if (info) {
      return new TxOutSetInfo(info);
    } else {
      return null;
    }
  }
}
