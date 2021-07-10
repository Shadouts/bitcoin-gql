import RPC from 'Classes/RPC';
import { TxOutInterface } from 'Types/TxOutInterface';
import { ScriptPubKey } from 'Types/TxOutSubtypes';
import { BlockchainQueryMethod } from '../types/BlockchainQueryMethod';
import { GetTxOutParams } from '../types/BlockchainQueryParams';

export default class TxOut {
  public bestblock:string|undefined;
  public coinbase:boolean|undefined;
  public confirmations:number|undefined;
  public scriptPubKey:ScriptPubKey|undefined;
  public value:number|undefined;

  constructor(initVals:TxOutInterface) {
    Object.assign(this, initVals);
  }
}

export async function queryTxOut(args:GetTxOutParams):Promise<TxOut|null> {
  let info:TxOutInterface|null = null;

  try {
    const rpc:RPC = new RPC();
    info = await rpc.query({
      method: BlockchainQueryMethod.gettxout,
      params: [ args.txid || '', args.n || 0, args.include_mempool || false ]
    });
  } catch (err) {
    console.error(err);
  } finally {
    if (info) {
      return new TxOut(info);
    } else {
      return null;
    }
  }
}
