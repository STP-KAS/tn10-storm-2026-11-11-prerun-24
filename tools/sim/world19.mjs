// world19.mjs: offline toy world for pre-run 19 (greedy alone). Block-level: 10 blocks/s, 500,000 mass each. Ready set =
// our lane chains (266,700 mass; a chain's next tx is ready Ll s after its parent is included), 16 family chains (41,150 mass,
// tiers 100/150/300/450; next hop ready Lf s after the parent), other small traffic (Poisson, 2,500 mass, rate 2).
// Selection: if the ready mass fits one block take all, else draw weighted by rate^3 without replacement, skipping what does
// not fit, until nothing more fits (an approximation of rusty-kaspa v2.1.0 frontier sampling). The real duel block decides.
import fs from "node:fs"; import os from "node:os"; import path from "node:path";
const A = Object.fromEntries(process.argv.slice(2).map((x) => x.split("=")));
const SEED = +(A.seed || 1); let s = SEED; const rnd = () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648);
const STOP = +(A.stop || 0), ORATE = +(A.orate || 2); const Ll = +(A.Ll || 2.6), Lf = +(A.Lf || 1.15), OTHER = +(A.other || 3100), TWO = A.two === "1", BPS = +(A.bps || 10);
const PLAN = (A.plan || "base:4,ref:5,g1:6,g2:6,ret:3").split(",").map((x) => x.split(":")).map(([l, n]) => [l, +n]);
const D = fs.mkdtempSync(path.join(os.tmpdir(), "w19")); for (const d of ["control", "logs", "private"]) fs.mkdirSync(D + "/" + d);
const P = (a, b) => path.join(D, a, b); let T = Date.parse("2026-11-13T10:00:00Z"); const T0 = T; const isoZ = () => new Date(T).toISOString(); const phase = () => {};
const mkey = (ms) => new Date(ms).toISOString().slice(0, 16);
const COHORTS = ["floor", "r150", "r300", "r450"]; const TT = { floor: [1, 4], r150: [5, 8], r300: [9, 12], r450: [13, 16] }; const tierOfC = (c) => ({ from: TT[c][0], to: TT[c][1] });
const RATE = { floor: 100, r150: 150, r300: 300, r450: 450 };
const segAt = new Map(), stepKeys = {}; const L = []; const segStart = new Map(); let i = 0;
for (const [lab, n] of PLAN) { const st = { base: "BASE", ref: "HOLD-1", g1: "HOLD-2", g2: "HOLD-3", sym: "HOLD-3s", ret: "RETURN" }[lab]; stepKeys[st] = stepKeys[st] || [];
  for (let j = 0; j < n; j++, i++) { const k = mkey(T + i * 60000); const sg = { n: lab === "base" || lab === "ret" ? 0 : 30, n2: TWO && lab !== "base" && lab !== "ret" ? 30 : 0, duel: lab[0] === "g" || lab === "sym", asym: lab[0] === "g", label: lab };
    segAt.set(k, sg); stepKeys[st].push(k); if (!j) segStart.set(k, sg); L.push(k); } }
Date.now = () => T;
let code = fs.readFileSync(new URL("./duelblock19.js", import.meta.url), "utf8").replace("setInterval(duelTick, 2000);", "");
if (TWO) code = code.replace("const SOLO = true;", "const SOLO = false;");
const api = new Function("fs", "P", "isoZ", "phase", "mkey", "segAt", "stepKeys", "COHORTS", "tierOfC", code + "; return {duelTick, duelSeg, DUEL};")(fs, P, isoZ, phase, mkey, segAt, stepKeys, COHORTS, tierOfC);
// state
const lane = []; for (let c = 0; c < 60; c++) lane.push({ ready: 0, lane: c < 30 ? 1 : 2 });
const fam = []; for (let f = 1; f <= 16; f++) fam.push({ f, coh: COHORTS[Math.floor((f - 1) / 4)], ready: 0 });
let fees1 = 0, fees2 = 0; const out = [];
for (let m = 0; m < L.length; m++) {
  const k = L[m]; const sg = segAt.get(k); T = T0 + m * 60000;
  if (segStart.has(k) && sg.duel) { api.duelSeg(sg); fs.writeFileSync(P("control", "LANE-RATE"), api.DUEL.a + "\n"); fs.writeFileSync(P("control", "LANE2-RATE"), api.DUEL.b + "\n"); }
  const ra = sg.duel ? +fs.readFileSync(P("control", "LANE-RATE"), "utf8") : 150, rb = sg.duel ? +fs.readFileSync(P("control", "LANE2-RATE"), "utf8") : 150;
  const cnt = { hv1: 0, hv2: 0, floor: 0, r150: 0, r300: 0, r450: 0, other: 0 }; let otherQ = 0;
  for (let b = 0; b < 60 * BPS; b++) {
    const t = m * 60 + b / BPS;
    otherQ += OTHER / 60 / BPS;
    const cand = [];
    for (const c of lane) { const on = c.lane === 1 ? sg.n > 0 : sg.n2 > 0; if (on && c.ready <= t) cand.push({ kind: "l", c, mass: 266700, w: (c.lane === 1 ? ra : rb) ** 3 }); }
    for (const f of fam) if (f.ready <= t) cand.push({ kind: "f", f, mass: 41150, w: RATE[f.coh] ** 3 });
    const no = Math.floor(otherQ); for (let x = 0; x < no; x++) cand.push({ kind: "o", mass: 2500, w: ORATE ** 3 });
    let tot = cand.reduce((a, c) => a + c.mass, 0), cap = 500000, chosen = [];
    if (tot <= cap) chosen = cand; else { let pool = cand.slice(); while (pool.length && cap >= 2500) { let W = 0; for (const c of pool) W += c.w; let r = rnd() * W, j = 0; for (; j < pool.length - 1; j++) { r -= pool[j].w; if (r <= 0) break; } const c = pool.splice(j, 1)[0]; if (c.mass <= cap) { chosen.push(c); cap -= c.mass; } else if (rnd() < STOP) break; } }
    for (const c of chosen) { if (c.kind === "l") { c.c.ready = t + Ll; if (c.c.lane === 1) { cnt.hv1++; fees1 += ra * 266700 / 1e8; } else { cnt.hv2++; fees2 += rb * 266700 / 1e8; } } else if (c.kind === "f") { c.f.ready = t + Lf; cnt[c.f.coh]++; } else { cnt.other++; otherQ--; } }
  }
  fs.writeFileSync(P("private", "heavy-total.json"), JSON.stringify({ lane1: { fees_tkas: fees1 }, lane2: { fees_tkas: fees2 } }));
  fs.appendFileSync(P("logs", "chain-minute.log"), `${k} final=1 cb=600 hv=${cnt.hv1 + cnt.hv2} hv2=${cnt.hv2} hv1=${cnt.hv1} h_floor=${cnt.floor} h_r150=${cnt.r150} h_r300=${cnt.r300} h_r450=${cnt.r450} other=${cnt.other} partial=0 lag=0\n`);
  out.push({ k, seg: sg.label, a: sg.n ? ra : 0, b: sg.n2 ? rb : 0, ...cnt });
  T = T0 + (m + 1) * 60000 + 23000; api.duelTick();
}
const base = {}; for (const c of COHORTS) { const v = out.filter((o) => o.seg === "base").map((o) => o[c] / 4); base[c] = v.reduce((a, x) => a + x, 0) / v.length; }
const dl = fs.readFileSync(P("logs", "duel.log"), "utf8");
if (A.v) for (const o of out) console.log(o.seg.padEnd(4), String(o.a).padStart(4), String(o.b).padStart(4), "hv1", String(o.hv1).padStart(3), "hv2", String(o.hv2).padStart(3), COHORTS.map((c) => c + " " + Math.round((100 * o[c]) / 4 / base[c])).join(" "), "other", o.other);
if (A.v) console.log(dl.split("\n").filter((l) => /REF|CAP|ERROR|HOLD/.test(l)).join("\n"));
const g = out.filter((o) => o.seg[0] === "g");
console.log(`seed=${SEED} Ll=${Ll} two=${TWO ? 1 : 0} base/fam=${COHORTS.map((c) => base[c].toFixed(1)).join("/")} path=${g.map((o) => o.a).join(">")} end=${api.DUEL.a} fees=${(fees1 + fees2).toFixed(0)} caps=${(dl.match(/CAP_REACHED/g) || []).length} errors=${(dl.match(/ERROR/g) || []).length}`);
