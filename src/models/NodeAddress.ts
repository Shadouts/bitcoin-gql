import RPC from 'Classes/RPC';
import { NetworkQueryMethod } from 'Types/NetworkQueryMethod';
import { GetNodeAddressesParams } from 'Types/NetworkQueryParams';
import { NodeAddressInterface } from 'Types/NodeAddressInterface';

export default class NodeAddress {
  public address:string;
  public port:number;
  public services:number;
  public time:number;

  constructor (initVals:NodeAddressInterface) {
    Object.assign(this, initVals);
  }
}

export async function queryNodeAddresses(
  args:GetNodeAddressesParams
):Promise<NodeAddress[]> {
  let addresses:NodeAddressInterface[];

  try {
    const rpc:RPC = new RPC();

    if (args) {
      addresses = await rpc.query({
        method: NetworkQueryMethod.getnodeaddresses,
        params: [ args.count ]
      });
    } else {
      addresses = await rpc.query({
        method: NetworkQueryMethod.getnodeaddresses
      });
    }
  } catch (err) {
    console.error(err);
  } finally {
    return addresses.map(address => new NodeAddress(address));
  }
}
