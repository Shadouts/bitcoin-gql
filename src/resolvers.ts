import Block, { queryBlock } from 'Models/Block';
import BlockChainInfo, { queryBlockChainInfo } from 'Models/BlockChainInfo';
import BlockStats, { queryBlockStats } from 'Models/BlockStats';
import ChainTip, { queryChainTips } from 'Models/ChainTip';
import ChainTxStats, { queryChainTxStats } from 'Models/ChainTxStats';
import MemPoolEntry, { queryMemPoolEntry } from 'Models/MemPoolEntry';
import MemPoolInfo, { queryMemPoolInfo } from 'Models/MemPoolInfo';
import NetTotals, { queryNetTotals } from 'Models/NetTotals';
import NetworkInfo, { queryNetworkInfo } from 'Models/NetworkInfo';
import NodeAddress, { queryNodeAddresses } from 'Models/NodeAddress';
import PeerInfo, { queryPeerInfo } from 'Models/PeerInfo';
import RawTransaction, { queryRawTransaction } from 'Models/RawTransaction';
import TxOut, { queryTxOut } from 'Models/TxOut';
import TxOutSetInfo, { queryTxOutSetInfo } from 'Models/TxOutSetInfo';

import RPC from 'Classes/RPC';

import { BlockchainQueryMethod } from 'Types/BlockchainQueryMethod';
import { NetworkQueryMethod } from 'Types/NetworkQueryMethod';
import {
  GetRawTransactionParams
} from 'Types/RawtransactionQueryParams';
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
} from 'Types/BlockchainQueryParams';
import { GetNodeAddressesParams } from 'Types/NetworkQueryParams';

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

  // Network
  getconnectioncount():Promise<number> {
    return new RPC().query({ method: NetworkQueryMethod.getconnectioncount });
  },
  getnettotals():Promise<NetTotals> {
    return queryNetTotals();
  },
  getnetworkinfo():Promise<NetworkInfo> {
    return queryNetworkInfo();
  },
  getnodeaddresses(args:GetNodeAddressesParams):Promise<NodeAddress[]> {
    return queryNodeAddresses(args);
  },
  getpeerinfo():Promise<PeerInfo[]> {
    return queryPeerInfo();
  },
  listbanned():Promise<string[]> {
    return new RPC().query({ method: NetworkQueryMethod.listbanned });
  },


  // Rawtransactions
  getrawtransaction(
    args:GetRawTransactionParams
  ):Promise<RawTransaction> {
    return queryRawTransaction(args);
  },
};

export default resolvers;
