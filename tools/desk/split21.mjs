// pre-run 23: the pre-run 22 copy, unchanged.
// pre-run 22: the pre-run 21 copy, unchanged.
// pre-run 21 copy (from pre-run 20).
// pre-run 20 copy (from pre-run 19).
// pre-run 19 copy (from pre-run 18).
// pre-run 18 copy (from pre-run 17) (split18.mjs), kit24.
// split16.mjs (pre-run 16, private, not in git). TESTNET-10 ONLY. The family lane (key 0) had 320 coins over 3 tKAS after
// pre-run 15 (most of its tKAS in a few big coins). Splits key-0 coins over --min tKAS (default 60) into outputs of --size tKAS
// (default 25), at most --outs outputs a transaction (default 60) plus the change, back to key 0, until --target coins over
// 3 tKAS exist (default 3,500). Fee = 100 x max(SDK compute mass, SDK storage mass). Skips coins spent in the mempool.
// Records each transaction (inputs, outputs, amounts, fee, txid) in private/split18.jsonl (desk only). Prints counts only.
// --dry builds and prints, submits nothing.
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module";
const KIT = process.env.STORM_KIT; const U = (f) => "file:///" + path.join(KIT, f).replace(/\\/g, "/");
const { CFG, P, to, connect, massOf, sleep } = await import(U("lib.mjs")); const { keyAddress, covOf } = await import(U("covenant.mjs"));
const k = createRequire(import.meta.url)(CFG.kaspa_sdk);
const arg = (n, d) => { const i = process.argv.indexOf("--" + n); return i > 0 ? process.argv[i + 1] : d; };
const DRY = process.argv.includes("--dry"), SIZE = BigInt(Math.round(Number(arg("size", "25")) * 1e8)), MIN = BigInt(Math.round(Number(arg("min", "60")) * 1e8)), NOUT = Number(arg("outs", "60")), TARGET = Number(arg("target", "3500")), RATE = 100n; const NET = "testnet-10";
const REC = P("private", "split18.jsonl");
const lines = fs.readFileSync(CFG.keys_file, "utf8").trim().split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
const pk0 = new k.PrivateKey(lines[0]); const A0 = keyAddress(0);
const rpc = await connect(CFG.main_node_url, 3);
const si = await to(rpc.getServerInfo(), 8000); if (si.networkId !== "testnet-10" || !si.isSynced) { console.log("NOT_SYNCED_OR_NOT_TN10"); process.exit(2); }
const spent = new Set();
const mp = await to(rpc.getMempoolEntriesByAddresses({ addresses: [A0], includeOrphanPool: true, filterTransactionPool: false }), 60000);
for (const a of mp.entries || []) for (const s of a.sending || []) for (const i of s.transaction?.inputs || []) { const op = i.previousOutpoint || i.outpoint; if (op) spent.add(String(op.transactionId) + ":" + Number(op.index)); }
const bag = (await to(rpc.getUtxosByAddresses({ addresses: [A0] }), 120000)).entries || [];
const free = (e) => !e.isCoinbase && !covOf(e) && !spent.has(String(e.outpoint.transactionId) + ":" + Number(e.outpoint.index));
const over3 = bag.filter((e) => !e.isCoinbase && BigInt(e.amount) > 300_000_000n).length;
const big = bag.filter((e) => free(e) && BigInt(e.amount) >= MIN).sort((a, b) => (BigInt(a.amount) > BigInt(b.amount) ? -1 : 1));
console.log(JSON.stringify({ before: { coins: bag.length, over3, big: big.length, big_tkas: Math.round(big.reduce((s, e) => s + Number(e.amount), 0) / 1e8) } }));
const entry = (e) => ({ address: A0, outpoint: { transactionId: String(e.outpoint.transactionId), index: Number(e.outpoint.index) }, amount: BigInt(e.amount), scriptPublicKey: e.scriptPublicKey, blockDaaScore: BigInt(e.blockDaaScore || 0), isCoinbase: false });
function build(e) {
  const inp = entry(e); const tot = inp.amount; let fee = 10_000_000n, tx, sm = 0, cm = 0, n = 0;
  for (let i = 0; i < 5; i++) {
    n = Number((tot - fee) / SIZE); if (n > NOUT) n = NOUT; if (n < 1) return null;
    const change = tot - fee - SIZE * BigInt(n); const vals = Array(n).fill(SIZE); if (change >= SIZE / 2n) vals.push(change); else vals[n - 1] += change;
    tx = k.createTransaction([inp], vals.map((v) => new k.PaymentOutput(new k.Address(A0), v)), 0n, undefined, 1);
    sm = Number(k.calculateStorageMass(NET, [Number(tot)], vals.map(Number))); cm = massOf(tx);
    const f2 = BigInt(Math.max(sm, cm)) * RATE; if (f2 === fee) break; fee = f2;
  }
  return { tx, fee, tot, outs: tx.outputs.length, mass: Math.max(sm, cm), sm, cm };
}
let have = over3, ok = 0, rej = 0, fees = 0n, outs = 0, moved = 0n; const errs = {}; const plan = [];
for (const e of big) { if (have >= TARGET) break; const b = build(e); if (!b) continue; plan.push([e, b]); have += b.outs - 1; }
console.log(JSON.stringify({ txs: plan.length, coins_after_est: have, first: plan[0] ? { outs: plan[0][1].outs, mass: plan[0][1].mass, sm: plan[0][1].sm, cm: plan[0][1].cm, fee_tkas: Number(plan[0][1].fee) / 1e8 } : null }));
if (plan.some(([, b]) => b.mass > 100000)) { console.log("HELD mass-over-100k"); process.exit(3); }
if (DRY) process.exit(0);
for (let i = 0; i < plan.length; i += 40) {
  const r = await Promise.allSettled(plan.slice(i, i + 40).map(async ([e, b]) => {
    const signed = k.signTransaction(b.tx, [pk0], true);
    const res = await to(rpc.submitTransaction({ transaction: signed, allowOrphan: false }), 20000, "submit");
    fs.appendFileSync(REC, JSON.stringify({ ts: new Date().toISOString(), inputs: 1, outputs: b.outs, in_sompi: String(b.tot), fee_sompi: String(b.fee), mass: b.mass, txid: String(res?.transactionId || "") }) + "\n");
    return b;
  }));
  for (const x of r) { if (x.status === "fulfilled") { ok++; fees += x.value.fee; outs += x.value.outs; moved += x.value.tot; } else { rej++; const m = String(x.reason?.message || x.reason).replace(/[0-9a-f]{64}/gi, "<h>").slice(0, 60); errs[m] = (errs[m] || 0) + 1; } }
  await sleep(400);
}
console.log(JSON.stringify({ submitted_ok: ok, rejected: rej, new_coins: outs, moved_tkas: Math.round(Number(moved) / 1e8), fees_tkas: Number(fees) / 1e8, errs }));
try { await rpc.disconnect(); } catch {}
process.exit(0);
