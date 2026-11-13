NO SEND suspend (late check: a free node answered, but only 31 s into the pinned minute)

# HOLD-4, bot sender log, pre-run 24

> Counts only. The bot's sender log. It is not a chain count. The desk counter and Mini count the chain.

Pinned minute (UTC): 2026-11-13T22:16. It is the first whole UTC minute whose start is at least 3 minutes after the desk's HOLD-3 file's On origin time, 2026-11-13T22:12:22Z (commit 6a086b6). Fee 150 sompi/gram. Own coins only.

The bot sent nothing in this minute. Submit-OK 0, attempts 0, rejects rate 0, full 0.

## Why the bot did not send

> Correction, 2026-11-13 after the minute: the first version of this file said `no-free-node`. That was wrong. The free check found one free node (extra 4: synced, DAA moving, a different kaspad from the desk's kept nodes and from our own), but it ran only after the pinned minute had started, so the bot did not send. Under GO-BOT that is `NO SEND` and `suspend` (woke after the minute). The table is the check as it ran.

The desk kept public nodes 1, 5 (local numbers) through HOLD-4. They and the bot's other candidates were read at 2026-11-13T22:16:31Z, **31 s after the pinned minute had started**.

The bot first read HOLD-3 on origin at 2026-11-13T22:16:27Z, 245 s after its On origin time: two of the bot machine's fetches from origin hung (76 s and 320 s, logged), so the free check could not be made before the minute.

| Node (bot label) | In the desk's kept set | Answered | Synced, DAA moving | Same kaspad as a kept node |
|---|---|---|---|---|
| desk 1 | yes | yes | yes | — |
| desk 4 | no | yes | yes | yes |
| desk 5 | yes | yes | yes | — |
| extra 1 | no | yes | yes | yes |
| extra 2 | no | yes | yes | yes |
| extra 3 | no | yes | yes | yes |
| extra 4 | no | yes | yes | no (free) |

Nothing was sent: submit-OK 0, attempts 0. Coins were not the reason.

No txid, key, seed, address, host, port, or covenant id is in this file.
