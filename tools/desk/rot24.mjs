// rot24.mjs (pre-run 24, read-only): the issue #1146 rotation sample, small. Every 60 s it takes up to 40 of OUR OWN
// transactions that the desk node already showed as accepted (coordinator hops.jsonl accept_header_utc, at least 60 s
// before) and asks the same node whether each is still in its mempool (getMempoolEntry, one id at a time). No full dump.
// Pass for the sample: none of them is still listed. Writes logs/rotation.jsonl (counts only, no ids). TESTNET-10 ONLY.
import fs from "node:fs";
const { CFG, P, sleep, to, connect } = await import("file:///" + String(process.env.STORM_KIT).replace(/\\/g, "/") + "/lib.mjs");   // the run's kit (kit25; the rehearsal's fake kit offline)
const rpc = await connect(CFG.main_node_url, 3);
const OUT = P("logs", "rotation.jsonl"); const STOPF = P("control", "PROBE-STOP");
const seen = new Set();
for (;;) {
  if (fs.existsSync(STOPF)) break;
  const now = Date.now(); const cand = [];
  try { for (const l of fs.readFileSync(P("private", "hops.jsonl"), "utf8").split("\n")) { try { const r = JSON.parse(l); if (r.accept_header_utc && r.txid && now - Date.parse(r.accept_header_utc) >= 60000 && now - Date.parse(r.accept_header_utc) < 600000) cand.push(r); } catch {} } } catch {}
  const pick = cand.filter((r) => !seen.has(r.txid)).slice(-40);
  let still = 0, checked = 0, err = 0, size = null, byFam = {};
  try { size = Number((await to(rpc.getInfo(), 8000)).mempoolSize); } catch {}
  for (const r of pick) {
    checked++; seen.add(r.txid);
    try { const e = await to(rpc.getMempoolEntry({ transactionId: r.txid, includeOrphanPool: true, filterTransactionPool: false }), 5000); if (e && e.mempoolEntry) { still++; byFam[r.family] = (byFam[r.family] || 0) + 1; } }
    catch (e) { const m = String(e?.message || e); if (!/not found|NotFound|transaction.*not/i.test(m)) err++; }
  }
  fs.appendFileSync(OUT, JSON.stringify({ ts: new Date().toISOString(), mempool_size: size, accepted_checked: checked, still_in_mempool: still, still_by_family: byFam, read_errors: err }) + "\n");
  const wait = 60000 - (Date.now() - now); if (wait > 0) await sleep(wait);
}
try { await rpc.disconnect(); } catch {}
process.exit(0);
