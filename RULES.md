> **Experimental. We are just trying this.** [Disclaimer](DISCLAIMER.md) · Counts only.
>
> This page is the rule for pre-run 24. It does not start a machine. It does not arm Wednesday.

# Rules

The headmaster rule is [tn-master docs/NEURON.md](https://github.com/STP-KAS/tn-master/blob/main/docs/NEURON.md). The target plan is [tn10-target-plan](https://github.com/STP-KAS/tn10-target-plan); its section P (REVIEW-01) is binding here.

This repo is pre-run 24 of the Wednesday neuron. It is not that neuron. It is not Tuesday. It is not pre-run 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, or 23, and it does not resume any of them. Their `PRE-RUN-OPEN`, `MINI-ARMED`, `BOT-HALT`, and `FAILED` files are history in those repos. They are not gates here.

For pre-run 24 the operator does not paste. TN10 ops wrote a target plan for pre-runs 24 to 30 ([STP-KAS/tn10-target-plan](https://github.com/STP-KAS/tn10-target-plan), plan/PLAN.md) and reviewed it on 13 Nov 2026 (reviews/REVIEW-01.md, approved with changes; plan section P is binding). That plan said no run would be armed before 23:30 Brussels time. At 21:45 Brussels time on 13 Nov 2026 the operator wrote in chat "Yes just arm for the sake of good", and at 21:47 confirmed full authority on the box, the desk and the Mini, with every hard limit kept. That is the arm for pre-run 24. The agents start the runners once the gates are facts. A sentence in chat still does not write `PRE-RUN-OPEN`: the desk runner writes it after its gates. One runner on the desk. One runner on Mini. One runner on the bot, and it sends payments only in the HOLD-4 minute.

There is no clock. The run follows gates and targets:

1. Disk first. The floor (desk and Mini 100 GB free, box 20 GB) is written before `PRE-RUN-OPEN` and read again just before it.
2. Nodes live. Mini's existing TN10 node and the desk's existing private TN10 node are up from their own data, not wiped, synced, with DAA moving. The desk node is started with PowerShell 7 (`pwsh`), never Windows PowerShell 5.1. `KaspaPublicNode` is not started. The desk devnet is left alone. Mining stays modest; no extra miner.
3. Funding is a logged step from our own mining wallet, before the hashes. Key 0 passes `BUDGET_CHECK` (projected end at least 26,000 usable tKAS, at least 2,500 coins over 3 tKAS).
4. Hashes first. `hashes/SIXTEEN.md`, five rows, with an On origin line, before any family submit.
5. An offline rehearsal on the final files, then `PRE-RUN-OPEN`.
6. Families, the KCC-20 mint line and the rotation sampler, as [plan/PLAN.md](plan/PLAN.md) says. No heavy lane, no greedy rule, no payment flood, no compile.

Public nodes get reads and normal-rate submits only. A node found only by raw address is read-only. Mini counts and does not send.

The desk publishes [counts/desk/](counts/desk/README.md) and [counts/chain/](counts/chain/README.md). Mini publishes [counts/mini/](counts/mini/README.md). The bot publishes [counts/bot/HOLD-4.md](counts/bot/README.md). Each machine writes only its own folder.

The desk node stays up. This pre-run does not stop the desk node process and does not wipe chain data on any machine.

A fix that works is appended to [locks/LOCKED.md](locks/LOCKED.md). The pastes in this repo stay as they were at the arm. A next pre-run is a new repo and starts from that lock file.

TN10 only. Never mainnet. Counts only. No key, seed, txid, covenant id, address, host, port, or IP. A Windows profile path, if one must appear, is written as `C:\Users\Fermi\...`.

Call git by its full path. Empty output is a failed read. One commit per file. If a push of a HOLD file or of `logs/FAILED.md` fails, the runner retries the fetch and the push. If it still fails, it leaves a local FAILED file and the operator publishes it.
