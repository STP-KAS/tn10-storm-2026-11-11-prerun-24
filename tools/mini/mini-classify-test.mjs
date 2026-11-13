// Offline test of pre-run 10 Mini classify(): one hop row per transaction. Extracts classify() from mini-runner.mjs and
// runs it with stub state; also replays pre-run 9's dedupe test. No node, no network.
import assert from "node:assert/strict";
import fs from "node:fs";
import crypto from "node:crypto";
const src = fs.readFileSync(new URL("./mini-runner.mjs", import.meta.url), "utf8");
const body = src.slice(src.indexOf("function classify(txid) {"), src.indexOf("async function headerTime"));
const txMeta = new Map(), covOut = new Set(); let families = [];
const classify = new Function("txMeta", "covOut", "crypto", "getFamilies", body.replace(/families\./g, "getFamilies().") + "\nreturn classify;")(txMeta, covOut, crypto, () => families);
const h = (s) => crypto.createHash("sha256").update(s).digest("hex");
const cov = "ab".repeat(32), cov2 = "cd".repeat(32);
// genesis: no covenant input, one covenant output
txMeta.set("g1", { inputs: ["f0:0"], outputs: [{ ix: 0, cov }] });
let r = classify("g1"); assert.equal(r.length, 1); assert.equal(r[0].kind, "genesis");
// hop: spends g1:0, two covenant outputs (as on TN10 in pre-run 9) -> exactly one hop row
txMeta.set("h1", { inputs: ["g1:0"], outputs: [{ ix: 0, cov }, { ix: 1, cov }] });
r = classify("h1"); assert.equal(r.length, 1, "one row per hop tx"); assert.equal(r[0].kind, "hop"); assert.equal(r[0].digest, h(cov));
// next hop spends h1's SECOND covenant output: still recognised as a hop (both outputs remembered)
txMeta.set("h2", { inputs: ["h1:1"], outputs: [{ ix: 0, cov }, { ix: 1, cov }] });
r = classify("h2"); assert.equal(r.length, 1); assert.equal(r[0].kind, "hop");
// two different covenant ids on one tx: one row, the known family's digest preferred
families = [{ n: 7, hash: h(cov2) }];
txMeta.set("h3", { inputs: ["h2:0"], outputs: [{ ix: 0, cov }, { ix: 1, cov: cov2 }] });
r = classify("h3"); assert.equal(r.length, 1); assert.equal(r[0].digest, h(cov2));
// payment: no covenant output -> no row
txMeta.set("p1", { inputs: ["x:0"], outputs: [] }); assert.deepEqual(classify("p1"), []);
// unknown tx -> null
assert.equal(classify("zz"), null);
// a hop chain of N transactions gives N hop rows (pre-run 9 gave 2N)
let rows = 0; let prev = "h3";
for (let i = 0; i < 100; i++) { const id = "c" + i; txMeta.set(id, { inputs: [prev + ":" + (i % 2)], outputs: [{ ix: 0, cov }, { ix: 1, cov }] }); rows += classify(id).filter((x) => x.kind === "hop").length; prev = id; }
assert.equal(rows, 100);
console.log(JSON.stringify({ ok: 1, chain_hops: 100, hop_rows: rows }));
