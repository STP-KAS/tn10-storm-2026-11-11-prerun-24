> **Experimental. We are just trying this.** [Disclaimer](../../DISCLAIMER.md) · Kaspa Testnet-10 only; tKAS has no value. Counts only.

> **Our own testing.** What this page shows is what our probe read on our own desk node in this run; it is not a claim of how TN10 behaves in general.

# Mempool and template timeline, pre-run 24

Read by the probe on the desk's private TN10 node every 20 s, read-only; each cell is the median of that minute's samples. Pre-run 17: ready count and ready mass come from the full mempool read up to 10,000 entries and from the node's own figures (getFeeEstimateExperimental, verbose) above that, where the per-class columns stay blank (the node's wRPC replies are capped at 128 MiB, about 12,500 entries). Ready means no parent in the mempool: in rusty-kaspa v2.1.0 only those are in the selector's frontier. Ready mass is compared with one block's mass limit (500,000): at or under 1 the selector takes all ready transactions best-first; over 1 it samples at random weighted by (fee/mass)^3 (over 4, sample_inplace). Mass is the larger of compute and storage mass, as the v2.1.0 selector normalises it (transient mass is not in the RPC). Other traffic is every mempool entry not in our sender logs (our heavy lane is its own class, our heavy); its fee rate is the node's fee over that mass. Template transactions carry no id in the RPC, so each is matched to a mempool entry by its first input. The template is the desk node's own getBlockTemplate (never submitted): what this node would put in a block at that moment, not a miner's template. The fee estimate is the node's getFeeEstimate, read only; no sender reads it. Public mempool is getInfo's mempool size on each kept public kaspad.

## The run

Step is the runner's step at the minute's start (see TIMELINE.md).

| Minute (UTC) | Step | Samples | Mempool | Ready (no parent in mempool) | Ready mass, blocks of 500k | Other traffic in mempool | Other ready | Other at 100, n | Other at 100, mean mass | Our payments in mempool | Our heavy in mempool / ready | Floor in mempool / ready | Kcc in mempool / ready | Template txs | Template storage mass | Template txs over 100k storage mass | Template: payments | Template: our heavy | Template: floor | Template: kcc | Template: other | Fee estimate priority / normal / low | Public 1 mempool | Public 5 mempool |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|---:|---:|
| 2026-11-13T21:58 | BASE | 2 | 5 | 5 | 0.73 | 1 | 1 | - | - | 0 | 0 / 0 | 4 / 4 | 0 / 0 | 5 | 367,430 | 1 | 0 | 0 | 4 | 0 | 1 | 100.0 / 100.0 / 100.0 | 50 | 0 |
| 2026-11-13T21:59 | BASE | 3 | 4 | 4 | 0.33 | 0 | 0 | - | - | 0 | 0 / 0 | 4 / 4 | 0 / 0 | 4 | 164,705 | 0 | 0 | 0 | 4 | 0 | 0 | 100.0 / 100.0 / 100.0 | 3 | 0 |
| 2026-11-13T22:00 | BASE | 3 | 0 | 4 | 0.20 | 0 | 0 | 2 | 10,071 | 0 | 0 / 0 | 2 / 2 | 0 / 0 | 4 | 81,615 | 0 | 0 | 0 | 2 | 0 | 0 | 100.0 / 100.0 / 100.0 | 4 | 0 |
| 2026-11-13T22:01 | BASE | 3 | 0 | 4 | 0.33 | 0 | 0 | - | - | 0 | 0 / 0 | 4 / 4 | 0 / 0 | 4 | 164,060 | 0 | 0 | 0 | 4 | 0 | 0 | 100.0 / 100.0 / 100.0 | 0 | 0 |
| 2026-11-13T22:02 | BASE | 3 | 4 | 4 | 0.33 | 0 | 0 | - | - | 0 | 0 / 0 | 4 / 4 | 0 / 0 | 4 | 163,135 | 0 | 0 | 0 | 4 | 0 | 0 | 100.0 / 100.0 / 100.0 | 4 | 0 |
| 2026-11-13T22:03 | HOLD-1 | 3 | 5 | 12 | 0.48 | 8 | 8 | 1 | 5,604 | 0 | 0 / 0 | 4 / 4 | 0 / 0 | 12 | 175,826 | 0 | 0 | 0 | 4 | 0 | 8 | 100.0 / 100.0 / 100.0 | 3 | 3 |
| 2026-11-13T22:04 | HOLD-1 | 3 | 3 | 3 | 0.25 | 0 | 0 | - | - | 0 | 0 / 0 | 3 / 3 | 0 / 0 | 3 | 122,947 | 0 | 0 | 0 | 3 | 0 | 0 | 100.0 / 100.0 / 100.0 | 3 | 0 |
| 2026-11-13T22:05 | HOLD-1 | 3 | 4 | 4 | 0.33 | 0 | 0 | - | - | 0 | 0 / 0 | 4 / 4 | 0 / 0 | 4 | 163,246 | 0 | 0 | 0 | 4 | 0 | 0 | 100.0 / 100.0 / 100.0 | 0 | 0 |
| 2026-11-13T22:06 | HOLD-2 | 3 | 3 | 4 | 0.33 | 0 | 0 | - | - | 0 | 0 / 0 | 4 / 4 | 0 / 0 | 4 | 164,840 | 0 | 0 | 0 | 4 | 0 | 0 | 100.0 / 100.0 / 100.0 | 1 | 0 |
| 2026-11-13T22:07 | HOLD-2 | 2 | 4 | 4 | 0.33 | 0 | 0 | - | - | 0 | 0 / 0 | 4 / 4 | 0 / 0 | 4 | 164,327 | 0 | 0 | 0 | 4 | 0 | 0 | 100.0 / 100.0 / 100.0 | 52 | 52 |
| 2026-11-13T22:08 | HOLD-2 | 3 | 4 | 4 | 0.33 | 0 | 0 | - | - | 0 | 0 / 0 | 4 / 4 | 0 / 0 | 4 | 164,072 | 0 | 0 | 0 | 4 | 0 | 0 | 100.0 / 100.0 / 100.0 | 2 | 2 |
| 2026-11-13T22:09 | HOLD-3 | 3 | 0 | 4 | 0.33 | 0 | 0 | 2 | 4,470 | 0 | 0 / 0 | 4 / 4 | 0 / 0 | 4 | 164,263 | 0 | 0 | 0 | 4 | 0 | 0 | 100.0 / 100.0 / 100.0 | 0 | 0 |
| 2026-11-13T22:10 | HOLD-3 | 3 | 4 | 5 | 0.65 | 1 | 1 | - | - | 0 | 0 / 0 | 4 / 4 | 0 / 0 | 5 | 324,058 | 1 | 0 | 0 | 4 | 0 | 1 | 100.0 / 100.0 / 100.0 | 1 | 1 |
| 2026-11-13T22:11 | HOLD-3 | 3 | 4 | 5 | 0.34 | 1 | 1 | - | - | 0 | 0 / 0 | 4 / 4 | 0 / 0 | 5 | 164,305 | 0 | 0 | 0 | 4 | 0 | 1 | 100.0 / 100.0 / 100.0 | 1 | 1 |
| 2026-11-13T22:12 | HOLD-4 | 3 | 4 | 4 | 0.33 | 0 | 0 | - | - | 0 | 0 / 0 | 4 / 4 | 0 / 0 | 4 | 162,777 | 0 | 0 | 0 | 4 | 0 | 0 | 100.0 / 100.0 / 100.0 | 0 | 0 |
| 2026-11-13T22:13 | HOLD-4 | 3 | 5 | 5 | 0.33 | 1 | 1 | 1 | 3,349 | 0 | 0 / 0 | 4 / 4 | 0 / 0 | 5 | 163,520 | 0 | 0 | 0 | 4 | 0 | 1 | 100.0 / 100.0 / 100.0 | 5 | 0 |
| 2026-11-13T22:14 | HOLD-4 | 3 | 4 | 4 | 0.33 | 0 | 0 | - | - | 0 | 0 / 0 | 4 / 4 | 0 / 0 | 4 | 164,382 | 0 | 0 | 0 | 4 | 0 | 0 | 100.0 / 100.0 / 100.0 | 11 | 8 |
| 2026-11-13T22:15 | HOLD-4 | 3 | 4 | 4 | 0.33 | 0 | 0 | - | - | 0 | 0 / 0 | 4 / 4 | 0 / 0 | 4 | 162,787 | 0 | 0 | 0 | 4 | 0 | 0 | 100.0 / 100.0 / 100.0 | 5 | 1 |
| 2026-11-13T22:16 | HOLD-4 | 3 | 4 | 4 | 0.33 | 0 | 0 | - | - | 0 | 0 / 0 | 4 / 4 | 0 / 0 | 4 | 163,231 | 0 | 0 | 0 | 4 | 0 | 0 | 100.0 / 100.0 / 100.0 | 4 | 0 |
| 2026-11-13T22:17 | RETURN | 3 | 4 | 4 | 0.33 | 0 | 0 | - | - | 0 | 0 / 0 | 4 / 4 | 0 / 0 | 4 | 163,294 | 0 | 0 | 0 | 4 | 0 | 0 | 100.0 / 100.0 / 100.0 | 1 | 0 |
| 2026-11-13T22:18 | RETURN | 3 | 4 | 4 | 0.32 | 0 | 0 | - | - | 0 | 0 / 0 | 4 / 4 | 0 / 0 | 4 | 161,762 | 0 | 0 | 0 | 4 | 0 | 0 | 100.0 / 100.0 / 100.0 | 4 | 1 |
| 2026-11-13T22:19 | RETURN | 3 | 0 | 4 | 0.33 | 0 | 0 | - | - | 0 | 0 / 0 | 4 / 4 | 0 / 0 | 4 | 164,146 | 0 | 0 | 0 | 4 | 0 | 0 | 100.0 / 100.0 / 100.0 | 1 | 1 |
| 2026-11-13T22:20 | RETURN | 3 | 5 | 5 | 0.33 | 1 | 1 | 1 | 5,590 | 0 | 0 / 0 | 4 / 4 | 0 / 0 | 5 | 162,760 | 0 | 0 | 0 | 4 | 0 | 1 | 100.0 / 100.0 / 100.0 | 7 | 2 |
| 2026-11-13T22:21 | tail | 3 | 0 | 0 | 0.00 | 0 | 0 | - | - | 0 | 0 / 0 | 0 / 0 | 0 / 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 100.0 / 100.0 / 100.0 | 0 | 0 |
| 2026-11-13T22:22 | tail | 3 | 1 | 4 | 0.03 | 4 | 4 | - | - | 0 | 0 / 0 | 0 / 0 | 0 / 0 | 4 | 9,548 | 0 | 0 | 0 | 0 | 0 | 4 | 100.0 / 100.0 / 100.0 | 1 | 1 |
| 2026-11-13T22:23 | tail | 3 | 0 | 0 | 0.00 | 0 | 0 | - | - | 0 | 0 / 0 | 0 / 0 | 0 / 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 100.0 / 100.0 / 100.0 | 0 | 8 |
| 2026-11-13T22:24 | tail | 3 | 0 | 0 | 0.00 | 0 | 0 | - | - | 0 | 0 / 0 | 0 / 0 | 0 / 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 100.0 / 100.0 / 100.0 | 0 | 0 |
| 2026-11-13T22:25 | tail | 2 | 1 | 1 | 0.01 | 1 | 1 | - | - | 0 | 0 / 0 | 0 / 0 | 0 / 0 | 1 | 174 | 0 | 0 | 0 | 0 | 0 | 1 | 100.0 / 100.0 / 100.0 | 50 | 50 |
| 2026-11-13T22:26 | tail | 3 | 0 | 0 | 0.00 | 0 | 0 | - | - | 0 | 0 / 0 | 0 / 0 | 0 / 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 0 | 100.0 / 100.0 / 100.0 | 50 | 0 |
