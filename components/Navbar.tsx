"use client";

import { useState, useRef, useEffect } from "react";

type DropdownItem = { label: string; desc: string; href: string; icon: string };
type NavLink =
  | { label: string; id: string; href: string; dropdown?: undefined }
  | { label: string; id: string; href?: undefined; dropdown: DropdownItem[] };

const languages = [
  { code: "EN", label: "English" },
  { code: "DE", label: "Deutsch" },
  { code: "FR", label: "Français" },
  { code: "JP", label: "日本語" },
  { code: "AR", label: "العربية" },
];

const navLinks: NavLink[] = [
  {
    label: "Products",
    id: "products",
    dropdown: [
      {
        label: "AI Agents",
        desc: "Autonomous workflows at scale",
        href: "#ai-agents",
        icon: "⬡",
      },
      {
        label: "Automation Studio",
        desc: "No-code process builder",
        href: "#automation-studio",
        icon: "⚙",
      },
      {
        label: "Analytics Engine",
        desc: "Real-time intelligence layer",
        href: "#analytics",
        icon: "◈",
      },
      {
        label: "API & Integrations",
        desc: "Connect your entire stack",
        href: "#integrations",
        icon: "⟁",
      },
    ],
  },
  {
    label: "Solutions",
    id: "solutions",
    dropdown: [
      {
        label: "For Enterprises",
        desc: "Scale-ready AI infrastructure",
        href: "#enterprise",
        icon: "▣",
      },
      {
        label: "For Startups",
        desc: "Move fast with AI primitives",
        href: "#startups",
        icon: "◎",
      },
      {
        label: "Finance & FinTech",
        desc: "Compliance-aware automation",
        href: "#finance",
        icon: "◇",
      },
      {
        label: "Healthcare",
        desc: "HIPAA-compliant AI flows",
        href: "#healthcare",
        icon: "✦",
      },
    ],
  },
  { label: "Pricing", id: "pricing", href: "#pricing" },
  {
    label: "Resources",
    id: "resources",
    dropdown: [
      {
        label: "Documentation",
        desc: "Guides, APIs & SDKs",
        href: "#docs",
        icon: "☰",
      },
      {
        label: "Blog",
        desc: "Insights from our team",
        href: "#blog",
        icon: "✐",
      },
      {
        label: "Case Studies",
        desc: "Real results, real customers",
        href: "#case-studies",
        icon: "◉",
      },
      {
        label: "Community",
        desc: "Builders helping builders",
        href: "#community",
        icon: "⌘",
      },
    ],
  },
  { label: "About", id: "about", href: "#about" },
];

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

// ─── WAM-Style Morphing Character ────────────────────────────────────────────
const fontVariants = [
  "'DM Sans', sans-serif",
  "'Georgia', serif",
  "'Courier New', monospace",
  "'Arial Narrow', sans-serif",
  "'Palatino Linotype', serif",
  "'Trebuchet MS', sans-serif",
  "'Impact', sans-serif",
];

const fontStyles = [
  // Sans-serif variations
  {
    family: "Arial, sans-serif",
    weight: 400,
    style: "normal",
    stretch: "normal",
  },
  {
    family: "Arial, sans-serif",
    weight: 700,
    style: "normal",
    stretch: "condensed",
  },
  {
    family: "Helvetica, sans-serif",
    weight: 300,
    style: "normal",
    stretch: "normal",
  },
  {
    family: "Verdana, sans-serif",
    weight: 600,
    style: "normal",
    stretch: "expanded",
  },
  {
    family: "Tahoma, sans-serif",
    weight: 500,
    style: "normal",
    stretch: "normal",
  },

  // Serif
  { family: "Georgia, serif", weight: 400, style: "normal", stretch: "normal" },
  { family: "Georgia, serif", weight: 700, style: "italic", stretch: "normal" },
  {
    family: "Times New Roman, serif",
    weight: 400,
    style: "normal",
    stretch: "normal",
  },
  {
    family: "Times New Roman, serif",
    weight: 700,
    style: "italic",
    stretch: "expanded",
  },
  {
    family: "Palatino, serif",
    weight: 500,
    style: "italic",
    stretch: "normal",
  },

  // Monospace
  {
    family: "Courier New, monospace",
    weight: 400,
    style: "normal",
    stretch: "normal",
  },
  {
    family: "Courier New, monospace",
    weight: 700,
    style: "normal",
    stretch: "condensed",
  },
  {
    family: "Consolas, monospace",
    weight: 400,
    style: "normal",
    stretch: "normal",
  },

  // Fancy / expressive
  {
    family: "Impact, sans-serif",
    weight: 900,
    style: "normal",
    stretch: "condensed",
  },
  {
    family: "Trebuchet MS, sans-serif",
    weight: 700,
    style: "normal",
    stretch: "normal",
  },
  {
    family: "Lucida Console, monospace",
    weight: 400,
    style: "normal",
    stretch: "expanded",
  },

  // Stretch experiments
  {
    family: "Arial, sans-serif",
    weight: 900,
    style: "normal",
    stretch: "ultra-condensed",
  },
  {
    family: "Arial, sans-serif",
    weight: 200,
    style: "normal",
    stretch: "expanded",
  },

  // Italic combos
  {
    family: "Georgia, serif",
    weight: 300,
    style: "italic",
    stretch: "condensed",
  },
  {
    family: "Verdana, sans-serif",
    weight: 800,
    style: "italic",
    stretch: "expanded",
  },

  // Add more variations (copy pattern)
  ...Array.from({ length: 30 }).map(() => ({
    family: ["Arial", "Georgia", "Verdana", "Courier New", "Trebuchet MS"][
      Math.floor(Math.random() * 5)
    ],
    weight: [300, 400, 500, 600, 700, 800, 900][Math.floor(Math.random() * 7)],
    style: Math.random() > 0.7 ? "italic" : "normal",
    stretch: ["normal", "condensed", "expanded"][Math.floor(Math.random() * 3)],
  })),
];

function MorphingChar({
  char,
  index,
  isSpace,
  hovered,
}: {
  char: string;
  index: number;
  isSpace: boolean;
  hovered: boolean;
}) {
  const [currentStyle, setCurrentStyle] = useState(0);

  useEffect(() => {
    setCurrentStyle(Math.floor(Math.random() * fontStyles.length));
  }, []); // runs only on client after hydration
  const [nextStyle, setNextStyle] = useState(1);
  const [morphProgress, setMorphProgress] = useState(0);
  const [isMorphing, setIsMorphing] = useState(false);
  const animRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isSpace) return;

    const startMorph = () => {
      const next = Math.floor(Math.random() * fontStyles.length);
      setNextStyle(next);
      setIsMorphing(true);
      setMorphProgress(0);

      const duration = 300;
      const startTime = performance.now();

      const animate = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased =
          progress < 0.5
            ? 2 * progress * progress
            : -1 + (4 - 2 * progress) * progress;

        setMorphProgress(eased);

        if (progress < 1) {
          animRef.current = requestAnimationFrame(animate);
        } else {
          setCurrentStyle(next);
          setIsMorphing(false);
          setMorphProgress(0);
          scheduleNext();
        }
      };

      animRef.current = requestAnimationFrame(animate);
    };

    const scheduleNext = () => {
      const delay = 1000 + index * 300 + Math.random() * 500;
      timerRef.current = setTimeout(startMorph, delay);
    };

    scheduleNext();

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [isSpace]);

  if (isSpace) {
    return <span style={{ display: "inline-block", width: "0.3em" }} />;
  }

  const curFont = fontStyles[currentStyle];
  const nxtFont = fontStyles[nextStyle];

  return (
    <span
      style={{
        display: "inline-block",
        position: "relative",
        width: "0.85em",
        height: "1.5em",
        verticalAlign: "visible",
        overflow: "hidden",
        transform: hovered ? "translateY(-1px)" : "translateY(0px)",
        transition: "transform 0.4s ease",
      }}
    >
      {/* Current character fading out */}
      <span
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: curFont.family,
          fontWeight: curFont.weight,
          fontStyle: curFont.style,
          fontStretch: curFont.stretch,
          fontSize: "18px",
          color: "white",
          opacity: isMorphing ? 1 - morphProgress : 1,
          whiteSpace: "nowrap",
          transition: "none",
          lineHeight: "1.2em",
        }}
      >
        {char}
      </span>
      {/* Next character fading in */}
      {isMorphing && (
        <span
          style={{
            position: "absolute",
            top: 0,
            left: "50%",
            transform: `translateX(-50%) scaleY(${0.6 + morphProgress * 0.4})`,
            transformOrigin: "center bottom",
            fontFamily: nxtFont.family,
            fontWeight: nxtFont.weight,
            fontStyle: nxtFont.style,
            fontStretch: nxtFont.stretch,
            fontSize: "13px",
            color: "white",
            opacity: morphProgress,
            whiteSpace: "nowrap",
            transition: "none",
            lineHeight: "1.2em",
          }}
        >
          {char}
        </span>
      )}
    </span>
  );
}

// ─── Animated Logo ────────────────────────────────────────────────────────────
function AnimatedLogo() {
  const text = "Gvins AI";
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="flex items-center gap-2.5 shrink-0"
      aria-label="Gvins AI home"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ textDecoration: "none" }}
    >
      <svg
        width="22"
        height="22"
        viewBox="0 0 28 28"
        fill="none"
        style={{
          transform: "scale(1)",
        }}
      >
        <path
          d="M14 2L26 8.5V19.5L14 26L2 19.5V8.5L14 2Z"
          stroke="white"
          strokeWidth="1.2"
          strokeLinejoin="round"
        />
        <circle cx="14" cy="14" r="3.5" fill="white" />
        <circle cx="14" cy="14" r="1.2" fill="black" />
      </svg>

      {/* WAM-style morphing text */}
      <span
        aria-label={text}
        style={{
          display: "inline-flex",
          alignItems: "flex-end",
          gap: "0px",
          letterSpacing: hovered ? "0.25em" : "0.12em",
          transition:
            "letter-spacing 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        {text.split("").map((char, i) => (
          <MorphingChar
            key={i}
            char={char}
            index={i}
            isSpace={char === " "}
            hovered={hovered}
          />
        ))}
      </span>
    </a>
  );
}

// ─── Dropdown Panel ──────────────────────────────────────────────────────────
function DropdownPanel({ items }: { items: DropdownItem[] }) {
  return (
    <div
      className="absolute z-50"
      style={{
        top: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        paddingTop: "8px",
      }}
    >
      <div className="w-80">
        <div className="mx-auto mb-0 w-px h-3 bg-white/10" />
        <div
          style={{
            border: "1px solid rgba(255,255,255,0.10)",
            background: "rgba(8,8,10,0.97)",
            backdropFilter: "blur(24px)",
            padding: "6px",
          }}
        >
          <p
            className="px-4 pt-3 pb-2 text-white/25 uppercase"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "9px",
              fontWeight: 600,
              letterSpacing: "0.2em",
            }}
          >
            Overview
          </p>
          {items.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group flex items-start gap-3 px-4 py-3 transition-colors duration-200 hover:bg-white/5"
            >
              <span
                className="mt-0.5 w-6 h-6 flex items-center justify-center text-white/30 border border-white/10 shrink-0 group-hover:text-white/60 group-hover:border-white/20 transition-colors duration-200"
                style={{ fontSize: "11px" }}
              >
                {item.icon}
              </span>
              <span className="flex flex-col gap-0.5">
                <span
                  className="text-white/70 group-hover:text-white transition-colors duration-200"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "12px",
                    letterSpacing: "0.05em",
                  }}
                >
                  {item.label}
                </span>
                <span
                  className="text-white/25"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "10px",
                  }}
                >
                  {item.desc}
                </span>
              </span>
              <span className="ml-auto self-center text-white/15 group-hover:text-white/40 text-xs transition-colors duration-200">
                →
              </span>
            </a>
          ))}
          <div className="mx-3 mb-2 mt-1 px-4 py-3 border-t border-white/8 flex items-center justify-between">
            <span
              className="text-white/25"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "10px",
              }}
            >
              Need help choosing?
            </span>
            <a
              href="#contact"
              className="text-white/50 hover:text-white transition-colors duration-200 uppercase"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "10px",
                letterSpacing: "0.1em",
              }}
            >
              Talk to sales →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Language Panel ──────────────────────────────────────────────────────────
function LanguagePanel({
  current,
  onSelect,
}: {
  current: string;
  onSelect: (code: string) => void;
}) {
  return (
    <div
      className="absolute z-50"
      style={{
        top: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        paddingTop: "8px",
      }}
    >
      <div className="w-44">
        <div className="mx-auto mb-0 w-px h-4 bg-white/10" />
        <div
          style={{
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(8,8,10,0.97)",
            backdropFilter: "blur(24px)",
            padding: "4px",
          }}
        >
          <p
            className="px-4 pt-3 pb-2 text-white/25 uppercase"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "9px",
              fontWeight: 600,
              letterSpacing: "0.2em",
            }}
          >
            Language
          </p>
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => onSelect(lang.code)}
              className={`w-full flex items-center justify-between px-4 py-2.5 transition-colors duration-200 hover:bg-white/5 ${
                current === lang.code
                  ? "text-white"
                  : "text-white/35 hover:text-white/70"
              }`}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "12px",
                letterSpacing: "0.08em",
              }}
            >
              <span>{lang.label}</span>
              {current === lang.code && (
                <span className="w-1 h-1 rounded-full bg-white" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main Navbar ─────────────────────────────────────────────────────────────
export default function Navbar() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [showLang, setShowLang] = useState(false);
  const [currentLang, setCurrentLang] = useState("EN");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      for (const item of [...navLinks].reverse()) {
        const el = document.getElementById(item.id);
        if (el && scrollTop >= el.offsetTop - 120) {
          setActiveSection(item.id);
          return;
        }
      }
      setActiveSection("");
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
        setShowLang(false);
        setMobileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header
      ref={navRef}
      style={{
        opacity: visible ? 1 : 0,
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background:
          scrollProgress > 0 ? "rgba(4, 4, 6, 0.72)" : "rgba(0,0,0,0.0)",
        backdropFilter: scrollProgress > 0 ? "blur(18px)" : "none",
        WebkitBackdropFilter: scrollProgress > 0 ? "blur(18px)" : "none",
        transition:
          "opacity 0.8s ease, background 0.4s ease, backdrop-filter 0.4s ease",
      }}
    >
      <div className="relative flex items-center justify-between px-8 md:px-16 py-3 md:py-4">
        <AnimatedLogo />

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div
                key={link.id}
                className="relative"
                onMouseEnter={() => {
                  setOpenMenu(link.id);
                  setShowLang(false);
                }}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  className={`flex items-center gap-1 px-2 py-1 relative transition-colors duration-300 ${
                    activeSection === link.id || openMenu === link.id
                      ? "text-white"
                      : "text-white/45 hover:text-white"
                  }`}
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  {link.label}
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="none"
                    style={{
                      transition: "transform 0.3s",
                      transform:
                        openMenu === link.id
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                    }}
                  >
                    <path
                      d="M1 2.5L4 5.5L7 2.5"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                  {activeSection === link.id && (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white" />
                  )}
                </button>
                <div
                  style={{
                    transition: "opacity 0.2s, transform 0.2s",
                    opacity: openMenu === link.id ? 1 : 0,
                    pointerEvents: openMenu === link.id ? "auto" : "none",
                    transform:
                      openMenu === link.id
                        ? "translateY(0)"
                        : "translateY(-4px)",
                  }}
                >
                  <DropdownPanel items={link.dropdown} />
                </div>
              </div>
            ) : (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.id);
                }}
                className={`px-2 py-1 relative transition-colors duration-300 ${
                  activeSection === link.id
                    ? "text-white"
                    : "text-white/45 hover:text-white"
                }`}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                {link.label}
                {activeSection === link.id && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white" />
                )}
              </a>
            ),
          )}
        </nav>

        {/* Right CTAs */}
        <div className="hidden md:flex items-center gap-5">
          <div
            className="relative"
            onMouseEnter={() => {
              setShowLang(true);
              setOpenMenu(null);
            }}
            onMouseLeave={() => setShowLang(false)}
          >
            <button
              className="flex items-center gap-1.5 text-white/40 hover:text-white transition-colors duration-300"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <circle
                  cx="6"
                  cy="6"
                  r="5"
                  stroke="currentColor"
                  strokeWidth="1"
                />
                <path
                  d="M6 1C6 1 4 3.5 4 6s2 5 2 5M6 1c0 0 2 2.5 2 5s-2 5-2 5M1 6h10"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                />
              </svg>
              {currentLang}
              <svg
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
                style={{
                  transition: "transform 0.3s",
                  transform: showLang ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                <path
                  d="M1 2.5L4 5.5L7 2.5"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div
              style={{
                transition: "opacity 0.2s, transform 0.2s",
                opacity: showLang ? 1 : 0,
                pointerEvents: showLang ? "auto" : "none",
                transform: showLang ? "translateY(0)" : "translateY(-4px)",
              }}
            >
              <LanguagePanel
                current={currentLang}
                onSelect={(code) => {
                  setCurrentLang(code);
                  setShowLang(false);
                }}
              />
            </div>
          </div>

          <span className="w-px h-3.5 bg-white/10" />

          <a
            href="#login"
            className="text-white/40 hover:text-white transition-colors duration-300"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            Sign in
          </a>

          <a
            href="#demo"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("demo");
            }}
            className="flex items-center justify-center px-5 py-2 bg-white text-black transition-all duration-300 hover:bg-white/85 active:scale-[0.97]"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              borderRadius: "1px",
            }}
          >
            Book a Demo
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => {
            if (mobileOpen) {
              setMobileExpanded(null); // Clear expanded dropdown when closing menu
            }
            setMobileOpen(!mobileOpen);
          }}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-px bg-white transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-5 h-px bg-white transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-px bg-white transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Scroll Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-white/10">
        <div
          className="h-full bg-white origin-left"
          style={{
            transform: `scaleX(${scrollProgress / 100})`,
            transition: "transform 0.5s ease-out",
          }}
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 overflow-hidden transition-all duration-500 ${mobileOpen ? "max-h-screen" : "max-h-0"}`}
        style={{
          background: "rgba(8,8,10,0.97)",
          backdropFilter: "blur(24px)",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="px-8 py-6 flex flex-col gap-1">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.id}>
                <button
                  onClick={() =>
                    setMobileExpanded(
                      mobileExpanded === link.id ? null : link.id,
                    )
                  }
                  className="w-full flex items-center justify-between py-3 text-white/45 hover:text-white transition-colors duration-200"
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "11px",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                  }}
                >
                  {link.label}
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="none"
                    style={{
                      transition: "transform 0.3s",
                      transform:
                        mobileExpanded === link.id
                          ? "rotate(180deg)"
                          : "rotate(0deg)",
                    }}
                  >
                    <path
                      d="M1 2.5L4 5.5L7 2.5"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${mobileExpanded === link.id ? "max-h-96" : "max-h-0"}`}
                >
                  <div
                    className="ml-1 pl-4 mb-2 flex flex-col gap-1"
                    style={{ borderLeft: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    {link.dropdown.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-2.5 py-2 text-white/30 hover:text-white transition-colors duration-200"
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: "11px",
                        }}
                      >
                        <span
                          className="text-white/20"
                          style={{ fontSize: "10px" }}
                        >
                          {item.icon}
                        </span>
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <a
                key={link.id}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.id);
                  setMobileOpen(false);
                }}
                className="py-3 text-white/45 hover:text-white transition-colors duration-200"
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "11px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                {link.label}
              </a>
            ),
          )}

          {/* Mobile Language Selector */}
          <div
            className="pt-4 flex flex-wrap gap-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setCurrentLang(lang.code)}
                className={`transition-colors duration-200 ${currentLang === lang.code ? "text-white" : "text-white/25 hover:text-white/60"}`}
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "10px",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                }}
              >
                {lang.code}
              </button>
            ))}
          </div>

          <div className="pt-4 flex flex-col gap-3">
            <a
              href="#login"
              className="text-center py-3 text-white/35 hover:text-white transition-colors duration-200"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                border: "1px solid rgba(255,255,255,0.10)",
              }}
            >
              Sign in
            </a>
            <a
              href="#demo"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection("demo");
                setMobileOpen(false);
              }}
              className="text-center py-3 font-medium bg-white text-black"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "11px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Book a Demo
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
