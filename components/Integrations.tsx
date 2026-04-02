"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const categories = [
  "All",
  "CRM & Sales",
  "Data & Cloud",
  "ERP & Finance",
  "Communication",
  "DevOps & ML",
  "Healthcare",
];

const integrations = [
  // CRM & Sales
  { name: "Salesforce", abbr: "SF", category: "CRM & Sales", tier: "native" },
  { name: "HubSpot", abbr: "HS", category: "CRM & Sales", tier: "native" },
  { name: "Pipedrive", abbr: "PD", category: "CRM & Sales", tier: "native" },
  { name: "Zoho CRM", abbr: "ZC", category: "CRM & Sales", tier: "standard" },
  { name: "Outreach", abbr: "OR", category: "CRM & Sales", tier: "standard" },
  { name: "Gong", abbr: "GG", category: "CRM & Sales", tier: "standard" },

  // Data & Cloud
  { name: "Snowflake", abbr: "SW", category: "Data & Cloud", tier: "native" },
  { name: "Databricks", abbr: "DB", category: "Data & Cloud", tier: "native" },
  { name: "AWS S3", abbr: "S3", category: "Data & Cloud", tier: "native" },
  { name: "BigQuery", abbr: "BQ", category: "Data & Cloud", tier: "native" },
  { name: "Azure Blob", abbr: "AZ", category: "Data & Cloud", tier: "native" },
  { name: "Postgres", abbr: "PG", category: "Data & Cloud", tier: "native" },
  { name: "MongoDB", abbr: "MG", category: "Data & Cloud", tier: "standard" },
  { name: "Redshift", abbr: "RS", category: "Data & Cloud", tier: "standard" },
  { name: "Pinecone", abbr: "PC", category: "Data & Cloud", tier: "standard" },

  // ERP & Finance
  { name: "SAP", abbr: "SAP", category: "ERP & Finance", tier: "native" },
  { name: "Oracle ERP", abbr: "OE", category: "ERP & Finance", tier: "native" },
  { name: "NetSuite", abbr: "NS", category: "ERP & Finance", tier: "standard" },
  {
    name: "QuickBooks",
    abbr: "QB",
    category: "ERP & Finance",
    tier: "standard",
  },
  { name: "Workday", abbr: "WD", category: "ERP & Finance", tier: "native" },
  { name: "Stripe", abbr: "ST", category: "ERP & Finance", tier: "native" },

  // Communication
  { name: "Slack", abbr: "SL", category: "Communication", tier: "native" },
  { name: "Teams", abbr: "MT", category: "Communication", tier: "native" },
  { name: "Gmail", abbr: "GM", category: "Communication", tier: "native" },
  { name: "Outlook", abbr: "OL", category: "Communication", tier: "native" },
  { name: "Notion", abbr: "NT", category: "Communication", tier: "standard" },
  {
    name: "Confluence",
    abbr: "CF",
    category: "Communication",
    tier: "standard",
  },
  { name: "Zendesk", abbr: "ZD", category: "Communication", tier: "standard" },
  { name: "Intercom", abbr: "IC", category: "Communication", tier: "standard" },

  // DevOps & ML
  { name: "GitHub", abbr: "GH", category: "DevOps & ML", tier: "native" },
  { name: "GitLab", abbr: "GL", category: "DevOps & ML", tier: "native" },
  { name: "Jira", abbr: "JR", category: "DevOps & ML", tier: "native" },
  { name: "Jenkins", abbr: "JK", category: "DevOps & ML", tier: "standard" },
  { name: "Kubernetes", abbr: "K8", category: "DevOps & ML", tier: "standard" },
  { name: "MLflow", abbr: "ML", category: "DevOps & ML", tier: "native" },
  {
    name: "Weights & Biases",
    abbr: "WB",
    category: "DevOps & ML",
    tier: "standard",
  },

  // Healthcare
  { name: "Epic EHR", abbr: "EP", category: "Healthcare", tier: "native" },
  { name: "Cerner", abbr: "CE", category: "Healthcare", tier: "native" },
  { name: "HL7 FHIR", abbr: "HL", category: "Healthcare", tier: "native" },
  { name: "DICOM", abbr: "DC", category: "Healthcare", tier: "native" },
  { name: "Meditech", abbr: "MK", category: "Healthcare", tier: "standard" },
];

const accentMap: Record<string, string> = {
  "CRM & Sales": "#c8a97e",
  "Data & Cloud": "#a8c4b8",
  "ERP & Finance": "#b49ec8",
  Communication: "#9b9eb4",
  "DevOps & ML": "#8a9e88",
  Healthcare: "#a8847b",
};

const NAV_HEIGHT = 64;
const FRAME_INSET_V = 20;
const FRAME_INSET_H = 24;

export default function Integrations() {
  const [activeCategory, setActiveCategory] = useState("All");
  // const [mounted, setMounted] = useState(false);
  // useEffect(() => {
  //   setMounted(true);
  // }, []);
  // if (!mounted) return null;

  const filtered =
    activeCategory === "All"
      ? integrations
      : integrations.filter((i) => i.category === activeCategory);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        .int-root *, .int-root *::before, .int-root *::after {
          box-sizing: border-box; margin: 0; padding: 0;
        }
        .int-root ::-webkit-scrollbar { width: 0; }

        .int-frame {
          position: absolute;
          top: ${FRAME_INSET_V}px;
          bottom: ${FRAME_INSET_V}px;
          left: ${FRAME_INSET_H}px;
          right: ${FRAME_INSET_H}px;
          border-radius: 14px;
          overflow: hidden;
          display: flex;
          border: 1px solid rgba(245,244,240,0.08);
          box-shadow: 0 0 0 1px rgba(0,0,0,0.5), 0 24px 64px rgba(0,0,0,0.45);
          background: rgba(5,5,8,0.98);
        }

        .int-sidebar {
          width: 220px;
          flex-shrink: 0;
          border-right: 1px solid rgba(245,244,240,0.06);
          padding: 40px 0 36px;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          scrollbar-width: none;
        }

        .int-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .int-main-header {
          padding: 40px 44px 24px;
          border-bottom: 1px solid rgba(245,244,240,0.06);
          flex-shrink: 0;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
        }

        .int-grid {
          flex: 1;
          overflow-y: auto;
          scrollbar-width: none;
          padding: 28px 44px 36px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
          gap: 10px;
          align-content: start;
        }

        .int-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 18px 12px;
          border: 1px solid rgba(245,244,240,0.06);
          background: rgba(245,244,240,0.02);
          cursor: default;
          transition: background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
          border-radius: 2px;
        }
        .int-card:hover {
          background: rgba(245,244,240,0.05);
          border-color: rgba(245,244,240,0.12);
          transform: translateY(-2px);
        }

        .int-cat-btn {
          width: 100%;
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 11px 28px;
          background: transparent;
          border: none;
          border-left: 2px solid transparent;
          cursor: pointer;
          text-align: left;
          transition: all 0.2s ease;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 400;
          letter-spacing: 0.02em;
          color: rgba(245,244,240,0.38);
        }
        .int-cat-btn:hover { color: rgba(245,244,240,0.7); background: rgba(245,244,240,0.02); }
        .int-cat-btn.active {
          color: #f5f4f0;
          font-weight: 500;
          background: rgba(245,244,240,0.03);
        }

        @media (max-width: 860px) {
          .int-sidebar { display: none; }
          .int-main-header { padding: 20px 20px 16px; flex-direction: column; align-items: flex-start; }
          .int-grid { padding: 16px 20px 24px; grid-template-columns: repeat(auto-fill, minmax(90px, 1fr)); }
        }
        @media (max-width: 480px) {
          .int-frame { left: 10px; right: 10px; top: 10px; bottom: 10px; border-radius: 10px; }
          .int-grid { grid-template-columns: repeat(3, 1fr); gap: 8px; }
        }
      `}</style>

      <section
        className="int-root"
        id="integrations"
        style={{
          position: "relative",
          width: "100%",
          height: `calc(100dvh - ${NAV_HEIGHT}px)`,
          overflow: "hidden",
          background: "#060608",
        }}
      >
        <div className="int-frame">
          {/* ── Sidebar ── */}
          <div className="int-sidebar">
            <div style={{ padding: "0 28px 24px" }}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 8.5,
                  fontWeight: 500,
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "rgba(245,244,240,0.22)",
                  marginBottom: 14,
                }}
              >
                Filter by
              </p>
            </div>

            <div style={{ flex: 1 }}>
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                const accent = accentMap[cat];
                return (
                  <button
                    key={cat}
                    className={`int-cat-btn${isActive ? " active" : ""}`}
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      borderLeftColor:
                        isActive && accent ? accent : "transparent",
                      color: isActive ? "#f5f4f0" : "rgba(245,244,240,0.38)",
                    }}
                  >
                    {accent && (
                      <span
                        style={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: isActive
                            ? accent
                            : "rgba(245,244,240,0.15)",
                          flexShrink: 0,
                          transition: "background 0.2s",
                        }}
                      />
                    )}
                    {cat}
                    <span
                      style={{
                        marginLeft: "auto",
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 9,
                        color: isActive
                          ? "rgba(245,244,240,0.4)"
                          : "rgba(245,244,240,0.16)",
                      }}
                    >
                      {cat === "All"
                        ? integrations.length
                        : integrations.filter((i) => i.category === cat).length}
                    </span>
                  </button>
                );
              })}
            </div>

            <div
              style={{
                padding: "20px 28px 0",
                borderTop: "1px solid rgba(245,244,240,0.06)",
              }}
            >
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 9.5,
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: "rgba(245,244,240,0.28)",
                }}
              >
                Don&apos;t see yours?
                <br />
                <a
                  href="#contact"
                  style={{
                    color: "rgba(245,244,240,0.55)",
                    textDecoration: "none",
                  }}
                >
                  Request an integration →
                </a>
              </p>
            </div>
          </div>

          {/* ── Main ── */}
          <div className="int-main">
            <div className="int-main-header">
              <div>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 8.5,
                    fontWeight: 500,
                    letterSpacing: "0.26em",
                    textTransform: "uppercase",
                    color: "rgba(245,244,240,0.25)",
                    marginBottom: 10,
                  }}
                >
                  Integrations
                </p>
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "clamp(24px, 2.8vw, 38px)",
                    fontWeight: 300,
                    fontStyle: "italic",
                    lineHeight: 1.15,
                    color: "#f5f4f0",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Connect once.
                  <br />
                  <span style={{ color: "rgba(245,244,240,0.35)" }}>
                    Maintain nothing.
                  </span>
                </h2>
              </div>

              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 44,
                    fontWeight: 300,
                    lineHeight: 1,
                    color: "#f5f4f0",
                    display: "block",
                    letterSpacing: "-0.02em",
                  }}
                >
                  120+
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 8.5,
                    fontWeight: 500,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    color: "rgba(245,244,240,0.25)",
                  }}
                >
                  Native connectors
                </span>
              </div>
            </div>

            {/* Integration grid */}
            <div className="int-grid">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    display: "contents",
                  }}
                >
                  {filtered.map((item, i) => {
                    const accent = accentMap[item.category];
                    return (
                      <motion.div
                        key={item.name}
                        className="int-card"
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                          duration: 0.3,
                          delay: i * 0.018,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        {/* Logo abbr circle */}
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            background: `${accent}15`,
                            border: `1px solid ${accent}30`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 9,
                            fontWeight: 600,
                            letterSpacing: "0.04em",
                            color: accent,
                          }}
                        >
                          {item.abbr}
                        </div>
                        <span
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 9.5,
                            fontWeight: 400,
                            color: "rgba(245,244,240,0.55)",
                            textAlign: "center",
                            lineHeight: 1.3,
                          }}
                        >
                          {item.name}
                        </span>
                        {item.tier === "native" && (
                          <span
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: 7,
                              fontWeight: 500,
                              letterSpacing: "0.1em",
                              textTransform: "uppercase",
                              color: accent,
                              opacity: 0.7,
                            }}
                          >
                            Native
                          </span>
                        )}
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
