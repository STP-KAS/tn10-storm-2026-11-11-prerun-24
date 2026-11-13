// PRE-RUN 23: pre-run 22's lane process plus a ready cap read from control/LANE-READY (at most R chains with a transaction in the mempool; the free chain unused longest goes first) and fee cap 20,000 / moved 21,000 / pile floor 1,000.
// PRE-RUN 22: pre-run 21's lane process, unchanged.
// PRE-RUN 21: pre-run 20's lane process with a submit cap read from control/LANE-PERMIN (paced evenly), a lower fee cap read from control/LANE-CAP-FEES, and fee cap 9,500 / moved 10,000 / pile floor 1,000.
// PRE-RUN 20: pre-run 19's lane process; only the caps change (fees 12,000 tKAS, moved 13,000, pile floor 3,000).
// PRE-RUN 19: pre-run 18's lane process, run with lane 2 at N=0; only the caps change (fees 4,500 tKAS, moved 4,700, pile floor 1,000).
// PRE-RUN 18: pre-run 17's two-lane process; only the caps change (fees 32,000 tKAS, moved 34,500, pile floor 3,500).
// PRE-RUN 17 changes: TWO lanes in this one process (one node connection, one key-16 pile): lane 1 reads control/LANE-N and
// control/LANE-RATE and uses chain slots 0..99; lane 2 reads control/LANE2-N and control/LANE2-RATE and uses slots 100..199.
// Same shape, same build, same guards; each lane has its own submit bucket (20 a second, 1,200 a minute); which lane submits
// first alternates every tick. Lane 2's ids also go to private/heavytx-l2.txt (the counter's hv2 = lane 2 landed; hv is both).
// lane-minute.log adds n2, rate2, ok1, ok2 and per-lane cumulative fees. Caps: fees 90,000 tKAS, moved 100,000, pile floor
// 15,000 (were 40,000 / 45,000 / 100,000: the pile was moved down by the pre-run 17 refill of key 0, and a spiral may sit at
// 2,000). The pause guard is N1 + N2 + 2 and reads the probe's address count when its full read is off.
// PRE-RUN 16 changes: the rate is any whole number from 100 to 2,000 read from control/LANE-RATE every tick (the duel
// controller moves it); fee cap 40,000 tKAS and moved cap 45,000 (were 16,000 / 20,000); the pile floor (100,000) stays.
// PRE-RUN 15 changes: ready-mass hold 80 blocks (was 45), submit cap 1,200 a minute / 20 a second (was 600 / 10), rate 100,
// 126 or 150 (was 100 or 126). Nothing else changed. Pre-run 13/14 header follows.
// heavy-lane.mjs: pre-run 13's own heavy-mass competitor lane. TESTNET-10 ONLY. Private run folder; ids stay on this desk.
// One process, started detached by the desk runner (a kid like the probe). Funded only from the payment pile (key 16).
// Shape: one input (the chain's own coin, key 16), two plain pay-to-key outputs (plurality 1): 0.0375 tKAS to our own sink key
// (private/sink.key, a dedicated key that holds nothing else) and the change back to key 16. Storage mass about 266,667 by the
// v2.1.0 formula, which our SDK and the desk node agreed on in the calibration (private/heavy-calib.json, required).
// Fee = rate x max(SDK compute mass, SDK storage mass); rate 100, or 126 when the runner says so.
// Control (the runner writes them): control/LANE-N (ready-count cap N: chains 1..N may each hold one transaction in the
// mempool, and a chain's next transaction goes out only after its previous one has left the mempool, so every lane
// transaction is ready), control/LANE-RATE. control/STOP ends the lane.
// Guards: pause while the probe reads more than N+2 lane entries in the mempool for three samples in a row (resume at <= N);
// at most 600 submits a minute (10 a second); hold while the desk mempool is at or over 90,000 or ready mass over 45 blocks;
// stop (idle, alive) at 16,000 tKAS of fees, 20,000 tKAS moved (fees + parked), or the pile estimate under 100,000 tKAS;
// stop (idle) on any rejection other than orphan/already-spent timing, or if the node's fee rate or mass on our own entries
// drifts from the calibration (rate outside 99-101 x step rate / 100, storage off the SDK by more than 1 percent).
// lane-minute.log carries the N and rate the lane read at the first tick of that minute (the runner sets them 0.3 s before
// the boundary).
// Files: private/heavytx.txt (one id per line, for the probe and the counter), private/heavy-submit.jsonl, logs/lane-minute.log,
// private/heavy-total.json. phase.log lines LANE_*. Prints counts only; no id, address, key or host leaves this desk.
import fs from "node:fs";
import path from "node:path";
import { createRequire } from "node:module";
const KIT = process.env.STORM_KIT;
const U = (f) => "file:///" + path.join(KIT, f).replace(/\\/g, "/");
const { CFG, P, connect, to, phase, sleep, massOf, reason } = await import(U("lib.mjs"));
const { keyAddress } = await import(U("covenant.mjs"));
const k = createRequire(import.meta.url)(CFG.kaspa_sdk);
const NET = "testnet-10";
const SINK_SOMPI = 3_750_000n, MIN_CHANGE = 100_000_000n, RETIRE = 200_000_000n;
const CAP_FEES = Number(process.env.STORM_LANE_CAP_FEES || 20_000) * 1e8, CAP_MOVED = Number(process.env.STORM_LANE_CAP_MOVED || 21_000) * 1e8, PILE_FLOOR = Number(process.env.STORM_LANE_PILE_FLOOR || 1_000) * 1e8, PER_MIN = 1200, PER_S = 20;   // pre-run 21: fee cap 9,500 tKAS, moved 10,000, pile floor 1,000; control/LANE-PERMIN (submit cap a minute, paced evenly) and control/LANE-CAP-FEES (a lower fee cap, tKAS) read every tick   // pre-run 20: fee cap 12,000 tKAS, moved 13,000, pile floor 3,000 (defaults; the kid does not inherit the runner's env)   // pre-run 18: fee cap 32,000 tKAS, moved 34,500, pile floor 3,500 (key 0 refilled from the pile first; the cap is the budget for the greedy duel)   // pre-run 17: fee cap 90,000 tKAS, moved 100,000, pile floor 15,000 (two lanes, a spiral may reach 2,000; per lane 1,200 a minute / 20 a second)   // pre-run 16: fee cap 40,000 tKAS (the duel may reach 2,000)   // pre-run 15: 1,200 a minute (N=60 must not meet the submit cap)
const MEMPOOL_HOLD = 90000, READY_HOLD = 80;   // pre-run 15: hold raised from 45 to 80 blocks (the lane uncapped at N=60)
const isoZ = (ms = Date.now()) => new Date(ms).toISOString().replace(/\.\d+Z$/, "Z");
const mkey = (ms) => new Date(ms).toISOString().slice(0, 16);
const calib = (() => { try { return JSON.parse(fs.readFileSync(P("private", "heavy-calib.json"), "utf8")); } catch { return null; } })();
if (!calib || calib.ok !== 1) { phase("LANE_REFUSED reason=no-calibration"); process.exit(3); }
const sinkHex = fs.readFileSync(P("private", "sink.key"), "utf8").trim();
const SINK = new k.PrivateKey(sinkHex).toKeypair().toAddress(NET).toString();
const keyHex = fs.readFileSync(CFG.keys_file, "utf8").trim().split(/\r?\n/)[16].trim();
const pk16 = new k.PrivateKey(keyHex); const A16 = keyAddress(16);
if (pk16.toKeypair().toAddress(NET).toString() !== A16) { phase("LANE_REFUSED reason=key16-mismatch"); process.exit(3); }
const rd = (f, d) => { try { return fs.readFileSync(P("control", f), "utf8").trim(); } catch { return d; } };
const rpc = await connect(CFG.main_node_url, 4);
const si = await to(rpc.getServerInfo(), 8000); if (si.networkId !== "testnet-10" || !si.isSynced) { phase("LANE_REFUSED reason=node"); process.exit(2); }
const bag = ((await to(rpc.getUtxosByAddresses({ addresses: [A16] }), 120000)).entries || []).filter((e) => !e.isCoinbase && BigInt(e.amount) >= 1_000_000_000n && BigInt(e.amount) < 10_000_000_000_000n).sort((a, b) => (BigInt(a.amount) > BigInt(b.amount) ? -1 : 1));
const pileStart = bag.reduce((s, e) => s + Number(e.amount), 0);
const SPK = bag[0]?.scriptPublicKey;
let next = 0; const takeCoin = () => (next < bag.length ? bag[next++] : null);
const entryOf = (e) => ({ address: A16, outpoint: { transactionId: String(e.outpoint.transactionId), index: Number(e.outpoint.index) }, amount: BigInt(e.amount), scriptPublicKey: e.scriptPublicKey || SPK, blockDaaScore: BigInt(e.blockDaaScore || 0), isCoinbase: false });
const chains = [];   // slot -> { coin, pending, pendingAt, hops, orphanSince }
const tot = { submits: 0, ok: 0, rej: 0, orphan_retry: 0, lost: 0, already: 0, retired: 0, fees: 0, parked: 0, coins_taken: 0 };
let min = { k: mkey(Date.now()), n: null, rate: null, submits: 0, ok: 0, rej: 0, orphan: 0, lost: 0 }; let nodeRate = { lo: null, hi: null, smOff: 0, seen: 0 };
let curReady = 0; let stopped = null, paused = false, held = false, over = 0, lastSampleTs = "", curPermin = PER_MIN;
const SUB = P("private", "heavy-submit.jsonl"), IDS = P("private", "heavytx.txt"), IDS2 = P("private", "heavytx-l2.txt"), LM = P("logs", "lane-minute.log");
// pre-run 17: lane 1 uses chain slots 0..99, lane 2 slots 100..199. Per lane: N, rate, submits, OK, fees, landed-by-us (left the mempool).
const L2BASE = 100; const laneOf = (i) => (i >= L2BASE ? 2 : 1);
const LT = { 1: { ok: 0, fees: 0, hops: 0 }, 2: { ok: 0, fees: 0, hops: 0 } };
let ml = { 1: { submits: 0, ok: 0, fees: 0 }, 2: { submits: 0, ok: 0, fees: 0 } };
const bucketL = { 1: PER_S, 2: PER_S };
function build(coin, rate) {
  const amt = BigInt(coin.amount); let fee = 300_000_00n; let tx = null, sm = 0, cm = 0;
  for (let i = 0; i < 3; i++) {
    const change = amt - SINK_SOMPI - fee; if (change < MIN_CHANGE) return null;
    tx = k.createTransaction([coin], [new k.PaymentOutput(new k.Address(SINK), SINK_SOMPI), new k.PaymentOutput(new k.Address(A16), change)], 0n, undefined, 1);
    sm = Number(k.calculateStorageMass(NET, [Number(amt)], [Number(SINK_SOMPI), Number(change)])); cm = massOf(tx);
    const f2 = BigInt(Math.max(sm, cm)) * BigInt(rate); if (f2 === fee) break; fee = f2;
  }
  const change = amt - SINK_SOMPI - fee; if (change < MIN_CHANGE) return null;
  tx = k.createTransaction([coin], [new k.PaymentOutput(new k.Address(SINK), SINK_SOMPI), new k.PaymentOutput(new k.Address(A16), change)], 0n, undefined, 1);
  if (Math.max(sm, cm) > 500000) return null;
  return { tx, fee, change, sm, cm };
}
function flushMinute(nowK, N, RATE, pendingN, N2, RATE2) {
  if (nowK === min.k) return;
  fs.appendFileSync(LM, `${min.k}Z n=${min.n ?? N} rate=${min.rate ?? RATE} n2=${min.n2 ?? N2} rate2=${min.rate2 ?? RATE2} ok1=${ml[1].ok} ok2=${ml[2].ok} fees1_tkas=${(LT[1].fees / 1e8).toFixed(2)} fees2_tkas=${(LT[2].fees / 1e8).toFixed(2)} submits=${min.submits} ok=${min.ok} rej=${min.rej} orphan_retry=${min.orphan} lost=${min.lost} paused=${paused ? 1 : 0} held=${held ? 1 : 0} stopped=${stopped || "-"} pending=${pendingN} fees_tkas=${(tot.fees / 1e8).toFixed(2)} moved_tkas=${((tot.fees + tot.parked) / 1e8).toFixed(2)} node_rate=${nodeRate.lo ?? "-"}..${nodeRate.hi ?? "-"} node_seen=${nodeRate.seen} sm_off=${nodeRate.smOff} permin=${curPermin} ready_cap=${curReady}\n`);
  min = { k: nowK, n: N, rate: RATE, n2: N2, rate2: RATE2, submits: 0, ok: 0, rej: 0, orphan: 0, lost: 0 }; nodeRate = { lo: null, hi: null, smOff: 0, seen: 0 }; ml = { 1: { submits: 0, ok: 0, fees: 0 }, 2: { submits: 0, ok: 0, fees: 0 } };
}
function probeLast() {
  try { const f = P("logs", "mempool.jsonl"); const st = fs.statSync(f); const n = Math.min(st.size, 16384); const fd = fs.openSync(f, "r"); const b = Buffer.alloc(n); fs.readSync(fd, b, 0, n, st.size - n); fs.closeSync(fd);
    const ls = b.toString("utf8").trim().split("\n"); return JSON.parse(ls[ls.length - 1]); } catch { return null; }
}
phase(`LANE_START pile_coins=${bag.length} pile_tkas=${Math.round(pileStart / 1e8)} calib_sdk_storage=${calib.sdk_storage} calib_node_storage=${calib.node_storage} calib_rate=${calib.node_rate}`);
let bucket = PER_S, lastFill = Date.now(); let tick = 0;
while (!fs.existsSync(P("control", "STOP"))) {
  const t0 = Date.now();
  const N = Math.max(0, Math.min(100, Number(rd("LANE-N", "0")) || 0)); const RATE = Math.min(2000, Math.max(100, Math.round(Number(rd("LANE-RATE", "100")) || 100)));   // pre-run 17: lane 1 (slots 0..99)
  const READY = Math.max(0, Math.min(100, Number(rd("LANE-READY", "0")) || 0)); curReady = READY;   // pre-run 23: the ready cap (0 = none)
  const PERMIN = Math.max(1, Math.min(PER_MIN, Math.round(Number(rd("LANE-PERMIN", String(PER_MIN))) || PER_MIN))); curPermin = PERMIN;   // pre-run 21
  const capOv = Number(rd("LANE-CAP-FEES", "0")) || 0; const CAPF = capOv > 0 ? Math.min(CAP_FEES, capOv * 1e8) : CAP_FEES;   // pre-run 21: the runner may lower the fee cap (FROZEN_ARM)
  const N2 = Math.max(0, Math.min(100, Number(rd("LANE2-N", "0")) || 0)); const RATE2 = Math.min(2000, Math.max(100, Math.round(Number(rd("LANE2-RATE", "100")) || 100)));   // pre-run 17: lane 2 (slots 100..199)
  tick++;
  // our entries in the desk mempool (one call)
  let inMp = null;
  try {
    const r = await to(rpc.getMempoolEntriesByAddresses({ addresses: [A16], includeOrphanPool: false, filterTransactionPool: false }), 20000);
    inMp = new Map();
    for (const a of r.entries || []) for (const e of [...(a.sending || []), ...(a.receiving || [])]) { const t = e.transaction; inMp.set(String(t.verboseData.transactionId), { fee: Number(e.fee), sm: Number(t.storageMass) || Number(t.mass) || 0, cm: Number(t.verboseData?.computeMass) || 0 }); }
  } catch (e) { inMp = null; }
  const pendingN = chains.filter((c) => c && c.pending).length;
  flushMinute(mkey(t0), N, RATE, pendingN, N2, RATE2);
  if (inMp) {
    for (const c of chains) {
      if (!c || !c.pending) continue;
      const m = inMp.get(c.pending.txid);
      if (m && m.sm > 0) { const rate = m.fee / Math.max(1, m.sm, m.cm); const r1 = Math.round(rate * 100) / 100; nodeRate.lo = nodeRate.lo == null ? r1 : Math.min(nodeRate.lo, r1); nodeRate.hi = nodeRate.hi == null ? r1 : Math.max(nodeRate.hi, r1); nodeRate.seen++;
        const off = Math.abs(m.sm - c.pending.sm) / Math.max(1, c.pending.sm); if (off > 0.01) nodeRate.smOff++;
        if (!stopped && (off > 0.01 || rate < 0.99 * c.pending.rate || rate > 1.01 * c.pending.rate)) { stopped = "calib-drift"; phase(`LANE_STOP reason=calib-drift node_rate=${r1} step_rate=${c.pending.rate} sm_off=${off.toFixed(4)}`); } }
      else if (!m && t0 - c.pendingAt > 1500) { c.coin = c.pending.child; c.pending = null; c.hops++; LT[c.lane].hops++; }
    }
  }
  // guards from the probe's last sample
  const s = probeLast();
  if (s && s.ts !== lastSampleTs) {
    lastSampleTs = s.ts;
    const ours = s.cls?.heavy?.n;
    const oursX = Number.isFinite(ours) ? ours : s.cls_light?.heavy?.n;   // pre-run 17: the probe's address read when its full read is off
    if (Number.isFinite(oursX)) { const ours = oursX; if (ours > N + N2 + 2) over++; else over = 0; if (!paused && over >= 3) { paused = true; phase(`LANE_PAUSE ours=${ours} n=${N}`); } else if (paused && ours <= N + N2) { paused = false; over = 0; phase(`LANE_RESUME ours=${ours} n=${N}`); } }
    const h = Number(s.size) >= MEMPOOL_HOLD || Number(s.ready_blocks) > READY_HOLD;
    if (h && !held) { held = true; phase(`LANE_HOLD mempool=${s.size} ready_blocks=${s.ready_blocks ?? "-"}`); } else if (!h && held) { held = false; phase(`LANE_HOLD_CLEAR mempool=${s.size} ready_blocks=${s.ready_blocks ?? "-"}`); }
  }
  if (!stopped && (tot.fees >= CAPF || tot.fees + tot.parked >= CAP_MOVED || pileStart - tot.fees - tot.parked < PILE_FLOOR)) { stopped = "cap"; phase(`LANE_CAP cap_fees_tkas=${(CAPF / 1e8).toFixed(0)} fees_tkas=${(tot.fees / 1e8).toFixed(2)} moved_tkas=${((tot.fees + tot.parked) / 1e8).toFixed(2)}`); }
  const now = Date.now(); const PS = Math.min(PER_S, PERMIN / 60), BMAX = PERMIN < PER_MIN ? 2 * PS + 1 : PER_S; for (const L of [1, 2]) bucketL[L] = Math.min(BMAX, bucketL[L] + ((now - lastFill) / 1000) * PS);   // pre-run 21: under a submit cap, paced evenly (the bucket holds up to two seconds plus one token so the fraction and slow ticks carry over; rehearsal p21-a without it paced 177-180 a minute for a cap of 230) lastFill = now;
  if (!stopped && !paused && !held && inMp) {
    const jobs = [];
    // pre-run 17: both lanes each tick; which lane goes first alternates tick by tick (so neither always submits first)
    const slots = []; const s1 = Array.from({ length: N }, (_, i) => i), s2 = Array.from({ length: N2 }, (_, i) => L2BASE + i);
    for (let q = 0; q < Math.max(N, N2); q++) { const a = s1[q], b = s2[q]; if (tick % 2) { if (b != null) slots.push(b); if (a != null) slots.push(a); } else { if (a != null) slots.push(a); if (b != null) slots.push(b); } }
    // pre-run 23: under a ready cap, the free chain unused longest goes first (so N=30 with R=8 really uses 30 chains), and
    // no more than R chains hold a transaction in the mempool at once
    if (READY > 0) slots.sort((x, y) => ((chains[x]?.lastAt || 0) - (chains[y]?.lastAt || 0)) || (x - y));
    let pendNow = chains.filter((c) => c && c.pending).length;
    for (const i of slots) {
      if (READY > 0 && pendNow >= READY) break;
      const LN = laneOf(i), RT = LN === 2 ? RATE2 : RATE;
      if (bucketL[LN] < 1 || ml[LN].submits >= PERMIN) continue;
      let c = chains[i]; if (!c) { const coin = takeCoin(); if (!coin) { stopped = "pile-empty"; phase("LANE_STOP reason=pile-empty"); break; } tot.coins_taken++; c = chains[i] = { coin: entryOf(coin), pending: null, pendingAt: 0, hops: 0, orphanSince: 0, lane: LN }; }
      if (c.pending) continue;
      if (BigInt(c.coin.amount) < RETIRE) { const coin = takeCoin(); if (!coin) { stopped = "pile-empty"; phase("LANE_STOP reason=pile-empty"); break; } tot.retired++; tot.coins_taken++; c.coin = entryOf(coin); c.orphanSince = 0; }
      const b = build(c.coin, RT); if (!b) { tot.retired++; const coin = takeCoin(); if (!coin) break; tot.coins_taken++; c.coin = entryOf(coin); continue; }
      let signed; try { signed = k.signTransaction(b.tx, [pk16], true); } catch (e) { stopped = "sign"; phase("LANE_STOP reason=sign"); break; }
      const txid = String(b.tx.id); fs.appendFileSync(IDS, txid + "\n"); if (LN === 2) fs.appendFileSync(IDS2, txid + "\n");
      bucketL[LN] -= 1; pendNow++; c.lastAt = Date.now(); ml[LN].submits++; min.submits++; tot.submits++; c.pending = { txid, sm: b.sm, rate: RT, inflight: 1 }; jobs.push({ i, c, b, txid, signed, LN, RT });
    }
    // submit this tick's transactions together (one answer each), then read the answers in slot order
    const res = await Promise.allSettled(jobs.map((j) => to(rpc.submitTransaction({ transaction: j.signed, allowOrphan: false }), 15000, "submit")));
    for (let q = 0; q < jobs.length; q++) {
      const { i, c, b, txid, LN, RT } = jobs[q]; const r = res[q];
      if (r.status === "fulfilled") {
        min.ok++; tot.ok++; tot.fees += Number(b.fee); tot.parked += Number(SINK_SOMPI); c.orphanSince = 0; ml[LN].ok++; LT[LN].ok++; LT[LN].fees += Number(b.fee);
        c.pending = { txid, sm: b.sm, rate: RT, child: { ...c.coin, outpoint: { transactionId: txid, index: 1 }, amount: b.change, blockDaaScore: 0n } }; c.pendingAt = Date.now();
        fs.appendFileSync(SUB, JSON.stringify({ ts: isoZ(), lane: LN, slot: i, txid, rate: RT, fee: String(b.fee), sm: b.sm, cm: b.cm, result: "ok" }) + "\n");
      } else {
        c.pending = null; const e = r.reason; const why = reason(e); fs.appendFileSync(SUB, JSON.stringify({ ts: isoZ(), lane: LN, slot: i, txid, rate: RT, fee: String(b.fee), sm: b.sm, cm: b.cm, result: "rej", reason: why }) + "\n");
        if (why === "orphan") { min.orphan++; tot.orphan_retry++; if (!c.orphanSince) c.orphanSince = Date.now(); else if (Date.now() - c.orphanSince > 30000) { min.lost++; tot.lost++; phase(`LANE_CHAIN_LOST slot=${i}`); const coin = takeCoin(); if (coin) { tot.coins_taken++; c.coin = entryOf(coin); } c.orphanSince = 0; } }
        else if (why === "already_spent") { tot.already++; phase(`LANE_CHAIN_RESET slot=${i} reason=already_spent`); const coin = takeCoin(); if (coin) { tot.coins_taken++; c.coin = entryOf(coin); } }
        else if (why === "rpc") { min.rej++; tot.rej++; }
        else if (!stopped) { min.rej++; tot.rej++; stopped = "reject:" + why; phase(`LANE_STOP reason=reject:${why} msg=${String(e?.message || e).replace(/[0-9a-f]{64}/gi, "<h>").replace(/kaspatest:[a-z0-9]+/g, "<addr>").slice(0, 120)}`); }
        else { min.rej++; tot.rej++; }
      }
    }
  }
  fs.writeFileSync(P("private", "heavy-total.json"), JSON.stringify({ ...tot, lane1: { ok: LT[1].ok, fees_tkas: LT[1].fees / 1e8, hops: LT[1].hops }, lane2: { ok: LT[2].ok, fees_tkas: LT[2].fees / 1e8, hops: LT[2].hops }, fees_tkas: tot.fees / 1e8, parked_tkas: tot.parked / 1e8, pile_start_tkas: pileStart / 1e8, chains: chains.filter(Boolean).length, pending: chains.filter((c) => c && c.pending).length, stopped, ts: isoZ() }));
  const left = 1000 - (Date.now() - t0); if (left > 0) await sleep(left);
}
phase(`LANE_END lane1_ok=${LT[1].ok} lane1_fees_tkas=${(LT[1].fees / 1e8).toFixed(2)} lane2_ok=${LT[2].ok} lane2_fees_tkas=${(LT[2].fees / 1e8).toFixed(2)} submits=${tot.submits} ok=${tot.ok} rej=${tot.rej} lost=${tot.lost} fees_tkas=${(tot.fees / 1e8).toFixed(2)} parked_tkas=${(tot.parked / 1e8).toFixed(2)} coins_taken=${tot.coins_taken} pending=${chains.filter((c) => c && c.pending).length}`);
try { await rpc.disconnect(); } catch {}
process.exit(0);
