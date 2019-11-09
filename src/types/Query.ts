import { BlockchainQueryMethod } from 'Types/BlockchainQueryMethod';
import { NetworkQueryMethod } from 'Types/NetworkQueryMethod';
import { RawtransactionQueryMethod } from 'Types/RawtransactionQueryMethod';

export default interface Query {
  method:
    BlockchainQueryMethod
    | NetworkQueryMethod
    | RawtransactionQueryMethod;
  id?:number;
  params?:(boolean|number|string|string[])[];
}
