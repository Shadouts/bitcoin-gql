import { BlockchainQueryMethod } from './BlockchainQueryMethod';
import { RawtransactionQueryMethod } from './RawtransactionQueryMethod';

export default interface Query {
  method:
    BlockchainQueryMethod
    | RawtransactionQueryMethod;
  id?:number;
  params?:(boolean|number|string|string[])[];
}
