"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const BG_IMAGE = "/image/white1.jpg";

const steps = [
  {
    index: "01",
    navTitle: "Connect Data",
    overtitle: "Ingest & unify",
    subtitle: "All your data.\nOne intelligent layer.",
    description:
      "Most AI projects fail before they begin — on messy, siloed data.\n\nGvins AI connects to your CRM, ERP, databases, cloud storage, document repositories, and communication tools through 120+ native connectors. No custom ETL pipelines. No data engineering sprints.\n\nSetup takes minutes. The foundation lasts for years.",
    stats: [
      { value: "120+", label: "Connectors" },
      { value: "< 5 min", label: "Setup time" },
      { value: "Zero", label: "ETL required" },
    ],
    accentColor: "#3b82f6",
  },
  {
    index: "02",
    navTitle: "Define Your AI",
    overtitle: "Configure & train",
    subtitle: "Tell it what to do.\nIn plain English.",
    description:
      "Enterprise AI shouldn't require a PhD to configure.\n\nAutomation Studio gives your teams a visual canvas to define goals, set guardrails, chain multi-step logic, and wire to any downstream system — without writing code. For teams that want fine-grained control, we support custom model fine-tuning.\n\nThe result: AI that understands your industry's vocabulary.",
    stats: [
      { value: "0", label: "Code required" },
      { value: "40+", label: "Base models" },
      { value: "1-click", label: "Fine-tune" },
    ],
    accentColor: "#3b82f6",
  },
  {
    index: "03",
    navTitle: "Deploy Agents",
    overtitle: "Execute & automate",
    subtitle: "Autonomous action.\nAcross every workflow.",
    description:
      "Once configured, agents operate 24/7 — reasoning, deciding, and acting across your entire stack without waiting for instructions.\n\nSupport triage. Contract review. Procurement negotiation. Quality inspection. Demand forecasting. Fraud detection.\n\nBuilt for environments where uptime is contractual and errors are measured in dollars.",
    stats: [
      { value: "99.97%", label: "Uptime SLA" },
      { value: "< 80ms", label: "Latency P99" },
      { value: "500+", label: "Actions/min" },
    ],
    accentColor: "#3b82f6",
  },
  {
    index: "04",
    navTitle: "Monitor & Learn",
    overtitle: "Observe & improve",
    subtitle: "Visibility into\nevery AI decision.",
    description:
      "Shipping a model is the easy part. Keeping it accurate over time is where most platforms fail.\n\nThe Analytics Engine monitors every agent action and model inference in real time — surfacing confidence scores, anomaly flags, drift alerts, and performance trends.\n\nEvery decision comes with a full reasoning trace for audit and compliance.",
    stats: [
      { value: "10B+", label: "Events/day" },
      { value: "3ms", label: "Query latency" },
      { value: "100%", label: "Audit coverage" },
    ],
    accentColor: "#3b82f6",
  },
  {
    index: "05",
    navTitle: "Scale Securely",
    overtitle: "Govern & expand",
    subtitle: "From pilot to\nenterprise. Safely.",
    description:
      "Clone agents across teams, regions, and business units without re-architecture. Gvins AI scales horizontally from 10 automations to 10,000.\n\nEvery deployment is architected for security from day one — granular RBAC, end-to-end encryption, immutable audit trails, and policy-as-code guardrails across every agent.\n\nSOC 2 Type II, ISO 27001, HIPAA-compliant, and GDPR-ready.",
    stats: [
      { value: "SOC 2", label: "Type II" },
      { value: "ISO 27001", label: "Certified" },
      { value: "HIPAA", label: "Compliant" },
    ],
    accentColor: "#3b82f6",
  },
];

// ─── SCOPE METER ─────────────────────────────────────────────────────────────
// Each step aligns exactly to a major tick at: 0, 25, 50, 75, 100
// Ticks: major every 25, minor every 5, micro every 1
function ScopeMeter({
  activeIndex,
  onStepClick,
}: {
  activeIndex: number;
  onStepClick: (i: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [rulerWidth, setRulerWidth] = useState(0);

  useEffect(() => {
    const update = () => {
      if (containerRef.current) setRulerWidth(containerRef.current.clientWidth);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Step positions: 0, 25, 50, 75, 100 on the ruler
  const stepPositions = [0, 25, 50, 75, 100]; // percentages
  const cursorPct = stepPositions[activeIndex];
  const cursorPx = rulerWidth > 0 ? (cursorPct / 100) * rulerWidth : 0;

  // Generate 101 ticks (0..100)
  const ticks = Array.from({ length: 101 }, (_, i) => {
    const isMajor = i % 25 === 0; // 0, 25, 50, 75, 100
    const isMinor = i % 5 === 0 && !isMajor; // 5,10,15,20... but not major
    const isMicro = !isMajor && !isMinor;
    const isActive = i <= cursorPct;
    return { val: i, isMajor, isMinor, isMicro, isActive };
  });

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 30,
        padding:
          "0 clamp(16px, 4vw, 48px) max(18px, env(safe-area-inset-bottom, 18px))",
      }}
    >
      {/* Step labels — pinned exactly above their major tick */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: 36,
          marginBottom: 6,
        }}
      >
        {steps.map((step, i) => {
          const pct = stepPositions[i];
          const isActive = i === activeIndex;
          return (
            <button
              key={i}
              onClick={() => onStepClick(i)}
              style={{
                position: "absolute",
                left: `${pct}%`,
                transform: "translateX(-50%)",
                bottom: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 5,
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: 0,
              }}
            >
              {/* Step index bubble */}
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 7.5,
                  fontWeight: 500,
                  letterSpacing: "0.18em",
                  textTransform: "uppercase" as const,
                  color: isActive ? "#fff" : "rgba(255,255,255,0.38)",
                  whiteSpace: "nowrap",
                  transition: "color 0.3s ease",
                  display: "block",
                }}
              >
                {step.navTitle}
              </span>
              {/* Connector dot to tick */}
              <span
                style={{
                  width: isActive ? 7 : 5,
                  height: isActive ? 7 : 5,
                  borderRadius: "50%",
                  background: isActive ? "#3b82f6" : "rgba(255,255,255,0.22)",
                  boxShadow: isActive ? "0 0 10px #3b82f680" : "none",
                  transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
                  display: "block",
                  flexShrink: 0,
                }}
              />
            </button>
          );
        })}
      </div>

      {/* Ruler */}
      <div
        ref={containerRef}
        style={{
          position: "relative",
          width: "100%",
          height: 32,
          display: "flex",
          alignItems: "flex-start",
          borderBottom: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {/* Animated crosshair line */}
        {rulerWidth > 0 && (
          <motion.div
            animate={{ left: cursorPx }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              top: 0,
              bottom: -1,
              width: 1,
              background:
                "linear-gradient(to bottom, rgba(59,130,246,0.9), rgba(59,130,246,0.3))",
              zIndex: 4,
              pointerEvents: "none",
            }}
          />
        )}

        {/* Cursor dot on bottom rail */}
        {rulerWidth > 0 && (
          <motion.div
            animate={{ left: cursorPx - 5 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "absolute",
              bottom: -5,
              width: 10,
              height: 10,
              borderRadius: "50%",
              background: "#3b82f6",
              border: "1.5px solid rgba(0,0,0,0.6)",
              boxShadow: "0 0 12px #3b82f6aa",
              zIndex: 5,
              pointerEvents: "none",
            }}
          />
        )}

        {/* Ticks — laid out as flex items */}
        {ticks.map(({ val, isMajor, isMinor, isMicro, isActive }) => {
          const h = isMajor ? 24 : isMinor ? 14 : 7;
          return (
            <div
              key={val}
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                height: "100%",
                justifyContent: "flex-start",
              }}
            >
              <div
                style={{
                  width: isMajor ? 1.5 : 1,
                  height: h,
                  flexShrink: 0,
                  background: isActive
                    ? isMajor
                      ? "rgba(59,130,246,0.95)"
                      : "rgba(59,130,246,0.55)"
                    : isMajor
                      ? "rgba(255,255,255,0.35)"
                      : "rgba(255,255,255,0.15)",
                  transition: "background 0.35s ease",
                }}
              />
              {isMajor && (
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 7,
                    fontWeight: 500,
                    color: isActive
                      ? "rgba(59,130,246,0.9)"
                      : "rgba(255,255,255,0.25)",
                    marginTop: 3,
                    lineHeight: 1,
                    transition: "color 0.3s",
                    letterSpacing: "0.05em",
                  }}
                >
                  {val}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
// ─── ECG SHIMMER LINE ────────────────────────────────────────────────────────
function EcgLine({
  side,
  className,
}: {
  side: "left" | "right";
  className?: string;
}) {
  return (
    <div
      className={className}
      style={{
        position: "absolute",
        top: "50%",
        ...(side === "left"
          ? { left: "clamp(16px, 4vw, 48px)", right: "calc(50% + 20px)" }
          : { left: "calc(50% + 20px)", right: "clamp(16px, 4vw, 48px)" }),
        transform: "translateY(-50%)",
        height: 60,
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 1,
        opacity: 0.45,
      }}
    >
      <svg
        viewBox="0 0 400 60"
        preserveAspectRatio="none"
        style={{ width: "100%", height: "100%" }}
      >
        <defs>
          <linearGradient
            id={`ecg-grad-${side}`}
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0" />
            <stop offset="30%" stopColor="#3b82f6" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#3b82f6" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </linearGradient>
          <filter id={`ecg-glow-${side}`}>
            <feGaussianBlur stdDeviation="1.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Baseline */}
        <line
          x1="0"
          y1="30"
          x2="400"
          y2="30"
          stroke={`url(#ecg-grad-${side})`}
          strokeWidth="0.8"
          strokeDasharray="4 3"
          opacity="0.35"
        />
        {/* ECG pulse path */}
        <path
          d="M0,30 L60,30 L75,30 L82,14 L88,46 L94,8 L100,52 L106,30 L116,30 L180,30 L195,30 L202,14 L208,46 L214,8 L220,52 L226,30 L236,30 L300,30 L315,30 L322,14 L328,46 L334,8 L340,52 L346,30 L356,30 L400,30"
          fill="none"
          stroke={`url(#ecg-grad-${side})`}
          strokeWidth="1.5"
          filter={`url(#ecg-glow-${side})`}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Shimmer sweep overlay */}
        <rect width="400" height="60" fill="url(#ecg-grad-${side})" opacity="0">
          <animate
            attributeName="opacity"
            values="0;0.15;0"
            dur="2.4s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>
      {/* Animated dot running along baseline */}
      <div
        style={{
          position: "absolute",
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#3b82f6",
          boxShadow: "0 0 10px #3b82f6",
          animation: "ecgDot 2.4s linear infinite",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      />
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function HowItWorks() {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleStepClick = (index: number) => {
    if (!scrollRef.current) return;
    const snapElements = scrollRef.current.children;
    if (snapElements[index]) {
      setIsScrolling(true);
      snapElements[index].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      setTimeout(() => setIsScrolling(false), 800);
    }
    setActiveIndex(index);
  };

  useEffect(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;
    const handleScroll = () => {
      if (isScrolling) return;
      const snapElements = Array.from(scrollEl.children);
      const scrollTop = scrollEl.scrollTop;
      const viewportHeight = scrollEl.clientHeight;
      let closestIndex = 0;
      let minDistance = Infinity;
      snapElements.forEach((_, idx) => {
        const distance = Math.abs(scrollTop - idx * viewportHeight);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = idx;
        }
      });
      if (closestIndex !== activeIndex) setActiveIndex(closestIndex);
    };
    scrollEl.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => scrollEl.removeEventListener("scroll", handleScroll);
  }, [activeIndex, isScrolling]);

  return (
    <section
      style={{
        position: "relative",
        height: "calc(100vh - 64px)",
        width: "100%",
        overflow: "hidden",
        background: "#060608",
        marginTop: "64px",
      }}
    >
      {/* ── BACKGROUND ── */}
      <div style={{ position: "absolute", inset: 0 }}>
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${BG_IMAGE})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            // ✅ Reduced brightness significantly for dark bg feel
            opacity: 0.95,
            filter: "brightness(0.75)",
            background:
              "linear-gradient(to bottom, rgba(255, 255, 255, 0.97)40, 0.55), rgba(4,4,8,0.35), rgba(4,4,8,0.62))",
          }}
        />
        {/* Heavy dark overlay so text is always legible */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(to bottom, rgba(4,4,8,0.72), rgba(4,4,8,0.52), rgba(4,4,8,0.78))",
          }}
        />
        {/* Grain */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.12,
            mixBlendMode: "overlay",
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundRepeat: "repeat",
            backgroundSize: "200px",
          }}
        />
      </div>

      {/* ── HOW IT WORKS HEADER — dark bg version ── */}
      <div
        style={{
          position: "absolute",
          top: 28,
          left: 48,
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          gap: 14,
        }}
      >
        {/* Vertical accent bar */}
        <div
          style={{
            width: 2,
            height: 28,
            background: "linear-gradient(to bottom, #3b82f6, transparent)",
            borderRadius: 1,
          }}
        />
        <div>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 8.5,
              fontWeight: 500,
              letterSpacing: "0.32em",
              textTransform: "uppercase" as const,
              // ✅ No shimmer — plain readable white on dark bg
              color: "rgba(255,255,255,0.55)",
              display: "block",
              marginBottom: 3,
            }}
          >
            How It Works
          </span>
          <span
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 22,
              fontWeight: 300,
              fontStyle: "italic",
              color: "#f5f4f0",
              letterSpacing: "-0.01em",
              display: "block",
              lineHeight: 1,
            }}
          >
            Five steps to intelligence.
          </span>
        </div>
      </div>

      {/* Step counter — top right */}
      <div
        style={{
          position: "absolute",
          top: 28,
          right: 48,
          zIndex: 20,
          display: "flex",
          alignItems: "baseline",
          gap: 4,
        }}
      >
        <span
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 32,
            fontWeight: 300,
            color: "#3b82f6",
            lineHeight: 1,
          }}
        >
          {String(activeIndex + 1).padStart(2, "0")}
        </span>
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 10,
            color: "rgba(255,255,255,0.2)",
            letterSpacing: "0.1em",
          }}
        >
          / 05
        </span>
      </div>

      {/* ── SCROLL CONTAINER ── */}
      <div
        ref={scrollRef}
        style={{
          position: "relative",
          zIndex: 10,
          height: "100%",
          overflowY: "scroll",
          scrollSnapType: "y mandatory",
          scrollBehavior: "smooth",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {steps.map((step, i) => {
          const isEven = i % 2 === 0;

          return (
            <div
              key={i}
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                // ✅ Padding bottom accounts for scope meter height (~90px)
                padding:
                  "clamp(110px, 18vw, 90px) clamp(16px, 4vw, 48px) clamp(130px, 18vw, 110px)",
                scrollSnapAlign: "start",
                position: "relative",
              }}
            >
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  duration: 0.55,
                  delay: 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{
                  maxWidth: 500,
                  width: "100%",
                  marginLeft: isEven ? "auto" : 0,
                  marginRight: isEven ? 0 : "auto",
                }}
              >
                <div
                  style={{
                    position: "relative",
                    background: "rgba(8, 8, 14, 0.82)",
                    backdropFilter: "blur(28px)",
                    WebkitBackdropFilter: "blur(28px)",
                    borderRadius: "16px",
                    border: "1px solid rgba(245,244,240,0.07)",
                    overflow: "hidden",
                    boxShadow:
                      "0 24px 56px -12px rgba(0,0,0,0.55), 0 2px 0 rgba(59,130,246,0.12) inset",
                  }}
                >
                  {/* Top accent bar */}
                  <div
                    style={{
                      height: "1px",
                      width: "100%",
                      background:
                        "linear-gradient(90deg, #3b82f6aa, #3b82f620, transparent)",
                    }}
                  />

                  <div style={{ padding: "28px 30px 26px" }}>
                    {/* Header */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 12,
                        marginBottom: 16,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                          fontSize: 34,
                          fontWeight: 300,
                          fontStyle: "italic",
                          // ✅ Removed gradient shimmer — plain blue
                          color: "#3b82f6",
                          lineHeight: 1,
                        }}
                      >
                        {step.index}
                      </span>
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 7.5,
                          fontWeight: 500,
                          letterSpacing: "0.22em",
                          textTransform: "uppercase" as const,
                          color: "rgba(245,244,240,0.35)",
                          borderLeft: "1px solid rgba(245,244,240,0.15)",
                          paddingLeft: 12,
                        }}
                      >
                        {step.navTitle}
                      </span>
                    </div>

                    {/* Overtitle */}
                    <div style={{ marginBottom: 10 }}>
                      <span
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 8.5,
                          fontWeight: 500,
                          letterSpacing: "0.24em",
                          textTransform: "uppercase" as const,
                          // ✅ Solid blue, no shimmer
                          color: "#3b82f6",
                          opacity: 0.85,
                        }}
                      >
                        {step.overtitle}
                      </span>
                      <div
                        style={{
                          height: 1,
                          width: "100%",
                          background:
                            "linear-gradient(90deg, #3b82f640, transparent)",
                          marginTop: 5,
                        }}
                      />
                    </div>

                    {/* Subtitle */}
                    <h2
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: "clamp(22px, 3.6vw, 34px)",
                        fontWeight: 300,
                        fontStyle: "italic",
                        lineHeight: 1.15,
                        color: "#f5f4f0",
                        letterSpacing: "-0.01em",
                        whiteSpace: "pre-line",
                        marginBottom: 18,
                      }}
                    >
                      {step.subtitle}
                    </h2>

                    {/* Description */}
                    <div
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 12,
                        fontWeight: 300,
                        lineHeight: 1.75,
                        color: "rgba(245,244,240,0.55)",
                        marginBottom: 22,
                      }}
                    >
                      {step.description.split("\n\n").map((para, pi) => (
                        <p key={pi} style={{ marginBottom: pi < 2 ? 10 : 0 }}>
                          {para}
                        </p>
                      ))}
                    </div>

                    {/* Stats */}
                    <div
                      style={{
                        display: "flex",
                        gap: 28,
                        paddingTop: 16,
                        borderTop: "1px solid rgba(245,244,240,0.06)",
                      }}
                    >
                      {step.stats.map((stat, idx) => (
                        <div key={idx}>
                          <div
                            style={{
                              fontFamily:
                                "'Cormorant Garamond', Georgia, serif",
                              fontSize: 20,
                              fontWeight: 300,
                              lineHeight: 1,
                              // ✅ Plain color, no gradient shimmer
                              color: "#f5f4f0",
                              letterSpacing: "-0.01em",
                              marginBottom: 4,
                            }}
                          >
                            {stat.value}
                          </div>
                          <div
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: 7.5,
                              fontWeight: 500,
                              letterSpacing: "0.18em",
                              textTransform: "uppercase" as const,
                              color: "rgba(245,244,240,0.28)",
                            }}
                          >
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
              {/* ECG shimmer on the empty side */}
              <EcgLine
                side={isEven ? "left" : "right"}
                className="ecg-hide-mobile"
              />{" "}
            </div>
          );
        })}
      </div>

      {/* ── SCOPE METER ── */}
      <ScopeMeter activeIndex={activeIndex} onStepClick={handleStepClick} />

      <style jsx>{`
        div::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 600px) {
          .ecg-hide-mobile {
            display: none !important;
          }
        }
        @keyframes ecgDot {
          0% {
            left: -4px;
          }
          100% {
            left: calc(100% + 4px);
          }
        }
      `}</style>
    </section>
  );
}
