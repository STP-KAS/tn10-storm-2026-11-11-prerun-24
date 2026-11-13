> **Experimental. We are just trying this.** [Disclaimer](../DISCLAIMER.md) · This page does not start a machine. Pre-run 24. Not Wednesday. Not Tuesday. Not pre-run 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, or 23.

# Targets

The source is the pre-run 24 card in [tn10-target-plan plan/PLAN.md](https://github.com/STP-KAS/tn10-target-plan/blob/main/plan/PLAN.md), with section P (REVIEW-01) binding. There is no T0 and no public clock. Every step is an observation of whole minutes.

**Question.** Can a covenant hop, a KCC-20 mint and one tic-tac-toe carrier be in flight together, at a rate the covenant path has already survived, and each land at least once on the desk node?

**Target (three parts, same window):** at least one accepted covenant hop, one accepted mint, and one accepted guest carrier, on the desk node, between `PRE-RUN-OPEN` and the end of RETURN. Retry count 0.

## Order

1. **Disk floor** written and read (desk and Mini 100 GB free, box 20 GB).
2. **Nodes live.** Both TN10 nodes synced, DAA moving. No wipe.
3. **Funding** from our own mining wallet as a logged step; `BUDGET_CHECK`.
4. **Hashes first.** [hashes/SIXTEEN.md](../hashes/README.md): five rows and an On origin line.
5. **Offline rehearsal** on the final files, then `PRE-RUN-OPEN`, then `MINI-ARMED`.
6. **Genesis** of five covenants from the bundle; the four families start (1.2 hop/s offered); the mint line starts; the rotation sampler starts. The guest carrier is not started (see below).

| Order | File | What runs | Length |
|---:|---|---|---|
| 1 | BASE | families 1–4 at 100, the mint line | 3 whole minutes |
| 2 | HOLD-1 | the same | 3 whole minutes |
| 3 | HOLD-2 | the same | 3 whole minutes |
| 4 | HOLD-3 | the same | 3 whole minutes |
| 5 | HOLD-4 | the same; the bot sends only on a free public kaspad, or files `NO SEND` | the pinned minute |
| 6 | RETURN | the same (the mint line may have reached its cap) | 3 whole minutes |
| 7 | tail | families stopped, the counter reads on | 5 minutes |

The four HOLD names are kept so the bot's and Mini's gates read as before; nothing changes between them on purpose. Planned family minutes: 25.

## Cohorts

| Cohort | Families | Rate, sompi/gram of node mass | What |
|---|---|---:|---|
| floor | 1–4 | 100, fixed | covenant families, one hop per transaction, the family sender |
| kcc | 5 | 100, fixed | the fresh KCC-20 launch; each hop is one public mint, sent by the mint line one at a time |

A covenant hop is about 41,600 node mass. kit24 is unchanged except that the sender takes its family count from `family-fees.mjs` ([tools/kit25](../tools/kit25/kit25-family-count.patch)) and only hops families 1–4.

## The mint line

`tools/kit25/mint24.mjs`: reads family 5's state from the coordinator, builds the next public mint with the same builder (priced on the node's mass at 100), submits it to the desk's private node, and waits until the coordinator shows the next minter whose id is that mint's (up to 120 s). Then 15 s, then the next. Cap 30 accepted. At most 90 tries. Each result is logged (`ok`, `accepted`, `rejected` with the node's text, `accept_timeout`, `build_fail`). Spend cap in the plan: 200 tKAS. A reject that is the cap or an already-spent minter is a result, not a retry; "script units exceeded" goes to the plan's #1073 card, not to a higher fee.

## The guest carrier

The plan allows one deposit or one turn only through a tic-tac-toe runner already built on disk, and forbids a compile tonight. Before this repo we looked on the desk, the Mini and the box for a built runner or guest binary and found none. The line is `not met`, reason `no-tic-tac-toe-runner-on-disk`. So the combined target cannot be met in this pre-run; the hop and the mint are still measured. A next attempt at the same three-part target needs a runner built on another day, under its own review.

## Mempool rotation (core tag 1, issue #1146)

`tools/desk/rot24.mjs` (read-only): every 60 s, up to 40 of our own ids accepted 1 to 10 minutes earlier (per the coordinator's accept read), each asked once with `getMempoolEntry`. Pass for a sample: none is still listed. No full mempool dump above 10,000 entries.

## Prediction, written before the run

- **Covenant hops:** we expect every one of the four floor families to land hops in every minute, as in pre-runs 14–23 at 100 on a quiet desk mempool (the desk mempool read 0 entries at 21:13Z). About 1.2 hops a second offered; landings close to that.
- **Mints:** our best guess (about 75 percent) is that the mint line reaches 30 accepted within about 15 minutes, one every 20–30 s (15 s gap plus a few seconds to accept). A reject with the node's script text is the main risk, because this is the first public mint on today's binaries in this series.
- **Guest:** not met (no runner on disk).
- **Rotation:** we expect no accepted id still listed in the 60-second samples, with this light load.
- **Bot:** the free check before the open found one free public kaspad, so a HOLD-4 file with up to 60 payments is possible; if that node is gone or not distinct at the minute, `NO SEND no-free-node`.
- **Cost:** about 4 floor families × 1.2 hop/s share × 0.042 tKAS a hop: under 100 tKAS for the families over the run, a few tKAS for the mints, far under the 5,300 planning cap.
