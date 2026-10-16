'use client'

import { useEffect, useState, useRef, useCallback } from "react"
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Download,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Sparkles,
  Code2,
  Database,
  BarChart3,
  GraduationCap,
  Award,
  MapPin,
  Asterisk,
  Plus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

// ─────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────

const PERSONAL = {
  name: "Utkarsh Jaiswal",
  title: "Data Analyst in the Making",
  institution: "IIT Jodhpur",
  email: "utkarsh2172006@gmail.com",
  phone: "+91 9236064084",
  location: "India",
  linkedin: "https://linkedin.com/in/utkarsh-jaiswal-7b2938376",
  github: "https://github.com/utkarsh2172006-design",
  resumePath: "/Utkarsh_Jaiswal_Resume.pdf",
}

const SKILLS = [
  {
    category: "Programming",
    icon: Code2,
    color: "#E63946",
    items: ["Python", "pandas", "numpy", "matplotlib", "seaborn", "scikit-learn"],
  },
  {
    category: "Databases & SQL",
    icon: Database,
    color: "#0047FF",
    items: ["SELECT", "WHERE", "GROUP BY", "JOINs", "Subqueries"],
  },
  {
    category: "BI & Visualization",
    icon: BarChart3,
    color: "#FF2D78",
    items: ["Power BI", "Tableau", "Excel Pivot Tables", "Charts & Dashboards"],
  },
  {
    category: "Analysis Concepts",
    icon: Sparkles,
    color: "#00B388",
    items: ["EDA", "Data Cleaning", "Customer Segmentation", "Uplift Testing"],
  },
]

const PROJECTS = [
  {
    title: "Quantium Data Analytics",
    company: "Quantium · via The Forage",
    date: "2025",
    type: "Virtual Internship",
    description:
      "Processed customer transaction data, performed segmentation, and ran uplift testing on a trial layout change to isolate sales impact.",
    bullets: [
      "Cleaned raw transactional data in Python (pandas), handling missing values and inconsistencies",
      "Performed customer segmentation to uncover purchasing trends across product categories",
      "Designed benchmark/control store comparison and applied uplift testing logic",
      "Translated findings into commercial recommendations for category management",
    ],
    stack: ["Python", "pandas", "matplotlib", "Excel"],
    color: "#E63946",
  },
  {
    title: "Deloitte Australia — Daikibo Industrials",
    company: "Deloitte Australia · via The Forage",
    date: "2025",
    type: "Virtual Internship",
    description:
      "Analyzed manufacturing telemetry data to identify data quality issues and equipment performance patterns, then built interactive dashboards.",
    bullets: [
      "Analyzed manufacturing telemetry data to detect data quality issues and equipment patterns",
      "Built dashboards visualizing operational metrics for equipment health monitoring",
      "Identified recurring operational patterns and summarized findings into maintenance insights",
    ],
    stack: ["Excel", "Tableau", "Power BI"],
    color: "#0047FF",
  },
]

const EDUCATION = [
  {
    degree: "BS in Applied AI & Data Science",
    school: "Indian Institute of Technology (IIT) Jodhpur",
    date: "2025 — 2029",
    detail: "1st Year Completed · CGPA 7.25 / 10",
    coursework: [
      "Probability & Statistics",
      "Linear Algebra",
      "Python Programming",
      "DBMS",
      "Data Structures",
      "ML Foundations",
    ],
  },
  {
    degree: "Higher Secondary (Class XII) — PCM",
    school: "CBSE / State Board",
    date: "2025",
    detail: "Physics · Chemistry · Mathematics",
    coursework: [],
  },
]

const STRENGTHS = [
  "Analytical Thinking",
  "Self-Learning",
  "Adaptability",
  "Business Understanding",
  "Problem Solving",
  "Data Storytelling",
]

const MARQUEE_WORDS = [
  "DATA STORYTELLING",
  "PYTHON",
  "SQL",
  "POWER BI",
  "TABLEAU",
  "DASHBOARDS",
  "EDA",
  "STATISTICS",
  "AI / DS",
  "IIT JODHPUR",
]

// ─────────────────────────────────────────────────────────────
// Hook: scroll-triggered reveal
// ─────────────────────────────────────────────────────────────
function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          obs.unobserve(el)
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -80px 0px" }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

// ─────────────────────────────────────────────────────────────
// Hook: animated counter
// ─────────────────────────────────────────────────────────────
function useCounter(target: number, duration = 1500, start = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!start) return
    let raf = 0
    const startTime = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.floor(eased * target))
      if (p < 1) raf = requestAnimationFrame(tick)
      else setVal(target)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, start])
  return val
}

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [cursor, setCursor] = useState({ x: 0, y: 0, hovering: false })
  const [menuOpen, setMenuOpen] = useState(false)
  const [time, setTime] = useState("")

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30)
      setShowTop(window.scrollY > 600)
    }
    const onMouseMove = (e: MouseEvent) => {
      setCursor({ x: e.clientX, y: e.clientY, hovering: false })
    }
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const interactive = target.closest("a, button, [data-cursor='hover']")
      setCursor((c) => ({ ...c, hovering: !!interactive }))
    }
    const updateTime = () => {
      const t = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      })
      setTime(t)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseover", onMouseOver)
    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseover", onMouseOver)
      clearInterval(interval)
    }
  }, [])

  const navLinks = [
    { label: "About", href: "#about", num: "01" },
    { label: "Skills", href: "#skills", num: "02" },
    { label: "Work", href: "#projects", num: "03" },
    { label: "Journey", href: "#education", num: "04" },
    { label: "Contact", href: "#contact", num: "05" },
  ]

  return (
    <div
      className="min-h-screen bg-[#EFE9DD] text-[#0A0A0A] selection:bg-[#E63946] selection:text-white relative overflow-x-hidden"
      style={{ fontFamily: "var(--font-geist-sans), sans-serif" }}
    >
      {/* Custom cursor (desktop only) */}
      <Cursor x={cursor.x} y={cursor.y} hovering={cursor.hovering} />

      {/* Paper noise texture */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.04] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        }}
      />

      {/* ─── NAVBAR ─── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-md bg-[#EFE9DD]/85 border-b border-[#0A0A0A]/15 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <nav className="container mx-auto px-5 md:px-8 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2 group">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E63946] group-hover:scale-150 transition-transform" />
            <span
              className="text-base md:text-lg font-bold tracking-tight"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Utkarsh<span className="text-[#E63946]">.</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group flex items-center gap-1.5 text-sm text-[#0A0A0A]/70 hover:text-[#0A0A0A] transition-colors"
              >
                <span
                  className="text-[10px] font-mono text-[#E63946] opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all"
                  style={{ fontFamily: "var(--font-geist-mono), monospace" }}
                >
                  {l.num}
                </span>
                {l.label}
              </a>
            ))}
            <a href={PERSONAL.resumePath} download>
              <Button
                size="sm"
                className="bg-[#0A0A0A] hover:bg-[#1A1A1A] text-[#EFE9DD] rounded-full font-medium border-0 px-5 group"
              >
                <Download className="w-3.5 h-3.5 mr-1.5 group-hover:-translate-y-0.5 transition-transform" />
                Resume
                <ArrowUpRight className="w-3.5 h-3.5 ml-1 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Button>
            </a>
          </div>

          {/* Mobile menu */}
          <button
            className="md:hidden p-2 -mr-2"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5">
              <span
                className={`block w-6 h-0.5 bg-[#0A0A0A] transition-transform ${
                  menuOpen ? "rotate-45 translate-y-2" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-[#0A0A0A] transition-opacity ${
                  menuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block w-6 h-0.5 bg-[#0A0A0A] transition-transform ${
                  menuOpen ? "-rotate-45 -translate-y-2" : ""
                }`}
              />
            </div>
          </button>
        </nav>

        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-[#EFE9DD] border-b border-[#0A0A0A]/15 px-5 py-6 flex flex-col gap-4">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 text-base text-[#0A0A0A]/80"
              >
                <span className="font-mono text-xs text-[#E63946]">{l.num}</span>
                {l.label}
              </a>
            ))}
            <a href={PERSONAL.resumePath} download className="mt-2">
              <Button className="bg-[#0A0A0A] text-[#EFE9DD] rounded-full w-full">
                <Download className="w-4 h-4 mr-2" />
                Download Resume
              </Button>
            </a>
          </div>
        )}
      </header>

      <main className="relative z-10">
        {/* ─── HERO ─── */}
        <section
          id="hero"
          className="min-h-screen flex flex-col justify-between px-5 md:px-8 pt-32 pb-8 relative"
        >
          {/* Top status bar */}
          <div className="container mx-auto max-w-7xl">
            <div className="flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono uppercase tracking-widest text-[#0A0A0A]/60 mb-12">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00B388] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00B388]" />
                </span>
                <span>Available for Internships</span>
              </div>
              <div className="hidden md:block">
                Portfolio · Vol. 01 · {new Date().getFullYear()}
              </div>
              <div className="font-mono">{time} IST</div>
            </div>
          </div>

          {/* Main hero text */}
          <div className="container mx-auto max-w-7xl flex-1 flex items-center">
            <div className="w-full">
              {/* Eyebrow */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#E63946]">
                  (Aspiring Data Analyst)
                </span>
                <span className="h-px flex-1 max-w-32 bg-[#0A0A0A]/20" />
              </div>

              {/* Big name */}
              <h1
                className="font-black leading-[0.85] tracking-[-0.04em] text-[18vw] md:text-[12vw] lg:text-[10rem] xl:text-[12rem]"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                <span className="block">Utkarsh</span>
                <span className="block italic font-normal text-[#E63946]">
                  Jaiswal<span className="text-[#0A0A0A]">.</span>
                </span>
              </h1>

              {/* Subtext grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-10 md:mt-14">
                <div className="md:col-span-7">
                  <p
                    className="text-xl md:text-2xl leading-relaxed text-[#0A0A0A]/80"
                    style={{ fontFamily: "var(--font-instrument), serif" }}
                  >
                    Turning raw, messy data into clean,{" "}
                    <em className="text-[#E63946]">human-readable</em> stories.
                    Second-year BS Applied AI &amp; Data Science undergrad at{" "}
                    <span className="font-semibold text-[#0A0A0A]">IIT Jodhpur</span>,
                    chasing the craft of dashboards, segmentation, and uplift testing.
                  </p>
                </div>
                <div className="md:col-span-4 md:col-start-9 flex flex-col gap-3 self-end">
                  <a href={PERSONAL.resumePath} download>
                    <Button className="group w-full bg-[#0A0A0A] hover:bg-[#1A1A1A] text-[#EFE9DD] rounded-none h-14 text-base font-medium justify-between px-6">
                      <span className="flex items-center gap-2">
                        <Download className="w-4 h-4" />
                        Download CV
                      </span>
                      <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Button>
                  </a>
                  <a href="#contact">
                    <Button
                      variant="outline"
                      className="group w-full bg-transparent border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#EFE9DD] rounded-none h-14 text-base font-medium justify-between px-6"
                    >
                      Get in touch
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="container mx-auto max-w-7xl mt-16">
            <div className="flex flex-wrap items-center justify-between gap-4 text-xs font-mono uppercase tracking-widest text-[#0A0A0A]/60">
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3" />
                {PERSONAL.location}
              </div>
              <div className="hidden md:flex items-center gap-1.5">
                <span>Scroll to explore</span>
                <span className="animate-bounce">↓</span>
              </div>
              <div className="flex items-center gap-3">
                <a href={`mailto:${PERSONAL.email}`} aria-label="Email" className="hover:text-[#E63946] transition-colors">
                  <Mail className="w-4 h-4" />
                </a>
                <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-[#0047FF] transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="hover:text-[#0A0A0A] transition-colors">
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Decorative asterisks */}
          <Asterisk className="absolute top-32 right-8 w-12 h-12 text-[#E63946] animate-spin-slow hidden md:block" />
          <Plus className="absolute bottom-32 left-8 w-8 h-8 text-[#0047FF] rotate-45 hidden md:block" />
        </section>

        {/* ─── MARQUEE 1 ─── */}
        <Marquee words={MARQUEE_WORDS} bg="#0A0A0A" fg="#EFE9DD" accent="#E63946" />

        {/* ─── ABOUT ─── */}
        <Section id="about" num="01" title="About" subtitle="Who I am.">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
            <div className="md:col-span-7">
              <p
                className="text-2xl md:text-4xl leading-[1.3] tracking-tight"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                I&apos;m a{" "}
                <span className="italic text-[#E63946]">curious mind</span> in
                year two of a BS in Applied AI &amp; Data Science at{" "}
                <span className="underline decoration-2 underline-offset-4 decoration-[#0047FF]">
                  IIT Jodhpur
                </span>
                . My toolkit is{" "}
                <span className="font-bold">Python, SQL, Power BI</span> &amp;{" "}
                <span className="font-bold">Tableau</span> — and I&apos;m learning
                to wield it like a craftsperson.
              </p>

              <p className="mt-8 text-base md:text-lg text-[#0A0A0A]/70 leading-relaxed">
                Through hands-on virtual internships with{" "}
                <span className="font-semibold text-[#0A0A0A]">Quantium</span> and{" "}
                <span className="font-semibold text-[#0A0A0A]">Deloitte Australia</span>,
                I&apos;ve cleaned messy transactional data, segmented customers,
                designed uplift tests, and built dashboards that surface real
                business insights — not just pretty charts.
              </p>

              <p className="mt-5 text-base md:text-lg text-[#0A0A0A]/70 leading-relaxed">
                Currently sharpening fundamentals in probability, linear algebra,
                and ML, while hunting for a{" "}
                <span className="font-semibold text-[#E63946]">Data Analyst internship</span>{" "}
                where I can turn messy data into clear decisions.
              </p>
            </div>

            <div className="md:col-span-5 md:pl-8 md:border-l border-[#0A0A0A]/15">
              <p className="text-xs font-mono uppercase tracking-widest text-[#0A0A0A]/50 mb-6">
                — Quick facts
              </p>
              <dl className="space-y-4">
                {[
                  ["Institute", "IIT Jodhpur"],
                  ["Field", "Applied AI & Data Science"],
                  ["Year", "2nd Year Undergraduate"],
                  ["CGPA", "7.25 / 10"],
                  ["Location", "India"],
                  ["Status", "Open to internships"],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-3 border-b border-dashed border-[#0A0A0A]/15 pb-3">
                    <dt className="text-xs font-mono uppercase tracking-wider text-[#0A0A0A]/50">
                      {k}
                    </dt>
                    <dd className="text-sm md:text-base font-medium text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 pt-10 border-t-2 border-[#0A0A0A]">
            <AnimatedStat value={7.25} suffix="/10" label="CGPA" decimals={2} />
            <AnimatedStat value={2} suffix="nd yr" label="of undergrad" />
            <AnimatedStat value={2} suffix="" label="virtual internships" />
            <AnimatedStat value={2029} suffix="" label="graduating class" />
          </div>
        </Section>

        {/* ─── MARQUEE 2 ─── */}
        <Marquee
          words={["PYTHON", "SQL", "TABLEAU", "POWER BI", "PANDAS", "NUMPY", "EDA", "DASHBOARDS"]}
          bg="#E63946"
          fg="#EFE9DD"
          accent="#0A0A0A"
        />

        {/* ─── SKILLS ─── */}
        <Section id="skills" num="02" title="Skills" subtitle="The toolkit.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {SKILLS.map((skill, i) => {
              const Icon = skill.icon
              return (
                <SkillCard
                  key={skill.category}
                  skill={skill}
                  icon={Icon}
                  index={i}
                />
              )
            })}
          </div>

          {/* Strengths */}
          <div className="mt-12 pt-8 border-t border-[#0A0A0A]/20">
            <p className="text-xs font-mono uppercase tracking-widest text-[#0A0A0A]/50 mb-5">
              — Core strengths
            </p>
            <div className="flex flex-wrap gap-2 md:gap-3">
              {STRENGTHS.map((s, i) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-2 px-4 py-2 border border-[#0A0A0A] rounded-full text-sm font-medium hover:bg-[#0A0A0A] hover:text-[#EFE9DD] transition-colors cursor-default"
                  style={{ transitionDelay: `${i * 30}ms` }}
                >
                  <Asterisk className="w-3 h-3 text-[#E63946]" />
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Section>

        {/* ─── PROJECTS ─── */}
        <Section id="projects" num="03" title="Work" subtitle="Projects & simulations.">
          <div className="space-y-8 md:space-y-12">
            {PROJECTS.map((project, idx) => (
              <ProjectBlock key={project.title} project={project} index={idx} />
            ))}
          </div>

          {/* Call to action */}
          <div className="mt-16 p-8 md:p-12 bg-[#0A0A0A] text-[#EFE9DD] rounded-none">
            <div className="grid md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8">
                <p
                  className="text-2xl md:text-3xl leading-tight"
                  style={{ fontFamily: "var(--font-playfair), serif" }}
                >
                  Want a deeper look at my code &amp; experiments?
                </p>
                <p className="text-sm text-[#EFE9DD]/60 mt-2">
                  Head over to my GitHub for repositories, Jupyter notebooks, and works in progress.
                </p>
              </div>
              <div className="md:col-span-4 flex md:justify-end">
                <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-[#E63946] hover:bg-[#ff5050] text-[#EFE9DD] rounded-none h-14 px-6 font-medium group">
                    Visit GitHub
                    <ArrowUpRight className="w-5 h-5 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </Section>

        {/* ─── EDUCATION ─── */}
        <Section id="education" num="04" title="Journey" subtitle="Education & certifications.">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-[#0A0A0A]/50 mb-6">
                — Education
              </p>
              <div className="space-y-6">
                {EDUCATION.map((edu, i) => (
                  <EduCard key={i} edu={edu} />
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-[#0A0A0A]/50 mb-6">
                — Certifications
              </p>
              <div className="space-y-4">
                <CertCard
                  title="Quantium Data Analytics Job Simulation"
                  org="The Forage"
                  year="2025"
                  color="#E63946"
                />
                <CertCard
                  title="Deloitte Australia Data Analytics Job Simulation"
                  org="The Forage"
                  year="2025"
                  color="#0047FF"
                />
              </div>

              {/* Strengths as visual block */}
              <div className="mt-8 p-6 bg-[#FF2D78]/10 border-l-4 border-[#FF2D78]">
                <p className="text-xs font-mono uppercase tracking-widest text-[#FF2D78] mb-3">
                  Currently learning
                </p>
                <p
                  className="text-lg md:text-xl"
                  style={{ fontFamily: "var(--font-instrument), serif" }}
                >
                  Intermediate Python, statistics fundamentals, machine learning
                  basics, and SQL window functions.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* ─── CONTACT ─── */}
        <section id="contact" className="py-24 md:py-32 px-5 md:px-8 bg-[#0A0A0A] text-[#EFE9DD] relative overflow-hidden">
          {/* Big decorative type */}
          <div
            className="absolute -top-8 -right-8 text-[20vw] font-black opacity-[0.05] leading-none select-none pointer-events-none"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            HELLO.
          </div>

          <div className="container mx-auto max-w-7xl relative">
            <p className="text-xs font-mono uppercase tracking-widest text-[#E63946] mb-4">
              — 05 / Let&apos;s talk
            </p>
            <h2
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] mb-8"
              style={{ fontFamily: "var(--font-playfair), serif" }}
            >
              Got a{" "}
              <span className="italic font-normal text-[#E63946]">data</span>{" "}
              problem?
              <br />
              <span className="text-[#EFE9DD]/60">Let&apos;s solve it.</span>
            </h2>

            <p
              className="text-xl md:text-2xl text-[#EFE9DD]/70 max-w-2xl mb-16"
              style={{ fontFamily: "var(--font-instrument), serif" }}
            >
              Looking for a Data Analyst intern who&apos;s hungry to learn, ships
              fast, and treats dashboards like a craft. Let&apos;s connect.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <ContactRow
                href={`mailto:${PERSONAL.email}`}
                label="Email"
                value={PERSONAL.email}
                icon={Mail}
                color="#E63946"
              />
              <ContactRow
                href={PERSONAL.linkedin}
                label="LinkedIn"
                value="utkarsh-jaiswal-7b2938376"
                icon={Linkedin}
                color="#0047FF"
              />
              <ContactRow
                href={PERSONAL.github}
                label="GitHub"
                value="utkarsh2172006-design"
                icon={Github}
                color="#00B388"
              />
            </div>

            <div className="mt-12 pt-8 border-t border-[#EFE9DD]/15 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <p className="text-sm text-[#EFE9DD]/50">
                <Phone className="inline w-4 h-4 mr-1.5 -translate-y-0.5" />
                {PERSONAL.phone}
                <span className="mx-3">·</span>
                <MapPin className="inline w-4 h-4 mr-1.5 -translate-y-0.5" />
                {PERSONAL.location}
              </p>
              <a href={PERSONAL.resumePath} download>
                <Button className="bg-[#E63946] hover:bg-[#FF5050] text-[#EFE9DD] rounded-none h-12 px-6 font-medium group">
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume (PDF)
                  <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="bg-[#0A0A0A] text-[#EFE9DD] py-8 px-5 md:px-8 border-t border-[#EFE9DD]/10">
        <div className="container mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono uppercase tracking-widest text-[#EFE9DD]/40">
            © {new Date().getFullYear()} · Utkarsh Jaiswal · Built with care
          </p>
          <a
            href="#hero"
            className="text-xs font-mono uppercase tracking-widest text-[#EFE9DD]/40 hover:text-[#E63946] transition-colors flex items-center gap-2"
          >
            Back to top
            <ArrowUpRight className="w-3 h-3" />
          </a>
        </div>
      </footer>

      {/* Back-to-top button */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-[#E63946] text-[#EFE9DD] shadow-lg flex items-center justify-center hover:scale-110 hover:rotate-12 transition-all"
          aria-label="Back to top"
        >
          <ArrowUpRight className="w-5 h-5 -rotate-45" />
        </button>
      )}

      <style jsx global>{`
        html { scroll-behavior: smooth; }
        @media (min-width: 768px) {
          body { cursor: none; }
          a, button, [data-cursor='hover'] { cursor: none; }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 30s linear infinite; }
        .marquee-reverse { animation-direction: reverse; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        ::-webkit-scrollbar { width: 10px; height: 10px; }
        ::-webkit-scrollbar-track { background: #EFE9DD; }
        ::-webkit-scrollbar-thumb { background: #0A0A0A; }
        ::-webkit-scrollbar-thumb:hover { background: #E63946; }
      `}</style>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Cursor
// ─────────────────────────────────────────────────────────────
function Cursor({ x, y, hovering }: { x: number; y: number; hovering: boolean }) {
  if (typeof window !== "undefined" && window.innerWidth < 768) return null
  return (
    <>
      <div
        className="pointer-events-none fixed z-[100] hidden md:block mix-blend-difference"
        style={{
          left: x,
          top: y,
          transform: `translate(-50%, -50%) scale(${hovering ? 2.5 : 1})`,
          transition: "transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <div className="w-3 h-3 rounded-full bg-white" />
      </div>
      <div
        className="pointer-events-none fixed z-[100] hidden md:block"
        style={{
          left: x,
          top: y,
          transform: `translate(-50%, -50%) scale(${hovering ? 0 : 1})`,
          transition: "transform 300ms ease-out, left 200ms ease-out, top 200ms ease-out",
        }}
      >
        <div className="w-8 h-8 rounded-full border border-[#0A0A0A]/40" />
      </div>
    </>
  )
}

// ─────────────────────────────────────────────────────────────
// Marquee
// ─────────────────────────────────────────────────────────────
function Marquee({
  words,
  bg,
  fg,
  accent,
}: {
  words: string[]
  bg: string
  fg: string
  accent: string
}) {
  const doubled = [...words, ...words, ...words, ...words]
  return (
    <div
      className="py-4 md:py-5 overflow-hidden border-y"
      style={{ background: bg, color: fg, borderColor: bg }}
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {doubled.map((word, i) => (
          <span
            key={i}
            className="mx-6 md:mx-10 text-2xl md:text-4xl font-black tracking-tight flex items-center gap-6 md:gap-10"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            <span style={{ color: i % 4 === 1 ? accent : fg }}>{word}</span>
            <Asterisk
              className="w-5 h-5 md:w-7 md:h-7 shrink-0"
              style={{ color: accent }}
            />
          </span>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Section wrapper
// ─────────────────────────────────────────────────────────────
function Section({
  id,
  num,
  title,
  subtitle,
  children,
}: {
  id: string
  num: string
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  const { ref, visible } = useReveal<HTMLDivElement>()
  return (
    <section id={id} className="py-24 md:py-32 px-5 md:px-8 relative">
      <div
        ref={ref}
        className="container mx-auto max-w-7xl"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(40px)",
          transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
        }}
      >
        {/* Section header */}
        <div className="mb-12 md:mb-20">
          <div className="flex items-baseline gap-3 mb-3">
            <span
              className="text-xs font-mono uppercase tracking-widest text-[#E63946]"
              style={{ fontFamily: "var(--font-geist-mono), monospace" }}
            >
              — {num} /
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-[#0A0A0A]/50">
              {subtitle}
            </span>
          </div>
          <h2
            className="text-6xl md:text-8xl lg:text-9xl font-black tracking-[-0.04em] leading-[0.9]"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {title}
            <span className="text-[#E63946]">.</span>
          </h2>
        </div>
        {children}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// Animated stat
// ─────────────────────────────────────────────────────────────
function AnimatedStat({
  value,
  suffix,
  label,
  decimals = 0,
}: {
  value: number
  suffix: string
  label: string
  decimals?: number
}) {
  const { ref, visible } = useReveal<HTMLDivElement>()
  const v = useCounter(value * Math.pow(10, decimals), 1800, visible)
  const display = (v / Math.pow(10, decimals)).toFixed(decimals)

  return (
    <div ref={ref} className="group">
      <p
        className="text-5xl md:text-6xl lg:text-7xl font-black leading-none group-hover:text-[#E63946] transition-colors"
        style={{ fontFamily: "var(--font-playfair), serif" }}
      >
        {display}
        <span className="text-2xl md:text-3xl text-[#0A0A0A]/40 ml-1">{suffix}</span>
      </p>
      <p className="mt-3 text-xs md:text-sm font-mono uppercase tracking-wider text-[#0A0A0A]/60">
        {label}
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Skill card with tilt
// ─────────────────────────────────────────────────────────────
function SkillCard({
  skill,
  icon: Icon,
  index,
}: {
  skill: typeof SKILLS[number]
  icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>
  index: number
}) {
  const { ref, visible } = useReveal<HTMLDivElement>()
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ rx: -py * 8, ry: px * 8 })
  }
  const onMouseLeave = () => setTilt({ rx: 0, ry: 0 })

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="group relative bg-white border-2 border-[#0A0A0A] p-6 md:p-8 transition-all duration-300 hover:shadow-[8px_8px_0_0_#0A0A0A] hover:-translate-x-1 hover:-translate-y-1"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`
          : "perspective(1000px) translateY(40px)",
        transition: "opacity 0.6s ease-out, transform 0.2s ease-out, box-shadow 0.3s ease",
        transitionDelay: visible ? `${index * 80}ms` : "0ms",
      }}
    >
      {/* Number */}
      <div className="absolute top-4 right-4 text-xs font-mono text-[#0A0A0A]/30">
        0{index + 1}
      </div>

      {/* Icon */}
      <div
        className="w-14 h-14 mb-6 flex items-center justify-center rounded-none"
        style={{ background: skill.color }}
      >
        <Icon className="w-7 h-7 text-white" />
      </div>

      {/* Title */}
      <h3
        className="text-2xl md:text-3xl font-bold mb-4"
        style={{ fontFamily: "var(--font-playfair), serif" }}
      >
        {skill.category}
      </h3>

      {/* Items */}
      <div className="flex flex-wrap gap-1.5">
        {skill.items.map((item) => (
          <span
            key={item}
            className="inline-block px-2.5 py-1 text-xs font-mono border border-[#0A0A0A]/30 text-[#0A0A0A]/70 group-hover:border-[#0A0A0A] transition-colors"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Project block
// ─────────────────────────────────────────────────────────────
function ProjectBlock({
  project,
  index,
}: {
  project: typeof PROJECTS[number]
  index: number
}) {
  const { ref, visible } = useReveal<HTMLDivElement>()
  return (
    <div
      ref={ref}
      className="group relative border-t-2 border-[#0A0A0A] pt-6 md:pt-8"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-start">
        {/* Number + meta */}
        <div className="md:col-span-3 flex md:flex-col items-start gap-3">
          <span
            className="text-5xl md:text-7xl font-black leading-none"
            style={{ fontFamily: "var(--font-playfair), serif", color: project.color }}
          >
            0{index + 1}
          </span>
          <div className="md:mt-4">
            <Badge className="bg-transparent border border-[#0A0A0A] text-[#0A0A0A] rounded-none font-mono text-[10px] uppercase tracking-wider">
              {project.type}
            </Badge>
            <p className="text-xs font-mono text-[#0A0A0A]/50 mt-3">{project.date}</p>
            <p className="text-xs text-[#0A0A0A]/60 mt-1">{project.company}</p>
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-9">
          <h3
            className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 group-hover:text-[#0A0A0A] transition-colors"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            {project.title}
          </h3>
          <p
            className="text-lg md:text-xl text-[#0A0A0A]/70 mb-6 leading-relaxed"
            style={{ fontFamily: "var(--font-instrument), serif" }}
          >
            {project.description}
          </p>

          <ul className="space-y-2 mb-6">
            {project.bullets.map((b, i) => (
              <li key={i} className="flex gap-3 text-sm md:text-base text-[#0A0A0A]/80">
                <span
                  className="font-mono shrink-0 mt-0.5"
                  style={{ color: project.color }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{b}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 text-xs font-mono bg-[#0A0A0A] text-[#EFE9DD]"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Education card
// ─────────────────────────────────────────────────────────────
function EduCard({ edu }: { edu: typeof EDUCATION[number] }) {
  return (
    <Card className="bg-transparent border-0 border-l-2 border-[#0A0A0A] pl-5 md:pl-6 rounded-none shadow-none hover:border-[#E63946] transition-colors">
      <CardContent className="p-0">
        <div className="flex items-center gap-2 mb-2">
          <GraduationCap className="w-4 h-4 text-[#E63946]" />
          <span className="text-xs font-mono text-[#0A0A0A]/50 uppercase tracking-wider">
            {edu.date}
          </span>
        </div>
        <h3
          className="text-xl md:text-2xl font-bold leading-tight mb-1"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          {edu.degree}
        </h3>
        <p className="text-sm text-[#0047FF] font-medium mb-2">{edu.school}</p>
        <p className="text-sm text-[#0A0A0A]/60 mb-3">{edu.detail}</p>
        {edu.coursework.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-3">
            {edu.coursework.map((c) => (
              <span
                key={c}
                className="px-2 py-0.5 text-[10px] font-mono bg-[#0A0A0A]/5 border border-[#0A0A0A]/20 text-[#0A0A0A]/70"
              >
                {c}
              </span>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ─────────────────────────────────────────────────────────────
// Cert card
// ─────────────────────────────────────────────────────────────
function CertCard({
  title,
  org,
  year,
  color,
}: {
  title: string
  org: string
  year: string
  color: string
}) {
  return (
    <div
      className="group p-5 bg-white border-2 border-[#0A0A0A] hover:shadow-[6px_6px_0_0_#0A0A0A] hover:-translate-x-1 hover:-translate-y-1 transition-all"
      data-cursor="hover"
    >
      <div className="flex items-start gap-3">
        <Award className="w-5 h-5 shrink-0 mt-0.5" style={{ color }} />
        <div className="flex-1">
          <p className="text-sm font-bold leading-tight mb-1">{title}</p>
          <p className="text-xs font-mono text-[#0A0A0A]/50">
            {org} · {year}
          </p>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Contact row
// ─────────────────────────────────────────────────────────────
function ContactRow({
  href,
  label,
  value,
  icon: Icon,
  color,
}: {
  href: string
  label: string
  value: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group block py-6 border-t border-[#EFE9DD]/15 hover:bg-[#EFE9DD]/5 transition-colors px-2"
    >
      <div className="flex items-center justify-between gap-4 mb-3">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4" style={{ color }} />
          <span className="text-xs font-mono uppercase tracking-widest text-[#EFE9DD]/50">
            {label}
          </span>
        </div>
        <ArrowUpRight className="w-4 h-4 text-[#EFE9DD]/30 group-hover:text-[#E63946] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
      </div>
      <p className="text-lg md:text-xl font-medium break-all" style={{ fontFamily: "var(--font-playfair), serif" }}>
        {value}
      </p>
    </a>
  )
}
