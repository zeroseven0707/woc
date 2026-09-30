"use client";

import { animate, motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ---------------- Animations ---------------- */

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09 } },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: EASE } },
};

/* ---------------- Translations ---------------- */

const translations = {
  EN: {
    nav: ["About", "Services", "Process", "Team"],
    contact: "Contact us",
    heroKicker: "Digital studio — Worldwide",
    heroTitle: <>We build digital products<br /><em>that move businesses forward.</em></>,
    heroText: "WOC is a creative technology studio. We combine strategy, design, and engineering to help companies launch products people love.",
    primaryCta: "Start a project",
    secondaryCta: "See our services",
    trustedBy: "Trusted by forward-thinking teams",
    heroCardTitle: "Current focus",
    heroCardItems: [["Brand systems", "Identity & guidelines"], ["Product design", "UI/UX & research"], ["Development", "Web & mobile"], ["Growth", "Analytics & iteration"]],
    stats: [["12", "+", "Projects delivered"], ["8", "", "Happy clients"], ["3", "", "Core disciplines"], ["98", "%", "Client satisfaction"]],
    labels: ["About us", "What we do", "How we work", "Our team", "Vision"],
    aboutKicker: "Who we are",
    aboutTitle: <>A studio built on curiosity,<br /><span>discipline, and craft.</span></>,
    aboutText: ["WOC was founded on a simple belief: great products begin with great questions. We partner with founders and teams to turn ambiguous ideas into working, measurable products.", "Small team, senior people, no hand-offs. You work directly with the people who design and build your product."],
    values: [["Curiosity", "We ask better questions before we build anything."], ["Ownership", "We treat every product like it's our own."], ["Impact", "We measure success by the outcomes we create."]],
    servicesTitle: <>Services designed<br /><span>to cover the full journey.</span></>,
    servicesText: "From first sketch to production launch — one team, one standard of quality.",
    services: [
      ["Web Development", "Scalable websites and web applications built with modern frameworks."],
      ["Product Design", "Research, wireframes, and interfaces designed around real user needs."],
      ["Brand Identity", "Logos, visual systems, and guidelines that make brands unmistakable."],
      ["Mobile Applications", "Cross-platform apps with native feel and reliable performance."],
      ["Automation & Systems", "Internal tools, integrations, and workflows that save real hours."],
      ["Prototyping & R&D", "Fast experiments to validate ideas before you invest big."],
    ],
    processTitle: <>A process built for<br /><span>clarity and momentum.</span></>,
    processText: "No black boxes. You see progress every week and know exactly what happens next.",
    process: [
      ["Discover", "We dig into your business, users, and goals in a focused workshop."],
      ["Define", "We turn findings into a clear scope, roadmap, and success metrics."],
      ["Design & Build", "Design and engineering run in parallel, with weekly demos."],
      ["Deliver & Grow", "We launch, measure, and keep iterating after release."],
    ],
    teamTitle: <>The people behind<br /><span>the work.</span></>,
    teamText: "A compact senior team — strategists, designers, and engineers working side by side.",
    teamRoles: [["Ethan", "Founder & Creative Director"], ["Sihabudin", "Lead Fullstack Engineer"], ["Zu Ruoxi", "Head of Product Design"]],
    testimonialQuote: "“WOC took a vague idea and turned it into a product our customers use every day. Clear communication, sharp thinking, and real craft.”",
    testimonialAuthor: "Project Lead",
    testimonialCompany: "Fintech startup, Singapore",
    visionTitle: <>We believe technology should<br /><span>create lasting value.</span></>,
    visionText: "Our vision is a world where every good idea gets the chance to become something real — built with care, used with purpose, and measured by the impact it leaves behind.",
    ctaTitle: <>Let's build something<br /><em>worth building.</em></>,
    ctaText: "Tell us about your idea. We'll reply within one business day with honest thoughts on how to approach it.",
    ctaButton: "Start a conversation",
    footerText: <>We build digital products<br />that move businesses forward.</>,
    footerExplore: "Explore",
    footerConnect: "Connect",
    footerStatement: "Built with care, measured by impact.",
    made: "© 2026 WOC — World of Creations",
  },
  ID: {
    nav: ["Tentang", "Layanan", "Proses", "Tim"],
    contact: "Hubungi kami",
    heroKicker: "Studio digital — Worldwide",
    heroTitle: <>Kami membangun produk digital<br /><em>yang menggerakkan bisnis.</em></>,
    heroText: "WOC adalah studio teknologi kreatif. Kami memadukan strategi, desain, dan rekayasa untuk membantu perusahaan meluncurkan produk yang disukai penggunanya.",
    primaryCta: "Mulai proyek",
    secondaryCta: "Lihat layanan",
    trustedBy: "Dipercaya oleh tim yang visioner",
    heroCardTitle: "Fokus saat ini",
    heroCardItems: [["Brand systems", "Identitas & panduan visual"], ["Product design", "UI/UX & riset"], ["Development", "Web & mobile"], ["Growth", "Analitik & iterasi"]],
    stats: [["12", "+", "Proyek selesai"], ["8", "", "Klien puas"], ["3", "", "Disiplin inti"], ["98", "%", "Kepuasan klien"]],
    labels: ["Tentang kami", "Layanan", "Cara kami bekerja", "Tim kami", "Visi"],
    aboutKicker: "Siapa kami",
    aboutTitle: <>Studio yang dibangun di atas rasa ingin tahu,<br /><span>disiplin, dan kerajinan.</span></>,
    aboutText: ["WOC berdiri di atas keyakinan sederhana: produk hebat dimulai dari pertanyaan yang tepat. Kami bermitra dengan founder dan tim untuk mengubah ide yang samar menjadi produk yang berfungsi dan terukur.", "Tim kecil, orang-orang senior, tanpa perantara. Anda bekerja langsung dengan orang yang mendesain dan membangun produk Anda."],
    values: [["Rasa Ingin Tahu", "Kami mengajukan pertanyaan yang lebih baik sebelum membangun apa pun."], ["Kepemilikan", "Kami memperlakukan setiap produk seperti produk kami sendiri."], ["Dampak", "Kami mengukur kesuksesan dari hasil yang kami ciptakan."]],
    servicesTitle: <>Layanan yang dirancang<br /><span>menutupi seluruh perjalanan.</span></>,
    servicesText: "Dari sketsa pertama hingga peluncuran — satu tim, satu standar kualitas.",
    services: [
      ["Pengembangan Web", "Website dan aplikasi web yang skalabel dengan teknologi modern."],
      ["Desain Produk", "Riset, wireframe, dan antarmuka yang berpusat pada kebutuhan pengguna."],
      ["Identitas Merek", "Logo, sistem visual, dan panduan yang membuat merek tak tertukar."],
      ["Aplikasi Mobile", "Aplikasi lintas platform dengan rasa native dan performa andal."],
      ["Otomasi & Sistem", "Tools internal, integrasi, dan alur kerja yang menghemat waktu nyata."],
      ["Purwarupa & R&D", "Eksperimen cepat untuk memvalidasi ide sebelum investasi besar."],
    ],
    processTitle: <>Proses yang dirancang untuk<br /><span>kejelasan dan momentum.</span></>,
    processText: "Tanpa kotak hitam. Anda melihat progres setiap minggu dan tahu persis langkah selanjutnya.",
    process: [
      ["Temukan", "Kami menggali bisnis, pengguna, dan tujuan Anda dalam workshop terfokus."],
      ["Tetapkan", "Temuan diubah menjadi ruang lingkup, peta jalan, dan metrik kesuksesan."],
      ["Desain & Bangun", "Desain dan rekayasa berjalan paralel, dengan demo setiap minggu."],
      ["Luncur & Tumbuh", "Kami meluncurkan, mengukur, dan terus mengiterasi setelah rilis."],
    ],
    teamTitle: <>Orang-orang di balik<br /><span>setiap karya.</span></>,
    teamText: "Tim senior yang ringkas — strategis, desainer, dan engineer yang bekerja berdampingan.",
    teamRoles: [["Ethan", "Founder & Creative Director"], ["Sihabudin", "Lead Fullstack Engineer"], ["Zu Ruoxi", "Head of Product Design"]],
    testimonialQuote: "“WOC mengubah ide yang samar menjadi produk yang digunakan pelanggan kami setiap hari. Komunikasi jelas, pemikiran tajam, dan kerja yang rapi.”",
    testimonialAuthor: "Project Lead",
    testimonialCompany: "Startup fintech, Singapura",
    visionTitle: <>Kami percaya teknologi harus<br /><span>menciptakan nilai yang bertahan.</span></>,
    visionText: "Visi kami adalah dunia di mana setiap ide baik mendapat kesempatan menjadi nyata — dibangun dengan hati-hati, digunakan dengan tujuan, dan diukur dari dampak yang ditinggalkannya.",
    ctaTitle: <>Mari bangun sesuatu<br /><em>yang layak dibangun.</em></>,
    ctaText: "Ceritakan ide Anda. Kami akan membalas dalam satu hari kerja dengan pendapat jujur tentang cara menyikapinya.",
    ctaButton: "Mulai percakapan",
    footerText: <>Kami membangun produk digital<br />yang menggerakkan bisnis.</>,
    footerExplore: "Jelajahi",
    footerConnect: "Terhubung",
    footerStatement: "Dibangun dengan hati, diukur dari dampak.",
    made: "© 2026 WOC — World of Creations",
  },
} as const;

type Copy = (typeof translations)[keyof typeof translations];

/* ---------------- Icons ---------------- */

function ServiceIcon({ index }: { index: number }) {
  const paths = [
    "M4 5h16v10H4zM2 19h20M9 21h6", // web
    "M12 3l9 5-9 5-9-5zM3 13l9 5 9-5", // design layers
    "M12 3a9 9 0 100 18 9 9 0 000-18zM8 12l3 3 5-6", // brand
    "M8 2h8a2 2 0 012 2v16a2 2 0 01-2 2H8a2 2 0 01-2-2V4a2 2 0 012-2zM11 18h2", // mobile
    "M4 6h10M18 6h2M4 12h4M12 12h8M4 18h13M21 18h-1M15 4v4M10 10v4M17 16v4", // automation
    "M9 3h6M10 3v5l-5 9a3 3 0 003 4h8a3 3 0 003-4l-5-9V3", // flask
  ];
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="service-icon" aria-hidden="true">
      {paths[index].split("M").filter(Boolean).map((d, i) => <path key={i} d={`M${d}`} />)}
    </svg>
  );
}

/* ---------------- Small components ---------------- */

function Logo({ large = false }: { large?: boolean }) {
  return (
    <span className={`logo-mark ${large ? "logo-mark-large" : ""}`} aria-label="WOC">
      <span className="logo-w">W</span><span className="logo-oc">OC</span>
    </span>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="eyebrow">{children}</span>;
}

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return <span ref={ref}>{display}{suffix}</span>;
}

/* ---------------- Page ---------------- */

export default function Home() {
  const [language, setLanguage] = useState<keyof typeof translations>("EN");
  const [menuOpen, setMenuOpen] = useState(false);
  const copy: Copy = translations[language];

  return (
    <main>
      {/* ---------- Navigation ---------- */}
      <header className={`nav ${menuOpen ? "nav-open" : ""}`}>
        <a href="#top" className="nav-logo" onClick={() => setMenuOpen(false)}><Logo /><span>World of<br />Creations</span></a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#about">{copy.nav[0]}</a>
          <a href="#services">{copy.nav[1]}</a>
          <a href="#process">{copy.nav[2]}</a>
          <a href="#team">{copy.nav[3]}</a>
        </nav>
        <div className="nav-actions">
          <div className="language-switcher" aria-label="Language selector">
            {(["EN", "ID"] as const).map((option) => (
              <button key={option} className={language === option ? "active" : ""} onClick={() => setLanguage(option)} aria-pressed={language === option}>{option}</button>
            ))}
          </div>
          <a className="nav-contact" href="#contact">{copy.contact} <span>→</span></a>
        </div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation"><span /><span /></button>
        <div className="mobile-nav">
          <div className="mobile-language">
            {(["EN", "ID"] as const).map((option) => (
              <button key={option} className={language === option ? "active" : ""} onClick={() => setLanguage(option)}>{option}</button>
            ))}
          </div>
          <a href="#about" onClick={() => setMenuOpen(false)}>{copy.nav[0]}</a>
          <a href="#services" onClick={() => setMenuOpen(false)}>{copy.nav[1]}</a>
          <a href="#process" onClick={() => setMenuOpen(false)}>{copy.nav[2]}</a>
          <a href="#team" onClick={() => setMenuOpen(false)}>{copy.nav[3]}</a>
          <a className="mobile-contact" href="#contact" onClick={() => setMenuOpen(false)}>{copy.contact} <span>→</span></a>
        </div>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="hero" id="top">
        <div className="container hero-grid">
          <div className="hero-copy">
            <motion.div initial="hidden" animate="visible" variants={fadeUp}><Eyebrow>{copy.heroKicker}</Eyebrow></motion.div>
            <motion.h1 initial="hidden" animate="visible" transition={{ delay: 0.1 }} variants={fadeUp}>{copy.heroTitle}</motion.h1>
            <motion.p initial="hidden" animate="visible" transition={{ delay: 0.2 }} variants={fadeUp}>{copy.heroText}</motion.p>
            <motion.div initial="hidden" animate="visible" transition={{ delay: 0.3 }} variants={fadeUp} className="hero-actions">
              <a className="button button-primary" href="#contact">{copy.primaryCta} <span>→</span></a>
              <a className="button button-quiet" href="#services">{copy.secondaryCta} <span>↓</span></a>
            </motion.div>
          </div>

          <motion.aside initial="hidden" animate="visible" transition={{ delay: 0.25 }} variants={scaleIn} className="hero-card" aria-label="Current focus">
            <div className="hero-card-head">
              <span className="live-dot" />
              <span>{copy.heroCardTitle}</span>
            </div>
            <ul className="hero-card-list">
              {copy.heroCardItems.map(([title, desc], i) => (
                <li key={i}>
                  <strong>{title}</strong>
                  <small>{desc}</small>
                  <span className="hero-card-num">0{i + 1}</span>
                </li>
              ))}
            </ul>
          </motion.aside>
        </div>

        <div className="container trusted">
          <motion.span initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>{copy.trustedBy}</motion.span>
          <motion.div className="trusted-logos" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            {["NOVATECH", "HALCYON", "BRIGHTLAB", "KITEWORKS", "ORBITAL"].map((name) => (
              <motion.span key={name} variants={fadeUp} className="trusted-logo">{name}</motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------- Stats band ---------- */}
      <section className="stats-band">
        <div className="container stats-grid">
          {copy.stats.map(([value, suffix, label], i) => (
            <motion.div key={i} className="stat" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: i * 0.08 }}>
              <span className="stat-value"><Counter value={Number(value)} suffix={suffix} /></span>
              <small className="stat-label">{label}</small>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ---------- About ---------- */}
      <section className="about section-pad" id="about">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.4 }} variants={fadeUp}><Eyebrow>{copy.labels[0]} — {copy.aboutKicker}</Eyebrow></motion.div>
          <div className="about-grid">
            <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>{copy.aboutTitle}</motion.h2>
            <div className="about-copy">
              <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>{copy.aboutText[0]}</motion.p>
              <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.1 }}>{copy.aboutText[1]}</motion.p>
            </div>
          </div>
          <motion.div className="values-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            {copy.values.map(([title, text], i) => (
              <motion.div key={i} className="value-card" variants={fadeUp}>
                <span className="value-num">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------- Services ---------- */}
      <section className="services section-pad" id="services">
        <div className="container">
          <div className="section-head">
            <div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}><Eyebrow>{copy.labels[1]}</Eyebrow></motion.div>
              <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>{copy.servicesTitle}</motion.h2>
            </div>
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>{copy.servicesText}</motion.p>
          </div>
          <motion.div className="services-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={stagger}>
            {copy.services.map(([title, text], i) => (
              <motion.a href="#contact" key={i} className="service-card" variants={fadeUp}>
                <span className="service-icon-wrap"><ServiceIcon index={i} /></span>
                <h3>{title}</h3>
                <p>{text}</p>
                <span className="service-link">→</span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------- Process ---------- */}
      <section className="process section-pad" id="process">
        <div className="container">
          <div className="section-head">
            <div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}><Eyebrow>{copy.labels[2]}</Eyebrow></motion.div>
              <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>{copy.processTitle}</motion.h2>
            </div>
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>{copy.processText}</motion.p>
          </div>
          <motion.div className="process-track" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            {copy.process.map(([title, text], i) => (
              <motion.div key={i} className="process-step" variants={fadeUp}>
                <div className="process-top">
                  <span className="process-num">0{i + 1}</span>
                  <span className="process-line" />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------- Team ---------- */}
      <section className="team section-pad" id="team">
        <div className="container">
          <div className="section-head">
            <div>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}><Eyebrow>{copy.labels[3]}</Eyebrow></motion.div>
              <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>{copy.teamTitle}</motion.h2>
            </div>
            <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>{copy.teamText}</motion.p>
          </div>
          <motion.div className="team-grid" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
            {copy.teamRoles.map(([name, role], i) => (
              <motion.div key={i} className="team-card" variants={fadeUp}>
                <div className={`team-avatar team-avatar-${i + 1}`}>{name.split(" ").map((n) => n[0]).join("")}</div>
                <h3>{name}</h3>
                <p>{role}</p>
                <div className="team-links">
                  <a href="#" aria-label={`${name} on LinkedIn`}>in</a>
                  <a href="#" aria-label={`${name} on X`}>𝕏</a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------- Testimonial ---------- */}
      <section className="testimonial section-pad">
        <div className="container testimonial-inner">
          <motion.div className="quote-mark" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={scaleIn}>“</motion.div>
          <motion.blockquote initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>{copy.testimonialQuote}</motion.blockquote>
          <motion.div className="quote-author" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.1 }}>
            <strong>{copy.testimonialAuthor}</strong>
            <span>{copy.testimonialCompany}</span>
          </motion.div>
        </div>
      </section>

      {/* ---------- Vision ---------- */}
      <section className="vision section-pad" id="vision">
        <div className="container">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}><Eyebrow>{copy.labels[4]}</Eyebrow></motion.div>
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>{copy.visionTitle}</motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.1 }}>{copy.visionText}</motion.p>
        </div>
      </section>

      {/* ---------- CTA ---------- */}
      <section className="cta" id="contact">
        <div className="container cta-inner">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>{copy.ctaTitle}</motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.1 }}>{copy.ctaText}</motion.p>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: 0.2 }}>
            <a className="button button-light" href="mailto:hello@worldofcreations.co">{copy.ctaButton} <span>→</span></a>
          </motion.div>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="footer">
        <div className="container footer-top">
          <div className="footer-brand">
            <Logo />
            <p>{copy.footerText}</p>
          </div>
          <div className="footer-nav">
            <span>{copy.footerExplore}</span>
            <a href="#about">{copy.nav[0]}</a>
            <a href="#services">{copy.nav[1]}</a>
            <a href="#process">{copy.nav[2]}</a>
            <a href="#team">{copy.nav[3]}</a>
          </div>
          <div className="footer-nav">
            <span>{copy.footerConnect}</span>
            <a href="mailto:hello@worldofcreations.co">hello@worldofcreations.co</a>
            <a href="#">LinkedIn</a>
            <a href="#">Instagram</a>
            <a href="#">X / Twitter</a>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>{copy.made}</span>
          <strong>{copy.footerStatement}</strong>
        </div>
      </footer>
    </main>
  );
}