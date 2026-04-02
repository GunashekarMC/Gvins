"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useRef } from "react";

const NAV_HEIGHT = 64;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 1.2, ease: "easeOut" } },
};

const pillars = [
  {
    index: "01",
    title: "AI Agents",
    desc: "Self-operating systems that perceive, decide, and act across complex enterprise workflows — without human intervention.",
    stat: "99.4%",
    statLabel: "Uptime SLA",
  },
  {
    index: "02",
    title: "Automation",
    desc: "Intelligent pipelines that orchestrate data, models, and decisions in real time across distributed infrastructure.",
    stat: "<12ms",
    statLabel: "Avg. Latency",
  },
  {
    index: "03",
    title: "Analytics",
    desc: "Continuous intelligence layers that transform raw signals into predictive, actionable insights at enterprise scale.",
    stat: "10B+",
    statLabel: "Events / Day",
  },
];

function ShimmerCard({
  children,
  delay = 0,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const startRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let mounted = true;
    const DURATION = 3500;
    const CYCLE = 7000;

    function resize() {
      const parent = canvas!.parentElement;
      if (!parent) return;
      const r = parent.getBoundingClientRect();
      canvas!.width = r.width;
      canvas!.height = r.height;
    }
    resize();
    const ro = new ResizeObserver(resize);
    if (canvas.parentElement) ro.observe(canvas.parentElement);

    function perimToXY(p: number, W: number, H: number): [number, number] {
      if (p < 0) return [W, 0];
      if (p <= W) return [W - p, 0];
      const p2 = p - W;
      if (p2 <= H) return [0, p2];
      const p3 = p2 - H;
      if (p3 <= W) return [p3, H];
      const p4 = p3 - W;
      if (p4 <= H) return [W, H - p4];
      return [W, 0];
    }

    function addLaserStops(
      g: CanvasGradient,
      beamStart: number,
      beamEnd: number,
      center: number,
      segStart: number,
      segEnd: number,
    ) {
      const len = segEnd - segStart;
      if (len <= 0) return;
      const map = (p: number) => Math.max(0, Math.min(1, (p - segStart) / len));
      const s = map(beamStart);
      const c = map(center);
      const e = map(beamEnd);
      g.addColorStop(Math.max(0, s), "rgba(10,30,90,0)");
      g.addColorStop(
        Math.max(0, Math.min(1, c - 0.14)),
        "rgba(30,70,180,0.10)",
      );
      g.addColorStop(
        Math.max(0, Math.min(1, c - 0.07)),
        "rgba(55,110,220,0.42)",
      );
      g.addColorStop(
        Math.max(0, Math.min(1, c - 0.025)),
        "rgba(60,155,255,0.72)",
      );
      g.addColorStop(Math.max(0, Math.min(1, c)), "rgba(220,242,255,1)");
      g.addColorStop(
        Math.max(0, Math.min(1, c + 0.025)),
        "rgba(60,155,255,0.72)",
      );
      g.addColorStop(
        Math.max(0, Math.min(1, c + 0.07)),
        "rgba(55,110,220,0.42)",
      );
      g.addColorStop(
        Math.max(0, Math.min(1, c + 0.14)),
        "rgba(30,70,180,0.10)",
      );
      g.addColorStop(Math.min(1, e), "rgba(10,30,90,0)");
    }

    function drawSeg(
      p0: number,
      p1: number,
      center: number,
      segStart: number,
      segEnd: number,
      segLen: number,
      axis: "h" | "v",
      reverse: boolean,
      fixed: number,
      coordStart: number,
      coordEnd: number,
    ) {
      const ol = [Math.max(segStart, p0), Math.min(segEnd, p1)];
      if (ol[1] <= ol[0]) return;
      const toC = (pp: number) => {
        const frac = (pp - segStart) / segLen;
        return reverse
          ? coordEnd + (coordStart - coordEnd) * frac
          : coordStart + (coordEnd - coordStart) * frac;
      };
      const cA = toC(ol[0]);
      const cB = toC(ol[1]);
      const cMin = Math.min(cA, cB);
      const cMax = Math.max(cA, cB);
      const grad =
        axis === "h"
          ? ctx!.createLinearGradient(cA, fixed, cB, fixed)
          : ctx!.createLinearGradient(fixed, cA, fixed, cB);
      addLaserStops(grad, p0, p1, center, ol[0], ol[1]);
      ctx!.save();
      if (axis === "h") ctx!.rect(cMin - 1, fixed - 1, cMax - cMin + 2, 3);
      else ctx!.rect(fixed - 1, cMin - 1, 3, cMax - cMin + 2);
      ctx!.clip();
      ctx!.strokeStyle = grad;
      ctx!.lineWidth = 1.6;
      ctx!.beginPath();
      if (axis === "h") {
        ctx!.moveTo(cA, fixed + 0.8);
        ctx!.lineTo(cB, fixed + 0.8);
      } else {
        ctx!.moveTo(fixed + 0.8, cA);
        ctx!.lineTo(fixed + 0.8, cB);
      }
      ctx!.stroke();
      ctx!.restore();
    }

    function draw(ts: number) {
      if (!mounted) return;
      if (startRef.current === null) startRef.current = ts - delay;
      const elapsed = (ts - startRef.current) % CYCLE;
      const W = canvas!.width;
      const H = canvas!.height;
      const perim = 2 * (W + H);
      ctx!.clearRect(0, 0, W, H);
      ctx!.strokeStyle = "rgba(255,255,255,0.07)";
      ctx!.lineWidth = 1;
      ctx!.strokeRect(0.5, 0.5, W - 1, H - 1);
      if (elapsed < DURATION) {
        const t = elapsed / DURATION;
        const BEAM_HALF = perim * 0.09;
        const center = t * (perim + BEAM_HALF * 2) - BEAM_HALF;
        const p0 = Math.max(0, center - BEAM_HALF);
        const p1 = Math.min(perim, center + BEAM_HALF);
        if (p1 > p0) {
          drawSeg(p0, p1, center, 0, W, W, "h", true, 0, W, 0);
          drawSeg(p0, p1, center, W, W + H, H, "v", false, 0, 0, H);
          drawSeg(p0, p1, center, W + H, W + H + W, W, "h", false, H, 0, W);
          drawSeg(p0, p1, center, W + H + W, perim, H, "v", true, W, H, 0);
          const [cx, cy] = perimToXY(
            Math.max(0, Math.min(perim, center)),
            W,
            H,
          );
          const glowR = ctx!.createRadialGradient(cx, cy, 0, cx, cy, 22);
          glowR.addColorStop(0, "rgba(190,228,255,0.80)");
          glowR.addColorStop(0.4, "rgba(60,140,255,0.22)");
          glowR.addColorStop(1, "rgba(0,0,0,0)");
          ctx!.fillStyle = glowR;
          ctx!.beginPath();
          ctx!.arc(cx, cy, 22, 0, Math.PI * 2);
          ctx!.fill();
        }
      }
      animRef.current = requestAnimationFrame(draw);
    }
    animRef.current = requestAnimationFrame(draw);
    return () => {
      mounted = false;
      cancelAnimationFrame(animRef.current);
      ro.disconnect();
    };
  }, [delay]);

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />
      <div
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default function Proof() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@200;300;400;500&family=Sora:wght@100;200;300&display=swap');

        @keyframes blueLaser {
          0%   { background-position: 200% center; }
          100% { background-position: -200% center; }
        }

        .shimmer {
          background: linear-gradient(120deg,
            #0b1a3a 0%, #1f3c88 18%, #3a66ff 36%,
            #6ec1ff 48%, #dff0ff 52%, #6ec1ff 58%,
            #3a66ff 72%, #1f3c88 88%, #0b1a3a 100%
          );
          background-size: 280% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: blueLaser 8s linear infinite;
        }

        .shimmer-slow {
          background: linear-gradient(120deg,
            #162040 0%, #1f3c88 22%, #3358d4 42%,
            #55aaee 50%, #c8e8ff 52%, #55aaee 58%,
            #3358d4 72%, #1f3c88 88%, #162040 100%
          );
          background-size: 260% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: blueLaser 14s linear infinite;
        }

        .shimmer-dim {
          background: linear-gradient(120deg,
            #1a2440 0%, #243a70 28%, #2e6bb8 44%,
            #60aadd 50%, #2e6bb8 56%, #243a70 72%, #1a2440 100%
          );
          background-size: 240% 100%;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: blueLaser 18s linear infinite;
        }

        .proof-hairline {
          height: 1px;
          flex-shrink: 0;
          background: linear-gradient(90deg,
            transparent 0%,
            rgba(45,95,165,0.08) 20%,
            rgba(65,138,210,0.16) 50%,
            rgba(45,95,165,0.08) 80%,
            transparent 100%
          );
        }

        .btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 28px;
          background: #ffffff;
          color: #000;
          font-family: 'Outfit', sans-serif;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.18s;
          white-space: nowrap;
        }
        .btn-primary:hover { background: rgba(255,255,255,0.86); transform: translateY(-1px); }

        .btn-ghost {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 28px;
          background: transparent;
          color: rgba(255,255,255,0.42);
          border: 1px solid rgba(255,255,255,0.15);
          font-family: 'Outfit', sans-serif;
          font-size: 9px;
          font-weight: 400;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          cursor: pointer;
          transition: color 0.2s, border-color 0.2s;
          white-space: nowrap;
        }
        .btn-ghost:hover { color: rgba(255,255,255,0.82); border-color: rgba(255,255,255,0.30); }

        /* ─── LAPTOP: fixed height, 3-col, everything in view ─── */
        .proof-section {
          height: calc(100dvh - ${NAV_HEIGHT}px);
          overflow: hidden;
        }

        /* The key fix: header + hairlines + footer are fixed size.
           Cards grid gets all remaining height via flex:1 + min-height:0 */
        .proof-inner {
          flex: 1;
          display: flex;
          flex-direction: column;
          /* Total vertical gap budget is small on laptop */
          gap: clamp(12px, 1.8vh, 20px);
          min-height: 0;
        }

        .proof-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: clamp(12px, 1.5vw, 18px);
          /* Cards grow to fill available height */
          flex: 1;
          min-height: 0;
        }

        /* Each grid cell stretches to full row height */
        .proof-card-cell {
          min-height: 0;
          display: flex;
        }

        /* ─── TABLET ─── */
        @media (max-width: 1080px) and (min-width: 641px) {
          .proof-section {
            height: auto !important;
            min-height: calc(100dvh - ${NAV_HEIGHT}px);
            overflow-y: auto !important;
          }
          .proof-cards-grid {
            grid-template-columns: 1fr 1fr !important;
            flex: none !important;
          }
          .proof-card-cell {
            min-height: 220px;
          }
        }

        /* ─── MOBILE ─── */
        @media (max-width: 640px) {
          .proof-section {
            height: auto !important;
            min-height: calc(100dvh - ${NAV_HEIGHT}px);
            overflow-y: auto !important;
            padding: 28px 18px 36px !important;
          }
          .proof-cards-grid {
            grid-template-columns: 1fr !important;
            flex: none !important;
          }
          .proof-card-cell {
            min-height: 200px;
          }
          .proof-h2 {
            font-size: 30px !important;
          }
          .proof-footer {
            justify-content: flex-start !important;
          }
        }
      `}</style>

      <section
        className="proof-section"
        style={{
          position: "relative",
          width: "100%",
          background: "#000000",
          color: "#ffffff",
          fontFamily: "'Outfit', sans-serif",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
          padding: "clamp(28px, 3.8vh, 48px) clamp(24px, 5vw, 72px)",
        }}
      >
        {/* Top edge */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(90deg,transparent,rgba(55,125,210,0.2) 35%,rgba(90,168,255,0.32) 50%,rgba(55,125,210,0.2) 65%,transparent)",
            zIndex: 2,
          }}
        />

        <motion.div
          className="proof-inner"
          variants={container}
          initial="hidden"
          animate="show"
          style={{ position: "relative", zIndex: 10 }}
        >
          {/* ── HEADER ── */}
          <motion.div variants={fadeUp} style={{ flexShrink: 0 }}>
            <p
              className="shimmer-dim"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontSize: "9px",
                fontWeight: 400,
                letterSpacing: "0.34em",
                textTransform: "uppercase",
                marginBottom: "clamp(8px, 1.2vh, 14px)",
              }}
            >
              System Design · Intelligence
            </p>

            <h2
              className="proof-h2"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 200,
                fontSize: "clamp(28px, 3vw, 46px)",
                letterSpacing: "0.03em",
                lineHeight: 1.1,
                margin: 0,
                marginBottom: "clamp(8px, 1.2vh, 14px)",
              }}
            >
              <span className="shimmer">Intelligence</span>{" "}
              <span style={{ color: "rgba(255,255,255,0.72)" }}>
                Isn't Added.
              </span>
              <br />
              <span className="shimmer-slow">It's Engineered.</span>
            </h2>

            <p
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 300,
                fontSize: "clamp(11px, 1.1vw, 13.5px)",
                lineHeight: 1.78,
                color: "rgba(255,255,255,0.55)",
                maxWidth: "440px",
                margin: 0,
              }}
            >
              We build AI systems as infrastructure — not features. Designed to
              operate autonomously, adapt continuously, and scale across
              enterprise-grade environments without compromise.
            </p>
          </motion.div>

          {/* Hairline */}
          <motion.div
            variants={fadeIn}
            className="proof-hairline"
            style={{ flexShrink: 0 }}
          />

          {/* ── CARDS ── */}
          <motion.div variants={container} className="proof-cards-grid">
            {pillars.map((p, i) => (
              <motion.div key={i} variants={fadeUp} className="proof-card-cell">
                <ShimmerCard delay={i * 1100}>
                  {/* Inner layout: fixed pieces (index, title, divider, stat) + flex-grow desc */}
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      padding:
                        "clamp(16px, 2vh, 24px) clamp(16px, 1.6vw, 20px)",
                      background: "rgba(255,255,255,0.03)",
                      boxSizing: "border-box",
                    }}
                  >
                    {/* Index — fixed */}
                    <span
                      className="shimmer-dim"
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontSize: "8px",
                        fontWeight: 400,
                        letterSpacing: "0.26em",
                        display: "block",
                        flexShrink: 0,
                        marginBottom: "10px",
                      }}
                    >
                      {p.index}
                    </span>

                    {/* Title — fixed */}
                    <h3
                      className="shimmer-slow"
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 300,
                        fontSize: "clamp(14px, 1.3vw, 18px)",
                        letterSpacing: "0.08em",
                        margin: 0,
                        flexShrink: 0,
                        marginBottom: "10px",
                      }}
                    >
                      {p.title}
                    </h3>

                    {/* Inner divider — fixed */}
                    <div
                      style={{
                        height: "1px",
                        background: "rgba(255,255,255,0.055)",
                        flexShrink: 0,
                        marginBottom: "12px",
                      }}
                    />

                    {/* Description — GROWS to fill available space, NEVER hides */}
                    <p
                      style={{
                        fontFamily: "'Outfit', sans-serif",
                        fontWeight: 300,
                        fontSize: "clamp(10px, 0.9vw, 12.5px)",
                        letterSpacing: "0.02em",
                        lineHeight: 1.8,
                        color: "rgba(255,255,255,0.44)",
                        margin: 0,
                        // Grows but never collapses to zero
                        flex: 1,
                        minHeight: "fit-content",
                      }}
                    >
                      {p.desc}
                    </p>

                    {/* Stat — fixed at bottom */}
                    <div
                      style={{
                        flexShrink: 0,
                        marginTop: "14px",
                        paddingTop: "12px",
                        borderTop: "1px solid rgba(255,255,255,0.055)",
                      }}
                    >
                      <div
                        className="shimmer"
                        style={{
                          fontFamily: "'Sora', sans-serif",
                          fontWeight: 100,
                          fontSize: "clamp(20px, 1.8vw, 28px)",
                          letterSpacing: "-0.01em",
                          display: "block",
                          lineHeight: 1,
                          marginBottom: "5px",
                        }}
                      >
                        {p.stat}
                      </div>
                      <div
                        style={{
                          fontFamily: "'Outfit', sans-serif",
                          fontSize: "8px",
                          fontWeight: 400,
                          letterSpacing: "0.22em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.26)",
                        }}
                      >
                        {p.statLabel}
                      </div>
                    </div>
                  </div>
                </ShimmerCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Hairline */}
          <motion.div
            variants={fadeIn}
            className="proof-hairline"
            style={{ flexShrink: 0 }}
          />

          {/* ── FOOTER ── */}
          <motion.div
            variants={fadeUp}
            className="proof-footer"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: "10px",
              flexShrink: 0,
            }}
          >
            <button className="btn-primary">Explore Platform</button>
            <button className="btn-ghost">Case Studies</button>
          </motion.div>
        </motion.div>

        {/* Bottom edge */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "1px",
            background:
              "linear-gradient(90deg,transparent,rgba(45,95,165,0.10) 28%,rgba(65,138,210,0.18) 50%,rgba(45,95,165,0.10) 72%,transparent)",
            zIndex: 2,
          }}
        />
      </section>
    </>
  );
}
