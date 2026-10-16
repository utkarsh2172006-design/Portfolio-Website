'use client'

import { useEffect, useState } from "react"
import {
  Mail,
  Phone,
  Linkedin,
  Github,
  Download,
  ArrowRight,
  ExternalLink,
  Sparkles,
  Code2,
  Database,
  BarChart3,
  GraduationCap,
  Briefcase,
  Award,
  MapPin,
  Moon,
  Menu,
  X,
  ChevronUp,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// ─────────────────────────────────────────────────────────────
// Data
// ─────────────────────────────────────────────────────────────

const PERSONAL = {
  name: "Utkarsh Jaiswal",
  title: "Aspiring Data Analyst · AI & Data Science Undergraduate",
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
    color: "from-emerald-400 to-teal-500",
    items: ["Python", "pandas", "numpy", "matplotlib", "seaborn", "scikit-learn (basic)"],
  },
  {
    category: "Databases & SQL",
    icon: Database,
    color: "from-cyan-400 to-blue-500",
    items: ["SELECT", "WHERE", "GROUP BY", "JOINs", "Subqueries"],
  },
  {
    category: "BI & Visualization",
    icon: BarChart3,
    color: "from-violet-400 to-purple-500",
    items: ["Power BI", "Tableau", "Excel (Pivot Tables)", "Charts & Dashboards"],
  },
  {
    category: "Analysis Concepts",
    icon: Sparkles,
    color: "from-pink-400 to-rose-500",
    items: ["EDA", "Data Cleaning", "Customer Segmentation", "Uplift Testing", "Statistical Analysis"],
  },
]

const PROJECTS = [
  {
    title: "Quantium Data Analytics Job Simulation",
    company: "Quantium · via The Forage",
    date: "2025",
    type: "Virtual Internship",
    description:
      "Processed and cleaned customer transaction data with Python, performed customer behaviour analysis & segmentation, and ran uplift testing on a trial layout change to isolate sales impact.",
    bullets: [
      "Cleaned raw transactional data in Python (pandas), handling missing values and inconsistencies",
      "Performed customer segmentation to uncover purchasing trends across product categories",
      "Designed benchmark/control store comparison and applied uplift testing logic on trial layout",
      "Translated findings into commercial recommendations for category management",
    ],
    stack: ["Python", "pandas", "matplotlib", "Excel"],
    accent: "emerald",
  },
  {
    title: "Deloitte Australia Data Analytics Simulation",
    company: "Deloitte Australia · Client: Daikibo Industrials",
    date: "2025",
    type: "Virtual Internship",
    description:
      "Analyzed manufacturing telemetry data to identify data quality issues and equipment performance patterns, then built interactive dashboards to surface operational insights.",
    bullets: [
      "Analyzed manufacturing telemetry data to detect data quality issues and equipment patterns",
      "Built dashboards visualizing operational metrics for equipment health monitoring at a glance",
      "Identified recurring operational patterns and summarized findings into maintenance insights",
    ],
    stack: ["Excel", "Tableau", "Power BI"],
    accent: "cyan",
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
    detail: "Physics, Chemistry, Mathematics",
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

// ─────────────────────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────────────────────

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30)
      setShowTop(window.scrollY > 500)
    }
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ]

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" })

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 selection:bg-teal-500/30 selection:text-white relative overflow-x-hidden">
      {/* Background grid + glow */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(20,184,166,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(20,184,166,0.05)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="absolute -top-40 -left-40 w-[480px] h-[480px] rounded-full bg-teal-500/15 blur-[120px]" />
        <div className="absolute -top-40 -right-40 w-[480px] h-[480px] rounded-full bg-violet-500/15 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[640px] h-[640px] rounded-full bg-cyan-500/5 blur-[140px]" />
      </div>

      {/* ─── NAVBAR ─── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "backdrop-blur-xl bg-[#070b14]/80 border-b border-teal-500/10 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <nav className="container mx-auto px-5 flex items-center justify-between">
          <a
            href="#hero"
            className="font-mono text-sm font-bold tracking-tighter text-teal-400"
          >
            <span className="text-slate-500">~/</span>utkarsh<span className="text-violet-400">.</span>portfolio
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-slate-300 hover:text-teal-400 transition-colors duration-200 relative group"
              >
                {l.label}
                <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-px bg-teal-400 transition-all duration-300" />
              </a>
            ))}
            <a href={PERSONAL.resumePath} download>
              <Button
                size="sm"
                className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-[#070b14] font-semibold border-0 shadow-[0_0_20px_-5px_rgba(20,184,166,0.6)]"
              >
                <Download className="w-3.5 h-3.5 mr-1.5" />
                Resume
              </Button>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-slate-300 hover:text-teal-400"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 backdrop-blur-xl bg-[#070b14]/95 border-b border-teal-500/10 px-5 py-5 flex flex-col gap-4">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="text-slate-300 hover:text-teal-400 transition-colors text-sm"
              >
                {l.label}
              </a>
            ))}
            <a href={PERSONAL.resumePath} download>
              <Button
                size="sm"
                className="bg-gradient-to-r from-teal-500 to-emerald-500 text-[#070b14] font-semibold w-full"
              >
                <Download className="w-3.5 h-3.5 mr-1.5" />
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
          className="min-h-screen flex items-center justify-center px-5 pt-24 pb-12 relative"
        >
          <div className="container mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-xs font-mono mb-7 animate-[fadeIn_0.6s_ease-out]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-400" />
              </span>
              OPEN TO INTERNSHIPS · DATA ANALYST
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-5 bg-gradient-to-br from-white via-teal-100 to-violet-200 bg-clip-text text-transparent animate-[fadeInUp_0.7s_ease-out]">
              Utkarsh Jaiswal
            </h1>

            <p className="text-lg md:text-2xl text-slate-300 max-w-2xl mx-auto mb-3 font-light">
              Aspiring{" "}
              <span className="text-teal-400 font-semibold">Data Analyst</span>{" "}
              &amp; AI &amp; Data Science Undergraduate
            </p>
            <p className="text-sm md:text-base text-slate-500 mb-10 font-mono">
              &lt;/&gt; IIT Jodhpur · India
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
              <a href={PERSONAL.resumePath} download>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-[#070b14] font-semibold border-0 shadow-[0_0_30px_-8px_rgba(20,184,166,0.7)] transition-all hover:scale-105"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download Resume
                </Button>
              </a>
              <a href="#contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-teal-500/40 bg-teal-500/5 hover:bg-teal-500/10 text-teal-300 hover:text-teal-200"
                >
                  Get in Touch
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </a>
            </div>

            {/* Social links */}
            <div className="flex items-center justify-center gap-3">
              <SocialLink href={`mailto:${PERSONAL.email}`} icon={Mail} label="Email" />
              <SocialLink href={PERSONAL.linkedin} icon={Linkedin} label="LinkedIn" />
              <SocialLink href={PERSONAL.github} icon={Github} label="GitHub" />
              <SocialLink href={`tel:${PERSONAL.phone.replace(/\s/g, "")}`} icon={Phone} label="Phone" />
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600">
              <span className="text-[10px] font-mono uppercase tracking-widest">Scroll</span>
              <div className="w-px h-8 bg-gradient-to-b from-teal-500/50 to-transparent" />
            </div>
          </div>
        </section>

        {/* ─── ABOUT ─── */}
        <section id="about" className="py-24 px-5 relative">
          <div className="container mx-auto max-w-4xl">
            <SectionHeading
              eyebrow="01 — Intro"
              title="About Me"
              subtitle="Who I am and what I bring to the table."
            />

            <Card className="mt-10 bg-slate-900/50 border-slate-800 backdrop-blur-sm overflow-hidden relative">
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/50 to-transparent" />
              <CardContent className="p-8 md:p-10">
                <p className="text-slate-300 text-base md:text-lg leading-relaxed mb-5">
                  I&apos;m a second-year undergraduate student pursuing a{" "}
                  <span className="text-teal-400 font-semibold">
                    BS in Applied AI &amp; Data Science at IIT Jodhpur
                  </span>
                  . My journey into data started with curiosity — asking "why does this
                  happen?" — and evolved into a structured toolkit of{" "}
                  <span className="text-violet-300 font-semibold">Python, SQL, Power BI</span>{" "}
                  and{" "}
                  <span className="text-violet-300 font-semibold">Tableau</span>.
                </p>
                <p className="text-slate-400 text-base leading-relaxed mb-5">
                  Through hands-on virtual internships with{" "}
                  <span className="text-slate-200 font-semibold">Quantium</span> and{" "}
                  <span className="text-slate-200 font-semibold">Deloitte Australia</span>, I&apos;ve
                  cleaned raw transactional data, segmented customers, designed uplift
                  tests, and built operational dashboards that surface real business
                  insights — not just charts.
                </p>
                <p className="text-slate-400 text-base leading-relaxed">
                  Currently I&apos;m sharpening my fundamentals in probability, linear
                  algebra, and ML while hunting for a{" "}
                  <span className="text-teal-300 font-semibold">Data Analyst internship</span>{" "}
                  where I can turn messy data into clear decisions.
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-800">
                  <Stat label="CGPA" value="7.25" suffix="/10" accent="teal" />
                  <Stat label="Year" value="2nd" suffix="UG" accent="violet" />
                  <Stat label="Projects" value="2" suffix="simulations" accent="cyan" />
                  <Stat label="Institute" value="IIT" suffix="Jodhpur" accent="emerald" />
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* ─── SKILLS ─── */}
        <section id="skills" className="py-24 px-5 relative">
          <div className="container mx-auto max-w-5xl">
            <SectionHeading
              eyebrow="02 — Toolkit"
              title="Skills &amp; Stack"
              subtitle="Tools I use to turn raw data into decisions."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
              {SKILLS.map((skill) => {
                const Icon = skill.icon
                return (
                  <Card
                    key={skill.category}
                    className="group bg-slate-900/40 border-slate-800 hover:border-teal-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_-10px_rgba(20,184,166,0.5)]"
                  >
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-1">
                        <div
                          className={`w-10 h-10 rounded-lg bg-gradient-to-br ${skill.color} flex items-center justify-center shadow-lg`}
                        >
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <CardTitle className="text-lg text-slate-100">
                          {skill.category}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {skill.items.map((item) => (
                          <Badge
                            key={item}
                            variant="secondary"
                            className="bg-slate-800/60 text-slate-300 border-slate-700/50 hover:bg-slate-700/60 font-mono text-xs"
                          >
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Strengths strip */}
            <div className="mt-10 p-6 rounded-xl border border-slate-800 bg-slate-900/40 backdrop-blur-sm">
              <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-3">
                Core Strengths
              </p>
              <div className="flex flex-wrap gap-3">
                {STRENGTHS.map((s) => (
                  <div
                    key={s}
                    className="flex items-center gap-1.5 text-sm text-slate-300"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                    {s}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ─── PROJECTS ─── */}
        <section id="projects" className="py-24 px-5 relative">
          <div className="container mx-auto max-w-5xl">
            <SectionHeading
              eyebrow="03 — Work"
              title="Projects &amp; Simulations"
              subtitle="Real-world analytics problems I've tackled through virtual internships."
            />

            <div className="space-y-6 mt-10">
              {PROJECTS.map((project, idx) => (
                <Card
                  key={project.title}
                  className="group relative bg-slate-900/40 border-slate-800 hover:border-teal-500/40 transition-all duration-300 overflow-hidden"
                >
                  {/* Glow border on hover */}
                  <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  <CardContent className="p-0">
                    <div className="grid md:grid-cols-[1fr] gap-0">
                      {/* Left meta sidebar */}
                      <div className="p-6 md:p-8 border-b md:border-b-0 md:border-r border-slate-800 bg-slate-950/40 md:w-56">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="font-mono text-xs text-teal-400">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <span className="h-px flex-1 bg-teal-500/20" />
                        </div>
                        <Badge className="mb-3 bg-teal-500/10 text-teal-300 border-teal-500/20 hover:bg-teal-500/20">
                          {project.type}
                        </Badge>
                        <p className="text-xs font-mono text-slate-500 mb-2">{project.date}</p>
                        <p className="text-xs text-slate-400">{project.company}</p>
                      </div>

                      {/* Right content */}
                      <div className="p-6 md:p-8 flex-1">
                        <h3 className="text-xl md:text-2xl font-bold text-slate-100 mb-3 group-hover:text-teal-300 transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-sm text-slate-400 mb-4 leading-relaxed">
                          {project.description}
                        </p>
                        <ul className="space-y-2 mb-5">
                          {project.bullets.map((b, i) => (
                            <li
                              key={i}
                              className="flex gap-2.5 text-sm text-slate-300"
                            >
                              <span className="text-teal-400 mt-1 shrink-0">▹</span>
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-2">
                          {project.stack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 text-xs font-mono rounded-md bg-slate-800/60 text-slate-400 border border-slate-700/40"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ─── EDUCATION ─── */}
        <section id="education" className="py-24 px-5 relative">
          <div className="container mx-auto max-w-4xl">
            <SectionHeading
              eyebrow="04 — Background"
              title="Education &amp; Journey"
              subtitle="Where I'm studying and the foundation I'm building."
            />

            <div className="relative mt-10 pl-6 md:pl-8">
              {/* Vertical line */}
              <div className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-teal-500 via-violet-500/50 to-transparent" />

              {EDUCATION.map((edu, idx) => (
                <div key={idx} className="relative mb-8 last:mb-0">
                  {/* Dot */}
                  <div className="absolute -left-6 md:-left-8 top-1.5 w-3 h-3 rounded-full bg-teal-500 border-2 border-[#070b14] shadow-[0_0_12px_rgba(20,184,166,0.7)]" />

                  <Card className="bg-slate-900/40 border-slate-800 hover:border-teal-500/30 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-teal-400" />
                          <h3 className="text-base md:text-lg font-bold text-slate-100">
                            {edu.degree}
                          </h3>
                        </div>
                        <span className="text-xs font-mono text-slate-500 px-2 py-1 rounded-md bg-slate-800/60">
                          {edu.date}
                        </span>
                      </div>
                      <p className="text-sm text-violet-300 font-medium mb-2">
                        {edu.school}
                      </p>
                      <p className="text-sm text-slate-400 mb-3">{edu.detail}</p>
                      {edu.coursework.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-slate-800">
                          <p className="text-xs font-mono uppercase tracking-wider text-slate-500 mb-2">
                            Relevant Coursework
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {edu.coursework.map((c) => (
                              <Badge
                                key={c}
                                variant="outline"
                                className="bg-transparent border-slate-700 text-slate-400 text-xs font-mono"
                              >
                                {c}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              ))}

              {/* Certifications */}
              <div className="relative">
                <div className="absolute -left-6 md:-left-8 top-1.5 w-3 h-3 rounded-full bg-violet-500 border-2 border-[#070b14] shadow-[0_0_12px_rgba(139,92,246,0.7)]" />
                <Card className="bg-slate-900/40 border-slate-800">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="w-4 h-4 text-violet-400" />
                      <h3 className="text-base font-bold text-slate-100">
                        Certifications
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="text-violet-400 mt-1">▹</span>
                        <span>
                          <span className="font-semibold">Quantium Data Analytics Job Simulation</span>
                          <span className="text-slate-500"> · The Forage · 2025</span>
                        </span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-slate-300">
                        <span className="text-violet-400 mt-1">▹</span>
                        <span>
                          <span className="font-semibold">Deloitte Australia Data Analytics Job Simulation</span>
                          <span className="text-slate-500"> · The Forage · 2025</span>
                        </span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* ─── CONTACT / CTA ─── */}
        <section id="contact" className="py-24 px-5 relative">
          <div className="container mx-auto max-w-4xl">
            <SectionHeading
              eyebrow="05 — Let's Talk"
              title="Get in Touch"
              subtitle="Looking for a Data Analyst intern? Let's connect."
            />

            <Card className="mt-10 bg-gradient-to-br from-slate-900/60 to-slate-900/20 border-teal-500/20 backdrop-blur-sm overflow-hidden relative">
              <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-teal-500/10 blur-3xl" />
              <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-violet-500/10 blur-3xl" />

              <CardContent className="p-8 md:p-12 relative">
                <div className="text-center mb-10">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3 bg-gradient-to-r from-teal-200 to-violet-200 bg-clip-text text-transparent">
                    Available for Internship Opportunities
                  </h3>
                  <p className="text-slate-400 max-w-xl mx-auto">
                    Open to Data Analyst intern roles, freelance analytics projects, and
                    collaborations. Drop a message on LinkedIn or shoot me an email —
                    I usually respond within 24 hours.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <ContactCard
                    href={`mailto:${PERSONAL.email}`}
                    icon={Mail}
                    label="Email"
                    value={PERSONAL.email}
                    accent="teal"
                  />
                  <ContactCard
                    href={PERSONAL.linkedin}
                    icon={Linkedin}
                    label="LinkedIn"
                    value="utkarsh-jaiswal-7b2938376"
                    accent="violet"
                  />
                  <ContactCard
                    href={PERSONAL.github}
                    icon={Github}
                    label="GitHub"
                    value="utkarsh2172006-design"
                    accent="cyan"
                  />
                </div>

                <div className="mt-8 pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <MapPin className="w-4 h-4 text-teal-400" />
                    {PERSONAL.location}
                    <span className="mx-2 text-slate-700">·</span>
                    <Phone className="w-4 h-4 text-teal-400" />
                    {PERSONAL.phone}
                  </div>
                  <a href={PERSONAL.resumePath} download>
                    <Button
                      className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-400 hover:to-emerald-400 text-[#070b14] font-semibold border-0 shadow-[0_0_30px_-8px_rgba(20,184,166,0.7)]"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download Resume (PDF)
                    </Button>
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="relative z-10 border-t border-slate-800/60 bg-[#050811] py-8 px-5">
        <div className="container mx-auto max-w-5xl flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
            <Moon className="w-3.5 h-3.5 text-teal-400" />
            <span>Designed &amp; built by Utkarsh Jaiswal · {new Date().getFullYear()}</span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={`mailto:${PERSONAL.email}`}
              className="text-slate-500 hover:text-teal-400 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-teal-400 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-teal-400 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>

      {/* Back to top */}
      {showTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 w-11 h-11 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 text-[#070b14] shadow-[0_0_25px_-5px_rgba(20,184,166,0.7)] flex items-center justify-center hover:scale-110 transition-transform"
          aria-label="Back to top"
        >
          <ChevronUp className="w-5 h-5" />
        </button>
      )}

      {/* Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        html { scroll-behavior: smooth; }
        /* Custom scrollbar */
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: #070b14; }
        ::-webkit-scrollbar-thumb { background: rgba(20, 184, 166, 0.3); border-radius: 4px; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(20, 184, 166, 0.5); }
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
      className="w-11 h-11 rounded-full bg-slate-800/60 border border-slate-700/50 flex items-center justify-center text-slate-300 hover:text-teal-400 hover:border-teal-500/50 hover:bg-teal-500/10 transition-all hover:scale-110 hover:-translate-y-0.5"
    >
      <Icon className="w-4 h-4" />
    </a>
  )
}

function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow: string
  title: string
  subtitle: string
}) {
  return (
    <div className="text-center mb-6">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-teal-400 mb-3">
        {eyebrow}
      </p>
      <h2
        className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3"
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <p
        className="text-slate-400 text-sm md:text-base max-w-xl mx-auto"
        dangerouslySetInnerHTML={{ __html: subtitle }}
      />
    </div>
  )
}

function Stat({
  label,
  value,
  suffix,
  accent,
}: {
  label: string
  value: string
  suffix: string
  accent: "teal" | "violet" | "cyan" | "emerald"
}) {
  const accentColor = {
    teal: "text-teal-400",
    violet: "text-violet-400",
    cyan: "text-cyan-400",
    emerald: "text-emerald-400",
  }[accent]

  return (
    <div>
      <p className={`text-2xl md:text-3xl font-bold ${accentColor} font-mono`}>
        {value}
      </p>
      <p className="text-xs text-slate-500 mt-1 font-mono">
        {label}{" "}
        <span className="text-slate-600">{suffix}</span>
      </p>
    </div>
  )
}

function ContactCard({
  href,
  icon: Icon,
  label,
  value,
  accent,
}: {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: string
  accent: "teal" | "violet" | "cyan"
}) {
  const colorMap = {
    teal: "from-teal-500 to-emerald-500 group-hover:shadow-[0_0_30px_-8px_rgba(20,184,166,0.7)]",
    violet: "from-violet-500 to-purple-500 group-hover:shadow-[0_0_30px_-8px_rgba(139,92,246,0.7)]",
    cyan: "from-cyan-500 to-blue-500 group-hover:shadow-[0_0_30px_-8px_rgba(6,182,212,0.7)]",
  }[accent]

  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="group block"
    >
      <Card className="bg-slate-800/30 border-slate-700/50 hover:border-transparent transition-all hover:-translate-y-1">
        <CardContent className="p-5">
          <div
            className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorMap} flex items-center justify-center mb-3 transition-shadow`}
          >
            <Icon className="w-5 h-5 text-white" />
          </div>
          <p className="text-xs font-mono uppercase tracking-widest text-slate-500 mb-1">
            {label}
          </p>
          <p className="text-sm text-slate-200 break-all flex items-center justify-between gap-2">
            <span className="truncate">{value}</span>
            <ExternalLink className="w-3 h-3 text-slate-600 group-hover:text-teal-400 transition-colors shrink-0" />
          </p>
        </CardContent>
      </Card>
    </a>
  )
}
