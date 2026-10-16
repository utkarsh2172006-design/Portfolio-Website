'use client'

import { useEffect, useState, useRef } from "react"
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Download,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Code2,
  Database,
  BarChart3,
  Sparkles,
  GraduationCap,
  Award,
  MapPin,
  TrendingUp,
  Activity,
  ChevronUp,
  Menu,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// ─────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────

const PERSONAL = {
  name: "Utkarsh Jaiswal",
  title: "Aspiring Data Analyst",
  institution: "IIT Jodhpur",
  email: "utkarsh2172006@gmail.com",
  phone: "+91 9236064084",
  location: "India",
  linkedin: "https://linkedin.com/in/utkarsh-jaiswal-7b2938376",
  github: "https://github.com/utkarsh2172006-design",
  resumePath: "/Utkarsh_Jaiswal_Resume.pdf",
}

const SKILLS_DATA = [
  { name: "Python", level: 75, category: "Programming" },
  { name: "SQL", level: 65, category: "Database" },
  { name: "Power BI", level: 70, category: "BI" },
  { name: "Tableau", level: 68, category: "BI" },
  { name: "Excel", level: 78, category: "BI" },
  { name: "Statistics", level: 60, category: "Analysis" },
  { name: "pandas / numpy", level: 72, category: "Programming" },
  { name: "Data Viz", level: 70, category: "Analysis" },
]

const SKILL_CATEGORIES = [
  {
    name: "Programming & Analysis",
    icon: Code2,
    skills: ["Python", "pandas", "numpy", "matplotlib", "seaborn", "scikit-learn"],
  },
  {
    name: "Databases & SQL",
    icon: Database,
    skills: ["SELECT", "WHERE", "GROUP BY", "JOINs", "Subqueries"],
  },
  {
    name: "BI & Visualization",
    icon: BarChart3,
    skills: ["Power BI", "Tableau", "Excel Pivot Tables", "Dashboards"],
  },
  {
    name: "Analysis Concepts",
    icon: Sparkles,
    skills: ["EDA", "Data Cleaning", "Customer Segmentation", "Uplift Testing"],
  },
]

const RADAR_DATA = [
  { label: "Python", value: 0.75 },
  { label: "SQL", value: 0.65 },
  { label: "BI Tools", value: 0.70 },
  { label: "Statistics", value: 0.60 },
  { label: "Data Viz", value: 0.70 },
  { label: "Analysis", value: 0.78 },
]

const PROJECTS = [
  {
    title: "Quantium Data Analytics Simulation",
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
    impact: [
      { label: "Customer segments", value: 4 },
      { label: "Stores analyzed", value: 8 },
      { label: "Data points", value: 264000 },
    ],
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
    impact: [
      { label: "Equipment sites", value: 4 },
      { label: "Metrics tracked", value: 6 },
      { label: "Anomalies flagged", value: 12 },
    ],
  },
]

const EDUCATION = [
  {
    degree: "BS in Applied AI & Data Science",
    school: "Indian Institute of Technology (IIT) Jodhpur",
    date: "2025 — 2029 (Expected)",
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

const STATS = [
  { label: "CGPA", value: 7.25, suffix: "/10", decimals: 2 },
  { label: "Year", value: 2, suffix: "/4", decimals: 0 },
  { label: "Projects", value: 2, suffix: "", decimals: 0 },
  { label: "Skills tracked", value: 8, suffix: "+", decimals: 0 },
]

// Hero sparkline data (random-ish but deterministic)
const SPARKLINE = [12, 18, 14, 22, 19, 28, 24, 35, 31, 42, 38, 48]

// Tech stack distribution for donut chart
const TECH_DISTRIBUTION = [
  { label: "Python", value: 35, color: "#0D9488" },
  { label: "SQL", value: 20, color: "#0891B2" },
  { label: "BI Tools", value: 25, color: "#6366F1" },
  { label: "Statistics", value: 12, color: "#EC4899" },
  { label: "Other", value: 8, color: "#94A3B8" },
]

// ─────────────────────────────────────────────────────────────
// Hooks
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
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

function useCounter(target: number, duration = 1500, start = false, decimals = 0) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!start) return
    let raf = 0
    const factor = Math.pow(10, decimals)
    const targetScaled = target * factor
    const startTime = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(Math.floor(eased * targetScaled) / factor)
      if (p < 1) raf = requestAnimationFrame(tick)
      else setVal(target)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, start, decimals])
  return val
}

// ─────────────────────────────────────────────────────────────
// Main component
// ─────────────────────────────────────────────────────────────

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [time, setTime] = useState("")

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      setShowTop(window.scrollY > 600)
    }
    const updateTime = () => {
      const t = new Date().toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: "Asia/Kolkata",
      })
      setTime(t)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    updateTime()
    const interval = setInterval(updateTime, 30000)
    return () => {
      window.removeEventListener("scroll", onScroll)
      clearInterval(interval)
    }
  }, [])

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Data", href: "#data" },
    { label: "Work", href: "#work" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-teal-600 selection:text-white relative">
      {/* ─── NAVBAR ─── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-white/80 border-b border-slate-200/80 py-3"
            : "bg-white/0 py-5"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-5 md:px-8 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2 group">
            <span className="w-2 h-2 rounded-full bg-teal-600 group-hover:scale-150 transition-transform" />
            <span className="text-base font-semibold tracking-tight">
              Utkarsh<span className="text-teal-600">.</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-slate-600 hover:text-slate-900 transition-colors relative group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-px bg-teal-600 transition-all duration-300" />
              </a>
            ))}
            <a href={PERSONAL.resumePath} download>
              <Button
                size="sm"
                className="bg-slate-900 hover:bg-slate-800 text-white rounded-full font-medium border-0 px-5 shadow-sm hover:shadow-md transition-all"
              >
                <Download className="w-3.5 h-3.5 mr-1.5" />
                Resume
              </Button>
            </a>
          </div>

          <button
            className="md:hidden text-slate-700"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {menuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 px-5 py-4 flex flex-col gap-4">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-slate-700 hover:text-teal-600"
              >
                {l.label}
              </a>
            ))}
            <a href={PERSONAL.resumePath} download>
              <Button size="sm" className="bg-slate-900 text-white rounded-full w-full">
                <Download className="w-3.5 h-3.5 mr-1.5" />
                Resume
              </Button>
            </a>
          </div>
        )}
      </header>

      <main className="relative">
        {/* ─── HERO ─── */}
        <section id="hero" className="pt-32 md:pt-40 pb-20 md:pb-28 px-5 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
              {/* Left: Text */}
              <div className="lg:col-span-7">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-xs font-medium mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600" />
                  </span>
                  Open to Data Analyst internships
                </div>

                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-5">
                  Utkarsh
                  <br />
                  Jaiswal<span className="text-teal-600">.</span>
                </h1>

                <p className="text-lg md:text-xl text-slate-600 mb-2 max-w-xl">
                  Aspiring Data Analyst · BS Applied AI &amp; Data Science
                </p>
                <p className="text-sm text-slate-500 mb-8 font-mono">
                  Indian Institute of Technology, Jodhpur
                </p>

                <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-9 max-w-xl">
                  Turning raw, messy data into clean, decision-ready insights.
                  Skilled in Python, SQL, Power BI, and Tableau — actively seeking
                  an internship where data meets decisions.
                </p>

                <div className="flex flex-wrap items-center gap-3 mb-8">
                  <a href={PERSONAL.resumePath} download>
                    <Button
                      size="lg"
                      className="bg-slate-900 hover:bg-slate-800 text-white rounded-full font-medium px-6 h-12 shadow-sm hover:shadow-md transition-all group"
                    >
                      <Download className="w-4 h-4 mr-2 group-hover:-translate-y-0.5 transition-transform" />
                      Download Resume
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
                    </Button>
                  </a>
                  <a href="#contact">
                    <Button
                      size="lg"
                      variant="outline"
                      className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 rounded-full font-medium px-6 h-12"
                    >
                      Get in touch
                    </Button>
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <SocialLink href={`mailto:${PERSONAL.email}`} icon={Mail} label="Email" />
                  <SocialLink href={PERSONAL.linkedin} icon={Linkedin} label="LinkedIn" />
                  <SocialLink href={PERSONAL.github} icon={Github} label="GitHub" />
                  <SocialLink href={`tel:${PERSONAL.phone.replace(/\s/g, "")}`} icon={Phone} label="Phone" />
                </div>
              </div>

              {/* Right: Data visual */}
              <div className="lg:col-span-5">
                <HeroDataCard time={time} />
              </div>
            </div>
          </div>
        </section>

        {/* ─── ABOUT ─── */}
        <Section id="about" eyebrow="01" title="About" subtitle="The person behind the data.">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
            <div className="lg:col-span-7">
              <p className="text-2xl md:text-3xl leading-relaxed text-slate-900 font-light mb-6">
                I&apos;m a{" "}
                <span className="font-semibold text-teal-600">curious mind</span> in
                year two of a BS in Applied AI &amp; Data Science at{" "}
                <span className="font-semibold text-slate-900">IIT Jodhpur</span>.
              </p>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-5">
                My toolkit is Python, SQL, Power BI, and Tableau — and I&apos;m
                learning to wield it like a craftsperson. Through hands-on virtual
                internships with Quantium and Deloitte Australia, I&apos;ve cleaned
                messy transactional data, segmented customers, designed uplift tests,
                and built dashboards that surface real business insights — not just
                pretty charts.
              </p>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed">
                Currently sharpening fundamentals in probability, linear algebra, and
                ML while hunting for a Data Analyst internship where I can turn messy
                data into clear decisions.
              </p>
            </div>

            <div className="lg:col-span-5 lg:border-l lg:border-slate-200 lg:pl-10">
              <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-5">
                Quick facts
              </p>
              <dl className="space-y-3">
                {[
                  ["Institute", "IIT Jodhpur"],
                  ["Field", "Applied AI & Data Science"],
                  ["Year", "2nd Year Undergraduate"],
                  ["CGPA", "7.25 / 10"],
                  ["Location", "India"],
                  ["Status", "Open to internships"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-baseline justify-between gap-3 border-b border-slate-100 pb-2"
                  >
                    <dt className="text-xs font-mono uppercase tracking-wider text-slate-400">
                      {k}
                    </dt>
                    <dd className="text-sm font-medium text-slate-900 text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 pt-10 border-t border-slate-200">
            {STATS.map((stat) => (
              <AnimatedStat key={stat.label} {...stat} />
            ))}
          </div>
        </Section>

        {/* ─── SKILLS ─── */}
        <Section
          id="skills"
          eyebrow="02"
          title="Skills"
          subtitle="The toolkit, visualized."
          alt
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
            {/* Left: skill bar chart */}
            <div className="lg:col-span-7">
              <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-6">
                Proficiency levels · self-assessed
              </p>
              <div className="space-y-5">
                {SKILLS_DATA.map((skill, i) => (
                  <SkillBar key={skill.name} skill={skill} index={i} />
                ))}
              </div>
              <p className="text-xs text-slate-400 mt-6 italic">
                Note: Self-assessed proficiency. Happy to demonstrate any of these in
                a technical interview.
              </p>
            </div>

            {/* Right: skill categories grid */}
            <div className="lg:col-span-5 space-y-4">
              <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                Categorized stack
              </p>
              {SKILL_CATEGORIES.map((cat, i) => {
                const Icon = cat.icon
                return (
                  <Card
                    key={cat.name}
                    className="bg-white border-slate-200 hover:border-teal-300 hover:shadow-sm transition-all"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2.5 mb-3">
                        <div className="w-8 h-8 rounded-md bg-teal-50 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-teal-600" />
                        </div>
                        <h3 className="text-sm font-semibold text-slate-900">{cat.name}</h3>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.skills.map((s) => (
                          <span
                            key={s}
                            className="px-2 py-0.5 text-[11px] font-mono bg-slate-50 text-slate-600 border border-slate-200 rounded"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>

          {/* Strengths */}
          <div className="mt-12 pt-8 border-t border-slate-200">
            <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">
              Core strengths
            </p>
            <div className="flex flex-wrap gap-2">
              {STRENGTHS.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-700 bg-white border border-slate-200 rounded-full hover:border-teal-300 hover:bg-teal-50/50 transition-colors"
                >
                  <Sparkles className="w-3 h-3 text-teal-600" />
                  {s}
                </span>
              ))}
            </div>
          </div>
        </Section>

        {/* ─── DATA VIZ SECTION (DEDICATED) ─── */}
        <Section
          id="data"
          eyebrow="03"
          title="Data Stories"
          subtitle="The analyst, visualized."
        >
          <p className="text-sm md:text-base text-slate-600 max-w-2xl mb-10">
            A quick visual overview of my skill distribution, focus areas, and
            technical stack — because a data analyst&apos;s portfolio should{" "}
            <span className="font-semibold text-slate-900">show data, not just talk about it</span>.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Radar chart */}
            <Card className="bg-white border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-1">
                      Skill radar
                    </p>
                    <h3 className="text-sm font-semibold text-slate-900">Domain coverage</h3>
                  </div>
                  <Activity className="w-4 h-4 text-teal-600" />
                </div>
                <RadarChart data={RADAR_DATA} />
                <p className="text-xs text-slate-400 mt-3 text-center">
                  Self-assessed across 6 core data analyst domains
                </p>
              </CardContent>
            </Card>

            {/* Tech distribution donut */}
            <Card className="bg-white border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-1">
                      Stack split
                    </p>
                    <h3 className="text-sm font-semibold text-slate-900">Tech distribution</h3>
                  </div>
                  <TrendingUp className="w-4 h-4 text-teal-600" />
                </div>
                <DonutChart data={TECH_DISTRIBUTION} />
                <div className="space-y-1.5 mt-3">
                  {TECH_DISTRIBUTION.map((t) => (
                    <div key={t.label} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-2.5 h-2.5 rounded-sm"
                          style={{ background: t.color }}
                        />
                        <span className="text-slate-600">{t.label}</span>
                      </div>
                      <span className="font-mono text-slate-500">{t.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Project impact bars */}
            <Card className="bg-white border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-1">
                      Project impact
                    </p>
                    <h3 className="text-sm font-semibold text-slate-900">By the numbers</h3>
                  </div>
                  <BarChart3 className="w-4 h-4 text-teal-600" />
                </div>
                <div className="space-y-4">
                  {PROJECTS.map((p, i) => (
                    <div key={i}>
                      <p className="text-xs font-medium text-slate-700 mb-2 truncate">
                        {p.title.split("—")[0].split("(")[0]}
                      </p>
                      <div className="space-y-1.5">
                        {p.impact.map((imp) => {
                          const max = Math.max(...p.impact.map((x) => x.value))
                          const pct = (imp.value / max) * 100
                          return (
                            <div key={imp.label}>
                              <div className="flex items-center justify-between text-[11px] mb-0.5">
                                <span className="text-slate-500">{imp.label}</span>
                                <span className="font-mono text-slate-700">
                                  {imp.value.toLocaleString()}
                                </span>
                              </div>
                              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full transition-all duration-1000"
                                  style={{ width: `${pct}%` }}
                                />
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Big insight strip */}
          <div className="mt-8 p-6 md:p-8 bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-3xl md:text-4xl font-bold text-teal-400 font-mono">2+</p>
                <p className="text-sm text-slate-300 mt-1">Virtual internships completed</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-teal-400 font-mono">264K+</p>
                <p className="text-sm text-slate-300 mt-1">Data points processed</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-teal-400 font-mono">8+</p>
                <p className="text-sm text-slate-300 mt-1">Tools in active rotation</p>
              </div>
            </div>
          </div>
        </Section>

        {/* ─── WORK / PROJECTS ─── */}
        <Section
          id="work"
          eyebrow="04"
          title="Work"
          subtitle="Projects & simulations."
          alt
        >
          <div className="space-y-6 md:space-y-8">
            {PROJECTS.map((project, idx) => (
              <ProjectCard key={project.title} project={project} index={idx} />
            ))}
          </div>
        </Section>

        {/* ─── EDUCATION ─── */}
        <Section
          id="education"
          eyebrow="05"
          title="Journey"
          subtitle="Education & certifications."
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14">
            {/* Education timeline */}
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-6">
                Education
              </p>
              <div className="relative pl-6">
                <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-teal-500 via-teal-300 to-transparent" />
                {EDUCATION.map((edu, i) => (
                  <div key={i} className="relative mb-8 last:mb-0">
                    <div className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-teal-600 border-2 border-white shadow ring-1 ring-teal-200" />
                    <div className="flex items-center gap-2 mb-1">
                      <GraduationCap className="w-4 h-4 text-teal-600" />
                      <span className="text-xs font-mono text-slate-400">{edu.date}</span>
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-slate-900 mb-1">
                      {edu.degree}
                    </h3>
                    <p className="text-sm text-teal-700 font-medium mb-1">{edu.school}</p>
                    <p className="text-sm text-slate-500 mb-2">{edu.detail}</p>
                    {edu.coursework.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {edu.coursework.map((c) => (
                          <span
                            key={c}
                            className="px-2 py-0.5 text-[10px] font-mono bg-slate-50 text-slate-500 border border-slate-200 rounded"
                          >
                            {c}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications + learning */}
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-6">
                Certifications
              </p>
              <div className="space-y-3 mb-8">
                <CertCard
                  title="Quantium Data Analytics Job Simulation"
                  org="The Forage"
                  year="2025"
                />
                <CertCard
                  title="Deloitte Australia Data Analytics Job Simulation"
                  org="The Forage"
                  year="2025"
                />
              </div>

              <p className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-4">
                Currently learning
              </p>
              <div className="p-5 bg-slate-50 border-l-2 border-teal-500 rounded-r-lg">
                <p className="text-sm text-slate-700 leading-relaxed">
                  Intermediate Python, statistics fundamentals, machine learning basics,
                  and SQL window functions — leveling up to be internship-ready.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* ─── CONTACT ─── */}
        <Section
          id="contact"
          eyebrow="06"
          title="Contact"
          subtitle="Let's build with data."
          alt
        >
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              Got a data problem?
              <br />
              <span className="text-teal-600">Let&apos;s solve it.</span>
            </h3>
            <p className="text-base md:text-lg text-slate-600 mb-10 max-w-xl mx-auto">
              Looking for a Data Analyst intern who&apos;s hungry to learn, ships
              fast, and treats dashboards like a craft. I usually respond within 24 hours.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
              <ContactCard
                href={`mailto:${PERSONAL.email}`}
                icon={Mail}
                label="Email"
                value={PERSONAL.email}
              />
              <ContactCard
                href={PERSONAL.linkedin}
                icon={Linkedin}
                label="LinkedIn"
                value="utkarsh-jaiswal-7b2938376"
              />
              <ContactCard
                href={PERSONAL.github}
                icon={Github}
                label="GitHub"
                value="utkarsh2172006-design"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a href={PERSONAL.resumePath} download>
                <Button
                  size="lg"
                  className="bg-slate-900 hover:bg-slate-800 text-white rounded-full font-medium px-6 h-12 shadow-sm hover:shadow-md transition-all group"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume (PDF)
                </Button>
              </a>
              <a href={`mailto:${PERSONAL.email}`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white border-slate-300 text-slate-700 hover:bg-slate-50 hover:border-slate-400 rounded-full font-medium px-6 h-12 group"
                >
                  Send an email
                  <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-10 text-xs text-slate-500 font-mono">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3 h-3" />
                {PERSONAL.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3" />
                {PERSONAL.location}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-600" />
                </span>
                Available now
              </span>
            </div>
          </div>
        </Section>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-slate-200 bg-white py-8 px-5 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-slate-400">
            © {new Date().getFullYear()} · Utkarsh Jaiswal · Built with care
          </p>
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${PERSONAL.email}`}
              className="text-slate-400 hover:text-teal-600 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-teal-600 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-teal-600 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-slate-900 text-white shadow-lg flex items-center justify-center hover:bg-teal-600 transition-colors"
          aria-label="Back to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      <style jsx global>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: #fff; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: #0d9488; }
      `}</style>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Subcomponents
// ─────────────────────────────────────────────────────────────

function SocialLink({
  href,
  icon: Icon,
  label,
}: {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={label}
      className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-teal-600 hover:border-teal-300 hover:bg-teal-50/50 transition-all hover:-translate-y-0.5"
    >
      <Icon className="w-4 h-4" />
    </a>
  )
}

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  alt = false,
}: {
  id: string
  eyebrow: string
  title: string
  subtitle: string
  children: React.ReactNode
  alt?: boolean
}) {
  const { ref, visible } = useReveal<HTMLDivElement>()
  return (
    <section
      id={id}
      className={`py-20 md:py-28 px-5 md:px-8 ${alt ? "bg-slate-50/60" : "bg-white"}`}
    >
      <div
        ref={ref}
        className="max-w-6xl mx-auto"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(24px)",
          transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        }}
      >
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-xs font-mono uppercase tracking-widest text-teal-600">
              — {eyebrow}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-2">
            {title}
          </h2>
          <p className="text-base md:text-lg text-slate-500">{subtitle}</p>
        </div>
        {children}
      </div>
    </section>
  )
}

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
  const v = useCounter(value, 1500, visible, decimals)
  return (
    <div ref={ref}>
      <p className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
        {typeof v === "number" ? v.toFixed(decimals) : v}
        <span className="text-lg text-slate-400 ml-0.5">{suffix}</span>
      </p>
      <p className="text-xs font-mono uppercase tracking-wider text-slate-400 mt-1.5">
        {label}
      </p>
    </div>
  )
}

function HeroDataCard({ time }: { time: string }) {
  return (
    <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
      <CardContent className="p-0">
        {/* Header bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </div>
            <span className="text-xs font-mono text-slate-500 ml-2">~ analyst_panel.ipynb</span>
          </div>
          <span className="text-xs font-mono text-slate-400">{time} IST</span>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5">
          {/* Top row: 3 mini stats */}
          <div className="grid grid-cols-3 gap-3">
            <MiniStat label="CGPA" value="7.25" sub="/10" trend="+0.3" />
            <MiniStat label="Year" value="2nd" sub="UG" trend="2029" />
            <MiniStat label="Projects" value="2" sub="done" trend="+2" />
          </div>

          {/* Mini bar chart */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
                Skill growth · last 6 months
              </p>
              <TrendingUp className="w-3.5 h-3.5 text-teal-600" />
            </div>
            <MiniBarChart data={[35, 42, 38, 52, 60, 68]} />
          </div>

          {/* Sparkline */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-mono uppercase tracking-widest text-slate-400">
                Data points analyzed
              </p>
              <Activity className="w-3.5 h-3.5 text-teal-600" />
            </div>
            <Sparkline data={SPARKLINE} />
            <div className="flex items-center justify-between mt-1">
              <span className="text-[10px] font-mono text-slate-400">Jan</span>
              <span className="text-[10px] font-mono text-slate-400">Dec</span>
            </div>
          </div>

          {/* Progress rings */}
          <div className="grid grid-cols-3 gap-3 pt-1">
            <ProgressRing label="Python" value={75} color="#0D9488" />
            <ProgressRing label="SQL" value={65} color="#0891B2" />
            <ProgressRing label="BI Tools" value={70} color="#6366F1" />
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-[10px] font-mono text-slate-400">
            live preview · auto-refreshed
          </span>
          <span className="text-[10px] font-mono text-emerald-600 flex items-center gap-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-600" />
            </span>
            online
          </span>
        </div>
      </CardContent>
    </Card>
  )
}

function MiniStat({
  label,
  value,
  sub,
  trend,
}: {
  label: string
  value: string
  sub: string
  trend: string
}) {
  return (
    <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
      <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mb-1">
        {label}
      </p>
      <p className="text-xl font-bold text-slate-900 leading-none">
        {value}
        <span className="text-xs text-slate-400 ml-0.5">{sub}</span>
      </p>
      <p className="text-[10px] font-mono text-teal-600 mt-1.5 flex items-center gap-0.5">
        <TrendingUp className="w-2.5 h-2.5" />
        {trend}
      </p>
    </div>
  )
}

function MiniBarChart({ data }: { data: number[] }) {
  const { ref, visible } = useReveal<HTMLDivElement>()
  const max = Math.max(...data)
  return (
    <div ref={ref} className="flex items-end justify-between gap-1.5 h-16">
      {data.map((v, i) => (
        <div
          key={i}
          className="flex-1 bg-gradient-to-t from-teal-600 to-cyan-400 rounded-t-sm transition-all duration-700 ease-out"
          style={{
            height: visible ? `${(v / max) * 100}%` : "0%",
            transitionDelay: `${i * 80}ms`,
          }}
        />
      ))}
    </div>
  )
}

function Sparkline({ data }: { data: number[] }) {
  const { ref, visible } = useReveal<SVGSVGElement>()
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const w = 240
  const h = 40
  const points = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w
      const y = h - ((v - min) / range) * h
      return `${x},${y}`
    })
    .join(" ")

  const areaPath = `M 0,${h} L ${points
    .split(" ")
    .map((p) => p.replace(",", " "))
    .join(" L ")} L ${w},${h} Z`

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${w} ${h}`}
      className="w-full h-10 overflow-visible"
      preserveAspectRatio="none"
    >
      <defs>
        <linearGradient id="sparkGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0D9488" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#0D9488" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={areaPath}
        fill="url(#sparkGrad)"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 1s ease-out 0.3s",
        }}
      />
      <polyline
        points={points}
        fill="none"
        stroke="#0D9488"
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        style={{
          strokeDasharray: 1000,
          strokeDashoffset: visible ? 0 : 1000,
          transition: "stroke-dashoffset 1.5s ease-out",
        }}
      />
      <circle
        cx={(data.length - 1) / (data.length - 1) * w}
        cy={h - ((data[data.length - 1] - min) / range) * h}
        r="3"
        fill="#0D9488"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.4s ease-out 1.4s",
        }}
      />
    </svg>
  )
}

function ProgressRing({
  label,
  value,
  color,
}: {
  label: string
  value: number
  color: string
}) {
  const { ref, visible } = useReveal<HTMLDivElement>()
  const r = 22
  const circ = 2 * Math.PI * r
  const offset = visible ? circ - (value / 100) * circ : circ

  return (
    <div ref={ref} className="flex flex-col items-center">
      <div className="relative w-14 h-14">
        <svg className="w-14 h-14 -rotate-90" viewBox="0 0 56 56">
          <circle
            cx="28"
            cy="28"
            r={r}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="4"
          />
          <circle
            cx="28"
            cy="28"
            r={r}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={circ}
            strokeDashoffset={offset}
            style={{ transition: "stroke-dashoffset 1.4s ease-out" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-bold text-slate-900">{value}%</span>
        </div>
      </div>
      <p className="text-[10px] font-mono text-slate-500 mt-1.5">{label}</p>
    </div>
  )
}

function SkillBar({
  skill,
  index,
}: {
  skill: { name: string; level: number; category: string }
  index: number
}) {
  const { ref, visible } = useReveal<HTMLDivElement>()
  return (
    <div ref={ref} className="group">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-slate-900">{skill.name}</span>
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
            {skill.category}
          </span>
        </div>
        <span className="text-xs font-mono text-slate-500">{skill.level}%</span>
      </div>
      <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full transition-all duration-1000 ease-out group-hover:from-teal-600 group-hover:to-cyan-600"
          style={{
            width: visible ? `${skill.level}%` : "0%",
            transitionDelay: `${index * 80}ms`,
          }}
        />
      </div>
    </div>
  )
}

function RadarChart({ data }: { data: { label: string; value: number }[] }) {
  const { ref, visible } = useReveal<SVGSVGElement>()
  const size = 180
  const cx = size / 2
  const cy = size / 2
  const maxR = 70
  const angleStep = (2 * Math.PI) / data.length

  // Grid rings (4 levels)
  const rings = [0.25, 0.5, 0.75, 1]

  // Axis points (vertices of the polygon at full extent)
  const axisPoints = data.map((_, i) => {
    const angle = i * angleStep - Math.PI / 2
    return {
      x: cx + Math.cos(angle) * maxR,
      y: cy + Math.sin(angle) * maxR,
    }
  })

  // Data polygon points
  const dataPoints = data.map((d, i) => {
    const angle = i * angleStep - Math.PI / 2
    const r = d.value * maxR
    return {
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
    }
  })

  const dataPath = dataPoints.map((p) => `${p.x},${p.y}`).join(" ")
  const axisPath = axisPoints.map((p) => `${p.x},${p.y}`).join(" ")

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${size} ${size}`}
      className="w-full max-w-[200px] mx-auto"
    >
      {/* Grid rings */}
      {rings.map((ring, i) => {
        const pts = data
          .map((_, j) => {
            const angle = j * angleStep - Math.PI / 2
            const r = ring * maxR
            return `${cx + Math.cos(angle) * r},${cy + Math.sin(angle) * r}`
          })
          .join(" ")
        return (
          <polygon
            key={i}
            points={pts}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="1"
          />
        )
      })}

      {/* Axis lines */}
      {axisPoints.map((p, i) => (
        <line
          key={i}
          x1={cx}
          y1={cy}
          x2={p.x}
          y2={p.y}
          stroke="#E2E8F0"
          strokeWidth="1"
        />
      ))}

      {/* Data polygon */}
      <polygon
        points={dataPath}
        fill="rgba(13, 148, 136, 0.15)"
        stroke="#0D9488"
        strokeWidth="2"
        strokeLinejoin="round"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "scale(1)" : "scale(0.3)",
          transformOrigin: "center",
          transition: "opacity 0.8s ease-out, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      />

      {/* Data points */}
      {dataPoints.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r="3"
          fill="#0D9488"
          style={{
            opacity: visible ? 1 : 0,
            transition: `opacity 0.4s ease-out ${0.6 + i * 0.08}s`,
          }}
        />
      ))}

      {/* Labels */}
      {data.map((d, i) => {
        const angle = i * angleStep - Math.PI / 2
        const labelR = maxR + 16
        const x = cx + Math.cos(angle) * labelR
        const y = cy + Math.sin(angle) * labelR
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="middle"
            className="text-[9px] font-mono fill-slate-500"
          >
            {d.label}
          </text>
        )
      })}
    </svg>
  )
}

function DonutChart({ data }: { data: { label: string; value: number; color: string }[] }) {
  const { ref, visible } = useReveal<SVGSVGElement>()
  const size = 180
  const cx = size / 2
  const cy = size / 2
  const r = 60
  const innerR = 38

  const total = data.reduce((sum, d) => sum + d.value, 0)

  // Compute cumulative angles using reduce (no mutation after render)
  const segmentsWithAngles = data.reduce<
    { startAngle: number; endAngle: number; color: string }[]
  >((acc, d) => {
    const angle = (d.value / total) * 2 * Math.PI
    const startAngle = acc.length === 0 ? -Math.PI / 2 : acc[acc.length - 1].endAngle
    const endAngle = startAngle + angle
    return [...acc, { startAngle, endAngle, color: d.color }]
  }, [])

  const computedSegments = segmentsWithAngles.map((seg) => {
    const { startAngle, endAngle, color } = seg
    const x1 = cx + Math.cos(startAngle) * r
    const y1 = cy + Math.sin(startAngle) * r
    const x2 = cx + Math.cos(endAngle) * r
    const y2 = cy + Math.sin(endAngle) * r
    const x1i = cx + Math.cos(endAngle) * innerR
    const y1i = cy + Math.sin(endAngle) * innerR
    const x2i = cx + Math.cos(startAngle) * innerR
    const y2i = cy + Math.sin(startAngle) * innerR
    const largeArc = (endAngle - startAngle) > Math.PI ? 1 : 0
    return {
      path: `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} L ${x1i} ${y1i} A ${innerR} ${innerR} 0 ${largeArc} 0 ${x2i} ${y2i} Z`,
      color,
    }
  })

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${size} ${size}`}
      className="w-full max-w-[180px] mx-auto"
    >
      {computedSegments.map((seg, i) => (
        <path
          key={i}
          d={seg.path}
          fill={seg.color}
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "scale(1)" : "scale(0)",
            transformOrigin: `${cx}px ${cy}px`,
            transition: `opacity 0.5s ease-out ${i * 0.15}s, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.15}s`,
          }}
        />
      ))}
      <text
        x={cx}
        y={cy - 4}
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-base font-bold fill-slate-900"
        style={{ font: "700 16px var(--font-inter), sans-serif" }}
      >
        {total}%
      </text>
      <text
        x={cx}
        y={cy + 12}
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-[9px] font-mono fill-slate-400 uppercase"
      >
        total
      </text>
    </svg>
  )
}

function ProjectCard({
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
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <Card className="bg-white border-slate-200 hover:border-teal-300 hover:shadow-md transition-all overflow-hidden">
        <CardContent className="p-0">
          <div className="grid md:grid-cols-12">
            {/* Left meta */}
            <div className="md:col-span-3 p-6 bg-slate-50 border-b md:border-b-0 md:border-r border-slate-200">
              <p className="text-xs font-mono text-teal-600 mb-2">
                {String(index + 1).padStart(2, "0")} · {project.type}
              </p>
              <p className="text-xs text-slate-400 font-mono mb-1">{project.date}</p>
              <p className="text-xs text-slate-500">{project.company}</p>
            </div>

            {/* Right content */}
            <div className="md:col-span-9 p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-3">
                {project.title}
              </h3>
              <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                {project.description}
              </p>
              <ul className="space-y-1.5 mb-5">
                {project.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-600">
                    <span className="text-teal-600 mt-0.5 shrink-0">▹</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              {/* Impact mini-stats */}
              <div className="grid grid-cols-3 gap-3 mb-5 p-3 bg-slate-50 rounded-lg">
                {project.impact.map((imp) => (
                  <div key={imp.label}>
                    <p className="text-lg font-bold text-slate-900 leading-none">
                      {imp.value >= 1000 ? `${(imp.value / 1000).toFixed(0)}K` : imp.value}
                    </p>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-slate-400 mt-1">
                      {imp.label}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-1 text-[11px] font-mono bg-slate-100 text-slate-600 rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function CertCard({
  title,
  org,
  year,
}: {
  title: string
  org: string
  year: string
}) {
  return (
    <Card className="bg-white border-slate-200 hover:border-teal-300 hover:shadow-sm transition-all">
      <CardContent className="p-4 flex items-start gap-3">
        <div className="w-8 h-8 rounded-md bg-teal-50 flex items-center justify-center shrink-0">
          <Award className="w-4 h-4 text-teal-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-900 leading-tight mb-1">
            {title}
          </p>
          <p className="text-xs font-mono text-slate-400">
            {org} · {year}
          </p>
        </div>
        <ExternalLink className="w-3.5 h-3.5 text-slate-300" />
      </CardContent>
    </Card>
  )
}

function ContactCard({
  href,
  icon: Icon,
  label,
  value,
}: {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group block"
    >
      <Card className="bg-white border-slate-200 hover:border-teal-300 hover:shadow-sm transition-all">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-2">
            <div className="w-9 h-9 rounded-lg bg-slate-100 group-hover:bg-teal-50 flex items-center justify-center transition-colors">
              <Icon className="w-4 h-4 text-slate-600 group-hover:text-teal-600 transition-colors" />
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-300 group-hover:text-teal-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-1">
            {label}
          </p>
          <p className="text-sm font-medium text-slate-900 truncate">{value}</p>
        </CardContent>
      </Card>
    </a>
  )
}
