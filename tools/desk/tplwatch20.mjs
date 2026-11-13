// tplwatch20.mjs (pre-run 20, new). TESTNET-10 ONLY. Read-only: submits nothing, signs nothing. Every --every-s seconds (default 3)
// it asks the desk's private node for a block template (never submitted) and for the light fee estimate (verbose), and writes
// one JSON line to logs/template-3s.jsonl: the template's transaction count, its mass (the largest of storage and compute mass,
// the selector's mass), how many transactions over 200,000 mass it holds (our lane's are about 266,700), the mass of the rest,
// and the node's ready count, ready mass and next-template fee rate floor. Counts only; no id, address or host. Stops on
// control/PROBE-STOP (the probe's stop file) or control/TPL-STOP. Started by the desk runner after the probe (pre-run 20 (xxiii)).
import fs from "node:fs"; import path from "node:path";
const KIT = process.env.STORM_PROBE_KIT || process.env.STORM_KIT; const U = (f) => "file:///" + path.join(KIT, f).replace(/\\/g, "/");
const { CFG, P, to, connect, sleep } = await import(U("lib.mjs")); const { keyAddress } = await import(U("covenant.mjs"));
const arg = (n, d) => { const i = process.argv.indexOf("--" + n); return i > 0 ? process.argv[i + 1] : d; };
const EVERY = Number(arg("every-s", process.env.STORM_TPL_EVERY_S || 3)) * 1000;
const OUT = P("logs", "template-3s.jsonl"), STOPS = [P("control", "PROBE-STOP"), P("control", "TPL-STOP")];
const isoZ = (ms = Date.now()) => new Date(ms).toISOString().replace(/\.\d+Z$/, "Z");
let rpc = null; const PAY = keyAddress(16);
fs.appendFileSync(P("logs", "probe.log"), `${isoZ()} TPLWATCH_START every_s=${EVERY / 1000}\n`);
while (!STOPS.some((f) => fs.existsSync(f))) {
  const t0 = Date.now(); const row = { ts: isoZ(t0) };
  try {
    if (!rpc) rpc = await connect(CFG.main_node_url, 3);
    const bt = await to(rpc.getBlockTemplate({ payAddress: PAY, extraData: "" }), 15000);
    const txs = (bt.block?.transactions || []).slice(1); let mass = 0, heavy = 0, heavyMass = 0;
    for (const t of txs) { const m = Math.max(Number(t.storageMass) || 0, Number(t.mass) || 0); mass += m; if (m > 200000) { heavy++; heavyMass += m; } }
    Object.assign(row, { n: txs.length, mass, heavy, rest_n: txs.length - heavy, rest_mass: mass - heavyMass });
    try { const v = (await to(rpc.getFeeEstimateExperimental({ verbose: true }), 8000)).verbose || {};
      Object.assign(row, { ready_n: Number(v.mempoolReadyTransactionsCount), ready_mass: Number(v.mempoolReadyTransactionsTotalMass), tpl_fr_min: v.nextBlockTemplateFeerateMin == null ? null : Math.round(Number(v.nextBlockTemplateFeerateMin) * 100) / 100 }); } catch {}
  } catch (e) { row.err = String(e?.message || e).replace(/wss?:\/\/\S+/g, "<url>").slice(0, 60); try { await rpc?.disconnect(); } catch {} rpc = null; }
  row.ms = Date.now() - t0; fs.appendFileSync(OUT, JSON.stringify(row) + "\n");
  const left = EVERY - (Date.now() - t0); if (left > 0) await sleep(left);
}
fs.appendFileSync(P("logs", "probe.log"), `${isoZ()} TPLWATCH_STOP\n`);
try { await rpc?.disconnect(); } catch {}
process.exit(0);
