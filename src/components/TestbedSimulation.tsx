"use client";

/*
 * The animation engine keeps its mutable state in a ref and re-renders once per frame
 * through setFrame. That pattern is intentional here, so the React Compiler ref rules
 * are disabled for this file only. This project does not enable the React Compiler.
 */
/* eslint-disable react-hooks/refs */

import { useCallback, useEffect, useRef, useState } from "react";
import { Logo } from "./Logo";
import { DEMO_KEY as K, addCiphertexts, bitLength, decrypt, encrypt, isValidCiphertext } from "@/lib/paillier";

/**
 * Educational browser simulation of the smart-home research architecture.
 * Paillier operations are genuinely computed (see src/lib/paillier.ts) but with an
 * insecure demonstration key. Every counter, message and outcome is generated here and
 * is not an experimental result.
 */

const SENSORS = 15;
const WINDOW = 5; // demo setting for the temporal aggregate window
const MAX_AGE = 30; // simulated seconds
const STEP_SECONDS = 0.25;
const SCENARIO_TICKS = 160;
const SENSOR_TYPES = ["temp", "motion", "door", "light", "power"];
const sid = (i: number) => "s" + String(i + 1).padStart(2, "0");
const topic = (i: number) => `home/${SENSOR_TYPES[i % 5]}/${sid(i)}`;
const hex = (c: bigint) => "0x" + c.toString(16);

function fnv(s: string) {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, "0");
}

type NodeKey = "sensors" | "home" | "relay" | "cloud" | "consumer" | "attacker" | "occupancy" | "ha";
const POS: Record<NodeKey, [number, number]> = {
  sensors: [10.5, 30], home: [30, 30], relay: [50, 30], cloud: [70, 30], consumer: [89.5, 30],
  attacker: [10.5, 80], occupancy: [43, 80], ha: [72, 80],
};

type Msg = { id: string; sensor: number; tick: number | null; ts: number; payload: string; hash: string; m?: number };
type Kind = "reading" | "copy" | "replay" | "unauth" | "malformed" | "aggregate" | "action";
type Packet = { key: number; kind: Kind; route: NodeKey[]; seg: number; u: number; msg?: Msg; label: string; agg?: Worked };
type Verdict = "PASSED" | "REJECTED" | "DENIED" | "DECRYPTED" | "ACTION";
type Event = { id: number; at: string; verdict: Verdict; text: string };
type Worked = { items: { s: string; m: number; c: bigint }[]; C: bigint; D: bigint; ref: number } | null;

const SCENARIOS = [
  { key: "normal", name: "Normal operation", detail: "sensors publish Paillier-encrypted readings through both brokers" },
  { key: "sum", name: "Homomorphic addition", detail: "the relay multiplies ciphertexts; only the consumer decrypts the sum" },
  { key: "replay", name: "Replay attempt", detail: "a captured message is published again" },
  { key: "unauth", name: "Unauthorised publish", detail: "a client without publish permission targets a sensor topic" },
  { key: "malformed", name: "Malformed message", detail: "a message with an invalid ciphertext or missing field arrives" },
] as const;
type ScenarioKey = (typeof SCENARIOS)[number]["key"];

const STYLE: Record<Kind, string> = {
  reading: "#8ea2ff", copy: "#6f7f9a", replay: "#ffb86b", unauth: "#ff7a6b", malformed: "#ff7a6b", aggregate: "#52d69a", action: "#52d69a",
};
const VERDICT_COLOUR: Record<Verdict, string> = { PASSED: "#52d69a", REJECTED: "#ff7a6b", DENIED: "#ff7a6b", DECRYPTED: "#8ea2ff", ACTION: "#52d69a" };

const fmtTime = (s: number) => {
  const t = Math.floor(s);
  return `t+${String(Math.floor(t / 60)).padStart(2, "0")}:${String(t % 60).padStart(2, "0")}`;
};

export function TestbedSimulation({ autoplay = false, compact = false }: { autoplay?: boolean; compact?: boolean }) {
  const [running, setRunning] = useState(false);
  const [manual, setManual] = useState(!autoplay);
  const [scenario, setScenario] = useState<ScenarioKey>("normal");
  const [, setFrame] = useState(0);
  const scenarioRef = useRef<ScenarioKey>("normal");
  scenarioRef.current = scenario;
  const manualRef = useRef(manual);
  manualRef.current = manual;

  const eng = useRef({
    step: 0, sim: 0, key: 0, eid: 0, idSeq: 0,
    packets: [] as Packet[], events: [] as Event[],
    tick: new Array(SENSORS).fill(0), lastTick: new Array(SENSORS).fill(0),
    seenIds: new Set<string>(), seenHashes: new Set<string>(), captured: [] as Msg[],
    window: [] as Msg[], worked: null as Worked, replayVariant: 0, malformedVariant: 0, occupancyCount: 0,
    c: { published: 0, passed: 0, rejected: 0, denied: 0, aggregates: 0 },
    live: "",
  });

  useEffect(() => {
    if (!autoplay) return;
    let reduce = false;
    try {
      reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches || document.documentElement.dataset.motion === "reduce";
    } catch {
      /* ignore */
    }
    // Starts autoplay once, after reading the client-only motion preference.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (!reduce) setRunning(true);
  }, [autoplay]);

  const log = (verdict: Verdict, text: string) => {
    const e = eng.current;
    e.events.unshift({ id: ++e.eid, at: fmtTime(e.sim), verdict, text });
    if (e.events.length > 7) e.events.pop();
  };

  const spawn = (kind: Kind, route: NodeKey[], label: string, msg?: Msg, agg?: Worked) => {
    const e = eng.current;
    e.packets.push({ key: ++e.key, kind, route, seg: 0, u: 0, msg, label, agg });
  };

  /** Relay validation, in the order: malformed, message age, duplicate ID or payload hash, sensor tick. */
  const validate = (msg: Msg): string | null => {
    const e = eng.current;
    if (msg.tick === null || !/^0x[0-9a-f]+$/.test(msg.payload)) return "malformed: missing field or non-hex payload";
    const c = BigInt(msg.payload);
    if (!isValidCiphertext(K, c)) return "malformed: ciphertext outside the valid range for this key";
    const age = e.sim - msg.ts;
    if (age > MAX_AGE) return `message age ${Math.round(age)}s exceeds the ${MAX_AGE}s limit`;
    if (e.seenIds.has(msg.id)) return `duplicate message ID ${msg.id}`;
    if (e.seenHashes.has(msg.hash)) return `duplicate payload hash ${msg.hash}`;
    if (msg.tick <= e.lastTick[msg.sensor]) return `sensor tick ${msg.tick} not greater than ${e.lastTick[msg.sensor]}`;
    return null;
  };

  const arrive = (p: Packet, at: NodeKey): boolean => {
    const e = eng.current;
    const msg = p.msg;
    if (at === "home") {
      if (p.kind === "unauth") {
        e.c.denied++;
        log("DENIED", `broker ACL: client "unknown-01" may not publish to ${topic(msg!.sensor)}`);
        return false;
      }
      if (p.kind === "reading") spawn("copy", ["home", "occupancy"], sid(msg!.sensor), msg);
      return true;
    }
    if (at === "relay" && msg) {
      const reason = validate(msg);
      if (reason) {
        e.c.rejected++;
        log("REJECTED", `relay: ${reason}`);
        return false;
      }
      e.c.passed++;
      e.seenIds.add(msg.id);
      e.seenHashes.add(msg.hash);
      e.lastTick[msg.sensor] = msg.tick!;
      e.window.push(msg);
      if (e.c.passed % 3 === 0) log("PASSED", `relay checks passed: ${topic(msg.sensor)} tick ${msg.tick}, id ${msg.id}`);
      if (e.window.length === WINDOW) {
        const items = e.window.map((w) => ({ s: sid(w.sensor), m: w.m ?? 0, c: BigInt(w.payload) }));
        const C = addCiphertexts(K, items.map((i) => i.c));
        e.window = [];
        spawn("aggregate", ["relay", "cloud", "consumer"], "E(sum)", undefined, { items, C, D: 0n, ref: items.reduce((a, i) => a + i.m, 0) });
      }
      return false;
    }
    if (at === "consumer" && p.kind === "aggregate" && p.agg) {
      const D = decrypt(K, p.agg.C);
      e.worked = { ...p.agg, D };
      e.c.aggregates++;
      log("DECRYPTED", `consumer: aggregate of ${WINDOW} ciphertexts decrypts to ${D}`);
      e.live = `Simulated aggregate decrypted to ${D}; plaintext reference ${e.worked.ref}.`;
      return false;
    }
    if (at === "occupancy" && msg) {
      e.occupancyCount++;
      if (e.occupancyCount % 6 === 0) {
        decrypt(K, BigInt(msg.payload));
        spawn("action", ["occupancy", "ha"], "light");
        log("ACTION", `occupancy controller decrypted ${sid(msg.sensor)}; virtual light update sent`);
      }
      return false;
    }
    if (at === "ha") return false;
    return true;
  };

  const step = useCallback(() => {
    const e = eng.current;
    e.step++;
    e.sim += STEP_SECONDS;
    if (!manualRef.current && e.step % SCENARIO_TICKS === 0) {
      const i = SCENARIOS.findIndex((s) => s.key === scenarioRef.current);
      setScenario(SCENARIOS[(i + 1) % SCENARIOS.length].key);
    }
    const sc = scenarioRef.current;

    // Legitimate sensor publishing
    if (e.step % (sc === "sum" ? 12 : 8) === 0) {
      const s = Math.floor(Math.random() * SENSORS);
      const m = 10 + (s % 5) * 7 + Math.floor(Math.random() * 4);
      const c = encrypt(K, BigInt(m));
      e.tick[s]++;
      const id = `m${(++e.idSeq).toString(36)}`;
      const payload = hex(c);
      const msg: Msg = { id, sensor: s, tick: e.tick[s], ts: e.sim, payload, hash: fnv(payload), m };
      e.c.published++;
      e.captured.push(msg);
      if (e.captured.length > 40) e.captured.shift();
      spawn("reading", ["sensors", "home", "relay"], sid(s), msg);
    }

    // Scenario traffic from the attacker client
    if (sc === "replay" && e.step % 26 === 0 && e.captured.length > 4) {
      const v = e.replayVariant++ % 3;
      let msg: Msg;
      if (v === 0) {
        msg = { ...e.captured[e.captured.length - 3] };
      } else if (v === 1) {
        const old = e.captured[e.captured.length - 2];
        msg = { ...old, id: `m${(++e.idSeq).toString(36)}`, ts: e.sim };
      } else {
        const old = e.captured[0];
        msg = { ...old, id: `m${(++e.idSeq).toString(36)}`, ts: e.sim - MAX_AGE - 12 };
      }
      spawn("replay", ["attacker", "home", "relay"], "REPLAY", msg);
    }
    if (sc === "unauth" && e.step % 30 === 0) {
      const s = Math.floor(Math.random() * SENSORS);
      spawn("unauth", ["attacker", "home"], "PUBLISH", { id: "x", sensor: s, tick: 0, ts: e.sim, payload: "0x0", hash: "" });
    }
    if (sc === "malformed" && e.step % 28 === 0) {
      const s = Math.floor(Math.random() * SENSORS);
      const v = e.malformedVariant++ % 3;
      const payload = v === 0 ? hex(K.n2 + 17n) : v === 1 ? "not-a-ciphertext" : hex(encrypt(K, 5n));
      spawn("malformed", ["attacker", "home", "relay"], "MALFORMED", {
        id: `m${(++e.idSeq).toString(36)}`, sensor: s, tick: v === 2 ? null : e.tick[s] + 1, ts: e.sim, payload, hash: fnv(payload + v),
      });
    }

    // Move packets
    const keep: Packet[] = [];
    for (const p of e.packets) {
      p.u += 0.045;
      if (p.u >= 1) {
        p.u = 0;
        p.seg++;
        const at = p.route[p.seg];
        const cont = arrive(p, at);
        if (!cont || p.seg >= p.route.length - 1) continue;
      }
      keep.push(p);
    }
    e.packets = keep.slice(-50);
    setFrame(e.step);
    // arrive, spawn and log only touch refs, so the callback can stay stable.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!running) return;
    const t = window.setInterval(step, 80);
    return () => window.clearInterval(t);
  }, [running, step]);

  const choose = (k: ScenarioKey) => {
    setManual(true);
    setScenario(k);
    setRunning(true);
  };

  const e = eng.current;
  const posOf = (p: Packet) => {
    const a = POS[p.route[p.seg]];
    const b = POS[p.route[Math.min(p.seg + 1, p.route.length - 1)]];
    return [a[0] + (b[0] - a[0]) * p.u, a[1] + (b[1] - a[1]) * p.u];
  };
  const current = SCENARIOS.find((s) => s.key === scenario)!;
  const attacking = scenario === "replay" || scenario === "unauth" || scenario === "malformed";
  const attackerSub = scenario === "replay" ? "resends captured messages" : scenario === "unauth" ? "no publish permission" : scenario === "malformed" ? "sends invalid payloads" : "idle";
  const nodes: { k: NodeKey; logo: string; name: string; sub: string; hot?: boolean }[] = [
    { k: "sensors", logo: "ubuntu", name: "15 sensor streams", sub: "simulated, encrypted" },
    { k: "home", logo: "mosquitto", name: "Home MQTT broker", sub: "credentials and ACLs" },
    { k: "relay", logo: "python", name: "Validation and HE relay", sub: `window ${e.window.length}/${WINDOW}` },
    { k: "cloud", logo: "mosquitto", name: "Cloud MQTT broker", sub: "forwards aggregates" },
    { k: "consumer", logo: "python", name: "Authorised consumer", sub: "holds private key" },
    { k: "attacker", logo: "linux", name: "Attacker client", sub: attackerSub, hot: attacking },
    { k: "occupancy", logo: "python", name: "Occupancy controller", sub: "decrypts individual readings" },
    { k: "ha", logo: "homeassistant", name: "Home Assistant", sub: "virtual-light automation" },
  ];
  const line = (a: NodeKey, b: NodeKey, colour: string, dash?: string) => (
    <path d={`M${POS[a][0]} ${POS[a][1]} L${POS[b][0]} ${POS[b][1]}`} stroke={colour} strokeWidth="1.5" strokeDasharray={dash} fill="none" vectorEffect="non-scaling-stroke" />
  );

  return (
    <figure className={`panel sim${compact ? " sim-compact" : ""}`} id={compact ? undefined : "simulation"} style={{ margin: 0 }}>
      <div className="panel-head">
        <div className="sim-scenario">
          <span className="sim-state">Simulation</span>
          {!compact && <span className="sim-title"><strong>{current.name}</strong> <span className="label">{current.detail}</span></span>}
        </div>
        <div role="group" aria-label="Choose a scenario" className="sim-controls">
          <button type="button" className="panel-btn run" aria-pressed={running} onClick={() => setRunning(!running)}>{running ? "Pause" : "Run"}</button>
          {SCENARIOS.map((s) => (
            <button key={s.key} type="button" className="panel-btn" aria-pressed={scenario === s.key} onClick={() => choose(s.key)}>{s.name}</button>
          ))}
          {autoplay && (
            <button type="button" className="panel-btn" aria-pressed={!manual} onClick={() => { setManual(false); setRunning(true); }}>Auto</button>
          )}
        </div>
      </div>

      <p className="sim-swipe" aria-hidden="true">Swipe sideways to see the full diagram</p>
      <div className="sim-scroll">
      <div className="sim-stage panel-grid-bg" aria-hidden="true">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none">
          {line("sensors", "consumer", "#33404f")}
          {line("home", "occupancy", "#2f3b48", "4 4")}
          {line("occupancy", "ha", "#2f3b48", "4 4")}
          {line("attacker", "home", attacking ? "#ff7a6b" : "#2a3440", "3 4")}
        </svg>
        <span className="sim-lane" style={{ left: "57%", top: "62%" }}>parallel stream: individual readings</span>
        {e.packets.map((p) => {
          const [x, y] = posOf(p);
          return (
            <span key={p.key} className={`sim-pkt sim-${p.kind}`} style={{ left: `${x}%`, top: `${y}%`, background: STYLE[p.kind] }}>{p.label}</span>
          );
        })}
        {nodes.map((n) => (
          <div key={n.k} className={`sim-node ${n.hot ? "is-hot" : ""}`} style={{ left: `${POS[n.k][0]}%`, top: `${POS[n.k][1]}%` }}>
            <strong><Logo id={n.logo} size={13} decorative />{n.name}</strong>
            <span>{n.sub}</span>
          </div>
        ))}
      </div>
      </div>
      {compact ? (
        <div className="sim-latest" aria-live="off">
          {e.events[0] ? (
            <>
              <span className="sim-time">{e.events[0].at}</span>
              <span className="sim-verdict" style={{ color: VERDICT_COLOUR[e.events[0].verdict], borderColor: VERDICT_COLOUR[e.events[0].verdict] }}>{e.events[0].verdict}</span>
              <span className="sim-text">{e.events[0].text}</span>
            </>
          ) : (
            <span className="sim-text">Waiting for simulated traffic</span>
          )}
        </div>
      ) : (
      <>
      <div className="sim-body">
        <div className="sim-worked">
          <p className="sim-h">Homomorphic addition, computed in your browser</p>
          {e.worked ? (
            <>
              <ol className="sim-cts">
                {e.worked.items.map((i, idx) => (
                  <li key={idx}><span>{i.s}: m = {i.m}</span><code>c = {hex(i.c)}</code></li>
                ))}
              </ol>
              <p className="sim-eq"><code>C = c1 x c2 x ... x c5 mod n&#178; = {hex(e.worked.C)}</code></p>
              <p className="sim-eq">
                <code style={{ color: e.worked.D === BigInt(e.worked.ref) ? "var(--ok)" : "var(--bad)" }}>
                  D(C) = {e.worked.D.toString()}; plaintext reference {e.worked.ref}; {e.worked.D === BigInt(e.worked.ref) ? "match" : "mismatch"}
                </code>
              </p>
            </>
          ) : (
            <p className="sim-muted">Waiting for {WINDOW} readings to pass the relay checks and the consumer to decrypt their sum.</p>
          )}
          <p className="sim-muted">
            Demo key: n = 1009 x 1013 = {K.n.toString()} ({bitLength(K.n)} bits). Insecure, for illustration only.
          </p>
        </div>
        <div>
          <p className="sim-h" style={{ padding: "12px 14px 0" }}>Simulated event log</p>
          <ol className="sim-log" aria-label="Simulated event log">
            {e.events.length === 0 && <li className="sim-log-empty">Waiting for traffic</li>}
            {e.events.map((ev) => (
              <li key={ev.id}>
                <span className="sim-time">{ev.at}</span>
                <span className="sim-verdict" style={{ color: VERDICT_COLOUR[ev.verdict], borderColor: VERDICT_COLOUR[ev.verdict] }}>{ev.verdict}</span>
                <span className="sim-text">{ev.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="meters sim-meters">
        <div><span className="label">Simulated messages</span><div className="v">{e.c.published}</div></div>
        <div><span className="label">Passed relay checks (sim)</span><div className="v" style={{ color: "var(--ok)" }}>{e.c.passed}</div></div>
        <div><span className="label">Rejected by relay (sim)</span><div className="v" style={{ color: e.c.rejected ? "var(--bad)" : undefined }}>{e.c.rejected}</div></div>
        <div><span className="label">Denied by ACL (sim)</span><div className="v" style={{ color: e.c.denied ? "var(--bad)" : undefined }}>{e.c.denied}</div></div>
        <div><span className="label">Aggregates decrypted (sim)</span><div className="v">{e.c.aggregates}</div></div>
      </div>
      </>
      )}
      <p className="sr-only" aria-live="polite">{e.live}</p>

      <figcaption className="sim-caption">
        <strong>Educational simulation, not live testbed data.</strong> It uses a small insecure key and synthetic messages; my experiments use
        2048-bit and 3072-bit Paillier keys. Counters and outcomes are generated by the demo. Paillier alone does not guarantee message integrity,
        authenticity or freshness.
        {compact && <> <a className="sim-more" href="/research#simulation">See the full demonstration with the worked Paillier example</a></>}
      </figcaption>
    </figure>
  );
}
