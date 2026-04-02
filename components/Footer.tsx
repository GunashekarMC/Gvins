"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const footerLinks = {
  Products: [
    { label: "AI Agents", href: "/products/ai-agents" },
    { label: "Automation Studio", href: "/products/automation-studio" },
    { label: "Analytics Engine", href: "/products/analytics-engine" },
    { label: "API & Integrations", href: "/products/api" },
    { label: "Model Hub", href: "/products/model-hub" },
    { label: "Governance", href: "/products/governance" },
  ],
  Solutions: [
    { label: "Finance & FinTech", href: "/solutions/finance" },
    { label: "Healthcare", href: "/solutions/healthcare" },
    { label: "Manufacturing", href: "/solutions/manufacturing" },
    { label: "Retail & E-Commerce", href: "/solutions/retail" },
    { label: "Enterprise", href: "/solutions/enterprise" },
    { label: "Government", href: "/solutions/government" },
  ],
  Resources: [
    { label: "Documentation", href: "/docs" },
    { label: "API Reference", href: "/docs/api" },
    { label: "Blog", href: "/blog" },
    { label: "Case Studies", href: "/case-studies" },
    { label: "Community", href: "/community" },
    { label: "Changelog", href: "/changelog" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Press", href: "/press" },
    { label: "Partners", href: "/partners" },
    { label: "Contact", href: "/contact" },
    { label: "Security", href: "/security" },
  ],
};

const certifications = ["SOC 2 Type II", "ISO 27001", "HIPAA", "GDPR"];

const socialLinks = [
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
          d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="4" cy="4" r="2" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: "X / Twitter",
    href: "#",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 4l16 16M4 20L20 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "#",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.604-3.369-1.34-3.369-1.34-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.607.069-.607 1.004.07 1.532 1.03 1.532 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.547 1.376.203 2.394.1 2.646.64.698 1.026 1.591 1.026 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"
          stroke="currentColor"
          strokeWidth="1.2"
        />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <rect
          x="2"
          y="6"
          width="20"
          height="12"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M10 9l5 3-5 3V9z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subbed, setSubbed] = useState(false);
  // const [mounted, setMounted] = useState(false);
  // useEffect(() => {
  //   setMounted(true);
  // }, []);
  // if (!mounted) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap');

        .footer-root *, .footer-root *::before, .footer-root *::after {
          box-sizing: border-box; margin: 0; padding: 0;
        }

        .footer-link {
          display: block;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 300;
          color: rgba(245,244,240,0.35);
          text-decoration: none;
          padding: 3px 0;
          letter-spacing: 0.02em;
          transition: color 0.2s ease;
          line-height: 1.5;
        }
        .footer-link:hover { color: rgba(245,244,240,0.78); }

        .footer-nl-input {
          flex: 1;
          min-width: 0;
          background: rgba(245,244,240,0.04);
          border: 1px solid rgba(245,244,240,0.10);
          border-right: none;
          padding: 10px 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          font-weight: 300;
          color: #f5f4f0;
          outline: none;
          letter-spacing: 0.02em;
          border-radius: 1px 0 0 1px;
          transition: border-color 0.2s;
        }
        .footer-nl-input::placeholder { color: rgba(245,244,240,0.2); }
        .footer-nl-input:focus { border-color: rgba(245,244,240,0.22); }

        .footer-nl-btn {
          padding: 10px 16px;
          background: #ffffff;
          color: #000000;
          font-family: 'DM Sans', sans-serif;
          font-size: 8.5px;
          font-weight: 500;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          border: none;
          border-radius: 0 1px 1px 0;
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
          transition: background 0.2s;
        }
        .footer-nl-btn:hover { background: rgba(255,255,255,0.84); }

        .footer-social-btn {
          width: 32px;
          height: 32px;
          border: 1px solid rgba(245,244,240,0.08);
          background: transparent;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(245,244,240,0.3);
          cursor: pointer;
          border-radius: 2px;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
          text-decoration: none;
        }
        .footer-social-btn:hover {
          color: rgba(245,244,240,0.8);
          border-color: rgba(245,244,240,0.2);
          background: rgba(245,244,240,0.04);
        }

        .footer-legal-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 9.5px;
          font-weight: 300;
          color: rgba(245,244,240,0.22);
          text-decoration: none;
          letter-spacing: 0.04em;
          transition: color 0.2s;
        }
        .footer-legal-link:hover { color: rgba(245,244,240,0.55); }

        @media (max-width: 860px) {
          .footer-cols { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 540px) {
          .footer-top { flex-direction: column !important; gap: 28px !important; }
          .footer-cols { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>

      <footer
        className="footer-root"
        style={{
          background: "#020204",
          borderTop: "1px solid rgba(245,244,240,0.07)",
          padding: "64px 0 0",
        }}
      >
        {/* ── Top: brand + newsletter ── */}
        <div
          className="footer-top"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "0 48px 48px",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 40,
            borderBottom: "1px solid rgba(245,244,240,0.06)",
          }}
        >
          {/* Brand */}
          <div style={{ flexShrink: 0 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 14,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 28 28" fill="none">
                <path
                  d="M14 2L26 8.5V19.5L14 26L2 19.5V8.5L14 2Z"
                  stroke="rgba(245,244,240,0.8)"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
                <circle cx="14" cy="14" r="3.5" fill="rgba(245,244,240,0.8)" />
                <circle cx="14" cy="14" r="1.2" fill="#020204" />
              </svg>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  color: "rgba(245,244,240,0.85)",
                  textTransform: "uppercase",
                }}
              >
                Gvins AI
              </span>
            </div>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                fontWeight: 300,
                lineHeight: 1.75,
                color: "rgba(245,244,240,0.28)",
                maxWidth: 240,
                marginBottom: 18,
              }}
            >
              Production-grade AI systems for enterprises that refuse to
              compromise on reliability, security, or performance.
            </p>

            {/* Certifications */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {certifications.map((cert) => (
                <span
                  key={cert}
                  style={{
                    padding: "3px 8px",
                    border: "1px solid rgba(245,244,240,0.08)",
                    background: "rgba(245,244,240,0.02)",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 7.5,
                    fontWeight: 500,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "rgba(245,244,240,0.28)",
                    borderRadius: 1,
                  }}
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div style={{ maxWidth: 340, width: "100%" }}>
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 8.5,
                fontWeight: 500,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                color: "rgba(245,244,240,0.22)",
                marginBottom: 10,
              }}
            >
              Intelligence Brief
            </p>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 18,
                fontWeight: 300,
                fontStyle: "italic",
                lineHeight: 1.35,
                color: "rgba(245,244,240,0.65)",
                marginBottom: 16,
                letterSpacing: "-0.01em",
              }}
            >
              AI strategy for people who deploy it.
            </p>
            {subbed ? (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 11,
                  fontWeight: 300,
                  color: "#8a9e88",
                  letterSpacing: "0.03em",
                  padding: "10px 0",
                }}
              >
                ✓ You're on the list. One email a week, no noise.
              </motion.p>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.trim()) setSubbed(true);
                }}
                style={{ display: "flex" }}
              >
                <input
                  type="email"
                  required
                  className="footer-nl-input"
                  placeholder="your@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit" className="footer-nl-btn">
                  Subscribe
                </button>
              </form>
            )}
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 9,
                fontWeight: 300,
                color: "rgba(245,244,240,0.18)",
                marginTop: 8,
                letterSpacing: "0.02em",
              }}
            >
              Weekly · No spam · Unsubscribe anytime
            </p>
          </div>
        </div>

        {/* ── Middle: link columns ── */}
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "44px 48px",
            borderBottom: "1px solid rgba(245,244,240,0.06)",
          }}
        >
          <div
            className="footer-cols"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "32px 24px",
            }}
          >
            {Object.entries(footerLinks).map(([col, links]) => (
              <div key={col}>
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 8.5,
                    fontWeight: 500,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(245,244,240,0.22)",
                    marginBottom: 14,
                  }}
                >
                  {col}
                </p>
                {links.map((link) => (
                  <a key={link.label} href={link.href} className="footer-link">
                    {link.label}
                  </a>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom: legal + social ── */}
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            padding: "20px 48px 28px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          {/* Legal */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 9.5,
                fontWeight: 300,
                color: "rgba(245,244,240,0.18)",
                letterSpacing: "0.04em",
              }}
            >
              © {new Date().getFullYear()} Gvins AI, Inc.
            </span>
            {["Privacy Policy", "Terms of Service", "Cookie Policy", "DPA"].map(
              (item) => (
                <a key={item} href="#" className="footer-legal-link">
                  {item}
                </a>
              ),
            )}
          </div>

          {/* Social icons */}
          <div style={{ display: "flex", gap: 8 }}>
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className="footer-social-btn"
                aria-label={s.label}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
