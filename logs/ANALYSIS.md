> **Experimental. We are just trying this.** [Disclaimer](../DISCLAIMER.md) · Kaspa Testnet-10 only; tKAS has no value. Counts only.
>
> This is our own TN10 testing. What follows is what we observed in this run, on our own nodes; it is not a claim of how TN10 or Kaspa behave in general.

# Analysis, pre-run 24

Window: `PRE-RUN-OPEN` on origin 2026-11-13T21:55:45Z to the runner's end 22:27:14Z (22:55–23:27 Brussels). `MINI-ARMED` 21:56:58Z. Genesis 5 of 5 at 21:58:40Z. Sources: the step files, `counts/desk/MINT.md`, `counts/desk/TARGET.md`, `logs/METHOD.md`, Mini's files, and the desk's private submit, mint and rotation logs (read after the run; counts only here).

## The three lines

| Line | What we observed | Met |
|---|---|---|
| Covenant hop (families 1–4, 100 on node mass) | 6,678 hops accepted on the desk node in the window (coordinator read); the family sender logged 6,682 submit-OK | met |
| KCC-20 mint (family 5, one at a time, cap 30) | 30 of 30 accepted, 30 tries, 0 rejected, 0 accept timeouts, 21:58:48Z–22:06:27Z | met |
| Tic-tac-toe guest carrier | not run: no built runner on disk; no compile tonight | not met |
| Combined (all three in one window) | the guest line is missing | **not met** |

The hop and the mint were in flight together from 21:58:48Z to 22:06:27Z, both accepted on the desk node in BASE and HOLD-1 (and two mints in HOLD-2).

## Per step (desk counter; Mini read the same numbers)

| Step | Minutes | floor hops | kcc mints | Counter kept pace | Mini |
|---|---:|---:|---:|---|---|
| BASE | 3 | 889 | 11 | 3 of 3 | READ 3 of 3, 889 / 11 |
| HOLD-1 | 3 | 890 | 12 | 3 of 3 | READ 3 of 3, 890 / 12 |
| HOLD-2 | 3 | 949 | 2 | 3 of 3 | READ 3 of 3, 949 / 2 |
| HOLD-3 | 3 | 924 | 0 | 3 of 3 | READ 3 of 3, 924 / 0 |
| HOLD-4 (22:16) | 1 | 294 | 0 | 1 of 1 | READ 1 of 1, 294 / 0 |
| RETURN | 3 | 866 | 0 | 3 of 3 | READ 3 of 3, 866 / 0 |

Every runner minute was clean. The floor families landed about 290–320 hops a minute in every minute (about 1.2 offered a second, about 72 a minute a family), with the mint line on and after it had stopped; we did not see the mints change the families' rate, but 30 mints in about 8 minutes is a very light load. Five mints landed before BASE's first minute, so 25 fall inside the step minutes and 30 in the window.

Mini's own read, per minute: 3,507–3,778 accepted non-coinbase transactions, so our hops were under a tenth of what the node accepted. Mini also counts 62–86 a minute "unlabeled" covenant-shaped hops that match none of our five hashes; we do not know whose they are and do not attribute them.

## The mint line

Submit to "next minter seen" on the desk node: min 501 ms, median 1,017 ms, max 1,032 ms (the line polls every 500 ms, so this is a coarse read of when the node's view moved on, not a block inclusion time). Node rate 100.01–100.30, node mass 40,378–41,071 per mint, 1.22 tKAS of fees for the 30. No reject text to keep. The plan's spend cap for the mint side was 200 tKAS.

## Family submits

8,730 submit rows: 6,682 OK, 1,007 rejected as already spent and 1,041 as orphan. Node rate on the OK rows 100.00–100.32. The rejects are the family sender racing its own chained hops (a hop built on a parent the node had not yet accepted, or one already spent by a newer hop); they cost nothing on chain. We did not compare that share with earlier pre-runs in this write-up.

## Mempool rotation (core tag 1, issue #1146)

24 samples, 60 s apart, 21:58:48Z–22:21:49Z: 910 of our own ids accepted 1 to 10 minutes earlier, each asked once with `getMempoolEntry` on the desk node: **0 still listed**, 0 read errors (the node answers "not found" for an id that has left). The desk mempool held 0–12 entries at the samples. Under this light load we did not see the shape #1146 reported. That says nothing about heavier load.

## The bot

`NO SEND suspend`. The free check, when it ran, found one free node (the public node REVIEW-01 added as a candidate: synced, DAA moving, a kaspad distinct from the desk's kept nodes and our own), but it ran at 22:16:31Z, 31 s into the pinned minute, so the bot did not send. Why it was late: the waiter read the desk's HOLD-3 (On origin 22:12:22Z) only at 22:16:27Z, 245 s later. Its log shows two fetches from origin that took 77 s (22:02Z, rc 124) and 321 s (ending 22:08:30Z, rc 128) although each is wrapped in a 20 s timeout with a 5 s kill, and then no line until 22:16:27Z. The box's kernel log shows "virtual machine fork" events in that period, so our best guess is that the box itself was paused or snapshotted for minutes; that is not proven. The first version of the bot file said `no-free-node`, which was wrong; it was corrected in commit 02b89ba.

## Spend

- Funding before the run (logged): 53,000 tKAS from our own mining wallet to key 0 (one transaction, 0.035 tKAS fee); 9 coin transactions from key 0 to keys 3–7 (about 0.022 tKAS of fees).
- In the run: family hop fees 274.67 tKAS; mint fees 1.22 tKAS; genesis 5 transactions at 200 on the builder's mass.
- Key 0 after the run (`budget21.mjs`, read-only, 22:30Z): 130,587 usable tKAS (3,666 coins over 3 tKAS), from 137,430 before; coins under 3 tKAS rose from 1,874 to 2,129. The drop is more than the fees. Closed after the run: each hop pays a 1 tKAS token output (reference builder `TOKEN`), so 6,682 hops account for about 6,682 tKAS of it (see LESSONS item 9). Still far over the 26,000 line.
