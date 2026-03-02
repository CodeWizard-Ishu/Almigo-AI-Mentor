import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  Heart,
  Brain,
  Lightbulb,
  Target,
  Code2,
} from "lucide-react";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" as const },
  }),
};

const VALUES = [
  {
    icon: Heart,
    title: "Open Mentorship",
    description:
      "Everyone deserves access to quality guidance — regardless of background, connections, or geography.",
    gradient: "from-teal-500 to-cyan-400",
  },
  {
    icon: Brain,
    title: "AI-First Approach",
    description:
      "Harnessing AI to deliver personalized learning paths and real-time feedback that scales to every learner.",
    gradient: "from-cyan-400 to-emerald-400",
  },
  {
    icon: Lightbulb,
    title: "Continuous Learning",
    description:
      "Growth never stops. Almigo adapts to your evolving goals, helping you stay ahead in a fast-changing industry.",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Target,
    title: "Real-World Impact",
    description:
      "From landing your first job to switching careers — we focus on outcomes that genuinely change lives.",
    gradient: "from-amber-400 to-orange-400",
  },
] as const;

const SOCIAL_LINKS = [
  {
    icon: Github,
    href: "https://github.com/CodeWizard-Ishu",
    label: "GitHub",
  },
  {
    icon: Linkedin,
    href: "https://www.linkedin.com/in/utkarshjaiswal17/",
    label: "LinkedIn",
  },
  {
    icon: Mail,
    href: "mailto:utkarshjaiswal0987@gmail.com",
    label: "Email",
  },
  {
    icon: Code2,
    href: "https://leetcode.com/utkarsh1726",
    label: "LeetCode",
  },
] as const;

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const },
  },
};

export default function AboutPage() {
  useDocumentTitle("About");

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white overflow-x-hidden">
      <LandingNavbar />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-20 overflow-hidden">
        {/* Background gradients */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-teal-200/40 to-cyan-200/30 blur-3xl dark:from-teal-500/15 dark:to-cyan-500/10" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-emerald-200/30 to-teal-200/20 blur-3xl dark:from-emerald-500/10 dark:to-teal-500/5" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-100/60 dark:bg-teal-500/10 border border-teal-200/60 dark:border-teal-500/20 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
            <span className="text-xs font-semibold text-teal-700 dark:text-teal-400 tracking-wide uppercase">
              About Almigo
            </span>
          </motion.span>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]"
          >
            AI Mentorship,{" "}
            <span className="bg-gradient-to-r from-teal-500 to-cyan-400 bg-clip-text text-transparent">
              No Gatekeeping.
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto"
          >
            Almigo was built with a simple belief — quality mentorship shouldn't
            be locked behind privilege. Leveraging AI, we're making career
            guidance accessible, personal, and available 24/7.
          </motion.p>
        </div>
      </section>

      {/* ── Creator Section ──────────────────────────────────────────── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <span className="inline-block text-xs font-semibold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-4">
              The Creator
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Meet{" "}
              <span className="bg-gradient-to-r from-teal-500 to-cyan-400 bg-clip-text text-transparent">
                Utkarsh
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-4xl mx-auto"
          >
            <div className="relative p-8 sm:p-10 rounded-3xl bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 backdrop-blur-sm">
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-500/5 to-cyan-400/5 dark:from-teal-500/10 dark:to-cyan-400/10 opacity-60" />

              <div className="relative flex flex-col md:flex-row gap-8 items-center md:items-start">
                {/* Photo */}
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-400 opacity-60 blur-sm" />
                    <img
                      src="/images/about/utkarsh.jpg"
                      alt="Utkarsh Jaiswal"
                      className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-2xl object-cover shadow-xl"
                    />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Utkarsh Jaiswal
                  </h3>
                  <p className="mt-1 text-sm font-medium text-teal-600 dark:text-teal-400">
                    Backend Engineer & Creator of Almigo
                  </p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-gray-500">
                    B.Tech CSE, MMMUT Gorakhpur • Bangalore, India
                  </p>

                  <p className="mt-4 text-sm sm:text-base text-slate-600 dark:text-gray-400 leading-relaxed">
                    A backend engineer passionate about architecting scalable
                    microservices and high-performance APIs. Specializing in
                    Node.js, TypeScript, and cloud-native systems with expertise
                    in Docker, Kubernetes, and AWS. Built Almigo to bridge the
                    mentorship gap — bringing AI-powered career guidance to
                    everyone who needs it.
                  </p>

                  {/* Social links */}
                  <div className="mt-6 flex flex-wrap gap-3 justify-center md:justify-start">
                    {SOCIAL_LINKS.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="group inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-slate-500 dark:text-gray-500 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-300/60 dark:hover:border-teal-500/30 transition-all text-sm"
                      >
                        <social.icon className="w-4 h-4" />
                        <span className="font-medium">{social.label}</span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Mission ──────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-gradient-to-r from-teal-200/20 to-cyan-200/20 blur-3xl dark:from-teal-500/5 dark:to-cyan-500/5" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <span className="inline-block text-xs font-semibold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-4">
              Our Mission
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Leveraging AI to{" "}
              <span className="bg-gradient-to-r from-teal-500 to-cyan-400 bg-clip-text text-transparent">
                Democratize Mentorship
              </span>
            </h2>
            <p className="mt-6 text-lg text-slate-600 dark:text-gray-400 leading-relaxed">
              I've always believed that the right guidance at the right time can
              change someone's trajectory. But mentorship has traditionally been
              scarce — limited to those lucky enough to know the right people.
            </p>
            <p className="mt-4 text-lg text-slate-600 dark:text-gray-400 leading-relaxed">
              Almigo was born from a simple idea: what if AI could be that
              mentor? Not replacing human connection, but making quality career
              guidance — personalized roadmaps, real-time answers, and
              actionable feedback — available to everyone, everywhere, for free.
            </p>
            <p className="mt-4 text-lg text-slate-600 dark:text-gray-400 leading-relaxed">
              Whether you're a student finding your path, a developer leveling
              up, or someone making a career switch — Almigo is here to guide
              your journey, one session at a time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Values Grid ──────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto mb-16"
          >
            <span className="inline-block text-xs font-semibold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-4">
              What We Stand For
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Built on{" "}
              <span className="bg-gradient-to-r from-teal-500 to-cyan-400 bg-clip-text text-transparent">
                Values
              </span>
            </h2>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 gap-5"
          >
            {VALUES.map((value) => (
              <motion.div
                key={value.title}
                variants={cardItem}
                className="group relative p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 backdrop-blur-sm hover:border-teal-300/60 dark:hover:border-teal-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-teal-500/5 dark:hover:shadow-teal-500/10"
              >
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-teal-500/5 to-cyan-400/5 dark:from-teal-500/10 dark:to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${value.gradient} flex items-center justify-center text-white shadow-md mb-4`}
                  >
                    <value.icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* BG gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-cyan-400" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent" />

            <div className="relative z-10 px-8 py-16 sm:px-16 sm:py-20 text-center">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-lg text-white/80 max-w-xl mx-auto mb-8">
                Join Almigo and get personalized AI mentorship — roadmaps,
                real-time guidance, and everything you need to level up.
              </p>
              <Link
                to="/signup"
                className="group inline-flex items-center gap-2 px-8 py-4 text-base font-semibold text-teal-700 bg-white rounded-xl shadow-xl shadow-black/10 hover:shadow-black/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Try AI Mentor — It's Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
