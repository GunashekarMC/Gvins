"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";

// ─── PRODUCT DATA ────────────────────────────────────────────────────────────
const products = [
  {
    index: "01",
    navTitle: "AI Agents",
    overtitle: "Autonomous execution",
    title: "Agents that act,\nnot assist.",
    description:
      "Most AI waits for instructions. Ours anticipates them.\n\nOur agent layer doesn't wrap a chat model in a loop — it's a purpose-built execution engine. Agents decompose goals into verifiable sub-tasks, maintain working memory across long-horizon jobs, and recover from failures without human intervention.\n\nBuilt for environments where uptime is contractual and errors are measured in dollars.",
    stats: [
      { value: "99.97%", label: "Uptime SLA" },
      { value: "<80ms", label: "Latency P99" },
      { value: "500+", label: "Actions / min" },
    ],
    bg: "bg-hyperia-agents.jpg",
    accentColor: "#c8a97e",
  },
  {
    index: "02",
    navTitle: "Automation Studio",
    overtitle: "Visual orchestration",
    title: "Pipelines with\npurpose.",
    description:
      "Automation built by engineers rarely survives contact with the teams who need it.\n\nAutomation Studio closes that gap with a visual canvas where business logic is composed — not coded. Branch on conditions, loop over datasets, invoke models mid-flow, and wire to any system via our 350+ native connectors.\n\nDeploy in minutes. Iterate in seconds. No YAML, no pull requests.",
    stats: [
      { value: "10×", label: "Faster builds" },
      { value: "350+", label: "Connectors" },
      { value: "0", label: "Code required" },
    ],
    bg: "bg-hyperia-automation.jpg",
    accentColor: "#7b9ea8",
  },
  {
    index: "03",
    navTitle: "Analytics Engine",
    overtitle: "Real-time intelligence",
    title: "Data that thinks\nahead of you.",
    description:
      "Dashboards show what happened. The Analytics Engine tells you what will.\n\nIngest ten billion events a day across streaming and batch sources. Models retrain continuously on your own data — not generic benchmarks. Predictions surface in your product, your workflows, and your decisions at sub-3ms query latency.\n\nThe gap between observation and action, eliminated.",
    stats: [
      { value: "10B+", label: "Events / day" },
      { value: "3ms", label: "Query time" },
      { value: "∞", label: "Scale" },
    ],
    bg: "bg-hyperia-analytics.jpg",
    accentColor: "#a8847b",
  },
  {
    index: "04",
    navTitle: "API & Integrations",
    overtitle: "Connectivity layer",
    title: "Every system,\none surface.",
    description:
      "Enterprise stacks are ecosystems, not monoliths. Our integration layer is designed for that reality.\n\nRESTful and GraphQL APIs with OpenAPI specs. Native SDKs in 12 languages. Webhooks, event streams, and bidirectional sync with 200+ enterprise platforms — from Salesforce to SAP to your internal data warehouse.\n\nConnect once. Maintain nothing.",
    stats: [
      { value: "200+", label: "Integrations" },
      { value: "12", label: "SDK languages" },
      { value: "99.9%", label: "Availability" },
    ],
    bg: "bg-hyperia-api.jpg",
    accentColor: "#8a9e88",
  },
  {
    index: "05",
    navTitle: "Model Hub",
    overtitle: "Custom foundation models",
    title: "Foundation models,\nyour foundation.",
    description:
      "Generic models give generic results. The Model Hub is where specialization happens.\n\nFine-tune from 40+ base models on your proprietary data with a single click. Evaluate with built-in benchmarking frameworks. Roll out via canary deployments with automated A/B testing and instant rollback.\n\nYour IP stays yours. Your models outperform everything off the shelf.",
    stats: [
      { value: "40+", label: "Base models" },
      { value: "1-click", label: "Fine-tune" },
      { value: "SOC 2", label: "Certified" },
    ],
    bg: "bg-hyperia-models.jpg",
    accentColor: "#9b8ab4",
  },
  {
    index: "06",
    navTitle: "Governance",
    overtitle: "Control & compliance",
    title: "Authority over\nevery AI action.",
    description:
      "Enterprises Don&apos;t deploy AI without control. We made control the default.\n\nGranular RBAC, immutable audit trails, policy-as-code guardrails, and real-time observability across every agent, pipeline, and model inference — all in one compliance surface.\n\nHIPAA, GDPR, SOC 2, ISO 27001. Not checkboxes — architecture decisions baked in from day one.",
    stats: [
      { value: "HIPAA", label: "Compliant" },
      { value: "GDPR", label: "Certified" },
      { value: "100%", label: "Audit cover" },
    ],
    bg: "bg-hyperia-governance.jpg",
    accentColor: "#c8a97e",
  },
];

const bgImages = ["/FighterJet.jpg"];

const NAV_HEIGHT = 64;
const FRAME_INSET_V = 20;
const FRAME_INSET_H = 24;

// ─── AMBIENT PARTICLES ───────────────────────────────────────────────────────
function Particles({ color }: { color: string }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 4,
      }}
    >
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            width: `${2 + i * 0.4}px`,
            height: `${2 + i * 0.4}px`,
            borderRadius: "50%",
            background: color,
            opacity: 0.22 - i * 0.025,
            left: `${8 + i * 13}%`,
            top: `${18 + (i % 3) * 22}%`,
            animation: `prodFloatP ${4 + i}s ease-in-out ${i * 0.55}s infinite alternate`,
          }}
        />
      ))}
    </div>
  );
}

// ─── STAT BLOCK ──────────────────────────────────────────────────────────────
function StatBlock({
  value,
  label,
  color,
}: {
  value: string;
  label: string;
  color: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: 24,
          fontWeight: 300,
          lineHeight: 1,
          color: "#f5f4f0",
          letterSpacing: "-0.01em",
        }}
      >
        {value}
      </span>
      <span
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 8.5,
          fontWeight: 500,
          letterSpacing: "0.18em",
          textTransform: "uppercase" as const,
          color: "rgba(245,244,240,0.28)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

// ─── ACCORDION ITEM ──────────────────────────────────────────────────────────
function AccordionItem({
  product,
  isOpen,
  onToggle,
}: {
  product: (typeof products)[0];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      style={{
        borderBottom: "1px solid rgba(245,244,240,0.07)",
        overflow: "hidden",
      }}
    >
      <button
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 0",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          gap: 14,
          textAlign: "left" as const,
        }}
      >
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            fontWeight: 400,
            letterSpacing: "0.03em",
            color: isOpen ? "#f5f4f0" : "rgba(245,244,240,0.52)",
            transition: "color 0.28s ease",
            flex: 1,
          }}
        >
          {product.navTitle}
        </span>
        <span
          style={{
            width: 26,
            height: 26,
            borderRadius: 4,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.09)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            width={11}
            height={11}
            style={{
              stroke: "rgba(245,244,240,0.65)",
              strokeWidth: 1.8,
              transform: isOpen ? "scaleY(-1)" : "scaleY(1)",
              transition: "transform 0.32s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <path
              d="M1 6L12 18L23 6"
              strokeLinecap="round"
              strokeLinejoin="round"
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
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{ overflow: "hidden" }}
          >
            <div style={{ paddingBottom: 22 }}>
              {/* Index + overtitle */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  marginBottom: 12,
                }}
              >
                <span
                  style={{
                    background: "#f5f4f0",
                    color: "#060608",
                    width: 19,
                    height: 19,
                    borderRadius: "50%",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 7.5,
                    fontWeight: 500,
                    letterSpacing: "0.06em",
                    flexShrink: 0,
                  }}
                >
                  {product.index}
                </span>
                <span
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 8.5,
                    fontWeight: 500,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase" as const,
                    color: "rgba(245,244,240,0.32)",
                  }}
                >
                  {product.overtitle}
                </span>
              </div>

              {/* Description paragraphs */}
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  fontWeight: 300,
                  lineHeight: 1.78,
                  color: "rgba(245,244,240,0.65)",
                }}
              >
                {product.description.split("\n\n").map((para, i) => (
                  <p key={i} style={{ marginBottom: i < 2 ? 9 : 0 }}>
                    {para}
                  </p>
                ))}
              </div>

              {/* Stats row */}
              <div
                style={{
                  display: "flex",
                  gap: 24,
                  marginTop: 20,
                  paddingTop: 16,
                  borderTop: "1px solid rgba(245,244,240,0.06)",
                }}
              >
                {product.stats.map((s) => (
                  <StatBlock
                    key={s.label}
                    value={s.value}
                    label={s.label}
                    color={product.accentColor}
                  />
                ))}
              </div>

              {/* Learn more link */}
              <div style={{ marginTop: 16 }}>
                <a
                  href="#"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 7,
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 9.5,
                    fontWeight: 500,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase" as const,
                    color: "rgba(245,244,240,0.34)",
                    textDecoration: "none",
                    transition: "color 0.22s ease",
                  }}
                  onMouseEnter={(e) =>
                    ((e.currentTarget as HTMLElement).style.color = "#f5f4f0")
                  }
                  onMouseLeave={(e) =>
                    ((e.currentTarget as HTMLElement).style.color =
                      "rgba(245,244,240,0.34)")
                  }
                >
                  Learn more
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      d="M5 12h14M12 5l7 7-7 7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── BACKGROUND LAYER ────────────────────────────────────────────────────────
function ProductBackground({
  product,
  isActive,
}: {
  product: (typeof products)[0];
  isActive: boolean;
}) {
  const [img, setImg] = useState("");

  useEffect(() => {
    setImg(bgImages[Math.floor(Math.random() * bgImages.length)]);
  }, [product]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 0.9, ease: "easeInOut" }}
      style={{
        position: "absolute",
        inset: 0,
        backgroundImage: `url(${img})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        zIndex: 1,
        filter: "brightness(0.52)",
      }}
    >
      {/* Dark scrim */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "rgba(0,0,0,0.4)",
          zIndex: 2,
        }}
      />
      {/* Noise grain */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E")`,
          opacity: 0.45,
          pointerEvents: "none",
          zIndex: 3,
        }}
      />
      <Particles color={product.accentColor} />
    </motion.div>
  );
}

// ─── MOBILE CARD VIEW ────────────────────────────────────────────────────────
function MobileView({
  activeIndex,
  openIndex,
  onDotClick,
  onToggle,
}: {
  activeIndex: number;
  openIndex: number | null;
  onDotClick: (i: number) => void;
  onToggle: (i: number) => void;
}) {
  const product = products[activeIndex];

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
      }}
    >
      {/* Hero visual card */}
      <div
        style={{
          position: "relative",
          height: "38vh",
          minHeight: 200,
          flexShrink: 0,
          overflow: "hidden",
          borderRadius: "12px 12px 0 0",
        }}
      >
        {products.map((p, i) => (
          <ProductBackground key={i} product={p} isActive={i === activeIndex} />
        ))}

        {/* Ghost number */}
        <motion.div
          key={`mob-ghost-${activeIndex}`}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 5,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          <span
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(80px, 22vw, 130px)",
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 0.85,
              color: "rgba(245,244,240,0.04)",
              letterSpacing: "-0.04em",
              display: "block",
            }}
          >
            {product.index}
          </span>
        </motion.div>

        {/* Bottom headline */}
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            right: 20,
            zIndex: 6,
            pointerEvents: "none",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`mob-hl-${activeIndex}`}
              initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -6, filter: "blur(4px)" }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
            >
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 8,
                  fontWeight: 500,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "rgba(245,244,240,0.3)",
                  marginBottom: 6,
                }}
              >
                {product.overtitle}
              </p>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(20px, 6vw, 30px)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  lineHeight: 1.12,
                  color: "#f5f4f0",
                  letterSpacing: "-0.01em",
                  whiteSpace: "pre-line",
                }}
              >
                {product.title}
              </h2>
              <div
                style={{
                  marginTop: 10,
                  width: 28,
                  height: 1,
                  background: `linear-gradient(to right, ${product.accentColor}, transparent)`,
                  opacity: 0.85,
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Indicators */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            right: 16,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => onDotClick(i)}
              aria-label={`Go to ${products[i].navTitle}`}
              style={{
                height: "2px",
                width: i === activeIndex ? "22px" : "8px",
                transition: "width 0.4s cubic-bezier(0.25,0.46,0.45,0.94)",
                background:
                  i === activeIndex
                    ? "rgba(245,244,240,0.7)"
                    : "rgba(245,244,240,0.2)",
                border: "none",
                padding: 0,
                cursor: "pointer",
                borderRadius: "1px",
              }}
            />
          ))}
        </div>

        {/* Radial vignette */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 108% 88% at 50% 50%, transparent 32%, rgba(3,3,6,0.52) 100%)",
            zIndex: 6,
            pointerEvents: "none",
          }}
        />
        {/* Bottom fade */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 80,
            background: "linear-gradient(to top, rgba(3,3,6,0.7), transparent)",
            zIndex: 6,
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Scrollable accordion panel */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          background: "rgba(6,6,9,0.97)",
          borderTop: "1px solid rgba(245,244,240,0.06)",
          borderRadius: "0 0 12px 12px",
          padding: "20px 20px 24px",
          scrollbarWidth: "none",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: 18 }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 8,
              fontWeight: 500,
              letterSpacing: "0.26em",
              textTransform: "uppercase" as const,
              color: "rgba(245,244,240,0.28)",
              marginBottom: 12,
            }}
          >
            <span
              style={{
                display: "block",
                width: 16,
                height: 1,
                background: "rgba(245,244,240,0.16)",
              }}
            />
            Intelligence Suite
            <span
              style={{
                display: "block",
                width: 16,
                height: 1,
                background: "rgba(245,244,240,0.16)",
              }}
            />
          </div>

          <h3
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(20px, 5.5vw, 26px)",
              fontWeight: 300,
              lineHeight: 1.2,
              color: "#f5f4f0",
              letterSpacing: "-0.01em",
              marginBottom: 8,
            }}
          >
            Every layer of your{" "}
            <em
              style={{ fontStyle: "italic", color: "rgba(245,244,240,0.42)" }}
            >
              AI infrastructure.
            </em>
          </h3>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 11,
              fontWeight: 300,
              lineHeight: 1.75,
              color: "rgba(245,244,240,0.35)",
            }}
          >
            Six products. One platform. Designed to compose into a complete
            intelligence stack.
          </p>
        </div>

        {/* Hairline */}
        <div
          style={{
            height: 1,
            background:
              "linear-gradient(to right, rgba(245,244,240,0.09), transparent)",
            marginBottom: 4,
          }}
        />

        {/* Accordion */}
        <div>
          {products.map((p, i) => (
            <AccordionItem
              key={i}
              product={p}
              isOpen={openIndex === i}
              onToggle={() => onToggle(i)}
            />
          ))}
        </div>

        {/* CTAs */}
        <div
          style={{
            marginTop: 22,
            paddingTop: 18,
            borderTop: "1px solid rgba(245,244,240,0.07)",
            display: "flex",
            gap: 8,
          }}
        >
          <button
            style={{
              flex: 1,
              padding: "11px 16px",
              background: "#ffffff",
              color: "#000000",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 9,
              fontWeight: 500,
              letterSpacing: "0.16em",
              textTransform: "uppercase" as const,
              border: "none",
              borderRadius: "1px",
              cursor: "pointer",
            }}
          >
            Explore platform
          </button>
          <button
            style={{
              flex: 1,
              padding: "11px 16px",
              background: "transparent",
              color: "rgba(245,244,240,0.4)",
              border: "1px solid rgba(245,244,240,0.14)",
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 9,
              fontWeight: 400,
              letterSpacing: "0.16em",
              textTransform: "uppercase" as const,
              borderRadius: "1px",
              cursor: "pointer",
            }}
          >
            Case studies
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function ProductsOverview() {
  const [activeIndex, setActiveIndex] = useState(0);
  // openIndex is INDEPENDENT from activeIndex — auto-slide never closes it
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const autoSlideRef = useRef<ReturnType<typeof setInterval> | null>(null);
  
  // const [mounted, setMounted] = useState(false);
  // useEffect(() => {
  //   setMounted(true);
  // }, []);
  // if (!mounted) return null;

  // Start auto-slide — only changes activeIndex (left visual), NEVER touches openIndex
  const startAutoSlide = () => {
    if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    autoSlideRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % products.length);
      // ✅ openIndex is intentionally NOT touched here
    }, 5000);
  };

  useEffect(() => {
    startAutoSlide();
    return () => {
      if (autoSlideRef.current) clearInterval(autoSlideRef.current);
    };
  }, []);

  // User clicks a dot → changes visual side only, resets timer
  const handleDotClick = (i: number) => {
    setActiveIndex(i);
    startAutoSlide();
  };

  // User clicks accordion → updates both sides, resets timer
  // But auto-slide after this will ONLY change activeIndex, not close the dropdown
  const handleToggle = (i: number) => {
    setOpenIndex((prev) => (prev === i ? null : i));
    setActiveIndex(i);
    startAutoSlide();
  };


  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        @keyframes prodFloatP {
          from { transform: translateY(0) translateX(0); opacity: 0.1; }
          to   { transform: translateY(-16px) translateX(5px); opacity: 0.28; }
        }

        .prod-root *, .prod-root *::before, .prod-root *::after {
          box-sizing: border-box; margin: 0; padding: 0;
        }
        .prod-root ::-webkit-scrollbar { width: 0; height: 0; }

        /* ── DESKTOP frame ── */
        .prod-frame {
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

        /* Left visual half */
        .prod-visual {
          position: relative;
          flex: 1;
          overflow: hidden;
          background: #060608;
          border-radius: 14px 0 0 14px;
        }

        /* Right accordion panel */
        .prod-panel {
          width: 390px;
          flex-shrink: 0;
          position: relative;
          background: rgba(6,6,9,0.95);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border-left: 1px solid rgba(245,244,240,0.06);
          border-radius: 0 14px 14px 0;
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          scrollbar-width: none;
          padding: 40px 34px 36px;
        }

        .prod-panel::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 1px; height: 100%;
          background: linear-gradient(
            to bottom,
            transparent 0%,
            rgba(245,244,240,0.09) 25%,
            rgba(245,244,240,0.18) 50%,
            rgba(245,244,240,0.09) 75%,
            transparent 100%
          );
          z-index: 10;
          pointer-events: none;
        }

        .prod-visual-hl {
          position: absolute;
          bottom: 52px;
          left: 48px;
          right: 48px;
          z-index: 6;
          pointer-events: none;
        }

        .prod-eyebrow {
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
        .prod-eyebrow::before, .prod-eyebrow::after {
          content: '';
          display: block;
          width: 20px;
          height: 1px;
          background: rgba(245,244,240,0.16);
        }

        .prod-indicators {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 10;
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .prod-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 28px;
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
        }
        .prod-btn-primary:hover { background: rgba(255,255,255,0.84); transform: translateY(-1px); }

        .prod-btn-ghost {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 28px;
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
        }
        .prod-btn-ghost:hover {
          color: rgba(245,244,240,0.82);
          border-color: rgba(245,244,240,0.3);
          transform: translateY(-1px);
        }

        /* ── Mobile wrapper ── */
        .prod-mobile-wrapper {
          display: none;
          position: absolute;
          top: ${FRAME_INSET_V}px;
          bottom: ${FRAME_INSET_V}px;
          left: ${FRAME_INSET_H}px;
          right: ${FRAME_INSET_H}px;
          border-radius: 12px;
          border: 1px solid rgba(245,244,240,0.08);
          box-shadow:
            0 0 0 1px rgba(0,0,0,0.5),
            0 16px 48px rgba(0,0,0,0.45);
          overflow: hidden;
        }

        /* ── Breakpoint switch ── */
        @media (max-width: 900px) {
          .prod-frame { display: none; }
          .prod-mobile-wrapper { display: block; }
        }

        /* ── Very small phones ── */
        @media (max-width: 380px) {
          .prod-mobile-wrapper {
            top: 10px;
            bottom: 10px;
            left: 10px;
            right: 10px;
          }
        }
      `}</style>

      <section
        className="prod-root"
        style={{
          position: "relative",
          width: "100%",
          height: `calc(100dvh - ${NAV_HEIGHT}px)`,
          overflow: "hidden",
          background: "#060608",
        }}
      >
        {/* ══════════ DESKTOP LAYOUT ══════════ */}
        <div className="prod-frame">
          {/* LEFT: Visual pane */}
          <div className="prod-visual">
            {products.map((p, i) => (
              <ProductBackground
                key={i}
                product={p}
                isActive={i === activeIndex}
              />
            ))}

            {/* Ghost index number */}
            <motion.div
              key={`ghost-${activeIndex}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 5,
                pointerEvents: "none",
                userSelect: "none",
              }}
            >
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(90px, 14vw, 180px)",
                  fontWeight: 300,
                  fontStyle: "italic",
                  lineHeight: 0.85,
                  color: "rgba(245,244,240,0.032)",
                  letterSpacing: "-0.04em",
                  display: "block",
                }}
              >
                {products[activeIndex].index}
              </span>
            </motion.div>

            {/* Bottom-left headline */}
            <div className="prod-visual-hl">
              <div className="prod-eyebrow" style={{ marginBottom: 18 }}>
                Platform suite
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`hl-${activeIndex}`}
                  initial={{ opacity: 0, y: 12, filter: "blur(7px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -7, filter: "blur(4px)" }}
                  transition={{ duration: 0.48, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 9,
                      fontWeight: 500,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(245,244,240,0.3)",
                      marginBottom: 9,
                    }}
                  >
                    {products[activeIndex].overtitle}
                  </p>
                  <h2
                    style={{
                      fontFamily: "'Cormorant Garamond', Georgia, serif",
                      fontSize: "clamp(26px, 3.8vw, 50px)",
                      fontWeight: 300,
                      fontStyle: "italic",
                      lineHeight: 1.1,
                      color: "#f5f4f0",
                      letterSpacing: "-0.01em",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {products[activeIndex].title}
                  </h2>
                  <div
                    style={{
                      marginTop: 14,
                      width: 36,
                      height: 1,
                      background: `linear-gradient(to right, ${products[activeIndex].accentColor}, transparent)`,
                      opacity: 0.85,
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Line indicators */}
            <div className="prod-indicators">
              {products.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleDotClick(i)}
                  aria-label={`Go to ${products[i].navTitle}`}
                  style={{
                    height: "1px",
                    width: i === activeIndex ? "28px" : "10px",
                    position: "relative",
                    overflow: "hidden",
                    transition: "width 0.45s cubic-bezier(0.25,0.46,0.45,0.94)",
                    background: "rgba(245,244,240,0.16)",
                    border: "none",
                    padding: 0,
                    cursor: "pointer",
                    borderRadius: "1px",
                  }}
                >
                  {i === activeIndex && (
                    <motion.span
                      layoutId="prodInd"
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: "rgba(245,244,240,0.62)",
                        display: "block",
                      }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Radial vignette */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(ellipse 108% 88% at 50% 50%, transparent 32%, rgba(3,3,6,0.52) 100%)",
                zIndex: 6,
                pointerEvents: "none",
              }}
            />
            {/* Right-edge fade */}
            <div
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                bottom: 0,
                width: 90,
                background:
                  "linear-gradient(to right, transparent, rgba(3,3,6,0.6))",
                zIndex: 6,
                pointerEvents: "none",
              }}
            />
          </div>

          {/* RIGHT: Accordion panel */}
          <div className="prod-panel">
            <div style={{ marginBottom: 30, flexShrink: 0 }}>
              <div className="prod-eyebrow" style={{ marginBottom: 16 }}>
                Intelligence Suite
              </div>

              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: "clamp(24px, 2vw, 32px)",
                  fontWeight: 300,
                  lineHeight: 1.2,
                  color: "#f5f4f0",
                  letterSpacing: "-0.01em",
                  marginBottom: 11,
                }}
              >
                Every layer of your
                <br />
                <em
                  style={{
                    fontStyle: "italic",
                    color: "rgba(245,244,240,0.42)",
                  }}
                >
                  AI infrastructure.
                </em>
              </h3>

              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11.5,
                  fontWeight: 300,
                  lineHeight: 1.8,
                  color: "rgba(245,244,240,0.38)",
                  maxWidth: 290,
                }}
              >
                Six products. One platform. Designed to compose into a complete
                intelligence stack — not a collection of point solutions.
              </p>
            </div>

            <div
              style={{
                height: 1,
                background:
                  "linear-gradient(to right, rgba(245,244,240,0.09), transparent)",
                marginBottom: 4,
                flexShrink: 0,
              }}
            />

            <div style={{ flex: 1 }}>
              {products.map((p, i) => (
                <AccordionItem
                  key={i}
                  product={p}
                  isOpen={openIndex === i}
                  onToggle={() => handleToggle(i)}
                />
              ))}
            </div>

            <div
              style={{
                marginTop: 28,
                paddingTop: 24,
                borderTop: "1px solid rgba(245,244,240,0.07)",
                display: "flex",
                gap: 9,
                flexWrap: "wrap" as const,
                flexShrink: 0,
              }}
            >
              <button className="prod-btn-primary">Explore platform</button>
              <button className="prod-btn-ghost">Case studies</button>
            </div>
          </div>
        </div>

        {/* ══════════ MOBILE LAYOUT ══════════ */}
        <div className="prod-mobile-wrapper">
          <MobileView
            activeIndex={activeIndex}
            openIndex={openIndex}
            onDotClick={handleDotClick}
            onToggle={handleToggle}
          />
        </div>
      </section>
    </>
  );
}
