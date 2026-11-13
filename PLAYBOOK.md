> **Experimental. We are just trying this.** [Disclaimer](DISCLAIMER.md) · Kaspa Testnet-10 only; tKAS has no value.
>
> **This is the playbook for pre-run 24.** It is not Wednesday. It is not Tuesday. It is not pre-run 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, or 23. It does not start a machine and it does not arm one.

# Playbook

Who does what, and the gates before each machine may start. The plan is [plan/PLAN.md](plan/PLAN.md), the locks are [locks/LOCKED.md](locks/LOCKED.md), and the go files are the three GO pages. This page does not override them.

## Oversight

TN10 ops oversees this pre-run end to end: Mini, the desk (Build), and the bot. TN10 only. Never mainnet, never the desk devnet. Do not edit the Tuesday repo, the Wednesday repo, or pre-run 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, or 23's go files. Do not write `REVIEW_CLOSED`.

## Start gates

1. **Disk floor.** Desk and Mini at least 100 GB free, box at least 20 GB, read just before the open.
2. **Mini node synced.** Existing TN10 kaspad, existing data, no wipe. Synced, DAA moving.
3. **Desk node synced.** Existing private TN10 kaspad, existing data, loopback only, started with `pwsh`. No wipe. Synced, DAA moving.
4. **No other runner.** Key 0 passes `BUDGET_CHECK`. The private candidate list is present.
5. **Hashes.** `hashes/SIXTEEN.md` with five rows and an On origin line.
6. **Rehearsal.** The offline rehearsal passed on the final files.
7. **Open.** The desk pushes `logs/PRE-RUN-OPEN.md`. Mini then pushes `logs/MINI-ARMED.md`.
8. **Counter, families, mint line.** The desk runner starts the probe and the counter, then the genesis, the families, the mint line and the rotation sampler.

## Who does what

| Who | Role | What not to do |
|---|---|---|
| **Desk (Build)** | Sends the four families (kit25, one builder, one sender process) and runs the mint line and the read-only rotation sampler. Counts on its private node (counter and probe). Publishes the hashes, `PRE-RUN-OPEN`, `counts/desk/`, `counts/chain/`, `logs/METHOD.md`. | Do not stop or wipe the desk node; do not touch `serve.mjs` or its keeper. No heavy lane, no payment sender, no compile, no second runner. Keys 1 and 2 untouched. |
| **Mini** | Second chain read on its own node. Does not send, mine, or hold a key. | Do not wipe. |
| **Bot (TN10 ops)** | Payments in the HOLD-4 minute only, on a free synced public kaspad (at most 60, one at a time, 150 sompi/gram), or a legal `NO SEND`. | No other step. One waiter. No raw-address node. |

## Status when this repo was opened

Not a gate. Read on 2026-11-13 between 20:40Z and 21:20Z. This is our own TN10 testing; status lines are what we read on our own machines.

- **Pre-run 23 is closed** ([repo](https://github.com/STP-KAS/tn10-storm-2026-11-11-prerun-23), lock 26a2b63). Nothing of pre-run 23 is running on the desk, the Mini or the bot's machine.
- **Disk floor, written before the open.** Free space read at about 21:05Z: desk about 318 GB, Mini about 294 GB, box about 102 GB. Floor: **desk 100 GB, Mini 100 GB, box 20 GB**. Why: in our notes, two disk incidents (26 Sep and 3 Oct) came from node data growing on a near-full disk, and the TN10 node data here is roughly 90 GB; 100 GB keeps more than a full copy of node data free on each node machine. The box keeps only logs and repos. The plan starts at four families instead of sixteen for the same reason.
- Mini: existing TN10 kaspad up since 11 Nov, no wipe. Desk: existing private TN10 kaspad up with `pwsh`, no wipe, not stopped for this pre-run; `serve.mjs` and its keeper not touched. Box: no local TN10 node.
- **Funding (a logged step, REVIEW-01).** From our own mining wallet to key 0: 53 coins of 1,000 tKAS in one transaction at 20:56:36Z, fee 0.035 tKAS. **53,000 tKAS**, about 10 times the plan's 5,300 cap (the minimum was 15,900). Recorded privately.
- **Genesis and mint coins** from key 0 at 21:04:40Z (one coin a transaction, 9 transactions, none rejected): one fresh genesis coin each to keys 3, 4 and 5 (families 2–4) and to key 6 (the KCC-20 launch); 5 coins of about 23 tKAS to key 7 (the mint line's own key). Family 1 uses key 0. Keys 1 and 2 are not touched.
- **BUDGET_CHECK** (`budget21.mjs`, read-only, after the funding): key 0 **137,611 usable tKAS**, **3,930 coins over 3 tKAS**, projected end **107,211** at 760 tKAS a planned family minute over 40 minutes (the runner repeats it with this run's 25): over 26,000 and over 2,500 coins: **ok**. No split was needed.
- **Bot free check, once, read-only, 20:58:02Z.** The public node REVIEW-01 added as a candidate answered synced, DAA moving, with a node id distinct from the desk's kept nodes and from our own: it is the one free node. Names that timed out were left out of the active list and logged privately. Nodes known only by a raw address are read-only. The bot's sender is capped at 60 payments, one at a time, and reads its coins from a kept node, not from the free node.
- **Guest:** no built tic-tac-toe runner or guest binary found on the desk, the Mini or the box. Not compiled (plan: no compile tonight). The guest line is `not met`.
- Known risks, not fixed mid-run: first public mints in this series on today's binaries; one run, short steps; the outside heavy stream may be there (we do not attribute it).

## Offline rehearsal, recorded before `PRE-RUN-OPEN`

REHEARSAL_PLACEHOLDER

## Status after the live run

AFTER_PLACEHOLDER

## When something breaks

Append a worked fix to [locks/LOCKED.md](locks/LOCKED.md) and a repair line to `logs/FIXES.md`. If the run dies before RETURN, write `logs/FAILED.md`, stop every runner, waiter and counter, and do not resume. The next attempt is a new repo that starts from this repo's lock file.
