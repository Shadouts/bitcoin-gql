import RPC from 'Classes/RPC';
import Block, { queryBlock } from 'Models/Block';
import { TxOutSetInfoInterface } from 'Types/TxOutSetInfoInterface';
import { BlockchainQueryMethod } from 'Types/BlockchainQueryMethod';

export default class TxOutSetInfo {
  public bestblock:string
  public bogosize:number;
  public disk_size:number;
  public hash_serialized_2:string;
  public height:number;
  public total_amount:number;
  public transactions:number;
  public txouts:number;

  constructor(initVals:TxOutSetInfoInterface) {
    Object.assign(this, initVals);
  }

  public bestBlockData():Promise<Block> {
    return queryBlock({ blockhash: this.bestblock });
  }
}

export async function queryTxOutSetInfo():Promise<TxOutSetInfo> {
  let info:TxOutSetInfoInterface;

  try {
    const rpc:RPC = new RPC();
    info = await rpc.query({ method: BlockchainQueryMethod.gettxoutsetinfo });
  } catch (err) {
    console.error(err);
  } finally {
    return new TxOutSetInfo(info);
  }
}
