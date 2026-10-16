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
  Code2,
  Database,
  BarChart3,
  Sparkles,
  GraduationCap,
  Award,
  MapPin,
  Cpu,
  Brain,
  Activity,
  GitBranch,
  Layers,
  ChevronUp,
  Menu,
  X,
  Terminal,
  Zap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

// ─────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────

const PERSONAL = {
  name: "Utkarsh Jaiswal",
  title: "AI & Data Science Undergraduate",
  institution: "IIT Jodhpur",
  email: "utkarsh2172006@gmail.com",
  phone: "+91 9236064084",
  location: "India",
  linkedin: "https://linkedin.com/in/utkarsh-jaiswal-7b2938376",
  github: "https://github.com/utkarsh2172006-design",
  resumePath: "/Utkarsh_Jaiswal_Resume.pdf",
}

const SKILL_LAYERS = [
  {
    layer: "L1",
    name: "Input Layer",
    subtitle: "Data ingestion & preprocessing",
    icon: Database,
    color: "#00D9FF",
    skills: [
      { name: "Python", level: 75 },
      { name: "pandas", level: 72 },
      { name: "numpy", level: 70 },
      { name: "SQL", level: 65 },
    ],
  },
  {
    layer: "L2",
    name: "Hidden Layer",
    subtitle: "Analysis & modeling",
    icon: Brain,
    color: "#A855F7",
    skills: [
      { name: "Statistics", level: 60 },
      { name: "EDA", level: 78 },
      { name: "scikit-learn", level: 55 },
      { name: "Data Cleaning", level: 75 },
    ],
  },
  {
    layer: "L3",
    name: "Hidden Layer",
    subtitle: "Visualization & storytelling",
    icon: BarChart3,
    color: "#EC4899",
    skills: [
      { name: "Power BI", level: 70 },
      { name: "Tableau", level: 68 },
      { name: "matplotlib", level: 72 },
      { name: "Dashboards", level: 75 },
    ],
  },
  {
    layer: "L4",
    name: "Output Layer",
    subtitle: "Decisions & deployment",
    icon: Sparkles,
    color: "#10B981",
    skills: [
      { name: "Data Storytelling", level: 80 },
      { name: "Uplift Testing", level: 65 },
      { name: "Segmentation", level: 72 },
      { name: "Excel", level: 78 },
    ],
  },
]

const PROJECTS = [
  {
    title: "Quantium Data Analytics Simulation",
    company: "Quantium · via The Forage",
    date: "2025",
    type: "VIRTUAL INTERNSHIP",
    description:
      "Processed customer transaction data, performed segmentation, and ran uplift testing on a trial layout change to isolate sales impact.",
    bullets: [
      "Cleaned raw transactional data in Python (pandas), handling missing values and inconsistencies",
      "Performed customer segmentation to uncover purchasing trends across product categories",
      "Designed benchmark/control store comparison and applied uplift testing logic",
      "Translated findings into commercial recommendations for category management",
    ],
    stack: ["Python", "pandas", "matplotlib", "Excel"],
    metrics: [
      { label: "Customer segments", value: 4 },
      { label: "Stores analyzed", value: 8 },
      { label: "Data points", value: 264000 },
    ],
    color: "#00D9FF",
  },
  {
    title: "Deloitte Australia — Daikibo Industrials",
    company: "Deloitte Australia · via The Forage",
    date: "2025",
    type: "VIRTUAL INTERNSHIP",
    description:
      "Analyzed manufacturing telemetry data to identify data quality issues and equipment performance patterns, then built interactive dashboards.",
    bullets: [
      "Analyzed manufacturing telemetry data to detect data quality issues and equipment patterns",
      "Built dashboards visualizing operational metrics for equipment health monitoring",
      "Identified recurring operational patterns and summarized findings into maintenance insights",
    ],
    stack: ["Excel", "Tableau", "Power BI"],
    metrics: [
      { label: "Equipment sites", value: 4 },
      { label: "Metrics tracked", value: 6 },
      { label: "Anomalies flagged", value: 12 },
    ],
    color: "#A855F7",
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

const TRAINING_LOSS = [
  0.95, 0.78, 0.65, 0.54, 0.48, 0.42, 0.38, 0.34, 0.31, 0.29, 0.27, 0.26,
  0.24, 0.23, 0.22, 0.21, 0.205, 0.20, 0.198, 0.195,
]

const TYPING_LINES = [
  { prompt: ">>> ", code: "import pandas as pd", comment: "# load the toolkit" },
  { prompt: ">>> ", code: "df = pd.read_csv('life.csv')", comment: "# 21 years of data" },
  { prompt: ">>> ", code: "model.fit(X_train, y_train)", comment: "# learning..." },
  { prompt: ">>> ", code: "accuracy = model.score(X_test, y_test)", comment: "" },
  { prompt: ">>> ", code: "print(f'IGP ready: {accuracy:.2%}')", comment: "" },
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
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, visible }
}

function useCounter(target: number, duration = 1500, start = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!start) return
    let raf = 0
    const startTime = performance.now()
    const tick = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setVal(eased * target)
      if (p < 1) raf = requestAnimationFrame(tick)
      else setVal(target)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, duration, start])
  return val
}

// ─────────────────────────────────────────────────────────────
// Main
// ─────────────────────────────────────────────────────────────

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20)
      setShowTop(window.scrollY > 600)
    }
    const onMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("mousemove", onMouseMove)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("mousemove", onMouseMove)
    }
  }, [])

  const navLinks = [
    { label: "Architecture", href: "#architecture" },
    { label: "Layers", href: "#layers" },
    { label: "Training", href: "#training" },
    { label: "Experiments", href: "#experiments" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <div className="min-h-screen bg-[#050714] text-slate-100 selection:bg-cyan-500/30 selection:text-white relative overflow-x-hidden">
      {/* Neural network animated background */}
      <NeuralBackground mouse={mouse} />

      {/* Scanlines overlay */}
      <div
        className="pointer-events-none fixed inset-0 z-[1] opacity-[0.04]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0, 217, 255, 0.3) 2px, rgba(0, 217, 255, 0.3) 3px)",
        }}
      />

      {/* ─── NAVBAR ─── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-[#050714]/80 border-b border-cyan-500/15 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <nav className="max-w-6xl mx-auto px-5 md:px-8 flex items-center justify-between">
          <a href="#hero" className="flex items-center gap-2.5 group">
            <div className="relative w-7 h-7">
              <div className="absolute inset-0 rounded-md bg-gradient-to-br from-cyan-400 to-purple-500 opacity-80 group-hover:opacity-100 transition-opacity" />
              <div className="absolute inset-0.5 rounded-[5px] bg-[#050714] flex items-center justify-center">
                <span
                  className="text-[10px] font-bold bg-gradient-to-br from-cyan-300 to-purple-300 bg-clip-text text-transparent"
                  style={{ fontFamily: "var(--font-mono), monospace" }}
                >
                  UJ
                </span>
              </div>
              <div className="absolute inset-0 rounded-md bg-cyan-400/30 blur-md group-hover:blur-lg transition-all" />
            </div>
            <span
              className="text-sm font-semibold tracking-tight"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              utkarsh<span className="text-cyan-400">.</span>neural
            </span>
          </a>

          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="group relative text-sm text-slate-400 hover:text-cyan-300 transition-colors font-mono"
              >
                <span className="text-cyan-500/50 mr-1">/</span>
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-px bg-cyan-400 transition-all duration-300" />
              </a>
            ))}
            <a href={PERSONAL.resumePath} download>
              <Button
                size="sm"
                className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-[#050714] font-semibold rounded-md border-0 px-4 group shadow-[0_0_20px_-5px_rgba(0,217,255,0.6)]"
              >
                <Download className="w-3.5 h-3.5 mr-1.5" />
                Resume
              </Button>
            </a>
          </div>

          <button
            className="md:hidden text-slate-300"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 backdrop-blur-xl bg-[#050714]/95 border-b border-cyan-500/15 px-5 py-4 flex flex-col gap-4">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm font-mono text-slate-300 hover:text-cyan-300"
              >
                <span className="text-cyan-500/50 mr-1">/</span>
                {l.label}
              </a>
            ))}
            <a href={PERSONAL.resumePath} download>
              <Button size="sm" className="bg-gradient-to-r from-cyan-500 to-purple-500 text-[#050714] w-full font-semibold">
                <Download className="w-3.5 h-3.5 mr-1.5" />
                Resume
              </Button>
            </a>
          </div>
        )}
      </header>

      <main className="relative z-10">
        {/* ─── HERO ─── */}
        <section id="hero" className="min-h-screen flex items-center px-5 md:px-8 pt-32 pb-20 relative">
          <div className="max-w-6xl mx-auto w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
              {/* Left */}
              <div className="lg:col-span-7">
                {/* Status pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-7">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                  </span>
                  STATUS: TRAINING · OPEN TO INTERNSHIPS
                </div>

                {/* Title */}
                <h1
                  className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-5"
                  style={{ fontFamily: "var(--font-display), sans-serif" }}
                >
                  <span className="block">Utkarsh</span>
                  <span className="block bg-gradient-to-r from-cyan-300 via-violet-300 to-pink-300 bg-clip-text text-transparent">
                    Jaiswal
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-slate-300 mb-2 font-mono">
                  <span className="text-cyan-400">&gt;</span> AI &amp; Data Science Undergraduate
                </p>
                <p className="text-sm text-slate-500 mb-8 font-mono">
                  Indian Institute of Technology, Jodhpur · India
                </p>

                <p className="text-base md:text-lg text-slate-400 leading-relaxed mb-9 max-w-xl">
                  Building intelligence from data — one epoch at a time. Currently
                  training on Python, SQL, ML, and BI tools. Seeking an internship
                  where neural networks meet real business decisions.
                </p>

                <div className="flex flex-wrap items-center gap-3 mb-8">
                  <a href={PERSONAL.resumePath} download>
                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-[#050714] font-semibold rounded-md px-6 h-12 shadow-[0_0_30px_-8px_rgba(0,217,255,0.6)] group"
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
                      className="bg-transparent border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400 rounded-md px-6 h-12 font-mono"
                    >
                      ./contact.sh
                    </Button>
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <SocialLink href={`mailto:${PERSONAL.email}`} icon={Mail} label="Email" color="#00D9FF" />
                  <SocialLink href={PERSONAL.linkedin} icon={Linkedin} label="LinkedIn" color="#0A66C2" />
                  <SocialLink href={PERSONAL.github} icon={Github} label="GitHub" color="#A855F7" />
                  <SocialLink href={`tel:${PERSONAL.phone.replace(/\s/g, "")}`} icon={Phone} label="Phone" color="#10B981" />
                </div>
              </div>

              {/* Right: Terminal panel */}
              <div className="lg:col-span-5">
                <TerminalPanel />
              </div>
            </div>
          </div>
        </section>

        {/* ─── ARCHITECTURE / ABOUT ─── */}
        <NeuralSection
          id="architecture"
          layer="L0"
          eyebrow="01 / Architecture"
          title="About"
          subtitle="The model behind the analyst."
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7">
              <p
                className="text-2xl md:text-3xl leading-relaxed text-slate-200 font-light mb-6"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                I&apos;m a{" "}
                <span className="font-semibold text-cyan-300">curious mind</span> in
                year two of a BS in Applied AI &amp; Data Science at{" "}
                <span className="font-semibold text-white">IIT Jodhpur</span>.
              </p>
              <p className="text-base text-slate-400 leading-relaxed mb-5">
                <span className="text-cyan-400 font-mono"># </span>
                My toolkit is Python, SQL, Power BI, and Tableau — and I&apos;m
                learning to wield it like a craftsperson. Through hands-on virtual
                internships with Quantium and Deloitte Australia, I&apos;ve cleaned
                messy transactional data, segmented customers, designed uplift tests,
                and built dashboards that surface real business insights.
              </p>
              <p className="text-base text-slate-400 leading-relaxed">
                <span className="text-purple-400 font-mono"># </span>
                Currently sharpening fundamentals in probability, linear algebra, and
                ML while hunting for a Data Analyst internship where I can turn messy
                data into clear decisions.
              </p>
            </div>

            <div className="lg:col-span-5 lg:border-l lg:border-cyan-500/15 lg:pl-8">
              <p className="text-xs font-mono uppercase tracking-widest text-cyan-500/60 mb-5">
                {"// system_info.txt"}
              </p>
              <dl className="space-y-3">
                {[
                  ["institution", "IIT Jodhpur"],
                  ["field", "Applied AI & DS"],
                  ["year", "2nd UG (2029)"],
                  ["cgpa", "7.25 / 10"],
                  ["location", "India"],
                  ["status", "OPEN_TO_INTERNSHIPS"],
                ].map(([k, v]) => (
                  <div
                    key={k}
                    className="flex items-baseline justify-between gap-3 border-b border-cyan-500/10 pb-2 font-mono"
                  >
                    <dt className="text-xs uppercase tracking-wider text-slate-500">
                      {k}<span className="text-cyan-500">:</span>
                    </dt>
                    <dd className="text-sm text-cyan-200 text-right">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14 pt-10 border-t border-cyan-500/15">
            <NeuralStat value={7.25} suffix="/10" label="cgpa" decimals={2} color="#00D9FF" />
            <NeuralStat value={2} suffix="yr" label="undergrad" color="#A855F7" />
            <NeuralStat value={2} suffix="" label="internships" color="#EC4899" />
            <NeuralStat value={16} suffix="+" label="skills" color="#10B981" />
          </div>
        </NeuralSection>

        {/* ─── LAYERS / SKILLS ─── */}
        <NeuralSection
          id="layers"
          layer="L1-L4"
          eyebrow="02 / Network Topology"
          title="Layers"
          subtitle="The neural architecture, decoded."
          alt
        >
          <div className="space-y-6">
            {SKILL_LAYERS.map((layer, i) => (
              <LayerCard key={layer.layer} layer={layer} index={i} />
            ))}
          </div>

          {/* Strengths strip */}
          <div className="mt-12 pt-8 border-t border-cyan-500/15">
            <p className="text-xs font-mono uppercase tracking-widest text-cyan-500/60 mb-4">
              {"// activation_functions"}
            </p>
            <div className="flex flex-wrap gap-2">
              {STRENGTHS.map((s, i) => (
                <span
                  key={s}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-sm font-mono bg-cyan-500/5 border border-cyan-500/20 text-cyan-200 rounded hover:border-cyan-400/50 hover:bg-cyan-500/10 transition-colors"
                  style={{ transitionDelay: `${i * 30}ms` }}
                >
                  <Zap className="w-3 h-3 text-cyan-400" />
                  {s}
                </span>
              ))}
            </div>
          </div>
        </NeuralSection>

        {/* ─── TRAINING / DATA VIZ ─── */}
        <NeuralSection
          id="training"
          layer="loss"
          eyebrow="03 / Training Metrics"
          title="Training"
          subtitle="Loss curves and learning rate."
        >
          <p className="text-base text-slate-400 mb-10 max-w-2xl">
            <span className="text-cyan-400 font-mono"># </span>
            A live snapshot of my learning trajectory. Just like a neural network
            finding its minima — every project, every book, every bug brings me
            closer to the optimal decision boundary.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
            {/* Loss chart */}
            <Card className="lg:col-span-2 bg-slate-900/40 border-cyan-500/20 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs font-mono uppercase tracking-widest text-cyan-500/60 mb-1">
                      loss_curve
                    </p>
                    <h3 className="text-base font-semibold text-white">
                      Learning trajectory · 20 epochs
                    </h3>
                  </div>
                  <Activity className="w-5 h-5 text-cyan-400" />
                </div>
                <LossChart data={TRAINING_LOSS} />
                <div className="flex items-center justify-between mt-3 text-xs font-mono">
                  <span className="text-slate-500">epoch 1: loss=0.95</span>
                  <span className="text-emerald-400">epoch 20: loss=0.195 ↓ 79%</span>
                </div>
              </CardContent>
            </Card>

            {/* Quick stats */}
            <div className="space-y-4">
              <MetricCard
                label="Data points processed"
                value="264K+"
                icon={Database}
                color="#00D9FF"
              />
              <MetricCard
                label="Tools in rotation"
                value="8+"
                icon={Cpu}
                color="#A855F7"
              />
              <MetricCard
                label="Models built (sim)"
                value="2"
                icon={Brain}
                color="#EC4899"
              />
            </div>
          </div>

          {/* Big gradient strip */}
          <div className="p-6 md:p-8 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 border border-cyan-500/20 rounded-lg backdrop-blur-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-1">
                  {"// currently learning"}
                </p>
                <p className="text-base text-white">Intermediate Python, statistics fundamentals, machine learning basics, and SQL window functions.</p>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-purple-400 mb-1">
                  {"// next milestone"}
                </p>
                <p className="text-base text-white">Build my first end-to-end ML project — from data ingestion to deployed dashboard.</p>
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-widest text-pink-400 mb-1">
                  {"// seeking"}
                </p>
                <p className="text-base text-white">Data Analyst internship where I can ship real insights, not just notebooks.</p>
              </div>
            </div>
          </div>
        </NeuralSection>

        {/* ─── EXPERIMENTS / PROJECTS ─── */}
        <NeuralSection
          id="experiments"
          layer="exp"
          eyebrow="04 / Experiments"
          title="Work"
          subtitle="Real training runs & outcomes."
          alt
        >
          <div className="space-y-6">
            {PROJECTS.map((project, idx) => (
              <ExperimentCard key={project.title} project={project} index={idx} />
            ))}
          </div>

          {/* Call to action */}
          <div className="mt-10 p-6 md:p-8 bg-gradient-to-br from-slate-900 to-slate-900/40 border border-cyan-500/20 rounded-lg">
            <div className="grid md:grid-cols-12 gap-6 items-center">
              <div className="md:col-span-8">
                <p
                  className="text-xl md:text-2xl leading-tight text-white"
                  style={{ fontFamily: "var(--font-display), sans-serif" }}
                >
                  Want to see my code &amp; ongoing experiments?
                </p>
                <p className="text-sm text-slate-400 mt-2 font-mono">
                  $ git clone https://github.com/utkarsh2172006-design
                </p>
              </div>
              <div className="md:col-span-4 flex md:justify-end">
                <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer">
                  <Button className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-[#050714] font-semibold rounded-md h-12 px-6 group shadow-[0_0_30px_-8px_rgba(0,217,255,0.6)]">
                    <GitBranch className="w-4 h-4 mr-2" />
                    View GitHub
                    <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </NeuralSection>

        {/* ─── EDUCATION / JOURNEY ─── */}
        <NeuralSection
          id="education"
          layer="hist"
          eyebrow="05 / History"
          title="Journey"
          subtitle="Education & certifications log."
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-14">
            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-cyan-500/60 mb-6">
                {"// education.log"}
              </p>
              <div className="relative pl-6">
                <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-cyan-400 via-purple-500/50 to-transparent" />
                {EDUCATION.map((edu, i) => (
                  <div key={i} className="relative mb-8 last:mb-0">
                    <div className="absolute -left-6 top-1.5 w-3 h-3 rounded-full bg-cyan-400 border-2 border-[#050714] shadow-[0_0_12px_rgba(0,217,255,0.8)]" />
                    <div className="flex items-center gap-2 mb-1">
                      <GraduationCap className="w-4 h-4 text-cyan-400" />
                      <span className="text-xs font-mono text-slate-500">{edu.date}</span>
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-white mb-1">
                      {edu.degree}
                    </h3>
                    <p className="text-sm text-cyan-300 font-medium mb-1">{edu.school}</p>
                    <p className="text-sm text-slate-400 mb-2">{edu.detail}</p>
                    {edu.coursework.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {edu.coursework.map((c) => (
                          <span
                            key={c}
                            className="px-2 py-0.5 text-[10px] font-mono bg-cyan-500/5 text-cyan-300/70 border border-cyan-500/20 rounded"
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

            <div>
              <p className="text-xs font-mono uppercase tracking-widest text-cyan-500/60 mb-6">
                {"// certifications.log"}
              </p>
              <div className="space-y-3 mb-8">
                <CertCard
                  title="Quantium Data Analytics Job Simulation"
                  org="The Forage"
                  year="2025"
                  color="#00D9FF"
                />
                <CertCard
                  title="Deloitte Australia Data Analytics Job Simulation"
                  org="The Forage"
                  year="2025"
                  color="#A855F7"
                />
              </div>

              {/* Live status block */}
              <div className="p-5 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border-l-2 border-cyan-400 rounded-r-lg">
                <p className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-2 flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400" />
                  </span>
                  system_status: ACTIVE
                </p>
                <p className="text-sm text-slate-300 leading-relaxed">
                  Currently in training mode — loading new weights for Intermediate
                  Python, statistics fundamentals, and SQL window functions.
                </p>
              </div>
            </div>
          </div>
        </NeuralSection>

        {/* ─── CONTACT ─── */}
        <section id="contact" className="py-24 md:py-32 px-5 md:px-8 relative">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-4">
              — 06 / init_inference()
            </p>
            <h2
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[0.95] mb-6"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              <span className="block text-white">Got a data</span>
              <span className="block bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                problem to solve?
              </span>
            </h2>
            <p className="text-base md:text-lg text-slate-400 mb-12 max-w-xl mx-auto">
              <span className="text-cyan-400 font-mono">&gt; </span>
              Let&apos;s connect. I respond within 24 hours. Open to internships,
              freelance analytics work, and collaborations.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-10">
              <ContactCard
                href={`mailto:${PERSONAL.email}`}
                icon={Mail}
                label="Email"
                value={PERSONAL.email}
                color="#00D9FF"
              />
              <ContactCard
                href={PERSONAL.linkedin}
                icon={Linkedin}
                label="LinkedIn"
                value="utkarsh-jaiswal-7b2938376"
                color="#A855F7"
              />
              <ContactCard
                href={PERSONAL.github}
                icon={Github}
                label="GitHub"
                value="utkarsh2172006-design"
                color="#10B981"
              />
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <a href={PERSONAL.resumePath} download>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-400 hover:to-purple-400 text-[#050714] font-semibold rounded-md px-6 h-12 shadow-[0_0_30px_-8px_rgba(0,217,255,0.6)] group"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume (PDF)
                </Button>
              </a>
              <a href={`mailto:${PERSONAL.email}`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-cyan-500/40 text-cyan-300 hover:bg-cyan-500/10 hover:border-cyan-400 rounded-md px-6 h-12 font-mono group"
                >
                  ./send_email.sh
                  <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Button>
              </a>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-12 text-xs font-mono text-slate-500">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-cyan-400" />
                {PERSONAL.phone}
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3 h-3 text-cyan-400" />
                {PERSONAL.location}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                online
              </span>
            </div>
          </div>
        </section>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="relative z-10 border-t border-cyan-500/15 py-8 px-5 md:px-8">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-slate-500">
            <span className="text-cyan-400">[</span>
            system<span className="text-cyan-400">]</span> © {new Date().getFullYear()} · Utkarsh Jaiswal · Built with neurons &amp; code
          </p>
          <div className="flex items-center gap-4">
            <a href={`mailto:${PERSONAL.email}`} className="text-slate-500 hover:text-cyan-400 transition-colors" aria-label="Email">
              <Mail className="w-4 h-4" />
            </a>
            <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-400 transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-cyan-400 transition-colors" aria-label="GitHub">
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>

      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-md bg-gradient-to-br from-cyan-500 to-purple-500 text-[#050714] shadow-[0_0_25px_-5px_rgba(0,217,255,0.8)] flex items-center justify-center hover:scale-110 hover:rotate-3 transition-all"
          aria-label="Back to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      <style jsx global>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: #050714; }
        ::-webkit-scrollbar-thumb { background: rgba(0, 217, 255, 0.3); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(0, 217, 255, 0.5); }
        @keyframes blink { 50% { opacity: 0; } }
        .cursor-blink { animation: blink 1s steps(2) infinite; }
      `}</style>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Neural Network Animated Background
// ─────────────────────────────────────────────────────────────

function NeuralBackground({ mouse }: { mouse: { x: number; y: number } }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const nodeCount = Math.min(60, Math.floor((width * height) / 22000))
    const nodes: { x: number; y: number; vx: number; vy: number; r: number; pulse: number }[] = []

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.8,
        pulse: Math.random() * Math.PI * 2,
      })
    }

    const maxDist = 140
    let raf = 0

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Update nodes
      for (const n of nodes) {
        n.x += n.vx
        n.y += n.vy
        if (n.x < 0 || n.x > width) n.vx *= -1
        if (n.y < 0 || n.y > height) n.vy *= -1
        n.pulse += 0.02

        // Subtle attraction to mouse
        const dx = mouse.x - n.x
        const dy = mouse.y - n.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 180) {
          n.x += (dx / dist) * 0.2
          n.y += (dy / dist) * 0.2
        }
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x
          const dy = nodes[i].y - nodes[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.25
            const grad = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y)
            grad.addColorStop(0, `rgba(0, 217, 255, ${alpha})`)
            grad.addColorStop(1, `rgba(168, 85, 247, ${alpha})`)
            ctx.strokeStyle = grad
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(nodes[i].x, nodes[i].y)
            ctx.lineTo(nodes[j].x, nodes[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw nodes
      for (const n of nodes) {
        const pulseR = n.r + Math.sin(n.pulse) * 0.5
        const glowR = Math.max(0.1, pulseR * 4)

        // Glow
        const grad = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowR)
        grad.addColorStop(0, "rgba(0, 217, 255, 0.6)")
        grad.addColorStop(1, "rgba(0, 217, 255, 0)")
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(n.x, n.y, glowR, 0, Math.PI * 2)
        ctx.fill()

        // Core
        ctx.fillStyle = "rgba(180, 240, 255, 0.9)"
        ctx.beginPath()
        ctx.arc(n.x, n.y, Math.max(0.1, pulseR), 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(render)
    }
    render()

    const onResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener("resize", onResize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", onResize)
    }
  }, [mouse])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ width: "100vw", height: "100vh" }}
    />
  )
}

// ─────────────────────────────────────────────────────────────
// Terminal Panel (hero right side)
// ─────────────────────────────────────────────────────────────

function TerminalPanel() {
  const [visibleLines, setVisibleLines] = useState(0)
  const [currentChar, setCurrentChar] = useState(0)

  useEffect(() => {
    if (visibleLines >= TYPING_LINES.length) return
    const line = TYPING_LINES[visibleLines]
    const fullText = line.code
    if (currentChar < fullText.length) {
      const t = setTimeout(() => setCurrentChar(currentChar + 1), 35)
      return () => clearTimeout(t)
    } else {
      const t = setTimeout(() => {
        setVisibleLines(visibleLines + 1)
        setCurrentChar(0)
      }, 400)
      return () => clearTimeout(t)
    }
  }, [visibleLines, currentChar])

  return (
    <Card className="bg-slate-950/80 border-cyan-500/30 backdrop-blur-md overflow-hidden shadow-[0_0_40px_-10px_rgba(0,217,255,0.4)]">
      <CardContent className="p-0">
        {/* Terminal header */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/80 border-b border-cyan-500/20">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-xs font-mono text-slate-500 ml-2">utkarsh@iitj: ~/portfolio</span>
          </div>
          <Terminal className="w-3.5 h-3.5 text-cyan-400/60" />
        </div>

        {/* Terminal body */}
        <div className="p-4 md:p-5 font-mono text-xs md:text-sm min-h-[280px] space-y-1.5">
          {TYPING_LINES.slice(0, visibleLines).map((line, i) => (
            <div key={i} className="flex items-baseline gap-1">
              <span className="text-emerald-400">{line.prompt}</span>
              <span className="text-cyan-300">{line.code}</span>
              {line.comment && (
                <span className="text-slate-500 ml-2 text-xs">{line.comment}</span>
              )}
            </div>
          ))}

          {/* Current typing line */}
          {visibleLines < TYPING_LINES.length && (
            <div className="flex items-baseline gap-1">
              <span className="text-emerald-400">{TYPING_LINES[visibleLines].prompt}</span>
              <span className="text-cyan-300">
                {TYPING_LINES[visibleLines].code.slice(0, currentChar)}
              </span>
              <span className="cursor-blink text-cyan-400">▋</span>
            </div>
          )}

          {/* Output line after typing */}
          {visibleLines >= TYPING_LINES.length && (
            <div className="mt-3 space-y-1">
              <div className="text-emerald-400">
                <span className="text-slate-500">[INFO]</span> Model trained successfully.
              </div>
              <div className="text-slate-300">
                <span className="text-slate-500">[INFO]</span> IGP ready: <span className="text-cyan-300 font-bold">87.50%</span>
              </div>
              <div className="text-slate-300 flex items-center gap-1">
                <span className="text-slate-500">[INFO]</span> Status: <span className="text-emerald-400">OPEN_TO_INTERNSHIPS</span>
                <span className="cursor-blink text-cyan-400 ml-1">▋</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom status bar */}
        <div className="flex items-center justify-between px-4 py-2 bg-slate-900/80 border-t border-cyan-500/20 text-[10px] font-mono">
          <div className="flex items-center gap-3 text-slate-500">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              python 3.11
            </span>
            <span>·</span>
            <span>UTF-8</span>
            <span>·</span>
            <span>LN {visibleLines + 1}</span>
          </div>
          <span className="text-cyan-400/70">INS · NORMAL</span>
        </div>
      </CardContent>
    </Card>
  )
}

// ─────────────────────────────────────────────────────────────
// Section wrapper
// ─────────────────────────────────────────────────────────────

function NeuralSection({
  id,
  layer,
  eyebrow,
  title,
  subtitle,
  children,
  alt = false,
}: {
  id: string
  layer: string
  eyebrow: string
  title: string
  subtitle: string
  children: React.ReactNode
  alt?: boolean
}) {
  const { ref, visible } = useReveal<HTMLDivElement>()
  return (
    <section id={id} className={`py-24 md:py-32 px-5 md:px-8 relative ${alt ? "bg-slate-950/40 backdrop-blur-sm" : ""}`}>
      <div
        ref={ref}
        className="max-w-6xl mx-auto"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
        }}
      >
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <div className="flex items-center gap-3 mb-3">
            <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 rounded">
              {layer}
            </span>
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-500/70">
              {eyebrow}
            </span>
          </div>
          <h2
            className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-2"
            style={{ fontFamily: "var(--font-display), sans-serif" }}
          >
            {title}
            <span className="text-cyan-400">.</span>
          </h2>
          <p className="text-base md:text-lg text-slate-500 font-mono">
            <span className="text-cyan-500/60">// </span>
            {subtitle}
          </p>
        </div>
        {children}
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────
// Neural stat
// ─────────────────────────────────────────────────────────────

function NeuralStat({
  value,
  suffix,
  label,
  decimals = 0,
  color,
}: {
  value: number
  suffix: string
  label: string
  decimals?: number
  color: string
}) {
  const { ref, visible } = useReveal<HTMLDivElement>()
  const v = useCounter(value, 1500, visible)
  return (
    <div ref={ref} className="group">
      <p
        className="text-3xl md:text-4xl font-bold leading-none transition-transform group-hover:scale-105"
        style={{ color, fontFamily: "var(--font-mono), monospace" }}
      >
        {typeof v === "number" ? v.toFixed(decimals) : v}
        <span className="text-lg text-slate-500 ml-0.5">{suffix}</span>
      </p>
      <p className="mt-2 text-xs font-mono uppercase tracking-wider text-slate-500">
        {label}
      </p>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Social link
// ─────────────────────────────────────────────────────────────

function SocialLink({
  href,
  icon: Icon,
  label,
  color,
}: {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  color: string
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      aria-label={label}
      className="group w-10 h-10 rounded-md bg-slate-900/60 border border-cyan-500/20 flex items-center justify-center text-slate-400 transition-all hover:scale-110 hover:-translate-y-0.5"
      style={{ color: undefined }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = color + "60"
        e.currentTarget.style.color = color
        e.currentTarget.style.boxShadow = `0 0 20px -5px ${color}80`
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = ""
        e.currentTarget.style.color = ""
        e.currentTarget.style.boxShadow = ""
      }}
    >
      <Icon className="w-4 h-4" />
    </a>
  )
}

// ─────────────────────────────────────────────────────────────
// Layer card (skill)
// ─────────────────────────────────────────────────────────────

function LayerCard({
  layer,
  index,
}: {
  layer: typeof SKILL_LAYERS[number]
  index: number
}) {
  const { ref, visible } = useReveal<HTMLDivElement>()
  const Icon = layer.icon
  return (
    <div
      ref={ref}
      className="group relative bg-slate-900/40 border border-cyan-500/20 rounded-lg p-6 md:p-8 hover:border-cyan-500/50 transition-all hover:-translate-y-1 hover:shadow-[0_0_40px_-10px_rgba(0,217,255,0.4)] backdrop-blur-sm"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out, border-color 0.3s, box-shadow 0.3s",
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Left: layer badge */}
        <div className="md:col-span-3 flex items-center gap-4">
          <div
            className="relative w-14 h-14 rounded-lg flex items-center justify-center"
            style={{ background: layer.color + "20", border: `1px solid ${layer.color}50` }}
          >
            <Icon className="w-6 h-6" style={{ color: layer.color }} />
            <div
              className="absolute inset-0 rounded-lg blur-md opacity-50"
              style={{ background: layer.color + "30" }}
            />
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-widest" style={{ color: layer.color }}>
              {layer.layer}
            </p>
            <p
              className="text-base md:text-lg font-bold text-white"
              style={{ fontFamily: "var(--font-display), sans-serif" }}
            >
              {layer.name}
            </p>
          </div>
        </div>

        {/* Middle: subtitle */}
        <div className="md:col-span-3">
          <p className="text-sm text-slate-400 font-mono">
            <span className="text-slate-600">// </span>
            {layer.subtitle}
          </p>
        </div>

        {/* Right: skill bars */}
        <div className="md:col-span-6 space-y-2">
          {layer.skills.map((skill, i) => (
            <div key={skill.name} className="flex items-center gap-3">
              <span className="text-xs font-mono text-slate-400 w-32 md:w-36 shrink-0">
                {skill.name}
              </span>
              <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: visible ? `${skill.level}%` : "0%",
                    background: `linear-gradient(90deg, ${layer.color}, ${layer.color}80)`,
                    transitionDelay: `${(index * 4 + i) * 80}ms`,
                  }}
                />
              </div>
              <span
                className="text-xs font-mono w-8 text-right"
                style={{ color: layer.color }}
              >
                {skill.level}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────
// Loss chart
// ─────────────────────────────────────────────────────────────

function LossChart({ data }: { data: number[] }) {
  const { ref, visible } = useReveal<SVGSVGElement>()
  const w = 600
  const h = 180
  const padding = { top: 20, right: 20, bottom: 30, left: 40 }
  const innerW = w - padding.left - padding.right
  const innerH = h - padding.top - padding.bottom

  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1

  const points = data.map((v, i) => ({
    x: padding.left + (i / (data.length - 1)) * innerW,
    y: padding.top + (1 - (v - min) / range) * innerH,
  }))

  const pathD = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ")

  const areaD = `${pathD} L ${points[points.length - 1].x} ${padding.top + innerH} L ${points[0].x} ${padding.top + innerH} Z`

  return (
    <svg ref={ref} viewBox={`0 0 ${w} ${h}`} className="w-full h-auto">
      <defs>
        <linearGradient id="lossGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#00D9FF" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#00D9FF" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* Grid lines */}
      {[0, 0.25, 0.5, 0.75, 1].map((g, i) => {
        const y = padding.top + g * innerH
        return (
          <g key={i}>
            <line
              x1={padding.left}
              y1={y}
              x2={padding.left + innerW}
              y2={y}
              stroke="rgba(148, 163, 184, 0.1)"
              strokeWidth="1"
            />
            <text
              x={padding.left - 6}
              y={y + 3}
              textAnchor="end"
              className="text-[9px] fill-slate-500"
              style={{ fontFamily: "var(--font-mono), monospace" }}
            >
              {(max - g * range).toFixed(2)}
            </text>
          </g>
        )
      })}

      {/* Area */}
      <path
        d={areaD}
        fill="url(#lossGrad)"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 1s ease-out 0.5s",
        }}
      />

      {/* Line */}
      <path
        d={pathD}
        fill="none"
        stroke="#00D9FF"
        strokeWidth="2"
        strokeLinejoin="round"
        strokeLinecap="round"
        style={{
          strokeDasharray: 2000,
          strokeDashoffset: visible ? 0 : 2000,
          transition: "stroke-dashoffset 2s ease-out",
        }}
      />

      {/* Points */}
      {points.map((p, i) => (
        <circle
          key={i}
          cx={p.x}
          cy={p.y}
          r={i === points.length - 1 ? 4 : 2}
          fill={i === points.length - 1 ? "#10B981" : "#00D9FF"}
          style={{
            opacity: visible ? 1 : 0,
            transition: `opacity 0.3s ease-out ${1.8 + i * 0.05}s`,
          }}
        />
      ))}

      {/* X axis labels */}
      {[0, 5, 10, 15, 19].map((idx) => (
        <text
          key={idx}
          x={padding.left + (idx / (data.length - 1)) * innerW}
          y={h - 8}
          textAnchor="middle"
          className="text-[9px] fill-slate-500"
          style={{ fontFamily: "var(--font-mono), monospace" }}
        >
          e{idx + 1}
        </text>
      ))}
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────
// Metric card
// ─────────────────────────────────────────────────────────────

function MetricCard({
  label,
  value,
  icon: Icon,
  color,
}: {
  label: string
  value: string
  icon: React.ComponentType<{ className?: string }>
  color: string
}) {
  return (
    <Card className="bg-slate-900/40 border-cyan-500/20 backdrop-blur-sm hover:border-cyan-500/40 transition-colors">
      <CardContent className="p-5 flex items-center gap-4">
        <div
          className="w-10 h-10 rounded-md flex items-center justify-center shrink-0"
          style={{ background: color + "20", border: `1px solid ${color}50` }}
        >
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        <div>
          <p
            className="text-2xl font-bold leading-none"
            style={{ color, fontFamily: "var(--font-mono), monospace" }}
          >
            {value}
          </p>
          <p className="text-[11px] font-mono uppercase tracking-wider text-slate-500 mt-1.5">
            {label}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

// ─────────────────────────────────────────────────────────────
// Experiment (project) card
// ─────────────────────────────────────────────────────────────

function ExperimentCard({
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
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <Card
        className="bg-slate-900/40 border-cyan-500/20 backdrop-blur-sm hover:border-cyan-500/40 transition-all overflow-hidden group"
      >
        <CardContent className="p-0">
          {/* Top bar */}
          <div
            className="px-5 py-2.5 flex items-center justify-between border-b"
            style={{
              background: project.color + "10",
              borderColor: project.color + "30",
            }}
          >
            <div className="flex items-center gap-2 font-mono text-xs">
              <span style={{ color: project.color }}>
                experiment_{String(index + 1).padStart(2, "0")}.py
              </span>
              <span className="text-slate-500">·</span>
              <span className="text-slate-400">{project.type}</span>
            </div>
            <span className="text-xs font-mono text-slate-500">{project.date}</span>
          </div>

          <div className="grid md:grid-cols-12">
            {/* Left meta */}
            <div className="md:col-span-3 p-6 border-b md:border-b-0 md:border-r border-cyan-500/15">
              <p
                className="text-xs font-mono uppercase tracking-widest mb-3"
                style={{ color: project.color }}
              >
                {project.company}
              </p>
              <div className="space-y-2">
                {project.metrics.map((m) => (
                  <div key={m.label}>
                    <p className="text-xl font-bold text-white leading-none font-mono">
                      {m.value >= 1000 ? `${(m.value / 1000).toFixed(0)}K` : m.value}
                    </p>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 mt-0.5">
                      {m.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right content */}
            <div className="md:col-span-9 p-6 md:p-8">
              <h3
                className="text-xl md:text-2xl font-bold text-white mb-3"
                style={{ fontFamily: "var(--font-display), sans-serif" }}
              >
                {project.title}
              </h3>
              <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                {project.description}
              </p>
              <ul className="space-y-1.5 mb-5">
                {project.bullets.map((b, i) => (
                  <li key={i} className="flex gap-2 text-sm text-slate-300">
                    <span className="font-mono shrink-0 mt-0.5" style={{ color: project.color }}>
                      [{String(i + 1).padStart(2, "0")}]
                    </span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-[11px] font-mono bg-slate-800/60 text-slate-300 border border-slate-700/50 rounded"
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
    <Card className="bg-slate-900/40 border-cyan-500/20 backdrop-blur-sm hover:border-cyan-500/40 transition-colors">
      <CardContent className="p-4 flex items-start gap-3">
        <div
          className="w-9 h-9 rounded-md flex items-center justify-center shrink-0"
          style={{ background: color + "20", border: `1px solid ${color}50` }}
        >
          <Award className="w-4 h-4" style={{ color }} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white leading-tight mb-1">{title}</p>
          <p className="text-xs font-mono text-slate-500">
            {org} · {year}
          </p>
        </div>
        <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
      </CardContent>
    </Card>
  )
}

// ─────────────────────────────────────────────────────────────

function ContactCard({
  href,
  icon: Icon,
  label,
  value,
  color,
}: {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  color: string
}) {
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group block"
    >
      <Card className="bg-slate-900/40 border-cyan-500/20 backdrop-blur-sm hover:border-cyan-500/40 transition-all group-hover:-translate-y-0.5">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div
              className="w-10 h-10 rounded-md flex items-center justify-center"
              style={{ background: color + "20", border: `1px solid ${color}50` }}
            >
              <Icon className="w-4 h-4" style={{ color }} />
            </div>
            <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
          </div>
          <p className="text-[10px] font-mono uppercase tracking-widest text-slate-500 mb-1">
            {label}
          </p>
          <p className="text-sm font-medium text-white truncate">{value}</p>
        </CardContent>
      </Card>
    </a>
  )
}
