import Block, { queryBlock } from './models/Block';
import BlockChainInfo, { queryBlockChainInfo } from './models/BlockChainInfo';
import BlockStats, { queryBlockStats } from './models/BlockStats';
import ChainTip, { queryChainTips } from './models/ChainTip';
import ChainTxStats, { queryChainTxStats } from './models/ChainTxStats';
import MemPoolEntry, { queryMemPoolEntry } from './models/MemPoolEntry';
import MemPoolInfo, { queryMemPoolInfo } from './models/MemPoolInfo';
import RawTransaction, { queryRawTransaction } from './models/RawTransaction';
import TxOut, { queryTxOut } from './models/TxOut';
import TxOutSetInfo, { queryTxOutSetInfo } from './models/TxOutSetInfo';

import RPC from 'Classes/RPC';

import { BlockchainQueryMethod } from './types/BlockchainQueryMethod';
import {
  GetRawTransactionParams
} from './types/RawtransactionQueryParams';
import {
  GetBlockParams,
  GetBlockHashParams,
  GetBlockHeaderParams,
  GetBlockStatsParams,
  GetChainTxStatsParams,
  GetMemPoolAncDescParams,
  GetMemPoolEntryParams,
  GetTxOutParams,
  GetTxOutProofParams,
  VerifyChainParams,
  VerifyTxOutProofParams
} from './types/BlockchainQueryParams';

var resolvers = {
  // Blockchain
  getbestblockhash():Promise<string> {
    return new RPC().query({
      method: BlockchainQueryMethod.getbestblockhash
    });
  },
  getblock(args:GetBlockParams):Promise<Block> {
    return queryBlock(args);
  },
  getblockchaininfo():Promise<BlockChainInfo> {
    return queryBlockChainInfo();
  },
  getblockcount():Promise<number> {
    return new RPC().query({
      method: BlockchainQueryMethod.getblockcount
    });
  },
  getblockhash(args:GetBlockHashParams):Promise<Block> {
    return new RPC().query({
      method: BlockchainQueryMethod.getblockhash,
      params: [ args.height ]
    });
  },
  getblockheader(args:GetBlockHeaderParams):Promise<Block> {
    return new RPC().query({
      method: BlockchainQueryMethod.getblockheader,
      params: [ args.blockhash, false ]
    });
  },
  getblockstats(args:GetBlockStatsParams):Promise<BlockStats> {
    return queryBlockStats(args);
  },
  getchaintips():Promise<ChainTip[]> {
    return queryChainTips();
  },
  getchaintxstats(args:GetChainTxStatsParams):Promise<ChainTxStats> {
    return queryChainTxStats(args);
  },
  getdifficulty():Promise<number> {
    return new RPC().query({ method: BlockchainQueryMethod.getdifficulty });
  },
  getmempoolancestors(args:GetMemPoolAncDescParams):Promise<string[]> {
    return new RPC().query({
      method: BlockchainQueryMethod.getmempoolancestors,
      params: [ args.txid ]
    });
  },
  getmempooldescendants(
    args:GetMemPoolAncDescParams
  ):Promise<string[]> {
    return new RPC().query({
      method: BlockchainQueryMethod.getmempooldescendants,
      params: [ args.txid ]
    });
  },
  getmempoolentry(args:GetMemPoolEntryParams):Promise<MemPoolEntry> {
    return queryMemPoolEntry(args);
  },
  getmempoolinfo():Promise<MemPoolInfo> {
    return queryMemPoolInfo();
  },
  getrawmempool():Promise<string[]> {
    return new RPC().query({ method: BlockchainQueryMethod.getrawmempool });
  },
  getrawtransaction(
    args:GetRawTransactionParams
  ):Promise<RawTransaction> {
    return queryRawTransaction(args);
  },
  gettxout(args:GetTxOutParams):Promise<TxOut> {
    return queryTxOut(args);
  },
  gettxoutproof(args:GetTxOutProofParams):Promise<string> {
    return new RPC().query({
      method: BlockchainQueryMethod.gettxoutproof,
      params: [ args.txids, args.blockhash ]
    }).catch((err:Error) => {
      console.error(err);
      return null;
    });
  },
  gettxoutsetinfo():Promise<TxOutSetInfo> {
    if (Boolean( parseInt(process.env.GRAPHIQL) > 0 ) === true) {
      return null;
    } else {
      return queryTxOutSetInfo();
    }
  },
  verifychain(args:VerifyChainParams):Promise<boolean> {
    const checklevel:number = args.checklevel || 3;
    const nblockLimit:number = parseInt(process.env.VERIFY_CHAIN_LIMIT) || 6;

    // This query allows for verification of entire chain. It's important to prevent nBlocks from equalling 0 or a very large number.
    const nblocks:number =
      (args.nblocks > nblockLimit) ? nblockLimit : args.nblocks;

    return new RPC().query({
      method: BlockchainQueryMethod.verifychain,
      params: [ checklevel, nblocks ]
    });
  },
  verifytxoutproof(args:VerifyTxOutProofParams):Promise<boolean> {
    return new RPC().query({
      method: BlockchainQueryMethod.verifytxoutproof,
      params: [ args.proof ]
    });
  },
};

export default resolvers;
