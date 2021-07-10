import RPC from 'Classes/RPC';
import { RawtransactionQueryMethod } from 'Types/RawtransactionQueryMethod'
import { DecodeScriptParams } from 'Types/RawtransactionQueryParams'
import { DecodedScriptInterface } from 'Types/DecodedScriptInterface';

export default class DecodedScript {
  public addresses:string[]|undefined;
  public asm:string|undefined;
  public hex:string|undefined;
  public p2sh:string|undefined;
  public p2shSegwit:string|undefined;
  public reqSigs:number|undefined;
  public segwit:DecodedScript|undefined;
  public type:string|undefined;

  constructor (initVals:DecodedScriptInterface) {
    Object.assign(this, initVals);
  }
}

export async function decodeScript(
  args:DecodeScriptParams
):Promise<DecodedScript|null> {
  let data:DecodedScriptInterface|null = null;

  try {
    const rpc:RPC = new RPC();

    data = await rpc.query({
      method: RawtransactionQueryMethod.decodescript,
      params: [ args.hexstring ]
    });
  } catch (err) {
    console.error(err);
  } finally {
    if (data && data.segwit) {
      data.segwit = new DecodedScript({
        addresses: data.segwit.addresses,
        asm: data.segwit.asm || '',
        hex: data.segwit.hex,
        p2sh: data.segwit.p2sh,
        p2shSegwit: data.segwit.p2shSegwit,
        reqSigs: data.segwit.reqSigs,
        segwit: data.segwit.segwit,
        type: data.segwit.type
      });
      return new DecodedScript(data);
    } else {
      return null;
    }

  }
}
