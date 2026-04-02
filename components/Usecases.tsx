"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

// ─── DATA ─────────────────────────────────────────────────────────────────────
const industries = [
  {
    id: "finance",
    index: "01",
    sector: "Finance & FinTech",
    overtitle: "Risk, compliance & revenue",
    headline: "AI that moves\nat market speed.",
    summary:
      "Financial institutions face a paradox: the fastest decisions carry the highest risk. Gvins AI resolves it.",
    useCases: [
      {
        title: "Real-Time Fraud Detection",
        body: "Our ensemble models analyse transaction patterns, device fingerprints, behavioural biometrics, and network graphs simultaneously — flagging anomalies in under 12ms. False positive rates drop by 60% compared to rule-based systems, protecting revenue without blocking legitimate customers.",
        metric: "12ms",
        metricLabel: "Detection latency",
      },
      {
        title: "Automated Credit Underwriting",
        body: "Replace 5-day manual review cycles with AI underwriting that evaluates thousands of signals — cash flow patterns, alternative data, macroeconomic context — and delivers a credit decision in seconds. Full explainability outputs satisfy Basel III audit requirements.",
        metric: "94%",
        metricLabel: "Approval accuracy",
      },
      {
        title: "Regulatory Compliance Monitoring",
        body: "Continuously monitor transactions, communications, and disclosures against evolving AML, KYC, GDPR, and MiFID II requirements. Our NLP engine flags violations before they become breaches — with immutable audit trails that satisfy FCA, SEC, and RBI examiners.",
        metric: "99.8%",
        metricLabel: "Compliance coverage",
      },
      {
        title: "Algorithmic Trade Surveillance",
        body: "Detect market manipulation, front-running, and spoofing across millions of order events per second. Pattern recognition models trained on historical enforcement actions identify suspicious activity with precision regulators accept.",
        metric: "2M+",
        metricLabel: "Orders / second",
      },
    ],
    accentColor: "#c8a97e",
    clients: [
      "Investment banks",
      "Neobanks",
      "Insurance carriers",
      "Asset managers",
    ],
  },
  {
    id: "healthcare",
    index: "02",
    sector: "Healthcare & Life Sciences",
    overtitle: "Clinical intelligence at scale",
    headline: "AI that earns\nthe trust of doctors.",
    summary:
      "Healthcare AI must be explainable, auditable, and provably safe. We build for that standard — not around it.",
    useCases: [
      {
        title: "Medical Imaging & Diagnostics",
        body: "Computer vision models trained on multi-million image datasets detect pathologies in radiology, pathology, and dermatology scans with sensitivity and specificity exceeding radiologist consensus. Outputs include structured findings, differential diagnoses, and confidence-graded annotations — integrated directly into PACS and EMR workflows.",
        metric: "97.3%",
        metricLabel: "Diagnostic sensitivity",
      },
      {
        title: "Clinical Trial Acceleration",
        body: "AI-powered patient matching reduces trial recruitment timelines by 40%. NLP extracts eligibility signals from unstructured EHR notes, identifies protocol deviations in real time, and automates adverse event reporting — compressing the path from Phase I to regulatory submission.",
        metric: "40%",
        metricLabel: "Faster recruitment",
      },
      {
        title: "Drug Discovery & Target Identification",
        body: "Generative chemistry models propose novel molecular structures optimised for target binding, ADMET properties, and synthesisability. Knowledge graph traversal across 50M+ research papers surfaces mechanism-of-action hypotheses that literature reviews would take years to find.",
        metric: "50M+",
        metricLabel: "Papers analysed",
      },
      {
        title: "Predictive Patient Deterioration",
        body: "Continuous monitoring models analyse vital signs, lab trends, medication history, and nursing notes to predict sepsis, acute kidney injury, and respiratory failure hours before clinical manifestation — giving care teams time to intervene.",
        metric: "6 hrs",
        metricLabel: "Early warning window",
      },
    ],
    accentColor: "#a8c4b8",
    clients: [
      "Hospital systems",
      "Pharma companies",
      "CROs",
      "Digital health platforms",
    ],
  },
  {
    id: "manufacturing",
    index: "03",
    sector: "Manufacturing & Industry 4.0",
    overtitle: "Operational intelligence",
    headline: "Zero defects.\nMaximum throughput.",
    summary:
      "Modern factories generate terabytes of sensor data daily. Most of it is never acted on. Gvins AI changes that.",
    useCases: [
      {
        title: "Visual Quality Inspection",
        body: "Deploy edge-inference computer vision models that inspect every unit at line speed — detecting surface defects, dimensional deviations, assembly errors, and contamination with sub-millimetre precision. Human inspectors shift from routine checking to exception handling, increasing throughput by 35%.",
        metric: "35%",
        metricLabel: "Throughput gain",
      },
      {
        title: "Predictive Maintenance",
        body: "Vibration analysis, thermal imaging, and acoustic emission data feed anomaly detection models that identify bearing wear, lubrication failure, and misalignment weeks before breakdown. Unplanned downtime drops by 70% in the first year of deployment.",
        metric: "70%",
        metricLabel: "Downtime reduction",
      },
      {
        title: "Supply Chain Demand Forecasting",
        body: "Ensemble forecasting models integrate historical demand, macroeconomic indicators, supplier lead times, and external signals (weather, geopolitical events) to generate probabilistic demand forecasts. Safety stock optimisation reduces working capital requirements by 22%.",
        metric: "22%",
        metricLabel: "Working capital saved",
      },
      {
        title: "Energy Consumption Optimisation",
        body: "Reinforcement learning agents continuously tune HVAC, compressed air, and production line parameters to minimise energy consumption while maintaining output quality. Factories achieve 15–28% energy cost reductions without capital equipment upgrades.",
        metric: "28%",
        metricLabel: "Energy cost reduction",
      },
    ],
    accentColor: "#b4a87e",
    clients: [
      "Automotive OEMs",
      "Electronics manufacturers",
      "FMCG companies",
      "Chemical plants",
    ],
  },
  {
    id: "retail",
    index: "04",
    sector: "Retail & E-Commerce",
    overtitle: "Customer intelligence",
    headline: "Every customer.\nPersonalised at scale.",
    summary:
      "The gap between what customers want and what retailers offer costs $1T a year. AI closes it.",
    useCases: [
      {
        title: "Hyper-Personalisation Engine",
        body: "Real-time recommendation models factor in browsing context, purchase history, inventory availability, margin targets, and live demand signals to surface the right product to the right customer at the right moment. Conversion rates increase by 18–32% on personalised surfaces vs. static merchandising.",
        metric: "32%",
        metricLabel: "Conversion lift",
      },
      {
        title: "Dynamic Pricing Optimisation",
        body: "Reinforcement learning models continuously balance revenue maximisation, competitive positioning, and customer lifetime value — adjusting prices across millions of SKUs in real time without triggering customer backlash. Average order value increases 12% in 90 days.",
        metric: "12%",
        metricLabel: "AOV increase",
      },
      {
        title: "Intelligent Inventory Management",
        body: "Demand sensing models consume point-of-sale data, social signals, weather, and promotional calendars to generate SKU-level replenishment recommendations. Out-of-stock events drop 45%. Overstock markdowns reduce by 30%.",
        metric: "45%",
        metricLabel: "OOS reduction",
      },
      {
        title: "Returns Fraud Prevention",
        body: "Behavioural analytics identify return abuse patterns — wardrobing, receipt fraud, cross-channel manipulation — across the customer lifecycle. Legitimate return processing remains seamless while fraudulent claims are flagged for review, reducing return fraud losses by 55%.",
        metric: "55%",
        metricLabel: "Fraud loss reduction",
      },
    ],
    accentColor: "#c8b4a0",
    clients: [
      "D2C brands",
      "Marketplace operators",
      "Grocery chains",
      "Luxury retailers",
    ],
  },
  {
    id: "enterprise",
    index: "05",
    sector: "Enterprise & Professional Services",
    overtitle: "Knowledge & process automation",
    headline: "Your best analyst.\nWorking every hour.",
    summary:
      "Knowledge work is the last frontier of automation. The organisations that crack it will define the next decade.",
    useCases: [
      {
        title: "Contract Intelligence",
        body: "NLP models extract obligations, risks, deadlines, and non-standard clauses from thousands of contracts in minutes. Deviation from standard playbooks is flagged automatically. Legal teams shift from document review to strategic advisory — handling 4× the contract volume with the same headcount.",
        metric: "4×",
        metricLabel: "Contract throughput",
      },
      {
        title: "Enterprise Knowledge Assistant",
        body: "RAG-powered assistants trained on your internal documentation, policies, code repositories, and historical decisions give employees instant, accurate answers — with source citations. Onboarding time drops 60%. Support ticket volume falls 40%.",
        metric: "60%",
        metricLabel: "Onboarding time saved",
      },
      {
        title: "Intelligent RFP & Proposal Generation",
        body: "AI agents analyse incoming RFPs, match requirements against past wins and capability databases, draft compliant responses, and flag gaps for human review — compressing proposal cycles from 3 weeks to 3 days without sacrificing win rates.",
        metric: "3 days",
        metricLabel: "Proposal turnaround",
      },
      {
        title: "HR & Talent Intelligence",
        body: "Predictive models identify flight risk, high-potential employees, and skill gaps before they become attrition events or hiring emergencies. Compensation benchmarking models keep offers competitive without market data subscriptions. Recruiting automation reduces time-to-offer by 50%.",
        metric: "50%",
        metricLabel: "Hiring cycle reduction",
      },
    ],
    accentColor: "#9b9eb4",
    clients: [
      "Big 4 consultancies",
      "Law firms",
      "SaaS companies",
      "Conglomerates",
    ],
  },
  {
    id: "government",
    index: "06",
    sector: "Government & Public Sector",
    overtitle: "Mission-critical AI",
    headline: "AI that serves\nthe public interest.",
    summary:
      "Government AI must be explainable, fair, and accountable. We architect for those constraints as a foundation — not a constraint.",
    useCases: [
      {
        title: "Benefits & Services Automation",
        body: "Intelligent document processing and eligibility determination models automate the intake, verification, and processing of benefits applications — reducing processing time from weeks to hours while maintaining the oversight controls public agencies require. Citizen satisfaction scores improve 38%.",
        metric: "38%",
        metricLabel: "Satisfaction increase",
      },
      {
        title: "Infrastructure Predictive Maintenance",
        body: "Sensor fusion models across road networks, bridges, utilities, and public transit predict structural failures and maintenance needs before they become safety events. Budget allocation shifts from reactive repair (expensive) to planned maintenance (efficient) — saving 25% on infrastructure spend.",
        metric: "25%",
        metricLabel: "Infrastructure savings",
      },
      {
        title: "Tax Compliance & Audit Intelligence",
        body: "Anomaly detection models identify non-compliance patterns across tax filings, identifying high-risk returns for audit selection with 8× the precision of traditional random sampling. Audit yield increases without increasing the number of citizens subjected to unnecessary reviews.",
        metric: "8×",
        metricLabel: "Audit precision",
      },
      {
        title: "Public Safety & Emergency Response",
        body: "Predictive policing models (bias-audited, subject to independent oversight) and emergency demand forecasting optimise resource deployment across police, fire, and EMS services. Response times improve 18% with no budget increase. Deployed in air-gapped environments with full data sovereignty.",
        metric: "18%",
        metricLabel: "Faster response times",
      },
    ],
    accentColor: "#8a9e8a",
    clients: [
      "Central government",
      "Municipal agencies",
      "Defence contractors",
      "Public utilities",
    ],
  },
];

const NAV_HEIGHT = 64;
const FRAME_INSET_V = 20;
const FRAME_INSET_H = 24;

// ─── USE CASE CARD ────────────────────────────────────────────────────────────
function UseCaseCard({
  uc,
  accentColor,
  index,
  visible,
}: {
  uc: (typeof industries)[0]["useCases"][0];
  accentColor: string;
  index: number;
  visible: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        borderBottom: "1px solid rgba(245,244,240,0.07)",
        paddingBottom: 22,
        marginBottom: 22,
      }}
    >
      {/* Title row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 16,
          marginBottom: 10,
        }}
      >
        <h4
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 17,
            fontWeight: 400,
            color: "#f5f4f0",
            lineHeight: 1.25,
            letterSpacing: "-0.01em",
          }}
        >
          {uc.title}
        </h4>
        {/* Metric pill */}
        <div
          style={{
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 2,
          }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: 22,
              fontWeight: 300,
              lineHeight: 1,
              color: accentColor,
              letterSpacing: "-0.02em",
            }}
          >
            {uc.metric}
          </span>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 8,
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase" as const,
              color: "rgba(245,244,240,0.25)",
              textAlign: "right" as const,
              maxWidth: 90,
              lineHeight: 1.3,
            }}
          >
            {uc.metricLabel}
          </span>
        </div>
      </div>

      {/* Body */}
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 11.5,
          fontWeight: 300,
          lineHeight: 1.8,
          color: "rgba(245,244,240,0.52)",
        }}
      >
        {uc.body}
      </p>
    </motion.div>
  );
}

// ─── INDUSTRY TAB ─────────────────────────────────────────────────────────────
function IndustryTab({
  industry,
  isActive,
  onClick,
}: {
  industry: (typeof industries)[0];
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 0",
        background: "transparent",
        border: "none",
        borderBottom: "1px solid rgba(245,244,240,0.06)",
        cursor: "pointer",
        textAlign: "left" as const,
        position: "relative" as const,
      }}
    >
      {/* Active indicator */}
      <span
        style={{
          position: "absolute" as const,
          left: -34,
          top: "50%",
          transform: "translateY(-50%)",
          width: 2,
          height: isActive ? 28 : 0,
          background: industry.accentColor,
          transition: "height 0.35s cubic-bezier(0.22,1,0.36,1)",
          borderRadius: 1,
        }}
      />
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 8,
          fontWeight: 500,
          letterSpacing: "0.1em",
          color: isActive ? "rgba(245,244,240,0.5)" : "rgba(245,244,240,0.18)",
          transition: "color 0.28s ease",
          minWidth: 18,
          flexShrink: 0,
        }}
      >
        {industry.index}
      </span>
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12,
          fontWeight: isActive ? 500 : 400,
          letterSpacing: "0.02em",
          color: isActive ? "#f5f4f0" : "rgba(245,244,240,0.42)",
          transition: "color 0.28s ease, font-weight 0.28s ease",
          lineHeight: 1.3,
        }}
      >
        {industry.sector}
      </span>
    </button>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function UseCases() {
  const [activeId, setActiveId] = useState("finance");
  const [panelVisible, setPanelVisible] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // const [mounted, setMounted] = useState(false);
  // useEffect(() => {
  //   setMounted(true);
  // }, []);
  // if (!mounted) return null;

  const handleSelect = (id: string) => {
    if (id === activeId) return;
    setPanelVisible(false);
    setTimeout(() => {
      setActiveId(id);
      setPanelVisible(true);
      if (scrollRef.current) scrollRef.current.scrollTop = 0;
    }, 220);
  };


  const active = industries.find((i) => i.id === activeId)!;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        .uc-root *, .uc-root *::before, .uc-root *::after {
          box-sizing: border-box; margin: 0; padding: 0;
        }
        .uc-root ::-webkit-scrollbar { width: 0; height: 0; }

        /* ── Desktop frame ── */
        .uc-frame {
          position: absolute;
          top: ${FRAME_INSET_V}px;
          bottom: ${FRAME_INSET_V}px;
          left: ${FRAME_INSET_H}px;
          right: ${FRAME_INSET_H}px;
          border-radius: 14px;
          overflow: hidden;
          display: flex;
          border: 1px solid rgba(245,244,240,0.08);
          box-shadow:
            0 0 0 1px rgba(0,0,0,0.5),
            0 24px 64px rgba(0,0,0,0.5),
            0 4px 16px rgba(0,0,0,0.35);
        }

        /* Left: industry nav */
        .uc-nav {
          width: 260px;
          flex-shrink: 0;
          background: rgba(4,4,6,0.96);
          border-right: 1px solid rgba(245,244,240,0.06);
          border-radius: 14px 0 0 14px;
          display: flex;
          flex-direction: column;
          padding: 40px 34px 36px 34px;
          overflow-y: auto;
          scrollbar-width: none;
          position: relative;
        }

        .uc-nav::after {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 1px; height: 100%;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(245,244,240,0.09) 25%,
            rgba(245,244,240,0.18) 50%,
            rgba(245,244,240,0.09) 75%,
            transparent 100%
          );
          pointer-events: none;
        }

        /* Middle: use case detail */
        .uc-detail {
          flex: 1;
          background: rgba(6,6,9,0.97);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border-right: 1px solid rgba(245,244,240,0.05);
        }

        .uc-detail-header {
          padding: 40px 44px 28px;
          flex-shrink: 0;
          border-bottom: 1px solid rgba(245,244,240,0.06);
        }

        .uc-detail-scroll {
          flex: 1;
          overflow-y: auto;
          scrollbar-width: none;
          padding: 32px 44px 40px;
        }

        /* Right: context panel */
        .uc-context {
          width: 240px;
          flex-shrink: 0;
          background: rgba(4,4,6,0.94);
          border-radius: 0 14px 14px 0;
          padding: 40px 28px 36px;
          display: flex;
          flex-direction: column;
          gap: 0;
          overflow-y: auto;
          scrollbar-width: none;
        }

        .uc-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          font-family: 'DM Sans', sans-serif;
          font-size: 8.5px;
          font-weight: 500;
          letter-spacing: 0.26em;
          text-transform: uppercase;
          color: rgba(245,244,240,0.28);
        }
        .uc-eyebrow::before, .uc-eyebrow::after {
          content: '';
          display: block;
          width: 20px;
          height: 1px;
          background: rgba(245,244,240,0.14);
        }

        .uc-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 22px;
          background: #ffffff;
          color: #000000;
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          border: none;
          border-radius: 1px;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.18s ease;
          white-space: nowrap;
          text-decoration: none;
          width: 100%;
        }
        .uc-btn-primary:hover { background: rgba(255,255,255,0.84); transform: translateY(-1px); }

        .uc-btn-ghost {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 22px;
          background: transparent;
          color: rgba(245,244,240,0.4);
          border: 1px solid rgba(245,244,240,0.14);
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          font-weight: 400;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          border-radius: 1px;
          cursor: pointer;
          transition: color 0.2s ease, border-color 0.2s ease, transform 0.18s ease;
          white-space: nowrap;
          text-decoration: none;
          width: 100%;
        }
        .uc-btn-ghost:hover {
          color: rgba(245,244,240,0.82);
          border-color: rgba(245,244,240,0.3);
          transform: translateY(-1px);
        }

        /* ── Mobile ── */
        .uc-mobile {
          display: none;
          position: absolute;
          top: ${FRAME_INSET_V}px;
          bottom: ${FRAME_INSET_V}px;
          left: ${FRAME_INSET_H}px;
          right: ${FRAME_INSET_H}px;
          border-radius: 12px;
          border: 1px solid rgba(245,244,240,0.08);
          overflow: hidden;
          box-shadow: 0 16px 48px rgba(0,0,0,0.45);
          background: rgba(6,6,9,0.98);
          flex-direction: column;
        }

        @media (max-width: 960px) {
          .uc-frame { display: none; }
          .uc-mobile { display: flex; }
        }
        @media (max-width: 380px) {
          .uc-mobile { top: 10px; bottom: 10px; left: 10px; right: 10px; }
        }
      `}</style>

      <section
        className="uc-root"
        id="use-cases"
        style={{
          position: "relative",
          width: "100%",
          height: `calc(100dvh - ${NAV_HEIGHT}px)`,
          overflow: "hidden",
          background: "#060608",
        }}
      >
        {/* ══════════ DESKTOP ══════════ */}
        <div className="uc-frame">
          {/* ── LEFT: Industry nav ─────────────────────────────────────── */}
          <div className="uc-nav">
            <div style={{ marginBottom: 32 }}>
              <div className="uc-eyebrow" style={{ marginBottom: 18 }}>
                Use Cases
              </div>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(22px, 1.8vw, 28px)",
                  fontWeight: 300,
                  lineHeight: 1.2,
                  color: "#f5f4f0",
                  letterSpacing: "-0.01em",
                  marginBottom: 10,
                }}
              >
                Who we
                <br />
                <em
                  style={{
                    fontStyle: "italic",
                    color: "rgba(245,244,240,0.38)",
                  }}
                >
                  build for.
                </em>
              </h3>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  fontWeight: 300,
                  lineHeight: 1.75,
                  color: "rgba(245,244,240,0.32)",
                }}
              >
                Six industries. Dozens of proven applications. One platform.
              </p>
            </div>

            <div
              style={{
                height: 1,
                background:
                  "linear-gradient(to right, rgba(245,244,240,0.08), transparent)",
                marginBottom: 4,
              }}
            />

            {/* Industry list */}
            <div style={{ flex: 1, paddingLeft: 34 }}>
              {industries.map((ind) => (
                <IndustryTab
                  key={ind.id}
                  industry={ind}
                  isActive={activeId === ind.id}
                  onClick={() => handleSelect(ind.id)}
                />
              ))}
            </div>
          </div>

          {/* ── MIDDLE: Use case detail ─────────────────────────────────── */}
          <div className="uc-detail">
            {/* Header */}
            <div className="uc-detail-header">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`header-${activeId}`}
                  initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 8.5,
                      fontWeight: 500,
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "rgba(245,244,240,0.28)",
                      marginBottom: 10,
                    }}
                  >
                    {active.overtitle}
                  </p>
                  <h2
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: "clamp(28px, 3vw, 42px)",
                      fontWeight: 300,
                      fontStyle: "italic",
                      lineHeight: 1.1,
                      color: "#f5f4f0",
                      letterSpacing: "-0.02em",
                      whiteSpace: "pre-line",
                      marginBottom: 12,
                    }}
                  >
                    {active.headline}
                  </h2>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 12,
                      fontWeight: 300,
                      lineHeight: 1.7,
                      color: "rgba(245,244,240,0.42)",
                      maxWidth: 480,
                    }}
                  >
                    {active.summary}
                  </p>
                  {/* Accent rule */}
                  <div
                    style={{
                      marginTop: 16,
                      width: 40,
                      height: 1,
                      background: `linear-gradient(to right, ${active.accentColor}, transparent)`,
                      opacity: 0.9,
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Scrollable use cases */}
            <div className="uc-detail-scroll" ref={scrollRef}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`cases-${activeId}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {active.useCases.map((uc, i) => (
                    <UseCaseCard
                      key={uc.title}
                      uc={uc}
                      accentColor={active.accentColor}
                      index={i}
                      visible={panelVisible}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* ── RIGHT: Context panel ────────────────────────────────────── */}
          <div className="uc-context">
            <AnimatePresence mode="wait">
              <motion.div
                key={`ctx-${activeId}`}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -8 }}
                transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 0,
                  flex: 1,
                }}
              >
                {/* Sector badge */}
                <div style={{ marginBottom: 28 }}>
                  <span
                    style={{
                      display: "inline-block",
                      padding: "5px 10px",
                      border: `1px solid ${active.accentColor}40`,
                      background: `${active.accentColor}10`,
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 9,
                      fontWeight: 500,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase" as const,
                      color: active.accentColor,
                      borderRadius: 1,
                    }}
                  >
                    {active.sector}
                  </span>
                </div>

                {/* Who uses it */}
                <div style={{ marginBottom: 28 }}>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 8.5,
                      fontWeight: 500,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase" as const,
                      color: "rgba(245,244,240,0.22)",
                      marginBottom: 12,
                    }}
                  >
                    Typical clients
                  </p>
                  <div
                    style={{ display: "flex", flexDirection: "column", gap: 7 }}
                  >
                    {active.clients.map((client) => (
                      <div
                        key={client}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                        }}
                      >
                        <span
                          style={{
                            width: 4,
                            height: 4,
                            borderRadius: "50%",
                            background: active.accentColor,
                            opacity: 0.6,
                            flexShrink: 0,
                          }}
                        />
                        <span
                          style={{
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 11,
                            fontWeight: 300,
                            lineHeight: 1.4,
                            color: "rgba(245,244,240,0.45)",
                          }}
                        >
                          {client}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    height: 1,
                    background: "rgba(245,244,240,0.06)",
                    marginBottom: 24,
                  }}
                />

                {/* Use case count */}
                <div style={{ marginBottom: 28 }}>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 8.5,
                      fontWeight: 500,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase" as const,
                      color: "rgba(245,244,240,0.22)",
                      marginBottom: 8,
                    }}
                  >
                    Applications shown
                  </p>
                  <span
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: 38,
                      fontWeight: 300,
                      lineHeight: 1,
                      color: "#f5f4f0",
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    {active.useCases.length}
                  </span>
                  <span
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 10,
                      fontWeight: 300,
                      color: "rgba(245,244,240,0.28)",
                    }}
                  >
                    of {active.useCases.length * 3}+ available
                  </span>
                </div>

                <div
                  style={{
                    height: 1,
                    background: "rgba(245,244,240,0.06)",
                    marginBottom: 24,
                  }}
                />

                {/* Compliance note */}
                <div style={{ marginBottom: "auto" }}>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 8.5,
                      fontWeight: 500,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase" as const,
                      color: "rgba(245,244,240,0.22)",
                      marginBottom: 10,
                    }}
                  >
                    Compliance
                  </p>
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 10.5,
                      fontWeight: 300,
                      lineHeight: 1.7,
                      color: "rgba(245,244,240,0.35)",
                    }}
                  >
                    All deployments are SOC 2 Type II certified, GDPR-compliant,
                    and available on private or air-gapped infrastructure.
                  </p>
                </div>

                {/* CTAs */}
                <div
                  style={{
                    paddingTop: 24,
                    borderTop: "1px solid rgba(245,244,240,0.07)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <button className="uc-btn-primary">Book a Demo</button>
                  <button className="uc-btn-ghost">Case studies →</button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ══════════ MOBILE ══════════ */}
        <div className="uc-mobile">
          {/* Horizontal scrollable sector tabs */}
          <div
            style={{
              flexShrink: 0,
              overflowX: "auto",
              borderBottom: "1px solid rgba(245,244,240,0.07)",
              padding: "0 20px",
              display: "flex",
              gap: 0,
              scrollbarWidth: "none",
            }}
          >
            {industries.map((ind) => (
              <button
                key={ind.id}
                onClick={() => handleSelect(ind.id)}
                style={{
                  flexShrink: 0,
                  padding: "14px 16px",
                  background: "transparent",
                  border: "none",
                  borderBottom:
                    activeId === ind.id
                      ? `2px solid ${ind.accentColor}`
                      : "2px solid transparent",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 10,
                  fontWeight: activeId === ind.id ? 500 : 400,
                  letterSpacing: "0.06em",
                  color:
                    activeId === ind.id ? "#f5f4f0" : "rgba(245,244,240,0.35)",
                  cursor: "pointer",
                  transition: "color 0.2s, border-color 0.2s",
                  whiteSpace: "nowrap",
                }}
              >
                {ind.sector}
              </button>
            ))}
          </div>

          {/* Header */}
          <div
            style={{
              flexShrink: 0,
              padding: "20px 20px 16px",
              borderBottom: "1px solid rgba(245,244,240,0.06)",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`mob-hdr-${activeId}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: "clamp(22px, 6vw, 30px)",
                    fontWeight: 300,
                    fontStyle: "italic",
                    lineHeight: 1.15,
                    color: "#f5f4f0",
                    letterSpacing: "-0.01em",
                    marginBottom: 6,
                    whiteSpace: "pre-line",
                  }}
                >
                  {active.headline}
                </h2>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 11,
                    lineHeight: 1.65,
                    color: "rgba(245,244,240,0.38)",
                    fontWeight: 300,
                  }}
                >
                  {active.summary}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Scrollable use cases */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "20px 20px 24px",
              scrollbarWidth: "none",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={`mob-cases-${activeId}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              >
                {active.useCases.map((uc, i) => (
                  <UseCaseCard
                    key={uc.title}
                    uc={uc}
                    accentColor={active.accentColor}
                    index={i}
                    visible={panelVisible}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Mobile CTAs */}
            <div
              style={{
                paddingTop: 18,
                borderTop: "1px solid rgba(245,244,240,0.07)",
                display: "flex",
                gap: 8,
              }}
            >
              <button className="uc-btn-primary" style={{ flex: 1 }}>
                Book a Demo
              </button>
              <button className="uc-btn-ghost" style={{ flex: 1 }}>
                Case studies
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
