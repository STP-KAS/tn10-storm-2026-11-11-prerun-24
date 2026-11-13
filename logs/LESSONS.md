> **Experimental. We are just trying this.** [Disclaimer](../DISCLAIMER.md) · Kaspa Testnet-10 only; tKAS has no value. Counts only.
>
> This is our own TN10 testing. What follows is what we observed in this run, on our own nodes; it is not a claim of how TN10 or Kaspa behave in general.

# Lessons, pre-run 24

> **Correction (2026-11-13, after the run):** we wrote that no tic-tac-toe runner or guest binary was on the desk, the Mini or the box. That was not quite right. Binaries from our 26 Sep retest (`ttd`, `ttflow` and a guest ELF, built then against vprogs `bcebf59`) were on the box under a path we did not look in. What did not exist yet was a runner kit to drive them inside a pre-run with its gates. So the guest line was still not run and stays `not met`, but the reason is "no runner kit yet", not "nothing on disk". We are sorry for the imprecise line.

| Field | Value |
|---|---|
| Target | one covenant hop, one KCC-20 mint and one tic-tac-toe guest carrier accepted on the desk node in the same open window |
| Met or not met | **not met** (combined). Covenant hop: met (6,678). KCC-20 mint: met (30 of 30). Guest carrier: not met (no runner on disk; no compile tonight) |
| Retry count | 0 (first attempt; retries nothing) |
| Core tags | 1 (#1146 rotation: 0 of 910 accepted ids still listed, light load) |
| Status | done |

1. **A covenant family and a KCC-20 mint line ran together on today's binaries and both landed.** Four floor families at 100 on node mass landed 290–320 hops a minute in every minute while a fresh KCC-20 launch minted 30 of 30, one at a time, with no reject. This is a very light load (30 mints in about 8 minutes) and one run.
2. **The guest line cannot be met without a runner built on another day.** We found no built tic-tac-toe runner on the desk, the Mini or the box, and the plan forbids a compile tonight. So the combined target is not met, and a retry tonight would fail the same way; per the plan's order we record why and do not raise speed (pre-run 25) on this basis. A next attempt at the same three-part target needs the runner built and reviewed first.
3. **Rotation (#1146): not seen under light load.** 910 of our accepted ids, sampled 60 s apart, none still in the desk mempool. Worth repeating under the heavier mix (plan: pre-run 26) before saying anything more.
4. **The bot's timing failed on the box side.** A free public node existed, but the waiter read HOLD-3 four minutes late (fetches of 77 s and 321 s despite a 25 s kill bound, likely a paused box), so the line is `NO SEND suspend`. Next time: watch HOLD-3 from a second path (for example the GitHub API alongside `git fetch`), log a heartbeat every 30 s so a stall is visible as a gap, and treat a waiter gap over 60 s as its own logged event.
5. **Our bot renderer had no case for "free but late".** It wrote `no-free-node`. We corrected the file by a new commit (02b89ba); the renderer should take the free list and the late flag into account.
6. **Two rehearsal catches before the open were real.** The per-minute "families attempting" check counted the mint line (would have marked every minute not clean), and the mint line's normal end looked like a process exit. Both fixed before the open, and the third rehearsal passed on the final files.
7. **Stale wording in the runner's renders.** `logs/METHOD.md` and the step files still mention "our own heavy lane", lanes and the duel from pre-run 23's templates. There was no heavy lane in pre-run 24 (lane columns read 0). The numbers are right; the text should be trimmed in the next runner.
8. **Spend was tiny against the funding.** About 276 tKAS of fees (families and mints) against 53,000 moved. Key 0 holds 130,587 usable tKAS after the run, enough for many more runs.
9. **Key 0's drop, closed (read-only, after the run).** Each covenant hop pays one KCC-20 token output of exactly 1 tKAS (`TOKEN = 100_000_000` sompi in the reference builder `kcc20 storm`; the desk's builder source has the same sha256 prefix as our reference copy). 6,682 hops OK × 1 tKAS + 274.67 tKAS of hop fees ≈ 6,957 tKAS, against key 0's usable drop of 6,843 tKAS (137,430 → 130,587; "usable" counts coins over 3 tKAS less 3 each, so it is not an exact ledger). So the drop is the token outputs our own hops created, not a loss.
