> **Experimental. We are just trying this.** [Disclaimer](../../DISCLAIMER.md) · Kaspa Testnet-10 only; tKAS has no value. Counts only.

# Chain timeline, pre-run 24

Every minute the desk counter read, from its start to the end of the 5-minute tail after RETURN. Read on the desk's private TN10 node, by accepting chain block header time. Submit-OK is the desk sender log for scored minutes (a dash where the runner did not score the minute). A minute marked LAGGING, partial, or not final is what the node had accepted at that point, not a network figure. Nothing is filled in.

| Minute (UTC) | Step (lane) | Scored | Pay submit-OK | Our payments included | Our heavy landed | Floor hops (100) | Kcc hops (100) | Other traffic | Included, all non-coinbase | Chain blocks | DAA gap max | Sink age max, ms | Counter |
|---|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 2026-11-13T21:58 | BASE (pre) |  | - | 0 | 0 | 79 | 1 | 1,447 | 1,525 | 166 | 2 | 400 | partial |
| 2026-11-13T21:59 | BASE (pre) |  | - | 0 | 0 | 274 | 4 | 3,131 | 3,398 | 309 | 1 | 966 | kept pace |
| 2026-11-13T22:00 | BASE (mix) | yes | 0 | 0 | 0 | 297 | 4 | 3,176 | 3,457 | 306 | 1 | 763 | kept pace |
| 2026-11-13T22:01 | BASE (mix) | yes | 0 | 0 | 0 | 300 | 4 | 3,133 | 3,428 | 309 | 1 | 763 | kept pace |
| 2026-11-13T22:02 | BASE (mix) | yes | 0 | 0 | 0 | 292 | 3 | 3,358 | 3,634 | 314 | 1 | 629 | kept pace |
| 2026-11-13T22:03 | HOLD-1 (mix) | yes | 0 | 0 | 0 | 296 | 4 | 3,153 | 3,434 | 309 | 1 | 548 | kept pace |
| 2026-11-13T22:04 | HOLD-1 (mix) | yes | 0 | 0 | 0 | 287 | 4 | 3,146 | 3,415 | 328 | 0 | 620 | kept pace |
| 2026-11-13T22:05 | HOLD-1 (mix) | yes | 0 | 0 | 0 | 307 | 4 | 3,203 | 3,497 | 349 | 1 | 658 | kept pace |
| 2026-11-13T22:06 | HOLD-2 (mix) | yes | 0 | 0 | 0 | 321 | 2 | 3,143 | 3,440 | 331 | 1 | 470 | kept pace |
| 2026-11-13T22:07 | HOLD-2 (mix) | yes | 0 | 0 | 0 | 311 | 0 | 3,106 | 3,405 | 336 | 1 | 349 | kept pace |
| 2026-11-13T22:08 | HOLD-2 (mix) | yes | 0 | 0 | 0 | 317 | 0 | 3,208 | 3,509 | 341 | 1 | 403 | kept pace |
| 2026-11-13T22:09 | HOLD-3 (mix) | yes | 0 | 0 | 0 | 320 | 0 | 3,159 | 3,450 | 356 | 1 | 399 | kept pace |
| 2026-11-13T22:10 | HOLD-3 (mix) | yes | 0 | 0 | 0 | 302 | 0 | 3,137 | 3,419 | 335 | 0 | 534 | kept pace |
| 2026-11-13T22:11 | HOLD-3 (mix) | yes | 0 | 0 | 0 | 302 | 0 | 3,130 | 3,406 | 341 | 2 | 533 | kept pace |
| 2026-11-13T22:12 | HOLD-4 (N0-drain) |  | - | 0 | 0 | 332 | 0 | 3,108 | 3,429 | 370 | 1 | 1173 | kept pace |
| 2026-11-13T22:13 | HOLD-4 (N0-drain) |  | - | 0 | 0 | 284 | 0 | 3,339 | 3,605 | 326 | 1 | 471 | kept pace |
| 2026-11-13T22:14 | HOLD-4 (N0-drain) |  | - | 0 | 0 | 204 | 0 | 3,169 | 3,358 | 333 | 127 | 12054 | LAGGING |
| 2026-11-13T22:15 | HOLD-4 (N0-drain) |  | - | 0 | 0 | 275 | 0 | 3,124 | 3,383 | 307 | 1 | 847 | kept pace |
| 2026-11-13T22:16 | HOLD-4 (N0-drain) | yes | 0 | 0 | 0 | 294 | 0 | 3,132 | 3,412 | 333 | 2 | 639 | kept pace |
| 2026-11-13T22:17 | RETURN (N0-drain) |  | - | 0 | 0 | 307 | 0 | 3,194 | 3,478 | 338 | 1 | 414 | kept pace |
| 2026-11-13T22:18 | RETURN (N0-drain) | yes | 0 | 0 | 0 | 305 | 0 | 3,138 | 3,426 | 344 | 1 | 414 | kept pace |
| 2026-11-13T22:19 | RETURN (N0-drain) | yes | 0 | 0 | 0 | 295 | 0 | 3,164 | 3,441 | 316 | 1 | 540 | kept pace |
| 2026-11-13T22:20 | RETURN (N0-drain) | yes | 0 | 0 | 0 | 266 | 0 | 3,109 | 3,361 | 307 | 2 | 541 | kept pace |
| 2026-11-13T22:21 | tail (N0-drain) |  | - | 0 | 0 | 115 | 0 | 3,101 | 3,204 | 302 | 3 | 355 | kept pace |
| 2026-11-13T22:22 | tail (N0-drain) |  | - | 0 | 0 | 0 | 0 | 3,094 | 3,094 | 280 | 1 | 465 | kept pace |
| 2026-11-13T22:23 | tail (N0-drain) |  | - | 0 | 0 | 0 | 0 | 3,090 | 3,090 | 288 | 1 | 359 | kept pace |
| 2026-11-13T22:24 | tail (N0-drain) |  | - | 0 | 0 | 0 | 0 | 3,202 | 3,202 | 255 | 1 | 538 | kept pace |
| 2026-11-13T22:25 | tail (N0-drain) |  | - | 0 | 0 | 0 | 0 | 3,300 | 3,300 | 266 | 1 | 466 | kept pace |
| 2026-11-13T22:26 | tail (N0-drain) |  | - | 0 | 0 | 0 | 0 | 3,196 | 3,196 | 247 | 2 | 883 | not final |

Whole run, as read: our payments submit-OK 0, of which included by the end of the tail 0 (- percent). Family hops included: floor 6,682, kcc 30. Our heavy-lane transactions included: 0.
