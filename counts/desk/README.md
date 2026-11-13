> **Experimental. We are just trying this.** [Disclaimer](../../DISCLAIMER.md) · Counts only. No key, seed, txid, covenant id, address, host, or port.
>
> Pre-run 24. It is not Wednesday's count.

# Desk sender log and chain read

The files are absent until each step closes. None is written before `hashes/SIXTEEN.md` has an On origin line.

| File | Target |
|---|---|
| BASE.md, HOLD-1.md, HOLD-2.md, HOLD-3.md | the combined mix (families 1–4 at 100, the mint line), 3 whole minutes each, `OBSERVATION` |
| HOLD-4.md | the pinned observation minute, `OBSERVATION` |
| RETURN.md | 3 whole minutes after HOLD-4, `OBSERVATION` |
| MINT.md | the mint line's totals: tries, accepted, rejected (with the node's text kept privately), timeouts, fees |
| TARGET.md | the three-part target: covenant hop accepted in the window, mint accepted, guest carrier (not met), the combined target, and the rotation sample's totals |

Per minute: hops per cohort (`floor`, `kcc`), all accepted non-coinbase transactions, other traffic, whether the counter kept pace, and the probe's mempool table. A minute not final is written `not final`.
