import fs from "node:fs"; import os from "node:os"; import path from "node:path";
const SEED = +process.argv[2] || 1; let s = SEED; const rnd = () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648);
const D = fs.mkdtempSync(path.join(os.tmpdir(), "duel18")); fs.mkdirSync(D + "/control"); fs.mkdirSync(D + "/logs"); fs.mkdirSync(D + "/private");
const P = (a, b) => path.join(D, a, b); let T = Date.parse("2026-11-13T10:00:00Z"); const isoZ = () => new Date(T).toISOString(); const phase = () => {};
const mkey = (ms) => new Date(ms).toISOString().slice(0, 16);
const COHORTS = ["floor", "r150", "r300", "r450"]; const TT = { floor: [1, 4], r150: [5, 8], r300: [9, 12], r450: [13, 16] }; const tierOfC = (c) => ({ from: TT[c][0], to: TT[c][1] });
const segAt = new Map(), stepKeys = { "HOLD-1": [] }; const L = [];
for (let i = 0; i < 10; i++) { const k = mkey(T + i * 60000); stepKeys["HOLD-1"].push(k); segAt.set(k, { n: 30, label: "ref" }); L.push(k); }
const segs = [["greedy-1", 12, 1], ["greedy-2", 12, 1], ["sym", 8, 0]]; let i = 10;
const segStart = new Map();
for (const [lab, n, as] of segs) { for (let j = 0; j < n; j++, i++) { const k = mkey(T + i * 60000); segAt.set(k, { n: 30, duel: true, asym: !!as, label: lab }); if (!j) segStart.set(k, segAt.get(k)); L.push(k); } }
Date.now = () => T;
const code = fs.readFileSync(new URL("./duelblock18.js", import.meta.url), "utf8").replace("setInterval(duelTick, 2000);", "");
const api = new Function("fs", "P", "isoZ", "phase", "mkey", "segAt", "stepKeys", "COHORTS", "tierOfC", code + "; return {duelTick, duelSeg, DUEL};")(fs, P, isoZ, phase, mkey, segAt, stepKeys, COHORTS, tierOfC);
const H = +process.env.H || 1000, M = +process.env.M || 700; let f1 = 0, f2 = 0; const MASS = 266700;
const T0 = T; const path_ = [];
for (let m = 0; m < L.length; m++) {
  T = T0 + m * 60000; const k = L[m]; if (segStart.has(k)) { api.duelSeg(segAt.get(k)); fs.writeFileSync(P("control", "LANE-RATE"), api.DUEL.a + "\n"); fs.writeFileSync(P("control", "LANE2-RATE"), api.DUEL.b + "\n"); }
  let a = 150, b = 150; if (segAt.get(k).duel) { a = +fs.readFileSync(P("control", "LANE-RATE"), "utf8"); b = +fs.readFileSync(P("control", "LANE2-RATE"), "utf8"); }
  const w = a ** 3 / (a ** 3 + b ** 3); let n1 = 0; for (let x = 0; x < H; x++) if (rnd() < w) n1++; let n2 = H - n1; n1 = Math.min(n1, M); n2 = Math.min(n2, M);
  f1 += n1 * a * MASS / 1e8; f2 += n2 * b * MASS / 1e8; fs.writeFileSync(P("private", "heavy-total.json"), JSON.stringify({ lane1: { fees_tkas: f1 }, lane2: { fees_tkas: f2 } }));
  path_.push(`${segAt.get(k).label}:${a}/${b}`);
  fs.appendFileSync(P("logs", "chain-minute.log"), `${k}Z final=1 cb=600 hv=${n1 + n2} hv2=${n2} hv1=${n1} h_floor=200 h_r150=200 h_r300=200 h_r450=200 other=2000 partial=0 lag=0\n`);
  T = T0 + (m + 1) * 60000 + 23000; api.duelTick();
}
const dl = fs.readFileSync(P("logs", "duel.log"), "utf8").split("\n");
if (process.env.V) console.log(dl.filter((l) => /MIN|REF|HOLD|CAP|SEG|ERROR/.test(l)).map((l) => l.slice(0, 200)).join("\n"));
console.log(`seed=${SEED} H=${H} M=${M} caps=${dl.filter((l) => /CAP_REACHED/.test(l)).length} errors=${dl.filter((l) => /ERROR/.test(l)).length} fees=${(f1 + f2).toFixed(0)} path=${path_.filter((_, j) => j % 3 == 0).join(" ")}`);
