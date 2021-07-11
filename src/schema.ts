import { makeExecutableSchema } from 'graphql-tools';
import Query from 'GQLTypeDefs/Query.graphql';
// import Mutation from 'GQLTypeDefs/Mutation.graphql';
import Block from 'GQLTypeDefs/Block.graphql';
import BlockChainInfo from 'GQLTypeDefs/BlockChainInfo.graphql';
import BlockStats from 'GQLTypeDefs/BlockStats.graphql';
import ChainTip from 'GQLTypeDefs/ChainTip.graphql';
import ChainTxStats from 'GQLTypeDefs/ChainTxStats.graphql';
import DecodedScript from 'GQLTypeDefs/DecodedScript.graphql';
import MemPoolEntry from 'GQLTypeDefs/MemPoolEntry.graphql';
import MemPoolInfo from 'GQLTypeDefs/MemPoolInfo.graphql';
import NetTotals from 'GQLTypeDefs/NetTotals.graphql';
import NetworkInfo from 'GQLTypeDefs/NetworkInfo.graphql';
import NodeAddress from 'GQLTypeDefs/NodeAddress.graphql';
import PeerInfo from 'GQLTypeDefs/PeerInfo.graphql';
import RawTransaction from 'GQLTypeDefs/RawTransaction.graphql';
import ScriptPubKey from 'GQLTypeDefs/ScriptPubKey.graphql';
import TxOut from 'GQLTypeDefs/TxOut.graphql';
import TxOutSetInfo from 'GQLTypeDefs/TxOutSetInfo.graphql';

const schemaDef = makeExecutableSchema({
  typeDefs: [
    Query,
    // Mutation,
    Block,
    BlockChainInfo,
    BlockStats,
    ChainTip,
    ChainTxStats,
    DecodedScript,
    MemPoolEntry,
    MemPoolInfo,
    NetTotals,
    NetworkInfo,
    NodeAddress,
    PeerInfo,
    RawTransaction,
    ScriptPubKey,
    TxOut,
    TxOutSetInfo
  ]
});

export default schemaDef;
