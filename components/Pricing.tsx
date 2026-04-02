"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const tiers = [
  {
    id: "starter",
    name: "Starter",
    index: "01",
    tagline: "For teams exploring AI automation.",
    price: { monthly: 1200, annual: 960 },
    unit: "/ month",
    highlight: false,
    cta: "Start free trial",
    ctaSecondary: false,
    features: [
      { label: "AI Agents", value: "Up to 5" },
      { label: "Automation workflows", value: "50 / month" },
      { label: "Data connectors", value: "20 included" },
      { label: "Model inference", value: "1M tokens / mo" },
      { label: "Analytics dashboard", value: "Standard" },
      { label: "Fine-tuning", value: null },
      { label: "Computer vision models", value: null },
      { label: "MLOps pipeline", value: null },
      { label: "Air-gap deployment", value: null },
      { label: "Dedicated SRE", value: null },
      { label: "SLA uptime", value: "99.5%" },
      { label: "Support", value: "Email · 48h" },
    ],
    accentColor: "#8a9e88",
  },
  {
    id: "growth",
    name: "Growth",
    index: "02",
    tagline: "For scaling operations across teams.",
    price: { monthly: 4800, annual: 3840 },
    unit: "/ month",
    highlight: false,
    cta: "Start free trial",
    ctaSecondary: false,
    features: [
      { label: "AI Agents", value: "Up to 25" },
      { label: "Automation workflows", value: "Unlimited" },
      { label: "Data connectors", value: "80 included" },
      { label: "Model inference", value: "10M tokens / mo" },
      { label: "Analytics dashboard", value: "Advanced" },
      { label: "Fine-tuning", value: "3 models" },
      { label: "Computer vision models", value: "2 deployments" },
      { label: "MLOps pipeline", value: null },
      { label: "Air-gap deployment", value: null },
      { label: "Dedicated SRE", value: null },
      { label: "SLA uptime", value: "99.9%" },
      { label: "Support", value: "Slack · 8h" },
    ],
    accentColor: "#c8a97e",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    index: "03",
    tagline: "For organisations running AI at scale.",
    price: { monthly: null, annual: null },
    unit: null,
    highlight: true,
    cta: "Talk to sales",
    ctaSecondary: false,
    features: [
      { label: "AI Agents", value: "Unlimited" },
      { label: "Automation workflows", value: "Unlimited" },
      { label: "Data connectors", value: "All 120+" },
      { label: "Model inference", value: "Unlimited" },
      { label: "Analytics dashboard", value: "Custom" },
      { label: "Fine-tuning", value: "Unlimited" },
      { label: "Computer vision models", value: "Unlimited" },
      { label: "MLOps pipeline", value: "Full lifecycle" },
      { label: "Air-gap deployment", value: "Included" },
      { label: "Dedicated SRE", value: "24/7" },
      { label: "SLA uptime", value: "99.97%" },
      { label: "Support", value: "Dedicated team" },
    ],
    accentColor: "#b49ec8",
  },
  {
    id: "sovereign",
    name: "Sovereign",
    index: "04",
    tagline: "For defence, healthcare & regulated industries.",
    price: { monthly: null, annual: null },
    unit: null,
    highlight: false,
    cta: "Request briefing",
    ctaSecondary: true,
    features: [
      { label: "AI Agents", value: "Unlimited" },
      { label: "Automation workflows", value: "Unlimited" },
      { label: "Data connectors", value: "Custom" },
      { label: "Model inference", value: "On-premise only" },
      { label: "Analytics dashboard", value: "Custom" },
      { label: "Fine-tuning", value: "Unlimited" },
      { label: "Computer vision models", value: "Unlimited" },
      { label: "MLOps pipeline", value: "Full lifecycle" },
      { label: "Air-gap deployment", value: "Native" },
      { label: "Dedicated SRE", value: "Embedded team" },
      { label: "SLA uptime", value: "Custom SLA" },
      { label: "Support", value: "On-site available" },
    ],
    accentColor: "#a8847b",
  },
];

const NAV_HEIGHT = 64;
const FRAME_INSET_V = 20;
const FRAME_INSET_H = 24;

export default function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "annual">("annual");
  const [hovered, setHovered] = useState<string | null>(null);
  // const [mounted, setMounted] = useState(false);

  // useEffect(() => { setMounted(true); }, []);
  // if (!mounted) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        .pricing-root *, .pricing-root *::before, .pricing-root *::after {
          box-sizing: border-box; margin: 0; padding: 0;
        }
        .pricing-root ::-webkit-scrollbar { width: 0; }

        .pricing-frame {
          position: absolute;
          top: ${FRAME_INSET_V}px;
          bottom: ${FRAME_INSET_V}px;
          left: ${FRAME_INSET_H}px;
          right: ${FRAME_INSET_H}px;
          border-radius: 14px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(245,244,240,0.08);
          box-shadow: 0 0 0 1px rgba(0,0,0,0.5), 0 24px 64px rgba(0,0,0,0.5);
          background: rgba(5,5,8,0.98);
        }

        .pricing-header {
          padding: 36px 48px 28px;
          border-bottom: 1px solid rgba(245,244,240,0.06);
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-shrink: 0;
          gap: 20px;
        }

        .pricing-tiers {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          overflow: hidden;
        }

        .pricing-tier {
          display: flex;
          flex-direction: column;
          border-right: 1px solid rgba(245,244,240,0.06);
          overflow-y: auto;
          scrollbar-width: none;
          transition: background 0.3s ease;
          cursor: default;
        }
        .pricing-tier:last-child { border-right: none; }

        .pricing-tier-header {
          padding: 28px 28px 20px;
          border-bottom: 1px solid rgba(245,244,240,0.06);
          flex-shrink: 0;
        }

        .pricing-features {
          flex: 1;
          padding: 20px 28px 28px;
        }

        .pricing-feature-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding: 9px 0;
          border-bottom: 1px solid rgba(245,244,240,0.04);
        }
        .pricing-feature-row:last-child { border-bottom: none; }

        .pricing-toggle {
          display: flex;
          align-items: center;
          gap: 0;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(245,244,240,0.08);
          border-radius: 2px;
          padding: 3px;
          flex-shrink: 0;
        }
        .pricing-toggle-btn {
          padding: 6px 16px;
          border: none;
          background: transparent;
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 1px;
          transition: background 0.2s, color 0.2s;
          white-space: nowrap;
        }

        .pricing-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 10px 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          border-radius: 1px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          border: none;
        }

        @media (max-width: 900px) {
          .pricing-tiers {
            grid-template-columns: 1fr 1fr;
            overflow-y: auto;
          }
          .pricing-tier { border-bottom: 1px solid rgba(245,244,240,0.06); }
          .pricing-header { padding: 20px 20px 16px; flex-direction: column; align-items: flex-start; }
        }
        @media (max-width: 540px) {
          .pricing-tiers { grid-template-columns: 1fr; }
          .pricing-frame { left: 10px; right: 10px; top: 10px; bottom: 10px; border-radius: 10px; }
        }
      `}</style>

      <section
        className="pricing-root"
        id="pricing"
        style={{
          position: "relative",
          width: "100%",
          height: `calc(100dvh - ${NAV_HEIGHT}px)`,
          overflow: "hidden",
          background: "#060608",
        }}
      >
        <div className="pricing-frame">
          {/* ── Header ── */}
          <div className="pricing-header">
            <div>
              <p style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 8.5,
                fontWeight: 500,
                letterSpacing: "0.26em",
                textTransform: "uppercase",
                color: "rgba(245,244,240,0.28)",
                marginBottom: 10,
              }}>
                Pricing
              </p>
              <h2 style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: "clamp(26px, 3vw, 40px)",
                fontWeight: 300,
                fontStyle: "italic",
                lineHeight: 1.1,
                color: "#f5f4f0",
                letterSpacing: "-0.02em",
              }}>
                Transparent pricing.<br />
                <span style={{ color: "rgba(245,244,240,0.35)" }}>No surprises.</span>
              </h2>
            </div>

            {/* Billing toggle */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
              <div className="pricing-toggle">
                {(["monthly", "annual"] as const).map((b) => (
                  <button
                    key={b}
                    className="pricing-toggle-btn"
                    onClick={() => setBilling(b)}
                    style={{
                      background: billing === b ? "#ffffff" : "transparent",
                      color: billing === b ? "#000000" : "rgba(245,244,240,0.4)",
                    }}
                  >
                    {b === "monthly" ? "Monthly" : "Annual"}
                  </button>
                ))}
              </div>
              {billing === "annual" && (
                <motion.span
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 9,
                    color: "#8a9e88",
                    letterSpacing: "0.05em",
                  }}
                >
                  Save 20% with annual billing
                </motion.span>
              )}
            </div>
          </div>

          {/* ── Tier columns ── */}
          <div className="pricing-tiers">
            {tiers.map((tier) => {
              const isHighlighted = tier.highlight;
              const isHovered = hovered === tier.id;
              const price =
                tier.price[billing] !== null
                  ? `$${(tier.price[billing]! / 1000).toFixed(0)}k`
                  : null;

              return (
                <div
                  key={tier.id}
                  className="pricing-tier"
                  onMouseEnter={() => setHovered(tier.id)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    background: isHighlighted
                      ? "rgba(180,158,200,0.05)"
                      : isHovered
                      ? "rgba(245,244,240,0.02)"
                      : "transparent",
                    borderTop: isHighlighted
                      ? `2px solid ${tier.accentColor}`
                      : "2px solid transparent",
                  }}
                >
                  <div className="pricing-tier-header">
                    {/* Tier name row */}
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                      <span style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 8,
                        fontWeight: 500,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        color: "rgba(245,244,240,0.22)",
                      }}>
                        {tier.index}
                      </span>
                      {isHighlighted && (
                        <span style={{
                          padding: "3px 8px",
                          background: `${tier.accentColor}20`,
                          border: `1px solid ${tier.accentColor}40`,
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 7.5,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: tier.accentColor,
                          borderRadius: 1,
                        }}>
                          Most popular
                        </span>
                      )}
                    </div>

                    <h3 style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: 26,
                      fontWeight: 300,
                      color: "#f5f4f0",
                      letterSpacing: "-0.01em",
                      marginBottom: 6,
                    }}>
                      {tier.name}
                    </h3>

                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 10.5,
                      fontWeight: 300,
                      lineHeight: 1.5,
                      color: "rgba(245,244,240,0.35)",
                      marginBottom: 16,
                    }}>
                      {tier.tagline}
                    </p>

                    {/* Price */}
                    <div style={{ marginBottom: 18 }}>
                      {price ? (
                        <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                          <span style={{
                            fontFamily: "'Cormorant Garamond', Georgia, serif",
                            fontSize: 36,
                            fontWeight: 300,
                            lineHeight: 1,
                            color: "#f5f4f0",
                            letterSpacing: "-0.02em",
                          }}>
                            {price}
                          </span>
                          <span style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 9,
                            color: "rgba(245,244,240,0.28)",
                            letterSpacing: "0.06em",
                          }}>
                            {tier.unit}
                          </span>
                        </div>
                      ) : (
                        <span style={{
                          fontFamily: "'Cormorant Garamond', Georgia, serif",
                          fontSize: 28,
                          fontWeight: 300,
                          fontStyle: "italic",
                          color: "rgba(245,244,240,0.5)",
                          letterSpacing: "-0.01em",
                        }}>
                          Custom
                        </span>
                      )}
                    </div>

                    {/* CTA */}
                    <button
                      className="pricing-cta"
                      style={{
                        background: isHighlighted ? "#ffffff" : "transparent",
                        color: isHighlighted ? "#000000" : "rgba(245,244,240,0.55)",
                        border: isHighlighted ? "none" : "1px solid rgba(245,244,240,0.15)",
                      }}
                      onMouseEnter={(e) => {
                        if (!isHighlighted) {
                          e.currentTarget.style.color = "#f5f4f0";
                          e.currentTarget.style.borderColor = "rgba(245,244,240,0.35)";
                        } else {
                          e.currentTarget.style.background = "rgba(255,255,255,0.86)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isHighlighted) {
                          e.currentTarget.style.color = "rgba(245,244,240,0.55)";
                          e.currentTarget.style.borderColor = "rgba(245,244,240,0.15)";
                        } else {
                          e.currentTarget.style.background = "#ffffff";
                        }
                      }}
                    >
                      {tier.cta}
                    </button>
                  </div>

                  {/* Feature rows */}
                  <div className="pricing-features">
                    <p style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 8,
                      fontWeight: 500,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "rgba(245,244,240,0.2)",
                      marginBottom: 10,
                    }}>
                      What's included
                    </p>
                    {tier.features.map((feat) => (
                      <div key={feat.label} className="pricing-feature-row">
                        <span style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 10.5,
                          fontWeight: 300,
                          color: "rgba(245,244,240,0.42)",
                          lineHeight: 1.3,
                        }}>
                          {feat.label}
                        </span>
                        {feat.value ? (
                          <span style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 10,
                            fontWeight: 500,
                            color: "rgba(245,244,240,0.7)",
                            letterSpacing: "0.02em",
                            textAlign: "right",
                            flexShrink: 0,
                            maxWidth: "55%",
                            lineHeight: 1.3,
                          }}>
                            {feat.value}
                          </span>
                        ) : (
                          <span style={{ color: "rgba(245,244,240,0.15)", fontSize: 12 }}>—</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}