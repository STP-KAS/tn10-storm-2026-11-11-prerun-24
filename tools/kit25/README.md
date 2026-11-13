> **Experimental. We are just trying this.** [Disclaimer](../../DISCLAIMER.md) · Kaspa Testnet-10 only. No id, key, address, host, or port in this folder.

# kit25, pre-run 24

kit24 with three changes:

- `family-fees.mjs`: tiers floor 1–4 at 100 and `kcc` 5 at 100, all on the desk; `FAMILY_COUNT = 5`, `SENDER_FAMILIES = 4`.
- `kit25-family-count.patch`: the family sender checks the family count against `FAMILY_COUNT` instead of a fixed 16.
- `mint24.mjs` (new): the KCC-20 mint line. One public mint of family 5 at a time on the desk's private node, priced on the node's mass at 100, from its own funding key; waits for the accept (up to 120 s), then 15 s; cap 30 accepted, at most 90 tries; logs each result privately and the totals in `private/mint-total.json`.
