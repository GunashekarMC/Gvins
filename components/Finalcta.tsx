"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const NAV_HEIGHT = 64;

// ─── Animated grid lines ──────────────────────────────────────────────────────
function GridLines() {
  return (
    <svg
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        opacity: 0.04,
        zIndex: 1,
      }}
      preserveAspectRatio="none"
    >
      {/* Vertical lines */}
      {[...Array(12)].map((_, i) => (
        <line
          key={`v${i}`}
          x1={`${(i + 1) * (100 / 13)}%`}
          y1="0"
          x2={`${(i + 1) * (100 / 13)}%`}
          y2="100%"
          stroke="rgba(245,244,240,1)"
          strokeWidth="0.5"
        />
      ))}
      {/* Horizontal lines */}
      {[...Array(6)].map((_, i) => (
        <line
          key={`h${i}`}
          x1="0"
          y1={`${(i + 1) * (100 / 7)}%`}
          x2="100%"
          y2={`${(i + 1) * (100 / 7)}%`}
          stroke="rgba(245,244,240,1)"
          strokeWidth="0.5"
        />
      ))}
    </svg>
  );
}

// ─── Floating orb ─────────────────────────────────────────────────────────────
function Orb({
  delay,
  size,
  x,
  y,
  color,
}: {
  delay: number;
  size: number;
  x: string;
  y: string;
  color: string;
}) {
  return (
    <motion.div
      animate={{
        scale: [1, 1.15, 1],
        opacity: [0.12, 0.22, 0.12],
      }}
      transition={{
        duration: 6 + delay,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle at center, ${color}, transparent 70%)`,
        filter: "blur(60px)",
        pointerEvents: "none",
        zIndex: 2,
      }}
    />
  );
}

export default function FinalCTA() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // const [mounted, setMounted] = useState(false);
  // useEffect(() => {
  //   setMounted(true);
  // }, []);
  // if (!mounted) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubmitted(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        .cta-root *, .cta-root *::before, .cta-root *::after {
          box-sizing: border-box; margin: 0; padding: 0;
        }

        .cta-input {
          flex: 1;
          min-width: 0;
          background: rgba(245,244,240,0.04);
          border: 1px solid rgba(245,244,240,0.12);
          border-right: none;
          padding: 13px 20px;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 300;
          color: #f5f4f0;
          outline: none;
          letter-spacing: 0.02em;
          border-radius: 1px 0 0 1px;
          transition: border-color 0.2s, background 0.2s;
        }
        .cta-input::placeholder { color: rgba(245,244,240,0.22); }
        .cta-input:focus {
          border-color: rgba(245,244,240,0.28);
          background: rgba(245,244,240,0.06);
        }

        .cta-submit {
          padding: 13px 28px;
          background: #ffffff;
          color: #000000;
          font-family: 'DM Sans', sans-serif;
          font-size: 9px;
          font-weight: 500;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          border: none;
          border-radius: 0 1px 1px 0;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s, transform 0.18s;
          flex-shrink: 0;
        }
        .cta-submit:hover { background: rgba(255,255,255,0.84); transform: translateY(-1px); }

        .cta-demo-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 14px 40px;
          background: transparent;
          color: rgba(245,244,240,0.5);
          border: 1px solid rgba(245,244,240,0.15);
          font-family: 'DM Sans', sans-serif;
          font-size: 10px;
          font-weight: 400;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          border-radius: 1px;
          cursor: pointer;
          transition: color 0.2s, border-color 0.2s, transform 0.18s;
          text-decoration: none;
        }
        .cta-demo-btn:hover {
          color: rgba(245,244,240,0.88);
          border-color: rgba(245,244,240,0.35);
          transform: translateY(-1px);
        }

        @media (max-width: 600px) {
          .cta-root .cta-inner { padding: 0 28px; }
          .cta-root .cta-form-row { flex-direction: column; }
          .cta-root .cta-input { border-right: 1px solid rgba(245,244,240,0.12); border-bottom: none; border-radius: 1px 1px 0 0; }
          .cta-root .cta-submit { border-radius: 0 0 1px 1px; padding: 12px 20px; }
        }
      `}</style>

      <section
        className="cta-root"
        id="cta"
        style={{
          position: "relative",
          width: "100%",
          minHeight: `calc(100dvh - ${NAV_HEIGHT}px)`,
          overflow: "hidden",
          background: "#030305",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Background elements */}
        <GridLines />
        <Orb
          delay={0}
          size={500}
          x="15%"
          y="10%"
          color="rgba(180,158,200,0.6)"
        />
        <Orb
          delay={2}
          size={400}
          x="65%"
          y="50%"
          color="rgba(168,196,184,0.5)"
        />
        <Orb
          delay={4}
          size={360}
          x="35%"
          y="60%"
          color="rgba(200,169,126,0.4)"
        />

        {/* Radial dark vignette at edges */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 90% 80% at 50% 50%, transparent 40%, rgba(3,3,5,0.7) 100%)",
            zIndex: 3,
            pointerEvents: "none",
          }}
        />

        {/* Top border glow */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "10%",
            right: "10%",
            height: 1,
            background:
              "linear-gradient(to right, transparent, rgba(245,244,240,0.15) 30%, rgba(245,244,240,0.3) 50%, rgba(245,244,240,0.15) 70%, transparent)",
            zIndex: 4,
          }}
        />

        {/* Content */}
        <motion.div
          className="cta-inner"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "relative",
            zIndex: 5,
            maxWidth: 760,
            width: "100%",
            padding: "80px 48px",
            textAlign: "center",
          }}
        >
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 8.5,
              fontWeight: 500,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "rgba(245,244,240,0.28)",
              marginBottom: 28,
            }}
          >
            — Get started today
          </motion.p>

          {/* Main headline */}
          <motion.h2
            initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            transition={{
              duration: 0.7,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(36px, 6vw, 76px)",
              fontWeight: 300,
              fontStyle: "italic",
              lineHeight: 1.08,
              color: "#f5f4f0",
              letterSpacing: "-0.03em",
              marginBottom: 20,
            }}
          >
            The companies that
            <br />
            <span style={{ color: "rgba(245,244,240,0.35)" }}>
              deploy AI today
            </span>
            <br />
            define tomorrow.
          </motion.h2>

          {/* Sub-headline */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.25 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              fontWeight: 300,
              lineHeight: 1.75,
              color: "rgba(245,244,240,0.38)",
              maxWidth: 520,
              margin: "0 auto 44px",
            }}
          >
            From pilot to production in weeks — not quarters. No legacy to rip
            out. No PhDs to hire. Just AI that works the way your business does.
          </motion.p>

          {/* Email capture */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.32 }}
            style={{ maxWidth: 480, margin: "0 auto 20px" }}
          >
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  padding: "16px 24px",
                  border: "1px solid rgba(138,158,136,0.3)",
                  background: "rgba(138,158,136,0.08)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  fontWeight: 300,
                  color: "#8a9e88",
                  letterSpacing: "0.04em",
                  borderRadius: 1,
                }}
              >
                ✓ We'll be in touch within one business day.
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ display: "flex" }}
                className="cta-form-row"
              >
                <input
                  ref={inputRef}
                  type="email"
                  required
                  className="cta-input"
                  placeholder="Your work email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="cta-submit">
                  Book a Demo
                </button>
              </form>
            )}
          </motion.div>

          {/* OR separator */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.38 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              maxWidth: 480,
              margin: "0 auto 20px",
            }}
          >
            <div
              style={{
                flex: 1,
                height: 1,
                background: "rgba(245,244,240,0.08)",
              }}
            />
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 9,
                fontWeight: 500,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "rgba(245,244,240,0.2)",
              }}
            >
              or
            </span>
            <div
              style={{
                flex: 1,
                height: 1,
                background: "rgba(245,244,240,0.08)",
              }}
            />
          </motion.div>

          {/* Demo button */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.42 }}
          >
            <a href="#demo" className="cta-demo-btn">
              Talk to an engineer directly →
            </a>
          </motion.div>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.52 }}
            style={{
              marginTop: 52,
              paddingTop: 32,
              borderTop: "1px solid rgba(245,244,240,0.06)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 32,
              flexWrap: "wrap",
            }}
          >
            {[
              "SOC 2 Type II",
              "ISO 27001",
              "HIPAA compliant",
              "GDPR ready",
              "No credit card",
            ].map((label) => (
              <span
                key={label}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 9,
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  color: "rgba(245,244,240,0.2)",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span
                  style={{
                    width: 4,
                    height: 4,
                    borderRadius: "50%",
                    background: "rgba(245,244,240,0.18)",
                    display: "inline-block",
                  }}
                />
                {label}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
