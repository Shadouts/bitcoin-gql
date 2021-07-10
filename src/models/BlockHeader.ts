import RPC from 'Classes/RPC';
import RawTransaction from 'Models/RawTransaction';
import { BlockInterface } from 'Types/BlockInterface';
import { RawTransactionInterface } from 'Types/RawTransactionInterface';
import { BlockchainQueryMethod } from 'Types/BlockchainQueryMethod';
import { GetBlockParams } from 'Types/BlockchainQueryParams';

export default class Block {
  public bits:string|undefined;
  public chainwork:string|undefined;
  public confirmations:number|undefined;
  public difficulty:number|undefined;
  public hash:string|undefined;
  public height:number|undefined;
  public mediantime:number|undefined;
  public merkleroot:string|undefined;
  public nextblockhash:string|undefined;
  public nonce:number|undefined;
  public nTx:number|undefined;
  public previousblockhash:string|undefined;
  public size:number|undefined;
  public strippedsize:number|undefined;
  public time:number|undefined;
  public tx:string[]|undefined;
  public txVerbose:RawTransaction[]|undefined; // For verbosity 2. verbose block transactions
  public version:number|undefined;
  public versionHex:string|undefined; // camelCasing exists in the RPC response
  public weight:number|undefined;

  constructor (initVals:BlockInterface) {
    Object.assign(this, initVals);
  }

  public async blockHeader():Promise<string|null> {
    if (!this.hash) {
      return null;
    }

    let header:string|null = null;

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

  public async nextBlock():Promise<Block|null> {
    if (!this.nextblockhash) {
      return null;
    }

    return queryBlock({ blockhash: this.nextblockhash });
  }

  public async previousBlock():Promise<Block|null> {
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
    if (args.verbosity && args.verbosity !== 0) {
      const data:any = await rpc.query({
        method: BlockchainQueryMethod.getblock,
        params: [ args.blockhash || '', args.verbosity ]
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
