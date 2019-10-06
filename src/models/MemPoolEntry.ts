import RPC from 'Classes/RPC';
import { BlockchainQueryMethod } from 'Types/BlockchainQueryMethod';
import { GetMemPoolEntryParams } from 'Types/BlockchainQueryParams';
import { MemPoolEntryInterface } from 'Types/MemPoolEntryInterface';
import { MemPoolFees } from 'Types/MemPoolSubtypes';

export default class MemPoolEntry {
  public ancestorcount:number;
  public ancestorfees:number;
  public ancestorsize:number;
  public bip125Replaceable:boolean;
  public depends:string[];
  public descendantcount:number;
  public descendantfees:number;
  public descendantsize:number;
  public fee:number;
  public fees:MemPoolFees;
  public height:number;
  public modifiedfee:number;
  public size:number;
  public spentby:string[];
  public time:number;
  public wtxid:string;

  constructor(initVals:MemPoolEntryInterface) {
    Object.assign(this, initVals);
  }
}

export async function queryMemPoolEntry(
  args:GetMemPoolEntryParams
):Promise<MemPoolEntry> {
  let info:MemPoolEntryInterface;

  try {
    const rpc:RPC = new RPC();
    let queryObject:any = await this.query({
      method: BlockchainQueryMethod.getmempoolentry,
      params: [ args.txid ]
    });

    // All for this ugly kabab-case that doesn't work in GraphQL or ES6 destructuring.
    info.bip125Replaceable = queryObject["bip125-replaceable"];
    delete queryObject["bip125-replaceable"];
    info = { ...queryObject };
  } catch (err) {
    console.error(err);
  } finally {
    return new MemPoolEntry(info);
  }
}
