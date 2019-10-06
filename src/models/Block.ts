import RPC from 'Classes/RPC';
import RawTransaction from 'Models/RawTransaction';
import { BlockInterface } from 'Types/BlockInterface';
import { RawTransactionInterface } from 'Types/RawTransactionInterface';
import { BlockchainQueryMethod } from 'Types/BlockchainQueryMethod';
import { GetBlockParams } from 'Types/BlockchainQueryParams';

export default class Block {
  public bits:string;
  public chainwork:string;
  public confirmations:number;
  public difficulty:number;
  public hash:string;
  public height:number;
  public hex:string; // For verbosity 0. Serialized hex value of block
  public mediantime:number;
  public merkleroot:string;
  public nextblockhash:string;
  public nonce:number;
  public nTx:number;
  public previousblockhash:string;
  public size:number;
  public strippedsize:number;
  public time:number;
  public tx:string[];
  public txVerbose:RawTransaction[]; // For verbosity 2. verbose block transactions
  public version:number;
  public versionHex:string; // camelCasing exists in the RPC response
  public weight:number;

  constructor (initVals:BlockInterface) {
    Object.assign(this, initVals);
  }

  public async blockHeader():Promise<string> {
    if (!this.hash) {
      return null;
    }

    let header:string = null;

    try {
      const rpc:RPC = new RPC();
      header = await rpc.query({
        method: BlockchainQueryMethod.getblockheader,
        params: [ this.hash, false ]
      });
    } catch (err) {
      console.error(err);
    } finally {
      return header;
    }
  }

  public async nextBlock():Promise<Block> {
    if (!this.nextblockhash) {
      return null;
    }

    return queryBlock({ blockhash: this.nextblockhash });
  }

  public async previousBlock():Promise<Block> {
    if (!this.previousblockhash) {
      return null;
    }

    return queryBlock({ blockhash: this.previousblockhash });
  }
}

// Verbosity 0 and 2 list values in hex and txVerbose props to retain consistant type
export async function queryBlock(args:GetBlockParams):Promise<Block> {
  const rpc:RPC = new RPC();
  let blockData:BlockInterface = {};

  try {
    if (args.verbosity !== 0) {
      const data:any = await rpc.query({
        method: BlockchainQueryMethod.getblock,
        params: [ args.blockhash, args.verbosity ]
      });

      if (args.verbosity === 2) {
        const rawTransactions:RawTransaction[] =
          data.tx.map((tx:RawTransactionInterface) => {
            return new RawTransaction(tx);
          });

        blockData = {
          ...data,
          txVerbose: rawTransactions,
          tx: null
        };
      } else {
        blockData = data;
      }
    } else {
      const hex:string = await rpc.query({
        method:BlockchainQueryMethod.getblock,
        params: [ args.blockhash, 0 ]
      });

      blockData = { hex };
    }
  } catch (err) {
    console.error(err);
  } finally {
    return new Block(blockData);
  }
}
