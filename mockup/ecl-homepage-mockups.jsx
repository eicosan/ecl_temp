import { useState, useEffect, useRef, useCallback } from "react";

const themes = {
  navyGold: {
    name: "Navy & Gold",
    subtitle: "Klassisch-Autoritär",
    fonts: {
      heading: "'Playfair Display', Georgia, serif",
      body: "'DM Sans', system-ui, sans-serif",
    },
    colors: {
      heroBg: "#0F1B33",
      heroText: "#FFFFFF",
      heroAccent: "#C5A47E",
      heroSubtle: "rgba(197,164,126,0.15)",
      navBg: "rgba(15,27,51,0.95)",
      navText: "#FFFFFF",
      navAccent: "#C5A47E",
      bg: "#FFFFFF",
      bgAlt: "#F7F3EF",
      bgDark: "#0F1B33",
      text: "#1A1A1A",
      textSecondary: "#5D5D5D",
      textOnDark: "#E8E2DA",
      accent: "#C5A47E",
      accentHover: "#D4B48E",
      border: "#E8E0D6",
      cardBg: "#FFFFFF",
      cardBorder: "#E8E0D6",
      cardHoverBorder: "#C5A47E",
      footerBg: "#0A1225",
      footerText: "#A0A8B8",
      footerAccent: "#C5A47E",
      tagBg: "rgba(197,164,126,0.12)",
      tagText: "#8B7355",
      gradientOverlay: "linear-gradient(135deg, rgba(15,27,51,0.97) 0%, rgba(25,40,72,0.92) 50%, rgba(15,27,51,0.95) 100%)",
    },
  },
  charcoalTeal: {
    name: "Charcoal & Teal",
    subtitle: "Tech-Forward",
    fonts: {
      heading: "'Syne', system-ui, sans-serif",
      body: "'DM Sans', system-ui, sans-serif",
    },
    colors: {
      heroBg: "#0D0D1A",
      heroText: "#FFFFFF",
      heroAccent: "#49C5B6",
      heroSubtle: "rgba(73,197,182,0.1)",
      navBg: "rgba(13,13,26,0.95)",
      navText: "#FFFFFF",
      navAccent: "#49C5B6",
      bg: "#FFFFFF",
      bgAlt: "#F5F5F7",
      bgDark: "#0D0D1A",
      text: "#141414",
      textSecondary: "#6B6B80",
      textOnDark: "#C8C8D8",
      accent: "#49C5B6",
      accentHover: "#5DD4C5",
      border: "#E0E0E8",
      cardBg: "#FFFFFF",
      cardBorder: "#E0E0E8",
      cardHoverBorder: "#49C5B6",
      footerBg: "#08081A",
      footerText: "#8888A0",
      footerAccent: "#49C5B6",
      tagBg: "rgba(73,197,182,0.1)",
      tagText: "#2E9A8E",
      gradientOverlay: "linear-gradient(135deg, rgba(13,13,26,0.97) 0%, rgba(20,20,40,0.92) 50%, rgba(13,13,26,0.95) 100%)",
    },
  },
  blackCopper: {
    name: "Off-Black & Kupfer",
    subtitle: "Boutique-Luxus",
    fonts: {
      heading: "'Cormorant Garamond', Georgia, serif",
      body: "'Plus Jakarta Sans', system-ui, sans-serif",
    },
    colors: {
      heroBg: "#1C1C1E",
      heroText: "#FAF5EF",
      heroAccent: "#B87333",
      heroSubtle: "rgba(184,115,51,0.12)",
      navBg: "rgba(28,28,30,0.95)",
      navText: "#FAF5EF",
      navAccent: "#B87333",
      bg: "#FAF5EF",
      bgAlt: "#F0E8DD",
      bgDark: "#1C1C1E",
      text: "#1C1C1E",
      textSecondary: "#6E6560",
      textOnDark: "#D4C8BA",
      accent: "#B87333",
      accentHover: "#CB8544",
      border: "#DDD5CA",
      cardBg: "#FFFCF8",
      cardBorder: "#DDD5CA",
      cardHoverBorder: "#B87333",
      footerBg: "#141414",
      footerText: "#8A8078",
      footerAccent: "#B87333",
      tagBg: "rgba(184,115,51,0.1)",
      tagText: "#96612E",
      gradientOverlay: "linear-gradient(135deg, rgba(28,28,30,0.97) 0%, rgba(40,36,32,0.92) 50%, rgba(28,28,30,0.95) 100%)",
    },
  },
};

const practiceAreas = [
  {
    title: "KI-Recht & EU AI Act",
    desc: "Regulatorische Beratung zur Einhaltung des EU AI Act — Risikoklassifizierung, Compliance-Strategien und Governance-Frameworks.",
    icon: "◈",
  },
  {
    title: "Datenschutz & IT-Recht",
    desc: "DSGVO-Compliance, Datenschutz-Folgenabschätzungen und grenzüberschreitende Datenübermittlung.",
    icon: "◎",
  },
  {
    title: "Gesellschafts- & Handelsrecht",
    desc: "Gesellschaftsrechtliche Strukturierung, Corporate Governance und regulatorische Anforderungen.",
    icon: "◇",
  },
  {
    title: "Vertragsgestaltung",
    desc: "Maßgeschneiderte Vertragswerke für technologiegetriebene Geschäftsmodelle und internationale Transaktionen.",
    icon: "▣",
  },
  {
    title: "Grenzüberschreitende Rechtsberatung",
    desc: "Multi-jurisdiktionale Beratung in der EU, dem Vereinigten Königreich und Griechenland.",
    icon: "◆",
  },
  {
    title: "Private Mandate & Vorsorge",
    desc: "Vorsorgevollmachten, Patientenverfügungen und private Vermögensplanung.",
    icon: "◯",
  },
];

const qualifications = [
  { label: "Solicitor", detail: "England & Wales (SRA)" },
  { label: "Δικηγόρος", detail: "Griechenland (Thessaloniki Bar)" },
  { label: "Syndikusrechtsanwältin", detail: "Deutschland (RAK Frankfurt)" },
  { label: "LL.M.", detail: "Europäisches & Internationales Wirtschaftsrecht" },
  { label: "LL.M.", detail: "Transnational Law (University of London)" },
];

function useScrollReveal() {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, isVisible];
}

function AnimatedSection({ children, delay = 0, style = {} }) {
  const [ref, isVisible] = useScrollReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0)" : "translateY(32px)",
        transition: `opacity 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s, transform 0.8s cubic-bezier(0.22,1,0.36,1) ${delay}s`,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Logo({ color = "#B5A036", textColor = "#FFF", size = 40 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        <path d="M55 10C30 10 12 28 12 52s18 42 43 42c8 0 16-2 22-6" stroke={color} strokeWidth="5.5" fill="none" strokeLinecap="round"/>
        <path d="M70 20C60 14 48 14 38 20s-16 18-16 32c0 14 6 26 16 32" stroke={color} strokeWidth="4.5" fill="none" strokeLinecap="round"/>
        <text x="34" y="64" fontFamily="'Playfair Display','Cormorant Garamond',Georgia,serif" fontSize="38" fontWeight="600" fill={color} fontStyle="italic">L</text>
      </svg>
      <div>
        <div style={{ fontFamily: "'Playfair Display','Cormorant Garamond',Georgia,serif", fontSize: 16, fontWeight: 600, color: textColor, letterSpacing: "0.02em", lineHeight: 1.2 }}>
          Eirini C. Lika
        </div>
        <div style={{ fontFamily: "'DM Sans','Plus Jakarta Sans',system-ui,sans-serif", fontSize: 9.5, color: color, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 500, marginTop: 1 }}>
          International Boutique Law Practice
        </div>
      </div>
    </div>
  );
}

export default function ECLHomepageMockups() {
  const [activeTheme, setActiveTheme] = useState("navyGold");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);
  const t = themes[activeTheme];
  const c = t.colors;

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width - 0.5,
      y: (e.clientY - rect.top) / rect.height - 0.5,
    });
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=DM+Sans:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        ::selection { background: ${c.accent}33; color: ${c.text}; }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes lineGrow { from { width:0; } to { width:64px; } }
        @keyframes pulseSubtle { 0%,100%{opacity:0.4;} 50%{opacity:0.7;} }
        @keyframes float1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(12px,-18px)} }
        @keyframes float2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-15px,12px)} }
        @keyframes float3 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(8px,14px)} }
      `}</style>

      {/* Theme Switcher Bar */}
      <div style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        background: "rgba(20,20,20,0.92)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "10px 0",
      }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
          <span style={{ fontFamily: "'DM Sans',sans-serif", fontSize: 12, color: "#888", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 500 }}>
            Designkonzept — Farbpalette wählen
          </span>
          <div style={{ display: "flex", gap: 6 }}>
            {Object.entries(themes).map(([key, theme]) => (
              <button
                key={key}
                onClick={() => setActiveTheme(key)}
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 13,
                  padding: "8px 18px",
                  borderRadius: 6,
                  border: activeTheme === key ? `1.5px solid ${theme.colors.accent}` : "1.5px solid rgba(255,255,255,0.12)",
                  background: activeTheme === key ? `${theme.colors.accent}18` : "transparent",
                  color: activeTheme === key ? theme.colors.accent : "#AAA",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  fontWeight: activeTheme === key ? 600 : 400,
                }}
              >
                <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: theme.colors.accent, marginRight: 8, verticalAlign: "middle" }} />
                {theme.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div style={{ fontFamily: t.fonts.body, color: c.text, background: c.bg }}>

        {/* ========== NAV ========== */}
        <nav style={{
          position: "fixed", top: 48, left: 0, right: 0, zIndex: 900,
          background: c.navBg, backdropFilter: "blur(16px)",
          borderBottom: `1px solid rgba(255,255,255,0.06)`,
          padding: "14px 0",
          transition: "all 0.5s ease",
        }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Logo color={c.navAccent} textColor={c.navText} size={36} />
            <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
              {["Kanzlei", "Tätigkeitsbereiche", "Insights", "Kontakt"].map((item) => (
                <a key={item} href="#" style={{
                  fontFamily: t.fonts.body, fontSize: 14, fontWeight: 500, color: c.navText,
                  textDecoration: "none", opacity: 0.8, letterSpacing: "0.01em",
                  transition: "opacity 0.3s",
                }}
                onMouseEnter={e => e.target.style.opacity = "1"}
                onMouseLeave={e => e.target.style.opacity = "0.8"}
                >
                  {item}
                </a>
              ))}
              <span style={{
                fontFamily: t.fonts.body, fontSize: 13, fontWeight: 600, color: c.accent,
                padding: "8px 20px", border: `1.5px solid ${c.accent}`,
                borderRadius: 4, cursor: "pointer", letterSpacing: "0.03em",
                transition: "all 0.3s",
              }}>
                Beratungsgespräch
              </span>
            </div>
          </div>
        </nav>

        {/* ========== HERO ========== */}
        <section
          ref={heroRef}
          onMouseMove={handleMouseMove}
          style={{
            minHeight: "100vh",
            background: c.heroBg,
            position: "relative",
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            paddingTop: 120,
            transition: "background 0.6s ease",
          }}
        >
          {/* Kinetic background elements */}
          <div style={{ position: "absolute", inset: 0, overflow: "hidden", opacity: 0.5 }}>
            <div style={{
              position: "absolute", width: 600, height: 600, borderRadius: "50%",
              background: `radial-gradient(circle, ${c.heroAccent}15 0%, transparent 70%)`,
              top: "10%", right: "-10%",
              transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`,
              transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1)",
              animation: "float1 20s ease-in-out infinite",
            }} />
            <div style={{
              position: "absolute", width: 400, height: 400, borderRadius: "50%",
              background: `radial-gradient(circle, ${c.heroAccent}10 0%, transparent 70%)`,
              bottom: "5%", left: "5%",
              transform: `translate(${mousePos.x * 15}px, ${mousePos.y * 15}px)`,
              transition: "transform 0.8s cubic-bezier(0.22,1,0.36,1)",
              animation: "float2 25s ease-in-out infinite",
            }} />
            <div style={{
              position: "absolute", width: 200, height: 200, borderRadius: "50%",
              border: `1px solid ${c.heroAccent}15`,
              top: "40%", left: "30%",
              transform: `translate(${mousePos.x * 25}px, ${mousePos.y * 25}px)`,
              transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
              animation: "float3 18s ease-in-out infinite",
            }} />
            {/* Grid overlay */}
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: `linear-gradient(${c.heroAccent}05 1px, transparent 1px), linear-gradient(90deg, ${c.heroAccent}05 1px, transparent 1px)`,
              backgroundSize: "80px 80px",
              transform: `translateY(${scrollY * 0.1}px)`,
            }} />
          </div>

          {/* Hero content */}
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 2, width: "100%" }}>
            <div style={{ maxWidth: 820 }}>
              {/* Tagline */}
              <div style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                marginBottom: 32, padding: "6px 16px 6px 6px",
                background: c.heroSubtle, borderRadius: 100,
                border: `1px solid ${c.heroAccent}20`,
                animation: "fadeInUp 0.8s ease-out",
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.heroAccent }} />
                <span style={{ fontFamily: t.fonts.body, fontSize: 12, fontWeight: 500, color: c.heroAccent, letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  EU AI Act · DSGVO · Grenzüberschreitend
                </span>
              </div>

              {/* H1 */}
              <h1 style={{
                fontFamily: t.fonts.heading,
                fontSize: activeTheme === "charcoalTeal" ? 54 : 58,
                fontWeight: activeTheme === "blackCopper" ? 400 : 600,
                color: c.heroText,
                lineHeight: 1.1,
                letterSpacing: activeTheme === "charcoalTeal" ? "-0.03em" : "-0.02em",
                marginBottom: 28,
                animation: "fadeInUp 0.8s ease-out 0.15s both",
              }}>
                Internationale Rechts&shy;beratung an der Schnitt&shy;stelle von{" "}
                <span style={{ color: c.heroAccent, fontStyle: activeTheme === "blackCopper" ? "italic" : "normal" }}>
                  Regulierung
                </span>{" "}
                und{" "}
                <span style={{ color: c.heroAccent, fontStyle: activeTheme === "blackCopper" ? "italic" : "normal" }}>
                  Technologie
                </span>
              </h1>

              {/* Subline */}
              <p style={{
                fontFamily: t.fonts.body,
                fontSize: 18,
                color: c.textOnDark,
                lineHeight: 1.7,
                maxWidth: 600,
                marginBottom: 44,
                animation: "fadeInUp 0.8s ease-out 0.3s both",
                fontWeight: 300,
              }}>
                Spezialisierte Beratung in KI-Regulierung, Datenschutz und grenzüberschreitendem Wirtschaftsrecht — in der Europäischen Union, dem Vereinigten Königreich und Griechenland.
              </p>

              {/* CTA area */}
              <div style={{ display: "flex", gap: 16, alignItems: "center", animation: "fadeInUp 0.8s ease-out 0.45s both" }}>
                <button style={{
                  fontFamily: t.fonts.body, fontSize: 14, fontWeight: 600,
                  padding: "14px 32px", background: c.heroAccent, color: c.heroBg,
                  border: "none", borderRadius: 4, cursor: "pointer",
                  letterSpacing: "0.03em",
                  transition: "all 0.3s",
                }}>
                  Erstgespräch vereinbaren
                </button>
                <button style={{
                  fontFamily: t.fonts.body, fontSize: 14, fontWeight: 500,
                  padding: "14px 32px", background: "transparent",
                  color: c.heroText, border: `1.5px solid rgba(255,255,255,0.2)`,
                  borderRadius: 4, cursor: "pointer", letterSpacing: "0.02em",
                  transition: "all 0.3s",
                }}>
                  Tätigkeitsbereiche
                </button>
              </div>

              {/* Jurisdiction badges */}
              <div style={{ display: "flex", gap: 24, marginTop: 56, animation: "fadeInUp 0.8s ease-out 0.6s both" }}>
                {[
                  { flag: "🇪🇺", name: "Europäische Union" },
                  { flag: "🇬🇧", name: "Vereinigtes Königreich" },
                  { flag: "🇬🇷", name: "Griechenland" },
                ].map((j) => (
                  <div key={j.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 18 }}>{j.flag}</span>
                    <span style={{ fontFamily: t.fonts.body, fontSize: 13, color: `${c.heroText}88`, fontWeight: 400, letterSpacing: "0.01em" }}>
                      {j.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom fade */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, height: 120,
            background: `linear-gradient(transparent, ${c.bg})`,
          }} />
        </section>

        {/* ========== ABOUT / PRACTICE OVERVIEW ========== */}
        <section style={{ padding: "100px 0 80px", background: c.bg, transition: "background 0.5s" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
              <AnimatedSection>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 48, height: 1, background: c.accent }} />
                  <span style={{ fontFamily: t.fonts.body, fontSize: 12, fontWeight: 600, color: c.accent, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                    Über die Kanzlei
                  </span>
                </div>
                <h2 style={{
                  fontFamily: t.fonts.heading,
                  fontSize: activeTheme === "charcoalTeal" ? 36 : 40,
                  fontWeight: activeTheme === "blackCopper" ? 400 : 600,
                  color: c.text,
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  marginBottom: 24,
                }}>
                  Spezialisiert auf die rechtlichen Herausforderungen der{" "}
                  <span style={{ color: c.accent }}>digitalen Transformation</span>
                </h2>
                <p style={{ fontSize: 17, color: c.textSecondary, lineHeight: 1.75, marginBottom: 20, fontWeight: 300 }}>
                  Die Kanzlei Eirini C. Lika LL.M verbindet tiefgreifende Expertise im europäischen Regulierungsrecht mit einem praxisorientierten Ansatz für Unternehmen, die an der Schnittstelle von Technologie und Recht operieren.
                </p>
                <p style={{ fontSize: 17, color: c.textSecondary, lineHeight: 1.75, fontWeight: 300 }}>
                  Mit Zulassungen in drei Jurisdiktionen und drei Arbeitssprachen bietet die Kanzlei eine einzigartige Perspektive auf grenzüberschreitende Fragestellungen — von der KI-Governance über den Datenschutz bis zur internationalen Vertragsgestaltung.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.15}>
                <div style={{
                  background: c.bgAlt, borderRadius: 8, padding: 40,
                  border: `1px solid ${c.border}`,
                  transition: "background 0.5s, border-color 0.5s",
                }}>
                  <h3 style={{ fontFamily: t.fonts.heading, fontSize: 20, fontWeight: 600, color: c.text, marginBottom: 28, letterSpacing: "-0.01em" }}>
                    Qualifikationen & Zulassungen
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    {qualifications.map((q, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, paddingBottom: i < qualifications.length - 1 ? 16 : 0, borderBottom: i < qualifications.length - 1 ? `1px solid ${c.border}` : "none" }}>
                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: c.accent, marginTop: 8, flexShrink: 0 }} />
                        <div>
                          <div style={{ fontFamily: t.fonts.body, fontSize: 15, fontWeight: 600, color: c.text }}>{q.label}</div>
                          <div style={{ fontFamily: t.fonts.body, fontSize: 14, color: c.textSecondary, marginTop: 2 }}>{q.detail}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 10, marginTop: 28, flexWrap: "wrap" }}>
                    {["Deutsch", "English", "Ελληνικά"].map((lang) => (
                      <span key={lang} style={{
                        fontFamily: t.fonts.body, fontSize: 12, fontWeight: 500,
                        padding: "5px 14px", borderRadius: 100,
                        background: c.tagBg, color: c.tagText,
                        letterSpacing: "0.02em",
                      }}>
                        {lang}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* ========== PRACTICE AREAS ========== */}
        <section style={{ padding: "80px 0 100px", background: c.bgAlt, transition: "background 0.5s" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
            <AnimatedSection>
              <div style={{ textAlign: "center", marginBottom: 60 }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 48, height: 1, background: c.accent }} />
                  <span style={{ fontFamily: t.fonts.body, fontSize: 12, fontWeight: 600, color: c.accent, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                    Tätigkeitsbereiche
                  </span>
                  <div style={{ width: 48, height: 1, background: c.accent }} />
                </div>
                <h2 style={{
                  fontFamily: t.fonts.heading,
                  fontSize: activeTheme === "charcoalTeal" ? 36 : 40,
                  fontWeight: activeTheme === "blackCopper" ? 400 : 600,
                  color: c.text,
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  maxWidth: 600,
                  margin: "0 auto",
                }}>
                  Fokussierte Expertise in sechs Rechtsgebieten
                </h2>
              </div>
            </AnimatedSection>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {practiceAreas.map((area, i) => (
                <AnimatedSection key={area.title} delay={i * 0.08}>
                  <div
                    style={{
                      background: c.cardBg,
                      borderRadius: 8,
                      padding: "36px 32px",
                      border: `1px solid ${c.cardBorder}`,
                      cursor: "pointer",
                      transition: "all 0.35s cubic-bezier(0.22,1,0.36,1)",
                      height: "100%",
                      position: "relative",
                      overflow: "hidden",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = c.cardHoverBorder;
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = `0 12px 40px ${c.accent}12`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = c.cardBorder;
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <div style={{ fontSize: 24, marginBottom: 18, color: c.accent, opacity: 0.7 }}>{area.icon}</div>
                    <h3 style={{
                      fontFamily: t.fonts.heading,
                      fontSize: activeTheme === "charcoalTeal" ? 18 : 20,
                      fontWeight: activeTheme === "blackCopper" ? 500 : 600,
                      color: c.text,
                      marginBottom: 12,
                      letterSpacing: "-0.01em",
                    }}>
                      {area.title}
                    </h3>
                    <p style={{ fontFamily: t.fonts.body, fontSize: 14.5, color: c.textSecondary, lineHeight: 1.65, fontWeight: 300 }}>
                      {area.desc}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 20, color: c.accent, fontSize: 13, fontWeight: 500, letterSpacing: "0.02em" }}>
                      Mehr erfahren
                      <span style={{ transition: "transform 0.3s" }}>→</span>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ========== DARK FEATURE SECTION ========== */}
        <section style={{
          padding: "100px 0",
          background: c.bgDark,
          position: "relative",
          overflow: "hidden",
          transition: "background 0.5s",
        }}>
          {/* Subtle grid */}
          <div style={{
            position: "absolute", inset: 0, opacity: 0.3,
            backgroundImage: `linear-gradient(${c.heroAccent}06 1px, transparent 1px), linear-gradient(90deg, ${c.heroAccent}06 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }} />

          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", position: "relative", zIndex: 2 }}>
            <AnimatedSection>
              <div style={{ textAlign: "center", marginBottom: 60 }}>
                <span style={{ fontFamily: t.fonts.body, fontSize: 12, fontWeight: 600, color: c.accent, letterSpacing: "0.14em", textTransform: "uppercase" }}>
                  Warum diese Kanzlei
                </span>
                <h2 style={{
                  fontFamily: t.fonts.heading,
                  fontSize: activeTheme === "charcoalTeal" ? 36 : 40,
                  fontWeight: activeTheme === "blackCopper" ? 400 : 600,
                  color: c.heroText,
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                  marginTop: 16,
                  maxWidth: 700,
                  margin: "16px auto 0",
                }}>
                  Drei Jurisdiktionen.{" "}
                  <span style={{ color: c.accent }}>Ein Ansprechpartner.</span>
                </h2>
              </div>
            </AnimatedSection>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
              {[
                {
                  number: "01",
                  title: "Multi-jurisdiktionale Perspektive",
                  text: "Zulassungen in Deutschland, England & Wales und Griechenland ermöglichen eine ganzheitliche Beratung über Ländergrenzen hinweg — ohne Koordinationsaufwand zwischen verschiedenen Kanzleien.",
                },
                {
                  number: "02",
                  title: "Regulatorische Tiefe",
                  text: "Spezialisierung auf EU AI Act, DSGVO und digitale Regulierung. Keine Generalpraxis, sondern fokussierte Expertise an der Schnittstelle von Technologie und europäischem Recht.",
                },
                {
                  number: "03",
                  title: "Strukturierte Klarheit",
                  text: "Komplexe regulatorische Anforderungen werden in klare, umsetzbare Handlungsempfehlungen überführt — mit transparenten Mandatsbedingungen und schriftlicher Auftragsbestätigung.",
                },
              ].map((item, i) => (
                <AnimatedSection key={item.number} delay={i * 0.12}>
                  <div style={{ padding: "4px 0" }}>
                    <div style={{ fontFamily: t.fonts.heading, fontSize: 48, fontWeight: 300, color: `${c.heroAccent}30`, marginBottom: 16, lineHeight: 1 }}>
                      {item.number}
                    </div>
                    <h3 style={{
                      fontFamily: t.fonts.heading, fontSize: 22,
                      fontWeight: activeTheme === "blackCopper" ? 500 : 600,
                      color: c.heroText, marginBottom: 14, letterSpacing: "-0.01em",
                    }}>
                      {item.title}
                    </h3>
                    <p style={{ fontFamily: t.fonts.body, fontSize: 15, color: c.textOnDark, lineHeight: 1.7, fontWeight: 300 }}>
                      {item.text}
                    </p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* ========== CTA SECTION ========== */}
        <section style={{ padding: "100px 0", background: c.bg, transition: "background 0.5s" }}>
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 32px", textAlign: "center" }}>
            <AnimatedSection>
              <h2 style={{
                fontFamily: t.fonts.heading,
                fontSize: activeTheme === "charcoalTeal" ? 34 : 38,
                fontWeight: activeTheme === "blackCopper" ? 400 : 600,
                color: c.text,
                lineHeight: 1.2,
                letterSpacing: "-0.02em",
                marginBottom: 20,
              }}>
                Sie haben eine regulatorische Fragestellung?
              </h2>
              <p style={{ fontSize: 17, color: c.textSecondary, lineHeight: 1.7, marginBottom: 36, fontWeight: 300, maxWidth: 560, margin: "0 auto 36px" }}>
                Vereinbaren Sie ein unverbindliches Erstgespräch, um Ihre rechtliche Situation zu besprechen und mögliche nächste Schritte zu klären.
              </p>
              <div style={{ display: "flex", justifyContent: "center", gap: 16 }}>
                <button style={{
                  fontFamily: t.fonts.body, fontSize: 15, fontWeight: 600,
                  padding: "16px 36px", background: c.accent, color: "#FFF",
                  border: "none", borderRadius: 4, cursor: "pointer",
                  letterSpacing: "0.03em", transition: "all 0.3s",
                }}>
                  Termin vereinbaren
                </button>
                <button style={{
                  fontFamily: t.fonts.body, fontSize: 15, fontWeight: 500,
                  padding: "16px 36px", background: "transparent",
                  color: c.text, border: `1.5px solid ${c.border}`,
                  borderRadius: 4, cursor: "pointer", letterSpacing: "0.02em",
                  transition: "all 0.3s",
                }}>
                  Kontakt aufnehmen
                </button>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* ========== FOOTER ========== */}
        <footer style={{ background: c.footerBg, padding: "64px 0 32px", transition: "background 0.5s" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 48 }}>
              <div>
                <Logo color={c.footerAccent} textColor={c.footerText} size={34} />
                <p style={{ fontFamily: t.fonts.body, fontSize: 14, color: c.footerText, lineHeight: 1.7, marginTop: 20, maxWidth: 300, fontWeight: 300 }}>
                  Internationale Boutique-Kanzlei für EU-Regulierung, KI-Governance und grenzüberschreitende Rechtsberatung.
                </p>
              </div>
              <div>
                <h4 style={{ fontFamily: t.fonts.body, fontSize: 12, fontWeight: 600, color: c.footerAccent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20 }}>
                  Tätigkeitsbereiche
                </h4>
                {["KI-Recht", "Datenschutz", "Gesellschaftsrecht", "Vertragsgestaltung"].map((item) => (
                  <a key={item} href="#" style={{ display: "block", fontFamily: t.fonts.body, fontSize: 14, color: c.footerText, textDecoration: "none", marginBottom: 10, fontWeight: 300 }}>
                    {item}
                  </a>
                ))}
              </div>
              <div>
                <h4 style={{ fontFamily: t.fonts.body, fontSize: 12, fontWeight: 600, color: c.footerAccent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20 }}>
                  Kanzlei
                </h4>
                {["Über die Kanzlei", "Qualifikationen", "Insights", "Kontakt"].map((item) => (
                  <a key={item} href="#" style={{ display: "block", fontFamily: t.fonts.body, fontSize: 14, color: c.footerText, textDecoration: "none", marginBottom: 10, fontWeight: 300 }}>
                    {item}
                  </a>
                ))}
              </div>
              <div>
                <h4 style={{ fontFamily: t.fonts.body, fontSize: 12, fontWeight: 600, color: c.footerAccent, letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 20 }}>
                  Rechtliches
                </h4>
                {["Impressum", "Datenschutz", "Disclaimer", "Berufszulassungen"].map((item) => (
                  <a key={item} href="#" style={{ display: "block", fontFamily: t.fonts.body, fontSize: 14, color: c.footerText, textDecoration: "none", marginBottom: 10, fontWeight: 300 }}>
                    {item}
                  </a>
                ))}
              </div>
            </div>
            <div style={{ borderTop: `1px solid rgba(255,255,255,0.06)`, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontFamily: t.fonts.body, fontSize: 13, color: `${c.footerText}88`, fontWeight: 300 }}>
                © 2026 Eirini C. Lika LL.M — Alle Rechte vorbehalten
              </span>
              <div style={{ display: "flex", gap: 16 }}>
                {["Deutsch", "English", "Ελληνικά"].map((lang) => (
                  <span key={lang} style={{ fontFamily: t.fonts.body, fontSize: 13, color: `${c.footerText}88`, cursor: "pointer", fontWeight: lang === "Deutsch" ? 500 : 300 }}>
                    {lang}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </footer>

        {/* Theme Info Overlay */}
        <div style={{
          position: "fixed", bottom: 20, right: 20, zIndex: 1000,
          background: "rgba(20,20,20,0.92)", backdropFilter: "blur(16px)",
          borderRadius: 10, padding: "16px 22px",
          border: `1px solid ${c.accent}30`,
          maxWidth: 260,
        }}>
          <div style={{ fontFamily: t.fonts.body, fontSize: 11, color: "#888", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>
            Aktive Palette
          </div>
          <div style={{ fontFamily: t.fonts.heading, fontSize: 18, color: c.accent, fontWeight: 600, marginBottom: 4 }}>
            {t.name}
          </div>
          <div style={{ fontFamily: t.fonts.body, fontSize: 13, color: "#AAA", marginBottom: 10 }}>
            {t.subtitle}
          </div>
          <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
            {[c.heroBg, c.accent, c.text, c.bgAlt, c.border].map((col, i) => (
              <div key={i} style={{ width: 24, height: 24, borderRadius: 4, background: col, border: "1px solid rgba(255,255,255,0.1)" }} />
            ))}
          </div>
          <div style={{ fontFamily: "'Courier New', monospace", fontSize: 11, color: "#666", lineHeight: 1.6 }}>
            Heading: {t.fonts.heading.split(",")[0].replace(/'/g, "")}<br />
            Body: {t.fonts.body.split(",")[0].replace(/'/g, "")}
          </div>
        </div>
      </div>
    </>
  );
}
