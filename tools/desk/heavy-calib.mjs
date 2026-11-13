// heavy-calib.mjs: pre-run 13's calibration of our heavy-lane shape on the desk node's own mass. TESTNET-10 ONLY. Private.
// Makes the dedicated sink key if it is missing (private/sink.key; stays on this desk). Builds ONE lane transaction exactly as
// heavy-lane.mjs does (one pile coin of key 16 -> 0.0375 tKAS to the sink + change to key 16, fee 100 x SDK mass), records the
// SDK's storage and compute mass, submits it on the desk's private node, and reads it back from the desk mempool
// (getMempoolEntry): node storage mass, compute mass, fee / node mass. ok = 1 only if the node's storage mass is within
// 1 percent of the SDK's and the node fee rate is 99-101. Writes private/heavy-calib.json. --dry builds and prints, no submit.
// Prints counts only; no id, address, key or host.
import fs from "node:fs"; import path from "node:path"; import crypto from "node:crypto"; import { createRequire } from "node:module";
const KIT = process.env.STORM_KIT;
const U = (f) => "file:///" + path.join(KIT, f).replace(/\\/g, "/");
const { CFG, P, connect, to, massOf } = await import(U("lib.mjs"));
const { keyAddress } = await import(U("covenant.mjs"));
const k = createRequire(import.meta.url)(CFG.kaspa_sdk);
const NET = "testnet-10"; const DRY = process.argv.includes("--dry");
const isoZ = (ms = Date.now()) => new Date(ms).toISOString().replace(/\.\d+Z$/, "Z");
const SK = P("private", "sink.key");
if (!fs.existsSync(SK)) fs.writeFileSync(SK, crypto.randomBytes(32).toString("hex") + "\n");
const SINK = new k.PrivateKey(fs.readFileSync(SK, "utf8").trim()).toKeypair().toAddress(NET).toString();
const keyHex = fs.readFileSync(CFG.keys_file, "utf8").trim().split(/\r?\n/)[16].trim();
const pk16 = new k.PrivateKey(keyHex); const A16 = keyAddress(16);
if (pk16.toKeypair().toAddress(NET).toString() !== A16) { console.log(JSON.stringify({ held: "key16-mismatch" })); process.exit(3); }
const rpc = await connect(CFG.main_node_url, 3);
const si = await to(rpc.getServerInfo(), 8000); if (si.networkId !== "testnet-10" || !si.isSynced) { console.log("NOT_SYNCED_OR_NOT_TN10"); process.exit(2); }
const sinkHas = ((await to(rpc.getUtxosByAddresses({ addresses: [SINK] }), 30000)).entries || []).length;
const bag = ((await to(rpc.getUtxosByAddresses({ addresses: [A16] }), 120000)).entries || []).filter((e) => !e.isCoinbase && BigInt(e.amount) >= 1_000_000_000n && BigInt(e.amount) < 10_000_000_000_000n).sort((a, b) => (BigInt(a.amount) > BigInt(b.amount) ? -1 : 1));
const e = bag[0];
const coin = { address: A16, outpoint: { transactionId: String(e.outpoint.transactionId), index: Number(e.outpoint.index) }, amount: BigInt(e.amount), scriptPublicKey: e.scriptPublicKey, blockDaaScore: BigInt(e.blockDaaScore || 0), isCoinbase: false };
const SINK_SOMPI = 3_750_000n, RATE = BigInt(process.env.STORM_CALIB_RATE || 100); const amt = coin.amount;   // pre-run 16: rate from env (100 writes heavy-calib.json)
let fee = 30_000_000n, tx, sm, cm;
for (let i = 0; i < 4; i++) {
  const change = amt - SINK_SOMPI - fee;
  tx = k.createTransaction([coin], [new k.PaymentOutput(new k.Address(SINK), SINK_SOMPI), new k.PaymentOutput(new k.Address(A16), change)], 0n, undefined, 1);
  sm = Number(k.calculateStorageMass(NET, [Number(amt)], [Number(SINK_SOMPI), Number(change)])); cm = massOf(tx);
  const f2 = BigInt(Math.max(sm, cm)) * RATE; if (f2 === fee) break; fee = f2;
}
const signed = k.signTransaction(tx, [pk16], true);
const out = { ts: isoZ(), pile_coins: bag.length, coin_tkas: Math.round(Number(amt) / 1e8), sink_coins_before: sinkHas, shape: "1 in -> 0.0375 tKAS sink + change", sdk_storage: sm, sdk_tx_mass: cm, fee_sompi: String(fee), fee_tkas: Number(fee) / 1e8, rate: Number(RATE) };
if (DRY) { console.log(JSON.stringify({ dry: 1, ...out })); process.exit(0); }
const txid = String(tx.id);
fs.appendFileSync(P("private", "heavytx-calib.txt"), txid + "\n");
let subErr = null; const tS = Date.now();
try { await to(rpc.submitTransaction({ transaction: signed, allowOrphan: false }), 15000, "submit"); } catch (er) { subErr = String(er?.message || er).replace(/[0-9a-f]{64}/gi, "<h>").slice(0, 160); }
let got = null, tries = 0;
if (!subErr) for (; tries < 400 && !got; tries++) { try { const r = await to(rpc.getMempoolEntry({ transactionId: txid, includeOrphanPool: false, filterTransactionPool: false }), 5000); const x = r.mempoolEntry || r.entry || r; if (x?.transaction) got = x; } catch {} if (!got) await new Promise((z) => setTimeout(z, 50)); }
if (got) {
  const t = got.transaction; const nsm = Number(t.storageMass) || 0; const ncm = Number(t.verboseData?.computeMass) || 0; const nm = Number(t.mass) || 0; const nfee = Number(got.fee);
  Object.assign(out, { read_ms: Date.now() - tS, node_storage: nsm, node_compute: ncm, node_mass_field: nm, node_fee_sompi: nfee, node_rate: Math.round((nfee / Math.max(nsm, ncm, 1)) * 100) / 100, storage_off_pct: Math.round((Math.abs(nsm - sm) / sm) * 10000) / 100 });
  out.ok = out.storage_off_pct <= 1 && out.node_rate >= 0.99 * Number(RATE) && out.node_rate <= 1.01 * Number(RATE) ? 1 : 0;
} else Object.assign(out, { ok: 0, submit_error: subErr, read: subErr ? "not-submitted" : "not-seen-in-mempool", tries });
fs.writeFileSync(P("private", RATE === 100n ? "heavy-calib.json" : `heavy-calib-${RATE}.json`), JSON.stringify(out, null, 2));
console.log(JSON.stringify(out));
try { await rpc.disconnect(); } catch {}
process.exit(0);
