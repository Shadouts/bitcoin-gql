import RPC from 'Classes/RPC';
import { BlockchainQueryMethod } from 'Types/BlockchainQueryMethod';
import { MemPoolInfoInterface } from 'Types/MemPoolInfoInterface';

export default class MemPoolInfo {
  public bytes:number|undefined;
  public maxmempool:number|undefined;
  public mempoolminfee:number|undefined;
  public minrelaytxfee:number|undefined;
  public size:number|undefined;

  constructor(initVals:MemPoolInfoInterface) {
    Object.assign(this, initVals);
  }

  public async rawMemPool():Promise<string[]|null> {
    let raw:string[]|null = null;

    try {
      const rpc:RPC = new RPC();
      raw = await rpc.query({
        method:BlockchainQueryMethod.getrawmempool
      });
    } catch (err) {
       console.error(err);
    } finally {
      return raw;
    }
  }
}

export async function queryMemPoolInfo():Promise<MemPoolInfo|null> {
  let info:MemPoolInfoInterface|null = null;

  try {
    const rpc:RPC = new RPC();
    info = await rpc.query({
      method:BlockchainQueryMethod.getmempoolinfo
    });
  } catch (err) {
    console.error(err);
  } finally {
    if (info) {
      return new MemPoolInfo(info);
    } else {
      return null;
    }
  }
}
