> **Experimental. We are just trying this.** [Disclaimer](DISCLAIMER.md) · Kaspa Testnet-10 only; tKAS has no value.
>
> **Paste this on the desk only.** This is **pre-run 24**, repo `tn10-storm-2026-11-11-prerun-24`. It is not Wednesday. It is not Tuesday. It is not pre-run 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, or 23. Mini's file is [GO-MINI.md](GO-MINI.md). The bot's file is [GO-BOT.md](GO-BOT.md).
>
> **This paste has no clock. It sends only when the gates below are true, hashes first.**

# YOU ARE THE DESK

Your first sentence is exactly this:

**DESK. I send and count on pre-run 24. This is not Wednesday.**

If the operator says this machine is Mini, or the bot, stop. Do not start a runner.

You send the four covenant families and run the KCC-20 mint line in [plan/PLAN.md](plan/PLAN.md). Pre-run 24 has no payment offer and no heavy lane. Your private TN10 node also counts what the chain accepted: the runner starts the counter (`tools/desk/counter.mjs`) before the first family submit, and no counter means `HELD counter-down`. Mini is a second read. The bot may send payments in the HOLD-4 minute only. You do not edit the Wednesday or Tuesday repos, you do not rewrite pre-run 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, or 23's go files, you do not write `REVIEW_CLOSED`, and you do not stop the desk node process.

## Your node

The existing private TN10 kaspad on this desk, loopback only, on its existing data. If it is down, start it from that data with **PowerShell 7 (`pwsh`)**, never Windows PowerShell 5.1. Do not wipe. Do not switch the binary. Do not start `KaspaPublicNode`. Leave the desk devnet alone. This pre-run does not stop the desk node process, `serve.mjs` or its keeper.

## The gate

Stop, and do not start a runner, if any one of these is true:

- The disk floor does not hold (desk under 100 GB free, Mini under 100 GB, box under 20 GB).
- Mini's TN10 node is not synced with DAA moving.
- Your own TN10 node is not up, not synced, or its DAA is not moving.
- Another runner or waiter is in the process list.
- Key 0 fails `BUDGET_CHECK` (projected end under 26,000 usable tKAS, or under 2,500 coins over 3 tKAS).
- The desk's private candidate list is missing or empty.
- No five-row hash path.

Say `HELD` and the reason (`disk-floor`, `mini-not-synced`, `desk-node-down`, `other-runner`, `lane-held`, `candidates-missing`, `no-sixteen-hash-path`). When the gate is open, this read may start one runner. It publishes [logs/PRE-RUN-OPEN.md](logs/README.md): one line, `PRE_RUN_OPEN` and the UTC time. A second runner is a fault.

Before the first family submit, the runner checks each public node in the local config (version, synced, DAA, UTXO index, answer time, node id). A node is a kaspad, not a hostname: two hostnames with one node id are one node. Names and ids stay in the local log.

## Hashes first

Read [locks/LOCKED.md](locks/LOCKED.md) first. One genesis. Five hashes in [hashes/SIXTEEN.md](hashes/README.md) before the first family submit (the file keeps its name). Rows: families 1–4 (cohort `floor`) and family 5 (cohort `kcc`, the fresh KCC-20 launch). Each row is the family label, the cohort, and the sha256 of the lowercase hex covenant id. The id stays off the repo. Published once with `tools/sixteen/sixteen.ps1 -Mode publish`; the genesis is submitted from the private bundle that wrote it (`tools/sixteen/submit-sixteen.mjs`). No On origin line, no send. Do not invent a hash.

## Targets

- **Families 1–4:** fixed 100 sompi per gram of the hop's node-side mass (kit24's floor, unchanged), on the desk's private node, offered 1.2 hops a second by one family-sender process and one builder. `FEE_SPLIT` and `FAMILY_PATH` are logged once.
- **The KCC-20 mint line** (`tools/kit25/mint24.mjs`, a kid of the runner): family 5's public mint, one at a time, waiting for the accept, 15 s gap, cap 30, priced on the node's mass at 100, on the desk's private node, from its own funding key. A reject keeps the node's text and is not retried blindly.
- **The guest carrier:** not started. No built tic-tac-toe runner was found on disk; no compile tonight. The runner logs `GUEST not-started` with that reason.
- **The rotation sampler** (`tools/desk/rot24.mjs`, read-only): every 60 s, up to 40 of our own accepted ids, one `getMempoolEntry` each. No full dump.
- **Steps:** BASE, HOLD-1, HOLD-2, HOLD-3 (3 whole minutes each, the same mix), the pinned HOLD-4 minute, RETURN (3 minutes), the counter's 5-minute tail. The HOLD-4 minute is the first whole UTC minute starting at least 3 minutes after the HOLD-3 file's On origin time. Do not wait for the bot.

## What you publish

One file under [counts/desk/](counts/desk/README.md) when each step closes (a minute not yet final is written `not final`, never guessed); after RETURN, `counts/desk/MINT.md`, `counts/desk/TARGET.md`, `counts/chain/TIMELINE.md`, `counts/chain/MEMPOOL.md` and `logs/METHOD.md`. Git by its full path, one commit per file, retry the fetch and push once. If the run dies before RETURN, write `logs/FAILED.md` and do not resume.

The family lane's abort line stays **18,000 usable tKAS**. Do not print a balance.

## What you refuse

- Sending before the gate is true, or before `hashes/SIXTEEN.md` has an On origin line.
- Starting a payment sender or a heavy lane; a greedy rule; a flood.
- Compiling or building the tic-tac-toe guest, or any ELF.
- Relaunching a KCC-20 name or family this desk has already launched.
- Touching keys 1 and 2.
- Stopping the desk node, `serve.mjs` or its keeper; deleting chain data; switching the binary; a miner; the desk devnet.
- A second runner. Restarting the runner mid-run. A live run of a runner that has not passed the offline rehearsal.
