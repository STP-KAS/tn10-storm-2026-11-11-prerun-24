// pre-run 23: the pre-run 22 copy, unchanged.
// pre-run 22: the pre-run 21 copy, unchanged.
// pre-run 21 copy (from pre-run 20).
// pre-run 20 copy (from pre-run 19).
// pre-run 19 copy (from pre-run 18).
// pre-run 18 copy (from pre-run 17) (fund18.mjs), kit24.
// pre-run 16: the lane-coin margin is 2,500 coins over 3 tKAS (the runner's own low-coin line; was 5,000), after split16.
// fund14 (pre-run 15: fund13 with kit21 imports and the record file fund18.jsonl; run with --pile 0) (pre-run 11, from fund10, private run folder, not in git): give keys 1..15 one fresh genesis coin each, and top the
// payment pile (key 16) up to --pile coins, from the family lane (key 0), one lane coin per transaction, 150 sompi per gram.
// TN10 only (refuses any other network). Refuses to leave the lane under the abort line with margin.
// Prints counts only. Writes each funding transaction (key number, amount, fee, txid) to private/fund18.jsonl, which stays
// on this desk and is never committed. Does not print a balance, a key, an address, or a host.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";
import { CFG, to, connect, massOf } from "../kit24/lib.mjs";
import { keyAddress } from "../kit24/covenant.mjs";
const require = createRequire(import.meta.url);
const k = require(CFG.kaspa_sdk);
const HERE = path.dirname(fileURLToPath(import.meta.url));
const REC = path.join(HERE, "private", "fund18.jsonl");
const arg = (n, d) => { const i = process.argv.indexOf("--" + n); return i > 0 ? process.argv[i + 1] : d; };
const PILE = Number(arg("pile", "8400")), DRY = process.argv.includes("--dry");
const lines = fs.readFileSync(CFG.keys_file, "utf8").trim().split(/\r?\n/).map((s) => s.trim()).filter(Boolean);
const pk0 = new k.PrivateKey(lines[0]);
const rpc = await connect(CFG.main_node_url, 3);
const si = await to(rpc.getServerInfo(), 8000); if (si.networkId !== "testnet-10" || !si.isSynced) { console.log("NOT_SYNCED_OR_NOT_TN10"); process.exit(2); }
const bag = (await to(rpc.getUtxosByAddresses({ addresses: [keyAddress(0)] }), 90000)).entries || [];
const lane = bag.filter((e) => !e.isCoinbase && BigInt(e.amount) > 300_000_000n);
const usable = Math.round(lane.reduce((s, e) => s + Number(e.amount) - 3e8, 0) / 1e8);
const pileCoins = bag.filter((e) => !e.isCoinbase && BigInt(e.amount) >= 1_600_000_000n && BigInt(e.amount) <= 5_000_000_000n).sort((a, b) => (BigInt(a.amount) < BigInt(b.amount) ? -1 : 1));
const famCoins = bag.filter((e) => !e.isCoinbase && BigInt(e.amount) >= 1_600_000_000n &&   // pre-run 15: 16 tKAS, so the coin after the fee stays over 15
   BigInt(e.amount) < 10_000_000_000_000n).sort((a, b) => (BigInt(a.amount) < BigInt(b.amount) ? -1 : 1));
const has = async (key, min) => ((await to(rpc.getUtxosByAddresses({ addresses: [keyAddress(key)] }), 60000)).entries || []).filter((e) => !e.isCoinbase && BigInt(e.amount) >= min && BigInt(e.amount) < 10_000_000_000_000n);
const needFam = []; for (let key = 1; key <= 15; key++) if (!(await has(key, 1_500_000_000n)).length) needFam.push(key);
const pileNow = (await has(16, 1_000_000_001n)).length;
const addPile = Math.max(0, PILE - pileNow);
const spend = needFam.length + addPile;
const after = { coins: lane.length - spend, tkas_floor: usable - spend * 50 };
console.log(JSON.stringify({ lane_coins: lane.length, lane_usable_tkas: usable, lane_above_abort: lane.length >= 2500 && usable >= 18000, keys_needing_genesis_coin: needFam, pile_now: pileNow, pile_add: addPile, pile_source_coins: pileCoins.length, lane_after_coins: after.coins, lane_after_above_abort_margin: after.coins >= 2500 && after.tkas_floor >= 36000 }));
if (after.coins < 2500 || after.tkas_floor < 36000 || pileCoins.length < addPile) { console.log("HELD lane-margin"); process.exit(3); }
if (DRY) process.exit(0);
const usedOps = new Set();
async function move(coin, key) {
  usedOps.add(coin.outpoint.transactionId + ":" + coin.outpoint.index);
  const dest = keyAddress(key);
  const draft = k.createTransaction([coin], [new k.PaymentOutput(new k.Address(dest), BigInt(coin.amount) - 1_000_000n)], 0n, undefined, 1);
  const fee = BigInt(massOf(draft)) * 150n;
  const tx = k.createTransaction([coin], [new k.PaymentOutput(new k.Address(dest), BigInt(coin.amount) - fee)], 0n, undefined, 1);
  const signed = k.signTransaction(tx, [pk0], true);
  const r = await to(rpc.submitTransaction({ transaction: signed, allowOrphan: false }), 15000, "submit");
  fs.appendFileSync(REC, JSON.stringify({ ts: new Date().toISOString(), key, amount_sompi: String(BigInt(coin.amount) - fee), fee_sompi: String(fee), txid: String(r?.transactionId || "") }) + "\n");
}
let fam = 0, pay = 0, rej = 0;
for (const key of needFam) { const c = famCoins.find((e) => !usedOps.has(e.outpoint.transactionId + ":" + e.outpoint.index)); try { await move(c, key); fam++; } catch { rej++; } }
const pick = pileCoins.filter((e) => !usedOps.has(e.outpoint.transactionId + ":" + e.outpoint.index)).slice(0, addPile);
for (let i = 0; i < pick.length; i += 200) {
  const r = await Promise.allSettled(pick.slice(i, i + 200).map((c) => move(c, 16)));
  pay += r.filter((x) => x.status === "fulfilled").length; rej += r.filter((x) => x.status === "rejected").length;
  await new Promise((z) => setTimeout(z, 300));
}
console.log(JSON.stringify({ fund_families: fam, pile_added: pay, rejected: rej }));
try { await rpc.disconnect(); } catch {}
process.exit(0);
