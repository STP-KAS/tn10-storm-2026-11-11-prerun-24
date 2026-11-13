// mint24.mjs (kit25, pre-run 24): the KCC-20 mint line. TESTNET-10 ONLY. Never prints a key, address, txid or host.
// One fresh KCC-20 public-mint launch (family 5 in the bundle, launch path not used before). One mint at a time: build one
// mint (a hop of the public-mint covenant) at the family's node rate (family-fees.mjs, 100), submit it to the desk's
// private node, then WAIT until the node shows the next minter (the mint is accepted on the virtual chain) before the
// next one. Cap: 30 accepted mints (MINT_CAP), then it stops. A gap of MINT_GAP_MS (15 s) after each accept spreads the
// 30 mints over the families' steps. A reject is logged with the node's text and is not raised in fee.
// Funding coins come from their own key (CFG.mint_key, default 7), so the family sender's pool on key 0 is never shared.
// Rows go to private/submit-mint.jsonl (private), counts to logs/mint.log, phase tokens MINT_*.
import fs from "node:fs";
for (const k of ["error", "warn"]) { const o = console[k].bind(console); console[k] = (...a) => o(new Date().toISOString(), ...a); }
import { CFG, P, phase, iso, sleep, to, STOPF, reason, connect, readState } from "./lib.mjs";
import { startBuilder, buildHop, catchUp, step, Pool, keyAddress } from "./covenant.mjs";
const FAM = 5, KEY = Number(CFG.mint_key ?? 7), CAP = Number(process.env.MINT_CAP || 30), GAP = Number(process.env.MINT_GAP_MS || 15000);
const ACCEPT_MS = Number(process.env.MINT_ACCEPT_MS || 120000), MAX_TRIES = Number(process.env.MINT_MAX_TRIES || 90);
const LOG = fs.createWriteStream(P("private", "submit-mint.jsonl"), { flags: "a" });
const mlog = (s) => { const l = iso() + " " + s; fs.appendFileSync(P("logs", "mint.log"), l + "\n"); console.log(l); };
const rpc = await connect(CFG.main_node_url, 3);
const B = startBuilder(P("private", "builder-mint.err"));
await B.ask("ping", 120000);
const pool = new Pool(rpc, keyAddress(KEY)); await pool.refresh();
phase(`MINT_START family=${FAM} cap=${CAP} gap_ms=${GAP} coins=${pool.coins.length} rate=100 node=desk`);
mlog(`MINT_START family=${FAM} cap=${CAP} coins=${pool.coins.length}`);
const usedCoins = new Set();
let accepted = 0, tries = 0, rej = 0, timeouts = 0, nonce = 1, feesSompi = 0n;
const stopNow = () => fs.existsSync(STOPF) || fs.existsSync(P("control", "MINT-STOP"));
while (accepted < CAP && tries < MAX_TRIES && !stopNow()) {
  let st = readState(FAM);
  if (!st || !st.covenantId) { await sleep(2000); continue; }
  try { st = await to(catchUp(rpc, B, st, 1000, Date.now() + 15000), 16000, "catchup"); } catch (e) { mlog(`MINT_CATCHUP_FAIL ${reason(e)}`); await sleep(3000); continue; }
  if (Date.now() - pool.at > 3000) await pool.refresh().catch(() => {});
  const coin = pool.coins.find((c) => !usedCoins.has(c.txid + ":" + c.index));
  if (!coin) { phase("MINT_NO_COIN"); mlog("MINT_NO_COIN"); await sleep(10000); continue; }
  tries++;
  let h;
  try { h = await buildHop(B, st, coin, KEY, nonce++, FAM); } catch (e) { mlog(`MINT_BUILD_FAIL ${reason(e)}`); LOG.write(JSON.stringify({ ts: iso(), family: FAM, result: "build_fail", reason: reason(e) }) + "\n"); await sleep(3000); continue; }
  const t0 = Date.now();
  try { await to(rpc.submitTransaction({ transaction: h.tx, allowOrphan: false }), 8000, "submit"); }
  catch (e) { rej++; const why = String(e?.message || e).replace(/[0-9a-f]{64}/gi, "<h>").slice(0, 300); LOG.write(JSON.stringify({ ts: iso(), family: FAM, txid: h.txid, result: "rejected", reason: why, fee: String(h.fee), node_rate: h.node_rate, node_mass: h.node_mass }) + "\n"); mlog(`MINT_REJECT try=${tries} reason=${why.replace(/\s+/g, "_").slice(0, 160)}`); usedCoins.add(coin.txid + ":" + coin.index); await sleep(3000); continue; }
  usedCoins.add(coin.txid + ":" + coin.index); feesSompi += BigInt(h.fee);
  LOG.write(JSON.stringify({ ts: iso(t0), family: FAM, txid: h.txid, result: "ok", fee: String(h.fee), rate: h.rate, node_rate: h.node_rate, node_mass: h.node_mass, seq: (st.seq || 0) + 1 }) + "\n");
  // wait for accept: the next minter is in the node's UTXO index (virtual chain), one mint in flight at a time
  let nx = null; const end = Date.now() + ACCEPT_MS;
  while (Date.now() < end && !stopNow()) { try { nx = await step(rpc, B, st); } catch {} if (nx && nx.txid === h.txid) break; nx = null; await sleep(500); }
  if (nx) { accepted++; const ms = Date.now() - t0; LOG.write(JSON.stringify({ ts: iso(), family: FAM, txid: h.txid, result: "accepted", accept_ms: ms }) + "\n"); mlog(`MINT_ACCEPTED n=${accepted} try=${tries} accept_ms=${ms} node_rate=${h.node_rate} node_mass=${h.node_mass}`); phase(`MINT_ACCEPTED n=${accepted} accept_ms=${ms}`); }
  else { timeouts++; LOG.write(JSON.stringify({ ts: iso(), family: FAM, txid: h.txid, result: "accept_timeout" }) + "\n"); mlog(`MINT_ACCEPT_TIMEOUT try=${tries}`); }
  if (accepted < CAP) await sleep(GAP);
}
const tot = { family: FAM, cap: CAP, accepted, tries, rejected: rej, accept_timeouts: timeouts, fees_tkas: Number(feesSompi) / 1e8, stopped: stopNow() ? "stop-file" : accepted >= CAP ? "cap" : "tries" };
fs.writeFileSync(P("private", "mint-total.json"), JSON.stringify(tot));
phase(`MINT_END accepted=${accepted} tries=${tries} rej=${rej} timeouts=${timeouts} fees_tkas=${tot.fees_tkas.toFixed(4)} why=${tot.stopped}`);
mlog(`MINT_END ${JSON.stringify(tot)}`);
try { await rpc.disconnect(); } catch {}
process.exit(0);
