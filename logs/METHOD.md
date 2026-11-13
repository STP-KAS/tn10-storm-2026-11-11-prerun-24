# Method, pre-run 24

> This is our own Kaspa Testnet-10 testing. What follows is what we observed in this run, on our own nodes; it is not a claim of how TN10 or Kaspa behave in general.

> Counts only. Desk side. Submit-OK is the desk sender log; included is the desk counter's read of what the desk's private TN10 node accepted on chain. Mini's files are a second read.

Steps (our own heavy lane on one absolute timeline): BASE = mix 3 min; HOLD-1 = mix 3 min; HOLD-2 = mix 3 min; HOLD-3 = mix 3 min; then N0-drain through the HOLD-4 minute and RETURN 3 min, then a 5-minute counter tail.

Our heavy lane's totals were not read.

Accepted hops per cohort, as the desk's coordinator read them: floor 6,678, kcc 30.

Per step (all OBSERVATION, families plus our own heavy lane, no payment of ours):

- BASE: OBSERVATION, submit-OK 0 / 0 / 0; our payments included 0 / 0 / 0; hops included floor/kcc 889/11; counter minutes not kept-pace 0 of 3.
- HOLD-1: OBSERVATION, submit-OK 0 / 0 / 0; our payments included 0 / 0 / 0; hops included floor/kcc 890/12; counter minutes not kept-pace 0 of 3.
- HOLD-2: OBSERVATION, submit-OK 0 / 0 / 0; our payments included 0 / 0 / 0; hops included floor/kcc 949/2; counter minutes not kept-pace 0 of 3.
- HOLD-3: OBSERVATION, submit-OK 0 / 0 / 0; our payments included 0 / 0 / 0; hops included floor/kcc 924/0; counter minutes not kept-pace 0 of 3.
- HOLD-4: OBSERVATION, submit-OK 0; our payments included 0; hops included floor/kcc 294/0; counter minutes not kept-pace 0 of 1.
- RETURN: OBSERVATION, submit-OK 0 / 0 / 0; our payments included 0 / 0 / 0; hops included floor/kcc 866/0; counter minutes not kept-pace 0 of 3.

Decent on the desk side: every step file reached origin.

## Selection rule, read before the run

The desk node and the kept public kaspads answered serverVersion 2.1.0 at the preflight. In rusty-kaspa tag v2.1.0 (commit 01b532e8b553523216471682649693af92f0fd16), `mining/src/mempool/model/frontier.rs` `build_selector` takes every ready transaction best-first while the ready set's mass fits one block, and otherwise samples at random with weight (fee/mass)^3 (`ALPHA = 3` in `mining/src/mempool/model/frontier/selectors.rs`, weight in `mining/src/mempool/model/frontier/feerate_key.rs`): `sample_inplace` above four blocks' mass, `MutatingTreeSelector` between one and four. Only a transaction with no parent in the mempool is in the ready set (`mining/src/mempool/model/transactions_pool.rs`), so a chained hop is not a candidate until its parent is out of the mempool. Against an outside stream at 100, the weights are 1.00 (100), 3.38 (150), 27.0 (300) and 91.1 (450), per unit of mass. In the duel our two lanes move between 100 and 2,000 (logs/duel.log, published after the run). A higher fee raises the odds; it does not buy a place in a queue. This is the source's rule, read from the code; the run does not see a miner's template.

Hop rates per hop, one builder: floor (families 1–4) 100 sompi/gram on the desk's private node, kcc (families 5–5) 100 sompi/gram on the desk's private node. Payments 150. The funding coins were not one size, so the fee is not called the whole cause. Every tier was read and submitted on the desk's private TN10 node, which also ran the counter. No payment sender was started; 2 unique public kaspads were read for sync only.

## Misses

- none

## Fixes

- none

## On origin

- counts/desk/BASE.md: 2026-11-13T22:03:22Z
- counts/desk/HOLD-1.md: 2026-11-13T22:06:22Z
- counts/desk/HOLD-2.md: 2026-11-13T22:09:22Z
- counts/desk/HOLD-3.md: 2026-11-13T22:12:22Z
- counts/desk/HOLD-4.md: 2026-11-13T22:17:23Z
- counts/desk/RETURN.md: 2026-11-13T22:21:22Z
- counts/chain/TIMELINE.md: 2026-11-13T22:27:00Z
- counts/chain/MEMPOOL.md: 2026-11-13T22:27:03Z
