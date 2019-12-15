import RPC from 'Classes/RPC';
import { RawtransactionQueryMethod } from 'Types/RawtransactionQueryMethod'
import { DecodeScriptParams } from 'Types/RawtransactionQueryParams'
import { DecodedScriptInterface } from 'Types/DecodedScriptInterface';

export default class DecodedScript {
  public addresses:string[];
  public asm:string;
  public hex:string;
  public p2sh:string;
  public p2shSegwit:string;
  public reqSigs:number;
  public segwit:DecodedScript;
  public type:string;

  constructor (initVals:DecodedScriptInterface) {
    Object.assign(this, initVals);
  }
}

export async function decodeScript(
  args:DecodeScriptParams
):Promise<DecodedScript> {
  let data:DecodedScriptInterface;

  try {
    const rpc:RPC = new RPC();

    data = await rpc.query({
      method: RawtransactionQueryMethod.decodescript,
      params: [ args.hexstring ]
    });
  } catch (err) {
    console.error(err);
  } finally {
    if (data.segwit) {
      data.segwit = new DecodedScript(data.segwit);
    }

    return new DecodedScript(data);
  }
}
