import { MemPoolFees } from 'Types/MemPoolSubtypes';

export interface MemPoolEntryInterface {
  ancestorcount?:number;
  ancestorfees?:number;
  ancestorsize?:number;
  bip125Replaceable:boolean;
  depends?:string[];
  descendantcount?:number;
  descendantfees?:number;
  descendantsize?:number;
  fee?:number;
  fees?:MemPoolFees;
  height?:number;
  modifiedfee?:number;
  size?:number;
  spentby?:string[];
  time?:number;
  wtxid?:string;
}
