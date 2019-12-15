import { buildSchema } from 'graphql';

const schema = buildSchema(`
  """ Blockchain, Network, and Rawtransaction query methods """
  type Query {
    ### Blockchain ###

    """
    Returns the hash of the best (tip) block in the longest blockchain
    """
    getbestblockhash:ID

    """
    If verbosity is 0, returns a string that is serialized, hex-encoded data for block.
    If verbosity is 1, returns information about block.
    If verbosity is 2, returns information about block and information about each transaction. Default 1.
    """
    getblock(blockhash:ID!, verbosity:Int):Block

    """
    Returns state info regarding blockchain processing.
    """
    getblockchaininfo:BlockChainInfo

    """
    Returns the number of blocks in the longest blockchain.
    """
    getblockcount:Int

    """
    Returns hash of block in best-block-chain at height provided.
    """
    getblockhash(height:Int!):ID

    """
    Returns a string that is serialized, hex-encoded data for blockheader.
    """
    getblockheader(blockhash:ID!):String # Param 2, false (serialized format)

    """
    Compute per block statistics for a given window. All amounts are in satoshis.
    """
    getblockstats(height:Int!):BlockStats # Doesn't seem to work with block hash.

    """
    Return information about all known tips in the block tree, including the main chain as well as orphaned branches.
    """
    getchaintips:[ ChainTip ]

    """
    Compute statistics about the total number and rate of transactions in the chain.
    """
    getchaintxstats(nblocks:Int, blockhash:ID):ChainTxStats

    """
    Returns the proof-of-work difficulty as a multiple of the minimum difficulty.
    """
    getdifficulty:Float

    """
    If txid is in the mempool, returns all in-mempool ancestors.
    """
    getmempoolancestors(txid:ID!):[ ID ]

    """
    If txid is in the mempool, returns all in-mempool descendants.
    """
    getmempooldescendants(txid:ID!):[ ID ]

    """
    Returns mempool data for given transaction
    """
    getmempoolentry(txid:ID!):MemPoolEntry

    """
    Returns details on the active state of the TX memory pool.
    """
    getmempoolinfo:MemPoolInfo

    """
    Returns all transaction ids in memory pool as a json array of string transaction ids.
    """
    getrawmempool:[ ID ]

    """
    Returns details about an unspent transaction output.
    """
    gettxout(txid:ID!, n:Int!, include_mempool:Boolean):TxOut

    """
    Returns a hex-encoded proof that "txid" was included in a block.
    """
    gettxoutproof(txids:[ ID ]!, blockhash:ID):String

    """
    Returns statistics about the unspent transaction output set.
    Note this call may take some time.
    """
    gettxoutsetinfo:TxOutSetInfo # This query takes some time. Restrict via env vars.

    """
    Verifies blockchain database.
    """
    verifychain(checklevel:Int, nblocks:Int):Boolean

    """
    Verifies that a proof points to a transaction in a block, returning the transaction it commits to and throwing an RPC error if the block is not in our best chain
    """
    verifytxoutproof(proof:String!):[ ID ]


    ### Network ###
    # getaddednodeinfo
    # ping

    """
    Returns the number of connections to other nodes.
    """
    getconnectioncount:Int

    """
    Returns information about network traffic, including bytes in, bytes out, and current time.
    """
    getnettotals:NetTotals

    """
    Returns state info regarding P2P networking.
    """
    getnetworkinfo:NetworkInfo

    """
    Return known addresses which can potentially be used to find new nodes in the network
    """
    getnodeaddresses(count:Int):[ NodeAddress ]

    """
    Returns data about each connected network node as an array.
    """
    getpeerinfo:[ PeerInfo ]

    """
    List all banned IPs/Subnets.
    """
    listbanned:[ String ]


    ### Rawtransactions ###
    # analyzepsbt "psbt"
    # decodepsbt "psbt"
    # testmempoolaccept ["rawtx",...] ( allowhighfees )

    """
    Return an object representing the serialized, hex-encoded transaction.
    """
    decoderawtransaction(
      hexstring: String!
      iswitness: Boolean
    ):RawTransaction # Returns additional info from getrawtransaction verbose

    """
    Returns information about 'txid'.
    """
    getrawtransaction(txid:ID!):RawTransaction #format verbose because it contains hex-encoded value anyhow

    """
    Decode a hex-encoded script.
    """
    decodescript(hexstring: String!):DecodedScript
  }

  # Not ready for mutations
  # type Mutation {
      ### Blockchain ###
      # preciousblock "blockhash"
      # pruneblockchain (don't add)
      # savemempool (breaks statelessness without external storage)
      # scantxoutset <action> ( <scanobjects> )

      ### Network ###
      # addnode
      # clearbanned
      # disconnectnode
      # setban
      # setnetworkactive

      ### Rawtransactions ###
      # combinepsbt ["psbt",...]
      # combinerawtransaction ["hexstring",...]
      # converttopsbt "hexstring" ( permitsigdata iswitness )
      # finalizepsbt "psbt" ( extract )
      # fundrawtransaction "hexstring" ( options iswitness )
      # joinpsbts ["psbt",...]
      # sendrawtransaction "hexstring" ( allowhighfees )
      # signrawtransactionwithkey "hexstring" ["privatekey",...] ( [{"txid":"hex","vout":n,"scriptPubKey":"hex","redeemScript":"hex","witnessScript":"hex","amount":amount},...] "sighashtype" )
      # utxoupdatepsbt "psbt"
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

    """Only this value is returned on verbosity 0"""
    hash:ID

    height:Int
    hex:String
    mediantime:Float
    merkleroot:String

    """Block queried using nextblockhash"""
    nextBlock(verbosity:Int):Block

    nextblockhash:ID
    nTx:Int
    nonce:Float

    """Block queried using previousblockhash"""
    previousBlock(verbosity:Int):Block

    previousblockhash:ID
    strippedsize:Int
    size:Int
    time:Float

    """Only returned on verbosity 1"""
    tx:[ ID ]

    """Only returned on verbosity 2."""
    txVerbose:[ RawTransaction ] # Can a directive be used to enforce this behavior?

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
    mediantime:Float
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
    mediantime:Float
    mediantxsize:Int
    minfee:Int
    minfeerate:Int
    mintxsize:Int
    outs:Int
    subsidy:Float
    swtotal_size:Int
    swtotal_weight:Int
    swtxs:Int
    time:Float
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
    time:Float
    txcount:Int
    txrate:Float
    window_final_block_hash:String
    window_block_count:Int
    window_interval:Int
    window_tx_count:Int
  }

  type DecodedScript {
    addresses:[ ID ]
    asm:ID!
    hex:String
    p2sh:String
    p2shSegwit:String
    reqSigs:Int
    segwit:DecodedScript
    type:String
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
    time:Float
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
    timeoffset:Float
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
    timeoffset:Float
    version:Int
    whitelisted:Boolean
  }

  type RawTransaction {
    block:Block
    blockhash:ID
    blocktime:Float
    confirmations:Int
    hash:String
    hex:String
    in_active_chain:Boolean
    locktime:Float
    size:Int
    time:Float
    txid:ID
    version:Int
    vin:[ TransactionInput ]
    vout:[ TransactionOutput ]
    vsize:Int
    weight:Int
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
