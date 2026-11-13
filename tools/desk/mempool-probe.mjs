// PRE-RUN 24: also classifies the KCC-20 mint line (private/submit-mint.jsonl) as cohort kcc.
// PRE-RUN 17 probe changes. Pre-run 16's full mempool read (getMempoolEntries) failed from about 13,000 entries with
// "WebSocket disconnected": one reply measured 96,731,110 bytes for 9,050 entries (about 10.7 KB each, Borsh), and the node's
// wRPC server caps a message at 128 MiB (rusty-kaspa v2.1.0 rpc/wrpc/server/src/service.rs, MAX_WRPC_MESSAGE_SIZE), so
// about 12,500 entries is the most one reply can carry. So: (1) every sample now also takes the node's own ready count and
// ready mass from getFeeEstimateExperimental({verbose: true}) (a few ms; it matched the full read: 78 / 13,711,902 against
// 78 / 13,711,186), kept as row.lt; (2) the full read is taken only up to 10,000 entries (STORM_PROBE_ENTRIES_MAX), and a
// failed full read no longer skips the template read; (3) when there is no full read, ready_n / ready_mass / ready_blocks come
// from the light read (row.ready_src = "light") and our lanes' own mempool count from getMempoolEntriesByAddresses on the
// lane's key (row.cls_light.heavy.n). Per-class counts and the outside fee histogram need the full read and stay blank above it.
// Pre-run 14 probe: pre-run 13's, plus per class the fee sum and the lowest and highest fee / node mass of its entries
// (cls.<c>.fee, fr_lo, fr_hi), so the step files can show each tier's node rate in the mempool. Pre-run 13 header follows.
// Pre-run 13 probe: pre-run 12's, plus a class 'heavy' = our own heavy-lane transactions (ids in private/heavytx.txt, written by
// heavy-lane.mjs), so our heavy and the outside heavy are recorded apart; other_fr stays outside-only. Pre-run 12 header follows.
// Pre-run 12 mempool and template probe (pre-run 11's, plus a heavy count, mass over 200,000, per outside fee bucket). TESTNET-10 ONLY. Read-only: it submits nothing, signs nothing, and writes no id,
// address, host or key to any file. One process, started detached by the desk runner (or by hand before the open with
// --out mempool-preopen.jsonl), on the desk's private TN10 node, every SAMPLE_S seconds:
//   - getInfo (mempool size) and getFeeEstimate on the desk node and on each kept public kaspad (wss urls only);
//   - getMempoolEntries on the desk node (skipped, and marked, when the mempool is over ENTRIES_MAX): every entry is sorted
//     into our payments (ids the payment senders logged, 52-bit prefix), our hops by cohort (ids on the family sender's
//     submit rows), or other; per class: count, mass (the larger of compute and storage mass, as the v2.1.0 selector
//     normalises it), how many are ready (no parent in the mempool: the only ones the
//     v2.1.0 selector can pick), and a fee-rate histogram for the other traffic (fee / mass, the mass the node reports);
//   - getBlockTemplate on the desk node (never submitted): the transactions the desk node's own selector would put in a
//     block now, by the same classes, their storage mass (the mass field a block transaction commits to), and how many
//     carry over 100,000 storage mass.
// The probe never reads a fee estimate to set a fee. No sender reads this file.
// Files (run folder): logs/<out> one JSON line per sample (counts only), logs/<log>. Stop: control/<stop> (PROBE-STOP).
// Env: STORM_CONFIG (run config), STORM_PROBE_KIT (the real kit; default STORM_KIT). Args: --out <file> --log <file> --stop <file> --sample-s <n>
import fs from "node:fs";
import path from "node:path";
const KIT = process.env.STORM_PROBE_KIT || process.env.STORM_KIT;
const U = (f) => "file:///" + path.join(KIT, f).replace(/\\/g, "/");
const { CFG, P, connect, to } = await import(U("lib.mjs"));
const { cohortOfFamily, COHORTS } = await import(U("family-fees.mjs"));
const { keyAddress } = await import(U("covenant.mjs"));
const argv = process.argv.slice(2);
const arg = (n, d) => { const i = argv.indexOf("--" + n); return i >= 0 && i + 1 < argv.length ? argv[i + 1] : d; };
const OUT = P("logs", arg("out", "mempool.jsonl"));
const SAMPLE_S = Number(arg("sample-s", process.env.STORM_PROBE_SAMPLE_S || 20));
const ENTRIES_MAX = Number(process.env.STORM_PROBE_ENTRIES_MAX || 10000);   // pre-run 17: 10,000 (was 40,000); see the header
const BLOCK_MASS = 500000;
const STOP = P("control", arg("stop", "PROBE-STOP"));
const isoZ = (ms = Date.now()) => new Date(ms).toISOString().replace(/\.\d+Z$/, "Z");
const LOG = P("logs", arg("log", "probe.log"));
const log = (s) => fs.appendFileSync(LOG, isoZ() + " " + String(s).replace(/wss?:\/\/\S+/g, "<url>").replace(/\b[0-9a-f]{64}\b/gi, "<h>").replace(/kaspatest:[a-z0-9]+/g, "<addr>").slice(0, 300) + "\n");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const pre = (hex) => parseInt(String(hex).replace(/^0x/, "").toLowerCase().slice(0, 13), 16);
// fee-rate buckets, sompi per gram (fee / mass). Pre-run 17: fixed tiers 100, 150, 300 and 450; our two lanes move between 100 and 2,000 (the duel).
const BUCKETS = [["lt2", 0, 1.5], ["2-99", 1.5, 99.5], ["100", 99.5, 100.5], ["101-149", 100.5, 149.5], ["150", 149.5, 150.5], ["151-199", 150.5, 199.5], ["200", 199.5, 200.5], ["201-299", 200.5, 299.5], ["300", 299.5, 300.5], ["301-449", 300.5, 449.5], ["450", 449.5, 450.5], ["451-999", 450.5, 999.5], ["1000-1999", 999.5, 1999.5], ["2000", 1999.5, 2000.5], ["gt2000", 2000.5, Infinity]];
const bucketOf = (fr) => (BUCKETS.find(([, a, b]) => fr >= a && fr < b) || ["?"])[0];

// ---- our ids (tail the run's files, like the counter) ----
const payIds = new Set(); const hvIds = new Set(); const famCoh = new Map(); const offs = new Map();
function tail(file, onLine) {
  if (!fs.existsSync(file)) return;
  const st = fs.statSync(file); const off = offs.get(file) || 0; if (st.size <= off) return;
  const fd = fs.openSync(file, "r"); const buf = Buffer.alloc(st.size - off); fs.readSync(fd, buf, 0, buf.length, off); fs.closeSync(fd);
  const text = buf.toString("utf8"); const cut = text.lastIndexOf("\n"); if (cut < 0) return;
  offs.set(file, off + Buffer.byteLength(text.slice(0, cut + 1)));
  for (const l of text.slice(0, cut).split("\n")) if (l) onLine(l);
}
function readOurs() {
  try { for (const f of fs.readdirSync(P("private"))) if (/^paytx-[\d.]+\.txt$/.test(f)) tail(P("private", f), (l) => { const v = pre(l.trim()); if (Number.isFinite(v)) payIds.add(v); }); } catch {}
  tail(P("private", "submit-fam.jsonl"), (l) => { try { const r = JSON.parse(l); if (r.result === "ok" && r.txid) famCoh.set(pre(r.txid), cohortOfFamily(r.family)); } catch {} });
  tail(P("private", "submit-mint.jsonl"), (l) => { try { const r = JSON.parse(l); if (r.result === "ok" && r.txid) famCoh.set(pre(r.txid), cohortOfFamily(r.family)); } catch {} });   // pre-run 24: mint line
  tail(P("private", "heavytx.txt"), (l) => { const v = pre(l.trim()); if (Number.isFinite(v)) hvIds.add(v); });
}
const classOf = (id) => { const v = pre(id); if (famCoh.has(v)) return famCoh.get(v); if (payIds.has(v)) return "pay"; if (hvIds.has(v)) return "heavy"; return "other"; };
const CLASSES = ["pay", "heavy", ...COHORTS, "other"];
const blank = () => Object.fromEntries(CLASSES.map((c) => [c, { n: 0, ready: 0, mass: 0, ready_mass: 0, fee: 0, fr_lo: null, fr_hi: null }]));

// ---- nodes ----
let desk = null; const pubs = new Map();
async function deskRpc() { if (!desk) desk = await connect(CFG.main_node_url, 3); return desk; }
function keptNodes() { try { return JSON.parse(fs.readFileSync(P("private", "nodes.json"), "utf8")).filter((x) => /^wss?:\/\//.test(String(x.url))); } catch { return []; } }
const feeOf = (fe) => { const e = fe?.estimate || fe; if (!e) return null; const r = (x) => (x == null ? null : Math.round(Number(x) * 100) / 100); return { priority: r(e.priorityBucket?.feerate), normal: r(e.normalBuckets?.[0]?.feerate), low: r(e.lowBuckets?.[0]?.feerate) }; };

async function sample() {
  const t0 = Date.now(); readOurs();
  const row = { ts: isoZ(t0) }; const byIn = new Map();   // first input outpoint -> class (template transactions carry no id)
  try {
    const c = await deskRpc();
    const inf = await to(c.getInfo(), 8000); row.size = Number(inf.mempoolSize); row.synced = inf.isSynced ? 1 : 0;
    try { row.fee = feeOf(await to(c.getFeeEstimate({}), 8000)); } catch { row.fee = null; }
    // pre-run 17: the light read, every sample: the node's own ready count and ready mass (getFeeEstimateExperimental verbose).
    try { const v = (await to(c.getFeeEstimateExperimental({ verbose: true }), 8000)).verbose || {};
      row.lt = { ready_n: Number(v.mempoolReadyTransactionsCount), ready_mass: Number(v.mempoolReadyTransactionsTotalMass), tpl_fr_min: v.nextBlockTemplateFeerateMin == null ? null : Math.round(Number(v.nextBlockTemplateFeerateMin) * 100) / 100, tpl_fr_med: v.nextBlockTemplateFeerateMedian == null ? null : Math.round(Number(v.nextBlockTemplateFeerateMedian) * 100) / 100 };
      row.lt.ready_blocks = Math.round((row.lt.ready_mass / BLOCK_MASS) * 100) / 100; } catch (e) { row.lt = null; row.lt_err = String(e?.message || e).slice(0, 60); }
    // pre-run 17: our lanes' own entries, by the lane's address (small; the lane guard reads cls.heavy.n)
    let laneN = null; try { const r = await to(c.getMempoolEntriesByAddresses({ addresses: [keyAddress(16)], includeOrphanPool: false, filterTransactionPool: false }), 15000); const s = new Set(); let rdy = 0; for (const a of r.entries || []) for (const e of [...(a.sending || []), ...(a.receiving || [])]) { const id = String(e.transaction.verboseData.transactionId); if (classOf(id) === "heavy" && !s.has(id)) s.add(id); } laneN = s.size; } catch {}
    let fullErr = null;
    if (row.size <= ENTRIES_MAX) { try {
      const tm = Date.now();
      const me = await to(c.getMempoolEntries({ includeOrphanPool: false, filterTransactionPool: false }), 60000);
      const ents = me.mempoolEntries || [];
      row.entries_ms = Date.now() - tm;
      const ids = new Set(ents.map((e) => String(e.transaction.verboseData.transactionId)));
      const cls = blank(); const hist = {};
      let mass = 0, readyMass = 0, readyN = 0, storageSum = 0, computeSum = 0, storageBound = 0;
      for (const e of ents) {
        const t = e.transaction; const id = String(t.verboseData.transactionId); const fee = Number(e.fee) || 0;
        // the selector's mass: the largest of compute and storage mass (v2.1.0 normalized_max; transient is not in the RPC)
        const cm = Number(t.verboseData?.computeMass) || 0, sm = Math.max(Number(t.storageMass) || 0, Number(t.mass) || 0); const m = Math.max(cm, sm);
        storageSum += sm; computeSum += cm; if (sm > cm) storageBound++;
        const ready = !t.inputs.some((i) => ids.has(String(i.previousOutpoint.transactionId)));
        const k = classOf(id); const x = cls[k]; const i0 = t.inputs[0]?.previousOutpoint; if (i0) byIn.set(String(i0.transactionId) + ":" + i0.index, k); x.n++; x.mass += m; x.fee += fee; { const fr = Math.round((fee / Math.max(1, m)) * 100) / 100; if (x.fr_lo === null || fr < x.fr_lo) x.fr_lo = fr; if (x.fr_hi === null || fr > x.fr_hi) x.fr_hi = fr; } if (ready) { x.ready++; x.ready_mass += m; }
        mass += m; if (ready) { readyN++; readyMass += m; }
        if (k === "other") { const b = bucketOf(fee / Math.max(1, m)); const h = (hist[b] ||= { n: 0, ready: 0, mass: 0, ready_mass: 0, heavy: 0, heavy_ready: 0 }); h.n++; h.mass += m; if (ready) { h.ready++; h.ready_mass += m; } if (m > 200000) { h.heavy++; if (ready) h.heavy_ready++; } }
      }
      Object.assign(row, { n: ents.length, mass, storage_mass: storageSum, compute_mass: computeSum, storage_bound_n: storageBound, ready_n: readyN, ready_mass: readyMass, ready_blocks: Math.round((readyMass / BLOCK_MASS) * 100) / 100, cls, other_fr: hist });
    } catch (e) { fullErr = String(e?.message || e).replace(/wss?:\/\/\S+/g, "<url>").slice(0, 80); row.entries_err = fullErr; desk = null; } } else row.entries_skipped = 1;
    // pre-run 17: without a full read, ready figures come from the light read and our heavy count from the address read
    if (row.n == null) { if (row.lt) Object.assign(row, { ready_n: row.lt.ready_n, ready_mass: row.lt.ready_mass, ready_blocks: row.lt.ready_blocks, ready_src: "light" }); if (laneN != null) row.cls_light = { heavy: { n: laneN } }; }
    if (fullErr) { try { await deskRpc(); } catch {} }
    try { const c = await deskRpc();
      const bt = await to(c.getBlockTemplate({ payAddress: keyAddress(16), extraData: "" }), 20000);
      const txs = (bt.block?.transactions || []).slice(1);
      const tc = Object.fromEntries(CLASSES.map((k) => [k, 0])); let tmass = 0, theavy = 0;
      for (const t of txs) { const id = String(t.verboseData?.transactionId || ""); const sm = Math.max(Number(t.storageMass) || 0, Number(t.mass) || 0); tmass += sm; if (sm > 100000) theavy++; const i0 = t.inputs?.[0]?.previousOutpoint; const k = id ? classOf(id) : i0 && byIn.get(String(i0.transactionId) + ":" + i0.index); if (k) tc[k]++; else tc.unmatched = (tc.unmatched || 0) + 1; }
      row.tpl = { n: txs.length, mass: tmass, heavy: theavy, cls: tc, ids_known: txs.every((t) => t.verboseData?.transactionId) ? 1 : 0 };
    } catch (e) { row.tpl = null; row.tpl_err = String(e?.message || e).slice(0, 60); }
  } catch (e) { desk = null; row.err = String(e?.message || e).replace(/wss?:\/\/\S+/g, "<url>").slice(0, 80); }
  row.pub = {};
  for (const x of keptNodes()) {
    try { if (!pubs.has(x.url)) pubs.set(x.url, await connect(x.url, 2)); const c = pubs.get(x.url); const inf = await to(c.getInfo(), 8000); let fee = null; try { fee = feeOf(await to(c.getFeeEstimate({}), 8000)); } catch {} row.pub[x.n] = { size: Number(inf.mempoolSize), fee }; }
    catch { pubs.delete(x.url); row.pub[x.n] = { err: 1 }; }
  }
  row.ms = Date.now() - t0;
  fs.appendFileSync(OUT, JSON.stringify(row) + "\n");
  return row;
}
log(`PROBE_START out=${path.basename(OUT)} sample_s=${SAMPLE_S} entries_max=${ENTRIES_MAX}`);
let n = 0;
while (!fs.existsSync(STOP)) {
  const t = Date.now();
  try { const r = await sample(); n++; if (n === 1 || n % 30 === 0) log(`PROBE n=${n} size=${r.size} ready_blocks=${r.ready_blocks} tpl=${r.tpl ? r.tpl.n : "-"} ms=${r.ms}`); } catch (e) { log("PROBE error " + (e?.message || e)); }
  const left = SAMPLE_S * 1000 - (Date.now() - t); if (left > 0) { const end = Date.now() + left; while (Date.now() < end && !fs.existsSync(STOP)) await sleep(500); }
}
log(`PROBE_STOP n=${n}`);
try { await desk?.disconnect(); } catch {}
for (const c of pubs.values()) try { await c.disconnect(); } catch {}
process.exit(0);
