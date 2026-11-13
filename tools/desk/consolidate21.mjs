// pre-run 23: the pre-run 22 copy, unchanged.
// pre-run 22: the pre-run 21 copy, unchanged.
// pre-run 21 copy (from pre-run 20).
// pre-run 20 copy (from pre-run 19).
// pre-run 19 copy (from pre-run 18).
// pre-run 18 copy (from pre-run 17) (consolidate18.mjs), kit24.
// consolidate15.mjs (pre-run 15, private, not in git). TESTNET-10 ONLY. Merges the family lane's (key 0) plain coins of 3 tKAS or
// less (hop change the family sender's pool cannot use; pre-run 13's coin-count abort tripped on them) into coins of about
// --size tKAS (default 20) back to key 0. Up to --inputs (default 80) coins per transaction, fee = rate (100) x the SDK mass,
// which for many small inputs into a few larger outputs is compute mass (storage mass 0 by KIP-9). Skips coins spent in the
// mempool. Records each transaction (inputs, outputs, amounts, fee, txid) in private/consolidate18.jsonl (desk only).
// Prints counts only. --dry builds and prints, submits nothing. --max-tx caps how many transactions go out.
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module";
const KIT = process.env.STORM_KIT; const U = (f) => "file:///" + path.join(KIT, f).replace(/\\/g, "/");
const { CFG, P, to, connect, massOf, sleep } = await import(U("lib.mjs")); const { keyAddress, covOf } = await import(U("covenant.mjs"));
const k = createRequire(import.meta.url)(CFG.kaspa_sdk);
const arg = (n, d) => { const i = process.argv.indexOf("--" + n); return i > 0 ? process.argv[i + 1] : d; };
const DRY = process.argv.includes("--dry"), SIZE = BigInt(Math.round(Number(arg("size", "20")) * 1e8)), NIN = Number(arg("inputs", "80")), MAXTX = Number(arg("max-tx", "100000")), RATE = 100n;
const REC = P("private", "consolidate18.jsonl");
const lines = fs.readFileSync(CFG.keys_file, "utf8").trim().split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
const pk0 = new k.PrivateKey(lines[0]); const A0 = keyAddress(0);
const rpc = await connect(CFG.main_node_url, 3);
const si = await to(rpc.getServerInfo(), 8000); if (si.networkId !== "testnet-10" || !si.isSynced) { console.log("NOT_SYNCED_OR_NOT_TN10"); process.exit(2); }
const spent = new Set();
const mp = await to(rpc.getMempoolEntriesByAddresses({ addresses: [A0], includeOrphanPool: true, filterTransactionPool: false }), 60000);
for (const a of mp.entries || []) for (const s of a.sending || []) for (const i of s.transaction?.inputs || []) { const op = i.previousOutpoint || i.outpoint; if (op) spent.add(String(op.transactionId) + ":" + Number(op.index)); }
const bag = (await to(rpc.getUtxosByAddresses({ addresses: [A0] }), 120000)).entries || [];
const small = bag.filter((e) => !e.isCoinbase && !covOf(e) && BigInt(e.amount) <= 300_000_000n && !spent.has(String(e.outpoint.transactionId) + ":" + Number(e.outpoint.index)))
  .sort((a, b) => (BigInt(a.amount) < BigInt(b.amount) ? -1 : 1));
const before = { coins: bag.length, small: small.length, small_tkas: Math.round(small.reduce((s, e) => s + Number(e.amount), 0) / 1e8), over3: bag.filter((e) => !e.isCoinbase && BigInt(e.amount) > 300_000_000n).length, mempool_spent: spent.size };
console.log(JSON.stringify({ before }));
const entry = (e) => ({ address: A0, outpoint: { transactionId: String(e.outpoint.transactionId), index: Number(e.outpoint.index) }, amount: BigInt(e.amount), scriptPublicKey: e.scriptPublicKey, blockDaaScore: BigInt(e.blockDaaScore || 0), isCoinbase: false });
function build(group) {
  const ins = group.map(entry); const tot = ins.reduce((s, e) => s + e.amount, 0n);
  let fee = 10_000_000n, tx;
  for (let i = 0; i < 4; i++) {
    const net = tot - fee; const n = net / SIZE > 0n ? net / SIZE : 1n; const each = net / n; const outs = [];
    for (let j = 0n; j < n; j++) outs.push(new k.PaymentOutput(new k.Address(A0), j === n - 1n ? net - each * (n - 1n) : each));
    tx = k.createTransaction(ins, outs, 0n, undefined, 1);
    const f2 = BigInt(massOf(tx)) * RATE; if (f2 === fee) break; fee = f2;
  }
  return { tx, fee, tot, outs: tx.outputs.length, mass: massOf(tx) };
}
const groups = []; for (let i = 0; i + 1 < small.length && groups.length < MAXTX; i += NIN) groups.push(small.slice(i, i + NIN));
const t0 = build(groups[0]);
console.log(JSON.stringify({ txs: groups.length, first: { inputs: groups[0].length, outs: t0.outs, mass: t0.mass, fee_tkas: Number(t0.fee) / 1e8 } }));
if (t0.mass > 100000) { console.log("HELD mass-over-100k"); process.exit(3); }
if (DRY) process.exit(0);
let ok = 0, rej = 0, fees = 0n, outs = 0, moved = 0n; const errs = {};
for (let i = 0; i < groups.length; i += 40) {
  const r = await Promise.allSettled(groups.slice(i, i + 40).map(async (g) => {
    const b = build(g); if (b.mass > 100000) throw new Error("mass");
    const signed = k.signTransaction(b.tx, [pk0], true);
    const res = await to(rpc.submitTransaction({ transaction: signed, allowOrphan: false }), 20000, "submit");
    fs.appendFileSync(REC, JSON.stringify({ ts: new Date().toISOString(), inputs: g.length, outputs: b.outs, in_sompi: String(b.tot), fee_sompi: String(b.fee), mass: b.mass, txid: String(res?.transactionId || "") }) + "\n");
    return b;
  }));
  for (const x of r) { if (x.status === "fulfilled") { ok++; fees += x.value.fee; outs += x.value.outs; moved += x.value.tot; } else { rej++; const m = String(x.reason?.message || x.reason).replace(/[0-9a-f]{64}/gi, "<h>").slice(0, 60); errs[m] = (errs[m] || 0) + 1; } }
  await sleep(400);
}
console.log(JSON.stringify({ submitted_ok: ok, rejected: rej, new_coins: outs, moved_tkas: Math.round(Number(moved) / 1e8), fees_tkas: Number(fees) / 1e8, errs }));
try { await rpc.disconnect(); } catch {}
process.exit(0);
