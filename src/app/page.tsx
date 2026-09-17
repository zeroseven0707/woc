"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useState } from "react";

const translations = {
  EN: {
    nav: ["About", "Creations", "People", "Vision"],
    contact: "Start a conversation",
    heroKicker: "World of creations",
    heroTitle: <>Turning imagination<br /><em>into meaningful creations.</em></>,
    heroText: "We explore ideas, connect perspectives, and use technology to create things that matter.",
    explore: "Explore WOC", meetPeople: "Meet the people", scroll: "Scroll to explore",
    labels: ["The idea", "The philosophy", "The output", "The people", "The method", "The vision", "The next move"],
    aboutTitle: <>We believe every idea has a <span>possibility.</span></>,
    aboutText: ["WOC was built around a simple belief: great creations begin with curiosity.", "Ideas can come from anywhere. What matters is how we explore them, shape them, and turn them into something meaningful."],
    equation: ["Ideas", "People", "Technology", "Impact"],
    philosophyTitle: <>Different minds.<br /><i>Different stories.</i><br />One vision.</>,
    philosophyText: ["We believe meaningful creation happens when different perspectives come together.", "Ideas become stronger when people collaborate. Technology becomes meaningful when it solves real problems. And creation becomes valuable when it creates impact."],
    creationTitle: <>From ideas<br /><span>to creations.</span></>,
    creationIntro: "We move between disciplines, following the energy of a good question wherever it leads.",
    creations: ["Digital products", "Technology", "Creative", "Experiments"],
    creationText: ["Web platforms, applications, and digital experiences.", "Software, systems, automation, and intelligent solutions.", "Brand experiences, visual identities, content, and creative concepts.", "New ideas, prototypes, and unconventional projects."],
    peopleTitle: <>Meet the people<br /><span>behind WOC.</span></>, peopleIntro: <>Different perspectives.<br />Shared ambition.</>, portrait: "A world shaped by many points of view.", meetTeam: "Meet the team",
    peopleRoles: ["Idea explorer & creative thinker", "Fullstack developer & problem solver", "Designer & story builder"],
    approachTitle: <>Explore.<br /><i>Connect. Create.</i></>, approachIntro: "The best work happens in the space between disciplines.", approach: [["Explore", "We look everywhere for ideas, inspiration, and possibilities."], ["Connect", "We bring together people, perspectives, and technology."], ["Create", "We transform possibilities into meaningful creations."]],
    visionTitle: <>A brighter<br /><span>tomorrow</span><br />together.</>, visionText: "We are building a world where ideas have no boundaries, people have more possibilities, and technology becomes a tool for meaningful progress.",
    ctaTitle: <>Have an <i>idea?</i></>, ctaText: "Let's turn it into something meaningful.", ctaButton: "Start a conversation", footerText: <>Turning imagination into<br />meaningful creations.</>, footerExplore: "Explore", footerConnect: "Connect", footerStatement: "A brighter tomorrow together.", made: "Made with intention."
  },
  ID: {
    nav: ["Tentang", "Kreasi", "Orang-orang", "Visi"],
    contact: "Mulai percakapan", heroKicker: "Dunia kreasi", heroTitle: <>Mengubah imajinasi<br /><em>menjadi kreasi bermakna.</em></>, heroText: "Kami mengeksplorasi ide, menghubungkan perspektif, dan menggunakan teknologi untuk menciptakan hal-hal yang berarti.", explore: "Jelajahi WOC", meetPeople: "Kenali orang-orangnya", scroll: "Gulir untuk menjelajah",
    labels: ["Gagasan", "Filosofi", "Hasil karya", "Orang-orang", "Metode", "Visi", "Langkah berikutnya"], aboutTitle: <>Kami percaya setiap ide memiliki <span>kemungkinan.</span></>, aboutText: ["WOC dibangun dari keyakinan sederhana: kreasi hebat selalu dimulai dari rasa ingin tahu.", "Ide bisa datang dari mana saja. Yang penting adalah bagaimana kita mengeksplorasi, membentuk, dan mengubahnya menjadi sesuatu yang bermakna."], equation: ["Ide", "Manusia", "Teknologi", "Dampak"], philosophyTitle: <>Pikiran yang berbeda.<br /><i>Cerita yang berbeda.</i><br />Satu visi.</>, philosophyText: ["Kami percaya kreasi bermakna lahir ketika berbagai perspektif bertemu.", "Ide menjadi lebih kuat saat orang berkolaborasi. Teknologi menjadi berarti saat menyelesaikan masalah nyata. Dan kreasi menjadi berharga saat menghasilkan dampak."], creationTitle: <>Dari ide<br /><span>menjadi kreasi.</span></>, creationIntro: "Kami bergerak lintas disiplin, mengikuti energi dari pertanyaan yang baik ke mana pun arahnya.", creations: ["Produk digital", "Teknologi", "Kreatif", "Eksperimen"], creationText: ["Platform web, aplikasi, dan pengalaman digital.", "Perangkat lunak, sistem, otomasi, dan solusi cerdas.", "Pengalaman merek, identitas visual, konten, dan konsep kreatif.", "Ide baru, purwarupa, dan proyek yang tak biasa."], peopleTitle: <>Kenali orang-orang<br /><span>di balik WOC.</span></>, peopleIntro: <>Perspektif berbeda.<br />Ambisi yang sama.</>, portrait: "Dunia yang dibentuk oleh banyak sudut pandang.", meetTeam: "Kenali timnya", peopleRoles: ["Penjelajah ide & pemikir kreatif", "Developer fullstack & pemecah masalah", "Desainer & pembangun cerita"], approachTitle: <>Jelajahi.<br /><i>Hubungkan. Ciptakan.</i></>, approachIntro: "Karya terbaik lahir di antara berbagai disiplin.", approach: [["Jelajahi", "Kami mencari ide, inspirasi, dan kemungkinan di mana saja."], ["Hubungkan", "Kami mempertemukan orang, perspektif, dan teknologi."], ["Ciptakan", "Kami mengubah kemungkinan menjadi kreasi yang bermakna."]], visionTitle: <>Masa depan<br /><span>yang lebih cerah</span><br />bersama.</>, visionText: "Kami membangun dunia tempat ide tidak memiliki batas, manusia memiliki lebih banyak kemungkinan, dan teknologi menjadi alat untuk kemajuan yang berarti.", ctaTitle: <>Punya sebuah <i>ide?</i></>, ctaText: "Mari ubah menjadi sesuatu yang bermakna.", ctaButton: "Mulai percakapan", footerText: <>Mengubah imajinasi menjadi<br />kreasi bermakna.</>, footerExplore: "Jelajahi", footerConnect: "Terhubung", footerStatement: "Masa depan yang lebih cerah bersama.", made: "Dibuat dengan niat."
  }
} as const;

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const } },
};

function Logo({ large = false }: { large?: boolean }) {
  return (
    <span className={`logo-mark ${large ? "logo-mark-large" : ""}`} aria-label="WOC">
      <span className="logo-w">W</span><span className="logo-oc">OC</span>
    </span>
  );
}

function SectionLabel({ number, label }: { number: string; label: string }) {
  return <div className="section-label"><span>{number}</span><span>{label}</span></div>;
}

export default function Home() {
  const [language, setLanguage] = useState<keyof typeof translations>("EN");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePerson, setActivePerson] = useState(1);
  const copy = translations[language];
  const creations = copy.creations.map((title, index) => ({ number: `0${index + 1}`, title, text: copy.creationText[index], className: ["creation-sun", "creation-grid", "creation-tide", "creation-orbit"][index] }));
  const people = ["Ethan", "Sihabudin", "Zu Ruoxi"].map((name, index) => ({ name, role: copy.peopleRoles[index], code: `0${index + 1}` }));
  const { scrollYProgress } = useScroll();
  const glowX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const smoothGlowX = useSpring(glowX, { stiffness: 40, damping: 20 });

  return (
    <main>
      <div className="site-noise" />
      <motion.div className="scroll-glow" style={{ left: smoothGlowX }} />
      <header className={`nav ${menuOpen ? "nav-open" : ""}`}>
        <a href="#top" className="nav-logo"><Logo /><span>World of<br />Creations</span></a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="#about">{copy.nav[0]}</a><a href="#creations">{copy.nav[1]}</a><a href="#people">{copy.nav[2]}</a><a href="#vision">{copy.nav[3]}</a>
        </nav>
        <a className="nav-contact" href="#contact">{copy.contact} <span>↗</span></a>
        <div className="language-switcher" aria-label="Language selector">{(["EN", "ID"] as const).map((option) => <button key={option} className={language === option ? "active" : ""} onClick={() => setLanguage(option)} aria-pressed={language === option}>{option}</button>)}</div>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation"><span /><span /></button>
        <div className="mobile-nav"><div className="mobile-language">{(["EN", "ID"] as const).map((option) => <button key={option} className={language === option ? "active" : ""} onClick={() => setLanguage(option)}>{option}</button>)}</div><a href="#about" onClick={() => setMenuOpen(false)}>{copy.nav[0]}</a><a href="#creations" onClick={() => setMenuOpen(false)}>{copy.nav[1]}</a><a href="#people" onClick={() => setMenuOpen(false)}>{copy.nav[2]}</a><a href="#vision" onClick={() => setMenuOpen(false)}>{copy.nav[3]}</a></div>
      </header>

      <section className="hero" id="top">
        <div className="hero-atmosphere" />
        <div className="hero-ring hero-ring-one" /><div className="hero-ring hero-ring-two" />
        <div className="hero-content">
          <motion.div initial="hidden" animate="visible" variants={fadeUp} className="hero-kicker"><span className="live-dot" /> {copy.heroKicker}</motion.div>
          <motion.div initial="hidden" animate="visible" transition={{ delay: 0.12 }} variants={fadeUp} className="hero-logo"><Logo large /></motion.div>
          <motion.h1 initial="hidden" animate="visible" transition={{ delay: 0.22 }} variants={fadeUp}>{copy.heroTitle}</motion.h1>
          <motion.p initial="hidden" animate="visible" transition={{ delay: 0.34 }} variants={fadeUp}>{copy.heroText}</motion.p>
          <motion.div initial="hidden" animate="visible" transition={{ delay: 0.44 }} variants={fadeUp} className="hero-actions"><a className="button button-primary" href="#about">{copy.explore} <span>↘</span></a><a className="button button-quiet" href="#people">{copy.meetPeople} <span>↘</span></a></motion.div>
        </div>
        <div className="hero-bottom"><span>{copy.scroll}</span><span className="scroll-line" /><span>01 / 09</span></div>
      </section>

      <section className="about section-pad" id="about">
        <SectionLabel number="01" label={copy.labels[0]} />
        <div className="about-layout"><motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={fadeUp}>{copy.aboutTitle}</motion.h2><div className="about-copy"><p>{copy.aboutText[0]}</p><p>{copy.aboutText[1]}</p></div></div>
        <motion.div className="equation" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}><span>{copy.equation[0]}</span><b>+</b><span>{copy.equation[1]}</span><b>+</b><span>{copy.equation[2]}</span><b>=</b><strong>{copy.equation[3]}</strong></motion.div>
      </section>

      <section className="philosophy section-pad"><div className="philosophy-back">WOC / WOC / WOC /</div><SectionLabel number="02" label={copy.labels[1]} /><div className="philosophy-statement"><motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>{copy.philosophyTitle}</motion.h2><motion.div className="philosophy-copy" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}><p>{copy.philosophyText[0]}</p><p>{copy.philosophyText[1]}</p></motion.div></div></section>

      <section className="creations section-pad" id="creations"><SectionLabel number="03" label={copy.labels[2]} /><div className="section-heading"><h2>{copy.creationTitle}</h2><p>{copy.creationIntro}</p></div><div className="creation-list">{creations.map((item, index) => <motion.a href="#contact" className={`creation-item ${item.className}`} key={item.number} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={fadeUp} transition={{ delay: index * 0.07 }}><div className="creation-art"><span className="creation-art-label">WOC / {item.number}</span><span className="art-symbol">{index === 0 ? "◒" : index === 1 ? "⌘" : index === 2 ? "∿" : "◎"}</span></div><div className="creation-meta"><span className="creation-number">{item.number}</span><h3>{item.title}</h3><p>{item.text}</p><span className="creation-arrow">↗</span></div></motion.a>)}</div></section>

      <section className="people section-pad" id="people"><SectionLabel number="04" label={copy.labels[3]} /><div className="people-heading"><h2>{copy.peopleTitle}</h2><p>{copy.peopleIntro}</p></div><div className="people-stage"><div className="people-portrait"><div className={`portrait-figure portrait-${activePerson}`} /><span className="portrait-index">0{activePerson + 1} / 03</span><span className="portrait-caption">{copy.portrait}</span></div><div className="people-list">{people.map((person, index) => <button className={`person-row ${activePerson === index ? "active" : ""}`} key={person.name} onMouseEnter={() => setActivePerson(index)} onFocus={() => setActivePerson(index)}><span>{person.code}</span><strong>{person.name}</strong><small>{person.role}</small><i>↗</i></button>)}<a className="text-link" href="#contact">{copy.meetTeam} <span>↗</span></a></div></div></section>

      <section className="approach section-pad"><SectionLabel number="05" label={copy.labels[4]} /><div className="section-heading"><h2>{copy.approachTitle}</h2><p>{copy.approachIntro}</p></div><div className="approach-track">{copy.approach.map((step, index) => <motion.div className="approach-step" key={step[0]} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} transition={{ delay: index * 0.15 }}><span>0{index + 1}</span><div className="step-line" /><h3>{step[0]}</h3><p>{step[1]}</p></motion.div>)}</div></section>

      <section className="vision section-pad" id="vision"><div className="vision-horizon" /><div className="vision-content"><SectionLabel number="06" label={copy.labels[5]} /><motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>{copy.visionTitle}</motion.h2><p>{copy.visionText}</p><span className="vision-stamp">{copy.heroKicker}</span></div></section>

      <section className="cta section-pad" id="contact"><div className="cta-line" /><SectionLabel number="07" label={copy.labels[6]} /><div className="cta-content"><h2>{copy.ctaTitle}</h2><p>{copy.ctaText}</p><a className="button button-primary" href="mailto:hello@worldofcreations.co">{copy.ctaButton} <span>↗</span></a></div></section>

      <footer className="footer section-pad"><div className="footer-top"><div><Logo /><p>{copy.footerText}</p></div><div className="footer-nav"><span>{copy.footerExplore}</span><a href="#about">{copy.nav[0]}</a><a href="#creations">{copy.nav[1]}</a><a href="#people">{copy.nav[2]}</a><a href="#vision">{copy.nav[3]}</a></div><div className="footer-nav"><span>{copy.footerConnect}</span><a href="mailto:hello@worldofcreations.co">Contact</a><a href="#">Instagram</a><a href="#">LinkedIn</a><a href="#">X / Twitter</a></div></div><div className="footer-bottom"><span>© 2026 WOC — World of Creations</span><strong>{copy.footerStatement}</strong><span>{copy.made}</span></div></footer>
    </main>
  );
}
