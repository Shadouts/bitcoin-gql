import RPC from 'Classes/RPC';
import { NetworkQueryMethod } from 'Types/NetworkQueryMethod';
import { NetTotalsInterface } from 'Types/NetTotalsInterface';
import { UploadTarget } from 'Types/NetTotalsSubtypes';

export default class NetTotals {
  public timemillis:number|undefined;
  public totalbytesrecv:number|undefined;
  public totalbytessent:number|undefined;
  public uploadtarget:UploadTarget|undefined;

  constructor (initVals:NetTotalsInterface) {
    Object.assign(this, initVals);
  }
}

export async function queryNetTotals():Promise<NetTotals|null> {
  let info:NetTotalsInterface|null = null;

  try {
    const rpc:RPC = new RPC();

    info = await rpc.query({
      method: NetworkQueryMethod.getnettotals
    });
  } catch (err) {
    console.error(err);
  } finally {
    if (info) {
      return new NetTotals(info);
    } else {
      return null
    }
  }
}
