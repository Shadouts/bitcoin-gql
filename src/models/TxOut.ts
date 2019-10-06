import RPC from 'Classes/RPC';
import { TxOutInterface } from 'Types/TxOutInterface';
import { ScriptPubKey } from 'Types/TxOutSubtypes';
import { BlockchainQueryMethod } from '../types/BlockchainQueryMethod';
import { GetTxOutParams } from '../types/BlockchainQueryParams';

export default class TxOut {
  public bestblock:string;
  public coinbase:boolean;
  public confirmations:number;
  public scriptPubKey:ScriptPubKey;
  public value:number;

  constructor(initVals:TxOutInterface) {
    Object.assign(this, initVals);
  }
}

export async function queryTxOut(args:GetTxOutParams):Promise<TxOut> {
  let info:TxOutInterface;

  try {
    const rpc:RPC = new RPC();
    info = await rpc.query({
      method: BlockchainQueryMethod.gettxout,
      params: [ args.txid, args.n, args.include_mempool ]
    });
  } catch (err) {
    console.error(err);
  } finally {
    return new TxOut(info);
  }
}
