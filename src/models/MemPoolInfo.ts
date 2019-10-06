import RPC from 'Classes/RPC';
import { BlockchainQueryMethod } from 'Types/BlockchainQueryMethod';
import { MemPoolInfoInterface } from 'Types/MemPoolInfoInterface';

export default class MemPoolInfo {
  public bytes:number;
  public maxmempool:number;
  public mempoolminfee:number;
  public minrelaytxfee:number;
  public size:number;

  constructor(initVals:MemPoolInfoInterface) {
    Object.assign(this, initVals);
  }

  public async rawMemPool():Promise<string[]> {
    let raw:string[] = null;

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

export async function queryMemPoolInfo():Promise<MemPoolInfo> {
  let info:MemPoolInfoInterface;

  try {
    const rpc:RPC = new RPC();
    info = await rpc.query({
      method:BlockchainQueryMethod.getmempoolinfo
    });
  } catch (err) {
    console.error(err);
  } finally {
    return new MemPoolInfo(info);
  }
}
