import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import {
  Buildings,
  RoadHorizon,
  Bridge,
  Hospital,
  GraduationCap,
  Drop,
  Lightning,
  House,
  Bus,
  Plant,
  CellTower,
  Eye,
  ChartBar,
  FileText,
  Heart,
  Shield,
  Phone,
  Envelope,
  Camera,
  MapPin,
  ArrowUp,
  Check,
  X,
  MagnifyingGlass,
  Sparkle,
  SquaresFour,
  CaretRight,
  CaretDown,
  ShareNetwork,
  Bell,
  User,
} from "@phosphor-icons/react";
import { PROJECT_IMAGES, CIVIC_LINKS, HELPLINES } from "../constants";
import type { Project, ProjectCategory, CitizenReport } from "../types";

const CATEGORY_META: Record<ProjectCategory, { label: string; Icon: React.ComponentType<{ className?: string; weight?: string }>; color: string }> = {
  road: { label: "Roads", Icon: RoadHorizon, color: "bg-emerald-100 text-emerald-700" },
  bridge: { label: "Bridges", Icon: Bridge, color: "bg-blue-100 text-blue-700" },
  school: { label: "Schools", Icon: GraduationCap, color: "bg-amber-100 text-amber-700" },
  hospital: { label: "Hospitals", Icon: Hospital, color: "bg-red-100 text-red-700" },
  water: { label: "Water", Icon: Drop, color: "bg-cyan-100 text-cyan-700" },
  power: { label: "Power", Icon: Lightning, color: "bg-yellow-100 text-yellow-700" },
  housing: { label: "Housing", Icon: House, color: "bg-orange-100 text-orange-700" },
  transport: { label: "Transport", Icon: Bus, color: "bg-purple-100 text-purple-700" },
  agriculture: { label: "Agriculture", Icon: Plant, color: "bg-green-100 text-green-700" },
  telecom: { label: "Telecom", Icon: CellTower, color: "bg-indigo-100 text-indigo-700" },
};

const STATS = [
  { label: "Active Projects", value: "1,247", icon: ChartBar, change: "+12% this quarter" },
  { label: "Budget Tracked", value: "₦4.8T", icon: Eye, change: "Across 36 states + FCT" },
  { label: "Citizen Reports", value: "8,432", icon: FileText, change: "92% acknowledged" },
  { label: "Verification Rate", value: "94%", icon: Check, change: "AI-matched accuracy" },
];

const REPORT_TYPES: { value: CitizenReport["type"]; label: string; icon: React.ComponentType<{ className?: string; weight?: string }> }[] = [
  { value: "observation", label: "Observation", icon: Eye },
  { value: "complaint", label: "Complaint", icon: Shield },
  { value: "praise", label: "Praise", icon: Heart },
  { value: "verification", label: "Verification", icon: Camera },
];

interface MainContentProps {
  projects: Project[];
  onViewProject: (project: Project) => void;
}

export default function MainContent({ projects, onViewProject }: MainContentProps) {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | "all">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showReportModal, setShowReportModal] = useState(false);
  const [showFooter, setShowFooter] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [reportForm, setReportForm] = useState({
    type: "observation" as CitizenReport["type"],
    message: "",
    location: "",
  });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const categories = useMemo(() => {
    const cats = new Set(projects.map((p) => p.category));
    return Array.from(cats);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      if (activeCategory !== "all" && p.category !== activeCategory) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.location.state.toLowerCase().includes(q) ||
          p.location.lga.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [projects, activeCategory, searchQuery]);

  const handleSubmitReport = () => {
    if (!reportForm.message.trim()) {
      toast.error("Please describe your observation");
      return;
    }
    toast.success("Report submitted successfully. Thank you for your civic engagement!");
    setReportForm({ type: "observation", message: "", location: "" });
    setShowReportModal(false);
  };

  const heroTitle = "Building Trust Through Transparency";
  const heroSubtitle =
    "Nigeria's open platform for tracking public infrastructure projects — from procurement to completion. Every naira, every contract, every project, visible to every citizen.";

  return (
    <div className="min-h-screen bg-white">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgMjBMMjAgMjBNMjAgMjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA0KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9zdmc+')] opacity-40" />
        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mx-auto max-w-3xl text-center"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm text-emerald-300">
              <Sparkle weight="fill" className="h-4 w-4" />
              <span>Federal Republic of Nigeria — Public Contract Transparency Portal</span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              {heroTitle}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-emerald-100/80 sm:text-xl">
              {heroSubtitle}
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  document.getElementById("projects-section")?.scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-500/25 transition-colors hover:bg-emerald-400"
              >
                <Eye weight="bold" className="h-5 w-5" />
                Explore Projects
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowReportModal(true)}
                className="inline-flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 px-6 py-3 text-base font-semibold text-emerald-200 backdrop-blur-sm transition-colors hover:bg-emerald-500/20"
              >
                <Camera weight="bold" className="h-5 w-5" />
                Submit a Report
              </motion.button>
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: "easeOut" }}
            className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4"
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
              >
                <div className="flex items-center gap-2 text-emerald-400">
                  <stat.icon weight="bold" className="h-5 w-5" />
                  <span className="text-xs font-medium uppercase tracking-wider text-emerald-400/70">
                    {stat.label}
                  </span>
                </div>
                <p className="mt-2 text-2xl font-bold text-white">{stat.value}</p>
                <p className="mt-0.5 text-xs text-emerald-200/60">{stat.change}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== PROJECTS SECTION ===== */}
      <section id="projects-section" className="bg-slate-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-slate-900"
            >
              Public Infrastructure Projects
            </motion.h2>
            <p className="mt-2 text-slate-500">
              Browse {projects.length} active and completed projects across Nigeria
            </p>
          </div>

          {/* Search + Filter */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlass className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" weight="bold" />
              <input
                type="text"
                placeholder="Search by project name, state, or LGA..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveCategory("all")}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-medium transition-colors ${
                  activeCategory === "all"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                }`}
              >
                <SquaresFour weight="bold" className="h-4 w-4" />
                All
              </button>
              {categories.map((cat) => {
                const meta = CATEGORY_META[cat];
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-xs font-medium transition-colors ${
                      activeCategory === cat
                        ? "bg-emerald-600 text-white shadow-sm"
                        : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
                    }`}
                  >
                    <meta.Icon weight="bold" className="h-4 w-4" />
                    {meta.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Project Grid */}
          <AnimatePresence mode="wait">
            {filteredProjects.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <Buildings className="h-16 w-16 text-slate-300" weight="light" />
                <h3 className="mt-4 text-lg font-semibold text-slate-600">No projects found</h3>
                <p className="mt-1 text-sm text-slate-400">
                  Try adjusting your search or filter
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={activeCategory + searchQuery}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {filteredProjects.map((project, i) => {
                  const meta = CATEGORY_META[project.category];
                  const imgUrl = PROJECT_IMAGES[project.id] || "";
                  const progressColor =
                    project.completion >= 80
                      ? "bg-emerald-500"
                      : project.completion >= 40
                        ? "bg-amber-500"
                        : "bg-red-500";
                  return (
                    <motion.button
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.4, ease: "easeOut" }}
                      whileHover={{ y: -4, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => onViewProject(project)}
                      className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white text-left shadow-sm transition-shadow hover:shadow-lg"
                    >
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden bg-slate-100">
                        {imgUrl ? (
                          <>
                            <img
                              src={imgUrl}
                              alt={project.title}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          </>
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <Buildings className="h-12 w-12 text-slate-300" weight="light" />
                          </div>
                        )}
                        {/* Category badge */}
                        <div className="absolute left-3 top-3">
                          <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium ${meta.color}`}>
                            <meta.Icon weight="bold" className="h-3.5 w-3.5" />
                            {meta.label}
                          </span>
                        </div>
                        {/* Status badge */}
                        <div className="absolute right-3 top-3">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${
                              project.status === "completed"
                                ? "bg-emerald-100 text-emerald-700"
                                : project.status === "in_progress"
                                  ? "bg-blue-100 text-blue-700"
                                  : project.status === "delayed"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {project.status.replace("_", " ")}
                          </span>
                        </div>
                      </div>
                      {/* Content */}
                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="text-base font-semibold text-slate-900 group-hover:text-emerald-700">
                          {project.title}
                        </h3>
                        <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                          {project.description}
                        </p>
                        <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                          <MapPin weight="bold" className="h-3 w-3" />
                          {project.location.lga}, {project.location.state}
                        </div>
                        {/* Progress bar */}
                        <div className="mt-4">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-medium text-slate-600">Progress</span>
                            <span className="font-semibold text-slate-800">{project.completion}%</span>
                          </div>
                          <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: `${project.completion}%` }}
                              viewport={{ once: true }}
                              transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.05 }}
                              className={`h-full rounded-full ${progressColor} transition-all`}
                            />
                          </div>
                        </div>
                        {/* Budget */}
                        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 text-xs text-slate-500">
                          <span>
                            Budget: <strong className="text-slate-700">₦{(project.budget / 1e9).toFixed(1)}B</strong>
                          </span>
                          <span className="inline-flex items-center gap-1 font-medium text-emerald-600">
                            View details <CaretRight weight="bold" className="h-3 w-3" />
                          </span>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ===== CIVIC ENGAGEMENT SECTION ===== */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Report CTA */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-3xl font-bold text-slate-900">Your Voice Builds Better Infrastructure</h2>
              <p className="mt-4 text-lg leading-relaxed text-slate-500">
                Every citizen report helps hold contractors accountable and ensures public funds are
                spent wisely. Upload photos, share observations, and track how your report impacts
                project outcomes.
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100">
                    <Camera className="h-5 w-5 text-emerald-600" weight="bold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Upload Site Photos</h4>
                    <p className="text-sm text-slate-500">
                      Submit geotagged photos of project sites to verify progress claims
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100">
                    <Shield className="h-5 w-5 text-emerald-600" weight="bold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">Report Concerns Anonymously</h4>
                    <p className="text-sm text-slate-500">
                      Flag potential corruption, abandoned projects, or substandard materials
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100">
                    <Eye className="h-5 w-5 text-emerald-600" weight="bold" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">AI-Powered Verification</h4>
                    <p className="text-sm text-slate-500">
                      Our AI cross-references your report with contractor data for instant validation
                    </p>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setShowReportModal(true)}
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-emerald-600/25 transition-colors hover:bg-emerald-500"
              >
                <Camera weight="bold" className="h-5 w-5" />
                Submit a Citizen Report
              </motion.button>
            </motion.div>

            {/* Right: Helplines */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              className="rounded-2xl border border-slate-200 bg-slate-50 p-8"
            >
              <h3 className="text-xl font-bold text-slate-900">Whistleblower & Helpline Resources</h3>
              <p className="mt-2 text-sm text-slate-500">
                Confidential reporting channels for corruption, fraud, and mismanagement
              </p>
              <div className="mt-6 space-y-3">
                {HELPLINES.map((h) => (
                  <div
                    key={h.label}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4"
                  >
                    <span className="text-sm font-medium text-slate-700">{h.label}</span>
                    <a
                      href={`tel:${h.phone}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-600 hover:text-emerald-500"
                    >
                      <Phone weight="bold" className="h-4 w-4" />
                      {h.phone}
                    </a>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4">
                <p className="text-xs font-medium text-amber-800">
                  <Shield weight="bold" className="mr-1 inline h-3.5 w-3.5" />
                  All reports are protected under the Whistleblower Protection Act 2021.
                  Your identity remains confidential.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== CIVIC FOOTER ===== */}
      <footer className="border-t border-slate-200 bg-slate-900 text-slate-300">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Brand */}
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2">
                <Buildings className="h-6 w-6 text-emerald-400" weight="bold" />
                <span className="text-lg font-bold text-white">Clear Contract</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">
                Nigeria's open-source platform for public contract transparency.
                Empowering citizens with data-driven oversight of public infrastructure.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Resources
              </h4>
              <ul className="space-y-2">
                {CIVIC_LINKS.slice(0, 3).map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-slate-400 transition-colors hover:text-emerald-400"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Policies
              </h4>
              <ul className="space-y-2">
                {CIVIC_LINKS.slice(3).map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-slate-400 transition-colors hover:text-emerald-400"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Contact
              </h4>
              <ul className="space-y-2">
                <li className="flex items-center gap-2 text-sm text-slate-400">
                  <Envelope weight="bold" className="h-4 w-4 text-emerald-400" />
                  transparency@clearcontract.gov.ng
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-400">
                  <Phone weight="bold" className="h-4 w-4 text-emerald-400" />
                  0800-CLEAR-NG
                </li>
                <li className="flex items-center gap-2 text-sm text-slate-400">
                  <MapPin weight="bold" className="h-4 w-4 text-emerald-400" />
                  Abuja, FCT — Nigeria
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-10 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
            <p>© {new Date().getFullYear()} Clear Contract Platform. Open Source — MIT License.</p>
            <p className="mt-1">
              Built in partnership with the Bureau of Public Procurement and the Open Contracting Partnership.
            </p>
          </div>
        </div>
      </footer>

      {/* ===== REPORT MODAL ===== */}
      <AnimatePresence>
        {showReportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
            onClick={() => setShowReportModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
                <h3 className="text-lg font-semibold text-slate-900">Submit a Citizen Report</h3>
                <button
                  onClick={() => setShowReportModal(false)}
                  className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
                >
                  <X className="h-5 w-5" weight="bold" />
                </button>
              </div>
              <div className="space-y-5 p-6">
                {/* Report Type */}
                <div>
                  <label className="text-sm font-medium text-slate-700">Report Type</label>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {REPORT_TYPES.map((rt) => (
                      <button
                        key={rt.value}
                        onClick={() => setReportForm((f) => ({ ...f, type: rt.value }))}
                        className={`flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                          reportForm.type === rt.value
                            ? "border-emerald-400 bg-emerald-50 text-emerald-700"
                            : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                        }`}
                      >
                        <rt.icon weight="bold" className="h-5 w-5" />
                        {rt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="text-sm font-medium text-slate-700">Description</label>
                  <textarea
                    value={reportForm.message}
                    onChange={(e) => setReportForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder="Describe what you observed at the project site..."
                    rows={4}
                    className="mt-2 w-full rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="text-sm font-medium text-slate-700">Location</label>
                  <div className="relative mt-2">
                    <MapPin className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" weight="bold" />
                    <input
                      type="text"
                      value={reportForm.location}
                      onChange={(e) => setReportForm((f) => ({ ...f, location: e.target.value }))}
                      placeholder="Project site location or address"
                      className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-900 placeholder-slate-400 focus:border-emerald-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                    />
                  </div>
                </div>

                {/* Photo upload placeholder */}
                <div className="rounded-xl border-2 border-dashed border-slate-200 bg-slate-50 p-6 text-center">
                  <Camera className="mx-auto h-8 w-8 text-slate-300" weight="bold" />
                  <p className="mt-2 text-sm font-medium text-slate-600">Upload Site Photos</p>
                  <p className="text-xs text-slate-400">Drag & drop or click to browse (max 5 photos)</p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 border-t border-slate-100 px-6 py-4">
                <button
                  onClick={() => setShowReportModal(false)}
                  className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100"
                >
                  Cancel
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSubmitReport}
                  className="rounded-xl bg-emerald-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-emerald-500"
                >
                  Submit Report
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}