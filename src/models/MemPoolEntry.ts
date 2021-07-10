import RPC from 'Classes/RPC';
import { BlockchainQueryMethod } from 'Types/BlockchainQueryMethod';
import { GetMemPoolEntryParams } from 'Types/BlockchainQueryParams';
import { MemPoolEntryInterface } from 'Types/MemPoolEntryInterface';
import { MemPoolFees } from 'Types/MemPoolSubtypes';

export default class MemPoolEntry {
  public ancestorcount:number|undefined;
  public ancestorfees:number|undefined;
  public ancestorsize:number|undefined;
  public bip125Replaceable:boolean|undefined;
  public depends:string[]|undefined;
  public descendantcount:number|undefined;
  public descendantfees:number|undefined;
  public descendantsize:number|undefined;
  public fee:number|undefined;
  public fees:MemPoolFees|undefined;
  public height:number|undefined;
  public modifiedfee:number|undefined;
  public size:number|undefined;
  public spentby:string[]|undefined;
  public time:number|undefined;
  public wtxid:string|undefined;

  constructor(initVals:MemPoolEntryInterface) {
    Object.assign(this, initVals);
  }
}

export async function queryMemPoolEntry(
  args:GetMemPoolEntryParams
):Promise<MemPoolEntry|null> {
  let info:MemPoolEntryInterface|null = null;

  try {
    const rpc:RPC = new RPC();
    let queryObject:any = await rpc.query({
      method: BlockchainQueryMethod.getmempoolentry,
      params: [ args.txid ]
    });

    // All for this ugly kabab-case that doesn't work in GraphQL or ES6 destructuring.
    info = { bip125Replaceable: queryObject["bip125-replaceable"], ...queryObject };
    delete queryObject["bip125-replaceable"];
  } catch (err) {
    console.error(err);
  } finally {
    if (info) {
      return new MemPoolEntry(info);
    } else {
      return null;
    }
  }
}
