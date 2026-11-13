// PRE-RUN 24 TIERS (kit25 = kit24 with this table): floor 1-4 at 100 (node rate, the ordinary floor of pre-runs 14-23) and
// kcc 5 at 100: one fresh KCC-20 launch minted one at a time (mint24.mjs). FAMILY_COUNT replaces the fixed 16.
// PRE-RUN 17 TIERS (kit24 = kit23 with this table): four fixed tiers, four families each, node rates: floor 1-4 100,
// r150 5-8 150, r300 9-12 300, r450 13-16 450. They are the bystanders: the duel is between our two heavy lanes. liveRate()
// stays (it returns the table rate for every family; there is no esc tier).
// PRE-RUN 16 TIERS (kit23 = kit22 with this table and live esc rates): floor 1-4 fixed 100, r300 5-7 fixed 300, esc 8-16
// escalating (start 150; the duel controller moves it, floor 100, cap 2,000). Node rates (fee / node mass) as in pre-runs 14-15.
import fs from "node:fs";
import path from "node:path";
// PRE-RUN 15 TIERS (node rates, kit22 = kit21 with this table): floor 1-4 100, r150 5-7, r200 8-10, r300 11-13, r450 14-16.
// Against our lane at 126 the (rate/126)^3 weights are 0.50 / 1.68 / 3.98 / 13.4 / 45.6; against 150: 0.30 / 1.00 / 2.37 / 8.00 / 27.0.
// Pre-run 14 header (its table is replaced) follows.
// family-fees.mjs: pre-run 14's hop rate per family, as the NODE rates it. Five tiers, every family on the desk's private
// node, no payments of ours. Pre-runs 9-13 priced a hop on the builder's mass (13,046, compute/transient) while the node rated
// it on its storage mass (about 40,400-43,800 with UTXO plurality), so a "100" hop sat at about 32 on the node. In pre-run 14
// kit21's buildHop prices each hop on its node-side mass (rusty-kaspa v2.1.0 normalized_max: max(storage, compute,
// transient/2)), so these rates are fee / node mass. Against our heavy lane at 100 (or 126) the v2.1.0 selector weights are
// (rate/100)^3: 100: 1.00, 126: 2.00, 150: 3.38, 200: 8.00, 300: 27.0 (per transaction, not per gram).
//   floor   families 1-4    100   desk private node (our lane's first rate)
//   r126    families 5-7    126   desk private node (our lane's second rate)
//   r150    families 8-10   150   desk private node
//   r200    families 11-13  200   desk private node
//   r300    families 14-16  300   desk private node
// No payment load. Genesis (built once by hash-sixteen.mjs) stays at 200 on the builder's mass. The builder takes any rate of 100 or more.
// Pre-run 12-13 tiers (as built, on 13,046): floor 100, r110, r126, r150, r200.
export const FLOOR_RATE = 100;
export const PAY_RATE = 150;   // kept for old callers; pre-run 12 starts no payment sender
export const GENESIS_RATE = 200;
export const TIERS = [
  { cohort: "floor", rate: 100, from: 1, to: 4, path: "desk" },
  { cohort: "kcc", rate: 100, from: 5, to: 5, path: "desk" },
];   // pre-run 24: four covenant families at the node-mass floor (100) and one fresh KCC-20 launch (family 5, minted one at a time by mint24.mjs, not by the family sender)
export const FAMILY_COUNT = TIERS[TIERS.length - 1].to;   // pre-run 24: 5 (was 16)
export const SENDER_FAMILIES = 4;   // pre-run 24: the family sender hops families 1-4 only; family 5 is the KCC-20 mint line   // pre-run 17: four fixed tiers, the bystanders of the lane-against-lane duel; no family moves (no esc cohort)
// pre-run 16: the live rate of an escalating family. The duel controller (desk runner) writes the esc cohort's rate to
// <run_dir>/control/ESC-RATE (or STORM_ESC_FILE). Read at most once a second; clamped to [ESC_FLOOR, ESC_CAP]; any read
// failure gives the start rate. Fixed cohorts always give their table rate.
export const ESC_FLOOR = 100, ESC_CAP = 2000;
let escPath, escAt = 0, escVal = null;
function escFile() {
  if (escPath !== undefined) return escPath;
  if (process.env.STORM_ESC_FILE) return (escPath = process.env.STORM_ESC_FILE);
  try { const c = JSON.parse(fs.readFileSync(process.env.STORM_CONFIG, "utf8").replace(/^\uFEFF/, "")); escPath = c.run_dir ? path.join(c.run_dir, "control", "ESC-RATE") : null; } catch { escPath = null; }
  return escPath;
}
export function liveRate(family) {
  const t = tierOf(family); if (!t.esc) return t.rate;
  const now = Date.now(); if (now - escAt < 1000 && escVal != null) return escVal;
  escAt = now; let v = t.rate;
  try { const f = escFile(); if (f) { const n = Math.round(Number(fs.readFileSync(f, "utf8").trim())); if (Number.isFinite(n) && n > 0) v = Math.min(ESC_CAP, Math.max(ESC_FLOOR, n)); } } catch {}
  return (escVal = v);
}
export const ESC_FAMILIES = TIERS.filter((t) => t.esc).flatMap((t) => Array.from({ length: t.to - t.from + 1 }, (_, i) => t.from + i));
export const COHORTS = TIERS.map((t) => t.cohort);
export const COHORT_RE = TIERS.map((t) => t.cohort).sort((a, b) => b.length - a.length).join("|");
function tierOf(family) {
  const f = Number(family);
  const t = Number.isInteger(f) ? TIERS.find((x) => f >= x.from && f <= x.to) : null;
  if (!t) throw new Error("family " + family + " is not 1.." + TIERS[TIERS.length - 1].to);
  return t;
}
export const familyRate = (family) => tierOf(family).rate;
export const cohortOfFamily = (family) => tierOf(family).cohort;
export const pathOfFamily = (family) => tierOf(family).path;
export const PUBLIC_FAMILIES = TIERS.filter((t) => t.path === "public").flatMap((t) => Array.from({ length: t.to - t.from + 1 }, (_, i) => t.from + i));
export const cohortOfRate = (rate) => (TIERS.find((t) => t.rate === Number(rate)) || {}).cohort || null;
export const FEE_SPLIT_LINE = TIERS.map((t) => `${t.cohort}=${t.from}-${t.to}:${t.rate}@${t.path}`).join(" ");
export function feeTableMisses(families) {
  return (families || []).filter((f) => Number(f.fee_sompi_per_gram) !== familyRate(f.family)).map((f) => Number(f.family));
}
export const hopLine = (key, coin, nonce, family) => `hop ${key} ${coin.txid} ${coin.index} ${coin.amount} ${nonce} ${familyRate(family)}`;
// pre-run 14: the line kit21 sends the builder. billRate is the builder's own rate (fee = builder mass x billRate), chosen so
// fee / node mass equals the family's rate. The builder echoes billRate; kit21 checks the node rate it gives.
export const hopLineAt = (key, coin, nonce, billRate) => `hop ${key} ${coin.txid} ${coin.index} ${coin.amount} ${nonce} ${billRate}`;
export const NODE_PRICED = 1;
