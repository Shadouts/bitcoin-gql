import { ScriptPubKey } from './TxOutSubtypes';

export interface TxOutInterface {
  bestblock?:string;
  coinbase?:boolean;
  confirmations?:number;
  scriptPubKey?:ScriptPubKey;
  value?:number;
}
