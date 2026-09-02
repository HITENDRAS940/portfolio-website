import {
  ArrowDown,
  ArrowUpRight,
  BriefcaseBusiness,
  Code2,
  FileText,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const navItems = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

const projects = [
  {
    index: "01",
    title: "Hyper",
    type: "Sports booking / Mobile",
    year: "2025",
    summary:
      "A production sports booking application published on Google Play and the App Store, with concurrency-safe slot booking, Razorpay payments, dynamic pricing, settlements, and failure-safe booking states.",
    stack: ["Expo", "Spring Boot", "PostgreSQL", "Docker"],
    links: [
      { label: "GitHub", href: "https://github.com/HITENDRAS940/hyper_render_prod.git" },
      { label: "Play Store", href: "https://play.google.com/store/apps/details?id=com.hitendras940.hyper" },
      { label: "App Store", href: "https://apps.apple.com/us/app/hyper-book-sports-more/id6759787068" },
    ],
    tone: "lime",
  },
  {
    index: "02",
    title: "Video Streaming Platform",
    type: "Event-driven / Microservices",
    year: "2026",
    summary:
      "A distributed video platform with separate catalog, upload, encoding, and playback services. Kafka coordinates asynchronous workflows while FFmpeg produces adaptive HLS streams stored securely on AWS S3.",
    stack: ["Spring Boot", "Kafka", "AWS S3", "FFmpeg"],
    links: [
      { label: "GitHub", href: "https://github.com/HITENDRAS940/Netflix.git" },
    ],
    tone: "violet",
  },
];

const skillGroups = [
  {
    number: "01",
    title: "Languages",
    items: ["Java", "Python", "C++", "SQL"],
  },
  {
    number: "02",
    title: "Backend",
    items: ["Spring Boot", "Spring Security", "JPA / Hibernate", "REST APIs"],
  },
  {
    number: "03",
    title: "Systems & data",
    items: ["PostgreSQL", "Apache Kafka", "Microservices", "FFmpeg"],
  },
  {
    number: "04",
    title: "Cloud & DevOps",
    items: ["AWS", "Docker", "GitHub Actions", "CI / CD"],
  },
];

const profiles = [
  { label: "GitHub", detail: "Code & projects", href: "https://github.com/HITENDRAS940" },
  { label: "LinkedIn", detail: "Experience & network", href: "https://www.linkedin.com/in/hitendra-singh-shaktawat-479758289/" },
  { label: "LeetCode", detail: "Problem solving", href: "https://leetcode.com/u/hitendras940/" },
  { label: "GeeksforGeeks", detail: "DSA practice", href: "https://www.geeksforgeeks.org/user/hitendrij72/" },
];

function FlowField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: 0.5, y: 0.42 };
    const smoothPointer = { x: 0.5, y: 0.42 };
    let width = 0;
    let height = 0;
    let frame = 0;
    let animationId = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const updatePointer = (event: PointerEvent) => {
      pointer.x = event.clientX / Math.max(width, 1);
      pointer.y = event.clientY / Math.max(height, 1);
    };

    const drawRibbon = (
      offset: number,
      thickness: number,
      colorA: string,
      colorB: string,
      speed: number,
    ) => {
      const t = frame * speed;
      const points = 8;
      const top: Array<[number, number]> = [];
      const bottom: Array<[number, number]> = [];

      for (let index = 0; index <= points; index += 1) {
        const progress = index / points;
        const x = progress * width;
        const wave = Math.sin(progress * Math.PI * 2.2 + t + offset) * height * 0.115;
        const smallerWave = Math.cos(progress * Math.PI * 4 - t * 0.7) * height * 0.035;
        const pointerPull =
          Math.exp(-Math.pow(progress - smoothPointer.x, 2) / 0.055) *
          (smoothPointer.y - 0.5) *
          height *
          0.34;
        const center = height * (0.3 + offset * 0.19) + wave + smallerWave + pointerPull;
        top.push([x, center - thickness / 2]);
        bottom.unshift([x, center + thickness / 2]);
      }

      const gradient = context.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, colorA);
      gradient.addColorStop(0.48, colorB);
      gradient.addColorStop(1, colorA);

      context.beginPath();
      [...top, ...bottom].forEach(([x, y], index) => {
        if (index === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      });
      context.closePath();
      context.fillStyle = gradient;
      context.fill();
    };

    const render = () => {
      smoothPointer.x += (pointer.x - smoothPointer.x) * 0.035;
      smoothPointer.y += (pointer.y - smoothPointer.y) * 0.035;

      context.clearRect(0, 0, width, height);
      context.fillStyle = "#080808";
      context.fillRect(0, 0, width, height);
      context.save();
      context.globalCompositeOperation = "screen";
      context.filter = `blur(${Math.max(42, width * 0.045)}px)`;
      drawRibbon(-0.68, height * 0.34, "rgba(195,255,54,.86)", "rgba(57,223,255,.58)", 0.006);
      drawRibbon(0.72, height * 0.27, "rgba(128,91,255,.72)", "rgba(255,107,86,.48)", -0.0045);
      drawRibbon(1.62, height * 0.16, "rgba(255,255,255,.24)", "rgba(57,223,255,.36)", 0.008);
      context.restore();

      frame += reducedMotion ? 0 : 1;
      if (!reducedMotion) animationId = window.requestAnimationFrame(render);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", updatePointer, { passive: true });
    render();

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", updatePointer);
    };
  }, []);

  return <canvas ref={canvasRef} className="flow-field" aria-hidden="true" />;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.16 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return (
    <main>
      <section className="hero" id="home">
        <FlowField />
        <div className="hero-grain" aria-hidden="true" />

        <header className="hero-nav">
          <a className="wordmark" href="#home" aria-label="Hitendra Singh Shaktawat home">
            HS<span>/26</span>
          </a>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navItems.map((item) => (
              <a href={item.href} key={item.label} aria-label={item.label}>
                <span>{item.label}</span>
                <span aria-hidden="true">{item.label}</span>
              </a>
            ))}
          </nav>

          <a className="availability" href="mailto:hitendras940@gmail.com">
            <span /> Open to opportunities
          </a>

          <button
            className="menu-button"
            type="button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>

        {menuOpen ? (
          <nav className="mobile-menu" aria-label="Mobile navigation">
            {navItems.map((item, index) => (
              <a href={item.href} key={item.label} onClick={() => setMenuOpen(false)}>
                <span>0{index + 1}</span>
                {item.label}
              </a>
            ))}
          </nav>
        ) : null}

        <div className="hero-meta" aria-label="Developer summary">
          <p className="hero-intro hero-enter" style={{ "--delay": "160ms" } as React.CSSProperties}>
            I engineer production products<br />
            and dependable backend systems.
          </p>
          <p className="hero-enter" style={{ "--delay": "260ms" } as React.CSSProperties}>
            Java / Spring Boot<br />
            Kafka / PostgreSQL<br />
            AWS / Docker
          </p>
          <p className="hero-enter hero-meta-right" style={{ "--delay": "360ms" } as React.CSSProperties}>
            Udaipur, India<br />
            Working worldwide
          </p>
        </div>

        <div className="hero-title" aria-label="Hitendra Singh Shaktawat, software engineer">
          <div className="title-line title-line-one"><span>Hitendra</span></div>
          <div className="title-line title-line-two"><span>Singh Shaktawat</span></div>
          <div className="title-line title-line-three"><span>Software Engineer</span></div>
        </div>

        <div className="hero-footer">
          <span>Portfolio / 2026</span>
          <a href="#work" aria-label="Scroll to selected work">
            Scroll <ArrowDown size={15} />
          </a>
        </div>
      </section>

      <div className="ticker" aria-hidden="true">
        <div>
          <span>Java</span><i />
          <span>Spring Boot</span><i />
          <span>Kafka</span><i />
          <span>PostgreSQL</span><i />
          <span>AWS</span><i />
          <span>Java</span><i />
          <span>Spring Boot</span><i />
          <span>Kafka</span><i />
          <span>PostgreSQL</span><i />
          <span>AWS</span><i />
        </div>
      </div>

      <section className="about section-pad" id="about">
        <div className="section-kicker" data-reveal>
          <span>01</span>
          <p>About</p>
        </div>
        <div className="about-grid">
          <h2 data-reveal>
            Production-minded.<br />
            <em>Systems-focused.</em> Always learning.
          </h2>
          <div className="about-copy" data-reveal>
            <p>
              I’m Hitendra, a Computer Science student at VIT Vellore focused on backend engineering and distributed systems. I build reliable APIs, transactional workflows, and products that hold up beyond the demo.
            </p>
            <p>
              My work spans a live sports-booking app on both major app stores and an event-driven video platform built with Spring Boot, Kafka, FFmpeg, PostgreSQL, and AWS.
            </p>
            <a className="text-link" href="#resume">
              Read my resume <ArrowUpRight size={17} />
            </a>
          </div>
        </div>
        <div className="about-stats" data-reveal>
          <div><strong>8.43</strong><span>VIT CGPA</span></div>
          <div><strong>150+</strong><span>DSA problems solved</span></div>
          <div><strong>02</strong><span>Production projects</span></div>
        </div>
      </section>

      <section className="work" id="work">
        <div className="section-pad work-heading">
          <div className="section-kicker inverse" data-reveal>
            <span>02</span>
            <p>Selected work</p>
          </div>
          <h2 data-reveal>Things I’ve built.</h2>
        </div>

        <div className="project-list">
          {projects.map((project) => (
            <article className={`project-row ${project.tone}`} key={project.title} data-reveal>
              <div className="project-number">{project.index}</div>
              <div className="project-main">
                <div className="project-meta">
                  <span>{project.type}</span>
                  <span>{project.year}</span>
                </div>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <div className="project-stack">
                  {project.stack.map((item) => <span key={item}>{item}</span>)}
                </div>
                <div className="project-actions">
                  {project.links.map((link) => (
                    <a href={link.href} key={link.label} target="_blank" rel="noreferrer">
                      {link.label} <ArrowUpRight size={13} />
                    </a>
                  ))}
                </div>
              </div>
              <a href={project.links[0].href} target="_blank" rel="noreferrer" aria-label={`Open ${project.title}`}>
                <ArrowUpRight size={30} />
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="skills section-pad" id="skills">
        <div className="section-kicker" data-reveal>
          <span>03</span>
          <p>Capabilities</p>
        </div>
        <div className="skills-heading">
          <h2 data-reveal>From interface<br />to infrastructure.</h2>
          <p data-reveal>A Java-first stack for transactional APIs, asynchronous systems, cloud delivery, and production operations.</p>
        </div>
        <div className="skills-grid">
          {skillGroups.map((group) => (
            <article key={group.title} data-reveal>
              <span>{group.number}</span>
              <Code2 size={21} />
              <h3>{group.title}</h3>
              <ul>
                {group.items.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="resume section-pad" id="resume">
        <div className="section-kicker inverse" data-reveal>
          <span>04</span>
          <p>Resume</p>
        </div>
        <div className="resume-layout">
          <h2 data-reveal>Engineering depth,<br /><em>in one page.</em></h2>
          <div className="resume-lines" data-reveal>
            <div><span>Education</span><strong>B.Tech CSE, VIT Vellore</strong></div>
            <div><span>Timeline</span><strong>2023 - 2027</strong></div>
            <div><span>CGPA</span><strong>8.43 / 10 (July 2026)</strong></div>
            <div><span>Focus</span><strong>Backend engineering & distributed systems</strong></div>
          </div>
          <a className="resume-button" href="/hitendra-singh-shaktawat-resume.pdf" target="_blank" rel="noreferrer" data-reveal>
            <FileText size={20} />
            View full resume
            <ArrowUpRight size={18} />
          </a>
        </div>
      </section>

      <section className="profiles section-pad">
        <div className="section-kicker" data-reveal>
          <span>05</span>
          <p>Elsewhere</p>
        </div>
        <h2 data-reveal>Find me online.</h2>
        <div className="profile-grid">
          {profiles.map((profile) => (
            <a href={profile.href} key={profile.label} target="_blank" rel="noreferrer" data-reveal>
              <span>{profile.detail}</span>
              <strong>{profile.label}</strong>
              <ArrowUpRight size={22} />
            </a>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <div className="contact-top">
          <span>Have a project or opportunity?</span>
          <span>Let’s talk.</span>
        </div>
        <a className="contact-email" href="mailto:hitendras940@gmail.com" data-reveal>
          hitendras940@gmail.com
          <ArrowUpRight />
        </a>
        <div className="contact-bottom">
          <p>Hitendra Singh Shaktawat © 2026</p>
          <div>
            <a href="https://github.com/HITENDRAS940" target="_blank" rel="noreferrer" aria-label="GitHub"><Code2 size={19} /></a>
            <a href="https://www.linkedin.com/in/hitendra-singh-shaktawat-479758289/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><BriefcaseBusiness size={19} /></a>
            <a href="mailto:hitendras940@gmail.com" aria-label="Email"><Mail size={19} /></a>
          </div>
          <a href="tel:+919460629707">+91 94606 29707</a>
          <a href="#home">Back to top <ArrowUpRight size={15} /></a>
        </div>
      </section>
    </main>
  );
}
