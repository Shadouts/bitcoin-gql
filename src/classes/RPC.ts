import request from 'superagent';
import Query from '../types/Query';

export default class RPC {
  private rpcUser:string|null;
  private rpcPass:string|null;
  private rpcHost:string|null;
  private rpcPort:string|null;
  private auth:string|null;

  constructor() {
    try {
      this.rpcUser = process.env.RPC_USER || null;
      this.rpcPass = process.env.RPC_PASS || null;
      this.rpcHost = process.env.RPC_HOST || null;
      this.rpcPort = process.env.RPC_PORT || null;

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
    } catch (err) {
      console.error(err);
      throw new Error("Couldn't instantiate RPC class");
    }
  }

  // TODO: RPC request queue ID as part of query params. Use dataloader?
  // TODO: Investigate request node depth limits and handle limit break.

  public async query (query:Query):Promise<any> {
    return request.post(`${this.rpcHost}:${this.rpcPort}`)
      .set('Authorization', this.auth || '')
      .send(query)
      .then((res:any) => {
        return res.body.result;
      }).catch((err) => {
        throw new Error(err);
      });
  }
}
