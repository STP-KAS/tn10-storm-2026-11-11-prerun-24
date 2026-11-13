// pre-run 23: the pre-run 22 copy, unchanged.
// pre-run 22: the pre-run 21 copy, unchanged.
// pre-run 21 copy (from pre-run 20).
// pre-run 20 copy (from pre-run 19).
// pre-run 19 copy (from pre-run 18).
// pre-run 18 copy (from pre-run 17) (status18.mjs), kit24.
// status14.mjs (pre-run 15): status.mjs with kit21 and the usable-tKAS abort line. read-only. Desk node, lane (key 0) vs abort line, keys 1..15 genesis-eligible coin, key 16 pile. Counts only.
import { CFG, to, connect } from "../kit24/lib.mjs";
import { keyAddress } from "../kit24/covenant.mjs";
const rpc = await connect(CFG.main_node_url, 3);
const si = await to(rpc.getServerInfo(), 8000);
const d1 = BigInt((await to(rpc.getBlockDagInfo(), 8000)).virtualDaaScore); await new Promise((r) => setTimeout(r, 3000));
const d2 = BigInt((await to(rpc.getBlockDagInfo(), 8000)).virtualDaaScore);
const bag = (await to(rpc.getUtxosByAddresses({ addresses: [keyAddress(0)] }), 90000)).entries || [];
const lane = bag.filter((e) => !e.isCoinbase && BigInt(e.amount) > 300_000_000n);
const usable = Math.round(lane.reduce((s, e) => s + Number(e.amount) - 3e8, 0) / 1e8);
const elig0 = bag.filter((e) => !e.isCoinbase && BigInt(e.amount) >= 1_500_000_000n && BigInt(e.amount) < 10_000_000_000_000n).length;
const need = [];
for (let k = 1; k <= 15; k++) { const r = (await to(rpc.getUtxosByAddresses({ addresses: [keyAddress(k)] }), 30000)).entries || []; if (!r.some((e) => !e.isCoinbase && BigInt(e.amount) >= 1_500_000_000n && BigInt(e.amount) < 10_000_000_000_000n)) need.push(k); }
const pile = ((await to(rpc.getUtxosByAddresses({ addresses: [keyAddress(16)] }), 90000)).entries || []).filter((e) => !e.isCoinbase && BigInt(e.amount) > 1_000_000_000n && BigInt(e.amount) < 10_000_000_000_000n).length;
console.log(JSON.stringify({ tn10: si.networkId === "testnet-10", synced: si.isSynced, utxoindex: si.hasUtxoIndex, daa_moving: d2 > d1, lane_coins: lane.length, lane_usable_tkas: usable, above_abort: usable >= 18000, small_coins: bag.filter((e) => !e.isCoinbase && BigInt(e.amount) <= 300_000_000n).length, lane_genesis_eligible: elig0, keys_needing_genesis_coin: need, pay_pile: pile }));
await rpc.disconnect(); process.exit(0);
