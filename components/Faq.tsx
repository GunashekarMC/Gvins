"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const faqCategories = [
  {
    id: "product",
    label: "Product",
    questions: [
      {
        q: "How is Gvins AI different from OpenAI, Anthropic, or other foundation model providers?",
        a: "Foundation model providers give you a powerful API. We give you a complete production system built on top of it. That means fine-tuned models trained on your data, orchestration layers that connect those models to your existing tools, deployment infrastructure that meets your security and compliance requirements, and ongoing monitoring that keeps models accurate over time. We're not competing with foundation model providers — we build on top of them.",
      },
      {
        q: "Do I need a data science team to use Gvins AI?",
        a: "No. Automation Studio is designed for business users with no ML background. That said, if you do have ML engineers, they'll unlock significantly more capability through our API, fine-tuning pipelines, and MLOps tooling. Most enterprise deployments involve a light-touch configuration by your IT team followed by ongoing management by business operations teams.",
      },
      {
        q: "Can I use my own foundation models (Llama, Mistral, etc.)?",
        a: "Yes. Gvins AI is model-agnostic. You can bring your own open-source models and fine-tune them through our platform, use our pre-integrated commercial model APIs (OpenAI, Anthropic, Cohere, Mistral), or deploy fully proprietary models we train for you. Enterprise and Sovereign tier customers frequently run entirely on self-hosted, open-source base models.",
      },
      {
        q: "How long does a typical deployment take?",
        a: "Simple automation deployments using out-of-the-box connectors and pre-built agent templates can go live in days. Complex, multi-system integrations with custom fine-tuning and MLOps pipelines typically take 4–12 weeks from kickoff to production. We provide a detailed project plan after the initial technical discovery call.",
      },
      {
        q: "What happens to my data when I use Gvins AI?",
        a: "Your data is never used to train models for other customers. On Enterprise and Sovereign tiers, all data stays within your cloud environment or on-premise infrastructure — it never touches our systems. We operate as a data processor under GDPR, and our DPA is available for review before contract signature.",
      },
    ],
  },
  {
    id: "security",
    label: "Security & Compliance",
    questions: [
      {
        q: "What compliance certifications does Gvins AI hold?",
        a: "We are SOC 2 Type II certified (audited annually), ISO 27001 certified, HIPAA-compliant with BAA available, and GDPR-compliant with DPA. We are actively pursuing FedRAMP Moderate authorization for US government clients. Full compliance documentation is available under NDA.",
      },
      {
        q: "Can Gvins AI be deployed in an air-gapped or on-premise environment?",
        a: "Yes. Air-gapped and fully on-premise deployments are available on Sovereign tier. We ship Docker containers and Kubernetes manifests that your team deploys within your own infrastructure. Our engineering team provides installation support and handles ongoing updates through a secure, offline update mechanism.",
      },
      {
        q: "How are AI model decisions audited?",
        a: "Every inference includes a reasoning trace stored in an immutable audit log with timestamps, input context, model version, confidence score, and output. These logs integrate with your existing SIEM and GRC tooling. For regulated industries, we provide structured audit exports compatible with FCA, SEC, FDA 21 CFR Part 11, and equivalent frameworks.",
      },
      {
        q: "Does Gvins AI support role-based access control (RBAC)?",
        a: "Yes. Granular RBAC is standard across all tiers. You can restrict model access, data source visibility, agent permissions, and audit log access at the individual user, team, or department level. SAML 2.0 and OIDC SSO are supported for Enterprise and Sovereign tiers.",
      },
    ],
  },
  {
    id: "pricing",
    label: "Pricing & Commercial",
    questions: [
      {
        q: "Is there a free trial?",
        a: "Yes. Starter and Growth tiers include a 14-day free trial with full feature access and no credit card required. Enterprise trials are handled through a scoped proof-of-concept engagement — contact our sales team to arrange one.",
      },
      {
        q: "How does usage-based pricing work for model inference?",
        a: "Each tier includes a monthly token allocation for model inference. Usage above that allocation is billed at $0.002 per 1K tokens (standard models) or $0.008 per 1K tokens (reasoning models). Enterprise and Sovereign tiers can negotiate committed usage agreements with significantly reduced per-token rates.",
      },
      {
        q: "Can I upgrade or downgrade my plan mid-contract?",
        a: "You can upgrade at any time — the price difference is prorated for the remaining contract period. Downgrades take effect at the next renewal date. For annual contracts, upgrades are processed immediately and downgrades are applied at renewal.",
      },
      {
        q: "Do you offer pricing for startups or non-profits?",
        a: "Yes. We have a startup program for pre-Series B companies that provides Growth-tier access at 50% discount for the first year. Non-profit organisations can apply for our social impact pricing. Contact us with your organisation details.",
      },
    ],
  },
  {
    id: "support",
    label: "Support & SLA",
    questions: [
      {
        q: "What support channels are available?",
        a: "Starter: email support with 48-hour response SLA. Growth: dedicated Slack channel with 8-hour response SLA and access to our technical documentation portal. Enterprise: 24/7 dedicated Slack channel, 1-hour critical incident SLA, quarterly business reviews, and a named customer success manager. Sovereign: embedded engineering support with on-site availability.",
      },
      {
        q: "What is the uptime SLA?",
        a: "Starter: 99.5% monthly uptime. Growth: 99.9% monthly uptime with service credits for breaches. Enterprise: 99.97% monthly uptime with service credits. Sovereign: custom SLA negotiated per deployment. All SLAs exclude scheduled maintenance windows communicated 72 hours in advance.",
      },
      {
        q: "How are model performance degradations handled?",
        a: "Our MLOps monitoring system automatically detects data drift, concept drift, and performance degradation against baseline metrics. Alerts trigger an automatic investigation. Depending on severity, the system initiates automated retraining or flags for engineering review. Customers receive proactive notifications before degradation impacts business outcomes.",
      },
    ],
  },
];

const NAV_HEIGHT = 64;
const FRAME_INSET_V = 20;
const FRAME_INSET_H = 24;

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("product");
  const [openQ, setOpenQ] = useState<string | null>(null);
    // const [mounted, setMounted] = useState(false);
    // useEffect(() => {
    //   setMounted(true);
    // }, []);
  // if (!mounted) return null;

  const activeCat = faqCategories.find((c) => c.id === activeCategory)!;
  const totalQ = faqCategories.reduce((sum, c) => sum + c.questions.length, 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        .faq-root *, .faq-root *::before, .faq-root *::after {
          box-sizing: border-box; margin: 0; padding: 0;
        }
        .faq-root ::-webkit-scrollbar { width: 0; }

        .faq-frame {
          position: absolute;
          top: ${FRAME_INSET_V}px;
          bottom: ${FRAME_INSET_V}px;
          left: ${FRAME_INSET_H}px;
          right: ${FRAME_INSET_H}px;
          border-radius: 14px;
          overflow: hidden;
          display: grid;
          grid-template-columns: 280px 1fr;
          border: 1px solid rgba(245,244,240,0.08);
          box-shadow: 0 0 0 1px rgba(0,0,0,0.5), 0 24px 64px rgba(0,0,0,0.45);
          background: rgba(5,5,8,0.98);
        }

        .faq-left {
          border-right: 1px solid rgba(245,244,240,0.06);
          display: flex;
          flex-direction: column;
          padding: 40px 0 36px;
          overflow-y: auto;
          scrollbar-width: none;
          background: rgba(4,4,6,0.98);
        }

        .faq-right {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .faq-right-scroll {
          flex: 1;
          overflow-y: auto;
          scrollbar-width: none;
          padding: 32px 52px 40px;
        }

        .faq-cat-btn {
          width: 100%;
          padding: 13px 32px;
          background: transparent;
          border: none;
          border-left: 2px solid transparent;
          cursor: pointer;
          text-align: left;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 400;
          letter-spacing: 0.02em;
          transition: all 0.22s ease;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .faq-q-row {
          border-bottom: 1px solid rgba(245,244,240,0.06);
          overflow: hidden;
        }
        .faq-q-row:last-child { border-bottom: none; }

        .faq-q-btn {
          width: 100%;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          padding: 20px 0;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
        }

        @media (max-width: 800px) {
          .faq-frame { grid-template-columns: 1fr; grid-template-rows: auto 1fr; }
          .faq-left { padding: 20px 0 0; flex-direction: row; overflow-x: auto; overflow-y: hidden; border-right: none; border-bottom: 1px solid rgba(245,244,240,0.06); }
          .faq-cat-btn { white-space: nowrap; padding: 12px 20px; border-left: none; border-bottom: 2px solid transparent; }
          .faq-right-scroll { padding: 20px 20px 28px; }
        }
        @media (max-width: 480px) {
          .faq-frame { left: 10px; right: 10px; top: 10px; bottom: 10px; border-radius: 10px; }
        }
      `}</style>

      <section
        className="faq-root"
        id="faq"
        style={{
          position: "relative",
          width: "100%",
          height: `calc(100dvh - ${NAV_HEIGHT}px)`,
          overflow: "hidden",
          background: "#060608",
        }}
      >
        <div className="faq-frame">
          {/* ── Left: intro + category nav ── */}
          <div className="faq-left">
            <div style={{ padding: "0 32px 28px" }}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 8.5,
                  fontWeight: 500,
                  letterSpacing: "0.26em",
                  textTransform: "uppercase",
                  color: "rgba(245,244,240,0.22)",
                  marginBottom: 12,
                }}
              >
                FAQ
              </p>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(22px, 2vw, 30px)",
                  fontWeight: 300,
                  lineHeight: 1.2,
                  color: "#f5f4f0",
                  letterSpacing: "-0.02em",
                  marginBottom: 10,
                }}
              >
                Questions we
                <br />
                <em
                  style={{
                    fontStyle: "italic",
                    color: "rgba(245,244,240,0.35)",
                  }}
                >
                  always get asked.
                </em>
              </h2>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 6,
                  marginTop: 14,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Cormorant Garamond', Georgia, serif",
                    fontSize: 32,
                    fontWeight: 300,
                    color: "#f5f4f0",
                    lineHeight: 1,
                  }}
                >
                  {totalQ}
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
                  Answers
                </span>
              </div>
            </div>

            <div
              style={{
                height: 1,
                background:
                  "linear-gradient(to right, rgba(245,244,240,0.07), transparent)",
                margin: "0 32px 8px",
                flexShrink: 0,
              }}
            />

            {/* Category buttons */}
            <div style={{ flex: 1 }}>
              {faqCategories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    className="faq-cat-btn"
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setOpenQ(null);
                    }}
                    style={{
                      color: isActive ? "#f5f4f0" : "rgba(245,244,240,0.38)",
                      fontWeight: isActive ? 500 : 400,
                      borderLeftColor: isActive
                        ? "rgba(245,244,240,0.5)"
                        : "transparent",
                      background: isActive
                        ? "rgba(245,244,240,0.03)"
                        : "transparent",
                    }}
                  >
                    <span>{cat.label}</span>
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 9,
                        color: isActive
                          ? "rgba(245,244,240,0.4)"
                          : "rgba(245,244,240,0.16)",
                      }}
                    >
                      {cat.questions.length}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Contact prompt */}
            <div
              style={{
                padding: "16px 32px 0",
                borderTop: "1px solid rgba(245,244,240,0.06)",
                flexShrink: 0,
              }}
            >
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 10,
                  fontWeight: 300,
                  lineHeight: 1.65,
                  color: "rgba(245,244,240,0.28)",
                }}
              >
                Still have questions?
                <br />
                <a
                  href="#contact"
                  style={{
                    color: "rgba(245,244,240,0.55)",
                    textDecoration: "none",
                  }}
                >
                  Talk to our team →
                </a>
              </p>
            </div>
          </div>

          {/* ── Right: Q&A accordion ── */}
          <div className="faq-right">
            {/* Category header */}
            <div
              style={{
                padding: "40px 52px 22px",
                borderBottom: "1px solid rgba(245,244,240,0.06)",
                flexShrink: 0,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: "clamp(22px, 2.4vw, 32px)",
                      fontWeight: 300,
                      fontStyle: "italic",
                      lineHeight: 1.2,
                      color: "#f5f4f0",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {activeCat.label}
                  </h3>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Questions */}
            <div className="faq-right-scroll">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {activeCat.questions.map((item, i) => {
                    const qKey = `${activeCategory}-${i}`;
                    const isOpen = openQ === qKey;
                    return (
                      <div key={qKey} className="faq-q-row">
                        <button
                          className="faq-q-btn"
                          onClick={() => setOpenQ(isOpen ? null : qKey)}
                        >
                          <span
                            style={{
                              fontFamily: "'DM Sans', sans-serif",
                              fontSize: 13,
                              fontWeight: isOpen ? 500 : 400,
                              color: isOpen
                                ? "#f5f4f0"
                                : "rgba(245,244,240,0.65)",
                              lineHeight: 1.4,
                              transition: "color 0.25s, font-weight 0.25s",
                              flex: 1,
                            }}
                          >
                            {item.q}
                          </span>
                          <span
                            style={{
                              width: 26,
                              height: 26,
                              borderRadius: 4,
                              background: isOpen
                                ? "rgba(245,244,240,0.1)"
                                : "rgba(245,244,240,0.05)",
                              border: "1px solid rgba(245,244,240,0.09)",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              flexShrink: 0,
                              transition: "background 0.25s",
                            }}
                          >
                            <svg
                              viewBox="0 0 24 24"
                              fill="none"
                              width={10}
                              height={10}
                              style={{
                                stroke: "rgba(245,244,240,0.55)",
                                strokeWidth: 2,
                                transform: isOpen
                                  ? "rotate(45deg)"
                                  : "rotate(0deg)",
                                transition:
                                  "transform 0.3s cubic-bezier(0.22,1,0.36,1)",
                              }}
                            >
                              <path
                                d="M12 5v14M5 12h14"
                                strokeLinecap="round"
                              />
                            </svg>
                          </span>
                        </button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{
                                duration: 0.38,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              style={{ overflow: "hidden" }}
                            >
                              <p
                                style={{
                                  fontFamily: "'DM Sans', sans-serif",
                                  fontSize: 12,
                                  fontWeight: 300,
                                  lineHeight: 1.85,
                                  color: "rgba(245,244,240,0.55)",
                                  paddingBottom: 22,
                                  maxWidth: 680,
                                }}
                              >
                                {item.a}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
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
