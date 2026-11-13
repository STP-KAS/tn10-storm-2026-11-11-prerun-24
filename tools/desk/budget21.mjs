// pre-run 23: the pre-run 22 copy, unchanged.
// pre-run 22: the pre-run 21 copy, unchanged.
// pre-run 21 copy (from pre-run 20).
// pre-run 20 copy (from pre-run 19).
// pre-run 19 copy (from pre-run 18).
// budget18.mjs (pre-run 18, read-only). The pre-run budget check added after pre-run 17 failed on its abort line: reads key 0's
// usable tKAS (coins over 3 tKAS, less 3 each) and the key-16 pile, and projects key 0 at the end of the run from the planned
// family minutes and a measured use rate (pre-run 17: about 1.06 usable tKAS per OK hop, about 730 a minute; 760 here for
// margin). ok=1 only if the projected end is over the 18,000 abort line by at least --margin (default 8,000).
// Args: --minutes <planned family minutes> --per-min <usable a minute> --margin <tKAS>. Prints counts only.
import { CFG, to, connect } from "../kit24/lib.mjs";
import { keyAddress } from "../kit24/covenant.mjs";
const arg = (n, d) => { const i = process.argv.indexOf("--" + n); return i > 0 ? Number(process.argv[i + 1]) : d; };
const MIN = arg("minutes", 72), PER = arg("per-min", 760), MARGIN = arg("margin", 8000), ABORT = 18000;
const rpc = await connect(CFG.main_node_url, 3);
const si = await to(rpc.getServerInfo(), 8000);
const bag = (await to(rpc.getUtxosByAddresses({ addresses: [keyAddress(0)] }), 90000)).entries || [];
const lane = bag.filter((e) => !e.isCoinbase && BigInt(e.amount) > 300_000_000n);
const usable = Math.round(lane.reduce((s, e) => s + Number(e.amount) - 3e8, 0) / 1e8);
const pileC = ((await to(rpc.getUtxosByAddresses({ addresses: [keyAddress(16)] }), 90000)).entries || []).filter((e) => !e.isCoinbase && BigInt(e.amount) > 1_000_000_000n && BigInt(e.amount) < 10_000_000_000_000n);
const proj = usable - MIN * PER;
console.log(JSON.stringify({ tn10: si.networkId === "testnet-10", synced: si.isSynced, key0_usable_tkas: usable, key0_coins_over3: lane.length, small_coins: bag.filter((e) => !e.isCoinbase && BigInt(e.amount) <= 300_000_000n).length, planned_family_min: MIN, use_per_min: PER, projected_end_tkas: proj, abort_line: ABORT, margin_needed: MARGIN, ok: proj >= ABORT + MARGIN ? 1 : 0, pile_coins: pileC.length, pile_tkas: Math.round(pileC.reduce((s, e) => s + Number(e.amount), 0) / 1e8) }));
await rpc.disconnect(); process.exit(0);
