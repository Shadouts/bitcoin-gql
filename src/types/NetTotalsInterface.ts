import { UploadTarget } from 'Types/NetTotalsSubtypes';

export interface NetTotalsInterface {
  timemillis:number;
  totalbytesrecv:number;
  totalbytessent:number;
  uploadtarget:UploadTarget;
}
