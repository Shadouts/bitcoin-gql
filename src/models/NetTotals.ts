import RPC from 'Classes/RPC';
import { NetworkQueryMethod } from 'Types/NetworkQueryMethod';
import { NetTotalsInterface } from 'Types/NetTotalsInterface';
import { UploadTarget } from 'Types/NetTotalsSubtypes';

export default class NetTotals {
  public timemillis:number;
  public totalbytesrecv:number;
  public totalbytessent:number;
  public uploadtarget:UploadTarget;

  constructor (initVals:NetTotalsInterface) {
    Object.assign(this, initVals);
  }
}

export async function queryNetTotals():Promise<NetTotals> {
  let info:NetTotalsInterface;

  try {
    const rpc:RPC = new RPC();

    info = await rpc.query({
      method: NetworkQueryMethod.getnettotals
    });
  } catch (err) {
    console.error(err);
  } finally {
    return new NetTotals(info);
  }
}
