import RPC from 'Classes/RPC';
import { RawTransactionInterface } from 'Types/RawTransactionInterface';
import Block, { queryBlock } from './Block';
import { RawtransactionQueryMethod } from 'Types/RawtransactionQueryMethod';
import {
  DecodeRawTransactionParams,
  GetRawTransactionParams
} from '../types/RawtransactionQueryParams';

export default class RawTransaction {
  public blockhash:string;
  public blocktime:number;
  public confirmations:number;
  public hash:string;
  public hex:string;
  public in_active_chain:boolean;
  public locktime:number;
  public size:number;
  public time:number;
  public txid:string;
  public version:number;
  public vin:object[];
  public vout:object[]
  public vsize:number;
  public weight:number;

  constructor (initVals:RawTransactionInterface) {
    Object.assign(this, initVals);
  }

  public block():Promise<Block> {
    return queryBlock({ blockhash: this.blockhash });
  }
}

export async function decodeRawTransaction(
  args:DecodeRawTransactionParams
):Promise<RawTransaction> {
  let txData:RawTransactionInterface;

  try {
    const rpc:RPC = new RPC();
    let params:[string, boolean?] = [args.hexstring];

    if (args.iswitness !== undefined) {
      params.push(args.iswitness);
    }

    txData = await rpc.query({
      method: RawtransactionQueryMethod.decoderawtransaction,
      params
    });
  } catch (err) {
    console.error(err);
  } finally {
    return new RawTransaction(txData)
  }
}

export async function queryRawTransaction(
  args:GetRawTransactionParams
):Promise<RawTransaction> {
  let txData:RawTransactionInterface;

  try {
    if (args.txid === "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b") {
      txData = genesisTransaction;
    } else {
      const rpc:RPC = new RPC();

      txData = await rpc.query({
        method: RawtransactionQueryMethod.getrawtransaction,
        params: [args.txid, true] // true for verbose format
      });
    }
  } catch (err) {
    console.error(err);
  } finally {
    return new RawTransaction(txData)
  }
}

// The genesis block coinbase is not considered an ordinary transaction and cannot be retrieved
var genesisTransaction:RawTransactionInterface  = {
  blockhash: "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
  hash: "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
  locktime: 0,
  txid: "4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b",
  version: 1,
  vin: [
    {
      coinbase: "04ffff001d0104455468652054696d65732030332f4a616e2f32303039204368616e63656c6c6f72206f6e206272696e6b206f66207365636f6e64206261696c6f757420666f722062616e6b73",
      sequence: 4294967295
    }
  ],
  vout: [
    {
      value: 50.00000000,
      n: 0,
      scriptPubKey: {
        asm: "04678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5f",
        hex: "4104678afdb0fe5548271967f1a67130b7105cd6a828e03909a67962e0ea1f61deb649f6bc3f4cef38c4f35504e51ec112de5c384df7ba0b8d578a4c702b6bf11d5fac",
        reqSigs: 1,
        type: "pubkey",
        addresses: [
          "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
        ]
      }
    }
  ]
};
