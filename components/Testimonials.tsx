"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const testimonials = [
  {
    id: "t1",
    quote:
      "We replaced three separate ML vendors with Gvins AI in a single quarter. The fraud detection model alone saved us $4.2M in its first six months. The team doesn't just ship models — they understand the business context behind each deployment.",
    author: "Priya Mehta",
    title: "Chief Risk Officer",
    company: "Nexara Financial",
    sector: "Finance",
    metric: "$4.2M",
    metricLabel: "Saved in 6 months",
    logo: "NF",
    accentColor: "#c8a97e",
  },
  {
    id: "t2",
    quote:
      "Our radiologists were skeptical. After 90 days running the diagnostic AI in shadow mode — comparing its outputs to their own — they became its biggest advocates. The sensitivity on early-stage lung nodule detection is genuinely better than our consensus reads.",
    author: "Dr. James Okafor",
    title: "Director of Radiology",
    company: "St. Meridian Health System",
    sector: "Healthcare",
    metric: "97.3%",
    metricLabel: "Diagnostic sensitivity",
    logo: "SM",
    accentColor: "#a8c4b8",
  },
  {
    id: "t3",
    quote:
      "We went from 3-week proposal cycles to 3 days without touching our win rate. The enterprise knowledge assistant has become the first thing every new hire opens in the morning. Gvins AI didn't just automate our processes — it gave our people leverage.",
    author: "Sarah Chen",
    title: "VP of Operations",
    company: "Arkon Consulting Group",
    sector: "Professional Services",
    metric: "3 days",
    metricLabel: "Proposal turnaround",
    logo: "AC",
    accentColor: "#9b9eb4",
  },
  {
    id: "t4",
    quote:
      "The visual inspection system runs at full line speed and catches defects our human inspectors were missing at 2AM. Downtime dropped 70% in year one. The predictive maintenance model paid for the entire platform contract within 4 months.",
    author: "Marcus Weber",
    title: "Head of Manufacturing Technology",
    company: "Veltex Industrial",
    sector: "Manufacturing",
    metric: "70%",
    metricLabel: "Downtime reduction",
    logo: "VI",
    accentColor: "#b4a87e",
  },
  {
    id: "t5",
    quote:
      "We needed an AI partner who understood HIPAA, air-gapped infrastructure, and the specific nuances of clinical trial data governance. Gvins AI was the only vendor who came to the first call already having read our data processing agreements.",
    author: "Dr. Anita Rosenberg",
    title: "Global Head of Data Science",
    company: "Pharmedius AG",
    sector: "Life Sciences",
    metric: "40%",
    metricLabel: "Faster trial recruitment",
    logo: "PA",
    accentColor: "#a8847b",
  },
];

const NAV_HEIGHT = 64;
const FRAME_INSET_V = 20;
const FRAME_INSET_H = 24;

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  // const [mounted, setMounted] = useState(false);
  // useEffect(() => {
  //   setMounted(true);
  // }, []);
  // if (!mounted) return null;

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActive((p) => (p + 1) % testimonials.length);
    }, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const go = (i: number) => {
    setActive(i);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setActive((p) => (p + 1) % testimonials.length);
    }, 6000);
  };

  const t = testimonials[active];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        .tst-root *, .tst-root *::before, .tst-root *::after {
          box-sizing: border-box; margin: 0; padding: 0;
        }

        .tst-frame {
          position: absolute;
          top: ${FRAME_INSET_V}px;
          bottom: ${FRAME_INSET_V}px;
          left: ${FRAME_INSET_H}px;
          right: ${FRAME_INSET_H}px;
          border-radius: 14px;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1fr 1fr;
          border: 1px solid rgba(245,244,240,0.08);
          box-shadow: 0 0 0 1px rgba(0,0,0,0.5), 0 24px 64px rgba(0,0,0,0.45);
        }

        .tst-left {
          position: relative;
          background: rgba(4,4,6,0.98);
          border-right: 1px solid rgba(245,244,240,0.06);
          display: flex;
          flex-direction: column;
          padding: 52px 56px;
          overflow: hidden;
        }

        .tst-right {
          background: rgba(7,7,10,0.97);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .tst-nav-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 16px 0;
          border-bottom: 1px solid rgba(245,244,240,0.05);
          cursor: pointer;
          transition: background 0.2s;
        }
        .tst-nav-item:last-child { border-bottom: none; }

        @media (max-width: 860px) {
          .tst-frame { grid-template-columns: 1fr; grid-template-rows: auto 1fr; }
          .tst-left { padding: 28px 28px 20px; }
          .tst-right { overflow-y: auto; }
        }
        @media (max-width: 480px) {
          .tst-frame { left: 10px; right: 10px; top: 10px; bottom: 10px; border-radius: 10px; }
        }
      `}</style>

      <section
        className="tst-root"
        id="testimonials"
        style={{
          position: "relative",
          width: "100%",
          height: `calc(100dvh - ${NAV_HEIGHT}px)`,
          overflow: "hidden",
          background: "#060608",
        }}
      >
        <div className="tst-frame">
          {/* ── LEFT: Large quote display ── */}
          <div className="tst-left">
            {/* Large decorative quote mark */}
            <span
              style={{
                position: "absolute",
                top: 36,
                left: 48,
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 140,
                fontWeight: 300,
                lineHeight: 1,
                color: "rgba(245,244,240,0.04)",
                pointerEvents: "none",
                userSelect: "none",
                letterSpacing: "-0.05em",
              }}
            >
              "
            </span>

            {/* Section label */}
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 8.5,
                fontWeight: 500,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "rgba(245,244,240,0.25)",
                marginBottom: 40,
                position: "relative",
                zIndex: 1,
              }}
            >
              — Client results
            </p>

            {/* Quote */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                position: "relative",
                zIndex: 1,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(5px)" }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {/* Sector tag */}
                  <span
                    style={{
                      display: "inline-block",
                      padding: "4px 10px",
                      border: `1px solid ${t.accentColor}40`,
                      background: `${t.accentColor}10`,
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 8,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: t.accentColor,
                      borderRadius: 1,
                      marginBottom: 24,
                    }}
                  >
                    {t.sector}
                  </span>

                  <blockquote
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: "clamp(18px, 2.2vw, 26px)",
                      fontWeight: 300,
                      fontStyle: "italic",
                      lineHeight: 1.5,
                      color: "rgba(245,244,240,0.88)",
                      letterSpacing: "-0.01em",
                      marginBottom: 32,
                    }}
                  >
                    "{t.quote}"
                  </blockquote>

                  {/* Author */}
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 14 }}
                  >
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        borderRadius: "50%",
                        background: `${t.accentColor}20`,
                        border: `1px solid ${t.accentColor}40`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 10,
                        fontWeight: 500,
                        color: t.accentColor,
                        flexShrink: 0,
                        letterSpacing: "0.05em",
                      }}
                    >
                      {t.logo}
                    </div>
                    <div>
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 12,
                          fontWeight: 500,
                          color: "rgba(245,244,240,0.82)",
                          marginBottom: 2,
                          letterSpacing: "0.02em",
                        }}
                      >
                        {t.author}
                      </p>
                      <p
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 10,
                          fontWeight: 300,
                          color: "rgba(245,244,240,0.32)",
                          letterSpacing: "0.03em",
                        }}
                      >
                        {t.title}, {t.company}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Metric + navigation */}
            <div
              style={{
                paddingTop: 28,
                borderTop: "1px solid rgba(245,244,240,0.07)",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                flexShrink: 0,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={`metric-${t.id}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: 42,
                      fontWeight: 300,
                      lineHeight: 1,
                      color: t.accentColor,
                      display: "block",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {t.metric}
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 9,
                      fontWeight: 500,
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                      color: "rgba(245,244,240,0.25)",
                    }}
                  >
                    {t.metricLabel}
                  </span>
                </motion.div>
              </AnimatePresence>

              {/* Dot nav */}
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => go(i)}
                    style={{
                      width: i === active ? 24 : 6,
                      height: 2,
                      border: "none",
                      padding: 0,
                      cursor: "pointer",
                      background:
                        i === active
                          ? "rgba(245,244,240,0.65)"
                          : "rgba(245,244,240,0.15)",
                      borderRadius: 1,
                      transition: "width 0.35s ease, background 0.3s",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: All testimonials list ── */}
          <div className="tst-right">
            {/* Header */}
            <div
              style={{
                padding: "52px 44px 24px",
                borderBottom: "1px solid rgba(245,244,240,0.06)",
                flexShrink: 0,
              }}
            >
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(24px, 2.5vw, 34px)",
                  fontWeight: 300,
                  lineHeight: 1.2,
                  color: "#f5f4f0",
                  letterSpacing: "-0.02em",
                  marginBottom: 10,
                }}
              >
                Results speak
                <br />
                <em
                  style={{
                    fontStyle: "italic",
                    color: "rgba(245,244,240,0.38)",
                  }}
                >
                  louder than claims.
                </em>
              </h2>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11.5,
                  fontWeight: 300,
                  lineHeight: 1.75,
                  color: "rgba(245,244,240,0.35)",
                }}
              >
                Every metric below comes from a live deployment — not a
                benchmark.
              </p>
            </div>

            {/* Nav list */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "8px 44px 36px",
                scrollbarWidth: "none",
              }}
            >
              {testimonials.map((item, i) => (
                <div
                  key={item.id}
                  className="tst-nav-item"
                  onClick={() => go(i)}
                  style={{
                    background:
                      i === active ? "rgba(245,244,240,0.02)" : "transparent",
                    borderLeft:
                      i === active
                        ? `2px solid ${item.accentColor}`
                        : "2px solid transparent",
                    paddingLeft: i === active ? 12 : 0,
                    marginLeft: i === active ? -14 : 0,
                    transition: "all 0.3s ease",
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background:
                        i === active
                          ? `${item.accentColor}20`
                          : "rgba(245,244,240,0.05)",
                      border:
                        i === active
                          ? `1px solid ${item.accentColor}50`
                          : "1px solid rgba(245,244,240,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 9,
                      fontWeight: 500,
                      color:
                        i === active
                          ? item.accentColor
                          : "rgba(245,244,240,0.3)",
                      flexShrink: 0,
                      transition: "all 0.3s ease",
                    }}
                  >
                    {item.logo}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 11.5,
                        fontWeight: i === active ? 500 : 400,
                        color:
                          i === active
                            ? "rgba(245,244,240,0.88)"
                            : "rgba(245,244,240,0.42)",
                        marginBottom: 3,
                        transition: "color 0.3s",
                        lineHeight: 1.3,
                      }}
                    >
                      {item.author}
                    </p>
                    <p
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 10,
                        fontWeight: 300,
                        color: "rgba(245,244,240,0.25)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {item.company} · {item.sector}
                    </p>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <span
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: 20,
                        fontWeight: 300,
                        color:
                          i === active
                            ? item.accentColor
                            : "rgba(245,244,240,0.2)",
                        display: "block",
                        lineHeight: 1,
                        transition: "color 0.3s",
                      }}
                    >
                      {item.metric}
                    </span>
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 8,
                        fontWeight: 500,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: "rgba(245,244,240,0.18)",
                      }}
                    >
                      {item.metricLabel}
                    </span>
                  </div>
                </div>
              ))}

              {/* Bottom CTA */}
              <div
                style={{
                  marginTop: 20,
                  paddingTop: 20,
                  borderTop: "1px solid rgba(245,244,240,0.06)",
                  display: "flex",
                  gap: 10,
                }}
              >
                <button
                  style={{
                    flex: 1,
                    padding: "10px 16px",
                    background: "#ffffff",
                    color: "#000000",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 9,
                    fontWeight: 500,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    border: "none",
                    borderRadius: 1,
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "rgba(255,255,255,0.84)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#ffffff")
                  }
                >
                  Read case studies
                </button>
                <button
                  style={{
                    flex: 1,
                    padding: "10px 16px",
                    background: "transparent",
                    color: "rgba(245,244,240,0.42)",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 9,
                    fontWeight: 400,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    border: "1px solid rgba(245,244,240,0.14)",
                    borderRadius: 1,
                    cursor: "pointer",
                    transition: "color 0.2s, border-color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#f5f4f0";
                    e.currentTarget.style.borderColor = "rgba(245,244,240,0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "rgba(245,244,240,0.42)";
                    e.currentTarget.style.borderColor =
                      "rgba(245,244,240,0.14)";
                  }}
                >
                  Book a Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
