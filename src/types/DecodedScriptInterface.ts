import DecodedScript from 'Models/DecodedScript';

export interface DecodedScriptInterface {
  addresses?:string[];
  asm:string;
  hex?:string;
  p2sh?:string;
  p2shSegwit?:string;
  reqSigs?:number;
  segwit?:DecodedScript;
  type?:string;
}
