// pre-run 19 copy: launch path -p23-cal.
// hopcal18.mjs: hopcal16 with family 1 at 100 and family 13 (r450) at 450 (no esc rate file), launch path ...-p23-cal.
// hopcal16.mjs: hopcal15 with family 1 at 100 and family 8 (esc) at the duel cap 2,000, launch path ...-p16-cal.
// hopcal15.mjs: hopcal14 with the p15 tiers (family 1 at 100, family 14 at 450) and launch path ...-p15-cal.
// hopcal14.mjs (pre-run 14, private, not in git). TESTNET-10 ONLY. Calibrates kit21's node-mass hop pricing on the desk node
// before the open. One calibration covenant (key 0, launch path ...-p14-cal; not one of the sixteen families, never in
// SIXTEEN.md): build its genesis in one direct builder process and submit it; then build hops through kit21's buildHop at the
// floor rate (family 1's tier, 100) and at the top rate (family 14's tier, 300), submit each on the desk's private node and read
// it back from the desk mempool (getMempoolEntry): node storage mass, compute mass, fee, fee / max(storage, compute).
// ok = 1 only if, for every hop, the node rate is within 1 percent of the tier rate (at or above it) and the node storage
// mass is within 1 percent of kit21's computed figure. Writes private/hop-calib.json. Prints counts only; no id, key or host.
import fs from "node:fs"; import path from "node:path";
process.env.STORM_BUILDER_DIRECT = "1";
const KIT = process.env.STORM_KIT; const U = (f) => "file:///" + path.join(KIT, f).replace(/\\/g, "/");
const { CFG, P, connect, to, sleep } = await import(U("lib.mjs"));
const { startBuilder, buildHop, materialize, spkAddress, keyAddress, ofCov, step } = await import(U("covenant.mjs"));
const { liveRate } = await import(U("family-fees.mjs"));
const norm = (s) => String(s).replace(/^0x/, "").toLowerCase();
const out = { ts: new Date().toISOString(), hops: [] };
const rpc = await connect(CFG.main_node_url, 3);
const si = await to(rpc.getServerInfo(), 8000); if (si.networkId !== "testnet-10" || !si.isSynced) { console.log("NOT_SYNCED_OR_NOT_TN10"); process.exit(2); }
const A0 = keyAddress(0);
const coins = ((await to(rpc.getUtxosByAddresses({ addresses: [A0] }), 120000)).entries || []).filter((e) => !e.isCoinbase && BigInt(e.amount) >= 1_500_000_000n && BigInt(e.amount) <= 3_000_000_000n)
  .map((e) => ({ txid: norm(e.outpoint.transactionId), index: Number(e.outpoint.index), amount: String(e.amount) })).sort((a, b) => (a.txid < b.txid ? -1 : 1));
if (coins.length < 3) { console.log(JSON.stringify({ held: "need 3 key-0 coins of 15-30 tKAS", have: coins.length })); process.exit(3); }
const B = startBuilder(P("private", "hopcal-builder.err"));
await B.ask("ping", 120000);
const g = await B.ask(`genesis 0 ${coins[0].txid} ${coins[0].index} ${coins[0].amount} launch::storm-2026-10-30-p23-cal`, 180000);
await to(rpc.submitTransaction({ transaction: materialize(g.tx), allowOrphan: false }), 20000, "submit");
let landed = null; for (let e = Date.now() + 60000; Date.now() < e && !landed; ) { const u = await rpc.getUtxosByAddresses({ addresses: [spkAddress(g.minterSpk)] }); landed = (u.entries || []).find((x) => norm(x.outpoint.transactionId) === norm(g.txid) && x.outpoint.index === 0); if (!landed) await sleep(400); }
if (!landed) { console.log(JSON.stringify({ held: "calibration genesis did not land" })); process.exit(3); }
out.genesis = "landed";
let st = { covenantId: g.covenantId, owner: g.owner, txid: norm(g.txid), index: 0, remaining: g.remaining, spk: g.minterSpk, seq: 0, amount: String(landed.amount) };
let nonce = 1;
for (const [fam, coin] of [[1, coins[1]], [13, coins[2]]]) {   // pre-run 17: family 1 at 100, family 13 (r450) at 450
  const rate = liveRate(fam);
  const h = await buildHop(B, st, coin, 0, nonce++, fam);
  const tS = Date.now(); let got = null;
  await to(rpc.submitTransaction({ transaction: h.tx, allowOrphan: false }), 15000, "submit");
  for (let i = 0; i < 400 && !got; i++) { try { const r = await to(rpc.getMempoolEntry({ transactionId: h.txid, includeOrphanPool: false, filterTransactionPool: false }), 5000); const x = r.mempoolEntry || r.entry || r; if (x?.transaction) got = x; } catch {} if (!got) await sleep(25); }
  const row = { tier_rate: rate, coin_tkas: Math.round(Number(coin.amount) / 1e6) / 100, builds: h.builds, bill_rate: h.bill_rate, bill_mass: h.bill_mass, kit21_storage: h.storage_mass, kit21_node_mass: h.node_mass, kit21_rate: h.node_rate, fee_sompi: Number(h.fee) };
  if (got) { const t = got.transaction; const ns = Number(t.storageMass) || 0, nc = Number(t.verboseData?.computeMass) || 0, nf = Number(got.fee); const nr = nf / Math.max(ns, nc, 1);
    Object.assign(row, { read_ms: Date.now() - tS, node_storage: ns, node_compute: nc, node_fee: nf, node_rate: Math.round(nr * 100) / 100, storage_off_pct: Math.round((Math.abs(ns - h.storage_mass) / Math.max(1, h.storage_mass)) * 10000) / 100, ok: nr >= rate && nr <= rate * 1.01 && Math.abs(ns - h.storage_mass) <= 0.01 * h.storage_mass ? 1 : 0 }); }
  else Object.assign(row, { ok: 0, read: "not-seen-in-mempool" });
  out.hops.push(row);
  let nx = null; for (let e = Date.now() + 60000; Date.now() < e && !nx; ) { nx = await step(rpc, B, st).catch(() => null); if (!nx) await sleep(400); }
  if (!nx) { out.hops.push({ note: "hop did not land within 60 s" }); break; }
  st = nx;
}
out.ok = out.hops.length === 2 && out.hops.every((h) => h.ok === 1) ? 1 : 0;
fs.writeFileSync(P("private", "hop-calib.json"), JSON.stringify(out, null, 2));
console.log(JSON.stringify(out));
await B.ask("quit", 10000).catch(() => {});
try { await rpc.disconnect(); } catch {}
process.exit(0);
