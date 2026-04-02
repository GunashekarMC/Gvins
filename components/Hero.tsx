"use client";

import { motion, AnimatePresence, Variants, Transition } from "framer-motion";
import { useEffect, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────
type SlidePosition = "left-center" | "center" | "split" | "right-center";

interface SlideBase {
  id: number;
  position: SlidePosition;
  sub: string;
  cta: { primary: string; secondary: string };
}

interface StandardSlide extends SlideBase {
  position: "left-center" | "center" | "right-center";
  tag: string;
  headline: string[];
  tagTop?: never;
  headlineTop?: never;
  headlineBottom?: never;
}

interface SplitSlide extends SlideBase {
  position: "split";
  tagTop: string;
  headlineTop: string[];
  headlineBottom: string[];
  tag?: never;
  headline?: never;
}

type Slide = StandardSlide | SplitSlide;

// ─── Slide Data ───────────────────────────────────────────────────────────────
const slides: Slide[] = [
  {
    id: 0,
    position: "left-center",
    tag: "ENTERPRISE AI",
    headline: ["Redefine What", "Your Business", "Can Think."],
    sub: "We engineer AI infrastructure that transforms raw enterprise data into autonomous decision-making — at scale, in real time.",
    cta: { primary: "Explore Platform", secondary: "Watch Demo" },
  },
  {
    id: 1,
    position: "center",
    tag: "INTELLIGENCE · AUTOMATION · SCALE",
    headline: ["The Future of", "Enterprise", "Is Autonomous."],
    sub: "Predictive analytics. Intelligent workflows. AI-native ERP. One unified intelligence layer for your entire organization.",
    cta: { primary: "Get Started", secondary: "View Solutions" },
  },
  {
    id: 2,
    position: "split",
    tagTop: "NEXT-GEN AI",
    headlineTop: ["Decisions at", "Machine Speed."],
    headlineBottom: ["Built for", "Enterprise Scale."],
    sub: "From computer vision to NLP — our modular AI stack adapts to your industry, your data, your pace.",
    cta: { primary: "Our Technology", secondary: "Case Studies" },
  },
  {
    id: 3,
    position: "right-center",
    tag: "AI · ERP · AUTOMATION",
    headline: ["Intelligence", "Engineered for", "Your Industry."],
    sub: "Purpose-built AI systems that integrate seamlessly with your operations — from supply chain to predictive maintenance.",
    cta: { primary: "Start Building", secondary: "Talk to Us" },
  },
];

const SLIDE_DURATION = 6000;

// ── Adjust this to match your Navbar's rendered height ──
const NAV_HEIGHT = 64;

// ─── Motion Variants ──────────────────────────────────────────────────────────
const wrapVariants: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.55, staggerChildren: 0.11 } as Transition,
  },
  exit: { opacity: 0, transition: { duration: 0.4 } as Transition },
};

const itemVariants: Variants = {
  initial: { opacity: 0, y: 18, filter: "blur(5px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" } as Transition,
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: "blur(3px)",
    transition: { duration: 0.28, ease: "easeIn" } as Transition,
  },
};

// ─── Hero ─────────────────────────────────────────────────────────────────────
export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [, setPrev] = useState<number | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setPrev(current);
      setCurrent((c) => (c + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [current]);

  const slide = slides[current];

  return (
    <section
      className="relative w-full bg-black text-white"
      style={{
        // Exactly fills viewport — no scroll, no overflow
        height: "100dvh",
        overflow: "hidden",
        boxSizing: "border-box",
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&family=Sora:wght@100;200;300;400&display=swap');
        .hero-tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
        }
        .hero-hl {
          font-family: 'Sora', sans-serif;
          font-weight: 200;
          letter-spacing: 0.03em;
          line-height: 1.06;
        }
        .hero-sub {
          font-family: 'DM Sans', sans-serif;
          font-weight: 300;
          font-size: 12.5px;
          letter-spacing: 0.02em;
          line-height: 1.8;
        }
        .hero-btn-primary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 8px 20px;
          background: white;
          color: black;
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 500;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          border-radius: 1px;
          text-decoration: none;
          border: none;
          cursor: pointer;
          transition: background 0.22s ease;
          white-space: nowrap;
        }
        .hero-btn-primary:hover { background: rgba(255,255,255,0.86); }
        .hero-btn-secondary {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 8px 20px;
          background: transparent;
          color: rgba(255,255,255,0.44);
          border: 1px solid rgba(255,255,255,0.17);
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          border-radius: 1px;
          text-decoration: none;
          cursor: pointer;
          transition: color 0.22s ease, border-color 0.22s ease;
          white-space: nowrap;
        }
        .hero-btn-secondary:hover {
          color: rgba(255,255,255,0.85);
          border-color: rgba(255,255,255,0.35);
        }
      `}</style>

      {/* ── Video — full bleed behind everything ── */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ opacity: 0.42 }}
      >
        <source src="/hero1.mp4" type="video/mp4" />
      </video>

      {/* ── Dark vignette — NO grid, NO glow ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.28) 40%, rgba(0,0,0,0.32) 72%, rgba(0,0,0,0.88) 100%)",
        }}
      />

      {/*
        ── Content container ──
        • Starts exactly at bottom of fixed nav (top: NAV_HEIGHT)
        • Ends 72px above bottom to leave room for indicators
        • Content inside is absolutely positioned per-slide
      */}
      <div
        className="absolute left-0 right-0 overflow-hidden"
        style={{
          top: `${NAV_HEIGHT}px`,
          bottom: "72px", // breathing room above indicators
        }}
      >
        <AnimatePresence mode="wait">
          <SlideContent key={current} slide={slide} />
        </AnimatePresence>
      </div>

      {/* ── Slide indicators — centred, 28px from bottom ── */}
      <div
        className="absolute z-20 flex gap-3"
        style={{
          bottom: "28px",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => {
              setPrev(current);
              setCurrent(i);
            }}
            aria-label={`Go to slide ${i + 1}`}
            style={{
              height: "1px",
              width: i === current ? "30px" : "11px",
              position: "relative",
              overflow: "hidden",
              transition: "width 0.5s cubic-bezier(0.25,0.46,0.45,0.94)",
              background: "rgba(255,255,255,0.14)",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          >
            {i === current && (
              <motion.span
                layoutId="slideInd"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(255,255,255,0.62)",
                  display: "block",
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* ── Scroll hint ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute z-20 flex items-center gap-3"
        style={{ bottom: "24px", right: "40px" }}
      >
        <span className="hero-tag" style={{ color: "rgba(255,255,255,0.24)" }}>
          Scroll
        </span>
        <div
          style={{
            width: "16px",
            height: "26px",
            border: "1px solid rgba(255,255,255,0.14)",
            borderRadius: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            paddingTop: "4px",
          }}
        >
          <motion.div
            animate={{ y: [0, 7, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            style={{
              width: "2px",
              height: "2px",
              borderRadius: "50%",
              background: "rgba(255,255,255,0.48)",
            }}
          />
        </div>
      </motion.div>

      {/* ── Slide counter — just below nav on the right ── */}
      <div
        className="absolute z-20 hero-tag"
        style={{
          top: `${NAV_HEIGHT + 20}px`,
          right: "40px",
          color: "rgba(255,255,255,0.16)",
        }}
      >
        0{current + 1}&nbsp;&nbsp;/&nbsp;&nbsp;0{slides.length}
      </div>
    </section>
  );
}

// ─── Slide Renderer ───────────────────────────────────────────────────────────
function SlideContent({ slide }: { slide: Slide }) {
  const { position } = slide;

  // Shared horizontal padding
  const PX = "clamp(36px, 7.5vw, 120px)";
  // Shared vertical padding inside the content box (top & bottom breathing room)
  const PY = "clamp(24px, 4vw, 48px)";

  // ── SPLIT ──────────────────────────────────────────────────────────────────
  if (position === "split") {
    const s = slide as SplitSlide;
    return (
      <motion.div
        variants={wrapVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="absolute inset-0 z-10 flex flex-col justify-between"
        style={{
          paddingTop: PY,
          paddingBottom: PY,
          paddingLeft: PX,
          paddingRight: PX,
        }}
      >
        {/* TOP-LEFT */}
        <div style={{ maxWidth: "440px" }}>
          <motion.p
            variants={itemVariants}
            className="hero-tag"
            style={{ color: "rgba(255,255,255,0.3)", marginBottom: "14px" }}
          >
            {s.tagTop}
          </motion.p>
          {s.headlineTop.map((line, i) => (
            <motion.h1
              key={i}
              variants={itemVariants}
              className="hero-hl"
              style={{
                fontSize: "clamp(26px, 3.4vw, 44px)",
                color: "rgba(255,255,255,0.92)",
                display: "block",
              }}
            >
              {line}
            </motion.h1>
          ))}
        </div>

        {/* BOTTOM-RIGHT */}
        <div
          style={{
            maxWidth: "420px",
            alignSelf: "flex-end",
            textAlign: "right",
          }}
        >
          {s.headlineBottom.map((line, i) => (
            <motion.h2
              key={i}
              variants={itemVariants}
              className="hero-hl"
              style={{
                fontSize: "clamp(26px, 3.4vw, 44px)",
                color: "rgba(255,255,255,0.4)",
                display: "block",
              }}
            >
              {line}
            </motion.h2>
          ))}
          <motion.p
            variants={itemVariants}
            className="hero-sub"
            style={{
              color: "rgba(255,255,255,0.33)",
              marginTop: "14px",
              maxWidth: "300px",
              marginLeft: "auto",
            }}
          >
            {s.sub}
          </motion.p>
          <motion.div
            variants={itemVariants}
            style={{
              marginTop: "20px",
              display: "flex",
              gap: "10px",
              justifyContent: "flex-end",
            }}
          >
            <a href="#" className="hero-btn-primary">
              {s.cta.primary}
            </a>
            <a href="#" className="hero-btn-secondary">
              {s.cta.secondary}
            </a>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // ── STANDARD layouts ──────────────────────────────────────────────────────
  const s = slide as StandardSlide;
  const isCenter = position === "center";
  const isRight = position === "right-center";

  const wrapStyle: React.CSSProperties = {
    display: "flex",
    height: "100%",
    alignItems: "center",
    boxSizing: "border-box",
    // Safe vertical padding so text never touches top/bottom edge
    paddingTop: PY,
    paddingBottom: PY,
    ...(isCenter
      ? { justifyContent: "center", paddingLeft: "24px", paddingRight: "24px" }
      : isRight
        ? { justifyContent: "flex-end", paddingRight: PX, paddingLeft: "40px" }
        : {
            justifyContent: "flex-start",
            paddingLeft: PX,
            paddingRight: "40px",
          }),
  };

  return (
    <motion.div
      variants={wrapVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="absolute inset-0 z-10"
      style={wrapStyle}
    >
      <div
        style={{
          maxWidth: "480px",
          width: "100%",
          textAlign: isCenter ? "center" : isRight ? "right" : "left",
        }}
      >
        {/* Tag */}
        <motion.p
          variants={itemVariants}
          className="hero-tag"
          style={{ color: "rgba(255,255,255,0.28)", marginBottom: "16px" }}
        >
          {s.tag}
        </motion.p>

        {/* Headline — middle line brightest */}
        <div style={{ marginBottom: "18px" }}>
          {s.headline.map((line, i) => (
            <motion.h1
              key={i}
              variants={itemVariants}
              className="hero-hl"
              style={{
                // ← reduced: was 68px max, now 48px max
                fontSize: "clamp(28px, 3.6vw, 48px)",
                display: "block",
                color:
                  i === 1 ? "rgba(255,255,255,0.93)" : "rgba(255,255,255,0.4)",
              }}
            >
              {line}
            </motion.h1>
          ))}
        </div>

        {/* Sub */}
        <motion.p
          variants={itemVariants}
          className="hero-sub"
          style={{
            color: "rgba(255,255,255,0.34)",
            maxWidth: "360px",
            marginLeft: isCenter || isRight ? "auto" : "0",
            marginRight: isCenter ? "auto" : "0",
          }}
        >
          {s.sub}
        </motion.p>

        {/* CTAs */}
        <motion.div
          variants={itemVariants}
          style={{
            marginTop: "24px",
            display: "flex",
            gap: "10px",
            justifyContent: isCenter
              ? "center"
              : isRight
                ? "flex-end"
                : "flex-start",
          }}
        >
          <a href="#" className="hero-btn-primary">
            {s.cta.primary}
          </a>
          <a href="#" className="hero-btn-secondary">
            {s.cta.secondary}
          </a>
        </motion.div>

        {/* Hairline accent */}
        <motion.div
          variants={itemVariants}
          style={{
            marginTop: "32px",
            height: "1px",
            width: "30px",
            background: "rgba(255,255,255,0.15)",
            marginLeft: isCenter || isRight ? "auto" : "0",
            marginRight: isCenter ? "auto" : isRight ? "0" : "0",
          }}
        />
      </div>
    </motion.div>
  );
}
