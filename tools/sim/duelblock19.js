const SOLO = true;   // (xxii) pre-run 19: one lane only; lane 2 is off (N=0), has no reference and never moves
const DUEL = { a: 150, b: 150, floor: 100, cap: 2000, up: 1.25, down: 0.8, tgt: 0.9, tgtGreedy: 1.1, okNeed: 2, capNeed: 4, aOk: 0, bOk: 0, capRun: 0, refA: null, refB: null, done: new Set(), snap: new Set(), n: 0, seg: null, segAt0: 0, resetAt: 0, asym: false };
const DLOG = P("logs", "duel.log");
const dlog = (s) => { try { fs.appendFileSync(DLOG, isoZ() + " " + s + "\n"); } catch {} phase("DUEL " + s); };
const setRates = () => { fs.writeFileSync(P("control", "LANE-RATE"), DUEL.a + "\n"); fs.writeFileSync(P("control", "LANE2-RATE"), DUEL.b + "\n"); };
const dMed = (a) => { const s = [...a].sort((x, y) => x - y); return s.length ? (s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2) : null; };
const dGood = (o) => !!o && o.final === "1" && o.partial !== "1" && o.lag !== "1";
const laneFees = () => { try { const t = JSON.parse(fs.readFileSync(P("private", "heavy-total.json"), "utf8")); return `fees1_tkas=${(t.lane1?.fees_tkas ?? 0).toFixed(2)} fees2_tkas=${(t.lane2?.fees_tkas ?? 0).toFixed(2)}`; } catch { return "fees=-"; } };
function cmRead() { const m = new Map(); try { for (const l of fs.readFileSync(P("logs", "chain-minute.log"), "utf8").split(/\r?\n/)) { const k0 = l.slice(0, 16); if (!/^\d{4}-\d\d-\d\dT\d\d:\d\d$/.test(k0)) continue; const o = {}; for (const kv of l.split(" ").slice(1)) { const i = kv.indexOf("="); if (i > 0) o[kv.slice(0, i)] = kv.slice(i + 1); } m.set(k0, o); } } catch {} return m; }
function duelSeg(sg) {   // called by laneSet when a duel segment starts
  if (DUEL.seg === null || !!sg.asym !== DUEL.asym) { DUEL.a = 150;   // (xxi) pre-run 18: reset only when the rule changes (greedy-1 -> greedy-2 continues)
    DUEL.b = 150; DUEL.aOk = 0; DUEL.bOk = 0; DUEL.capRun = 0; DUEL.segAt0 = Date.now(); DUEL.resetAt = Date.now(); }
  DUEL.asym = !!sg.asym; DUEL.seg = sg.label;
  dlog(`SEG ${sg.label} start a=${DUEL.a} b=${DUEL.b} asym=${DUEL.asym ? 1 : 0} ${laneFees()}`);
}
function duelTick() {
  try {
    const now = Date.now(), sec = (now % 60000) / 1000, curK = mkey(now), prevK = mkey(now - 60000);
    if (!DUEL.snap.has(curK)) { DUEL.snap.add(curK); let e = "-", l = "-"; try { e = fs.readFileSync(P("control", "LANE-RATE"), "utf8").trim(); } catch {} try { l = fs.readFileSync(P("control", "LANE2-RATE"), "utf8").trim(); } catch {} try { fs.appendFileSync(DLOG, `${isoZ()} SNAP min=${curK}Z seg=${(segAt.get(curK) || {}).label || "-"} lane1=${e} lane2=${l}\n`); } catch {} }
    if (sec < 22 || DUEL.done.has(prevK)) return;
    const cur = segAt.get(curK); if (!cur || !cur.duel) return;
    const prevSeg = segAt.get(prevK); if (!prevSeg || !prevSeg.duel) { DUEL.done.add(prevK); return; }   // the minute before the duel is the reference's
    if (!!prevSeg.asym !== !!cur.asym) { DUEL.done.add(prevK); dlog(`HOLD min=${prevK}Z reason=segment-change a=${DUEL.a} b=${DUEL.b}`); return; }   // the last symmetric minute does not move the one-sided segment
    const cm = cmRead();
    const h1 = stepKeys["HOLD-1"] || [], h1k = h1.length > 1 ? h1.slice(1) : h1;
    if (DUEL.refA == null || (!SOLO && DUEL.refB == null)) { const g = h1k.map((k) => cm.get(k)).filter(dGood); if (g.length && g.length >= Math.min(6, Math.max(1, h1k.length - 1))) { DUEL.refA = dMed(g.map((o) => Number(o.hv1))); DUEL.refB = dMed(g.map((o) => Number(o.hv2))); dlog(`REF lane1_landed=${DUEL.refA} lane2_landed=${DUEL.refB} from=${g.length}`); } }
    const o = cm.get(prevK);
    if (!dGood(o) && sec < 55) return;
    DUEL.done.add(prevK);
    if (DUEL.refA == null || !(DUEL.refA > 0) || (!SOLO && (DUEL.refB == null || !(DUEL.refB > 0)))) { dlog(`HOLD min=${prevK}Z reason=no-ref a=${DUEL.a} b=${DUEL.b}`); return; }
    if (!dGood(o)) { dlog(`HOLD min=${prevK}Z reason=${!o ? "unread" : o.final !== "1" ? "not-final" : o.partial === "1" ? "partial" : "lag"} a=${DUEL.a} b=${DUEL.b}`); return; }
    const h1v = Number(o.hv1), h2v = Number(o.hv2), mA = h1v / DUEL.refA, mB = SOLO ? NaN : h2v / DUEL.refB, a0 = DUEL.a, b0 = DUEL.b;
    const move = (r, okk, m, noDown, tgt = DUEL.tgt) => { if (m < tgt) { DUEL[r] = Math.min(DUEL.cap, Math.round(DUEL[r] * DUEL.up)); DUEL[okk] = 0; } else if (++DUEL[okk] >= DUEL.okNeed) { if (!noDown) DUEL[r] = Math.max(DUEL.floor, Math.round(DUEL[r] * DUEL.down)); DUEL[okk] = 0; } };
    move("a", "aOk", mA, DUEL.asym, DUEL.asym ? DUEL.tgtGreedy : DUEL.tgt); if (!SOLO) move("b", "bOk", mB, false);
    let extra = "";
    if (a0 >= DUEL.cap && b0 >= DUEL.cap) DUEL.capRun++; else DUEL.capRun = 0;
    if (a0 >= DUEL.cap) DUEL.capRunA = (DUEL.capRunA || 0) + 1; else DUEL.capRunA = 0;   // (xxi) pre-run 18: the greedy side alone at the cap
    if (DUEL.capRunA >= DUEL.capNeed && DUEL.capRun < DUEL.capNeed) { dlog(`CAP_REACHED side=a min=${prevK}Z a_at_cap_min=${DUEL.capRunA} since_start_min=${Math.round((now - DUEL.resetAt) / 60000)} b=${DUEL.b} ${laneFees()}`); DUEL.capRun = DUEL.capNeed; }
    if (DUEL.capRun >= DUEL.capNeed) { DUEL.capRunA = 0; dlog(`CAP_REACHED min=${prevK}Z both_at_cap_min=${DUEL.capRun} since_start_min=${Math.round((now - DUEL.resetAt) / 60000)} ${laneFees()}`); DUEL.a = 150; DUEL.b = 150; DUEL.aOk = 0; DUEL.bOk = 0; DUEL.capRun = 0; DUEL.resetAt = now; extra = " cap_reset=1"; }
    setRates(); DUEL.n++;
    dlog(`MIN min=${prevK}Z seg=${prevSeg.label} a_hv1=${h1v} a_pct=${(100 * mA).toFixed(0)} b_hv2=${h2v} b_pct=${SOLO ? "-" : (100 * mB).toFixed(0)} a_rate=${a0}->${DUEL.a} b_rate=${b0}->${DUEL.b}${extra} share1=${h1v + h2v ? ((100 * h1v) / (h1v + h2v)).toFixed(1) : "-"} ${COHORTS.map((c) => c + "_pf=" + (Number(o["h_" + c]) / (tierOfC(c).to - tierOfC(c).from + 1)).toFixed(1)).join(" ")} other=${o.other} cb=${o.cb} ${laneFees()}`);
  } catch (e) { dlog("ERROR " + String(e?.message || e).replace(/[0-9a-f]{64}/gi, "<h>").slice(0, 120)); }
}
setInterval(duelTick, 2000);
