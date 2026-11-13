> **Experimental. We are just trying this.** [Disclaimer](../DISCLAIMER.md) · This page does not start a machine.
>
> Lines here are locked for pre-run 2. This pre-run does not reopen them. Wednesday's plan is not edited from this page. Pre-run 1's pages are not edited from this page.

# Locked

Pre-run 2 starts from this page.

The two sections under **Carried from pre-run 1** are copied without change from [pre-run 1's locks/LOCKED.md](https://github.com/STP-KAS/tn10-storm-2026-11-11-prerun/blob/main/locks/LOCKED.md) at commit b39a506. In them, "this pre-run" and "this repo" mean pre-run 1. Every line there holds for pre-run 2 as well.

# Carried from pre-run 1

## Locked before pre-run 1

These came from the Wednesday review, through round 4, and this pre-run keeps them.

- The desk keeps every public node it used in HOLD-3. It does not drop one to free it for the bot.
- The bot sends only on a synced public node outside that set, one process, and only in the HOLD-4 minute. No free node means `NO SEND` and `no-free-node`. The bot has no local node.
- The HOLD-4 minute is the first whole UTC minute whose start is at least 3 minutes after the HOLD-3 file's On origin time. Both sides read that time from origin. An unsynced minute is still that minute. The run does not open a later one.
- Mini publishes HOLD-4 when the bot file is on origin, or `logs/BOT-HALT.md` is on origin, or the desk's HOLD-4 file has been on origin for 10 minutes. `TWO SENDERS` only when the bot file is on origin and is not `NO SEND`. Mini does not republish.
- Families 1–13 and families 14–16 use the same family-sender nodes. Fees stay 100, 200, and 150 sompi per gram. The sixteen are one build. The rate is per family, in one process. A single rate for the process is not a fee difference. A second builder is not the fix. If the funding coins are not one size, the file says so and does not call the fee the whole cause. A priority quote is not read. A fee estimate is not read.
- Mini is the only chain counter. Mini does not send. The bot stays out of HOLD-1, HOLD-2, HOLD-3, and RETURN.
- The abort line stays 2,500 coins and 18,000 usable tKAS. The desk node process is not stopped by this pre-run.
- This repo does not edit Tuesday's repo and does not edit Wednesday's repo.

## Locked during this pre-run

Nothing yet. When a fix works, append it here before the next pre-run is written.

One block per fix:

```
- UTC time.
- What failed.
- What was changed.
- Why that change stays.
```

The go files in this repo stay as they were at the paste. The next repo copies this page and bakes the new lines into its own pastes.

### Worked fixes appended on 11 Nov 2026, after pre-run 1 failed

These blocks are appended in the form above. The line `Nothing yet.` is the state before these blocks. Pre-run 2, [tn10-storm-2026-11-11-prerun-2](https://github.com/STP-KAS/tn10-storm-2026-11-11-prerun-2), starts from this page.

```
- 2026-11-11T07:21:32Z.
- What failed: the desk and Mini reset during pre-run 1, before hashes or sends. Nothing was armed for send after the reset.
- What was changed: pre-run 1 was marked failed in logs/FAILED.md and closed. It is not resumed. The next attempt is a new repo, tn10-storm-2026-11-11-prerun-2.
- Why that change stays: a failed pre-run's open and armed files are history, not live gates. A new attempt opens its own files in its own repo.
```

```
- 2026-11-11T07:16:33Z.
- What failed: the bot waiter from pre-run 1 kept polling origin after the desk and Mini had reset. A late HOLD-3 file could have made it send on a dead run.
- What was changed: the operator stopped the waiter. BOT-HALT was written. No second waiter was started.
- Why that change stays: a waiter does not outlive its run. When a run fails, its waiters are stopped and not reused. A new run gets a new paste.
```

```
- 2026-11-11T08:04:08Z.
- What failed: Mini rebooted during pre-run 1 and its TN10 kaspad was down.
- What was changed: the existing Mini TN10 kaspad was started with its existing start task and data directory. No wipe. It re-synced from its own data, finished IBD, and accepted live blocks.
- Why that change stays: before any new paste or arm, start the existing Mini TN10 kaspad if it is down. Do not wipe chain data. Re-sync first. When isSynced is true and DAA is moving, Mini notifies Build and TN10 ops. Mini does not publish a new MINI-ARMED until GO-MINI is pasted and PRE-RUN-OPEN is on origin.
```

```
- 2026-11-11T07:54:58Z.
- What failed: the desk rebooted during pre-run 1 and its private TN10 kaspad was down. Windows PowerShell 5.1 drops the start arguments and can open mainnet.
- What was changed: the existing desk private TN10 kaspad was started from its existing data, loopback only, with PowerShell 7 (pwsh). No wipe. KaspaPublicNode was not started. The desk devnet was left alone. IBD finished and the node accepted live blocks.
- Why that change stays: start the desk private TN10 node from existing data if it is down, with pwsh 7, never Windows PowerShell 5.1. Do not wipe. Do not start KaspaPublicNode. Leave the desk devnet alone. The pre-run does not stop the desk node process.
```

```
- 2026-11-11T09:59:00Z.
- What failed: pre-run 1 was gated on a wall clock and a waiter sat on that clock. The day's clock moved and the run died before hashes.
- What was changed: the operator set the next attempt as target-oriented, with no time frames.
- Why that change stays: the pre-run is target-bounded. It has no T0 after the start and no public clock. Order: hashes first (hashes/SIXTEEN.md, sixteen rows, with an On origin line), then covenant families, then gradual senders. The bot sends only in the HOLD-4 minute after desk HOLD-3 is on origin, or writes a legal NO SEND. Chat is not the start signal. The operator's paste is the arm.
```

```
- 2026-11-11T10:00:00Z.
- What failed: the desk hash tools publish only 8 or 32 families. The pre-run needs sixteen.
- What was changed: the old 8- and 32-family publisher is barred for the pre-run. A sixteen-family path is needed before any hash file is published. No hash value or covenant id is invented.
- Why that change stays: a hash file with the wrong family count is not proof. No sixteen-row file with an On origin line, no family submit.
```

# Pre-run 2

## Locked for pre-run 2

These lines are baked into this repo's own pastes. They come from the worked fixes above.

- Pre-run 1 is failed and closed. It is not resumed. Its `PRE-RUN-OPEN`, `MINI-ARMED`, `BOT-HALT`, and `FAILED` files are history in that repo, not gates here. This repo writes its own.
- A waiter does not outlive its run. If this repo's `logs/BOT-HALT.md` or `logs/FAILED.md` is on origin, every runner and waiter of this run stops and is not reused.
- Before any new paste or arm, Mini's existing TN10 kaspad is up from its own data, not wiped, and re-synced. When `isSynced` is true and DAA is moving, Mini notifies Build and TN10 ops. Mini does not publish a new `MINI-ARMED` until GO-MINI is pasted and this repo's `PRE-RUN-OPEN` is on origin.
- The desk's existing private TN10 kaspad is up from its own data, started with PowerShell 7 (`pwsh`), never Windows PowerShell 5.1. No wipe. `KaspaPublicNode` is not started. The desk devnet is left alone. This pre-run does not stop the desk node process.
- This pre-run is target-bounded. No T0 after the start, and no public clock. Hashes first: `hashes/SIXTEEN.md`, sixteen rows, with an On origin line. Then the covenant families. Then the senders, step by step. The bot sends only in the HOLD-4 minute after the desk's HOLD-3 file is on origin, or writes a legal `NO SEND`.
- Chat is not the start signal. The operator's paste is the arm.
- The old 8- or 32-family hash publisher is not used for this pre-run. A hash is never invented.
- The fee lines (100, 200, 150 sompi per gram), the abort line (2,500 coins and 18,000 usable tKAS), the HOLD-4 minute, and the node-set lines above are not loosened.
- This repo does not edit Tuesday's repo, Wednesday's repo, or pre-run 1's go files, and does not write `REVIEW_CLOSED`.

## Locked during pre-run 2

Nothing yet. When a fix works, append it here, one block per fix, in the form shown above: UTC time, what failed, what was changed, why that change stays.

```
- 2026-11-11T12:22:54Z.
- What failed: pre-run 1's sixteen-family hash step stopped with HASH_STOP build. Its genesis launch paths began launch::prerun1-, and the reference builder refuses any genesis launch path outside its allow-list ("launch path not on the storm allow-list").
- What was changed: pre-run 2's genesis launch paths begin launch::storm-2026-10-, and the hash tool refuses any other prefix before it reads the node. The desk check then built sixteen genesis transactions and sixteen rows.
- Why that change stays: a genesis launch path must start with launch::storm-2026-10-. Any other path does not build, and then there is no hash file and no send.
```

```
- 2026-11-11T15:23:08Z.
- What failed: HOLD-1 was met. In HOLD-2 the desk runner marked minutes dirty because families logged STALL marks, and the reason came out blank. The runner process was stopped mid-run to apply that scoring fix. Its children (builder broker, builder, coordinator, family sender, payment senders) died with it. The restarted runner found the family processes gone and wrote logs/FAILED.md. The run is not resumed.
- What was changed: nothing in this repo's run. The next repo carries three lines. (a) A runner is never restarted mid-run to apply a scoring fix. The run is left alone and the fix goes into a later repo. (b) If a later design must ever replace a runner, its children (builder, broker, coordinator, family sender, payment senders) are started detached, so they survive the parent. (c) A family STALL (no hop of that family landing for a while) is not dirt for HOLD scoring. GO-DESK's clean minute does not count it. A stall at the two-thirds rate is part of the congestion question, and it is logged per minute.
- Why that change stays: a scoring fix applied by restarting the runner killed a run that was sending cleanly. A stall is data about congestion and competition, not a sender fault.
```

The go files in this repo stay as they were at the paste. A next repo copies this page and bakes the new lines into its own pastes.

## Locked for pre-run 3

These lines are baked into this repo's own pastes. They come from pre-run 2's worked fixes above.

- Pre-run 2 is failed and closed. It is not resumed. Its `PRE-RUN-OPEN`, `MINI-ARMED`, `BOT-HALT`, and `FAILED` files are history in that repo, not gates here.
- Pre-run 2's genesis coins are spent. This repo publishes fresh `hashes/SIXTEEN.md` rows from the desk node with the sixteen-family publisher. Genesis launch paths begin `launch::storm-2026-10-`. A hash is never invented. The family submit uses the bundle that wrote this repo's file. Nothing rebuilds it after the publish.
- A runner is never restarted mid-run to apply a fix. The run is left alone and the fix goes into a later repo.
- The desk runner starts its children (builder broker, builder, coordinator, family sender, payment senders) detached, so they survive the parent.
- A family STALL is not dirt for HOLD scoring. It is logged per minute.
- The operator does not paste for this repo. His instruction to start everything is the arm. The agents start the runners after the gates are facts. The Mini runner refuses to publish `MINI-ARMED` unless its node is synced with DAA moving. That file on origin is Mini's synced notice to Build and TN10 ops.
- Mini's clone carries the git user name and email before its first push.
- The fee lines (100, 200, 150 sompi per gram, genesis 200), the abort line (2,500 coins and 18,000 usable tKAS), the HOLD-4 minute, the offers, and the node-set lines are not loosened.
- This repo does not edit Tuesday's repo, Wednesday's repo, or pre-run 1's or pre-run 2's go files, and does not write `REVIEW_CLOSED`.

## Locked during pre-run 3

Nothing yet. When a fix works, append it here, one block per fix, in the form shown above: UTC time, what failed, what was changed, why that change stays.

```
- 2026-11-11T15:40:21Z.
- What failed: the desk runner stopped with "readSub is not defined" on the first scored HOLD-1 minute and wrote logs/FAILED.md. The genesis, family-start, and submit-log reader section sat inside a { ... } block in an ES module, so readSub, landed, and subRows were not in scope for the scoring code. The dry start before the run only reached the gate check.
- What was changed: nothing in this repo's run. The next repo's runner has that block removed, passes a no-undef lint, and has passed an offline rehearsal on the desk through HOLD-1 scoring and a count-file render before its live run.
- Why that change stays: a runner is rehearsed offline through HOLD-1 scoring, with faked submit and payment logs and no live send, before any live run. A dry start that only reaches the gate check is not a rehearsal.
```

## Locked for pre-run 4

These lines are baked into this repo's own pastes. They come from pre-run 3's worked fixes above.

- Pre-run 3 is failed and closed. It is not resumed. Its `PRE-RUN-OPEN`, `MINI-ARMED`, and `FAILED` files are history in that repo, not gates here.
- Pre-run 3's genesis coins are spent. This repo publishes fresh `hashes/SIXTEEN.md` rows from the desk node with the sixteen-family publisher. Genesis launch paths begin `launch::storm-2026-10-`. A hash is never invented. The family submit uses the bundle that wrote this repo's file. Nothing rebuilds it after the publish.
- The desk runner passes a no-undef lint, and an offline rehearsal on the desk through HOLD-1 scoring and a count-file render, before its live run. The rehearsal fakes the submit and payment logs and sends nothing.
- A full mempool returns the payment coin to that sender's pool. It is logged as full and does not stop the sender.
- Every pre-run 2 and pre-run 3 line above stays: no runner restart mid-run, children started detached, a family stall is not dirt, the operator's start is the arm, Mini's clone has its git identity before its first push.
- The fee lines (100, 200, 150 sompi per gram, genesis 200), the abort line (2,500 coins and 18,000 usable tKAS), the HOLD-4 minute, the offers, and the node-set lines are not loosened.
- This repo does not edit Tuesday's repo, Wednesday's repo, or pre-run 1's, 2's, or 3's go files, and does not write `REVIEW_CLOSED`.

## Locked during pre-run 4

Nothing yet. When a fix works, append it here, one block per fix, in the form shown above: UTC time, what failed, what was changed, why that change stays.

```
- 2026-11-11T17:14:23Z.
- What failed: HOLD-1 and HOLD-2 were met. HOLD-3 stayed under the 3,040 offer at about 116,000–118,000 submit-OK a minute (ok-off), the expected desk signing ceiling with three payment senders. The one repair pass killed the payment senders, waited 3 seconds, then called startPay, which skipped any sender still listed in the runner's process list. Dead senders are only dropped from that list every 5 seconds, so none restarted. Minutes after the repair were 0 sent (ok-off, proc-row-missing); two samples also marked the kept nodes unsynced. A git fetch error at 2026-11-11T17:14:23Z blocked the push of counts/desk/HOLD-3.md, the runner logged FAILED and stopped, and a later fetch at 2026-11-11T17:15:50Z also failed, so logs/FAILED.md was not published by the runner. Separately, kept public nodes 1 and 4 were one kaspad reached by two hostnames, so the three kept endpoints were two backends, and no leftover synced public node was free for a bot HOLD-4 send.
- What was changed: nothing in this repo's run. The operator wrote logs/FAILED.md after the runner was gone. The next repo carries these lines. (a) After a payment-sender repair, startPay must start the missing senders. A process still named in the list is not treated as live until it is reaped, or the repair waits until the list has dropped the dead ones, then starts them. (b) If a push of a HOLD file or of FAILED.md fails, the runner retries, then leaves a local FAILED file and the operator publishes it; a fetch or push error does not leave the run unmarked on origin. (c) Kept public nodes are unique kaspads, not unique hostnames. Two hostnames that are one kaspad count as one node. The bot's leftover node must be a different kaspad, not another hostname of a kept one. If none is free and synced, the bot writes a legal NO SEND.
- Why that change stays: a repair that stops payment senders and does not start them again ends the load test. A failed git fetch left HOLD-3 and FAILED off origin while the run was already dead. Counting one kaspad twice overstated the kept set and left no honest free node for HOLD-4.
```

The go files in this repo stay as they were at the start. A next repo copies this page and bakes the new lines into its own pastes.

## Locked for pre-run 5

These lines are baked into this repo's own pastes. They come from pre-run 4's worked fixes above (commit edfcdd2 in [tn10-storm-2026-11-11-prerun-4](https://github.com/STP-KAS/tn10-storm-2026-11-11-prerun-4)). Everything above this heading is copied without change from that commit.

- Pre-run 4 is failed and closed. It is not resumed. Its `PRE-RUN-OPEN`, `MINI-ARMED`, `FIXES`, and `FAILED` files are history in that repo, not gates here.
- Pre-run 4's genesis coins are spent. This repo publishes fresh `hashes/SIXTEEN.md` rows from the desk node with the sixteen-family publisher. Genesis launch paths begin `launch::storm-2026-10-`. A hash is never invented. The family submit uses the bundle that wrote this repo's file. Nothing rebuilds it after the publish.
- (a) After a payment-sender repair, the missing senders start. The runner waits until the stopped senders are gone, takes them off its list, starts the ones that are missing, and checks that each one logged its start. A sender named in the runner's list is not counted as running unless its process is alive.
- (b) A failed push of a HOLD file or of `logs/FAILED.md` is retried, fetch and push. A FAILED file is written locally before any push. If origin still refuses, the operator publishes the local file. A fetch or push error does not leave a dead run unmarked on origin.
- (c) Kept public nodes are unique kaspads, not unique hostnames. Each node's id is read at the preflight. Two hostnames with one id count as one node and get one payment sender. A node whose id cannot be read is dropped. The bot's free node must be a different kaspad from every kept node, read in the same pass. If none is free and synced, the bot writes a legal `NO SEND` and `no-free-node`.
- The desk runner passed a no-undef lint and an offline rehearsal on the desk before this live run: HOLD-1 scoring, a count-file render, a repair that restarts the payment senders, a stall that stays clean, a dirty minute that is not a stall, two hostnames of one kaspad collapsed to one node, and a git failure that still leaves a local FAILED file. The rehearsal fakes the submit and payment logs and sends nothing.
- Known risk, not fixed mid-run: the desk signs about 116,000–118,000 payment submits a minute with three payment senders. HOLD-3's window is 164,160–200,640 a minute. Fewer unique kaspads means fewer payment senders, so HOLD-2's window (109,458–133,782) may be missed too. That is a reading, not a reason to change a runner during the run.
- Every pre-run 2, 3, and 4 line above stays: no runner restart mid-run, children started detached, a family stall is not dirt, a full mempool returns the coin, the operator's start is the arm, Mini's clone has its git identity before its first push.
- The fee lines (100, 200, 150 sompi per gram, genesis 200), the abort line (2,500 coins and 18,000 usable tKAS), the HOLD-4 minute, the offers, and the node-set lines are not loosened.
- This repo does not edit Tuesday's repo, Wednesday's repo, or pre-run 1's, 2's, 3's, or 4's go files, and does not write `REVIEW_CLOSED`.

## Locked during pre-run 5

Nothing yet. When a fix works, append it here, one block per fix, in the form shown above: UTC time, what failed, what was changed, why that change stays.


```
- 2026-11-11T19:08:27Z.
- What worked: (c) the preflight read each public node's id and kept two kaspads (local nodes 1 and 5); node 4 answered as the same kaspad as node 1 and got no sender. The bot's pass found every other endpoint to be a kept kaspad or silent, and wrote a legal NO SEND no-free-node. (a) Both repairs (HOLD-3 at 18:42:12Z, RETURN at 19:01:12Z) waited for the stopped senders to go, started both again, and both logged their start. (b) Every file reached origin on the first try; the retry path was only exercised offline.
- What failed: the restarted payment senders reloaded their coins from the desk node's UTXO index while their own payment chains were still in the mempool. After the HOLD-3 restart one sender saw only rejects at first, turned chaining off, ran out of coins, and exited; the other sent about 413 a minute. In RETURN one sender loaded 1 coin and the other 1,999, so about 29,913 a minute went out against 1,013 a second. HOLD-3, HOLD-4, and RETURN read low for that reason, not only for the offer. Two senders also reached the same ceiling as three in pre-run 4, about 118,000 a minute, which tracks the 2,000-coin payment pile.
- What was changed: nothing in this repo's run. The runner was not restarted and the pile was not changed. A next repo carries these lines: a payment sender that restarts mid-run must not take its pool from the confirmed UTXO set alone while its chains are in the mempool (it keeps its chain tips, or excludes coins already spent in the mempool and adds their unconfirmed change), and the even split of coins across senders is checked after a reload, not assumed. The payment ceiling is read against the pile size before a higher offer is called a node or network limit.
- Why that change stays: a restart that starts the processes but hands them spent or skewed coins still ends the load test, and a pile-bound ceiling must not be read as the network's.
```

The go files in this repo stay as they were at the start. A next repo copies this page and bakes the new lines into its own pastes.

## Locked for pre-run 6

These lines are baked into this repo's own pastes. They come from pre-run 5's worked fixes above (commit b616d11 in [tn10-storm-2026-11-11-prerun-5](https://github.com/STP-KAS/tn10-storm-2026-11-11-prerun-5)). Everything above this heading is copied without change from that commit.

- Pre-run 5 finished through RETURN and is closed. It is not resumed. Its `PRE-RUN-OPEN`, `MINI-ARMED`, `FIXES`, and `METHOD` files are history in that repo, not gates here.
- Pre-run 5's genesis coins are spent. This repo publishes fresh `hashes/SIXTEEN.md` rows from the desk node with the sixteen-family publisher. Genesis launch paths begin `launch::storm-2026-10-`. A hash is never invented. The family submit uses the bundle that wrote this repo's file. Nothing rebuilds it after the publish.
- (d) The payment pile is sized for HOLD-3. A payment coin is re-used about once a second, so one sender's ceiling is about its pool per second. The desk runner does not start the payments under 4,000 coins on the payment key (`HELD pile-short`). It logs the pile, the deal, and each sender's HOLD-3 and HOLD-4 share before the first payment. A payment ceiling is read against the pile size before it is called a node or network limit. The pile and the sender count are not changed once the payments are sending.
- (e) The payment pool survives a sender restart. A coin spent by a mempool transaction is not free, even if the UTXO index still lists it. An unspent output of one of our mempool transactions is a coin. Before the first payment and at the one repair, the runner deals the free coins evenly over the senders, in outpoint order, and each sender's loaded pool is read back and logged. The repair asks each sender to hand off its exact pool (the batch in flight finishes first); only a sender that does not hand off is killed, and then its last snapshot is used. The handed-off pools are checked against the node view, merged with the free set, and dealt again. A restarted sender never takes its pool from the confirmed UTXO list alone, and one sender never takes almost the whole pile.
- The desk runner passed a no-undef lint and an offline rehearsal on the desk before this live run: HOLD-1 scoring with its one repair inside HOLD-1, the pool handoff and the new deal at that repair, both senders sending at the offer after it, and a count-file render. The rehearsal fakes the family sender and the payment key's network (a local stand-in that rejects a coin already spent in the mempool and lists a coin in the UTXO index until its spender confirms) and sends nothing.
- Every pre-run 2, 3, 4, and 5 line above stays: no runner restart mid-run, children started detached, a family stall is not dirt, a full mempool returns the coin, the repair starts the missing senders, a failed HOLD or FAILED push is retried and leaves a local FAILED file, unique kaspads, the operator's start is the arm, Mini's clone has its git identity before its first push.
- The fee lines (100, 200, 150 sompi per gram, genesis 200), the abort line (2,500 coins and 18,000 usable tKAS), the HOLD-4 minute, the offers, and the node-set lines are not loosened.
- This repo does not edit Tuesday's repo, Wednesday's repo, or pre-run 1's, 2's, 3's, 4's, or 5's go files, and does not write `REVIEW_CLOSED`.

## Locked during pre-run 6

Nothing yet. When a fix works, append it here, one block per fix, in the form shown above: UTC time, what failed, what was changed, why that change stays.

```
- 2026-11-11T21:00:26Z.
- What worked: (d) the 6,000-coin payment pile was dealt fairly over the two senders before the first payment (3,000 / 3,000), and HOLD-1 (60,855 / 60,870 / 60,878 a minute) and HOLD-2 (120,337 / 120,999 / 122,285) met at exact pacing. (e) Both repairs used the handoff: each sender finished its batch, handed its pool over and exited, and nothing had to be killed (HOLD-3 at 20:33:12Z, pools 3,002 / 2,998; RETURN at 20:53:12Z, pools 3,000 / 3,000, 6,000 of 6,000 seen). Both senders loaded their lanes and sent again after each restart, with no reject run and no sender running dry, unlike pre-run 5. The pool was persisted and reused, and no sender took most of the pile. The bot wrote a legal NO SEND no-free-node for HOLD-4 (pinned minute 20:45Z). Every file reached origin on the first try. Both repairs were rehearsed offline first (R1 and R2) against fake nodes and a local origin, and both met HOLD-1 to HOLD-3 there.
- What failed: (1) The family sender latched off. At 20:31:18Z its node read a mempool of 90,000 or more, and the kit's sender set a one-way skip flag (NODE_SKIP reason=mempool_90k) that never clears. From then on, all 16 families stopped attempting, so every HOLD-3, HOLD-4 and RETURN minute was dirty (families-not-attempting=16). RETURN's payment minutes were on target (60,246 to 60,937), but RETURN still read NOT MET, and the payment repair could not fix it. (2) HOLD-3 read 132,439 to 144,595 a minute against 182,400. With 3,000 coins per sender, the pile was not the ceiling. The likely limit is submit latency on the two public kaspads (loops over 1 s, with each sender's due capped at 1.25 times its share). Node 1 also read as unread in some minutes. (3) At the HOLD-3 repair, the merged free set over-counted (7,018 against a 6,000 pile, while 88,930 inputs were spent in the mempool). The senders then dropped about 500 coins each as gone and saw 268 other rejects, so one lane fell to 2,864. The RETURN repair, with a quiet mempool, dealt exactly 6,000.
- What was changed: nothing in this run. The runner was not restarted, and the pile and the sender count were not changed. A next repo carries these lines: (i) a family sender's mempool skip must clear when the node's mempool falls back under the line, or the skip must apply only to payments, and a skip of the family node must be logged in phase.log as dirt with its reason; (ii) when every sender hands off, the deal takes the handoff pools as the truth and uses the merged node view only to drop spent coins, never to add coins; the deal total must not exceed the preflight pile; (iii) a higher payment offer needs more kept unique kaspads or more senders per kaspad, tested offline against a fake node with real submit latency, before the pile is raised again.
- Why that change stays: a one-way skip silently ends the family load for the rest of the run and makes every later step dirty, whatever the payments do. An over-counted deal hands senders coins that are already gone. Once the pile is big enough, the cap moves to the nodes, so more coins alone will not lift it.
```


The go files in this repo stay as they were at the start. A next repo copies this page and bakes the new lines into its own pastes.

## Locked for pre-run 7

These lines are baked into this repo's own pastes. They come from pre-run 6's worked fixes above (commit c527650 in [tn10-storm-2026-11-11-prerun-6](https://github.com/STP-KAS/tn10-storm-2026-11-11-prerun-6)). Everything above this heading is copied without change from that commit.

- Pre-run 6 finished through RETURN and is closed. It is not resumed. Its `PRE-RUN-OPEN`, `MINI-ARMED`, `FIXES`, and `METHOD` files are history in that repo, not gates here.
- Pre-run 6's genesis coins are spent. This repo publishes fresh `hashes/SIXTEEN.md` rows from the desk node with the sixteen-family publisher. Genesis launch paths begin `launch::storm-2026-10-`. A hash is never invented. The family submit uses the bundle that wrote this repo's file. Nothing rebuilds it after the publish.
- (i) The family sender's mempool skip is not one-way. kit17 (kit16 plus `mempool-skip.mjs`) clears a skip as soon as the node's mempool reads under the line again (`NODE_SKIP_CLEAR`). In this pre-run the skip does not apply to the families at all (`family_mempool_skip_line` 0): they keep attempting under any mempool, and a full mempool shows as a `mempool_full` reject. A family-node skip, if one is set, is logged in `logs/phase.log` with its reason, and every minute from `NODE_SKIP` to `NODE_SKIP_CLEAR` is dirt (`node-skip-fam:<reason>`). A mempool at or over 90,000 is logged as `NODE_MEMPOOL_HIGH` and is data, not dirt. The family sender has its own node: no third public kaspad answered in the TN10 resolver or the candidate lists, so it runs on the desk's private TN10 node, a unique synced kaspad that takes no payment submit. The locks say the two cohorts share one node set; they do not say that set is public. The families' node is sampled each minute, and an unread, unsynced, or DAA-still family node is dirt.
- (ii) When every payment sender hands off at the repair, the deal takes the handoff pools as the truth. The merged node view only drops coins it shows as spent by a mempool transaction, and never adds a coin. If a sender was killed, its last snapshot and the node's free set fill in, and the deal is capped at the preflight pile. No deal, at the start or at the repair, holds more coins than the preflight pile.
- (iii) The HOLD-3 limit moved from coins to nodes. Each kept unique kaspad gets three payment senders, each its own process, connection, and lane of coins (six on two kaspads; history: on 6 Oct six processes held 6,321 clean submit-OK tx/s, and ten were worse than six on 8 Oct). A slow submit loop may catch up to three times its share in one batch, not 1.25 times. The pile is 8,400 coins, 1,400 per sender. The first start checks that every sender logged `PAY_START` and starts any missing one once more. This was rehearsed offline against a stand-in whose connections answer in about 1-second loops before the live run.
- The desk runner passed a no-undef lint and offline rehearsals on the desk before this live run, with (i), (ii), and (iii) exercised. The rehearsal fakes the family sender and the payment key's network and sends nothing.
- Every pre-run 2, 3, 4, 5, and 6 line above stays: no runner restart mid-run, children started detached, a family stall is not dirt, a full mempool returns the coin, the repair starts the missing senders, the repair hands the pools off, a failed HOLD or FAILED push is retried and leaves a local FAILED file, unique kaspads not hostnames, the operator's start is the arm, Mini's clone has its git identity before its first push, Mini's node is started if it is down and never wiped, the desk node is never stopped by a pre-run and is started with PowerShell 7 only.
- The fee lines (100, 200, 150 sompi per gram, genesis 200), the abort line (2,500 coins and 18,000 usable tKAS), the HOLD-4 minute, the offers, and the node-set lines are not loosened.
- This repo does not edit Tuesday's repo, Wednesday's repo, or pre-run 1's, 2's, 3's, 4's, 5's, or 6's go files, and does not write `REVIEW_CLOSED`.

## Locked during pre-run 7

When a fix works, append it here, one block per fix, in the form shown above: UTC time, what failed, what was changed, why that change stays.

```
- 2026-11-11T22:14:13Z.
- What worked: (iii) three payment senders per kept kaspad on the same two public kaspads as pre-run 6. HOLD-3 met at 182,331 / 182,657 / 182,945 desk submit-OK a minute (pre-run 6: 132,439 to 144,595), and HOLD-4's pinned minute (22:09Z) read 223,569. No rejects and no dropped sockets; answer times 34 to 42 ms median. (i) The family node read a mempool of 90,000 or more once (22:02:38Z). It was logged as a mark, no skip was set, and all sixteen families kept attempting through RETURN. HOLD-1, HOLD-2, HOLD-3, and RETURN each met on their first three minutes, with no repair. Every count file reached origin on the first try. The bot filed a legal NO SEND no-free-node for HOLD-4.
- What failed: (1) Mini's node stopped validating the UTXO set from about 22:02Z under the load, so Mini's HOLD-3 (two of three minutes), HOLD-4, and RETURN files list their minutes as not read. Its heads repeat the desk's. (2) The covenant families nearly stopped landing from HOLD-2 on: floor (100 sompi/gram) and double (200) cohorts both lost to the 150 sompi/gram payments, and came back in RETURN. This is a finding, not a fault of the runner. (3) Submit-OK ran ahead of what blocks carried in HOLD-3 and HOLD-4. (ii) was not exercised live, because there was no repair.
- What was changed: nothing in this run. The runner was not restarted.
- Why that change stays: (i) and (iii) held under the first live run that used them. A next repo keeps them, and adds a counting path that keeps up under load before it calls any step above HOLD-2 a chain figure.
```

The go files in this repo stay as they were at the start. A next repo copies this page and bakes the new lines into its own pastes.

## Locked for pre-run 8

These lines are baked into this repo's own pastes. They come from pre-run 7's worked fixes above (commit 0dcd3c5 in [tn10-storm-2026-11-11-prerun-7](https://github.com/STP-KAS/tn10-storm-2026-11-11-prerun-7)). Everything above this heading is copied without change from that commit.

- Pre-run 7 finished through RETURN and is closed. It is not resumed. Its `PRE-RUN-OPEN`, `MINI-ARMED`, and `METHOD` files are history in that repo, not gates here.
- Pre-run 7's genesis coins are spent. This repo publishes fresh `hashes/SIXTEEN.md` rows from the desk node with the sixteen-family publisher. Genesis launch paths begin `launch::storm-2026-10-`. A hash is never invented. The family submit uses the bundle that wrote this repo's file. Nothing rebuilds it after the publish.
- (iv) A counting path that keeps up, or says it did not. On 2026-11-11 at 22:20Z the operator agreed that the desk's private TN10 node counts. The desk runner starts a read-only counter on that node (`tools/desk/counter.mjs`), detached, before the first family submit; no counter start line means `HELD counter-down` and no send. The counter reads the node's accepted chain (`getVirtualChainFromBlock` with accepted transaction ids), puts each accepted id in the minute of its accepting chain block's header time, and sorts it: our payments (ids the payment senders log after a submit-OK, kept in the private run folder only), our families by the fee on their submit row, coinbase (one per merged blue block), and other traffic. A removed chain block takes its counts back out. Every 10 s it reads the desk node's virtual DAA against a kept public kaspad's, and the desk sink's header age. A minute is final when a chain block 15 s past its end has been read. A minute is `LAGGING` if the DAA gap went over 100, the sink age over 30 s, or the counter read nothing for 20 s; `partial` if the counter did not read all of it. A count is never filled in. Each step file shows submit-OK and included side by side, after waiting up to 3 minutes for the counter; inclusion is reported, not scored. After RETURN the counter reads a 5-minute tail with every sender stopped, and `counts/chain/TIMELINE.md` lists every minute it read. A counter that exits mid-run is started once more (it is a reader, not a runner); its restart minute is partial. Mini is a second read, and its file head is its own read (`READ`, `PARTIAL`, `NOT READ`), never the desk's head.
- (v) Three family fee tiers. Families 1–6 (floor) pay 100 sompi/gram, 7–11 (double) 200, 12–16 (triple) 300. Payments 150, genesis 200. This changes the earlier fee line on purpose: pre-run 7 showed both 100 and 200 nearly stopping under payments at 150, and its 13/3 split left few double hops to read. One build, one builder process, the rate on each hop line, as before. The hashes file's cohort column says floor, double, or triple.
- The payment offers are not lowered. In pre-run 7 the blocks carried about 120,000–150,000 transactions a minute in all, so 1,013 sits under that, 2,027 about at it, and 3,040 and 4,053 over it. That spread is the congestion the question needs, and the counter shows which steps the blocks took. Scoring stays three clean minutes of submit-OK within 10 percent, or `NOT MET` after one repair.
- The bot: two unique public kaspads answered in every check through 2026-11-11T22:24Z, and the desk keeps both. The bot keeps its HOLD-4 rule and is expected to write `NO SEND no-free-node`. A third kaspad is used only if it answers synced with its own node id in the bot's pass.
- The desk runner passed a no-undef lint and an offline rehearsal on the desk before this live run, with (iv) and (v) exercised against a stand-in with block space under the HOLD-3 offer, a desk view that lags inside HOLD-2, and the submit latency of pre-run 7's rehearsal. It sends nothing to the network.
- Every pre-run 2 to 7 line above stays: no runner restart mid-run, children started detached, a family stall is not dirt, a full mempool returns the coin, the repair starts the missing senders, the repair hands the pools off and never deals more than the pile, a failed HOLD or FAILED push is retried and leaves a local FAILED file, unique kaspads not hostnames, three payment senders per kept kaspad, the family mempool skip does not apply to the families, the operator's start is the arm, Mini's clone has its git identity before its first push, Mini's node is started if it is down and never wiped, the desk node is never stopped by a pre-run and is started with PowerShell 7 only.
- The abort line (2,500 coins and 18,000 usable tKAS), the HOLD-4 minute, the offers, and the node-set lines are not loosened.
- This repo does not edit Tuesday's repo, Wednesday's repo, or pre-run 1's to 7's go files, and does not write `REVIEW_CLOSED`.

## Locked during pre-run 8

When a fix works, append it here, one block per fix, in the form shown above: UTC time, what failed or worked, what was changed, why that change stays.

```
- 2026-11-11T23:43:39Z.
- What worked: (iv) the desk's private TN10 node counted every minute from the counter's start to the end of the 5-minute tail. No minute was LAGGING: DAA gap at most 7 against the kept public kaspad, sink age at most about 1.2 s, each minute final about 20 s after its end. Every step file has submit-OK and included side by side. (v) The three tiers were verified on the submit rows (FEE_SPLIT 100/200/300) and read apart on the chain: at every congested step triple landed more than double and double more than floor. (iii) and (i) held again: six senders on two unique kaspads, HOLD-1, HOLD-2, HOLD-3 and RETURN met on their first three minutes, HOLD-4 read 234,063, no repair, every count file on origin on the first try. The bot filed a legal NO SEND no-free-node. The run needed one local fix before it opened: the desk's private run folder had no candidates file (the first open read HELD desk-node-down preflight-unread); pre-run 7's candidate list was copied in, private, and the open passed.
- What failed: nothing in the runner. Findings: blocks took about 110,000-132,000 accepted transactions a minute, so HOLD-3 and HOLD-4 built a backlog that drained through RETURN and the tail; from HOLD-2 on even the triple tier (twice the payment fee) fell to a fraction of its HOLD-1 rate, and the floor families stopped from 23:29Z. Mini read every minute but counts above the desk (it keys by block and id and does not take removed chain blocks out), so it is not a comparable second read.
- What was changed: nothing in this run. The runner was not restarted.
- Why that change stays: (iv) kept pace under the heaviest load this rehearsal has offered, so a next repo keeps the desk counter as the inclusion figure. A next repo checks its private candidates file in the open gate before it reads the node as down.
```

## Locked for pre-run 9

These lines are baked into this repo's own pastes. They come from pre-run 8's lessons and lock block (commit 9d46b1a in [tn10-storm-2026-11-11-prerun-8](https://github.com/STP-KAS/tn10-storm-2026-11-11-prerun-8)). Everything above this heading is copied without change from that commit.

- Pre-run 8 finished through RETURN and is closed. It is not resumed. Its `PRE-RUN-OPEN`, `MINI-ARMED`, and `METHOD` files are history in that repo, not gates here.
- Pre-run 8's genesis coins are spent. This repo publishes fresh `hashes/SIXTEEN.md` rows from the desk node with the sixteen-family publisher, before arming. Genesis launch paths begin `launch::storm-2026-10-`. A hash is never invented.
- (vi) Five family cohorts, one build. Floor (families 1–4) 100 sompi/gram, double (5–7) 200, triple (8–10) 300, triple-pub (11–13) 300, high (14–16) 1000. Payments 150, genesis 200. Triple-pub reads, catches up and submits on the kept public kaspads, round-robin, so it shares the payments' path; the other cohorts stay on the desk's private node. The family sender logs `FAMILY_PATH` and every row carries its path; the runner fails the run on a rate or path mismatch. This changes (v) on purpose: pre-run 8 could not tell fee from path.
- (vii) The offers are reshaped on purpose: HOLD-1 1,013, HOLD-2 1,800, HOLD-3 2,500, then the payment rate drops to 1,013 as soon as HOLD-3 is scored; the HOLD-4 observation minute and RETURN run at 1,013. Reason: pre-run 8's blocks took about 110,000–132,000 transactions a minute, so 1,800 is about at capacity and 2,500 over it, and pre-run 8's long over-capacity stretch crowded out other TN10 users. Scoring is unchanged: three clean minutes of submit-OK, or `NOT MET` after one repair. Each step file also says in how many minutes our payments were included within 10 percent of submit-OK, reported and not scored.
- (viii) The desk's private candidate list is an open check: absent or empty means `HELD candidates-missing`.
- (ix) Mini's second read counts each transaction id once and takes a removed chain block's transactions back out of a minute still open. Checked offline before the run. The desk counter stays the inclusion figure.
- The selection rule of the kaspad in use (rusty-kaspa v2.1.0, commit 01b532e) was read before the run and is cited in [plan/PLAN.md](../plan/PLAN.md#selection-rule) and `logs/METHOD.md`.
- The desk runner passed a no-undef lint and an offline rehearsal on the desk before this live run (2026-11-12 00:40Z–01:04Z): five cohorts and paths checked, HOLD-2 under and HOLD-3 over the stand-in's block space, a lagging desk view inside HOLD-2, the drop to 1,013 after HOLD-3, through RETURN, the tail, TIMELINE and METHOD. It sent nothing to the network.
- Every pre-run 2 to 8 line above stays: no runner restart mid-run, children started detached, a family stall is not dirt, a full mempool returns the coin, the repair starts the missing senders and hands the pools off, a failed HOLD or FAILED push is retried with a local FAILED file, unique kaspads, the desk counter, the desk node is never stopped.
- The abort line (2,500 coins and 18,000 usable tKAS), the HOLD-4 minute, and the node-set lines are not loosened.
- This repo does not edit Tuesday's repo, Wednesday's repo, or pre-run 1's to 8's go files, and does not write `REVIEW_CLOSED`.

## Locked during pre-run 9

When a fix works, append it here, one block per fix, in the form shown above: UTC time, what failed or worked, what was changed, why that change stays.

```
- 2026-11-12T01:38:38Z.
- What worked: (vi) five cohorts, one build: FEE_SPLIT verified on the submit rows (floor 100, double 200, triple 300 and high 1000 on the desk node; triple-pub 300 on the kept public kaspads), and every cohort read apart on the chain. (vii) the reshaped offers: HOLD-1, HOLD-2, HOLD-3 and RETURN met on their first three minutes on submit-OK, no repair; the rate fell to 1,013 at 01:24:12Z as HOLD-3 was scored, so the over-capacity stretch was about 3 minutes 48 seconds, the backlog drained by 01:26Z, and other TN10 traffic held at about 2,800-3,400 a minute throughout. (viii) the candidate check passed at the open. (iv) the desk counter kept pace in every whole minute (DAA gap at most 4, sink age at most about 1.2 s). (ix) Mini's id dedupe brought its non-coinbase within about 0.5 percent of the desk's. The bot filed a legal NO SEND no-free-node. No FAILED file; the runner was not restarted.
- What failed: nothing in the runner. Finding: Mini's hop columns are exactly twice the desk's, because classify() writes one row per covenant output and each hop has two. Finding: HOLD-2 at 1,800 tx/s was included as sent but already slowed the chained low-fee tiers (floor 13 percent, double 25 percent, triple 38 percent of the HOLD-1 hop rate; high 92 percent).
- What was changed: nothing in this run.
- Why that change stays: (vi) gave the first same-fee, two-path reading (triple-pub landed about a third more hops than triple at the same 300), so a next repo keeps one same-fee pair on two paths or puts every cohort on one path. (vii) a short over-capacity stretch gave a clean over-capacity reading without crowding out other users, so a next repo keeps the drop after HOLD-3. Mini's hop count is fixed offline to one hop per transaction before a next repo uses it.
```

## Locked for pre-run 10

These lines are baked into this repo's own pastes. They come from pre-run 9's lessons and lock block (commit 485e418 in [tn10-storm-2026-11-11-prerun-9](https://github.com/STP-KAS/tn10-storm-2026-11-11-prerun-9)). Everything above this heading is copied without change from that commit. This is our own TN10 testing; each line records what we observed and chose, not a general claim.

- Pre-run 9 finished through RETURN and is closed. It is not resumed. Its `PRE-RUN-OPEN`, `MINI-ARMED`, and `METHOD` files are history in that repo, not gates here.
- Pre-run 9's genesis coins are spent. Keys 1–15 were funded again from the lane before this repo's hashes (15 transactions, recorded privately). This repo publishes fresh `hashes/SIXTEEN.md` rows from the desk node with the sixteen-family publisher, before arming. Genesis launch paths begin `launch::storm-2026-10-`. A hash is never invented.
- (x) The offers are reshaped on purpose: HOLD-1 1,013, HOLD-2 1,500, HOLD-3 1,800, then the payment rate drops to 1,013 as soon as HOLD-3 is scored; the HOLD-4 observation minute and RETURN run at 1,013. Reason: in pre-run 9, 1,800 was included as sent but the chained low-fee tiers had already slowed, and no step below it was measured. No step is offered over the block space we observed (about 110,000–132,000 a minute), because in pre-run 8 our over-capacity load crowded out other TN10 users. Scoring is unchanged.
- (vi) is kept unchanged: five cohorts, one build, triple and triple-pub as the one same-fee pair on two paths, so pre-run 9 and pre-run 10 compare cohort for cohort.
- (xi) Mini's second read counts one hop per transaction: `classify()` gives one row per transaction, not one per covenant output (pre-run 9's Mini hop columns were exactly twice the desk's in 12 of 13 scored-minute rows). The id dedupe and the chain-block removal from (ix) stay. Checked offline (`tools/mini/mini-classify-test.mjs`, `tools/mini/mini-dedupe-test.mjs`). The desk counter stays the inclusion figure.
- (viii) stays an open check: the desk's private candidate list absent or empty means `HELD candidates-missing`, before any node is read.
- The desk runner passed a no-undef lint and an offline rehearsal on the desk before this live run (see [PLAYBOOK.md](../PLAYBOOK.md#offline-rehearsal-recorded-before-pre-run-open)). It sent nothing to the network.
- Every pre-run 2 to 9 line above stays: no runner restart mid-run, children started detached, a family stall is not dirt, a full mempool returns the coin, the repair starts the missing senders and hands the pools off, a failed HOLD or FAILED push is retried with a local FAILED file, unique kaspads, the desk counter, the desk node is never stopped.
- The abort line (2,500 coins and 18,000 usable tKAS), the HOLD-4 minute, and the node-set lines are not loosened.
- This repo does not edit Tuesday's repo, Wednesday's repo, or pre-run 1's to 9's go files, and does not write `REVIEW_CLOSED`.

## Locked during pre-run 10

When a fix works, append it here, one block per fix, in the form shown above: UTC time, what failed or worked, what was changed, why that change stays.

```
- 2026-11-12T07:53:38Z.
- What worked: (x) the reshaped offers: HOLD-1, HOLD-2, HOLD-3 and RETURN met on their first three minutes on submit-OK, no repair; the rate fell to 1,013 at 07:39:12Z as HOLD-3 was scored; no over-capacity step was offered. (vi) five cohorts, one build: FEE_SPLIT verified on the submit rows. (viii) the candidate check passed at the open. (iv) the desk counter kept pace in every whole minute (DAA gap at most 3, sink age at most about 1.2 s). (xi) Mini's one-hop-per-transaction count matched the desk in 49 of 50 cohort cells in HOLD-1 to HOLD-4 (the one mismatch: floor at 07:28Z, desk 3, Mini 2); all 15 RETURN cells matched. The bot filed a legal NO SEND no-free-node. No FAILED file; the runner was not restarted.
- What failed: nothing in the runner. Finding: in this run the cheap chained tiers were already slow at HOLD-1 1,013 tx/s (floor 20 hops in the three scored minutes against 373 in pre-run 9's HOLD-1; median 14.0 s against 1.6 s), so the 1,500 vs 1,800 comparison starts from that baseline. Floor did not return to pre-run 9's uncongested HOLD-1 rate in RETURN (15 hops, median 30.2 s).
- What was changed: nothing in this run.
- Why that change stays: (x) still dropped the rate after HOLD-3 and offered nothing over the band we had observed. (xi) the Mini hop fix held live in 49 of 50 cells and should be kept. A next repo that wants a clean 1,500 vs 1,800 reading would need a HOLD-1 where the cheap tiers land like they did in pre-run 9, or a recorded reason why they do not.
```

## Locked for pre-run 11

These lines are baked into this repo's own pastes. They come from pre-run 10's lessons and lock block (commit ef3ee51 in [tn10-storm-2026-11-11-prerun-10](https://github.com/STP-KAS/tn10-storm-2026-11-11-prerun-10)). Everything above this heading is copied without change from that commit. This is our own TN10 testing; each line records what we observed and chose, not a general claim.

- Pre-run 10 finished through RETURN and is closed. It is not resumed. Its `PRE-RUN-OPEN`, `MINI-ARMED`, and `METHOD` files are history in that repo, not gates here.
- Pre-run 10's genesis coins are spent. Keys 1–15 were funded again from the lane before this repo's hashes (15 transactions, none rejected, recorded privately). This repo publishes fresh `hashes/SIXTEEN.md` rows from the desk node with the sixteen-family publisher, before arming. Genesis launch paths begin `launch::storm-2026-10-`. A hash is never invented.
- (xii) A read-only mempool and template probe runs on the desk's private node from before the counter to the end of the tail (`tools/desk/mempool-probe.mjs`), every 20 s. It submits nothing, holds no key, and no sender reads its output; the fees stay fixed per cohort. A probe that does not start, or stops, is logged as information and is not dirt: the desk counter stays the inclusion figure. The same code is run by hand before the open into a separate file. Reason: pre-run 10 could not say why cheap chains were slow at 1,013 because it had no read of the mempool; a read before this repo was opened showed another sender's heavy-storage-mass stream in the desk node's mempool and in the chain from about 06:00Z.
- (xiii) Steps: BASE (families only, 8 whole minutes, `OBSERVATION`), HOLD-1 400, HOLD-2 700, HOLD-3 1,013 (scored: three clean minutes of submit-OK, at least four minutes evaluated, `NOT MET` after one repair), 1,013 kept to the HOLD-4 observation minute, then RETURN at 0 (families only, 10 whole minutes, `OBSERVATION`). Reason: the slow start in pre-run 10 needs a no-load reference in the same run and steps below 1,013; the drain needs a stretch with no payment load. Nothing is offered over the block space we observed.
- (vi) five cohorts, one build, and (xi) Mini's one-hop-per-transaction count are kept unchanged, so pre-runs 9, 10 and 11 compare cohort for cohort.
- (viii) stays an open check: the desk's private candidate list absent or empty means `HELD candidates-missing`, before any node is read.
- The desk runner passes a no-undef lint and an offline rehearsal on the desk before this live run (see [PLAYBOOK.md](../PLAYBOOK.md#offline-rehearsal-recorded-before-pre-run-open)). It sends nothing to the network.
- Every pre-run 2 to 10 line above stays: no runner restart mid-run, children started detached, a family stall is not dirt, a full mempool returns the coin, the repair starts the missing senders and hands the pools off, a failed HOLD or FAILED push is retried with a local FAILED file, unique kaspads, the desk counter, the desk node is never stopped.
- The abort line (2,500 coins and 18,000 usable tKAS), the HOLD-4 minute, and the node-set lines are not loosened.
- This repo does not edit Tuesday's repo, Wednesday's repo, or pre-run 1's to 10's go files, and does not write `REVIEW_CLOSED`.

## Locked during pre-run 11

When a fix works, append it here, one block per fix, in the form shown above: UTC time, what failed or worked, what was changed, why that change stays.

```
- 2026-11-12T09:46:41Z.
- What worked: (xii) the read-only probe ran from 09:00:28Z to 09:46:32Z (137 samples) and before the open (117 samples), submitted nothing, and its MEMPOOL.md reached origin; it is what tied the floor's speed to the ready mass. (xiii) the reshaped steps: BASE observed (8 minutes), HOLD-1 400, HOLD-2 700 and HOLD-3 1,013 met on their first evaluated minutes on submit-OK, no repair; the rate stayed at 1,013 to the HOLD-4 minute and went to 0 at 09:30:12Z; RETURN observed (10 minutes). (vi) five cohorts, one build: FEE_SPLIT verified on the submit rows. (viii) the candidate check passed at the open. (iv) the desk counter kept pace in every whole minute (DAA gap at most 2, sink age at most about 0.85 s). (xi) Mini's one-hop-per-transaction count matched the desk in 155 of 155 cohort cells over the 31 scored minutes. The bot filed a legal NO SEND no-free-node. No FAILED file; the runner was not restarted.
- What failed: nothing in the runner. Finding: in this run the floor's hops per minute followed the ready mass in the desk mempool (Spearman -0.93 over 09:01Z to 09:40Z) and the outside fee-100 heavy stream (-0.86), not our payment offer (-0.26). Floor ran at its BASE rate under 700 tx/s while the stream was away (09:16-09:17Z: 145, 146) and at 16-26 a minute in RETURN with no payments of ours, while the stream's backlog of up to about 1,000 entries drained (about 11 minutes after the rate went to 0). Our payments at 150 pushed that stream back during HOLD-3 and HOLD-4, which seems to be how its backlog grew. Coordinator resync lines (8, families 1-4 and 11-13) were logged and were not dirt.
- What was changed: nothing in this run.
- Why that change stays: (xii) the probe stays: without it pre-run 10's slow start had no reading. (xiii) a no-load BASE and an unscored RETURN at 0 stay useful as references in the same run. (xi) Mini's hop count stays. A next repo that asks which fee keeps a cheap chain ahead of a heavy same-fee competitor should put the families on rates near 100 and read them against the ready mass, keep our payments off the tiers it compares (or leave them out), and, if it adds a heavy competitor of its own, bound it and record it, because it also delays other users' transactions.
```

## Locked for pre-run 12

These lines are baked into this repo's own pastes. They come from pre-run 11's lessons and lock block (commit e185e5b in [tn10-storm-2026-11-11-prerun-11](https://github.com/STP-KAS/tn10-storm-2026-11-11-prerun-11)). Everything above this heading is copied without change from that commit. This is our own TN10 testing; each line records what we observed and chose, not a general claim.

- Pre-run 11 finished through RETURN and is closed. It is not resumed. Its `PRE-RUN-OPEN`, `MINI-ARMED`, and `METHOD` files are history in that repo, not gates here.
- Pre-run 11's genesis coins are spent. Keys 1–15 were funded again from the lane before this repo's hashes (15 transactions, none rejected, recorded privately). This repo publishes fresh `hashes/SIXTEEN.md` rows from the desk node with the sixteen-family publisher, before arming. Genesis launch paths begin `launch::storm-2026-10-`. A hash is never invented.
- (xiv) Five fee tiers near the floor, one build, every family on the desk's private node: floor 1–4 at 100, r110 5–7 at 110, r126 8–10 at 126, r150 11–13 at 150, r200 14–16 at 200 sompi/gram. kit20 is kit19 with this repo's `family-fees.mjs`; the sender still refuses a config whose rates differ. Reason: pre-run 11 tied the floor's speed to an outside fee-100 heavy stream; the question is now which fee near 100 keeps a chain moving against it. The public path (pre-runs 9–11's triple-pub) is dropped so every tier differs only by rate. This replaces (vi) for this repo.
- (xv) No payment load of ours: no payment sender is started and no pile is dealt. Steps: BASE 8 minutes, HOLD-1..3 as observation stretches OBS-1..3 of 12 minutes each, the pinned HOLD-4 minute, RETURN 8 minutes, the 5-minute counter tail; all `OBSERVATION`, nothing scored. The HOLD file names are kept so the bot's HOLD-4 pin and Mini's second read work as before. This replaces (xiii) for this repo. Reason: in pre-run 11 our payments at 150 were part of the ready mass and pushed the outside stream back; without them the only competitor is outside our control. If the outside stream is absent, the run goes on and records it as the control.
- No heavy-mass lane of our own in this repo. A heavy competitor of ours would also delay other users' transactions; it needs the operator's explicit OK and is not built or submitted here.
- (xii) the probe stays, plus a heavy count (mass over 200,000) and a heavy-and-ready count per outside fee bucket. (xi) Mini's one-hop-per-transaction count stays. (viii) stays an open check.
- The desk runner passes a syntax check and an offline rehearsal on the desk before this live run (see [PLAYBOOK.md](../PLAYBOOK.md#offline-rehearsal-recorded-before-pre-run-open)). It sends nothing to the network.
- Every pre-run 2 to 11 line above stays where it still applies: no runner restart mid-run, children started detached, a family stall is not dirt, a failed HOLD or FAILED push is retried with a local FAILED file, unique kaspads, the desk counter, the desk node is never stopped.
- The abort line (2,500 coins and 18,000 usable tKAS), the HOLD-4 minute, and the node-set lines are not loosened.
- This repo does not edit Tuesday's repo, Wednesday's repo, or pre-run 1's to 11's go files, and does not write `REVIEW_CLOSED`.

## Locked during pre-run 12

When a fix works, append it here, one block per fix, in the form shown above: UTC time, what failed or worked, what was changed, why that change stays.

```
- 2026-11-12T11:46:41Z.
- What worked: (xiv) five fee tiers near the floor, one build, all on the desk's private node: FEE_SPLIT verified on the family sender's line (floor 1-4:100, r110 5-7:110, r126 8-10:126, r150 11-13:150, r200 14-16:200, one builder); every OK hop landed in every step (40,440 over the run). (xv) no payment load: BASE 8 minutes, OBS-1..3 12 minutes each, the HOLD-4 minute (11:31Z), RETURN 8 minutes, all OBSERVATION, every minute clean, no repair. (xii) the probe ran 10:38:53Z to 11:46:31Z (202 samples) with the heavy and heavy-ready counts, submitted nothing, and its MEMPOOL.md reached origin. (iv) the desk counter kept pace in every whole minute (DAA gap at most 2, sink age at most about 1.15 s). (xi) Mini's count matched the desk in 259 of 265 cohort cells; the 6 misses were one hop low on Mini at 11:25Z and 11:26Z, next to 19 late removals Mini logged right after its HOLD-3 publish. The bot filed a legal NO SEND no-free-node. No FAILED file; the runner was not restarted; Mini ended after its 15-minute tail at 11:56:32Z.
- What failed: nothing in the runner. Label only: the auto METHOD commit message read `Pre-run 11 method.` (3d7477a), and the FAILED path has the same pre-run 11 label. Finding: with the outside stream absent (11:02-11:11Z, ready mass 0.6-1.5 blocks) all five tiers ran at 48.5-49.5 hops per family a minute; with it present the per-family medians were floor 76, r110 77, r126 82, r150 87, r200 92 percent of that, and 52/55/64/66/80 percent over 9 blocks of ready mass. r200 held at least 90 percent in 27 of 43 stream-present minutes; r110 was barely better than floor.
- What was changed: nothing in this run. The label is to be fixed in the next repo's runner (pre-run number from the config).
- Why that change stays: (xiv) per-family tiers on one node and one build stay the way to compare fees. A stream-absent stretch is the reference to read against; BASE alone is not clean while an outside stream runs. (xii) the heavy count stays. (xi) stays, and its late-removal lines should be read next to any mismatch. A next repo that wants the competitor on demand needs its own bounded heavy lane, calibrated on the node's storage mass (our SDK's calculateStorageMass counts plurality 1; consensus counts covenant outputs at 2, four times the storage term), capped by ready count and by the lane budget, and recorded.
```


## Locked for pre-run 13

These lines are baked into this repo's own pastes. They come from pre-run 12's lessons and lock block (commit 3538ec1 in [tn10-storm-2026-11-11-prerun-12](https://github.com/STP-KAS/tn10-storm-2026-11-11-prerun-12)). Everything above this heading is copied without change from that commit. This is our own TN10 testing; each line records what we observed and chose, not a general claim.

- Pre-run 12 finished through RETURN and is closed. It is not resumed. Its `PRE-RUN-OPEN`, `MINI-ARMED`, and `METHOD` files are history in that repo, not gates here.
- Pre-run 12's genesis coins are spent. Keys 1–15 were funded again from the lane before this repo's hashes (2026-11-12T12:13:14Z, 15 transactions, none rejected, recorded privately). This repo publishes fresh `hashes/SIXTEEN.md` rows from the desk node with the sixteen-family publisher, before arming. Genesis launch paths begin `launch::storm-2026-10-`. A hash is never invented.
- (xiv) stays: five fee tiers, one build, every family on the desk's private node (floor 1–4 100, r110 5–7 110, r126 8–10 126, r150 11–13 150, r200 14–16 200). kit20 unchanged. (xv) stays: no payment load of ours.
- (xvi) Our own heavy lane, with the operator's explicit OK (chat, 2026-11-12, about 11:08 and 11:10 Brussels time). This replaces pre-run 12's "no heavy lane" line for this repo only. Shape: one input from the payment key, 0.0375 tKAS to a dedicated sink key of ours plus the change back into the chain, plain outputs (plurality 1), about 266,670 storage mass, fee = rate × mass at 100 (126 in HOLD-3). Money only from the payment key. Ready count N set by the runner on one timeline: BASE 0, HOLD-1 10/20/40/60, HOLD-2 40/20/0, HOLD-3 40 at 126, then 0 through HOLD-4 and RETURN, 12 whole minutes per lane step. Guards: N + 2 pause, 600 submits a minute, hold at mempool 90,000 or ready mass over 45 blocks, stop at 16,000 tKAS of fees or 20,000 tKAS moved or the pile under 100,000 tKAS, stop on a non-timing rejection or a drift from the calibration. Reason: pre-runs 10–12 could not control the outside heavy stream; a lane of ours makes the competitor a known dial.
- Calibration before the lane: one lane transaction built as the lane builds it, submitted on the desk's private node, read back from the desk mempool. The lane goes on only if the node's storage mass is within 1 percent of the SDK's and the node fee rate is 99–101; otherwise it does not run, and both figures are logged. Reason: pre-run 12's source check found that our SDK and the node count storage mass differently for covenant (plurality 2) outputs.
- Public statement: this repo says in its README, plan and method that we ran our own heavy lane on TN10 and that it slowed other users' low-fee transactions while it ran.
- The lane's sink outputs are not swept in this run. A sweep is a separate, later, logged step.
- (xii) the probe and (iv) the counter record our heavy apart from other traffic (class `heavy`, `hv`). (xi) Mini's one-hop-per-transaction count stays; Mini does not separate our lane from other traffic.
- The run number in the runner's commit messages and FAILED text comes from the config (pre-run 12's `Pre-run 11` leftovers are fixed).
- The desk runner passes a syntax check and an offline rehearsal on the desk before this live run (see [PLAYBOOK.md](../PLAYBOOK.md#offline-rehearsal-recorded-before-pre-run-open)); in it the lane submits only to the rehearsal stand-in.
- Every pre-run 2 to 12 line above stays where it still applies: no runner restart mid-run, children started detached, a family stall is not dirt, a failed HOLD or FAILED push is retried with a local FAILED file, unique kaspads, the desk counter, the desk node is never stopped.
- The abort line (2,500 coins and 18,000 usable tKAS), the HOLD-4 minute, and the node-set lines are not loosened.
- This repo does not edit Tuesday's repo, Wednesday's repo, or pre-run 1's to 12's go files, and does not write `REVIEW_CLOSED`.

## Locked during pre-run 13

When a fix works, append it here, one block per fix, in the form shown above: UTC time, what failed or worked, what was changed, why that change stays.

```
- 2026-11-12T15:17:53Z.
- What worked: (xvi) our own heavy lane, calibrated on the node (storage mass 266,670 on both sides, fee rate 100.00), ran the whole timeline: 40,830 transactions accepted, 0 rejected, 0 lost, no guard tripped, node fee rate exactly 100.00 at 100 and 126.00 at 126 on every entry; 11,339.73 tKAS in fees, 1,531.13 tKAS parked on our sink key (not swept). The outside heavy stream was absent all run, so the lane was the only heavy competitor. (xiv) five tiers on one node: per family, N = 10 kept 95-101 percent of BASE, N = 20 68-86 (up) / 81-94 (down), N = 40 13-51 (up) / 26-67 (down), N = 60 11-51, N = 40 at 126 8-41 (floor to r200). (xii) the probe ran to the stop with template columns. (iv) every published whole minute kept pace. (xi) Mini matched the desk in 545 of 545 cohort cells and stopped on FAILED at 15:18:17Z. The bot filed a legal NO SEND no-free-node, late (waiter fetch hang).
- What failed: the run, 1.5 minutes before RETURN would have closed: the family lane's abort line counts key 0 coins over 3 tKAS; hop change had fragmented key 0 (54,992 coins, 52,505 of them at 3 tKAS or less, 219,195 tKAS in all), so the count went under 2,500 with 109,513 usable tKAS left. RETURN, TIMELINE, MEMPOOL and METHOD were not published by the runner (METHOD written by the operator). The bot waiter's `timeout 25 git fetch` hung 336.7 s, so it read HOLD-3 after its pinned minute. Finding: our family hops pay 13,046 x the tier rate but carry about 40,900 storage mass, so the node's fee rate for them was about 32 / 35 / 40 / 48 / 65, not 100 / 110 / 126 / 150 / 200.
- What was changed: nothing in this run (no restart, nothing killed).
- Why that change stays, for the next repo: consolidate key 0 before the open and gate on usable tKAS (or the family sender's pool), not the raw coin count; price family hops on the node's mass and calibrate one hop on the node before the open, as the lane was; the waiter uses `timeout -k`, git low-speed limits and writes a late check as late. The lane's calibration-first rule, its ready-count dial and the public statement stay. N = 60 under a 600-a-minute cap gave the same as N = 40; drop it or lift the cap.
```

## Locked for pre-run 14

These lines are baked into this repo's own pastes. They come from pre-run 13's lessons and lock block (commit e711613 in [tn10-storm-2026-11-11-prerun-13](https://github.com/STP-KAS/tn10-storm-2026-11-11-prerun-13)). Everything above this heading is copied without change from that commit. This is our own TN10 testing; each line records what we observed and chose, not a general claim.

- Pre-run 13 failed in RETURN and is closed. It is not resumed. Its `PRE-RUN-OPEN`, `MINI-ARMED`, `FAILED` and `METHOD` files are history in that repo, not gates here.
- Pre-run 13's genesis coins are spent. Keys 1–15 were funded again from the family lane before this repo's hashes (2026-11-12T15:43:17Z, 15 transactions, none rejected, recorded privately). This repo publishes fresh `hashes/SIXTEEN.md` rows from the desk node with the sixteen-family publisher, before arming. Genesis launch paths begin `launch::storm-2026-10-`. A hash is never invented.
- (xvii) Hops are priced on their node-side mass (kit21, [tools/kit21](../tools/kit21/kit21-node-mass.patch)): for each hop the family sender computes the rusty-kaspa v2.1.0 storage mass (KIP-9 with UTXO plurality) and the node mass max(storage, compute, transient ÷ 2), and asks the builder for a bill rate on its own mass so that fee ÷ node mass is the tier's rate, within 1 percent and not under it; otherwise the hop is not submitted. Tiers by node rate: floor 1–4 100, r126 5–7 126, r150 8–10 150, r200 11–13 200, r300 14–16 300. Reason: pre-runs 9–13 priced on the builder's 13,046 while the node rated the hop on about 40,900, so their tiers were about 32 to 65 on the node.
- Hop calibration before the open: one calibration covenant (not a family), two hops at 100 and 300, read back from the desk mempool; the families run only if both node rates are within 1 percent of the tier and the node's storage mass is within 1 percent of kit21's. Passed 2026-11-12T15:43:28Z (100.27 and 300.18, storage mass equal).
- (xvi) Our own heavy lane stays (the operator's OK, 2026-11-12, about 11:08 and 11:10 Brussels time; at 15:19 he said tKAS is not a limit). Shape, calibration-first rule and guards are pre-run 13's. Timeline: BASE 0, HOLD-1 20 then 40 at 100, HOLD-2 0, HOLD-3 20 then 40 at 126, then 0 through HOLD-4 and RETURN, 12 whole minutes per lane step. N = 60 is dropped (pre-run 13: the same as 40 under the 600-a-minute cap). Lane calibration passed again 2026-11-12T15:43:42Z (266,670 on both sides, 100.00).
- The family lane (key 0) was consolidated before the open (2026-11-12T15:42Z: 52,505 coins of 3 tKAS or less into 4,772 of about 20 tKAS). The abort line is now **usable tKAS under 18,000** (coins over 3 tKAS, less 3 tKAS each); the coin count is logged once if it goes under 2,500 and is not a gate. Reason: pre-run 13 failed on the coin count with 109,513 usable tKAS left.
- The bot waiter's fetches are `timeout -k 5 20` with git's low-speed limits, retried after 2 s; a free check that starts after pin − 40 s is logged as LATE and the bot file says LATE with the seconds. Reason: pre-run 13's waiter fetch hung 336.7 s despite `timeout 25`.
- Public statement: this repo says in its README, plan and playbook that we run our own heavy lane on TN10 and that it slows other TN10 users' low-fee transactions while it runs.
- The lane's sink outputs (pre-run 13's and this run's, one sink key) are not swept in this run. A sweep is a separate, later, logged step.
- (xii) the probe adds per class the fee sum and the lowest and highest fee ÷ node mass. (xi) Mini's one-hop-per-transaction count stays, with the new tier names.
- The desk runner passes a syntax check and an offline rehearsal on the desk before this live run (see [PLAYBOOK.md](../PLAYBOOK.md#offline-rehearsal-recorded-before-pre-run-open)); in it the lane submits only to the rehearsal stand-in.
- Every pre-run 2 to 13 line above stays where it still applies: no runner restart mid-run, children started detached, a family stall is not dirt, a failed HOLD or FAILED push is retried with a local FAILED file, unique kaspads, the desk counter, the desk node is never stopped.
- The HOLD-4 minute and the node-set lines are not loosened.
- This repo does not edit Tuesday's repo, Wednesday's repo, or pre-run 1's to 13's go files, and does not write `REVIEW_CLOSED`.

## Locked during pre-run 14

When a fix works, append it here, one block per fix, in the form shown above: UTC time, what failed or worked, what was changed, why that change stays.

```
- 2026-11-12T19:57:44Z.
- What worked: kit21 priced every family hop on the node's own mass: node rates as built and as read in the desk mempool 100-100.32 / 126-126.32 / 150-150.32 / 200-200.32 / 300-300.32 on about 41,000 node mass, calibrated first (node storage mass = kit21's, 0.00 percent). Key 0 consolidated before the open and the abort line on usable tKAS: never near (126,748 usable at the end). Our heavy lane, calibrated first: 13,150 accepted, 0 rejected, 0 lost, node rate exactly the lane's rate on every entry; 4,031.00 tKAS fees, 493.13 parked (not swept). Every step, RETURN, TIMELINE, MEMPOOL and METHOD on origin; every whole minute kept pace. Per family, share of BASE (floor / r126 / r150 / r200 / r300): N20@100 82/92/97/99/101, N40@100 76/86/91/96/101, N20@126 79/88/98/104/106, N40@126 66/80/89/96/103, RETURN 95/99/102/104/104. A hop at the lane's rate lost 12-24 percent; at about 1.6-2x it stayed within about 4 percent; at 2.4-3x it held. Recovery under a minute. Mini 422 of 425 cells. The bot waiter (timeout -k, low-speed limits) read HOLD-3 5 s after origin and filed an on-time NO SEND no-free-node. The outside heavy fee-100 stream was present all run.
- What failed: nothing stopped the run. Notes: the lane's 45-block ready-mass hold capped N = 40 (15 holds of 20 s) because the outside stream's ready heavies counted too; BASE was lighter than the later N = 0 minutes, so a middle N = 0 control was needed as a second reference; Mini logged 42 late removals (pre-run 13: 0) and 3 cells off by 1-3; the box running the bot paused for up to about 2 minutes while idle (likely the 237 s fetch at 18:35Z).
- What was changed: nothing during the run (no restart, nothing killed).
- Why that change stays, for the next repo: price hops on the node's mass and calibrate one hop first; gate key 0 on usable tKAS; keep the middle N = 0 control, the probe's template columns, the node-rate table, Mini's count and the waiter's fetch handling; keep the box busy through HOLD-3 and the pin. If the question is a lane bigger than the hold allows, raise the hold on purpose and say so.
```

## Locked for pre-run 15

These lines are baked into this repo's own pastes. They come from pre-run 14's lessons and lock block (commit 53e1036 in [tn10-storm-2026-11-11-prerun-14](https://github.com/STP-KAS/tn10-storm-2026-11-11-prerun-14)). Everything above this heading is copied without change from that commit. This is our own TN10 testing; each line records what we observed and chose, not a general claim.

- Pre-run 14 finished through RETURN and is closed. It is not resumed. Its `PRE-RUN-OPEN`, `MINI-ARMED` and `METHOD` files are history in that repo, not gates here.
- Pre-run 14's genesis coins are spent. Keys 1–15 were funded again from the family lane before this repo's hashes (2026-11-12T20:16:57Z, 15 transactions; keys 1–3 again at 20:18:12Z because their first coins came out just under the 15 tKAS line; none rejected, recorded privately). This repo publishes fresh `hashes/SIXTEEN.md` rows from the desk node with the sixteen-family publisher, before arming. A hash is never invented.
- (xviii) Tiers by node rate (kit22 = kit21 with this table): floor 1–4 100, r150 5–7 150, r200 8–10 200, r300 11–13 300, r450 14–16 450. Pricing on the node's mass, as pre-run 14 (xvii). Hop calibration before the open at 100 and 450 passed 2026-11-12T20:17:31Z (100.24 and 450.26, storage mass equal).
- Our heavy lane stays (the operator's OK, 2026-11-12). Timeline: BASE 0, HOLD-1 60 at 126, HOLD-2 0, HOLD-3 40 then 60 at 150, then 0 through HOLD-4 and RETURN, 12 whole minutes per lane step. **On purpose:** the lane's ready-mass hold is raised from 45 to 80 blocks and its submit cap from 600 to 1,200 a minute, so N = 60 is not capped by the lane's own guards (pre-run 14's N = 40 sat on the 45-block hold). The mempool hold (90,000), the N + 2 pause and the spend caps stay. Lane calibration passed again 2026-11-12T20:17:35Z (266,671 on both sides, 100.00).
- Key 0 consolidated again before the open (2026-11-12T20:16Z, 2,239 coins of 3 tKAS or less into 205). The abort line stays 18,000 usable tKAS.
- The bot waiter keeps pre-run 14's fetch handling (`timeout -k 5 20`, low-speed limits, LATE marking). The operator's agent keeps the box busy through HOLD-3 and the pin (the box paused while idle in pre-run 14).
- Public statement: this repo says in its README, plan and playbook that we run our own heavy lane on TN10 and that it slows other TN10 users' transactions while it runs.
- The lane's sink outputs (pre-runs 13–15, one sink key) are not swept in this run.
- Every pre-run 2 to 14 line above stays where it still applies. The HOLD-4 minute and the node-set lines are not loosened.
- This repo does not edit Tuesday's repo, Wednesday's repo, or pre-run 1's to 14's go files, and does not write `REVIEW_CLOSED`.

## Locked during pre-run 15

When a fix works, append it here, one block per fix, in the form shown above: UTC time, what failed or worked, what was changed, why that change stays.

```
- 2026-11-12T22:10:44Z.
- What worked: hops priced on the node's mass (kit22, calibrated at 100 and 450 first) against our own heavy lane uncapped (80-block hold, never tripped): 15,831 lane transactions accepted, 0 rejected, 0 lost, 6,005.60 tKAS fees, 593.66 parked (not swept). Every OK family hop included (9,492 / 9,484 / 10,755 / 11,790 / 12,203), every step, RETURN, TIMELINE, MEMPOOL and METHOD on origin, every whole minute kept pace. Per family, share of BASE (floor / r150 / r200 / r300 / r450): N60@126 49/75/92/99/103, HOLD-2 82/94/99/101/101, N40@150 48/74/90/98/103, N60@150 38/65/80/95/98, RETURN 78/89/93/96/97. About 2x the lane's rate kept 95-98 percent; about 3x held at about 60 blocks of ready mass. Lane waiting transactions cleared within a minute. Mini 365 of 365 cells, 0 late removals. The outside heavy fee-100 stream was present all run.
- What failed: the box that runs the bot rebooted at about 21:30Z and rolled its files back to about 21:28Z; the waiter and finisher were relaunched at 21:42:38Z; the free-node check crashed at the pin (a library it loaded from another box folder was gone), the waiter decided no send at 21:50:21Z without reading a node, and the finisher could not render. The bot file was written from the logs and pushed late (21:55:09Z), not backdated: NO SEND check-failed, not a legal no-free-node.
- What was changed: after the minute, on the box only: the bot's free check loads its library from a path that survived the reboot; the renderer takes the last line that is a check result and stops with a clear message if there is none. Nothing on the desk or Mini was changed during the run.
- Why that change stays, for the next repo: keep pricing on the node's mass, the calibrations, the middle N = 0 control, the probe's template columns, Mini's count and the waiter's fetch handling. Run the bot's free check once, read-only, before arming, so a missing module shows before the pin. Consolidate key 0 first (320 coins over 3 tKAS left). If a lane must not slow other users this much, cap it lower on purpose.
```

## Locked for pre-run 16

These lines are baked into this repo's own pastes. They come from pre-run 15's lessons and lock block (commit cfeb80e in [tn10-storm-2026-11-11-prerun-15](https://github.com/STP-KAS/tn10-storm-2026-11-11-prerun-15)). Everything above this heading is copied without change from that commit. This is our own TN10 testing; each line records what we observed and chose, not a general claim.

- Pre-run 15 finished through RETURN and is closed. It is not resumed. Its `PRE-RUN-OPEN`, `MINI-ARMED` and `METHOD` files are history in that repo, not gates here.
- Pre-run 15's genesis coins are spent. Keys 1–15 were funded again from the family lane before this repo's hashes (2026-11-12T22:37:29Z, 15 transactions, none rejected; recorded privately). This repo publishes fresh `hashes/SIXTEEN.md` rows from the desk node with the sixteen-family publisher, before arming. A hash is never invented.
- Key 0 was consolidated (4,872 small coins into 430) and its 320 large coins split into 3,038 coins of 25 tKAS before the open (2026-11-12T22:36:50Z and 22:36:52Z). The payment pile was not used for key 0. The abort line stays 18,000 usable tKAS.
- (xix) **The fee-escalation duel, on purpose.** Cohorts by node rate (kit23 = kit22 plus a live rate for one cohort): floor 1–4 fixed 100, r300 5–7 fixed 300, esc 8–16 live, starting at 150. Our heavy lane N = 60. Timeline: BASE 0, HOLD-1 60 at 150 (the lane's reference, esc 150), HOLD-2 and HOLD-3 the duel (36 minutes), then 0 with esc back at 150 through HOLD-4 and RETURN, 12 whole minutes per lane step. Rule for both sides, once a minute, from the counter's final line of the minute just closed: under 90 percent of its own reference → rate × 1.25 (cap 2,000); at or over 90 percent two minutes in a row → × 0.8 (floor 100); an unread, partial or lagging minute holds. Side A's reference is the BASE median of esc hops per family; side B's is the HOLD-1 median (minutes 2–12) of our heavy landed. Every decision goes to `logs/duel.log` and `phase.log`.
- Hop calibration before the open at 100 and at 2,000 (esc, through the live-rate file) passed 2026-11-12T22:37:54Z (100.08 and 2,000.22, storage mass equal). Lane calibration at 2,000 and at 100 passed 22:38:42Z and 22:38:49Z.
- Our heavy lane stays (the operator's OK, 2026-11-12). On purpose: any whole rate from 100 to 2,000 from the runner's control file, fee cap 40,000 tKAS and moved cap 45,000 (pre-run 15: 16,000 / 20,000). The pile floor (100,000 tKAS), the mempool hold (90,000), the 80-block ready-mass hold, the N + 2 pause, the 1,200-a-minute submit cap and the drift stop stay.
- The bot waiter keeps pre-run 15's fixes (the free-node check loads its library from a path that survives a box reboot; the renderer takes the last check-result line or stops with a clear message) and runs the free check once, read-only, before arming. The operator's agent keeps the box busy through HOLD-3 and the pin.
- Public statement: this repo says in its README, plan and playbook that we run our own heavy lane on TN10 and that it slows other TN10 users' transactions while it runs.
- The lane's sink outputs (pre-runs 13–16, one sink key) are not swept in this run.
- Every pre-run 2 to 15 line above stays where it still applies. The HOLD-4 minute and the node-set lines are not loosened.
- This repo does not edit Tuesday's repo, Wednesday's repo, or pre-run 1's to 15's go files, and does not write `REVIEW_CLOSED`.

## Locked during pre-run 16

When a fix works, append it here, one block per fix, in the form shown above: UTC time, what failed or worked, what was changed, why that change stays.

```
- 2026-11-13T00:37:41Z.
- What worked: the fee-escalation duel (kit23 live esc rate, desk-runner duel controller, one rule for both sides). Rehearsed offline first, calibrated at 100 and 2,000 on the node, bot free check run once before arming. Every step, RETURN, TIMELINE, MEMPOOL and METHOD on origin, every whole minute kept pace. 22,258 lane transactions accepted, 0 rejected, 0 lost, 8,711.57 tKAS fees, 834.67 parked (not swept). Every OK family hop included (8,600 / 11,897 / 31,189). Duel: esc 150 -> 294 in three minutes, then a 188-294 band; lane 120-188, mostly down; median esc/lane 1.96; no spiral, nobody gave up; esc back to 93-97 percent of BASE (69 at the lane's rate) at about 69 percent more per hop; the lane's landing did not follow the esc rate (rank correlation -0.04). Mini 219 of 219, 0 late removals. Bot NO SEND no-free-node on time.
- What failed: the desk probe's getMempoolEntries answered "WebSocket disconnected" from 23:59Z (mempool about 13,000), so ready mass, outside-stream counts and template columns are blank from then. Not repaired during the run (the counter and the duel did not use it).
- What was changed: nothing during the run. The duel log was copied unchanged to logs/duel.log after the run.
- Why that change stays, for the next repo: keep the duel controller and its log, pricing on the node's mass, the calibrations, the pre-arm free check, Mini's count and the waiter's fetch handling. Fix or page the probe's mempool read above about 13,000 entries. Refill key 0 first (21,125 usable tKAS left against an 18,000 abort line). A spiral needs two sides that hurt each other: a next duel should put two heavy sides against each other.
```

## Locked for pre-run 17

These lines are baked into this repo's own pastes. They come from pre-run 16's lessons and lock block (commit 016a560 in [tn10-storm-2026-11-11-prerun-16](https://github.com/STP-KAS/tn10-storm-2026-11-11-prerun-16)). Everything above this heading is copied without change from that commit. This is our own TN10 testing; each line records what we observed and chose, not a general claim.

- Pre-run 16 finished through RETURN and is closed. It is not resumed. Its `PRE-RUN-OPEN`, `MINI-ARMED` and `METHOD` files are history in that repo, not gates here.
- Pre-run 16's genesis coins are spent. Keys 1–15 were funded again from the family lane before this repo's hashes (2026-11-13T00:57:06Z, 15 transactions, none rejected; recorded privately). This repo publishes fresh `hashes/SIXTEEN.md` rows from the desk node with the sixteen-family publisher, before arming. A hash is never invented.
- Key 0 was refilled from the payment pile (1,400 coins, 29,870 tKAS, 2026-11-13T00:56:38Z, 70 transactions, none rejected; `refill17.mjs`) and its 329 small coins consolidated into 28 (00:56:57Z). The abort line stays 18,000 usable tKAS.
- (xx) **The lane-against-lane duel, on purpose.** Tiers by node rate (kit24 = kit23 with this table): floor 1–4 100, r150 5–8 150, r300 9–12 300, r450 13–16 450, all fixed. Two heavy lanes of 30 chains each in one lane process. Timeline: BASE both 0; HOLD-1 both 30 at 150 (the reference); HOLD-2 and HOLD-3 parts 2–3 the duel (36 minutes); HOLD-3's last 12 minutes the one-sided variant (both from 150, lane 1 greedy: target 110 percent of its reference, never steps down); then both 0 through HOLD-4 and RETURN; 12 whole minutes per lane step. Rule for both, once a minute, from the counter's final line of the minute just closed: under 90 percent of its own HOLD-1 median (minutes 2–12) → rate × 1.25 (cap 2,000); at or over 90 percent two minutes in a row → × 0.8 (floor 100); an unread, partial or lagging minute holds. Cap guard: 4 decided minutes with both at 2,000 → `CAP_REACHED`, both back to 150. Every decision goes to `logs/duel.log` and `phase.log`.
- Hop calibration before the open at 100 and at 450 passed 2026-11-13T00:57:33Z (100.20 and 450.01, storage mass equal). Lane calibration at 2,000 and at 100 passed 00:57:40Z and 00:57:44Z.
- Our heavy lane stays (the operator's OK, 2026-11-12), now as two lanes. On purpose: lane 2 reads its own control files and logs its ids apart (the counter's hv2), each lane has its own submit bucket (1,200 a minute), which lane submits first alternates every tick, the pause guard is N1 + N2 + 2, fee cap 90,000 tKAS, moved cap 100,000, pile floor 15,000 (pre-run 16: 40,000 / 45,000 / 100,000). The mempool hold (90,000), the 80-block ready-mass hold and the drift stop stay.
- The probe takes the node's own ready count and ready mass every sample (`getFeeEstimateExperimental`, verbose) and the full mempool list only up to 10,000 entries; a failed full read no longer skips the template read. Reason: one full reply measured about 96.7 MB for 9,050 entries and the node's wRPC replies are capped at 128 MiB.
- The bot waiter keeps pre-run 15's and 16's fixes and runs the free check once, read-only, before arming, and checks its websocket library. The operator's agent keeps the box busy through HOLD-3 and the pin.
- Public statement: this repo says in its README, plan and playbook that we run our own heavy lanes on TN10 and that they slow other TN10 users' transactions while they run.
- The lanes' sink outputs (pre-runs 13–17, one sink key) are not swept in this run.
- Every pre-run 2 to 16 line above stays where it still applies. The HOLD-4 minute and the node-set lines are not loosened.
- This repo does not edit Tuesday's repo, Wednesday's repo, or pre-run 1's to 16's go files, and does not write `REVIEW_CLOSED`.

## Locked during pre-run 17

When a fix works, append it here, one block per fix, in the form shown above: UTC time, what failed or worked, what was changed, why that change stays.

```
- 2026-11-13T02:12:41Z.
- What failed: the family lane (key 0) reached its abort line (usable 17,396 tKAS against 18,000, 2,436 coins) three minutes into HOLD-3; the runner stopped the run and wrote FAILED.md. Cause: key 0 was refilled to 47,265 usable before the open, sized on fees; the families use about 1.06 usable tKAS per OK hop (29,892 for 28,206 OK hops), so the planned run needed about 65,000.
- What worked: two heavy lanes in one process (15,160 accepted, 0 rejected, 0 lost, 5,117.08 tKAS fees, 568.50 parked, not swept), the hv1/hv2 split, the duel controller and its log, the probe's mempool read (every sample), BASE/HOLD-1/HOLD-2 on origin with every minute clean. Duel: both lanes 150 -> 120 -> 100 in four minutes, then 100/100, never under 90 percent of their references; no spiral, no cap. Mini 144 of 144, 0 late removals. Bot halted on FAILED.md, nothing sent.
- What was changed: nothing during the run. The duel log was copied unchanged to logs/duel.log after the stop.
- Why that change stays, for the next repo: keep the two-lane process, the duel controller and its log, the probe fix, pricing on the node's mass, the calibrations, the pre-arm free check and Mini's count. Size key 0 on use: at least about 70,000 usable at the open for 16 families through RETURN, and consolidate its 2,104 small coins first. Run the one-sided variant early or alone; a symmetric duel of equals drifts down.
```

## Locked for pre-run 18

These lines are baked into this repo's own pastes. They come from pre-run 17's lessons and lock block (commit 2313231 in [tn10-storm-2026-11-11-prerun-17](https://github.com/STP-KAS/tn10-storm-2026-11-11-prerun-17)). Everything above this heading is copied without change from that commit. This is our own TN10 testing; each line records what we observed and chose, not a general claim.

- Pre-run 17 failed before RETURN and is closed. It is not resumed. Its `PRE-RUN-OPEN`, `MINI-ARMED` and `FAILED` files are history in that repo, not gates here.
- Pre-run 17's genesis coins are spent. Keys 1–15 were funded again from the family lane before this repo's hashes (2026-11-13T02:36:19Z, 15 transactions, none rejected; recorded privately). This repo publishes fresh `hashes/SIXTEEN.md` rows from the desk node with the sixteen-family publisher, before arming. A hash is never invented.
- (xxi) **Key 0 is sized on use, and checked.** Key 0's 2,104 small coins were consolidated (02:35:44Z) and 3,500 pile coins (74,071 tKAS) moved to it (02:35:45Z; `refill18.mjs`): 85,043 usable. Before genesis the runner logs `BUDGET_CHECK` and holds the run (`budget-short`) unless usable tKAS less 760 for each planned family minute stays at least 8,000 over the 18,000 abort line. The abort line stays 18,000.
- (xxi) **The greedy duel, on purpose.** Same two heavy lanes (30 chains each, one process) and the same four fixed tiers (floor 1–4 100, r150 5–8 150, r300 9–12 300, r450 13–16 450; kit24 unchanged). Timeline: BASE both 0 (10 min); HOLD-1 both 30 at 150, the reference (10); HOLD-2 and the first 12 minutes of HOLD-3 the greedy duel (24 minutes in one piece, no reset between the parts): lane 1 steps up × 1.25 whenever it landed under 110 percent of its own HOLD-1 median (minutes 2–10) and never steps down; lane 2 keeps the normal rule (under 90 percent × 1.25, at or over 90 percent two minutes running × 0.8, floor 100); both from 150, cap 2,000; then HOLD-3's last 8 minutes a symmetric repeat (both back to 150, the normal rule for both); then both 0 through HOLD-4 and RETURN (10). Cap guard: 4 decided minutes with both at 2,000, or with the greedy lane alone at 2,000 → `CAP_REACHED`, both back to 150. Every decision goes to `logs/duel.log` and `phase.log`.
- Our heavy lanes stay (the operator's OK, 2026-11-12). Changed on purpose: fee cap 32,000 tKAS, moved cap 34,500, pile floor 3,500 (pre-run 17: 90,000 / 100,000 / 15,000; the pile was moved down by the refill of key 0). The submit caps, the mempool hold (90,000), the 80-block ready-mass hold and the drift stop stay.
- Hop calibration before the open at 100 and at 450 passed 2026-11-13T02:36:52Z (100.20 and 450.04, storage mass equal). Lane calibration at 2,000 passed 02:36:58Z and at 100 02:37:28Z (after one orphan refusal on a just-spent coin).
- The bot waiter keeps pre-run 15's to 17's fixes and runs the free check once, read-only, before arming, and checks its websocket library. The operator's agent keeps the box busy through HOLD-3 and the pin.
- Public statement: this repo says in its README, plan and playbook that we run our own heavy lanes on TN10 and that they slow other TN10 users' transactions while they run.
- The lanes' sink outputs (pre-runs 13–18, one sink key) are not swept in this run.
- Every pre-run 2 to 17 line above stays where it still applies. The HOLD-4 minute and the node-set lines are not loosened.
- This repo does not edit Tuesday's repo, Wednesday's repo, or pre-run 1's to 17's go files, and does not write `REVIEW_CLOSED`.

## Locked during pre-run 18

When a fix works, append it here, one block per fix, in the form shown above: UTC time, what failed or worked, what was changed, why that change stays.

```
- 2026-11-13T04:23:43Z.
- What worked: the greedy duel (lane 1 target 110 percent of its reference, never down; lane 2 the normal rule; the cap guard; the symmetric repeat), key 0 sized on use with a budget check before genesis (85,031 usable, projected end 30,311, actual 41,339). Rehearsed offline first, calibrated at 100/450 (hops) and 100/2,000 (lane) on the node, bot free check once before arming. Every step, RETURN, TIMELINE, MEMPOOL and METHOD on origin, every whole minute kept pace. 23,211 lane transactions accepted, 0 rejected, 0 lost, 22,558.34 tKAS fees, 870.41 parked (not swept). Every OK family hop included (7,413 / 8,954 / 11,338 / 12,340). Duel: a leapfrog 150 -> 1,405 (lane 1) and 1,124 / 1,405 (lane 2) in 24 minutes, no cap; lane landings together steady (median 548 reference, 560-562 climbing); tiers at the top 0 / 0-1 / 5-8 / 12-18 percent of BASE; symmetric repeat 100/100 in about four minutes. Mini 251 of 252. Bot NO SEND no-free-node on time.
- What failed: nothing in the run. The bot's box stalled about 171 s (heartbeat gap 03:50:13Z-03:53:04Z; one git fetch 161.8 s, rc 128); the waiter recovered on its next loop.
- What was changed: nothing during the run. The duel log was copied unchanged to logs/duel.log after the run.
- Why that change stays, for the next repo: keep the duel controller and its log, the greedy mode and the cap guard, pricing on the node's mass, the calibrations, the budget check before genesis, the pre-arm free check, Mini's count and the waiter's fetch handling. Key 0 used about 1.09 usable tKAS per OK hop; the pile is down to 796 coins after the lanes, so a longer climb needs a pile refill first.
```

## Locked for pre-run 19

These lines are baked into this repo's own pastes. They come from pre-run 18's lessons and lock block (commit 97c7460 in [tn10-storm-2026-11-11-prerun-18](https://github.com/STP-KAS/tn10-storm-2026-11-11-prerun-18)). Everything above this heading is copied without change from that commit. This is our own TN10 testing; each line records what we observed and chose, not a general claim.

- Pre-run 18 finished through RETURN and is closed. Its `PRE-RUN-OPEN` and `MINI-ARMED` files are history in that repo, not gates here.
- Pre-run 18's genesis coins are spent. Keys 1–15 were funded again from the family lane before this repo's hashes (2026-11-13T04:41:18Z, 15 transactions, none rejected; recorded privately). This repo publishes fresh `hashes/SIXTEEN.md` rows from the desk node with the sixteen-family publisher, before arming. A hash is never invented.
- (xxii) **Sized on the funds we hold.** Key 0's 1,451 small coins were consolidated (04:40:54Z) and 430 pile coins (7,923 tKAS) moved to it (04:40:55Z): 50,838 usable. `BUDGET_CHECK` (760 a planned family minute, 8,000 over the 18,000 line) stays and passed at 26,518 projected for 32 planned family minutes. The abort line stays 18,000. The sink is not swept.
- (xxii) **Greedy alone, the control for pre-run 18.** ONE heavy lane (30 chains; lane 2 off, N = 0) and the same four fixed tiers (floor 1–4 100, r150 5–8 150, r300 9–12 300, r450 13–16 450; kit24 unchanged). Timeline: BASE 0 (3 min); HOLD-1 the lane 30 at 150, the reference (4); HOLD-2 and HOLD-3 greedy alone (6 + 6 minutes in one piece, no reset): the lane steps up × 1.25 whenever it landed under 110 percent of its own HOLD-1 median (minutes 2–4) and never steps down, from 150, cap 2,000; no symmetric repeat (no budget for it); then 0 through HOLD-4 and RETURN (3). The controller runs SOLO: it needs only lane 1's reference and never moves lane 2. Cap guard: 4 decided minutes with the lane at 2,000 → `CAP_REACHED`, back to 150. Every decision goes to `logs/duel.log` and `phase.log`.
- Our heavy lane stays (the operator's OK, 2026-11-12). Changed on purpose: fee cap 4,500 tKAS, moved cap 4,700, pile floor 1,000 (pre-run 18: 32,000 / 34,500 / 3,500; the pile holds 5,700). The submit caps, the mempool hold (90,000), the 80-block ready-mass hold and the drift stop stay.
- Hop calibration before the open at 100 and at 450 passed 2026-11-13T04:42:07Z (100.09 and 450.31, storage mass equal). Lane calibration at 2,000 passed 04:42:12Z and at 100 04:42:54Z.
- The bot waiter keeps pre-run 15's to 18's fixes and runs the free check once, read-only, before arming, and checks its websocket library. The operator's agent keeps the box busy through HOLD-3 and the pin.
- Public statement: this repo says in its README, plan and playbook that we run our own heavy lane on TN10 and that it slows other TN10 users' transactions while it runs.
- The lane's sink outputs (pre-runs 13–19, one sink key) are not swept in this run.
- Every pre-run 2 to 18 line above stays where it still applies. The HOLD-4 minute and the node-set lines are not loosened.
- This repo does not edit Tuesday's repo, Wednesday's repo, or pre-run 1's to 18's go files, and does not write `REVIEW_CLOSED`.

## Locked during pre-run 19

When a fix works, append it here, one block per fix, in the form shown above: UTC time, what failed or worked, what was changed, why that change stays.

```
- 2026-11-13T05:44:42Z.
- What worked: the greedy-alone control (one lane, target 110 percent of its reference, never down, cap 2,000, lane 2 at N = 0), key 0 topped up on use with a budget check before genesis (50,825 usable, projected end 26,505, actual 28,381). Rehearsed offline first, calibrated at 100/450 (hops) and 100/2,000 (lane) on the node, bot free check once before arming. Every step, RETURN, TIMELINE, MEMPOOL and METHOD on origin, every whole minute kept pace. 6,092 lane transactions accepted, 0 rejected, 0 lost, 4,481.21 tKAS fees, 228.45 parked (not swept). Every OK family hop included (floor 4,411, r150 4,953, r300 5,632, r450 5,797). Greedy alone: 150 -> 719 one step a minute with flat landings (458-559, reference 513), ended by the moved cap at 05:25:46Z; tiers at 460 9 / 20 / 63 / 83 percent of BASE, back within a minute. Mini 92 of 92. Bot NO SEND no-free-node on time.
- What failed: nothing in the run. The lane's moved cap (4,700) ended the greedy part after 7 minutes 46 s, as sized; the controller kept logging paper rates (899-1,756) after the lane stopped.
- What was changed: nothing during the run. The duel log was copied unchanged to logs/duel.log after the run.
- Why that change stays, for the next repo: keep the duel controller and its log, the greedy mode and the cap guard, pricing on the node's mass, the calibrations, the budget check before genesis, the pre-arm free check, Mini's count and the waiter's fetch handling. Log the lane's stop in duel.log too (the controller should stop moving the rate once the lane is capped). The pile is down to 254 dealable tKAS, so any further lane needs a pile refill first (the sink is not swept).
```

## Locked for pre-run 20

These lines are baked into this repo's own pastes. They come from pre-run 19's lessons and lock block (commit ea9b489 in [tn10-storm-2026-11-11-prerun-19](https://github.com/STP-KAS/tn10-storm-2026-11-11-prerun-19)). Everything above this heading is copied without change from that commit. This is our own TN10 testing; each line records what we observed and chose, not a general claim.

- Pre-run 19 finished through RETURN and is closed. Its `PRE-RUN-OPEN` and `MINI-ARMED` files are history in that repo, not gates here.
- Pre-run 19's genesis coins are spent. Keys 1–15 were funded again from the family lane before this repo's hashes (2026-11-13, 15 transactions, none rejected; recorded privately). This repo publishes fresh `hashes/SIXTEEN.md` rows from the desk node with the sixteen-family publisher, before arming. A hash is never invented.
- (xxiii) **Housekeeping before the open, logged.** The sink (pre-runs 13–19, 136,543 outputs, 5,120.36 tKAS) was swept into the payment key (153.48 tKAS of fees), key 16's chain ends and key 0's small coins were merged, and key 3's old step-3 leftovers (56,621.44 tKAS) were moved to the payment key; key 0 was then refilled (1,900 coins, 39,159 tKAS): 63,851 usable. `BUDGET_CHECK` (760 a planned family minute, 8,000 over the 18,000 line) stays and passed at 31,171 projected for 43 planned family minutes. The abort line stays 18,000.
- (xxiii) **Two cheap probes, one lane.** ONE heavy lane (lane 2 off) and the same four fixed tiers (floor 1–4 100, r150 5–8 150, r300 9–12 300, r450 13–16 450; kit24 unchanged). Timeline: BASE 0 (4 min); HOLD-1 the lane 30 at 150, the reference (4); HOLD-2 = probe 1, a reachable target: greedy at **100 percent** of the reference (× 1.25 when under it, never down; 7 minutes), then reset to 150 on the normal rule (under 90 percent × 1.25, two minutes at or over 90 percent × 0.8, floor 100; 6 minutes); HOLD-3 = probe 2, fewer chains ready at a high rate: a fixed 460 with N = 8 (5), then N = 30 at 460 as the in-run control (3); then 0 through HOLD-4 and RETURN (4). Cap guard as in pre-run 19.
- (xxiii) **A stopped lane freezes the controller.** Once the lane process reports a stop (a cap, the pile floor, a reject), the runner logs `FROZEN` once and moves no rate after it (pre-run 19 logged paper rates after its cap).
- (xxiii) **The template every 3 s.** `tplwatch20.mjs` (read-only) asks the desk node for a block template (never submitted) and the light fee estimate every 3 s: count, mass, transactions over 200,000 mass, the rest, the ready count and mass.
- Our heavy lane stays (the operator's OK, 2026-11-12; "do what is best needed", 2026-11-13). Changed on purpose: fee cap 12,000 tKAS, moved cap 13,000, pile floor 3,000 (pre-run 19: 4,500 / 4,700 / 1,000). The submit caps, the mempool hold (90,000), the 80-block ready-mass hold and the drift stop stay.
- Hop calibration before the open at 100 and at 450 passed 2026-11-13T07:25:21Z (100.00 and 450.02, storage mass equal). Lane calibration at 2,000 passed 07:25:35Z and at 100 07:26:06Z.
- The bot waiter keeps pre-run 15's to 19's fixes and runs the free check once, read-only, before arming, and checks its websocket library. The operator's agent keeps the box busy through HOLD-3 and the pin.
- Public statement: this repo says in its README, plan and playbook that we run our own heavy lane on TN10 and that it slows other TN10 users' transactions while it runs.
- This run's sink outputs stay on the sink key until a later, logged sweep.
- Every pre-run 2 to 19 line above stays where it still applies. The HOLD-4 minute and the node-set lines are not loosened.
- This repo does not edit Tuesday's repo, Wednesday's repo, or pre-run 1's to 19's go files, and does not write `REVIEW_CLOSED`.

## Locked during pre-run 20

When a fix works, append it here, one block per fix, in the form shown above: UTC time, what failed or worked, what was changed, why that change stays.

```
- 2026-11-13T08:43:06Z.
- What worked: housekeeping before the open (sink swept, small coins merged, key 3's old leftovers moved to the pile, key 0 refilled to 63,851 usable; budget check projected 31,158, actual 33,040). Rehearsed offline first, calibrated on the node, bot free check once before arming, template watcher every 3 s. Every step, RETURN, TIMELINE, MEMPOOL and METHOD on origin, every whole minute clean. 11,474 lane transactions accepted, 0 rejected, 0 lost, 7,656.21 tKAS fees, 430.27 parked (not swept). Every OK family hop included (floor 5,975, r150 6,795, r300 7,870, r450 8,175). greedy100 150 -> 368 (ratchet), normal 150 -> 100 (settled); at 460 the template stayed full with N = 8 (471,954) and shrank with N = 30 (348,296). Mini 131 of 136. Bot NO SEND no-free-node on time.
- What failed: nothing in the run. No cap was met, so FROZEN, the cap guard and the budget hold are still untested live.
- What was changed: nothing during the run. The duel log was copied unchanged to logs/duel.log after the run.
- Why that change stays, for the next repo: keep the template watcher, the budget check before genesis, the FROZEN rule, the calibrations, the pre-arm free check, Mini's count and the waiter's fetch handling. N = 8 changed ready count and landings together; a later probe should hold landings fixed while changing the ready count.
```

## Locked for pre-run 21

These lines are baked into this repo's own pastes. They come from pre-run 20's lessons and lock block (commit 7bfc737 in [tn10-storm-2026-11-11-prerun-20](https://github.com/STP-KAS/tn10-storm-2026-11-11-prerun-20)). Everything above this heading is copied without change from that commit. This is our own TN10 testing; each line records what we observed and chose, not a general claim.

- Pre-run 20 finished through RETURN and is closed. Its `PRE-RUN-OPEN` and `MINI-ARMED` files are history in that repo, not gates here.
- Pre-run 20's genesis coins are spent. Keys 1–15 were funded again from the family lane before this repo's hashes (2026-11-13, 15 transactions, none rejected; recorded privately). This repo publishes fresh `hashes/SIXTEEN.md` rows from the desk node with the sixteen-family publisher, before arming. A hash is never invented.
- (xxiv) **Housekeeping before the open, logged.** Key 0's coins of 16 tKAS or less were merged (2,030 + 1,796 into about 20s, 1,610 in pairs), pre-run 20's sink outputs (430.35 tKAS) were swept into the payment key, key 16's small coins merged; key 0 was then refilled (370 coins, 7,530 tKAS): 49,612 usable. `BUDGET_CHECK` (760 a planned family minute, 8,000 over the 18,000 line) stays and passed at 26,812 projected for 30 planned family minutes. The abort line stays 18,000.
- (xxiv) **The cap test and the template probe, one lane.** ONE heavy lane (lane 2 off) and the same four fixed tiers (floor 1–4 100, r150 5–8 150, r300 9–12 300, r450 13–16 450; kit24 unchanged). Timeline: BASE 0 (2 min); HOLD-1 the lane 8 at a fixed 460, the reference (2); HOLD-2 = the template probe: a fixed 460 with a submit cap of 230 a minute, paced evenly, N = 15 (2) then N = 30 (2); HOLD-3 = the cap test: N = 8, greedy at **110 percent** of the reference, never down, from **600** with **× 2** steps (the normal rule keeps × 1.25), the cap guard as before (4 decided minutes at 2,000 → `CAP_REACHED` → 150), two decisions of re-climb, then `FROZEN_ARM` (10); then 0 through HOLD-4 and RETURN (2).
- (xxiv) **FROZEN on purpose.** Two decisions after the cap guard's reset, the runner writes `control/LANE-CAP-FEES` (the lane's fees so far + 20 tKAS); the lane meets that fee cap, stops, and the controller must log `FROZEN` and move no rate after it.
- (xxiv) **Submit cap a minute.** `heavy-lane.mjs` reads `control/LANE-PERMIN` every tick (default 1,200) and, under it, paces its submits evenly (cap ÷ 60 a second).
- Our heavy lane stays (the operator's OK, 2026-11-12; "do what is best needed" and keep going, 2026-11-13). Changed on purpose: fee cap 9,500 tKAS, moved cap 10,000, pile floor 1,000 (pre-run 20: 12,000 / 13,000 / 3,000). The mempool hold (90,000), the 80-block ready-mass hold and the drift stop stay. `tplwatch20.mjs` is unchanged.
- Hop calibration before the open at 100 and at 450 passed 2026-11-13T09:11:00Z (100.11 and 450.10, storage mass equal). Lane calibration at 2,000 passed 09:11:06Z and at 100 09:11:12Z.
- The bot waiter keeps pre-run 15's to 20's fixes and runs the free check once, read-only, before arming, and checks its websocket library. The operator's agent keeps the box busy through HOLD-3 and the pin.
- Public statement: this repo says in its README, plan and playbook that we run our own heavy lane on TN10 and that it slows other TN10 users' transactions while it runs.
- This run's sink outputs stay on the sink key until a later, logged sweep.
- Every pre-run 2 to 20 line above stays where it still applies. The HOLD-4 minute and the node-set lines are not loosened.
- This repo does not edit Tuesday's repo, Wednesday's repo, or pre-run 1's to 20's go files, and does not write `REVIEW_CLOSED`.

## Locked during pre-run 21

When a fix works, append it here, one block per fix, in the form shown above: UTC time, what failed or worked, what was changed, why that change stays.

```
- 2026-11-13T10:35:00Z.
- What failed: the desk and the Mini lost internet about 10:25Z-10:33Z (a robot vacuum knocked the network switch). The lane could not reach its node, the families stopped, pushes were stuck; the runner's minute checks waited behind them. Run stopped with logs/FAILED.md on the operator's instruction; bot sent nothing; Mini and desk runners stopped on it.
- What worked: the rehearsal fix (lane pacing under a submit cap: 230 a minute, was 177-180); FAILED.md stopped every runner within seconds; both nodes back in sync by 10:38Z.
- What was changed: nothing during the run.
- Why it stays, for the next repo: add a connectivity guard on its own timer (2 closed minutes with the lane due but no submit accepted or nothing of ours landed -> stop everything, no sends, publish FAILED). Spend about 540 tKAS; no findings.
```

## Locked for pre-run 22

These lines are baked into this repo's own pastes. They come from pre-run 21's lock blocks (commit 104ad0f in [tn10-storm-2026-11-11-prerun-21](https://github.com/STP-KAS/tn10-storm-2026-11-11-prerun-21)), which carry pre-run 20's lock 7bfc737 forward. Everything above this heading is copied without change from that commit. This is our own TN10 testing; each line records what we observed and chose, not a general claim.

- Pre-run 21 is void (the desk and the Mini lost internet 10:25Z–10:33Z; stopped with `FAILED`, nothing sent, no findings). Its `PRE-RUN-OPEN`, `MINI-ARMED` and `FAILED` files are history in that repo, not gates here.
- Pre-run 21's genesis coins are spent. Keys 1–15 were funded again from the family lane before this repo's hashes (15 transactions, none rejected). This repo publishes fresh `hashes/SIXTEEN.md` rows before arming. A hash is never invented.
- (xxv) **The same plan as pre-run 21** (its (xxiv) lines above stay): one heavy lane, the four fixed tiers, BASE 2 / reference N = 8 at 460 2 / template probe N = 15 and N = 30 at 460 under a 230-a-minute submit cap 2 + 2 / cap test 10 / RETURN 2; the lane's fee cap 9,500, moved 10,000, pile floor 1,000; `FROZEN_ARM` on purpose.
- (xxv) **Connectivity guard.** The desk runner checks every 10 s, on its own timer, the last minute closed at least 25 s ago: while the plan has the lane at N > 0 and the lane has not stopped (a cap) and is not held, the minute is dark if there is no lane row, no submit accepted, or none of ours landed on the desk counter. Two dark minutes in a row → `fail()`: every sender stopped, `FAILED` written locally and published with retries.
- Key 0 refilled from the pile (130 coins, 2,630 tKAS): 49,578 usable, `BUDGET_CHECK` 26,778 projected for 30 planned family minutes. The abort line stays 18,000.
- Hop calibration passed 10:46:10Z (100.31 and 450.10, storage mass equal); lane calibration at 2,000 and at 100 passed 10:46:09Z and 10:46:10Z.
- Everything else in pre-run 21's block stays. This repo does not edit Tuesday's repo, Wednesday's repo, or pre-run 1's to 21's go files, and does not write `REVIEW_CLOSED`.

## Locked during pre-run 22

When a fix works, append it here, one block per fix, in the form shown above: UTC time, what failed or worked, what was changed, why that change stays.

```
- 2026-11-13T12:10:06Z.
- What worked: re-read before arming (both nodes synced, tip age under 1 s twice, 20 s apart; budget; bot free check once). Rehearsals p22-g (connectivity guard -> FAILED, nothing sent) and p22-a (full path). Live: cap path 600 -> 1,200 -> 2,000, 4 decided minutes at 2,000, CAP_REACHED, 150 -> 300 -> 600, FROZEN_ARM, LANE_CAP, FROZEN lane-stopped:cap; the connectivity guard stayed quiet and switched off after the cap stop. 3,223 lane transactions accepted, 0 rejected, 0 lost, 7,525.31 tKAS fees, 120.86 parked (not swept). Every OK family hop included (floor 5,682, r150 6,168, r300 6,762, r450 7,052). Mini 83 of 84. Bot NO SEND no-free-node on time.
- What failed: the families stopped at 12:00:00Z (the base config's fixed end_utc, carried from pre-run 21's stage); HOLD-4 had 12 family hops and RETURN none. The rehearsal ran before 12:00Z and could not catch it.
- What was changed: nothing during the run. The duel log was copied unchanged to logs/duel.log after the run.
- Why that change stays, for the next repo: set the family end time from the runner's start plus the planned minutes (or check it against the live start before arming); keep the pre-arm sync re-read, the connectivity guard, the cap guard and FROZEN. Funds: key 0 21,210 usable and the pile 1,659 tKAS after this run, so the next run needs funding before its budget check can pass.
```

## Locked for pre-run 23

These lines are baked into this repo's own pastes. They come from pre-run 22's lock blocks (commit 82bb7d0 in [tn10-storm-2026-11-11-prerun-22](https://github.com/STP-KAS/tn10-storm-2026-11-11-prerun-22)). Everything above this heading is copied without change from that commit. This is our own TN10 testing; each line records what we observed and chose, not a general claim.

- Pre-run 22's genesis coins are spent. Keys 1–15 were funded again from the family lane before this repo's hashes (15 transactions, none rejected). This repo publishes fresh `hashes/SIXTEEN.md` rows before arming. A hash is never invented.
- (xxvi) **A new lane plan: chain count against ready count.** BASE (lane off) 3 / HOLD-1: ready cap 8 with 8 chains, 30 chains, 8 chains again, 3 each / HOLD-2: 30 chains at ready cap 15, 15 chains at 15, 30 chains at 30, 3 each / HOLD-3: 8 chains ready 8 at 2,000, then at 460, 3 each, then the lane off 3 (`N0-end`) / drain, HOLD-4, RETURN 3. Every lane segment at a fixed 460 unless named. No rule moves a rate; the duel controller and the cap test are not used.
- (xxvi) **Ready cap.** `heavy-lane.mjs` reads `control/LANE-READY` (R) every tick: at most R of the N chains hold a transaction in the desk mempool at once, and the free chain unused longest goes first, so 30 chains at R = 8 really rotate over 30 chains.
- (xxvi) **The families' end time is set from the run start** (pre-run 22's fault: a fixed `end_utc` carried over from an earlier stage stopped the families in the pinned minute). The runner sets `end_utc` to the run start + planned family minutes + 25, logs `FAMILY_END`, checks before the lane starts that it is after RETURN's latest end (`FAMILY_END_CHECK`, `fail()` if not), and logs the check again at RETURN's close. The rehearsal starts from a stale end 3 minutes out, and its fake family sender stops at `end_utc`, so a runner that kept the stale end would show it.
- Lane caps: fee cap 20,000 tKAS, moved 21,000, pile floor 1,000 (pre-run 22: 9,500 / 10,000 / 1,000), sized on the plan (about 10,000 tKAS expected). Rate at most 2,000.
- Funded from our own mining wallet (200,000 tKAS, operator's word 16:14 Brussels): key 0 132,191 usable, `BUDGET_CHECK` for 43 planned family minutes. The abort line stays 18,000.
- Hop calibration passed 15:29:05Z (100.08 and 450.16, storage mass equal); lane calibration at 2,000 and at 100 passed 15:29:03Z and 15:29:05Z.
- The connectivity guard (xxv) stays. Everything else in pre-run 22's block stays. This repo does not edit Tuesday's repo, Wednesday's repo, or pre-run 1's to 22's go files, and does not write `REVIEW_CLOSED`.

## Locked during pre-run 23

When a fix works, append it here, one block per fix, in the form shown above: UTC time, what failed or worked, what was changed, why that change stays.

```
- 2026-11-13T16:57:07Z.
- What worked: funding from our own mining wallet (200,000 tKAS) with the budget check passing by a wide margin; re-read before arming (both nodes synced, tip age under 1 s twice, 20 s apart); rehearsal p23-a (full path, stale family end replaced from the run start). Live: the ready cap held R while N changed (30 chains at R = 8 rotated over all 30); FAMILY_END from the run start, FAMILY_END_CHECK ok before the lane and at RETURN's close; lane-off baselines at both ends with families on. 7,577 lane transactions accepted, 0 rejected, 0 lost, 12,136.47 tKAS fees, 284.14 parked (not swept). Every OK family hop included (floor 9,269, r150 10,208, r300 11,580, r450 12,351). Mini 128 of 136. Bot NO SEND no-free-node on time.
- What failed: nothing we know of. Not a fault, but worth knowing: R = 30 drove our floor families to 11 percent of BASE and the desk mempool to 636 entries; the budget check's 760 tKAS a family minute is below this run's pace (about 1,150-1,200).
- What was changed: nothing during the run. The duel log was copied unchanged to logs/duel.log after the run.
- Why that change stays, for the next repo: keep the ready cap (control/LANE-READY), FAMILY_END from the run start with both checks, the lane-off segment at the end, the pre-arm sync re-read, the connectivity guard and the cap guard. Raise the budget check's use rate to about 1,200 a minute. Avoid R = 30 unless that is the question. Funds after this run: key 0 84,770 usable, pile 69,219 tKAS, enough for another run.
```

## Locked for pre-run 24

These lines are baked into this repo's own pastes. They come from pre-run 23's lock blocks (commit 26a2b63 in [tn10-storm-2026-11-11-prerun-23](https://github.com/STP-KAS/tn10-storm-2026-11-11-prerun-23)). Everything above this heading is copied without change from that commit. The new target comes from the [target plan](https://github.com/STP-KAS/tn10-target-plan) (pre-run 24 card; section P, REVIEW-01, binding). This is our own TN10 testing; each line records what we observed and chose, not a general claim.

- (xxvii) **The combined mix, modest.** Four covenant families (1–4, floor, 100 on node mass), one fresh KCC-20 launch (family 5, cohort `kcc`) with a mint line (one public mint at a time, accept before the next, 15 s gap, cap 30, at most 90 tries), no heavy lane, no greedy rule, no payment flood. `hashes/SIXTEEN.md` keeps its name with five rows. The family sender hops families 1–4 only (`SENDER_FAMILIES = 4`); the counters and Mini count family 5 as `kcc`.
- (xxvii) **The guest carrier only through a runner already on disk.** None was found on the desk, the Mini or the box, and no compile is allowed tonight, so the runner logs `GUEST not-started reason=no-tic-tac-toe-runner-on-disk` and `counts/desk/TARGET.md` says the guest line and the combined target are not met.
- (xxvii) **Rotation sample (issue #1146 method).** `rot24.mjs`, read-only: every 60 s, up to 40 of our own ids accepted 1–10 minutes earlier, one `getMempoolEntry` each; the node's "not found" answer is counted as gone, any other error as a read error. No full dump above 10,000 entries.
- (xxvii) **Steps:** BASE, HOLD-1, HOLD-2, HOLD-3 at 3 minutes each with the same mix, the pinned HOLD-4, RETURN 3, tail 5. The connectivity guard (xxv) is kept: two consecutive final minutes with no floor hop on the desk counter fail the run.
- **REVIEW-01 lines:** the disk floor (desk and Mini 100 GB, box 20 GB) is written before `PRE-RUN-OPEN`; funding is a logged step from our own mining wallet (53,000 tKAS to key 0); `BUDGET_CHECK` needs a projected end of at least 26,000 usable tKAS and at least 2,500 coins over 3 tKAS; the bot's free check includes the public node REVIEW-01 named, logs and drops names that time out, and never sends to a raw-address node; the bot sends at most 60 payments, one at a time.
- Keys: families on keys 0, 3, 4, 5; the launch on key 6; the mint line on key 7. Keys 1 and 2 are not touched. The family lane's abort line stays 18,000 usable tKAS.
- Everything else in pre-run 23's block stays where it applies. This repo does not edit Tuesday's repo, Wednesday's repo, or pre-run 1's to 23's go files, and does not write `REVIEW_CLOSED`.

## Locked during pre-run 24

When a fix works, append it here, one block per fix: UTC time, what failed or worked, what was changed, why that change stays.
