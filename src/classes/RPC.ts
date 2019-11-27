import request from 'superagent';
import Query from '../types/Query';

export default class RPC {
  private rpcUser:string;
  private rpcPass:string;
  private rpcHost:string;
  private rpcPort:string;
  private auth:string;

  constructor() {
    this.rpcUser = process.env.RPC_USER;
    this.rpcPass = process.env.RPC_PASS;
    this.rpcHost = process.env.RPC_HOST;
    this.rpcPort = process.env.RPC_PORT;

    if (!this.rpcUser) {
      throw new Error("RPC_USER is required.");
    }

    if (!this.rpcPass) {
      throw new Error("RPC_PASS is required");
    }

    if (!this.rpcHost) {
      this.rpcHost = 'localhost';
    }

    if (!this.rpcPort) {
      this.rpcPort = '8332';
    }

    const creds64:string =
      Buffer.from(`${this.rpcUser}:${this.rpcPass}`).toString('base64');
    this.auth = `Basic ${creds64}`;
  }

  // TODO: RPC request queue ID as part of query params. Use dataloader?
  // TODO: Investigate request node depth limits and handle limit break.

  public query (query:Query):Promise<any> {
    return request.post(`${this.rpcHost}:${this.rpcPort}`)
      .set('Authorization', this.auth)
      .send(query)
      .then((res:any) => {
        return res.body.result;
      }).catch((err) => {
        throw new Error(err);
      });
  }
}
