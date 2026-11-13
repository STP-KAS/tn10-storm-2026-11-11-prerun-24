> **Experimental. We are just trying this.** [Disclaimer](../../DISCLAIMER.md) · Kaspa Testnet-10 only. Counts only.

# Target, pre-run 24 (desk's own read)

Open window: from logs/PRE-RUN-OPEN.md on origin (2026-11-13T21:55:45Z) to this file (2026-11-13T22:27:05Z). Accepted = the desk node's own read (coordinator accepting-header time for the family hops; next minter seen for the mints).

| Line | Accepted on the desk node in the window | Met |
|---|---:|---|
| Covenant hop (families 1–4, floor) | 6,678 | met |
| KCC-20 mint (family 5, one at a time, cap 30) | 30 | met |
| Tic-tac-toe guest carrier | 0 (not run) | not met: no tic-tac-toe runner or guest build on disk on the desk, the Mini or the bot's machine; the plan says do not compile it tonight |

The combined three-part target is therefore **not met** in this run, whatever the first two lines say (plan card 24: the guest line missing is not a pass of the combined target).

Issue #1146 rotation sample (rot24.mjs, our own accepted ids, 60 s or more after acceptance, asked one at a time on the same node): 24 samples, 910 ids checked, 0 still listed in the mempool.
