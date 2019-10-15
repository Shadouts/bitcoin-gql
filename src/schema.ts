import { buildSchema } from 'graphql';

const schema = buildSchema(`
  type Query {
    # Blockchain
    getbestblockhash:ID
    getblock(blockhash:ID!, verbosity:Int):Block
    getblockchaininfo:BlockChainInfo
    getblockcount:Int
    getblockhash(height:Int!):ID
    getblockheader(blockhash:ID!):String # Param 2, false (serialized format)
    getblockstats(height:Int!):BlockStats # Doesn't seem to work with block hash.
    getchaintips:[ ChainTip ]
    getchaintxstats(nblocks:Int, blockhash:ID):ChainTxStats
    getdifficulty:Float
    getmempoolancestors(txid:ID!):[ ID ]
    getmempooldescendants(txid:ID!):[ ID ]
    getmempoolentry(txid:ID!):MemPoolEntry
    getmempoolinfo:MemPoolInfo
    getrawmempool:[ ID ]
    gettxout(txid:ID!, n:Int!, include_mempool:Boolean):TxOut
    gettxoutproof(txids:[ ID ]!, blockhash:ID):String
    gettxoutsetinfo:TxOutSetInfo # This query takes some time. Restrict via env vars.
    verifychain(checklevel:Int, nblocks:Int):Boolean
    verifytxoutproof(proof:String!):[ ID ]

    # Network
    getconnectioncount:Int
    getnettotals:NetTotals
    getnetworkinfo:NetworkInfo
    getnodeaddresses(count:Int):[ NodeAddress ]
    getpeerinfo:[ PeerInfo ]
    listbanned:[ String ]


    # Rawtransactions
    getrawtransaction(txid:ID!):RawTransaction #format verbose
  }

  # Not ready for mutations
  # type Mutation {
      # Blockchain
      # preciousblock "blockhash"
      # pruneblockchain (don't add)
      # savemempool (breaks statelessness without external storage)
      # scantxoutset <action> ( <scanobjects> )
  # }

  # These BIP9softforks need better typing
  type BIP9Softfork {
    bit:Int
    since:Int
    startTime:Float
    statistics:BIP9SoftforkStatistics
    status:String
    timeout:Float
  }
  type BIP9Softforks {
    csv:BIP9Softfork
    segwit:BIP9Softfork
  }
  type BIP9SoftforkStatistics {
    count:Int
    elapsed:Int
    period:Int
    possible:Boolean
    threshold:Int
  }

  type Block {
    bits:String
    blockHeader:String
    chainwork:String
    confirmations:Int
    difficulty:Float
    hash:ID # Only value returned on verbosity 0
    height:Int
    hex:String
    mediantime:Int
    merkleroot:String
    nextBlock:Block
    nextblockhash:ID
    nTx:Int
    nonce:Float
    previousBlock:Block
    previousblockhash:ID
    strippedsize:Int
    size:Int
    time:Int
    tx:[ ID ] # Not returned on verbosity 2
    txVerbose:[ RawTransaction ] # Only returned on verbosity 2. Can a directive be used to enforce this behavior?
    version:Int
    versionHex:String
    weight:Int
  }

  type BlockChainInfo {
    automatic_pruning:Boolean
    bestBlock(verbosity:Int):Block
    bestblockhash:ID
    bip9_softforks:BIP9Softforks
    blocks:Int
    chain:String
    chainwork:String
    difficulty:Float
    headers:Int
    initialblockdownload:Boolean
    mediantime:Int
    pruned:Boolean
    pruneheight:Int
    prune_target_size:Int
    size_on_disk:Float
    softforks:[ Softfork ]
    verificationprogress:Float
    warnings:String
  }

  type BlockStats {
    avgfee:Int
    avgfeerate:Int
    avgtxsize:Int
    blockhash:String
    feerate_percentiles:[ Int ]
    height:Int
    ins:Int
    maxfee:Int
    maxfeerate:Int
    maxtxsize:Int
    medianfee:Int
    mediantime:Int
    mediantxsize:Int
    minfee:Int
    minfeerate:Int
    mintxsize:Int
    outs:Int
    subsidy:Float
    swtotal_size:Int
    swtotal_weight:Int
    swtxs:Int
    time:Int
    total_out:Float
    total_size:Int
    total_weight:Int
    totalfee:Int
    txs:Int
    utxo_increase:Int
    utxo_size_inc:Int
  }

  type ChainTip {
    block:Block
    branchlen:Int
    hash:ID
    height:Int
    status:String
  }

  type ChainTxStats {
    time:Int
    txcount:Int
    txrate:Float
    window_final_block_hash:String
    window_block_count:Int
    window_interval:Int
    window_tx_count:Int
  }

  type LocalAddress {
    address:String
    port:Int
    score:Int
  }

  type MemPoolEntry {
    ancestorcount:Int
    ancestorfees:Int
    ancestorsize:Int
    bip125Replaceable:Boolean
    depends:[ ID ]
    descendantcount:Int
    descendantfees:Int
    descendantsize:Int
    fee:Float
    fees:MemPoolEntryFees
    height:Int
    modifiedfee:Float
    size:Int
    spentby:[ ID ]
    time:Int
    wtxid:String
  }

  type MemPoolEntryFees {
    ancestor:Float
    base:Float
    descendant:Float
    modified:Float
  }

  type MemPoolInfo {
    bytes:Float
    maxmempool:Float
    mempoolminfee:Float
    minrelaytxfee:Float
    rawMemPool:[ ID ]
    size:Int
    usage:Int
  }

  type NetTotals {
    timemillis:Float
    totalbytesrecv:Float
    totalbytessent:Float
    uploadtarget:UploadTarget
  }

  type Network {
    limited:Boolean
    name:String
    proxy_randomize_credentials:Boolean
    proxy:String
    reachable:Boolean
  }

  type NetworkInfo {
    connections:Int
    incrementalfee:Float
    localaddresses:[ LocalAddress ]
    localrelay:Boolean
    localservices:String
    networkactive:Boolean
    networks:[ Network ]
    protocolversion:Int
    relayfee:Float
    subversion:String
    timeoffset:Int
    version:Int
    warnings:String
  }

  type NodeAddress {
    address:String
    port:Int
    services:Float
    time:Float
  }

  type PeerInfo {
    addnode:Boolean
    addr:String
    addrbind:String
    addrlocal:String
    banscore:Int
    # bytesrecv_per_msg: How should this work?
    bytesrecv:Float
    # bytessent_per_msg: How should this work?
    bytessent:Float
    conntime:Float
    id:Int
    inbound:Boolean
    inflight:[ Int ]
    lastrecv:Float
    lastsend:Float
    minfeefilter:Int
    minping:Float
    pingtime:Float
    pingwait:Float
    relaytxes:Boolean
    services:String
    startingheight:Int
    subver:String
    synced_blocks:Int
    synced_headers:Int
    timeoffset:Int
    version:Int
    whitelisted:Boolean
  }

  type RawTransaction {
    block:Block
    blockhash:ID
    blocktime:Int
    confirmations:Int
    hash:String
    hex:String
    locktime:Int
    size:Int
    time:Int
    txid:ID
    version:Int
    vin:[ TransactionInput ]
    vout:[ TransactionOutput ]
    vsize:Int
  }

  type ScriptPubKey {
    addresses:[ ID ]
    asm:String
    hex:String
    reqSigs:Int
    type:String
  }

  type ScriptSig {
    asm:String
    hex:String
  }

  type Softfork {
    id:ID!
    enforce:SoftforkEnforcement
    reject:SoftforkEnforcement
    version:Int!
  }

  type SoftforkEnforcement {
    found:Int
    required:Int
    status:Boolean
    window:Int
  }

  type TransactionInput {
    coinbase:String
    sequence:Float
    scriptSig:ScriptSig
    txid:ID
    txinwitness:[ ID ]
    vout:Int
  }

  type TransactionOutput {
    value:Float
    n:Int
    scriptPubKey:ScriptPubKey
  }

  type TxOut {
    bestblock:ID
    coinbase:Boolean
    confirmations:Int
    scriptPubKey:ScriptPubKey
    value:Float
  }

  type TxOutSetInfo {
    bestblock:ID
    bestBlockData:Block
    bogosize:Float
    disk_size:Float
    hash_serialized_2:String
    height:Int
    total_amount:Float
    transactions:Int
    txouts:Int
  }

  type UploadTarget {
    bytes_left_in_cycle:Float
    serve_historical_blocks:Boolean
    target_reached:Boolean
    target:Float
    time_left_in_cycle:Float
    timeframe:Float
  }
`);

export default schema;
