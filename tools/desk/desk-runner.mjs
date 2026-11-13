// Pre-run 24 desk runner: pre-run 23's, with (xxvii) the combined whole, modest (tn10-target-plan REVIEW-01 / plan card 24):
// four covenant families at the node-mass floor (100) instead of sixteen in four tiers; NO heavy lane (no lane kid, no greedy
// rule, no payment); one fresh KCC-20 launch (family 5 in the bundle) minted one at a time by kit25/mint24.mjs (waits for
// accept, cap 30); the read-only #1146 rotation sample rot24.mjs; the tic-tac-toe guest line not started (no runner on disk);
// the family count from family-fees.mjs (5) instead of 16; the connectivity guard reads the floor families when no lane runs.
// Pre-run 23 desk runner: pre-run 22's, with (xxvi) a new lane plan (chain count against ready count at a fixed 460, a repeat of
// 2,000 against 460, lane-off baselines at the start and the end), control/LANE-READY per segment, and the families' end time set
// from the run start (pre-run 22's fault) with FAMILY_END_CHECK before the lane starts and at RETURN's close.
// Pre-run 22 desk runner: pre-run 21's (void: network outage) unchanged in plan, plus (xxv) a connectivity guard (below LANE_PLAN).
// Pre-run 21 desk runner (the cap test and the template probe after pre-run 20). Pre-run 20's runner with these changes on purpose:
//   (xxiv) ONE heavy lane (lane 2 off), the same four fixed tiers. Lane plan: BASE N=0 (2 min); HOLD-1 = the lane N=8 at a fixed
//          460 (2; the reference for the cap test and the template probe's N=8); HOLD-2 = the template probe: a fixed 460 with
//          a submit cap of 230 a minute (control/LANE-PERMIN, paced evenly), N=15 (2) then N=30 (2); HOLD-3 = the cap test: N=8,
//          greedy (110 percent of the reference, never down) from 600 with x2 steps (upGreedy; the normal rule keeps x1.25), the
//          cap guard as before (4 decided minutes at 2,000 -> CAP_REACHED -> 150), then two decisions of re-climb, then
//          FROZEN_ARM writes control/LANE-CAP-FEES (lane fees so far + 20 tKAS) so the lane meets its fee cap on purpose and
//          FROZEN must hold the rate (10); then N 0 (the drain) through HOLD-4 and RETURN (2). BUDGET_CHECK unchanged.
// Pre-run 20 desk runner (two cheap probes after pre-run 19). Pre-run 19's runner with these changes on purpose:
//   (xxiii) ONE heavy lane (lane 2 off) and the same four fixed tiers. Lane plan: BASE N=0 (4 min); HOLD-1 = the lane N=30 at
//          150 (the reference, 4); HOLD-2 = probe 1, a reachable target: greedy at 100 percent of the reference, never down (7),
//          then reset to 150 on the normal rule (90 percent, two-minute step down, floor 100) (6); HOLD-3 = probe 2, fewer chains
//          ready at a high rate: a fixed 460 with N=8 (5), then N=30 at 460 as the in-run control (3); then N 0 (the drain)
//          through HOLD-4 and RETURN (4). A lane that has stopped (fee cap, moved cap, pile floor, reject) freezes the controller:
//          FROZEN is logged once and no rate is moved after it (pre-run 19 wrote paper rates after its cap). tplwatch20.mjs
//          (read-only) reads the desk node's own block template every 3 s into logs/template-3s.jsonl. BUDGET_CHECK unchanged.
// Pre-run 19 desk runner (greedy alone: the control for pre-run 18). Pre-run 18's runner with these changes on purpose:
//   (xxii) ONE heavy lane (30 chains; lane 2 off, N=0) and the same four fixed tiers. Lane plan, sized on the funds we hold:
//          BASE N=0 (3 min); HOLD-1 = the lane at 150 (the reference, 4); HOLD-2 + HOLD-3 = greedy alone (12 min in one piece:
//          wants 110 percent of its reference, never steps down, cap 2,000); no symmetric repeat (no budget for it); then N 0
//          (the drain) through HOLD-4 and RETURN (3). SOLO: the controller needs only lane 1's reference and never moves lane 2.
//          The cap guard for the greedy lane alone (4 decided minutes at 2,000) is kept. BUDGET_CHECK as in pre-run 18.
// Pre-run 18 desk runner (the greedy duel). Pre-run 17's runner with these changes on purpose:
//   (xxi) the same two heavy lanes (30 chains each) and four fixed tiers. Lane plan: BASE N=0 (10 min); HOLD-1 = both at 150 (the
//         reference, 10); HOLD-2 + HOLD-3 part 1 = the greedy duel (24 min in one piece: lane 1 wants 110 percent of its reference
//         and never steps down, lane 2 the normal rule; both from 150, no reset between the two parts); HOLD-3 part 2 = a short
//         symmetric repeat (8 min, both reset to 150); then N 0 (the drain) through HOLD-4 and RETURN (10). Cap guard also when the
//         greedy lane alone sits at 2,000 for 4 decided minutes (recorded, both back to 150). The pre-run budget check: key 0's
//         usable tKAS less 760 a planned family minute must stay 8,000 over the 18,000 abort line, or the run is HELD before genesis.
// Pre-run 17 desk runner (the lane-against-lane duel). Pre-run 16's runner with these changes on purpose:
//   (xx) kit24 tiers floor 1-4 100, r150 5-8 150, r300 9-12 300, r450 13-16 450, all fixed (the bystanders). Two heavy lanes
//        of 30 chains each (heavy-lane.mjs runs both). Lane plan: BASE N=0; HOLD-1 = both at 150 (the reference); HOLD-2 and
//        HOLD-3 parts 2-3 = the duel (36 minutes, each lane's rate moved each minute by one rule); HOLD-3's last 12 minutes
//        = the one-sided variant (both reset to 150, lane 1 greedy: wants 110% of its reference, never steps down); then N 0 (the drain) through HOLD-4 and RETURN.
//        Cap guard: 4 decided minutes with both at 2,000 -> recorded and both back to 150. The duel controller is below LANE_PLAN.
// Pre-run 16 desk runner (the fee-escalation duel). Pre-run 15's runner with these changes on purpose:
//   (xix) kit23 tiers floor 1-4 fixed 100, r300 5-7 fixed 300, esc 8-16 live (start 150). Lane plan: BASE N=0; HOLD-1 =
//         N 60 at 150 (the lane's reference, esc at 150, no escalation); HOLD-2 and HOLD-3 = the duel (N 60, 36 minutes,
//         esc and lane rates moved each minute by one rule, below); then N 0 and esc 150 (the drain and post-duel control)
//         through the HOLD-4 minute and RETURN. heavy-lane.mjs takes any rate 100-2,000. The duel controller is below LANE_PLAN.
// Pre-run 15 desk runner. Pre-run 14's runner with these changes on purpose (the question: does the "about twice the
// competitor's rate" protection seen in pre-run 14 hold when our lane is not capped by its own ready-mass hold, and at a higher
// competitor level):
//   (xviii) kit22 = kit21 with the tiers floor 1-4 100, r150 5-7, r200 8-10, r300 11-13, r450 14-16 (node rates). Lane plan:
//          BASE N=0; HOLD-1 = N 60 at 126; HOLD-2 = N 0 (the middle control); HOLD-3 = N 40, 60 at 150; then N 0 (the drain)
//          through the HOLD-4 minute and RETURN. heavy-lane.mjs: ready-mass hold 80 blocks (was 45), 1,200 submits a minute.
// Pre-run 14 desk runner. Pre-run 13's runner with these changes on purpose (the question: when covenant hops are priced on
// their real node-side mass, so the node rates them at 100/126/150/200/300, how do they fare against our heavy lane at the same
// and at a higher rate, N = 0/20/40 at 100 and at 126):
//   (xvii) kit21: hops priced on their node mass (covenant.mjs buildHop; tiers in family-fees.mjs are node rates). Lane plan:
//          BASE N=0; HOLD-1 = N 20, 40 at 100; HOLD-2 = N 0 (the middle control); HOLD-3 = N 20, 40 at 126; then N 0 (the
//          drain) through the HOLD-4 minute and RETURN. The family-lane abort line is usable tKAS (coins over 3 tKAS, less
//          3 tKAS each) under 18,000, not the coin count (pre-run 13 failed on change fragments with 109,513 usable); the coin
//          count is logged once when it goes under 2,500. Step files carry each tier's node fee rate in the mempool (probe).
// Pre-run 13 desk runner. Pre-run 12's runner with these changes on purpose (the question: with a known, controlled heavy
// same-fee competitor at ready count N, how do covenant chains in fee tiers 100/110/126/150/200 slow down as N rises and recover
// as it falls, and does a 126 heavy lane change the picture):
//   (xvi)  our own heavy lane (heavy-lane.mjs), a kid like the probe, started after the families are attempting. The runner sets
//          its ready-count cap N and its rate on one absolute timeline of whole minutes, so a step file's render never stretches
//          a lane step: BASE N=0 (BASE_MIN); HOLD-1 = the climb N 10, 20, 40, 60; HOLD-2 = the descent N 40, 20, 0; HOLD-3 =
//          N 40 at 126; then N 0 (the drain) through the HOLD-4 minute and RETURN (RET_MIN). LANE_MIN whole minutes per lane step.
//          Families and fee tiers are pre-run 12's (kit20), no payment load. The probe and the counter record our heavy apart
//          from the outside heavy. The run number in commit messages and the FAILED text comes from RUN_NO (no leftovers).
// Pre-run 12 desk runner. Pre-run 11's runner with these changes on purpose (the question: what fee keeps a covenant chain
// moving when it competes with heavy same-fee outside transactions in the mempool):
//   (xiv)  five fee tiers near the floor, every family on the desk's private node (family-fees.mjs): floor 1-4 at 100, r110
//          5-7, r126 8-10, r150 11-13, r200 14-16. One process, one builder (kit20 = kit19 with this fee table).
//   (xv)   no payment load of ours: no payment sender is started, no pile is dealt. Steps, all OBSERVATION, families only:
//          BASE (BASE_MIN), then three long stretches OBS-1..3 published as HOLD-1..3 (OBS_MIN each; the file names keep the
//          gate chain the bot and Mini wait on), the pinned HOLD-4 minute, RETURN (RET_MIN), the counter's tail. Each step
//          file carries a per-minute tier table read against the probe's ready mass and the outside fee-100 stream.
//          Probe, counter, scoring helpers and gates are pre-run 11's. Pre-run 11 header follows.
// Pre-run 11 desk runner. Pre-run 10's runner with these changes on purpose (the question: why were cheap chained hops already
// slow at 1,013 tx/s in pre-run 10, and where do they start to slow):
//   (xii)  a read-only mempool and template probe (mempool-probe.mjs) on the desk's private node, started before the counter
//          and stopped with it after the tail: mempool size and composition (ours by class, other traffic by fee-rate
//          bucket, ready versus chained), the desk node's own block template by class, and the fee estimate, every 20 s.
//          Each step file carries a per-minute mempool table, and counts/chain/MEMPOOL.md is written after the tail.
//   (xiii) steps: BASE (families only, no payments, observation), HOLD-1 400, HOLD-2 700, HOLD-3 1,013 (scored on submit-OK,
//          three clean minutes, at least four minutes evaluated per step), the rate stays 1,013 to the HOLD-4 observation
//          minute, then RETURN at 0 (families only, observation, RET_MIN minutes) to read the drain and recovery.
//          Cohorts, fees, paths, counter and scoring rules are pre-run 10's. Pre-run 10 header follows.
// Pre-run 10 desk runner. Pre-run 9's runner with one change on purpose:
//   (x)    offers: HOLD-1 1,013, HOLD-2 1,500, HOLD-3 1,800 (the two measured steps), then 1,013 as soon as HOLD-3 is scored;
//          HOLD-4 observation at 1,013; RETURN 1,013. No over-capacity step (pre-run 8's long one crowded out other TN10 users).
//          Cohorts, fees, paths, counter and scoring are pre-run 9's. Pre-run 9 header follows.
// Pre-run 9 desk runner. One process. Pre-run 8's runner plus:
//   (vi)   five family cohorts (family-fees.mjs): floor 1-4 at 100, double 5-7 at 200, triple 8-10 at 300, triple-pub 11-13
//          at 300 submitted on the kept public kaspads (the payments' nodes), high 14-16 at 1000. One process, one builder
//          (kit19). The runner maps each public family to a kept kaspad (family_public_urls in the private config) and
//          checks FEE_SPLIT and FAMILY_PATH lines and the path on the submit rows. Counts are per cohort (h_<cohort>).
//   (vii)  offers reshaped for the question: HOLD-1 1,013 (under block space), HOLD-2 1,800 (near it, not over), HOLD-3
//          2,500 (over, kept short), then the rate drops to 1,013 as soon as HOLD-3's minutes are scored; the HOLD-4
//          minute is an observation at 1,013 (the backlog drain); RETURN 1,013. Scored on submit-OK; each step file also
//          says how many minutes had our payments included within 10 percent of submit-OK (reported, not scored).
//   (viii) the open gate checks the private candidates file before it reads any node (HELD candidates-missing).
// Pre-run 8 header follows.
// Pre-run 8 desk runner. One process. Pre-run 7's runner plus:
//   (iv)  the desk's private TN10 node counts what the chain accepted (counter.mjs, a detached read-only child started
//         before the first family submit): per minute, by accepting chain block time, our payments, our families by fee
//         tier, coinbase and other traffic, with the desk node's DAA gap and sink age against a kept public kaspad each
//         sample. A minute whose read lagged is marked; a count is never filled in. Each step file carries submit-OK and
//         included side by side; after RETURN the counter reads a 5-minute tail and counts/chain/TIMELINE.md is written.
//   (v)   three family fee tiers against the payments' 150: floor 1-6 at 100, double 7-11 at 200, triple 12-16 at 300.
// Pre-run 7 header follows.
// Pre-run 7 desk runner. One process. TESTNET-10 ONLY. Never restarted mid-run (locks/LOCKED.md).
// Pre-run 7 lock lines carried here (locks/LOCKED.md, pre-run 6 lock at c527650):
//   (i)   the family sender is on the desk's private TN10 node (a unique synced kaspad that takes no payment submit), and
//         its mempool skip no longer applies to families (kit17: family_mempool_skip_line 0). If a skip is ever set, it
//         clears when the mempool falls back under the line, and every minute it covers is dirt with its reason
//         (node-skip-fam:<reason>), read from phase.log NODE_SKIP / NODE_SKIP_CLEAR.
//   (ii)  when every sender hands off, the deal takes the handoff pools as the truth; the node view only drops coins it
//         shows as spent, never adds. Any deal is capped at the preflight pile.
//   (iii) STORM_PAY_PER_NODE payment senders (default 3) per kept unique kaspad, each its own process and connection;
//         a slow loop may catch up to STORM_PAY_CATCHUP (default 3) times its share (pay2.mjs).
// Pre-run 6 lesson carried here (locks/LOCKED.md, b616d11): the payment pool survives a sender restart.
//   (d) before the first payment and at the one repair, the runner deals the free payment coins evenly over the senders
//       (tools/desk/paypool.mjs): a coin spent by a mempool transaction is not free, an unconfirmed tip of ours is. Each
//       sender gets a private lane file. The repair asks the senders to hand off (control/PAY-HANDOFF-<n>): each one
//       finishes its batch in flight, writes its exact pool, and exits. Only a sender that does not hand off in 30 s is
//       killed, and then its last snapshot is used. The handed-off pools are checked against the node view, merged with
//       the node's free set, and dealt again. The split is logged (POOL_SPLIT) and each sender's loaded pool is checked
//       against it (POOL_LOADED). The pile is read against the offers before a ceiling is called a node limit.
// Pre-run 4 lessons carried here (locks/LOCKED.md, edfcdd2):
//   (a) a payment-sender repair waits until the killed senders are gone, drops them from the list itself, starts the
//       missing ones, and checks that each one logged PAY_START. startPay starts any sender that is not alive, whatever
//       the list says.
//   (b) a HOLD or FAILED push that fails is retried (fetch and push), and a FAILED file is always written locally first
//       (logs/FAILED.local.md in the run folder) so the operator can publish it if origin stays unreachable.
//   (c) kept public nodes are unique kaspads (preflight reads each node id); two hostnames of one kaspad are one node.
// Children (broker, coordinator, family sender, payment senders) start detached through WMI, outside this process tree and job,
// so they survive the parent. The runner tracks them by pid.
//   --mode open : gates, then publish logs/PRE-RUN-OPEN.md once. Exits. Not a send.
//   --mode run  : gates (PRE-RUN-OPEN and MINI-ARMED on origin), genesis from the published bundle, families on kit16 +
//                 the patched builder (100/200 per hop), payments HOLD-1..3, the HOLD-4 minute, RETURN, METHOD.md.
// A missing gate is HELD and an exit. It never waits on a gate. It never rebuilds the bundle or republishes SIXTEEN.md.
// Env: STORM_CONFIG (this run's config), STORM_KIT (kit16). Args: --repo <clone> --git <git.exe> --bundle <published bundle> --six <tools dir>
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";
import crypto from "node:crypto";
const argv = process.argv.slice(2);
const arg = (n, d) => { const i = argv.indexOf("--" + n); return i >= 0 && i + 1 < argv.length ? argv[i + 1] : d; };
const MODE = arg("mode"), REPO = arg("repo"), GIT = arg("git"), BUNDLE = arg("bundle"), SIX = arg("six");
const KIT = process.env.STORM_KIT;
const U = (d, f) => "file:///" + path.join(d, f).replace(/\\/g, "/");
const { CFG, P, sleep, connect, to } = await import(U(KIT, "lib.mjs"));
const { verify, shaOfId } = await import(U(SIX, "sixteen-format.mjs"));
const { familyRate, cohortOfFamily, pathOfFamily, PUBLIC_FAMILIES, COHORTS, FEE_SPLIT_LINE, TIERS, FAMILY_COUNT, SENDER_FAMILIES } = await import(U(SIX, "family-fees.mjs"));
process.env.STORM_FAMILY_COUNT = String(FAMILY_COUNT);   // (xxvii) pre-run 24: preflight.mjs checks this many bundle coins
const HK = COHORTS.map((c) => "h_" + c);
const tierOfC = (c) => TIERS.find((t) => t.cohort === c);
const cohHead = (c) => `${c[0].toUpperCase() + c.slice(1)} hops (${tierOfC(c).esc ? "duel, start " : ""}${tierOfC(c).rate}${tierOfC(c).path === "public" ? ", public" : ""})`;
const TIER_TXT = TIERS.map((t) => `${t.cohort} (families ${t.from}–${t.to}) ${t.rate} sompi/gram on the ${t.path === "public" ? "kept public kaspads" : "desk's private node"}`).join(", ");
const { keyAddress } = await import(U(KIT, "covenant.mjs"));
const HERE = path.dirname(fileURLToPath(import.meta.url));
const PP = await import(U(HERE, "paypool.mjs"));
const NO_PAY = process.env.STORM_NO_PAY !== "0";   // (xv) pre-run 12: no payment sender
const RUN_NO = Number(CFG.run_no || 24);   // (xvi) the run number, from the config
const LANE_MIN = Number(process.env.STORM_LANE_MIN || 12);
// (xxi) pre-run 18: segment lengths (whole minutes). STORM_LANE_MIN (the rehearsal) sets every segment to that length.
const SEGM = (d) => (process.env.STORM_LANE_MIN ? LANE_MIN : d);
const PLAN18 = { base: Number(process.env.STORM_BASE_MIN || SEGM(2)), ref: SEGM(2), g1: 0, g2: 0, sym: 0, p2a: SEGM(2), p2b: SEGM(2), cap: Number(process.env.STORM_CAP_MIN || SEGM(10)), ret: Number(process.env.STORM_RET_MIN || SEGM(2)) };   // (xxiv) pre-run 21: BASE 2 | ref N 8 at 460, 2 | template probe N 15 and N 30 at 460 with a 230-a-minute submit cap, 2 + 2 | cap test: greedy N 8 from 600, x2 steps, 10 | RETURN 2 (STORM_CAP_MIN lets the rehearsal run the cap test at full length)   // (xxiii) pre-run 20: BASE 4 | ref 4 | probe 1: greedy at 100 percent 7 + normal rule 6 | probe 2: N 8 at 460 5 + N 30 at 460 3 | RETURN 4   // (xxii) pre-run 19: 3 | 4 | 6 | 6 | (no repeat) | 3, sized on the funds we hold
// (xxi) the pre-run budget check: key 0's usable tKAS projected at the end of the run must stay over the abort line by a margin.
const FAM_USE_PER_MIN = Number(process.env.STORM_FAM_USE_PER_MIN || 760), BUDGET_MARGIN = Number(process.env.STORM_BUDGET_MARGIN || 8000);
const PLAN23 = { base: Number(process.env.STORM_BASE_MIN || SEGM(3)), seg: SEGM(3), endBase: SEGM(3), ret: Number(process.env.STORM_RET_MIN || SEGM(3)) };   // (xxvi) pre-run 23: BASE 3 | eight lane segments of 3 at a fixed ready cap | N0-end 3 | RETURN 3
const FAM_MIN_PLANNED_P22 = 4 + PLAN18.base + PLAN18.ref + PLAN18.g1 + PLAN18.g2 + PLAN18.sym + PLAN18.p2a + PLAN18.p2b + PLAN18.cap + 6 + PLAN18.ret;   // (xxiv) pre-run 21 adds the cap test   // (xxiii) pre-run 20 adds probe 2
const FAM_MIN_PLANNED = 4 + PLAN23.base + 3 * PLAN23.seg + 6 + PLAN23.ret;   // (xxvii) pre-run 24: BASE 3 | HOLD-1..3 one stretch of 3 each | pin wait | RETURN 3
const PILE_MIN = Number(process.env.STORM_PILE_MIN || 6000);   // pre-run 7: the pile is sized for HOLD-4 over all senders
const PER = Math.max(1, Number(process.env.STORM_PAY_PER_NODE || 3));   // (iii) payment senders per kept kaspad
const NODE = process.execPath;
const isoZ = (ms = Date.now()) => new Date(ms).toISOString().replace(/\.\d+Z$/, "Z");
const mkey = (ms) => new Date(ms).toISOString().slice(0, 16);
const clean = (s) => String(s).replace(/wss?:\/\/\S+/g, "<url>").replace(/https?:\/\/\S+/g, "<url>").replace(/\b\d{1,3}(\.\d{1,3}){3}\b/g, "<ip>").replace(/[0-9a-f]{64}/gi, "<h>").replace(/C:\\Users\\[^\\]+/gi, "C:\\Users\\Fermi").slice(0, 400);
const LOG = P("logs", "runner.log");
const sleepA = (ms) => new Promise((r) => setTimeout(r, ms));
const log = (s) => { const l = isoZ() + " " + clean(s); fs.appendFileSync(LOG, l + "\n"); console.log(l); };
const phase = (s) => { fs.appendFileSync(P("logs", "phase.log"), isoZ() + " " + s + "\n"); log("PHASE " + s); };
const HELD = (why, extra = "") => { log("HELD " + why + (extra ? " " + extra : "")); console.log(JSON.stringify({ held: why })); process.exit(3); };
if (!["open", "run"].includes(MODE) || !REPO || !GIT || !BUNDLE || !SIX || !KIT) { console.log("args: --mode open|run --repo --git --bundle --six"); process.exit(2); }

// ---- one runner ------------------------------------------------------------------------------------------------
const LOCK = P("private", "runner.lock");
if (fs.existsSync(LOCK)) {
  const old = Number(fs.readFileSync(LOCK, "utf8").trim()); let alive = false;
  try { process.kill(old, 0); alive = true; } catch (e) { alive = e?.code === "EPERM"; }
  if (alive) HELD("second-runner");
}
fs.writeFileSync(LOCK, String(process.pid));
process.on("exit", () => { try { if (fs.readFileSync(LOCK, "utf8").trim() === String(process.pid)) fs.unlinkSync(LOCK); } catch {} });

function otherRunners() {
  const r = spawnSync("pwsh", ["-NoProfile", "-NonInteractive", "-Command", "Get-CimInstance Win32_Process | Where-Object { $_.Name -in 'node.exe','pwsh.exe','powershell.exe','kcc20.exe' } | ForEach-Object { \"$($_.ProcessId)`t$($_.CommandLine)\" }"], { encoding: "utf8", timeout: 30000 });
  if (r.status !== 0) return ["unread"];
  const bad = [];
  for (const line of (r.stdout || "").split(/\r?\n/)) {
    const [pid, cmd = ""] = line.split("\t");
    if (!pid || Number(pid) === process.pid || Number(pid) === process.ppid) continue;
    if (/serve\.mjs|desk-runner\.mjs|Get-CimInstance/i.test(cmd)) continue;
    if (/prerun-1111|tuesday-1110|tn10-storm-2026-11-1[01](?!-prerun-24)|night\.ps1|sender\.mjs|coordinator\.mjs|builder-broker\.mjs|pay2?\.mjs|counter\.mjs|kcc20|mini-runner|gate\.mjs|arm-run/i.test(cmd)) bad.push(pid);
  }
  return bad;
}

// ---- git (full path, one commit per file, push retried once) --------------------------------------------------
const G = (a) => { const r = spawnSync(GIT, ["-C", REPO, ...a], { encoding: "utf8", timeout: 90000 }); return { code: r.status ?? 1, out: (r.stdout || "") + (r.stderr || "") + (r.error ? " " + r.error.code : "") }; };
const sleepSync = (ms) => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
function fetchO() { for (let i = 0; i < 3; i++) { if (i) sleepSync(3000); if (G(["fetch", "origin", "main"]).code === 0) return true; } return false; }
const GIT_TRIES = Number(process.env.STORM_GIT_TRIES || 8), GIT_GAP_MS = Number(process.env.STORM_GIT_GAP_MS || 20000);
const has = (rel) => G(["cat-file", "-e", `origin/main:${rel}`]).code === 0;
const show = (rel) => { let r = G(["show", `origin/main:${rel}`]); if (r.code !== 0 || !r.out.trim()) r = G(["show", `origin/main:${rel}`]); return r.code === 0 ? r.out : ""; };
function originMs(rel) { let r = G(["log", "-1", "--format=%cI", "origin/main", "--", rel]); if (!r.out.trim()) r = G(["log", "-1", "--format=%cI", "origin/main", "--", rel]); const ms = Date.parse(r.out.trim().split(/\r?\n/)[0]); return Number.isFinite(ms) ? ms : null; }
function publish(rel, body, msg) {
  if (!fetchO()) return { ok: false, why: "fetch" };
  if (has(rel)) return { ok: true, existed: true, ms: originMs(rel) };
  G(["checkout", "-q", "main"]);
  const ff = G(["merge", "--ff-only", "origin/main"]); if (ff.code !== 0) return { ok: false, why: "ff " + ff.out };
  const abs = path.join(REPO, rel); fs.mkdirSync(path.dirname(abs), { recursive: true }); fs.writeFileSync(abs, body);
  if (G(["add", "--", rel]).code !== 0) return { ok: false, why: "add" };
  const c = G(["commit", "-q", "-m", msg, "--", rel]); if (c.code !== 0) return { ok: false, why: "commit " + c.out };
  let p = G(["push", "origin", "HEAD:main"]);
  if (p.code !== 0) { const rb = G(["pull", "--rebase", "-q", "origin", "main"]); if (rb.code !== 0) { G(["rebase", "--abort"]); return { ok: false, why: "push " + p.out }; } p = G(["push", "origin", "HEAD:main"]); }
  if (p.code !== 0) return { ok: false, why: "push " + p.out };
  fetchO();
  return { ok: true, ms: originMs(rel) };
}
// A HOLD or FAILED push is retried: GIT_TRIES tries, GIT_GAP_MS apart. A fetch error is not the end of the step.
async function publishRetry(rel, body, msg, tries = GIT_TRIES) {
  let r = { ok: false, why: "none" };
  for (let i = 1; i <= tries; i++) {
    r = publish(rel, body, msg);
    if (r.ok) { if (i > 1) log(`GIT_RETRY_OK ${rel} try=${i}`); return r; }
    G(["rebase", "--abort"]);
    log(`GIT_RETRY ${rel} try=${i}/${tries} ${r.why}`);
    if (i < tries) await sleepA(GIT_GAP_MS);
  }
  return r;
}

// ---- shared gates ----------------------------------------------------------------------------------------------
function sixteenGate() {
  if (!fetchO()) HELD("git-fetch");
  if (has("logs/FAILED.md")) HELD("failed-on-origin");
  const text = show("hashes/SIXTEEN.md");
  if (!text) HELD("no-sixteen-hash-path", "absent");
  const v = verify(text, { requireOrigin: true });
  if (!v.ok || v.fixture) HELD("no-sixteen-hash-path", "not-proof");
  const bundle = JSON.parse(fs.readFileSync(BUNDLE, "utf8"));
  if (!Array.isArray(bundle) || bundle.length !== FAMILY_COUNT) HELD("no-sixteen-hash-path", "bundle");
  const mism = bundle.filter((b) => v.rows.find((r) => r.family === b.family)?.sha !== shaOfId(b.g.covenantId)).length;
  if (mism) HELD("no-sixteen-hash-path", "bundle-not-the-published-one n=" + mism);
  return bundle;
}
function preflight() {
  // (viii) pre-run 8's first open read HELD desk-node-down because this file was missing; name it instead.
  try { const c = JSON.parse(fs.readFileSync(P("private", "candidates.json"), "utf8")); if (!Array.isArray(c) || !c.length) HELD("candidates-missing", "empty"); } catch { HELD("candidates-missing", "private/candidates.json absent or unreadable"); }
  const r = spawnSync(NODE, [path.join(HERE, "preflight.mjs"), "--bundle", BUNDLE, "--nodes", P("private", "candidates.json"), "--out", P("private", "nodes.json")], { encoding: "utf8", env: process.env, timeout: 240000 });
  const line = (r.stdout || "").trim().split(/\r?\n/).filter((l) => l.startsWith("{")).pop();
  let j = null; try { j = JSON.parse(line); } catch {}
  if (!j) HELD("desk-node-down", "preflight-unread");
  fs.writeFileSync(P("private", "preflight-last.json"), JSON.stringify(j));
  if (!(j.desk.testnet10 && j.desk.synced && j.desk.utxoindex && j.desk.daa_moving)) HELD("desk-node-down");
  if (!j.lane.above_abort) HELD("lane-held");
  if (j.bundle_coins.live !== FAMILY_COUNT) HELD("bundle-coin-gone", "n=" + j.bundle_coins.gone.length);
  log(`PREFLIGHT public checked=${j.public.length} answered_pass=${j.answered_pass} unique_kaspads=${j.unique_kaspads} collapsed=${(j.collapsed || []).join(",") || "-"} fail=${j.public.filter((x) => !x.pass).length} pass_nodes=${j.public.filter((x) => x.pass).map((x) => x.n).join(",")} pay_pile=${j.pay_pile}`);
  for (const x of j.public.filter((y) => !y.pass)) log(`PREFLIGHT node=${x.n} dropped why=${x.why || (x.synced === 0 ? "unsynced" : x.utxoindex === 0 ? "no-utxoindex" : x.daa_gap > 100 ? "daa-gap" : "check")}${x.same_as ? " same_kaspad_as=" + x.same_as : ""}`);
  return j;
}

// =================================================================================================================
if (MODE === "open") {
  log("OPEN start pid=" + process.pid);
  const o = otherRunners(); if (o.length) HELD("other-runner", "n=" + o.length);
  sixteenGate();
  const pf = preflight();
  if (has("logs/PRE-RUN-OPEN.md")) { log("OPEN PRE-RUN-OPEN already on origin"); process.exit(0); }
  const z = isoZ();
  const r = await publishRetry("logs/PRE-RUN-OPEN.md", `PRE_RUN_OPEN ${z}\n`, `Open pre-run ${RUN_NO}.`, 3);
  if (!r.ok) { log("GIT_FAIL " + r.why); process.exit(4); }
  log(`OPEN PRE-RUN-OPEN on origin at ${isoZ(r.ms)} (desk synced, ${pf.kept} public nodes kept, ${FAMILY_COUNT} bundle coins live)`);
  process.exit(0);
}

// =================================================================================================================
// MODE run
log("RUN start pid=" + process.pid);
let PF = {};
const kids = new Map();   // name -> child
const expectExit = new Set();   // pids the runner killed on purpose (repair): their exit is logged, not counted as PROC_EXIT
const alive = (pid) => { try { process.kill(pid, 0); return true; } catch (e) { return e?.code === "EPERM"; } };
let stopping = false;
function startKid(name, args) {
  const q = (x) => `"${x}"`;
  const env = `set "STORM_CONFIG=${process.env.STORM_CONFIG}" && set "STORM_KIT=${KIT}" && set "STORM_BUILDER_DIRECT=" && set "STORM_PROBE_KIT=${process.env.STORM_PROBE_KIT || KIT}" && `;
  const cmd = `cmd.exe /d /s /c "${env}${q(NODE)} ${args.map(q).join(" ")} >> ${q(P("out", name + ".out"))} 2>> ${q(P("out", name + ".err"))}"`;
  const ps = `$si = New-CimInstance -ClassName Win32_ProcessStartup -ClientOnly -Property @{ ShowWindow = [uint16]0 }; $r = Invoke-CimMethod -ClassName Win32_Process -MethodName Create -Arguments @{ CommandLine = $env:KID_CMD; CurrentDirectory = $env:KID_CWD; ProcessStartupInformation = $si }; "$($r.ReturnValue) $($r.ProcessId)"`;
  const r = spawnSync("pwsh", ["-NoProfile", "-NonInteractive", "-Command", ps], { encoding: "utf8", timeout: 60000, env: { ...process.env, KID_CMD: cmd, KID_CWD: KIT } });
  const [rv, pid] = (r.stdout || "").trim().split(/\s+/).map(Number);
  if (rv !== 0 || !pid) throw new Error("detached start failed for " + name + " rv=" + rv);
  kids.set(name, { pid, kill: () => spawnSync("taskkill", ["/PID", String(pid), "/T", "/F"], { timeout: 20000 }) });
  log(`KID ${name} detached`);
}
setInterval(() => { for (const [name, c] of kids) { if (!alive(c.pid)) { kids.delete(name); if (expectExit.has(c.pid)) { expectExit.delete(c.pid); phase(`REPAIR_EXIT proc=${name.replace(/-[a-z0-9.]+$/i, "")}`); } else if (name === "probe") { if (!fs.existsSync(P("control", "PROBE-STOP"))) phase("PROBE_GONE info"); } else if (name === "counter") { if (!fs.existsSync(P("control", "COUNTER-STOP"))) { phase("COUNTER_EXIT"); counterDown(); } } else if (name === "mint" && fs.existsSync(P("private", "mint-total.json"))) { phase("MINT_LINE_DONE info (the mint line wrote its totals and ended: cap, tries or stop)"); } else if (!stopping) phase(`PROC_EXIT proc=${name.replace(/-[a-z0-9.]+$/i, "")} code=gone`); } } }, 5000);
// (iv) a counter that exits mid-run is started once more (a reader, not a sender); its restart minutes are partial.
let counterRestarts = 0;
function counterDown() { if (counterRestarts >= 1 || stopping) { log("COUNTER down; inclusion minutes after this are unread"); return; } counterRestarts++; try { startKid("counter", [path.join(HERE, "counter.mjs"), "--ref", String(kept[0].n)]); phase("COUNTER_RESTART once"); } catch (e) { log("COUNTER restart failed " + clean(e?.message || e)); } }
async function stopAll(why, counterToo = false) {   // (iv) the counter is stopped on its own, after its tail
  if (counterToo) { try { fs.writeFileSync(P("control", "COUNTER-STOP"), why + "\n"); fs.writeFileSync(P("control", "PROBE-STOP"), why + "\n"); } catch {} }
  stopping = true; phase("RUN_STOP reason=" + why);
  fs.writeFileSync(P("control", "STOP"), why + "\n"); fs.writeFileSync(P("control", "PAY-STOP"), why + "\n");
  const end = Date.now() + 30000; while (Date.now() < end && [...kids.keys()].some((k) => k !== "broker" && k !== "counter" && k !== "probe")) await sleep(1000);
  for (const [name, c] of kids) { if ((name === "counter" || name === "probe") && !counterToo) continue; try { c.kill(); } catch {} }
  await sleep(2000);
  spawnSync("pwsh", ["-NoProfile", "-Command", `Get-Process kcc20 -ErrorAction SilentlyContinue | Where-Object { $_.Path -like '*prerun-24-sixteen*' -or $_.Path -like '*prerun-2-sixteen\builder*' } | Stop-Process -Force`], { timeout: 20000 });
}
let failing = false;
async function fail(why) {
  if (failing) return; failing = true;
  log("FAILED " + why);
  const body = `FAILED ${isoZ()}\n\nThe pre-run ${RUN_NO} desk run stopped before RETURN: ${clean(why)}. The run is not resumed. A next attempt is a new repo.\n`;
  // Local first: whatever origin does, the run is marked failed on this desk.
  fs.writeFileSync(P("logs", "FAILED.local.md"), body); log("FAILED_LOCAL written logs/FAILED.local.md");
  await stopAll("failed", true);
  const r = await publishRetry("logs/FAILED.md", body, `Pre-run ${RUN_NO} failed before RETURN.`, Math.max(GIT_TRIES, 3) * 2);
  if (r.ok) { log("FAILED.md on origin " + isoZ(r.ms)); try { fs.writeFileSync(P("logs", "FAILED.local.md"), body + `\nOn origin ${isoZ(r.ms)}.\n`); } catch {} }
  else { log("GIT_FAIL FAILED.md not on origin after retries: " + r.why); fs.writeFileSync(P("control", "FAILED-UNPUBLISHED"), "publish logs/FAILED.local.md as logs/FAILED.md\n"); log("FAILED_UNPUBLISHED the operator publishes logs/FAILED.local.md"); }
  process.exit(r.ok ? 5 : 7);
}
process.on("uncaughtException", (e) => { fail("runner error " + clean(e?.message || e)).catch(() => process.exit(6)); });
process.on("unhandledRejection", (e) => { fail("runner error " + clean(e?.message || e)).catch(() => process.exit(6)); });

{ const o = otherRunners(); if (o.length) HELD("other-runner", "n=" + o.length); }
const bundle = sixteenGate();
if (!/PRE_RUN_OPEN/.test(show("logs/PRE-RUN-OPEN.md"))) HELD("no-open-file");
if (!/MINI_ARMED/.test(show("logs/MINI-ARMED.md"))) HELD("mini-armed-absent");
{
for (const f of fs.readdirSync(P("state"))) if (/^family-\d+\.json$/.test(f)) HELD("state-present", "a run already started here; not resumed");
for (const f of ["STOP", "PAY-STOP", "PAY-RATE"]) try { fs.unlinkSync(P("control", f)); } catch {}
PF = preflight();
{ const u = Number(PF?.lane?.usable_tkas); const proj = u - FAM_USE_PER_MIN * FAM_MIN_PLANNED;   // (xxi) pre-run 18
  log(`BUDGET_CHECK key0_usable=${u} planned_family_min=${FAM_MIN_PLANNED} use_per_min=${FAM_USE_PER_MIN} projected_end=${proj} abort=18000 margin=${BUDGET_MARGIN}`);
  if (!Number.isFinite(u)) HELD("budget-unread"); if (proj < 18000 + BUDGET_MARGIN) HELD("budget-short", `projected_end=${proj}`); }
if (!NO_PAY && !(PF.pay_pile >= PILE_MIN)) HELD("pile-short", `pay_pile=${PF.pay_pile} min=${PILE_MIN}`);
}
const kept = JSON.parse(fs.readFileSync(P("private", "nodes.json"), "utf8"));
if (!kept.length) HELD("no-public-node");
log("NODES frozen kept=" + kept.map((x) => x.n).join(","));
// (i) the family sender gets its own node: the desk's private TN10 node (checked synced with DAA moving at the preflight),
// which no payment sender submits to. STORM_FAMILY_NODE=public puts it back on kept node 1 (pre-run 6's choice).
const famNode = process.env.STORM_FAMILY_NODE === "public" ? (kept.find((x) => x.n === 1) || kept[0]) : { n: 0, url: CFG.main_node_url, desk: true };
log("FAMILY_NODE " + (famNode.desk ? "desk-private" : "local=" + famNode.n));

let liveFams;
// schedule for the family sender: f16, 1.2 hop/s, from now
const cfgPath = process.env.STORM_CONFIG;
const cfg = JSON.parse(fs.readFileSync(cfgPath, "utf8").replace(/^\uFEFF/, ""));
// (xxvi) pre-run 23: the families' end time is set from this run's start, never carried over (pre-run 22: a fixed 12:00:00Z
// end_utc from an earlier stage stopped the families in the pinned minute, so RETURN had no family baseline). The plan's
// family minutes plus 25 minutes of slack; RETURN's close stops the families anyway (stopAll), so a later end costs nothing.
const FAM_END_MS = Date.now() + (FAM_MIN_PLANNED + 25) * 60000;
cfg.end_utc = isoZ(FAM_END_MS);
log(`FAMILY_END end_utc=${cfg.end_utc} from_run_start planned_family_min=${FAM_MIN_PLANNED} slack_min=25`);
cfg.schedule = [{ step: "f4", from: isoZ(Date.now() + 5000), to: cfg.end_utc, families: SENDER_FAMILIES, rate: 1.2 }];   // (xxvii) pre-run 24: the sender hops families 1-4; family 5 is the mint line
cfg.sec_from_utc = cfg.family_check_utc = isoZ();
// (vi) the public path: public families take the kept kaspads in turn. The urls stay in the private config.
cfg.family_public_urls = Object.fromEntries(PUBLIC_FAMILIES.map((f, i) => { const x = kept[i % kept.length]; return [String(f), { n: x.n, url: x.url }]; }));
const pubMapTxt = PUBLIC_FAMILIES.map((f) => `${f}:public-${cfg.family_public_urls[String(f)].n}`).join(",");
log("FAMILY_PUBLIC_MAP " + pubMapTxt);
fs.writeFileSync(cfgPath, JSON.stringify(cfg, null, 2));

// (xii) the mempool and template probe, read-only, on the desk's private node, before the counter. A probe that does not
// start is logged; it does not hold the run (the counter is the inclusion figure).
try { fs.unlinkSync(P("control", "PROBE-STOP")); } catch {}
startKid("probe", [path.join(HERE, "mempool-probe.mjs")]);
try { fs.unlinkSync(P("control", "LANE-CAP-FEES")); } catch {} try { fs.unlinkSync(P("control", "TPL-STOP")); } catch {} try { startKid("tplwatch", [path.join(HERE, "tplwatch20.mjs")]); } catch (e) { log("TPLWATCH not started " + clean(e?.message || e)); }   // (xxiii) pre-run 20: the template every 3 s, read-only
{ const e = Date.now() + 45000; let up = false; while (Date.now() < e) { try { if (/PROBE_START/.test(fs.readFileSync(P("logs", "probe.log"), "utf8"))) { up = true; break; } } catch {} await sleep(1000); }
  phase(up ? "PROBE_START node=desk-private" : "PROBE_NOT_STARTED info"); }
// (iv) the inclusion counter, on the desk's private node, before the first family submit. No counter, no run.
startKid("counter", [path.join(HERE, "counter.mjs"), "--ref", String(kept[0].n)]);
{ const e = Date.now() + 60000; let up = false; while (Date.now() < e) { try { if (/COUNTER_START/.test(fs.readFileSync(P("logs", "counter.log"), "utf8"))) { up = true; break; } } catch {} await sleep(1000); }
  if (!up) { log("HELD counter-down"); await stopAll("counter-down", true); process.exit(3); } phase(`COUNTER_START node=desk-private ref=${kept[0].n}`); }

// broker (one builder: the patched exe in the config)
startKid("broker", [path.join(KIT, "builder-broker.mjs")]);
await sleep(4000);
if (!/builder-broker on/.test(fs.readFileSync(P("out", "broker.out"), "utf8"))) await fail("builder broker did not start");

// genesis from the published bundle
phase("GENESIS_SUBMIT from=published-bundle");
const gs = spawnSync(NODE, [path.join(SIX, "submit-sixteen.mjs"), "--bundle", BUNDLE, "--repo", REPO, "--git", GIT], { cwd: KIT, encoding: "utf8", env: process.env, timeout: 30 * 60000 });
fs.appendFileSync(P("out", "submit-sixteen.out"), clean(gs.stdout || "") + "\n" + clean(gs.stderr || "") + "\n");
const gj = (() => { try { return JSON.parse((gs.stdout || "").trim().split(/\r?\n/).filter((l) => l.startsWith("{")).pop()); } catch { return null; } })();
if (!gj || gj.held) { log("HELD at genesis " + clean(JSON.stringify(gj))); await stopAll("genesis-held", true); process.exit(3); }
liveFams = fs.readdirSync(P("state")).filter((f) => /^family-\d+\.json$/.test(f)).map((f) => Number(f.match(/\d+/)[0])).sort((a, b) => a - b);
log(`GENESIS submitted=${gj.submitted} live=${liveFams.length}`);
if (!liveFams.length) await fail("no genesis landed");

// families: coordinator + one family sender on the family node
startKid("coord", [path.join(KIT, "coordinator.mjs"), "--takeover"]);
await sleep(3000);
startKid("fam", [path.join(KIT, "sender.mjs"), "--label", "fam", "--source", "self", "--node", famNode.url, "--key", "0"]);
phase("FAMILIES_START families=" + liveFams.length + " offer=1.2 node=" + (famNode.desk ? "desk" : famNode.n) + " mempool_skip_line=" + Number(cfg.family_mempool_skip_line ?? 90000));

// submit-row reader
const SUB = P("private", "submit-fam.jsonl");
let subOff = 0; const subRows = [];
function readSub() {
  if (!fs.existsSync(SUB)) return;
  const st = fs.statSync(SUB); if (st.size <= subOff) return;
  const fd = fs.openSync(SUB, "r"); const buf = Buffer.alloc(st.size - subOff); fs.readSync(fd, buf, 0, buf.length, subOff); fs.closeSync(fd);
  const text = buf.toString("utf8"); const cut = text.lastIndexOf("\n"); if (cut < 0) return; subOff += Buffer.byteLength(text.slice(0, cut + 1));
  for (const l of text.slice(0, cut).split("\n")) { try { const r = JSON.parse(l); subRows.push({ ts: Date.parse(r.ts), family: r.family, rate: r.rate, fee: r.fee, txid: r.txid, result: r.result, reason: r.reason, path: r.path || "", node_rate: r.node_rate, bill_rate: r.bill_rate, node_mass: r.node_mass }); } catch {} }
}
const HOPS = P("private", "hops.jsonl");
function landed() {   // txid -> accept ms
  const m = new Map(); if (!fs.existsSync(HOPS)) return m;
  for (const l of fs.readFileSync(HOPS, "utf8").split("\n")) { try { const r = JSON.parse(l); if (r.accept_header_utc) m.set(r.txid, { ms: Date.parse(r.accept_header_utc), family: r.family }); } catch {} }
  return m;
}

// fee split as built: every submit row carries its family's rate
{
  const end = Date.now() + 180000; let seen = false;
  while (Date.now() < end) { readSub(); if (COHORTS.filter((c) => c !== "kcc").every((c) => subRows.some((r) => r.result === "ok" && cohortOfFamily(r.family) === c))) { seen = true; break; } await sleep(3000); }
  const ph = fs.readFileSync(P("logs", "phase.log"), "utf8");
  if (!ph.includes("FEE_SPLIT sender=fam " + FEE_SPLIT_LINE)) await fail("family sender did not log the pre-run 24 fee split (kit25, node-priced hops, floor 1-4 and kcc 5)");
  const wantPath = (f) => (pathOfFamily(f) === "public" ? "public-" + cfg.family_public_urls[String(f)].n : "desk");
  const fpl = (ph.match(/FAMILY_PATH sender=fam (\S+)/) || [])[1] || "";
  const fpWant = cfg.families.map((f) => f.family + ":" + wantPath(f.family)).join(",");
  if (fpl !== fpWant) await fail("family sender did not log the planned paths");
  const bad = subRows.filter((r) => r.result === "ok" && r.rate !== familyRate(r.family));
  if (bad.length) await fail("a hop went out at a rate other than its family's");
  const badPath = subRows.filter((r) => r.path !== wantPath(r.family));
  if (badPath.length) await fail("a hop went out on a path other than its family's");
  if (!seen) log("FEE_SPLIT not every cohort ok within 3 min; continuing, minutes will show it");
  else log("FEE_SPLIT verified on submit rows: " + TIERS.map((t) => `${t.cohort} ${t.rate}@${t.path}`).join(", ") + "; paths " + pubMapTxt + ", the rest desk");
}
// every family attempting
{
  const end = Date.now() + 180000;
  while (Date.now() < end) { readSub(); const f = new Set(subRows.map((r) => r.family)); if (liveFams.filter((n) => n <= SENDER_FAMILIES).every((n) => f.has(n))) break; await sleep(5000); }
  const f = new Set(subRows.map((r) => r.family)); log("FAMILIES attempting=" + liveFams.filter((n) => n <= SENDER_FAMILIES && f.has(n)).length + "/" + liveFams.filter((n) => n <= SENDER_FAMILIES).length + " (family 5 is the mint line)");
}

// (xxvii) pre-run 24: NO heavy lane (the plan: no heavy lane, no greedy rule, no payment flood). Instead, after the families
// are attempting: the KCC-20 mint line (kit25/mint24.mjs, one mint at a time, waits for accept, cap 30) and the read-only
// #1146 rotation sample (rot24.mjs). The tic-tac-toe guest carrier: no runner is built on disk (desk, Mini, box were checked
// before the open; no compile tonight), so its line is not met and no guest process is started.
fs.writeFileSync(P("control", "LANE-N"), "0\n"); fs.writeFileSync(P("control", "LANE2-N"), "0\n");
log("LANE none (pre-run 24: no heavy lane)");
try { fs.unlinkSync(P("control", "MINT-STOP")); } catch {}
startKid("mint", [path.join(KIT, "mint24.mjs")]);
{ const e = Date.now() + 120000; let up = false; while (Date.now() < e) { if (/MINT_START/.test(fs.readFileSync(P("logs", "phase.log"), "utf8"))) { up = true; break; } await sleep(1000); }
  log(up ? "MINT line up (family 5, one at a time, cap 30)" : "MINT line did not log MINT_START in 2 min; its line will show it"); }
try { startKid("rot", [path.join(HERE, "rot24.mjs")]); } catch (e) { log("ROT not started " + clean(e?.message || e)); }
log("GUEST not-started reason=no-tic-tac-toe-runner-on-disk (desk, Mini and box checked before the open; plan: no compile tonight)");
// node marks, sampled each minute: desk + kept public nodes
const rpcs = new Map();
async function rpcOf(url) { if (!rpcs.has(url)) rpcs.set(url, await connect(url, 3)); return rpcs.get(url); }
const marks = {};   // minute -> { n -> {synced, daa, ms} }
const idShift = new Set();   // a kept node that later answered with another node id is logged once (not dirt; data)
const idHash = (id) => crypto.createHash("sha256").update(String(id || "")).digest("hex").slice(0, 16);
async function sampleNodes() {
  const key = mkey(Date.now()); const row = (marks[key] ||= {});
  const all = [{ n: 0, url: CFG.main_node_url }, ...kept];
  await Promise.all(all.map(async (x) => {
    const t0 = Date.now();
    try {
      const c = await rpcOf(x.url); const si = await to(c.getServerInfo(), 8000); const d = await to(c.getBlockDagInfo(), 8000);
      (row[x.n] ||= []).push({ synced: si.isSynced ? 1 : 0, daa: Number(d.virtualDaaScore), ms: Date.now() - t0 });
      if (x.idh) { try { const inf = await to(c.getInfo(), 8000); const h = idHash(inf?.p2pId); if (h !== x.idh && !idShift.has(x.n)) { idShift.add(x.n); phase(`NODE_ID_SHIFT node=${x.n}`); } } catch {} }
    }
    catch { rpcs.delete(x.url); (row[x.n] ||= []).push({ synced: 0, daa: 0, ms: Date.now() - t0, fail: 1 }); }
  }));
}
setInterval(() => { sampleNodes().catch(() => {}); }, 20000); await sampleNodes();
let laneLowLogged = false;   // (xvii)
setInterval(async () => {
  try {
    const c = await rpcOf(CFG.main_node_url);
    const bag = await to(c.getUtxosByAddresses({ addresses: [keyAddress(0)] }), 60000);
    const coins = (bag.entries || []).filter((e) => !e.isCoinbase && BigInt(e.amount) > 300_000_000n);
    const usable = Math.round(coins.reduce((a, e) => a + Number(e.amount) - 3e8, 0) / 1e8);
    if (!stopping && coins.length < 2500 && !laneLowLogged) { laneLowLogged = true; phase(`LANE_COINS_LOW coins=${coins.length} usable=${usable} info`); }
    if (!stopping && usable < 18000) { phase(`LANE_HELD usable=${usable}`); await fail("the family lane reached the abort line (usable tKAS under 18,000)"); }
  } catch { log("LANE unread"); }
}, 60000);
// FAILED on origin stops the run
setInterval(() => { try { if (fetchO() && has("logs/FAILED.md")) { stopAll("failed-on-origin").then(() => process.exit(0)); } } catch {} }, 60000);

// payments: (iii) PER senders per kept kaspad, ids <node>.<k>
const SENDERS = NO_PAY ? [] : kept.flatMap((x) => Array.from({ length: PER }, (_, k) => ({ id: `${x.n}.${k + 1}`, n: x.n, url: x.url })));
fs.writeFileSync(P("private", "senders.json"), JSON.stringify(SENDERS));
const N = SENDERS.length;
log(`SENDERS kept_kaspads=${kept.length} per_node=${PER} senders=${N}`);
// A sender counts as running only if its process is alive. A dead one still in the list is dropped and started again.
function startPay() {
  const started = [];
  for (let i = 0; i < N; i++) {
    const name = "pay-" + SENDERS[i].id, k = kids.get(name);
    if (k && alive(k.pid)) continue;
    if (k) kids.delete(name);
    startKid(name, [path.join(HERE, "pay2.mjs"), "--slot", String(i), "--of", String(N)]); started.push(SENDERS[i].id);
  }
  return started;
}
const payStarts = (sinceMs) => fs.readFileSync(P("logs", "phase.log"), "utf8").split(/\r?\n/).filter((l) => Date.parse(l.slice(0, 20)) >= sinceMs - 1000).map((l) => l.match(/PAY_START sender=([\d.]+)/)).filter(Boolean).map((m) => m[1]);
const payPools = (sinceMs) => { const m = new Map(); for (const l of fs.readFileSync(P("logs", "phase.log"), "utf8").split(/\r?\n/)) { if (Date.parse(l.slice(0, 20)) < sinceMs - 1000) continue; const x = l.match(/PAY_POOL sender=([\d.]+) node=\d+ n=(\d+) from=(\S+)/); if (x) m.set(x[1], { n: Number(x[2]), from: x[3] }); } return m; };
// (d) the fair deal. Sources: handed-off pools (exact), then the node's free set; spent coins are dropped; dealt in outpoint order.
const PAY_ADDR = keyAddress(16);
let lastDeal = null;
async function prepareLanes(why) {
  const rs = [await rpcOf(CFG.main_node_url)];
  for (const x of kept) { try { rs.push(await rpcOf(x.url)); } catch { rpcs.delete(x.url); } }
  let v = null; for (let i = 0; i < 3 && !v; i++) { try { v = await PP.nodeView(rs, PAY_ADDR, to, 90000); } catch (e) { log("POOL_VIEW retry " + clean(e?.message || e)); await sleepA(3000); } }
  if (!v) { phase(`POOL_SPLIT why=${why} unread`); return null; }
  const free = PP.freeOf(v); const handed = []; const src = { handoff: 0, snap: 0 };
  for (const x of SENDERS) {
    const h = PP.readCoins(P("private", `pool-${x.id}.handoff.json`), PAY_ADDR); const sn = h ? null : PP.readCoins(P("private", `pool-${x.id}.snap.json`), PAY_ADDR);
    const got = h || sn; if (!got) continue; if (h) src.handoff++; else src.snap++;
    handed.push(...got.coins);
    try { fs.renameSync(P("private", `pool-${x.id}.${h ? "handoff" : "snap"}.json`), P("private", `pool-${x.id}.${h ? "handoff" : "snap"}.${Date.now()}.json`)); } catch {}
  }
  // (ii) every sender handed off: the handoff pools are the truth. The view drops only what it shows as spent; it adds nothing.
  const truth = why !== "start" && src.handoff === N && src.snap === 0;
  const chk = PP.validate(handed, v, Date.now(), { truth });
  const pile = Number(PF.pay_pile) || 0;
  const base = truth ? chk.keep : why === "start" ? [...free.values()] : chk.keep;
  const extra = truth || why === "start" ? [] : [...free.values()];   // a sender that did not hand off: its coins come from the free set, capped
  const capped = PP.capToPile(base, extra, pile > 0 ? pile : base.length + extra.length);
  const all = capped.coins;
  const lanes = PP.deal(all, N);
  SENDERS.forEach((x, i) => PP.writeCoins(P("private", `pool-${x.id}.json`), lanes[i], { slot: i, of: N, node: x.n, sender: x.id, why, truth }));
  const f = PP.fairness(lanes.map((l) => l.length));
  lastDeal = { why, counts: lanes.map((l) => l.length), total: all.length, fair: f.fair, truth, cut: capped.cut, pile };
  phase(`POOL_SPLIT why=${why} total=${all.length} pile=${pile} over_pile=${all.length > pile ? 1 : 0} cut=${capped.cut} truth=${truth ? "handoff" : why === "start" ? "free-set" : "handoff+free"} lanes=${SENDERS.map((x, i) => x.id + ":" + lanes[i].length).join(",")} fair=${f.fair ? 1 : 0} free_seen=${free.size} handed=${handed.length} handed_kept=${chk.keep.length} handed_spent=${chk.why.spent} handed_gone=${chk.why.gone} handed_unlisted_kept=${chk.why.unlisted_kept} from_handoff=${src.handoff} from_snap=${src.snap} mempool_spent_seen=${v.spent.size}`);
  return lastDeal;
}
// After a start: each sender's PAY_POOL is read back against the deal. A lane that loaded under half its deal is logged.
async function checkLoaded(sinceMs, deal) {
  const end = Date.now() + 60000; let m = new Map();
  while (Date.now() < end) { m = payPools(sinceMs); if (SENDERS.every((x) => m.has(x.id))) break; await sleepA(1000); }
  const counts = SENDERS.map((x) => m.get(x.id)?.n ?? 0);
  const f = PP.fairness(counts);
  const low = deal ? SENDERS.filter((x, i) => (m.get(x.id)?.n ?? 0) < deal.counts[i] / 2).map((x) => x.id) : [];
  phase(`POOL_LOADED total=${counts.reduce((a, b) => a + b, 0)} lanes=${SENDERS.map((x, i) => x.id + ":" + counts[i] + "/" + (m.get(x.id)?.from || "-")).join(",")} fair=${f.fair ? 1 : 0}${low.length ? " low=" + low.join(",") : ""}`);
  return { counts, fair: f.fair, low };
}
// The one payment-sender repair: ask each sender to hand off its pool; kill only one that does not; wait until every stopped
// process is gone; deal the pools again; start them and check that each one logged its start and its pool.
async function repairPay() {
  const t = Date.now();
  for (const x of SENDERS) try { fs.unlinkSync(P("control", `PAY-STOP-${x.id}`)); } catch {}
  const victims = [...kids.entries()].filter(([name]) => name.startsWith("pay-"));
  for (const [, c] of victims) expectExit.add(c.pid);
  for (const x of SENDERS) fs.writeFileSync(P("control", `PAY-HANDOFF-${x.id}`), "repair\n");
  let end = Date.now() + 30000;
  while (Date.now() < end && victims.some(([, c]) => alive(c.pid))) await sleepA(250);
  const killed = victims.filter(([, c]) => alive(c.pid));
  for (const [, c] of killed) { try { c.kill(); } catch {} }
  end = Date.now() + 60000;
  while (Date.now() < end && victims.some(([, c]) => alive(c.pid))) await sleepA(500);
  const stuck = victims.filter(([, c]) => alive(c.pid)).length;
  for (const [name, c] of victims) { if (!alive(c.pid)) { kids.delete(name); expectExit.delete(c.pid); phase(`REPAIR_EXIT proc=pay sender=${name.slice(4)}`); } }
  for (const x of SENDERS) try { fs.unlinkSync(P("control", `PAY-HANDOFF-${x.id}`)); } catch {}
  await sleepA(3000);   // let the last submits reach the desk node's mempool before the view is read
  const deal = await prepareLanes("repair");
  const t2 = Date.now();
  const started = startPay();
  const want = SENDERS.map((x) => x.id); let seen = [];
  const end2 = Date.now() + 90000;
  while (Date.now() < end2) { seen = [...new Set(payStarts(t2))]; if (want.every((n) => seen.includes(n))) break; await sleepA(1000); }
  const up = want.filter((n) => seen.includes(n) && kids.get("pay-" + n) && alive(kids.get("pay-" + n).pid));
  const ld = await checkLoaded(t2, deal);
  phase(`REPAIR_RESTART proc=pay started=${started.length} running=${up.length}/${want.length} stuck=${stuck} killed=${killed.length} pool=${ld.counts.join("/")} fair=${ld.fair ? 1 : 0} deal_total=${deal ? deal.total : 0} pile=${deal ? deal.pile : 0} truth=${deal && deal.truth ? "handoff" : "merged"}`);
  return { started: started.length, running: up.length, of: want.length, killed: killed.length, pool: ld.counts, fair: ld.fair, since: t, deal };
}
const setRate = (r) => { fs.writeFileSync(P("control", "PAY-RATE"), String(r) + "\n"); phase("PAY_RATE total=" + r + " senders=" + N); };

function payRows(minute) {
  const out = [];
  for (const x of SENDERS) {
    const f = P("logs", `pay-minute-${x.id}.log`); if (!fs.existsSync(f)) continue;
    for (const l of fs.readFileSync(f, "utf8").split(/\r?\n/)) if (l.startsWith(minute + "Z ")) { const o = {}; for (const kv of l.split(" ").slice(1)) { const [a, b] = kv.split("="); o[a] = Number(b); } o.n = x.n; o.s = x.id; out.push(o); }
  }
  return out;
}
// GO-DESK clean minute: no sender-off, pool-low, node-drop, or proc-exit, every family still attempting. A STALL is logged per minute, not a dirt.
const DIRTY = /SENDER_OFF|POOL_LOW|NODE_DROP|PROC_EXIT|PAY_STOP|PAY_EXIT|FAMILY_DROP/;
// (i) a family-node skip is dirt with its reason for every minute it covers: from NODE_SKIP until NODE_SKIP_CLEAR.
function famSkipIn(minute) {
  const t0 = Date.parse(minute + ":00Z"), t1 = t0 + 60000; let on = null; const hit = new Set();
  for (const l of fs.readFileSync(P("logs", "phase.log"), "utf8").split(/\r?\n/)) {
    const ms = Date.parse(l.slice(0, 20)); if (!Number.isFinite(ms) || ms >= t1) { if (ms >= t1) break; continue; }
    const a = l.match(/NODE_SKIP node=fam reason=(\S+)/); const b = /NODE_SKIP_CLEAR node=fam/.test(l);
    if (a) { on = a[1]; if (ms >= t0) hit.add(on); } else if (b) { if (on && ms >= t0) hit.add(on); on = null; }
  }
  if (on) hit.add(on);
  return [...hit];
}
const mempoolHigh = (minute) => phaseLines(minute).filter((l) => /NODE_MEMPOOL_HIGH node=fam/.test(l)).length;
const phaseLines = (minute) => fs.readFileSync(P("logs", "phase.log"), "utf8").split(/\r?\n/).filter((l) => l.startsWith(minute));
function phaseIn(minute) { return phaseLines(minute).filter((l) => DIRTY.test(l) && !/^\S+ NODE_SKIP/.test(l)).map((l) => l.slice(21).split(" ")[0]).filter(Boolean); }
const results = [];   // per minute evaluated, all steps
function evalMinute(step, target, minute) {
  readSub();
  const t0 = Date.parse(minute + ":00Z"), t1 = t0 + 60000;
  const pr = payRows(minute);
  const ok = pr.reduce((s, r) => s + (r.ok || 0), 0), att = pr.reduce((s, r) => s + (r.attempts || 0), 0);
  const rrate = pr.reduce((s, r) => s + (r.rate || 0), 0), rfull = pr.reduce((s, r) => s + (r.full || 0), 0), roth = pr.reduce((s, r) => s + (r.other || 0), 0);
  const L = landed();
  const coh = {};
  for (const c of COHORTS) {
    const rows = subRows.filter((r) => r.ts >= t0 && r.ts < t1 && cohortOfFamily(r.family) === c);
    const okRows = subRows.filter((r) => r.ts < t1 && r.result === "ok" && cohortOfFamily(r.family) === c);
    coh[c] = { ok: rows.filter((r) => r.result === "ok").length, attempts: rows.length, rej_rate: rows.filter((r) => r.result !== "ok" && (r.reason === "fee" || r.reason === "mass")).length, rej_full: rows.filter((r) => r.result !== "ok" && r.reason === "mempool_full").length, waiting: okRows.filter((r) => !(L.get(r.txid)?.ms < t1)).length, rate: [...new Set(rows.map((r) => r.rate))].join("/") };
  }
  const famAtt = new Set(subRows.filter((r) => r.ts >= t0 && r.ts < t1).map((r) => r.family));
  const why = [];
  if (Math.abs(ok - target * 60) > target * 6) why.push("ok-off");
  if (pr.length < N) why.push("proc-row-missing");
  const m = marks[minute] || {};
  for (const x of kept) { const s = m[x.n] || []; if (!s.length || s.some((q) => q.fail)) why.push("node-" + x.n + "-unread"); else if (s.some((q) => !q.synced)) why.push("node-" + x.n + "-unsynced"); else if (s.length > 1 && s[s.length - 1].daa <= s[0].daa) why.push("node-" + x.n + "-daa-still"); }
  if (famNode.desk) { const s = m[0] || []; if (!s.length || s.some((q) => q.fail)) why.push("fam-node-unread"); else if (s.some((q) => !q.synced)) why.push("fam-node-unsynced"); else if (s.length > 1 && s[s.length - 1].daa <= s[0].daa) why.push("fam-node-daa-still"); }
  for (const p of new Set(phaseIn(minute))) why.push(p.toLowerCase());
  for (const r of famSkipIn(minute)) why.push("node-skip-fam:" + r);
  const missing = liveFams.filter((n) => n <= SENDER_FAMILIES && !famAtt.has(n));   // pre-run 24: family 5 is the mint line, not the sender's if (missing.length) why.push("families-not-attempting=" + missing.length);
  const stalls = phaseLines(minute).filter((l) => /STALL family/.test(l)).length;
  const r = { step, minute, ok, att, rrate, rfull, roth, coh, stalls, mhigh: mempoolHigh(minute), clean: why.length ? 0 : 1, why: why.join(";") || "-", pr };
  results.push(r); log(`MINUTE ${step} ${minute} ok=${ok} att=${att} clean=${r.clean} ${r.why}`);
  return r;
}
async function waitMinuteClosed(minute) { const t = Date.parse(minute + ":00Z") + 60000 + 12000; while (Date.now() < t) await sleep(1000); }
const fixes = [];
const STEP_MIN_N = Number(process.env.STORM_STEP_MIN_N || 4);   // (xiii) at least four minutes evaluated per scored step
async function scored(step, target) {
  const ts = Date.now(); setRate(target); const st = startPay();
  if (firstStart) {
    firstStart = false;
    if (st.length) {
      // every sender must log its start; one that died before PAY_START is started again once (startPay starts missing senders)
      let seen = []; const e = Date.now() + 60000;
      while (Date.now() < e) { seen = [...new Set(payStarts(ts))]; if (SENDERS.every((x) => seen.includes(x.id))) break; await sleepA(1000); }
      const miss = SENDERS.filter((x) => !seen.includes(x.id)).map((x) => x.id);
      if (miss.length) { await sleepA(6000); const again = startPay(); phase(`PAY_START_MISSING senders=${miss.join(",")} restarted=${again.join(",") || "-"}`); }
      await checkLoaded(ts, lastDeal);
    }
  }
  let first = Math.ceil((Date.now() + 30000) / 60000) * 60000;   // skip the ramp minute
  let cleanN = 0, n = 0, repaired = false;
  const mins = [], all = [];
  for (let t = first; ; t += 60000) {
    const minute = mkey(t); await waitMinuteClosed(minute);
    const r = evalMinute(step, target, minute); mins.push(r); all.push(r); n++; cleanN += r.clean;
    if (cleanN >= 3 && n >= STEP_MIN_N) return { head: "MET", mins: all, repaired };
    if (n >= 6 && !repaired) {
      repaired = true; const z = isoZ();
      const dirt = [...new Set(mins.flatMap((x) => x.why.split(";")))].filter((w) => w !== "-").join(", ");
      const rp = await repairPay();
      fixes.push({ z, step, what: dirt || "minutes not clean", change: `restarted the payment senders with their pools handed off and dealt again (one try for this reason; ${rp.running} of ${rp.of} running again after the restart, pools ${rp.pool.join(" / ")} coins, ${rp.fair ? "fair" : "not fair"}; deal ${rp.deal ? rp.deal.total : 0} of a ${rp.deal ? rp.deal.pile : 0}-coin pile, ${rp.deal && rp.deal.truth ? "handoff pools as the truth" : "handoff plus free set, capped at the pile"}${rp.killed ? `, ${rp.killed} killed after no handoff` : ""})`, why: "fewer than three clean minutes in six" });
      const fx = "# Fixes\n\n" + fixes.map((f) => `- ${f.z} ${f.step}: failed: ${f.what}. Changed: ${f.change}. Why: ${f.why}.`).join("\n") + "\n";
      let pr = publishOver("logs/FIXES.md", fx, `Log the ${step} repair.`); if (!pr.ok) { await sleepA(GIT_GAP_MS); pr = publishOver("logs/FIXES.md", fx, `Log the ${step} repair.`); } log(pr.ok ? "FIXES on origin" : "GIT_FAIL " + pr.why);
      first = t + 60000; n = 0; cleanN = 0; mins.length = 0; t = Math.ceil((Date.now() + 30000) / 60000) * 60000 - 60000; continue;
    }
    if (n >= 6 && repaired) return { head: "NOT MET", mins: all, repaired };
  }
}
function publishOver(rel, body, msg) {   // FIXES.md grows; one commit per update
  if (!fetchO()) return { ok: false, why: "fetch" };
  G(["checkout", "-q", "main"]); const ff = G(["merge", "--ff-only", "origin/main"]); if (ff.code !== 0) return { ok: false, why: "ff" };
  fs.mkdirSync(path.join(REPO, path.dirname(rel)), { recursive: true }); fs.writeFileSync(path.join(REPO, rel), body);
  G(["add", "--", rel]); const c = G(["commit", "-q", "-m", msg, "--", rel]); if (c.code !== 0) return { ok: false, why: "commit" };
  let p = G(["push", "origin", "HEAD:main"]); if (p.code !== 0) { G(["pull", "--rebase", "-q", "origin", "main"]); p = G(["push", "origin", "HEAD:main"]); }
  return p.code === 0 ? { ok: true } : { ok: false, why: "push " + p.out };
}

// lane coin sizes, read from the node at file time
async function coinSizes() {
  try {
    const c = await rpcOf(CFG.main_node_url);
    const bag = await to(c.getUtxosByAddresses({ addresses: [keyAddress(0)] }), 60000);
    const m = new Map();
    for (const e of bag.entries || []) { if (e.isCoinbase || BigInt(e.amount) <= 300_000_000n) continue; const t = Math.round(Number(e.amount) / 1e8); m.set(t, (m.get(t) || 0) + 1); }
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  } catch { return null; }
}
const fmt = (n) => Number(n).toLocaleString("en-US");
const med = (a) => { if (!a.length) return "-"; const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };
const p95 = (a) => { if (!a.length) return "-"; const s = [...a].sort((x, y) => x - y); return s[Math.min(s.length - 1, Math.floor(s.length * 0.95))]; };
// (iv) the counter's minutes: the last line per minute in logs/chain-minute.log (a reorg after final writes it again).
function chainRows() {
  const m = new Map(); const f = P("logs", "chain-minute.log"); if (!fs.existsSync(f)) return m;
  for (const l of fs.readFileSync(f, "utf8").split(/\r?\n/)) { const k = l.slice(0, 16); if (!/^\d{4}-\d\d-\d\dT\d\d:\d\d$/.test(k)) continue; const o = { line: l }; for (const kv of l.split(" ").slice(1)) { const i = kv.indexOf("="); if (i > 0) o[kv.slice(0, i)] = kv.slice(i + 1); } m.set(k, o); }
  return m;
}
const COUNT_WAIT_MS = Number(process.env.STORM_COUNT_WAIT_MS || 180000);
async function waitChain(minutes) {   // wait for the counter to finalise these minutes; never fill one in
  const end = Date.now() + COUNT_WAIT_MS; let m = chainRows();
  while (Date.now() < end && !minutes.every((k) => m.get(k)?.final === "1")) { await sleepA(3000); m = chainRows(); }
  return m;
}
const incl = (c) => (c ? Number(c.acc) - Number(c.cb) : null);
const chainCell = (c) => (!c ? "not read" : c.final !== "1" ? "not final" : c.partial === "1" ? "partial" : c.lag === "0" ? "kept pace" : c.lag === "1" ? "LAGGING" : c.lag);
function chainTable(keys, cm) {
  const out = [`| Minute (UTC) | Included, all non-coinbase | Our payments included | ${COHORTS.map(cohHead).join(" | ")} | Other traffic | Chain blocks | DAA gap max | Sink age max, ms | Final after, s | Counter |`, `|---|---:|---:|${COHORTS.map(() => "---:").join("|")}|---:|---:|---:|---:|---:|---|`];
  for (const k of keys) { const c = cm.get(k); if (!c) { out.push(`| ${k} | - | - | ${COHORTS.map(() => "-").join(" | ")} | - | - | - | - | - | not read |`); continue; }
    out.push(`| ${k} | ${fmt(incl(c))} | ${fmt(c.pay)} | ${HK.map((h) => c[h] ?? "-").join(" | ")} | ${fmt(c.other)} | ${c.chain_blocks} | ${c.gap_max} | ${c.sink_age_max_ms} | ${c.late_s} | ${chainCell(c)} |`); }
  return out;
}
// (xii) the probe's samples, per minute (medians of the samples in that minute; counts only)
function probeSamples(files = ["mempool.jsonl"]) {
  const out = [];
  for (const f of files) { const fp = P("logs", f); if (!fs.existsSync(fp)) continue; for (const l of fs.readFileSync(fp, "utf8").split(/\r?\n/)) { try { const r = JSON.parse(l); r.file = f; out.push(r); } catch {} } }
  return out;
}
const medN = (a) => { const v = a.filter((x) => Number.isFinite(x)); if (!v.length) return null; const s0 = [...v].sort((x, y) => x - y); return s0[Math.floor(s0.length / 2)]; };
const dash = (x, d = 0) => (x == null ? "-" : d ? Number(x).toFixed(d) : fmt(Math.round(x)));
function mempoolTable(keys, samples) {
  const by = new Map(); for (const r of samples) { const k = String(r.ts).slice(0, 16); if (!by.has(k)) by.set(k, []); by.get(k).push(r); }
  const pubN = [...new Set(samples.flatMap((r) => Object.keys(r.pub || {})))].sort();
  const out = [`| Minute (UTC) | Samples | Mempool | Ready (no parent in mempool) | Ready mass, blocks of 500k | Other traffic in mempool | Other ready | Other at 100, n | Other at 100, mean mass | Our payments in mempool | Our heavy in mempool / ready | ${COHORTS.map((c) => c[0].toUpperCase() + c.slice(1) + " in mempool / ready").join(" | ")} | Template txs | Template storage mass | Template txs over 100k storage mass | Template: payments | Template: our heavy | ${COHORTS.map((c) => "Template: " + c).join(" | ")} | Template: other | Fee estimate priority / normal / low | ${pubN.map((n) => "Public " + n + " mempool").join(" | ")} |`,
    `|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|${COHORTS.map(() => "---:").join("|")}|---:|---:|---:|---:|---:|${COHORTS.map(() => "---:").join("|")}|---:|---|${pubN.map(() => "---:").join("|")}|`];
  for (const k of keys) {
    const rs = by.get(k) || []; const full = rs.filter((r) => r.n != null); const tp = rs.filter((r) => r.tpl);
    const m = (f, src = full) => medN(src.map(f));
    const o100 = full.map((r) => r.other_fr?.["100"]).filter(Boolean);
    out.push(`| ${k} | ${rs.length}${rs.some((r) => r.entries_skipped) ? " (entries skipped: over the read cap)" : ""} | ${dash(m((r) => r.size, rs))} | ${dash(m((r) => r.ready_n, rs))} | ${dash(m((r) => r.ready_blocks, rs), 2)} | ${dash(m((r) => r.cls?.other?.n))} | ${dash(m((r) => r.cls?.other?.ready))} | ${dash(medN(o100.map((h) => h.n)))} | ${dash(medN(o100.map((h) => (h.n ? h.mass / h.n : null))))} | ${dash(m((r) => r.cls?.pay?.n))} | ${dash(m((r) => r.cls?.heavy?.n))} / ${dash(m((r) => r.cls?.heavy?.ready))} | ${COHORTS.map((c) => `${dash(m((r) => r.cls?.[c]?.n))} / ${dash(m((r) => r.cls?.[c]?.ready))}`).join(" | ")} | ${dash(m((r) => r.tpl.n, tp))} | ${dash(m((r) => r.tpl.mass, tp))} | ${dash(m((r) => r.tpl.heavy, tp))} | ${dash(m((r) => r.tpl.cls?.pay, tp))} | ${dash(m((r) => r.tpl.cls?.heavy, tp))} | ${COHORTS.map((c) => dash(m((r) => r.tpl.cls?.[c], tp))).join(" | ")} | ${dash(m((r) => r.tpl.cls?.other, tp))} | ${[m((r) => r.fee?.priority, rs), m((r) => r.fee?.normal, rs), m((r) => r.fee?.low, rs)].map((x) => dash(x, 1)).join(" / ")} | ${pubN.map((n) => dash(medN(rs.map((r) => r.pub?.[n]?.size)))).join(" | ")} |`);
  }
  return out;
}
const MP_NOTE = "Read by the probe on the desk's private TN10 node every 20 s, read-only; each cell is the median of that minute's samples. Pre-run 17: ready count and ready mass come from the full mempool read up to 10,000 entries and from the node's own figures (getFeeEstimateExperimental, verbose) above that, where the per-class columns stay blank (the node's wRPC replies are capped at 128 MiB, about 12,500 entries). Ready means no parent in the mempool: in rusty-kaspa v2.1.0 only those are in the selector's frontier. Ready mass is compared with one block's mass limit (500,000): at or under 1 the selector takes all ready transactions best-first; over 1 it samples at random weighted by (fee/mass)^3 (over 4, sample_inplace). Mass is the larger of compute and storage mass, as the v2.1.0 selector normalises it (transient mass is not in the RPC). Other traffic is every mempool entry not in our sender logs (our heavy lane is its own class, our heavy); its fee rate is the node's fee over that mass. Template transactions carry no id in the RPC, so each is matched to a mempool entry by its first input. The template is the desk node's own getBlockTemplate (never submitted): what this node would put in a block at that moment, not a miner's template. The fee estimate is the node's getFeeEstimate, read only; no sender reads it. Public mempool is getInfo's mempool size on each kept public kaspad.";
// (xv)+(xvi) the tier table: hops per tier (counter) next to our heavy lane (N, rate, ours in the mempool, ours landed) and the
// outside heavy at 100, with the probe's ready mass
function laneRows() { const m = new Map(); try { for (const l of fs.readFileSync(P("logs", "lane-minute.log"), "utf8").split(/\r?\n/)) { const k0 = l.slice(0, 16); if (!/^\d{4}-\d\d-\d\dT\d\d:\d\d$/.test(k0)) continue; const o = {}; for (const kv of l.split(" ").slice(1)) { const i = kv.indexOf("="); if (i > 0) o[kv.slice(0, i)] = kv.slice(i + 1); } m.set(k0, o); } } catch {} return m; }
function tierTable(keys, cm, samples) {
  const by = new Map(); for (const r of samples) { const k = String(r.ts).slice(0, 16); if (!by.has(k)) by.set(k, []); by.get(k).push(r); }
  const LR = laneRows();
  const out = [`| Minute (UTC) | Lane 1 N / rate | Lane 2 N / rate | ${COHORTS.map((c) => c + " (" + tierOfC(c).rate + ")").join(" | ")} | Our heavy in mempool / ready | Our heavy landed, lane 1 / lane 2 | Lane submits OK, lane 1 / lane 2 | Outside heavy at 100 (>200k mass) / ready | Outside at 100, n | Ready mass, blocks | Mempool | Fee estimate priority |`, `|---|---|---|${COHORTS.map(() => "---:").join("|")}|---:|---:|---:|---:|---:|---:|---:|---:|`];
  for (const k of keys) {
    const c = cm.get(k); const rs = (by.get(k) || []).filter((r) => r.n != null); const sg = segOf(k); const lr = LR.get(k); const rsA = by.get(k) || [];
    const o100 = rs.map((r) => r.other_fr?.["100"]).filter(Boolean);
    out.push(`| ${k} | ${sg.n}${sg.ready ? " R" + sg.ready : ""} / ${sg.duel ? (lr && lr.rate ? lr.rate : "duel") : sg.rate} | ${sg.n2 ?? 0} / ${sg.duel ? (lr && lr.rate2 ? lr.rate2 : "duel") : sg.rate2 ?? sg.rate} | ${HK.map((h) => (c ? c[h] ?? "-" : "-")).join(" | ")} | ${dash(medN(rsA.map((r) => r.cls?.heavy?.n ?? r.cls_light?.heavy?.n)))} / ${dash(medN(rs.map((r) => r.cls?.heavy?.ready)))} | ${c ? `${c.hv1 ?? "-"} / ${c.hv2 ?? "-"}` : "-"} | ${lr ? `${lr.ok1 ?? "-"} / ${lr.ok2 ?? "-"}` : "-"} | ${dash(medN(o100.map((h) => h.heavy)))} / ${dash(medN(o100.map((h) => h.heavy_ready)))} | ${dash(medN(o100.map((h) => h.n)))} | ${dash(medN(rsA.map((r) => r.ready_blocks)), 2)} | ${dash(medN((by.get(k) || []).map((r) => r.size)))} | ${dash(medN((by.get(k) || []).map((r) => r.fee?.priority)), 1)} |`);
  }
  return out;
}
async function renderDesk(step, target, head, mins, extra = []) {
  const cm = await waitChain(mins.map((r) => r.minute));
  readSub(); const L = landed(); const sizes = await coinSizes();
  const t0 = Math.min(...mins.map((r) => Date.parse(r.minute + ":00Z"))), t1 = Math.max(...mins.map((r) => Date.parse(r.minute + ":00Z"))) + 60000;
  const rates = Object.fromEntries(COHORTS.map((c) => [c, new Set()]));
  for (const r of subRows) if (r.ts >= t0 && r.ts < t1) rates[cohortOfFamily(r.family)].add(r.rate);
  const inclOk = mins.filter((r) => { const c = cm.get(r.minute); return c && c.final === "1" && Math.abs(Number(c.pay) - r.ok) <= r.ok * 0.1; }).length;
  const lines = [head, "", NO_PAY ? `Not scored. No payment of ours in pre-run ${RUN_NO}: families only, on the desk's private node, plus our own heavy lane at the N shown per minute.` : `Scored on submit-OK, not on inclusion. Inclusion, reported and not scored: in ${inclOk} of ${mins.length} minutes our payments included (desk counter) were within 10 percent of submit-OK.`, "", `# ${step}, desk, pre-run ${RUN_NO}`, "", "> Our own TN10 testing: what we observed in this run, on our own desk node. Counts only. Included is what the desk's private TN10 node accepted on chain, read by the desk counter, by accepting chain block time. Mini's files are a second read.", ""];
  for (const e of extra) lines.push(e);
  if (extra.length) lines.push("");
  if (NO_PAY) {
    lines.push(`Families offer 1.2 hop/s, ${liveFams.length} families live, one family-sender process and one builder: ${TIER_TXT}. No payment sender was started.`, "");
    lines.push("## Tiers against the mempool, per minute", "", ...tierTable(mins.map((r) => r.minute), cm, probeSamples()), "", "Lane 1 and lane 2 N / rate are the caps the runner set for that minute (N lane chains each, each chain with at most one ready transaction in the mempool) and each lane's fee rate (in the duel, the rate in effect at the start of the minute). Our heavy in mempool / ready is the probe's median count of our own lane entries; our heavy landed is what the desk counter read as accepted on chain from our lane in the minute; lane submits OK is the lane's own log. Hops are what the desk counter read as accepted on chain in that minute, per tier. Ready mass, blocks, is the median of the probe's samples in the minute (block limit 500,000). Outside at 100 is the median count of mempool entries not in our logs (our lane is in our logs) paying 100 sompi/gram, and heavy is how many of those had a mass over 200,000 (median of samples). The outside stream is not attributed to anyone.", "");
  } else {
  lines.push(`Payment offer ${fmt(target)} tx/s at 150 sompi/gram, from ${N} payment senders, ${PER} per kept public node (${kept.length} unique kaspads), each its own process and connection. Families offer 1.2 hop/s, ${liveFams.length} families live, one family-sender process and one builder: ${TIER_TXT} (public map ${pubMapTxt}).`, "");
  lines.push(`Payment pile: ${fmt(PF.pay_pile)} coins on the payment key at the preflight, dealt evenly over the ${N} senders before the first payment${lastDeal ? ` (last deal, ${lastDeal.why}: ${fmt(lastDeal.total)} coins in all, ${lastDeal.counts.map(fmt).join(" / ")}, ${lastDeal.fair ? "even" : "not even"}${lastDeal.truth ? ", from the handoff pools" : ""})` : ""}. A deal never holds more coins than the preflight pile. A coin is re-used about once a second, so one sender's ceiling is about its pool per second.`, "");
  }
  if (!NO_PAY) lines.push("## Submit-OK and included, per minute", "", ...(() => { const o = ["| Minute (UTC) | Pay submit-OK | Our payments included | Included, all non-coinbase | Counter |", "|---|---:|---:|---:|---|"]; for (const r of mins) { const c = cm.get(r.minute); o.push(`| ${r.minute} | ${fmt(r.ok)} | ${c ? fmt(c.pay) : "-"} | ${c ? fmt(incl(c)) : "-"} | ${chainCell(c)} |`); } return o; })(), "", "Submit-OK counts in the minute a submit was answered. Included counts in the minute of the chain block that accepted it, so a payment submitted late in one minute can be included in the next. \"Kept pace\" means the desk node's DAA stayed within 100 of the kept public kaspad and its sink was under 30 s old in every sample of that minute; \"LAGGING\" means it did not, and the count is what the node had accepted, not a network figure.", "");
  lines.push("## Chain, desk counter", "", ...chainTable(mins.map((r) => r.minute), cm), "", "Coinbase is taken out as one per merged blue block (on this node a chain block's accepted list carries the coinbase of each blue block it merges). Other traffic is the rest: other users' load, the genesis, and anything not in our logs.", "");
  lines.push("## Hop rate per cohort, as built", "", COHORTS.map((c) => `${c[0].toUpperCase() + c.slice(1)} (families ${tierOfC(c).from}–${tierOfC(c).to}, ${tierOfC(c).path === "public" ? "kept public kaspads" : "desk private node"}): ${[...rates[c]].join("/") || "no rows"} sompi/gram per hop.`).join(" ") + ` In pre-run ${RUN_NO} that rate is on the hop's node-side mass (kit21): the builder is asked for a bill rate on its own mass so that fee / node mass is the tier's rate.`, "");
  { const sel = (c) => subRows.filter((r) => r.ts >= t0 && r.ts < t1 && r.result === "ok" && cohortOfFamily(r.family) === c && r.node_rate != null);
    const sm = probeSamples().filter((r) => { const ms = Date.parse(r.ts); return ms >= t0 && ms < t1 && r.cls; });
    const mn = (a) => a.reduce((x, y) => (y < x ? y : x), Infinity), mx = (a) => a.reduce((x, y) => (y > x ? y : x), -Infinity);
    lines.push("| Tier | Node rate as built, median (min–max) | Bill rate, median | Node mass, median (min–max) | Node rate in the desk mempool, lowest–highest (probe) |", "|---|---|---:|---|---|");
    for (const c of COHORTS) { const rs = sel(c); const nr = rs.map((r) => r.node_rate), nm = rs.map((r) => r.node_mass); const lo = sm.map((r) => r.cls[c]?.fr_lo).filter((x) => x != null), hi = sm.map((r) => r.cls[c]?.fr_hi).filter((x) => x != null);
      lines.push(`| ${c} (${tierOfC(c).rate}) | ${rs.length ? `${medN(nr)} (${mn(nr)}–${mx(nr)})` : "-"} | ${rs.length ? medN(rs.map((r) => r.bill_rate)) : "-"} | ${rs.length ? `${fmt(medN(nm))} (${fmt(mn(nm))}–${fmt(mx(nm))})` : "-"} | ${lo.length ? `${mn(lo)}–${mx(hi)}` : "-"} |`); }
    lines.push("", "Node rate as built is kit21's fee / node mass (rusty-kaspa v2.1.0 storage mass with UTXO plurality, or compute or transient/2 if larger). In the desk mempool the probe divides the node's fee by the larger of the storage and compute mass the node reports.", ""); }
  if (COHORTS.every((c) => rates[c].size === 1) && new Set(COHORTS.map((c) => [...rates[c]][0])).size === 1) lines.push("Every cohort went out at one rate in these minutes. The fee is not called the cause.", "");
  lines.push("## Funding coins, as read from the desk node", "");
  if (!sizes) lines.push("The coin sizes were not read. No size is given.", "");
  else if (sizes.length === 1) lines.push(`The funding coins were one size: ${fmt(sizes[0][0])} tKAS (${fmt(sizes[0][1])} coins).`, "");
  else lines.push(`The funding coins were not one size. Sizes seen, whole tKAS (coins): ${sizes.slice(0, 12).map(([t, c]) => `${fmt(t)} (${fmt(c)})`).join(", ")}${sizes.length > 12 ? `, and ${sizes.length - 12} more sizes` : ""}. The fee is not called the whole cause.`, "");
  lines.push("## Minutes", "", `| Minute (UTC) | Pay submit-OK | Attempts | Rejects, rate | Rejects, full | Other | ${COHORTS.map((c) => c[0].toUpperCase() + c.slice(1) + " OK / att / rate rej / full rej / waiting").join(" | ")} | Family stalls logged | Family node mempool-high marks | Clean |`, `|---|---:|---:|---:|---:|---:|${COHORTS.map(() => "---").join("|")}|---:|---:|---|`);
  for (const r of mins) lines.push(`| ${r.minute} | ${fmt(r.ok)} | ${fmt(r.att)} | ${r.rrate} | ${r.rfull} | ${r.roth} | ${COHORTS.map((c) => `${r.coh[c].ok} / ${r.coh[c].attempts} / ${r.coh[c].rej_rate} / ${r.coh[c].rej_full} / ${r.coh[c].waiting}`).join(" | ")} | ${r.stalls ?? 0} | ${r.mhigh ?? 0} | ${r.clean ? "yes" : "no: " + r.why} |`);
  lines.push("", "A family stall is a coordinator mark: no hop of that family landed for a while. The family was still attempting. It is logged, and it does not make the minute dirty.");
  lines.push("", `A mempool-high mark means the family node read a mempool at or over 90,000. In pre-run ${RUN_NO} that does not stop the families: the skip does not apply to them. A skip, if one were set, is dirt with its reason (node-skip-fam) for every minute it covers, and it clears when the mempool falls back under the line.`);
  lines.push("", `Within 10 percent means ${fmt(Math.round(target * 60 * 0.9))} to ${fmt(Math.round(target * 60 * 1.1))} submit-OK in the minute.`, "");
  lines.push("## Public nodes (local numbers)", "", `Kept: ${kept.map((x) => x.n).join(", ")}. The family sender reads and submits every tier on the desk's private node, which the desk counter reads. The kept public kaspads are read for sync and DAA only${NO_PAY ? "; no payment of ours went to them" : ""}.`, "", `Kept nodes are unique kaspads: each answered with its own node id at the preflight. ${PF.answered_pass} candidate endpoints passed the check and were ${PF.unique_kaspads} kaspads${(PF.collapsed || []).length ? ` (${PF.collapsed.map((c) => { const [a, b] = c.split("="); return `node ${a} is node ${b}`; }).join(", ")}; the second hostname was not used)` : ""}. ${PER} payment senders per kaspad.${idShift.size ? ` A later sample saw another node id on node ${[...idShift].join(", ")}.` : ""}`, "", "| Node | Synced every sample | Last DAA | Pay submit-OK | Pay rejects | Dropped sockets | Answer ms, median |", "|---:|---|---:|---:|---:|---:|---:|");
  const ph = fs.readFileSync(P("logs", "phase.log"), "utf8").split(/\r?\n/);
  for (const x of kept) {
    const s = mins.flatMap((r) => (marks[r.minute] || {})[x.n] || []);
    const pr = mins.flatMap((r) => r.pr.filter((q) => q.n === x.n));
    const drops = ph.filter((l) => { const ms = Date.parse(l.slice(0, 20)); return ms >= t0 && ms < t1 && new RegExp(`NODE_DROP node=${x.n}\\b`).test(l); }).length;
    lines.push(`| ${x.n} | ${s.length && s.every((q) => q.synced) ? "yes" : "no"} | ${s.length ? s[s.length - 1].daa : "-"} | ${fmt(pr.reduce((a, q) => a + (q.ok || 0), 0))} | ${pr.reduce((a, q) => a + (q.rate || 0) + (q.full || 0) + (q.other || 0), 0)} | ${drops} | ${med(s.map((q) => q.ms))} |`);
  }
  if (!NO_PAY) lines.push("", "## Payment senders", "", "| Sender | Node | Pay submit-OK | Rejects | Minutes with a row |", "|---|---:|---:|---:|---:|");
  for (const x of SENDERS) { const pr = mins.flatMap((r) => r.pr.filter((q) => q.s === x.id)); lines.push(`| ${x.id} | ${x.n} | ${fmt(pr.reduce((a, q) => a + (q.ok || 0), 0))} | ${pr.reduce((a, q) => a + (q.rate || 0) + (q.full || 0) + (q.other || 0), 0)} | ${pr.length} of ${mins.length} |`); }
  lines.push("", "## Hop submit to landing, per cohort", "", "| Cohort | Landed of OK | Median ms | Slow tail (p95) ms |", "|---|---:|---:|---:|");
  for (const c of COHORTS) {
    const ok = subRows.filter((r) => r.ts >= t0 && r.ts < t1 && r.result === "ok" && cohortOfFamily(r.family) === c);
    const dd = ok.filter((r) => L.get(r.txid)).map((r) => L.get(r.txid).ms - r.ts);
    lines.push(`| ${c} | ${dd.length} of ${ok.length} | ${med(dd)} | ${p95(dd)} |`);
  }
  lines.push("", "Landing is the accepting block header time the desk's coordinator read. Waiting is submitted-OK not yet landed at the minute's end. Every tier has the same hop shape and the same node; only the rate differs.", "");
  lines.push("## Mempool and template, desk node (probe)", "", ...mempoolTable(mins.map((r) => r.minute), probeSamples()), "", MP_NOTE, "");
  return lines.join("\n");
}
const onOrigin = {};
async function closeStep(step, target, head, mins, extra) {
  const body = await renderDesk(step, target, head, mins, extra);
  fs.writeFileSync(P("out", `${step}.md`), body);   // the local copy of the count file, before any push
  const r = await publishRetry(`counts/desk/${step}.md`, body, `Desk ${step}: ${head}.`);
  if (!r.ok) { log("GIT_FAIL " + r.why); await fail(`could not push counts/desk/${step}.md after ${GIT_TRIES} tries (${clean(r.why).slice(0, 80)})`); }
  onOrigin[step] = r.ms; log(`PUBLISHED counts/desk/${step}.md ${head} on origin ${isoZ(r.ms)}`);
  return r.ms;
}

const summary = {};
const FROM = "BASE";
// (xvi) pre-run 13: one absolute timeline of whole minutes for our heavy lane; the step files follow it and never stretch it.
const BASE_MIN = PLAN23.base, RET_MIN = PLAN23.ret, SEG = PLAN23.seg;   // (xxvi) pre-run 23   // (xxiv) pre-run 21: 2 and 2
const LANE_PLAN = [   // (xxvii) pre-run 24: no heavy lane at all. The step names are kept for the bot's and Mini's gates; every step is the same combined mix
  { step: "BASE", name: "the combined mix, first stretch: four covenant families at the floor, the KCC-20 mint line (one at a time), no heavy lane", segs: [{ n: 0, n2: 0, rate: 100, rate2: 100, label: "mix", min: BASE_MIN }] },
  { step: "HOLD-1", name: "the combined mix, unchanged", segs: [{ n: 0, n2: 0, rate: 100, rate2: 100, label: "mix", min: SEG }] },
  { step: "HOLD-2", name: "the combined mix, unchanged", segs: [{ n: 0, n2: 0, rate: 100, rate2: 100, label: "mix", min: SEG }] },
  { step: "HOLD-3", name: "the combined mix, unchanged", segs: [{ n: 0, n2: 0, rate: 100, rate2: 100, label: "mix", min: SEG }] },
];
const DRAIN = { n: 0, n2: 0, rate: 100, rate2: 100, label: "N0-drain" };
// (xx) pre-run 17: the lane-against-lane duel controller. Both sides are ours and the same shape (about 266,700 mass, 30
// chains each). Every minute of a duel segment, at :22 or later, it reads the counter's final line for the minute just closed
// (logs/chain-minute.log) and moves two rates:
//   side A = lane 1: metric = lane 1 landed in that minute (hv1) / its HOLD-1 median (minutes 2-12, both at 150);
//   side B = lane 2: metric = lane 2 landed (hv2) / its HOLD-1 median.
// Rule, the same for both: metric under 90 percent -> rate x 1.25 (cap 2,000); at or over 90 percent for 2 minutes in a row
// -> rate x 0.8 (floor 100). A minute that is unread, partial or lag=1 holds both rates (logged).
// Cap guard: if both lanes have sat at 2,000 for 4 decided minutes in a row, the spiral is recorded (CAP_REACHED: minutes
// from the segment start or the last reset, fees so far) and both are put back to 150 (CAP_RESET), so a spiral can be seen
// again and the spend stays bounded. The one-sided segment (asym) starts both at 150 with fresh counters; lane 1 is greedy there:
// it wants 110 percent of its reference (not 90) and never steps down. Lane 2 keeps the normal rule. Every decision goes to logs/duel.log and phase.log (DUEL ...). The rates go to control/LANE-RATE and
// control/LANE2-RATE (read by heavy-lane.mjs each tick). The drain sets both lanes to N=0.
const SOLO = true;   // (xxii) pre-run 19: one lane only; lane 2 is off (N=0), has no reference and never moves
const DUEL = { a: 150, b: 150, floor: 100, cap: 2000, up: 1.25, upGreedy: 2.0, frozenAfter: 2, down: 0.8, tgt: 0.9, tgtGreedy: 1.1, okNeed: 2, capNeed: 4, aOk: 0, bOk: 0, capRun: 0, refA: null, refB: null, done: new Set(), snap: new Set(), n: 0, seg: null, segAt0: 0, resetAt: 0, asym: false };
const DLOG = P("logs", "duel.log");
const dlog = (s) => { try { fs.appendFileSync(DLOG, isoZ() + " " + s + "\n"); } catch {} phase("DUEL " + s); };
const setRates = () => { fs.writeFileSync(P("control", "LANE-RATE"), DUEL.a + "\n"); fs.writeFileSync(P("control", "LANE2-RATE"), DUEL.b + "\n"); };
const dMed = (a) => { const s = [...a].sort((x, y) => x - y); return s.length ? (s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2) : null; };
const dGood = (o) => !!o && o.final === "1" && o.partial !== "1" && o.lag !== "1";
const laneFees = () => { try { const t = JSON.parse(fs.readFileSync(P("private", "heavy-total.json"), "utf8")); return `fees1_tkas=${(t.lane1?.fees_tkas ?? 0).toFixed(2)} fees2_tkas=${(t.lane2?.fees_tkas ?? 0).toFixed(2)}`; } catch { return "fees=-"; } };
function cmRead() { const m = new Map(); try { for (const l of fs.readFileSync(P("logs", "chain-minute.log"), "utf8").split(/\r?\n/)) { const k0 = l.slice(0, 16); if (!/^\d{4}-\d\d-\d\dT\d\d:\d\d$/.test(k0)) continue; const o = {}; for (const kv of l.split(" ").slice(1)) { const i = kv.indexOf("="); if (i > 0) o[kv.slice(0, i)] = kv.slice(i + 1); } m.set(k0, o); } } catch {} return m; }
function duelSeg(sg) {   // called by laneSet when a duel segment starts
  if (DUEL.seg === null || !!sg.asym !== DUEL.asym) { DUEL.a = sg.start ?? 150;   // (xxiv) pre-run 21: the cap test starts at sg.start (600)
      // (xxi) pre-run 18: reset only when the rule changes (greedy-1 -> greedy-2 continues)
    DUEL.b = 150; DUEL.aOk = 0; DUEL.bOk = 0; DUEL.capRun = 0; DUEL.segAt0 = Date.now(); DUEL.resetAt = Date.now(); }
  DUEL.asym = !!sg.asym; DUEL.seg = sg.label;
  dlog(`SEG ${sg.label} start a=${DUEL.a} b=${DUEL.b} asym=${DUEL.asym ? 1 : 0} ${laneFees()}`);
}
function duelTick() {
  try {
    const now = Date.now(), sec = (now % 60000) / 1000, curK = mkey(now), prevK = mkey(now - 60000);
    if (!DUEL.snap.has(curK)) { DUEL.snap.add(curK); let e = "-", l = "-"; try { e = fs.readFileSync(P("control", "LANE-RATE"), "utf8").trim(); } catch {} try { l = fs.readFileSync(P("control", "LANE2-RATE"), "utf8").trim(); } catch {} try { fs.appendFileSync(DLOG, `${isoZ()} SNAP min=${curK}Z seg=${(segAt.get(curK) || {}).label || "-"} lane1=${e} lane2=${l}\n`); } catch {} }
    if (sec < 22 || DUEL.done.has(prevK)) return;
    const cur = segAt.get(curK); if (!cur || !cur.duel) return;
    const prevSeg = segAt.get(prevK); if (!prevSeg || !prevSeg.duel) { DUEL.done.add(prevK); return; }   // the minute before the duel is the reference's
    if (!!prevSeg.asym !== !!cur.asym) { DUEL.done.add(prevK); dlog(`HOLD min=${prevK}Z reason=segment-change a=${DUEL.a} b=${DUEL.b}`); return; }   // the last symmetric minute does not move the one-sided segment
    const cm = cmRead();
    const h1 = stepKeys["HOLD-1"] || [], h1k = h1.length > 1 ? h1.slice(1) : h1;
    if (DUEL.refA == null || (!SOLO && DUEL.refB == null)) { const g = h1k.map((k) => cm.get(k)).filter(dGood); if (g.length && g.length >= Math.min(6, Math.max(1, h1k.length - 1))) { DUEL.refA = dMed(g.map((o) => Number(o.hv1))); DUEL.refB = dMed(g.map((o) => Number(o.hv2))); dlog(`REF lane1_landed=${DUEL.refA} lane2_landed=${DUEL.refB} from=${g.length}`); } }
    const o = cm.get(prevK);
    if (!dGood(o) && sec < 55) return;
    DUEL.done.add(prevK);
    if (DUEL.refA == null || !(DUEL.refA > 0) || (!SOLO && (DUEL.refB == null || !(DUEL.refB > 0)))) { dlog(`HOLD min=${prevK}Z reason=no-ref a=${DUEL.a} b=${DUEL.b}`); return; }
    if (!dGood(o)) { dlog(`HOLD min=${prevK}Z reason=${!o ? "unread" : o.final !== "1" ? "not-final" : o.partial === "1" ? "partial" : "lag"} a=${DUEL.a} b=${DUEL.b}`); return; }
    { let st = null; try { st = JSON.parse(fs.readFileSync(P("private", "heavy-total.json"), "utf8")).stopped || null; } catch {}   // (xxiii) pre-run 20: a stopped lane freezes the rate (no paper rates)
      if (st) { if (!DUEL.frozen) { DUEL.frozen = String(st); dlog(`FROZEN min=${prevK}Z reason=lane-stopped:${String(st).replace(/[^a-z0-9:_-]/gi, "").slice(0, 40)} a=${DUEL.a} b=${DUEL.b} ${laneFees()}`); } else dlog(`HOLD min=${prevK}Z reason=lane-stopped a=${DUEL.a} b=${DUEL.b}`); return; } }
    const h1v = Number(o.hv1), h2v = Number(o.hv2), mA = h1v / DUEL.refA, mB = SOLO ? NaN : h2v / DUEL.refB, a0 = DUEL.a, b0 = DUEL.b;
    const move = (r, okk, m, noDown, tgt = DUEL.tgt) => { if (m < tgt) { DUEL[r] = Math.min(DUEL.cap, Math.round(DUEL[r] * (noDown ? DUEL.upGreedy : DUEL.up))); DUEL[okk] = 0; } else if (++DUEL[okk] >= DUEL.okNeed) { if (!noDown) DUEL[r] = Math.max(DUEL.floor, Math.round(DUEL[r] * DUEL.down)); DUEL[okk] = 0; } };
    move("a", "aOk", mA, DUEL.asym, DUEL.asym ? DUEL.tgtGreedy : DUEL.tgt); if (!SOLO) move("b", "bOk", mB, false);
    let extra = "";
    if (a0 >= DUEL.cap && b0 >= DUEL.cap) DUEL.capRun++; else DUEL.capRun = 0;
    if (a0 >= DUEL.cap) DUEL.capRunA = (DUEL.capRunA || 0) + 1; else DUEL.capRunA = 0;   // (xxi) pre-run 18: the greedy side alone at the cap
    if (DUEL.capRunA >= DUEL.capNeed && DUEL.capRun < DUEL.capNeed) { dlog(`CAP_REACHED side=a min=${prevK}Z a_at_cap_min=${DUEL.capRunA} since_start_min=${Math.round((now - DUEL.resetAt) / 60000)} b=${DUEL.b} ${laneFees()}`); DUEL.capRun = DUEL.capNeed; }
    if (DUEL.capRun >= DUEL.capNeed) { DUEL.capRunA = 0; dlog(`CAP_REACHED min=${prevK}Z both_at_cap_min=${DUEL.capRun} since_start_min=${Math.round((now - DUEL.resetAt) / 60000)} ${laneFees()}`); DUEL.a = 150; DUEL.b = 150; DUEL.aOk = 0; DUEL.bOk = 0; DUEL.capRun = 0; DUEL.resetAt = now; extra = " cap_reset=1"; }
    if (extra) { DUEL.capResets = (DUEL.capResets || 0) + 1; DUEL.sinceReset = 0; }   // (xxiv) pre-run 21: after the cap reset, let the rule re-climb for frozenAfter decisions, then lower the lane's fee cap on purpose (FROZEN_ARM) so the lane stops and FROZEN must hold the rate
    else if (DUEL.capResets) { DUEL.sinceReset++; if (DUEL.sinceReset >= DUEL.frozenAfter && !DUEL.frozenArmed) { DUEL.frozenArmed = 1; let f = 0; try { f = Number(JSON.parse(fs.readFileSync(P("private", "heavy-total.json"), "utf8")).fees_tkas) || 0; } catch {} const capTo = Math.ceil(f) + 20; try { fs.writeFileSync(P("control", "LANE-CAP-FEES"), capTo + "\n"); } catch {} dlog(`FROZEN_ARM min=${prevK}Z lane_fee_cap_to=${capTo} after_reset_decisions=${DUEL.sinceReset} ${laneFees()}`); } }
    setRates(); DUEL.n++;
    dlog(`MIN min=${prevK}Z seg=${prevSeg.label} a_hv1=${h1v} a_pct=${(100 * mA).toFixed(0)} b_hv2=${h2v} b_pct=${SOLO ? "-" : (100 * mB).toFixed(0)} a_rate=${a0}->${DUEL.a} b_rate=${b0}->${DUEL.b}${extra} share1=${h1v + h2v ? ((100 * h1v) / (h1v + h2v)).toFixed(1) : "-"} ${COHORTS.map((c) => c + "_pf=" + (Number(o["h_" + c]) / (tierOfC(c).to - tierOfC(c).from + 1)).toFixed(1)).join(" ")} other=${o.other} cb=${o.cb} ${laneFees()}`);
  } catch (e) { dlog("ERROR " + String(e?.message || e).replace(/[0-9a-f]{64}/gi, "<h>").slice(0, 120)); }
}
setInterval(duelTick, 2000);
const segAt = new Map(); const stepKeys = {};
let laneT = Math.ceil((Date.now() + 30000) / 60000) * 60000;
const laneSet = (sg) => { try { if (sg.duel) { duelSeg(sg); setRates(); } else { fs.writeFileSync(P("control", "LANE-RATE"), sg.rate + "\n"); fs.writeFileSync(P("control", "LANE2-RATE"), (sg.rate2 ?? sg.rate) + "\n"); } fs.writeFileSync(P("control", "LANE-PERMIN"), (sg.permin ?? 1200) + "\n"); fs.writeFileSync(P("control", "LANE-READY"), (sg.ready ?? 0) + "\n"); fs.writeFileSync(P("control", "LANE-N"), sg.n + "\n"); fs.writeFileSync(P("control", "LANE2-N"), (sg.n2 ?? 0) + "\n"); } catch {} phase(`LANE_SET permin=${sg.permin ?? 1200} ready=${sg.ready ?? 0} n=${sg.n} rate=${sg.duel ? "duel:" + DUEL.a : sg.rate} n2=${sg.n2 ?? 0} rate2=${sg.duel ? "duel:" + DUEL.b : sg.rate2 ?? sg.rate} seg=${sg.label}`); };
for (const st of LANE_PLAN) { stepKeys[st.step] = []; for (const sg of st.segs) { const at = laneT; setTimeout(() => laneSet(sg), Math.max(0, at - Date.now() - 300)); for (let i = 0; i < sg.min; i++) { const k0 = mkey(laneT + i * 60000); segAt.set(k0, sg); stepKeys[st.step].push(k0); } laneT += sg.min * 60000; } }
const drainAt = laneT; setTimeout(() => laneSet(DRAIN), Math.max(0, drainAt - Date.now() - 300));
// (xxvi) pre-run 23: the families must outlive RETURN. RETURN ends about (pin wait <= 8) + RET_MIN minutes after the drain starts.
{ const need = drainAt + (8 + RET_MIN + 2) * 60000; const ok = FAM_END_MS >= need ? 1 : 0;
  log(`FAMILY_END_CHECK fam_end=${isoZ(FAM_END_MS)} return_end_latest=${isoZ(need)} ok=${ok}`);
  if (!ok) await fail("the families' end time is before RETURN's latest end; stopped before the lane, nothing sent"); }
const segOf = (k0) => segAt.get(k0) || (Date.parse(k0 + ":00Z") >= drainAt ? DRAIN : { n: 0, n2: 0, rate: 100, rate2: 100, label: "pre" });
log(`LANE_PLAN ${LANE_PLAN.map((st) => st.step + ":" + st.segs.map((g) => g.label + "x" + g.min).join("+")).join(" ")} then N0-drain from ${isoZ(drainAt)}`);

// (xxv) pre-run 22: a connectivity guard on its own timer (pre-run 21 was void: the desk and the Mini lost internet for about
// 8 minutes, the lane could not reach its node, and the minute checks waited behind stuck pushes). Every 10 s it looks at the
// last minute that closed at least 25 s ago. While the plan has the lane running (N > 0) and the lane has not stopped on a cap
// or guard and is not held, a minute is "dark" if the lane logged no minute, or got no submit accepted, or none of its
// transactions landed on the desk counter (a counter row that is not there yet is not counted either way). Two dark minutes
// in a row: the runner stops everything (no sends) and publishes FAILED (local file first, then origin with retries).
const CONN = { dark: 0, last: "", stopped: false };
setInterval(() => { try {
  if (failing || stopping || CONN.stopped) return;
  const k0 = mkey(Date.now() - 85000); if (k0 === CONN.last) return; CONN.last = k0;
  const sg = segOf(k0);
  if (!(Number(sg.n) > 0)) {   // (xxvii) pre-run 24: no lane, so the guard reads the floor families: a minute with a final counter row and 0 floor hops landed is dark
    if (sg.label === "pre") { CONN.dark = 0; return; }
    const cm0 = cmRead().get(k0); if (!cm0) return;
    const why0 = Number(cm0.h_floor) === 0 ? "landed-floor=0" : "";
    if (!why0) { CONN.dark = 0; return; }
    CONN.dark++; phase(`CONN_GUARD dark min=${k0} why=${why0} n=0 dark=${CONN.dark}`);
    if (CONN.dark >= 2) fail(`connectivity guard: 2 dark minutes in a row with no floor family hop landed (last ${k0}); stopped`).catch(() => process.exit(6));
    return;
  }
  const lr = laneRows().get(k0);
  if (lr && lr.stopped && lr.stopped !== "-") { CONN.stopped = true; log("CONN_GUARD off lane_stopped=" + lr.stopped); return; }
  if (lr && (Number(lr.held) > 0 || Number(lr.paused) > 0)) { log(`CONN_GUARD skip min=${k0} held=${lr.held} paused=${lr.paused}`); return; }
  const cm = cmRead().get(k0);
  const why = !lr ? "no-lane-row" : Number(lr.ok1) === 0 ? "lane-ok1=0" : (cm && Number(cm.hv1) === 0) ? "landed-hv1=0" : "";
  if (!why) { CONN.dark = 0; return; }
  CONN.dark++; phase(`CONN_GUARD dark min=${k0} why=${why} n=${sg.n} dark=${CONN.dark}`);
  if (CONN.dark >= 2) fail(`connectivity guard: 2 dark minutes in a row while the lane was due (last ${k0}, ${why}); stopped, nothing sent`).catch(() => process.exit(6));
} catch (e) { log("CONN_GUARD error " + clean(e?.message || e)); } }, 10000);
async function observeKeys(step, keys) { const mins = []; for (const minute of keys) { await waitMinuteClosed(minute); mins.push(evalMinute(step, 0, minute)); } return { head: "OBSERVATION", mins, repaired: false }; }
async function observe(step, target, nMin) {
  const first = Math.ceil((Date.now() + 30000) / 60000) * 60000; const keys = []; for (let i = 0; i < nMin; i++) keys.push(mkey(first + i * 60000));
  return observeKeys(step, keys);
}
let firstStart = true;
for (const st of LANE_PLAN) {
  phase(`STEP ${st.step} offer=0 name=${st.name.replace(/\s+/g, "_")}`);
  const s = await observeKeys(st.step, stepKeys[st.step]); summary[st.step] = s;
  await closeStep(st.step, 0, "OBSERVATION", s.mins, [`${st.step} in pre-run ${RUN_NO} is ${st.name}: ${st.segs.map((g) => `${g.label} ${g.min} whole minutes`).join(", ")}. The combined mix of pre-run 24: four covenant families at the floor (100, node mass), the KCC-20 mint line (family 5, one mint at a time; MINT.md has its rows), no heavy lane and no payment of ours. The tic-tac-toe guest carrier did not run (no runner on disk). The HOLD file names are kept so the bot's and Mini's gates read as in earlier pre-runs. Not scored.`]);
}
// HOLD-4: the pinned minute, lane N=0 (drain), families only
const h3 = onOrigin["HOLD-3"]; const pin = Math.ceil((h3 + 180000) / 60000) * 60000; const pinKey = mkey(pin);
log("HOLD4 pinned minute " + pinKey + "Z");
phase(`STEP HOLD-4 offer=0`);
while (Date.now() < pin - 45000) await sleep(1000);
await waitMinuteClosed(pinKey);
const h4 = evalMinute("HOLD-4", 0, pinKey);
const synced4 = kept.every((x) => ((marks[pinKey] || {})[x.n] || []).every((q) => q.synced) && ((marks[pinKey] || {})[x.n] || []).length);
phase(`STEP RETURN offer=0`);
await closeStep("HOLD-4", 0, "OBSERVATION", [h4], [`The pinned minute is the first whole UTC minute whose start is at least 3 minutes after HOLD-3's On origin time. In pre-run ${RUN_NO} the desk offered no payment in it and there was no heavy lane. The bot sends in it only on a free distinct public kaspad (REVIEW-01 change 3).`].concat(synced4 ? [] : ["The path was not synced in this minute."]));
summary["HOLD-4"] = { head: "OBSERVATION", mins: [h4] };
const ret = await observe("RETURN", 0, RET_MIN); summary.RETURN = ret;
log(`FAMILY_END_CHECK at_return_close now=${isoZ()} fam_end=${isoZ(FAM_END_MS)} ok=${Date.now() < FAM_END_MS ? 1 : 0}`);   // (xxvi) pre-run 23
await closeStep("RETURN", 0, "OBSERVATION", ret.mins, [`RETURN is the same mix (families and, if it has not reached its cap, the mint line), no heavy lane, ${RET_MIN} whole minutes, the last stretch before the families stop. Not scored.`]);
await stopAll("return-closed");

// (iv) the drain tail: payments and families are stopped; the counter reads 5 more minutes, then stops, and the timeline
// of every minute it read goes to counts/chain/TIMELINE.md.
const TAIL_MS = Number(process.env.STORM_COUNT_TAIL_MS || 300000);
phase("COUNT_TAIL start minutes=" + Math.round(TAIL_MS / 60000));
await sleepA(TAIL_MS);
{ const last = mkey(Date.now() - 60000); await waitChain([last]); }
fs.writeFileSync(P("control", "COUNTER-STOP"), "tail-done\n"); fs.writeFileSync(P("control", "PROBE-STOP"), "tail-done\n");
{ const e = Date.now() + 60000; while (Date.now() < e && kids.has("counter") && alive(kids.get("counter").pid)) await sleepA(1000); if (kids.has("counter") && alive(kids.get("counter").pid)) { try { kids.get("counter").kill(); } catch {} } }
phase("COUNT_TAIL end");
const stepStarts = fs.readFileSync(P("logs", "phase.log"), "utf8").split(/\r?\n/).map((l) => { const m = l.match(/^(\S+) STEP (\S+) offer=(\d+)/); return m ? { ms: Date.parse(m[1]), step: m[2], offer: Number(m[3]) } : null; }).filter(Boolean);
const tailAt = (() => { const l = fs.readFileSync(P("logs", "phase.log"), "utf8").split(/\r?\n/).find((x) => /RUN_STOP reason=return-closed/.test(x)); return l ? Date.parse(l.slice(0, 20)) : Date.now(); })();
const stepOf = (k) => { const ms = Date.parse(k + ":00Z"); if (ms >= tailAt - 59999) return "tail"; let s = "families"; for (const x of stepStarts) if (ms >= x.ms - 59999) s = x.step; return s; };
const CM = chainRows();
const scoredSet = new Set(Object.values(summary).flatMap((x) => x.mins.map((r) => r.minute)));
const okBy = new Map(results.map((r) => [r.minute, r.ok]));
{
  const keys = [...CM.keys()].sort();
  const t = ["> **Experimental. We are just trying this.** [Disclaimer](../../DISCLAIMER.md) · Kaspa Testnet-10 only; tKAS has no value. Counts only.", "", `# Chain timeline, pre-run ${RUN_NO}`, "",
    "Every minute the desk counter read, from its start to the end of the 5-minute tail after RETURN. Read on the desk's private TN10 node, by accepting chain block header time. Submit-OK is the desk sender log for scored minutes (a dash where the runner did not score the minute). A minute marked LAGGING, partial, or not final is what the node had accepted at that point, not a network figure. Nothing is filled in.", "",
    `| Minute (UTC) | Step (lane) | Scored | Pay submit-OK | Our payments included | Our heavy landed | ${COHORTS.map(cohHead).join(" | ")} | Other traffic | Included, all non-coinbase | Chain blocks | DAA gap max | Sink age max, ms | Counter |`,
    `|---|---|---|---:|---:|---:|${COHORTS.map(() => "---:").join("|")}|---:|---:|---:|---:|---:|---|`];
  for (const k of keys) { const c = CM.get(k); t.push(`| ${k} | ${stepOf(k)} (${segOf(k).label}) | ${scoredSet.has(k) ? "yes" : ""} | ${okBy.has(k) ? fmt(okBy.get(k)) : "-"} | ${fmt(c.pay)} | ${c.hv ?? "-"} | ${HK.map((h) => c[h] ?? "-").join(" | ")} | ${fmt(c.other)} | ${fmt(incl(c))} | ${c.chain_blocks} | ${c.gap_max} | ${c.sink_age_max_ms} | ${chainCell(c)} |`); }
  const tot = { pay: 0, hv: 0, ...Object.fromEntries(HK.map((h) => [h, 0])) }; for (const c of CM.values()) for (const k of Object.keys(tot)) tot[k] += Number(c[k]) || 0;
  let payOk = 0; for (const s0 of fs.readdirSync(P("private"))) if (/^paytx-[\d.]+\.txt$/.test(s0)) payOk += fs.readFileSync(P("private", s0), "utf8").split("\n").filter(Boolean).length;
  t.push("", `Whole run, as read: our payments submit-OK ${fmt(payOk)}, of which included by the end of the tail ${fmt(tot.pay)} (${payOk ? ((100 * tot.pay) / payOk).toFixed(1) : "-"} percent). Family hops included: ${COHORTS.map((c) => `${c} ${fmt(tot["h_" + c])}`).join(", ")}. Our heavy-lane transactions included: ${fmt(tot.hv)}.`, "");
  const body = t.join("\n");
  fs.writeFileSync(P("out", "TIMELINE.md"), body);
  const r = await publishRetry("counts/chain/TIMELINE.md", body, "Desk counter: chain timeline.");
  log(r.ok ? "PUBLISHED counts/chain/TIMELINE.md" : "GIT_FAIL TIMELINE " + r.why);
  if (r.ok) onOrigin["chain/TIMELINE"] = r.ms;
}

// (xii) counts/chain/MEMPOOL.md: every minute the probe read, the pre-open read first (if one was made), then the run.
{
  const pre = probeSamples(["mempool-preopen.jsonl"]), runS = probeSamples(["mempool.jsonl"]);
  const keysOf = (a) => [...new Set(a.map((r) => String(r.ts).slice(0, 16)))].sort();
  const t = ["> **Experimental. We are just trying this.** [Disclaimer](../../DISCLAIMER.md) · Kaspa Testnet-10 only; tKAS has no value. Counts only.", "", "> **Our own testing.** What this page shows is what our probe read on our own desk node in this run; it is not a claim of how TN10 behaves in general.", "", `# Mempool and template timeline, pre-run ${RUN_NO}`, "", MP_NOTE, ""];
  if (pre.length) t.push("## Before the open (probe started by hand, same code)", "", ...mempoolTable(keysOf(pre), pre), "");
  t.push("## The run", "", "Step is the runner's step at the minute's start (see TIMELINE.md).", "", ...mempoolTable(keysOf(runS), runS).map((l, i) => (i < 2 ? l.replace(/^\| Minute \(UTC\) \|/, "| Minute (UTC) | Step |").replace(/^\|---\|/, "|---|---|") : l.replace(/^\| (\S+) \|/, (x, k) => `| ${k} | ${stepOf(k)} |`))), "");
  const body = t.join("\n");
  fs.writeFileSync(P("out", "MEMPOOL.md"), body);
  const r = await publishRetry("counts/chain/MEMPOOL.md", body, "Desk probe: mempool and template timeline.");
  log(r.ok ? "PUBLISHED counts/chain/MEMPOOL.md" : "GIT_FAIL MEMPOOL " + r.why);
  if (r.ok) onOrigin["chain/MEMPOOL"] = r.ms;
}
// (xxvii) pre-run 24: counts/desk/MINT.md (the KCC-20 mint line) and counts/desk/TARGET.md (the three-part target read from
// the desk's own logs: one covenant hop, one KCC-20 mint and one guest carrier accepted on the desk node in the open window).
{
  const rows = []; try { for (const l of fs.readFileSync(P("private", "submit-mint.jsonl"), "utf8").split("\n")) { try { rows.push(JSON.parse(l)); } catch {} } } catch {}
  let tot = null; try { tot = JSON.parse(fs.readFileSync(P("private", "mint-total.json"), "utf8")); } catch {}
  const ok = rows.filter((r) => r.result === "ok"), acc = rows.filter((r) => r.result === "accepted"), rj = rows.filter((r) => r.result === "rejected"), tmo = rows.filter((r) => r.result === "accept_timeout"), bf = rows.filter((r) => r.result === "build_fail");
  const ms = acc.map((r) => Number(r.accept_ms)).filter(Number.isFinite).sort((x, y) => x - y); const med = ms.length ? ms[Math.floor(ms.length / 2)] : null;
  const fees = ok.reduce((x, r) => x + Number(r.fee || 0), 0) / 1e8; const nr = ok.map((r) => Number(r.node_rate)).filter(Number.isFinite); const nm = ok.map((r) => Number(r.node_mass)).filter(Number.isFinite);
  const rjTxt = [...new Set(rj.map((r) => clean(String(r.reason || "")).slice(0, 160)))];
  const accSteps = {}; for (const r of acc) { const k = String(r.ts).slice(0, 16); const st = stepOf(k); accSteps[st] = (accSteps[st] || 0) + 1; }
  const L = landed(); const famAcc = [...L.values()].filter((v) => Number(v.family) >= 1 && Number(v.family) <= SENDER_FAMILIES);
  const openMs = originMs("logs/PRE-RUN-OPEN.md"); const endMs = Date.now();
  const inWin = (t) => Number.isFinite(t) && (!openMs || t >= openMs) && t <= endMs;
  const hopIn = famAcc.filter((v) => inWin(v.ms)).length; const mintIn = acc.filter((r) => inWin(Date.parse(r.ts))).length;
  const m = ["> **Experimental. We are just trying this.** [Disclaimer](../../DISCLAIMER.md) · Kaspa Testnet-10 only; tKAS has no value. Counts only. No id, txid or address in this file.", "", `# KCC-20 mint line, pre-run ${RUN_NO}`, "",
    "One fresh KCC-20 public-mint launch (family 5 in the hash file; a launch name not used before). One mint at a time: the line builds one mint at the floor rate on the node's own mass, submits it to the desk's private node, and waits until the node shows the next minter (the mint accepted on the virtual chain) before the next one, then 15 s. Cap 30 accepted mints. A reject is kept with the node's text; the fee is not raised.", "",
    `- Mints submitted OK: ${ok.length}; accepted (next minter seen on the desk node): ${acc.length}; rejected: ${rj.length}; accept timeouts (120 s): ${tmo.length}; build failures: ${bf.length}.`,
    `- Accept time, submit to next minter seen: ${ms.length ? `min ${ms[0]} ms, median ${med} ms, max ${ms[ms.length - 1]} ms` : "-"}.`,
    `- Node rate (fee / node mass): ${nr.length ? `${Math.min(...nr)}–${Math.max(...nr)}` : "-"}; node mass ${nm.length ? `${Math.min(...nm)}–${Math.max(...nm)}` : "-"}; fees ${fees.toFixed(4)} tKAS in all.`,
    `- Accepted mints by step: ${Object.entries(accSteps).map(([k, v]) => `${k} ${v}`).join(", ") || "-"}.`,
    `- End state: ${tot ? tot.stopped : "not read"}.`, "",
    rjTxt.length ? "Node reject texts, as returned (ids removed):" : "No reject text.", "", ...rjTxt.map((t) => "- `" + t.replace(/`/g, "'") + "`"), ""].join("\n");
  const r1 = await publishRetry("counts/desk/MINT.md", m, "Desk: KCC-20 mint line.");
  log(r1.ok ? `PUBLISHED counts/desk/MINT.md accepted=${acc.length}` : "GIT_FAIL MINT " + r1.why);
  let rot = []; try { rot = fs.readFileSync(P("logs", "rotation.jsonl"), "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l)); } catch {}
  const rotChecked = rot.reduce((x, r) => x + (r.accepted_checked || 0), 0), rotStill = rot.reduce((x, r) => x + (r.still_in_mempool || 0), 0);
  const t = ["> **Experimental. We are just trying this.** [Disclaimer](../../DISCLAIMER.md) · Kaspa Testnet-10 only. Counts only.", "", `# Target, pre-run ${RUN_NO} (desk's own read)`, "",
    `Open window: from logs/PRE-RUN-OPEN.md on origin (${openMs ? isoZ(openMs) : "not read"}) to this file (${isoZ(endMs)}). Accepted = the desk node's own read (coordinator accepting-header time for the family hops; next minter seen for the mints).`, "",
    "| Line | Accepted on the desk node in the window | Met |", "|---|---:|---|",
    `| Covenant hop (families 1–4, floor) | ${fmt(hopIn)} | ${hopIn > 0 ? "met" : "not met"} |`,
    `| KCC-20 mint (family 5, one at a time, cap 30) | ${fmt(mintIn)} | ${mintIn > 0 ? "met" : "not met"} |`,
    "| Tic-tac-toe guest carrier | 0 (not run) | not met: no tic-tac-toe runner or guest build on disk on the desk, the Mini or the bot's machine; the plan says do not compile it tonight |", "",
    "The combined three-part target is therefore **not met** in this run, whatever the first two lines say (plan card 24: the guest line missing is not a pass of the combined target).", "",
    `Issue #1146 rotation sample (rot24.mjs, our own accepted ids, 60 s or more after acceptance, asked one at a time on the same node): ${rot.length} samples, ${rotChecked} ids checked, ${rotStill} still listed in the mempool.`, ""].join("\n");
  const r2 = await publishRetry("counts/desk/TARGET.md", t, "Desk: pre-run target read.");
  log(r2.ok ? `PUBLISHED counts/desk/TARGET.md hop=${hopIn} mint=${mintIn} guest=0 rot_checked=${rotChecked} rot_still=${rotStill}` : "GIT_FAIL TARGET " + r2.why);
}
// METHOD.md
{
  readSub(); const L = landed();
  const landedBy = Object.fromEntries(COHORTS.map((c) => [c, 0])); for (const [, v] of L) landedBy[cohortOfFamily(v.family)]++;
  const decent = ["BASE", "HOLD-1", "HOLD-2", "HOLD-3", "HOLD-4", "RETURN"].every((k) => onOrigin[k]);
  const sizes = await coinSizes();
  const sumOf = (mins, k) => mins.reduce((a, r) => a + (Number(CM.get(r.minute)?.[k]) || 0), 0);
  const lagN = (mins) => mins.filter((r) => { const c = CM.get(r.minute); return !c || c.final !== "1" || c.partial === "1" || c.lag !== "0"; }).length;
  const m = [`# Method, pre-run ${RUN_NO}`, "", "> This is our own Kaspa Testnet-10 testing. What follows is what we observed in this run, on our own nodes; it is not a claim of how TN10 or Kaspa behave in general.", "", "> Counts only. Desk side. Submit-OK is the desk sender log; included is the desk counter's read of what the desk's private TN10 node accepted on chain. Mini's files are a second read.", "",
    `Steps (our own heavy lane on one absolute timeline): ${LANE_PLAN.map((st) => st.step + " = " + st.segs.map((g) => g.label + " " + g.min + " min").join(", ")).join("; ")}; then N0-drain through the HOLD-4 minute and RETURN ${RET_MIN} min, then a 5-minute counter tail.`, "", (() => { try { const h = JSON.parse(fs.readFileSync(P("private", "heavy-total.json"), "utf8")); return `Our heavy lane, from its own log: ${fmt(h.ok)} transactions submitted OK of ${fmt(h.submits)}, ${h.rej} rejected, ${h.lost} chains lost to an orphan timeout, ${fmt(Math.round(h.fees_tkas))} tKAS of fees and ${fmt(Math.round(h.parked_tkas))} tKAS parked on our own sink key, ${h.coins_taken} payment-pile coins taken, stop state ${h.stopped || "none"}.`; } catch { return "Our heavy lane's totals were not read."; } })(), "",
    `Accepted hops per cohort, as the desk's coordinator read them: ${COHORTS.map((c) => `${c} ${fmt(landedBy[c])}`).join(", ")}.`, "",
    "Per step (all OBSERVATION, families plus our own heavy lane, no payment of ours):", "",
    ...["BASE", "HOLD-1", "HOLD-2", "HOLD-3", "HOLD-4", "RETURN"].map((s0) => `- ${s0}: ${summary[s0].head}${summary[s0].head === "MET" ? " on submit-OK" : ""}, submit-OK ${summary[s0].mins.map((r) => fmt(r.ok)).join(" / ")}; our payments included ${summary[s0].mins.map((r) => (CM.get(r.minute) ? fmt(CM.get(r.minute).pay) : "-")).join(" / ")}; hops included ${COHORTS.join("/")} ${HK.map((h) => sumOf(summary[s0].mins, h)).join("/")}; counter minutes not kept-pace ${lagN(summary[s0].mins)} of ${summary[s0].mins.length}.`), "",
    decent ? "Decent on the desk side: every step file reached origin." : "Short of decent: a step file did not reach origin.", "",
    "## Selection rule, read before the run", "",
    "The desk node and the kept public kaspads answered serverVersion 2.1.0 at the preflight. In rusty-kaspa tag v2.1.0 (commit 01b532e8b553523216471682649693af92f0fd16), `mining/src/mempool/model/frontier.rs` `build_selector` takes every ready transaction best-first while the ready set's mass fits one block, and otherwise samples at random with weight (fee/mass)^3 (`ALPHA = 3` in `mining/src/mempool/model/frontier/selectors.rs`, weight in `mining/src/mempool/model/frontier/feerate_key.rs`): `sample_inplace` above four blocks' mass, `MutatingTreeSelector` between one and four. Only a transaction with no parent in the mempool is in the ready set (`mining/src/mempool/model/transactions_pool.rs`), so a chained hop is not a candidate until its parent is out of the mempool. Against an outside stream at 100, the weights are 1.00 (100), 3.38 (150), 27.0 (300) and 91.1 (450), per unit of mass. In the duel our two lanes move between 100 and 2,000 (logs/duel.log, published after the run). A higher fee raises the odds; it does not buy a place in a queue. This is the source's rule, read from the code; the run does not see a miner's template.", "",
    `Hop rates per hop, one builder: ${TIER_TXT}. Payments 150. ` + (sizes && sizes.length > 1 ? "The funding coins were not one size, so the fee is not called the whole cause." : "") + ` Every tier was read and submitted on the desk's private TN10 node, which also ran the counter. No payment sender was started; ${kept.length} unique public kaspads were read for sync only.`, "",
    "## Misses", "", ...Object.entries(summary).filter(([, s0]) => s0.head === "NOT MET").map(([k]) => `- ${k} NOT MET.`), Object.values(summary).some((s0) => s0.head === "NOT MET") ? "" : "- none", "",
    "## Fixes", "", ...(fixes.length ? fixes.map((f) => `- ${f.z} ${f.step}: ${f.change}.`) : ["- none"]), "",
    "## On origin", "", ...Object.entries(onOrigin).map(([k, v]) => `- counts/${k.includes("/") ? k : "desk/" + k}.md: ${isoZ(v)}`), ""];
  const r = await publishRetry("logs/METHOD.md", m.join("\n"), `Pre-run ${RUN_NO} method.`);
  log(r.ok ? "PUBLISHED logs/METHOD.md" : "GIT_FAIL " + r.why);
}
log("RUN end");
process.exit(0);
