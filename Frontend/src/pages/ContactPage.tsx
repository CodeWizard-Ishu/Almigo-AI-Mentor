import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  MapPin,
  Send,
  Github,
  Linkedin,
  CheckCircle,
  AlertCircle,
  Loader2,
  Code2,
} from "lucide-react";
import { LandingNavbar } from "@/components/landing/LandingNavbar";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { useDocumentTitle } from "@/hooks/useDocumentTitle";
import { submitContactForm } from "@/services/contact";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.6, ease: "easeOut" as const },
  }),
};

const SUBJECT_OPTIONS = [
  "General Inquiry",
  "Bug Report",
  "Feature Suggestion",
  "Other",
] as const;

const INFO_CARDS = [
  {
    icon: Mail,
    label: "Email",
    value: "utkarshjaiswal0987@gmail.com",
    href: "mailto:utkarshjaiswal0987@gmail.com",
  },
  {
    icon: MapPin,
    label: "Location",
    value: "Bangalore, India",
    href: null,
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
    icon: Code2,
    href: "https://leetcode.com/utkarsh1726",
    label: "LeetCode",
  },
] as const;

interface FormState {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function validateForm(form: FormState): FormErrors {
  const errors: FormErrors = {};
  if (!form.name.trim() || form.name.trim().length < 2)
    errors.name = "Name must be at least 2 characters";
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Please enter a valid email";
  if (!form.subject) errors.subject = "Please select a subject";
  if (!form.message.trim() || form.message.trim().length < 10)
    errors.message = "Message must be at least 10 characters";
  return errors;
}

export default function ContactPage() {
  useDocumentTitle("Contact");

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setStatus("loading");
    setErrors({});

    try {
      const result = await submitContactForm(form);
      if (result.success) {
        setStatus("success");
        setStatusMessage(
          result.message || "Your message has been sent! We'll get back to you soon."
        );
        setForm({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus("error");
        setStatusMessage(result.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setStatusMessage("Failed to send your message. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 text-slate-900 dark:text-white overflow-x-hidden">
      <LandingNavbar />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-12 sm:pt-36 sm:pb-16 overflow-hidden">
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
              Contact Us
            </span>
          </motion.span>

          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]"
          >
            Get In{" "}
            <span className="bg-gradient-to-r from-teal-500 to-cyan-400 bg-clip-text text-transparent">
              Touch
            </span>
          </motion.h1>

          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="mt-6 text-lg sm:text-xl text-slate-600 dark:text-gray-400 leading-relaxed max-w-2xl mx-auto"
          >
            Found a bug? Have a feature suggestion? Or just want to say hi? We'd
            love to hear from you. Drop us a message and we'll get back to you.
          </motion.p>
        </div>
      </section>

      {/* ── Main Content ─────────────────────────────────────────────── */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
            {/* ── Contact Form (3/5) ──────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="relative p-8 sm:p-10 rounded-3xl bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 backdrop-blur-sm">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-teal-500/5 to-cyan-400/5 dark:from-teal-500/10 dark:to-cyan-400/10 opacity-40" />

                <div className="relative">
                  <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                    Send a Message
                  </h2>

                  {/* Success / Error banner */}
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200/60 dark:border-emerald-500/20 mb-6"
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
                      <p className="text-sm text-emerald-700 dark:text-emerald-300">
                        {statusMessage}
                      </p>
                    </motion.div>
                  )}

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-4 rounded-xl bg-red-50 dark:bg-red-500/10 border border-red-200/60 dark:border-red-500/20 mb-6"
                    >
                      <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                      <p className="text-sm text-red-700 dark:text-red-300">
                        {statusMessage}
                      </p>
                    </motion.div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Name + Email row */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label
                          htmlFor="contact-name"
                          className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1.5"
                        >
                          Name
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border ${
                            errors.name
                              ? "border-red-300 dark:border-red-500/30"
                              : "border-slate-200/80 dark:border-white/10"
                          } text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 dark:focus:border-teal-500 transition-all`}
                        />
                        {errors.name && (
                          <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="contact-email"
                          className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1.5"
                        >
                          Email
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="you@example.com"
                          className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border ${
                            errors.email
                              ? "border-red-300 dark:border-red-500/30"
                              : "border-slate-200/80 dark:border-white/10"
                          } text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 dark:focus:border-teal-500 transition-all`}
                        />
                        {errors.email && (
                          <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Subject */}
                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1.5"
                      >
                        Subject
                      </label>
                      <select
                        id="contact-subject"
                        name="subject"
                        value={form.subject}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border ${
                          errors.subject
                            ? "border-red-300 dark:border-red-500/30"
                            : "border-slate-200/80 dark:border-white/10"
                        } text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 dark:focus:border-teal-500 transition-all appearance-none cursor-pointer`}
                      >
                        <option value="" disabled className="text-slate-400">
                          Select a subject
                        </option>
                        {SUBJECT_OPTIONS.map((opt) => (
                          <option key={opt} value={opt} className="text-slate-900 dark:text-white bg-white dark:bg-slate-900">
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.subject && (
                        <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">
                          {errors.subject}
                        </p>
                      )}
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="contact-message"
                        className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-1.5"
                      >
                        Message
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Tell us what's on your mind — concerns, suggestions, bug reports..."
                        className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-white/5 border ${
                          errors.message
                            ? "border-red-300 dark:border-red-500/30"
                            : "border-slate-200/80 dark:border-white/10"
                        } text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-400 dark:focus:border-teal-500 transition-all resize-none`}
                      />
                      {errors.message && (
                        <p className="mt-1.5 text-xs text-red-500 dark:text-red-400">
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-sm font-semibold text-white rounded-xl bg-gradient-to-r from-teal-500 to-cyan-400 shadow-lg shadow-teal-500/25 dark:shadow-teal-500/30 hover:shadow-teal-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                </div>
              </div>
            </motion.div>

            {/* ── Sidebar Info (2/5) ──────────────────────────────────── */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Info cards */}
              {INFO_CARDS.map((card) => (
                <div
                  key={card.label}
                  className="group p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 backdrop-blur-sm hover:border-teal-300/60 dark:hover:border-teal-500/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-400 flex items-center justify-center text-white shadow-md flex-shrink-0">
                      <card.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-slate-500 dark:text-gray-500 uppercase tracking-wide mb-1">
                        {card.label}
                      </p>
                      {card.href ? (
                        <a
                          href={card.href}
                          className="text-sm font-medium text-slate-900 dark:text-white hover:text-teal-600 dark:hover:text-teal-400 transition-colors break-all"
                        >
                          {card.value}
                        </a>
                      ) : (
                        <p className="text-sm font-medium text-slate-900 dark:text-white">
                          {card.value}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Social links */}
              <div className="p-6 rounded-2xl bg-white/60 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 backdrop-blur-sm">
                <p className="text-xs font-semibold text-slate-500 dark:text-gray-500 uppercase tracking-wide mb-4">
                  Connect With Us
                </p>
                <div className="flex flex-wrap gap-3">
                  {SOCIAL_LINKS.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-slate-500 dark:text-gray-500 hover:text-teal-600 dark:hover:text-teal-400 hover:border-teal-300/60 dark:hover:border-teal-500/30 transition-all text-sm"
                    >
                      <social.icon className="w-4 h-4" />
                      <span className="font-medium">{social.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Quick note */}
              <div className="p-6 rounded-2xl bg-gradient-to-br from-teal-500/10 to-cyan-400/10 dark:from-teal-500/5 dark:to-cyan-400/5 border border-teal-200/40 dark:border-teal-500/20">
                <p className="text-sm text-slate-700 dark:text-gray-300 leading-relaxed">
                  <span className="font-semibold text-teal-700 dark:text-teal-400">
                    💡 Quick note:
                  </span>{" "}
                  Whether it's a concern, a feature idea, or a bug you've
                  spotted — we genuinely read every message and appreciate your
                  feedback!
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}
