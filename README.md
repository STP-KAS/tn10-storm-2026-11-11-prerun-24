> **Experimental. We are just trying this.** [Disclaimer](DISCLAIMER.md) · Kaspa Testnet-10 only; tKAS has no value.
>
> **This is a pre-run. Pre-run 24.** It is not the Wednesday run. It is not the Tuesday run. is not pre-run 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, or 23. A read does not start a runner.

# tn10-storm-2026-11-11-prerun-24

**Pre-run 24 of the Wednesday neuron.** The neuron stays [tn10-storm-2026-11-11](https://github.com/STP-KAS/tn10-storm-2026-11-11). This repo does not edit that repo, does not write `REVIEW_CLOSED`, and does not set or move a clock for it. [tn10-storm-2026-11-10](https://github.com/STP-KAS/tn10-storm-2026-11-10) (Tuesday) is not edited from here either.

> **Our own testing.** This is our own Kaspa Testnet-10 testing, run on our own machines and nodes. What these pages report is what we observed in this run; it is not a claim of how TN10 or Kaspa behave in general.

| Field | Value |
|---|---|
| Target | one covenant hop, one KCC-20 mint and one tic-tac-toe guest carrier, each accepted on the desk node in the same open window ([target plan](https://github.com/STP-KAS/tn10-target-plan/blob/main/plan/PLAN.md), pre-run 24 card) |
| Met or not met | **not met** (combined). Covenant hop met (6,678 accepted on the desk node); KCC-20 mint met (30 of 30); guest carrier not met (no tic-tac-toe runner on disk, no compile tonight). [logs/LESSONS.md](logs/LESSONS.md) |
| Retry count | 0 (first attempt at this target; retries nothing) |
| Core tags | 1 (mempool rotation, issue #1146: 910 of our accepted ids sampled 60 s apart, 0 still listed; light load only) |
| Status | done (22:55–23:27 Brussels, 21:55:45Z–22:27:14Z) |

**Where this starts.** Pre-runs 1 to 23 are in [tn-master](https://github.com/STP-KAS/tn-master); pre-run 21 was void. The index is the [pre-run 2 README](https://github.com/STP-KAS/tn10-storm-2026-11-11-prerun-2#pre-runs-in-this-rehearsal). This repo starts from [pre-run 23's locks/LOCKED.md](https://github.com/STP-KAS/tn10-storm-2026-11-11-prerun-23/blob/26a2b63/locks/LOCKED.md) at commit 26a2b63, copied here as [locks/LOCKED.md](locks/LOCKED.md), with a pre-run 24 section added at the end.

**Result, in one line (our own reading):** with four covenant families at the floor and one fresh KCC-20 launch in one window, the desk node accepted 6,678 covenant hops and 30 of 30 mints (0 rejected); the guest carrier was not run because no runner was built on disk, so the combined target is not met. The bot filed `NO SEND suspend` (late, a box-side stall). Mini read every minute with the same counts.

## What pre-run 24 tries: the combined whole, modest

Pre-runs 13 to 23 tested covenant families alone, often next to our own heavy lane. The target plan asks a different first question: **can a covenant hop, a KCC-20 mint and one tic-tac-toe carrier be in flight together, at a rate the covenant path has already survived, and each land at least once on the desk node?** The bar is the combination, not the speed.

- **Four covenant families, not sixteen,** at the node-mass floor (100 sompi/gram of the hop's node-side mass, kit24's floor tier, unchanged), all on the desk's private node, offered 1.2 hops a second as before.
- **One fresh KCC-20 launch** (a launch name this desk has not used before), with a **mint line: one public mint at a time**, each waiting for its accept before the next, 15 s apart, **cap 30**. The launch is family 5 in `hashes/SIXTEEN.md` (the file keeps its name; it has five rows this time), so the counters see the mints as their own cohort (`kcc`). The family sender hops only families 1–4.
- **The tic-tac-toe carrier is not run.** The plan allows it only through a runner already built on disk, and forbids a compile tonight. We looked on the desk, the Mini and the box before this repo and found no built runner, so the guest line is **not met**, with that reason, and the combined target is **not met** by design. The other two lines are still measured.
- **No heavy lane, no greedy rule, no payment flood.** Our own heavy lane is not started in this pre-run.
- **Mempool rotation (core tag 1).** Every 60 s a read-only sampler asks the desk node for up to 40 of our own ids that the chain accepted 1 to 10 minutes earlier; an accepted id still listed in the mempool would be the shape issue #1146 reported. No full dump over 10,000 entries.
- **Funds and budget.** 53,000 tKAS came from our own mining wallet to key 0 as one logged step (about 10 times the plan's 5,300 cap). `BUDGET_CHECK` (key 0 projected at least 26,000 usable at the end, at least 2,500 coins over 3 tKAS) passed before genesis; figures in [PLAYBOOK.md](PLAYBOOK.md#status-when-this-repo-was-opened).
- **Disk floor, written before the open:** desk and Mini 100 GB free, box 20 GB. Below that, nothing starts. Reasons in the playbook.
- **The bot.** It waits for the desk's HOLD-3 file and sends in the pinned HOLD-4 minute only if its free check finds a synced public kaspad outside the desk's set; then at most 60 payments, one at a time, at a normal rate. Otherwise `NO SEND`. Nodes found only by raw address are read, never sent to.
- **Steps on one timeline, as before:** BASE, HOLD-1, HOLD-2, HOLD-3 (3 minutes each, the same mix in all four; the names are kept so the bot's and Mini's gates read as before), the pinned HOLD-4 minute, RETURN (3 minutes), then the counter's 5-minute tail. All are `OBSERVATION`.

The prediction, written before the run, is in [plan/PLAN.md](plan/PLAN.md#prediction-written-before-the-run).

All locked lines from earlier pre-runs stay, except where the pre-run 24 block in [locks/LOCKED.md](locks/LOCKED.md) says what changes and why.

## Machines

| Machine | Go file | First sentence |
|---|---|---|
| Desk | [GO-DESK.md](GO-DESK.md) | DESK. I send and count on pre-run 24. This is not Wednesday. |
| Mini | [GO-MINI.md](GO-MINI.md) | MINI. I count pre-run 24 as the second read. I do not send. This is not Wednesday. |
| Bot | [GO-BOT.md](GO-BOT.md) | GROKBOT. I send payments on the pre-run 24 HOLD-4 only. I do not count. This is not Wednesday. |

For pre-run 24 the operator does not paste. TN10 ops wrote a target plan for pre-runs 24 to 30 ([STP-KAS/tn10-target-plan](https://github.com/STP-KAS/tn10-target-plan), plan/PLAN.md) and reviewed it on 13 Nov 2026 (reviews/REVIEW-01.md, approved with changes; plan section P is binding). That plan said no run would be armed before 23:30 Brussels time. At 21:45 Brussels time on 13 Nov 2026 the operator wrote in chat "Yes just arm for the sake of good", and at 21:47 confirmed full authority on the box, the desk and the Mini, with every hard limit kept. That is the arm for pre-run 24. The agents start the runners once the gates are facts. A sentence in chat still does not write `PRE-RUN-OPEN`: the desk runner writes it after its gates. [GO.md](GO.md) is the map, [PLAYBOOK.md](PLAYBOOK.md) has the roles and gates, and [plan/PLAN.md](plan/PLAN.md) has the targets and the reasons.

## Gates, in order

No clock. Each gate is a fact read from a node or from origin.

1. Disk floor held: desk and Mini at least 100 GB free, box at least 20 GB.
2. Mini's TN10 node is up from its own data, synced, DAA moving.
3. The desk's private TN10 node is up from its own data (PowerShell 7), synced, DAA moving.
4. No other runner or waiter is up. Key 0 passes `BUDGET_CHECK`. The desk's private candidate list is present.
5. `hashes/SIXTEEN.md` is on origin: five rows (four families and the KCC-20 launch) and an On origin line.
6. The offline rehearsal passed on the final files.
7. The desk pushes `logs/PRE-RUN-OPEN.md`; Mini pushes `logs/MINI-ARMED.md`.
8. The probe and the desk counter are up. Then the genesis, the families, the mint line, the rotation sampler and the steps.

## What a decent result is

- `hashes/SIXTEEN.md` on origin before the first family submit.
- At least one covenant hop accepted in the window, at least one mint accepted (or a reject with the node's own text, kept), and the guest line honestly `not met` with its reason.
- Every step file on origin, with the floor families' hops and the `kcc` mints per minute and the probe's table; `counts/desk/MINT.md` and `counts/desk/TARGET.md`; `counts/chain/TIMELINE.md` and `MEMPOOL.md` after the tail; RETURN on origin.
- A HOLD-4 desk file, a bot file or a legal `NO SEND`, and a Mini file.
- The rotation sample's totals, the spend and the funding step stated in the write-up.
- No id, txid, key, address, host, or port in this repo.

A miss stays in this repo. A next attempt is a new repo and starts from this repo's lock file.

**Part of [tn-master](https://github.com/STP-KAS/tn-master).** The rule is [docs/NEURON.md](https://github.com/STP-KAS/tn-master/blob/main/docs/NEURON.md). This pre-run is its own row. It is not row 47.
