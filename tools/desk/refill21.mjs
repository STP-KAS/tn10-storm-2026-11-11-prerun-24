// pre-run 23: the pre-run 22 copy, unchanged.
// pre-run 22: the pre-run 21 copy, unchanged.
// pre-run 21 copy (from pre-run 20).
// pre-run 20 copy (from pre-run 19).
// pre-run 19 copy (from pre-run 18).
// pre-run 18 copy (from refill17).
// refill18.mjs (pre-run 17, private, not in git). TESTNET-10 ONLY. Moves --coins coins from the payment pile (key 16) to the
// family lane (key 0), one output per input at the same size less a share of the fee (so the coins stay family-usable and
// storage mass stays about 0), --per inputs per transaction (default 20), fee = 150 x max(SDK compute, storage) mass. Skips coins
// spent in the mempool; only plain pile coins of 16-40 tKAS. Records each transaction (inputs, amount, fee, txid) in
// private/refill18.jsonl (desk only). Prints counts only. --dry builds and prints, submits nothing.
import fs from "node:fs"; import path from "node:path"; import { createRequire } from "node:module";
const KIT = process.env.STORM_KIT; const U = (f) => "file:///" + path.join(KIT, f).replace(/\\/g, "/");
const { CFG, P, to, connect, massOf, sleep } = await import(U("lib.mjs")); const { keyAddress, covOf } = await import(U("covenant.mjs"));
const k = createRequire(import.meta.url)(CFG.kaspa_sdk); const NET = "testnet-10";
const arg = (n, d) => { const i = process.argv.indexOf("--" + n); return i > 0 ? process.argv[i + 1] : d; };
const DRY = process.argv.includes("--dry"), NCOIN = Number(arg("coins", "1200")), PER = Number(arg("per", "20")), RATE = 150n;
const REC = P("private", "refill18.jsonl");
const lines = fs.readFileSync(CFG.keys_file, "utf8").trim().split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
const pk16 = new k.PrivateKey(lines[16]); const A16 = keyAddress(16), A0 = keyAddress(0);
if (pk16.toKeypair().toAddress(NET).toString() !== A16) { console.log("HELD key16-mismatch"); process.exit(3); }
const rpc = await connect(CFG.main_node_url, 3);
const si = await to(rpc.getServerInfo(), 8000); if (si.networkId !== "testnet-10" || !si.isSynced) { console.log("NOT_SYNCED_OR_NOT_TN10"); process.exit(2); }
const spent = new Set();
const mp = await to(rpc.getMempoolEntriesByAddresses({ addresses: [A16], includeOrphanPool: true, filterTransactionPool: false }), 60000);
for (const a of mp.entries || []) for (const s of a.sending || []) for (const i of s.transaction?.inputs || []) { const op = i.previousOutpoint || i.outpoint; if (op) spent.add(String(op.transactionId) + ":" + Number(op.index)); }
const bag = (await to(rpc.getUtxosByAddresses({ addresses: [A16] }), 120000)).entries || [];
const pile = bag.filter((e) => !e.isCoinbase && !covOf(e) && BigInt(e.amount) >= 1_600_000_000n && BigInt(e.amount) <= 4_000_000_000n && !spent.has(String(e.outpoint.transactionId) + ":" + Number(e.outpoint.index)));
const pileAll = bag.filter((e) => !e.isCoinbase && BigInt(e.amount) > 1_000_000_000n && BigInt(e.amount) < 10_000_000_000_000n);
const pick = pile.slice(0, NCOIN);
console.log(JSON.stringify({ before: { pile_coins: pileAll.length, pile_tkas: Math.round(pileAll.reduce((s, e) => s + Number(e.amount), 0) / 1e8), eligible: pile.length, pick: pick.length, pick_tkas: Math.round(pick.reduce((s, e) => s + Number(e.amount), 0) / 1e8) } }));
const entry = (e) => ({ address: A16, outpoint: { transactionId: String(e.outpoint.transactionId), index: Number(e.outpoint.index) }, amount: BigInt(e.amount), scriptPublicKey: e.scriptPublicKey, blockDaaScore: BigInt(e.blockDaaScore || 0), isCoinbase: false });
function build(group) {
  const ins = group.map(entry); let fee = 1_000_000n, tx, sm = 0, cm = 0;
  for (let i = 0; i < 5; i++) {
    const share = fee / BigInt(ins.length) + 1n; const vals = ins.map((e) => e.amount - share);
    tx = k.createTransaction(ins, vals.map((v) => new k.PaymentOutput(new k.Address(A0), v)), 0n, undefined, 1);
    sm = Number(k.calculateStorageMass(NET, ins.map((e) => Number(e.amount)), vals.map(Number))); cm = massOf(tx);
    const f2 = BigInt(Math.max(sm, cm)) * RATE; if (f2 === fee) break; fee = f2;
  }
  return { tx, fee, tot: ins.reduce((s, e) => s + e.amount, 0n), outs: tx.outputs.length, mass: Math.max(sm, cm), sm, cm };
}
const groups = []; for (let i = 0; i < pick.length; i += PER) groups.push(pick.slice(i, i + PER));
const t0 = groups.length ? build(groups[0]) : null;
console.log(JSON.stringify({ txs: groups.length, first: t0 ? { inputs: groups[0].length, outs: t0.outs, mass: t0.mass, sm: t0.sm, cm: t0.cm, fee_tkas: Number(t0.fee) / 1e8 } : null }));
if (t0 && t0.mass > 100000) { console.log("HELD mass-over-100k"); process.exit(3); }
if (DRY || !groups.length) process.exit(0);
let ok = 0, rej = 0, fees = 0n, outs = 0, moved = 0n; const errs = {};
for (let i = 0; i < groups.length; i += 20) {
  const r = await Promise.allSettled(groups.slice(i, i + 20).map(async (g) => {
    const b = build(g); if (b.mass > 100000) throw new Error("mass");
    const signed = k.signTransaction(b.tx, [pk16], true);
    const res = await to(rpc.submitTransaction({ transaction: signed, allowOrphan: false }), 20000, "submit");
    fs.appendFileSync(REC, JSON.stringify({ ts: new Date().toISOString(), inputs: g.length, outputs: b.outs, in_sompi: String(b.tot), fee_sompi: String(b.fee), mass: b.mass, txid: String(res?.transactionId || "") }) + "\n");
    return b;
  }));
  for (const x of r) { if (x.status === "fulfilled") { ok++; fees += x.value.fee; outs += x.value.outs; moved += x.value.tot; } else { rej++; const m = String(x.reason?.message || x.reason).replace(/[0-9a-f]{64}/gi, "<h>").replace(/kaspatest:[a-z0-9]+/g, "<addr>").slice(0, 60); errs[m] = (errs[m] || 0) + 1; } }
  await sleep(400);
}
console.log(JSON.stringify({ submitted_ok: ok, rejected: rej, new_coins: outs, moved_tkas: Math.round(Number(moved) / 1e8), fees_tkas: Number(fees) / 1e8, errs }));
try { await rpc.disconnect(); } catch {}
process.exit(0);
