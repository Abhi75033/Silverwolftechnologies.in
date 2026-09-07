"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Globe,
  Rocket,
  TrendingUp,
  Mail,
  MessageCircle,
  Sparkles,
  Layers,
  Search
} from "lucide-react";
import { SITE } from "@/data/site";
import Breadcrumb from "@/components/Breadcrumb";

export type Job = {
  id: number;
  category: "Development" | "Marketing" | "Creative";
  title: string;
  location: string;
  type: string;
  description: string;
};

const jobs: Job[] = [
  {
    id: 1,
    category: "Marketing",
    title: "Digital Marketing Intern",
    location: "Work from Home",
    type: "Internship",
    description: "Collaborate with our senior marketing team to accelerate organic traffic, conduct competitor search audit campaigns, curate interactive social calendars, analyze high-ROI performance metrics, and optimize technical SEO. Designed for ambitious graduates eager to master modern growth systems and digital agency operations."
  }
];

const categories = ["All Openings", "Development", "Marketing", "Creative"] as const;

export const CareersPage = () => {
  const [activeCategory, setActiveCategory] = useState<typeof categories[number]>("All Openings");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [college, setCollege] = useState("");
  const [semesterYear, setSemesterYear] = useState("");
  const [source, setSource] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const filteredJobs = jobs.filter((job) => {
    const matchesCategory = activeCategory === "All Openings" || job.category === activeCategory;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleOpenModal = (job: Job) => {
    setSelectedJob(job);
    setFormError("");
    setIsSuccess(false);
    setIsSubmitting(false);
  };

  const handleCloseModal = () => {
    setSelectedJob(null);
    setName("");
    setEmail("");
    setPhone("");
    setPortfolio("");
    setCollege("");
    setSemesterYear("");
    setSource("");
    setFormError("");
    setIsSuccess(false);
    setIsSubmitting(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || !college || !semesterYear || !source) {
      setFormError("Please fill in all required fields.");
      return;
    }

    if (!selectedJob) return;

    setIsSubmitting(true);
    setFormError("");

    try {
      const response = await fetch("/api/careers/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          college,
          semesterYear,
          portfolio,
          source,
          jobId: selectedJob.id,
          jobTitle: selectedJob.title,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to submit application");
      }

      setIsSuccess(true);
    } catch (err: any) {
      console.error("Submission error:", err);
      setFormError(err.message || "An error occurred while submitting. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const breadcrumbs = [
    { name: "Home", href: "/" },
    { name: "Careers", href: "/careers" }
  ];

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-foreground">
      {/* Decorative Grid Overlay & Ambient Blobs */}
      <div className="absolute inset-0 grid-bg pointer-events-none z-0" />
      <div className="absolute top-24 left-[10%] w-[350px] h-[350px] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute top-[40%] right-[10%] w-[300px] h-[300px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* 1. HERO SECTION */}
      <section className="relative z-10 pt-36 pb-16 text-center overflow-hidden">
        <div className="container max-w-4xl px-4 mx-auto animate-fade-up">
          <Breadcrumb items={breadcrumbs} />
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/5 mb-6 hover:scale-105 transition-all duration-300">
            <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-primary">Join Our Pack</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Build Something <br className="hidden sm:inline" />
            <span className="text-gradient">Extraordinary With Us</span>
          </h1>

          <p className="text-muted-foreground text-base md:text-xl max-w-2xl mx-auto leading-relaxed mb-10">
            We are a high-performing senior team of engineers, marketers, and designers.
            Remote-first, outcome-obsessed, and always looking for exceptional builders to run with us.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4">
            <div className="glass px-5 py-2.5 rounded-full border border-white/10 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs md:text-sm font-medium text-white/90">Remote · Worldwide</span>
            </div>
            <div className="glass px-5 py-2.5 rounded-full border border-white/10 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs md:text-sm font-medium text-white/90">Open Roles · Growing Team</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEARCH & FILTER TABS */}
      <section className="relative z-10 py-12 border-t border-b border-white/5 glass">
        <div className="container max-w-6xl px-4 mx-auto">
          <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
            {/* Horizontal Tabs */}
            <div className="flex flex-wrap gap-2.5 order-2 md:order-1">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <Button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    variant={isActive ? "hero" : "glass"}
                    className={`rounded-full px-5 py-2 text-xs md:text-sm transition-all duration-300 ${isActive ? "scale-105 glow-ring" : "hover:border-primary/30"
                      }`}
                  >
                    {cat}
                  </Button>
                );
              })}
            </div>

            {/* Simple Search bar */}
            <div className="relative w-full md:w-72 order-1 md:order-2">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search open positions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full glass border border-white/10 rounded-full text-sm placeholder:text-muted-foreground/60 text-foreground focus-visible:ring-primary focus-visible:ring-offset-0 focus-visible:border-primary/50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 3. JOB OPENINGS GRID */}
      <section className="relative z-10 py-20">
        <div className="container max-w-6xl px-4 mx-auto">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Active Opportunities</span>
              <h2 className="text-3xl font-bold mt-2">Open Positions</h2>
            </div>
            <Badge variant="secondary" className="glass px-3 py-1 rounded-full text-xs text-muted-foreground border border-white/5">
              Showing {filteredJobs.length} role{filteredJobs.length !== 1 ? "s" : ""}
            </Badge>
          </div>

          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="group relative glass rounded-2xl border border-white/10 p-6 flex flex-col justify-between hover:border-primary/40 hover:scale-[1.02] hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-black/40"
                >
                  <div>
                    {/* Badge Category */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[10px] font-semibold uppercase tracking-widest text-primary/80 glass px-2.5 py-1 rounded-full border border-primary/20">
                        {job.category}
                      </span>
                      <span className="text-[11px] text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {job.type}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors mb-2">
                      {job.title}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
                      <MapPin className="h-3.5 w-3.5 text-muted-foreground/60" />
                      {job.location}
                    </div>

                    {/* Short Description */}
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      {job.description}
                    </p>
                  </div>

                  {/* Apply Button */}
                  <Button
                    onClick={() => handleOpenModal(job)}
                    variant="glass"
                    className="w-full flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-transparent transition-all duration-300"
                  >
                    View & Apply
                    <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            /* 5. NO OPENINGS FALLBACK STATE */
            <div className="glass rounded-3xl border border-white/10 p-12 text-center max-w-lg mx-auto shadow-2xl animate-fade-up">
              <div className="h-16 w-16 rounded-full bg-secondary/80 flex items-center justify-center mx-auto mb-6 border border-white/5">
                <Briefcase className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No openings in this category right now
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                We're always looking for exceptional minds. Send your CV speculative application to our email and we will be in touch!
              </p>
              <Button asChild variant="hero">
                <a
                  href={`mailto:hello@theplacemate.in?subject=Speculative%20Application%20-%20Silver%20Wolf%20Technologies`}
                  className="flex items-center justify-center gap-2 text-primary-foreground hover:text-primary-foreground/90 w-full"
                >
                  <Mail className="h-4 w-4" />
                  <span>Send Your CV</span>
                </a>
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* 6. CULTURE / WHY JOIN US SECTION */}
      <section className="relative z-10 py-24 border-t border-white/5 bg-black/40">
        <div className="container max-w-6xl px-4 mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">How We Run</span>
            <h2 className="text-4xl font-bold mt-3 mb-4">Pack Culture & Values</h2>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              We focus on outcomes rather than desk hours. We collaborate globally, trust deeply, and operate transparently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="glass rounded-2xl border border-white/10 p-8 hover:border-primary/20 transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">🌍 Remote First</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Work from anywhere in India or globally. Async-friendly culture built on clear, proactive documentation and absolute trust.
              </p>
            </div>

            {/* Card 2 */}
            <div className="glass rounded-2xl border border-white/10 p-8 hover:border-primary/20 transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6">
                <Rocket className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">🚀 Real Ownership</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Work directly with founders and take immediate charge of features. Ship products utilized by real businesses worldwide.
              </p>
            </div>

            {/* Card 3 */}
            <div className="glass rounded-2xl border border-white/10 p-8 hover:border-primary/20 transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                <TrendingUp className="h-6 w-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">📈 Growth Focused</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Learn across development, marketing and product design within an experienced, senior team. We scale your skill limits daily.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA BANNER */}
      <section className="relative z-10 py-20">
        <div className="container max-w-5xl px-4 mx-auto">
          <div className="glass rounded-3xl border border-white/10 p-8 md:p-14 text-center relative overflow-hidden shadow-2xl">
            {/* Background blur inside the CTA banner */}
            <div className="absolute -top-12 -left-12 w-44 h-44 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />
            <div className="absolute -bottom-12 -right-12 w-44 h-44 bg-purple-500/10 rounded-full blur-[80px] pointer-events-none" />

            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Get In Touch</span>
            <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-4 text-white">
              Don't see a role that fits?
            </h2>
            <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto leading-relaxed mb-8">
              We're always open to exceptional talent. Send us your CV and portfolio, and let's explore how we can collaborate.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
              <Button asChild variant="hero" size="lg" className="w-full sm:w-auto">
                <a
                  href={`mailto:hello@theplacemate.in?subject=Speculative%20Application%20-%20Silver%20Wolf%20Technologies`}
                  className="flex items-center justify-center gap-2 text-primary-foreground hover:text-primary-foreground/90 w-full"
                >
                  <Mail className="h-4.5 w-4.5" />
                  <span>Email Your CV</span>
                </a>
              </Button>
              <Button asChild variant="whatsapp" size="lg" className="w-full sm:w-auto">
                <a
                  href="https://wa.me/916394753801"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 text-white hover:text-white/90 w-full"
                >
                  <MessageCircle className="h-4.5 w-4.5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </Button>
            </div>

            <p className="text-xs text-muted-foreground/50 mt-6">
              Or apply directly at:{" "}
              <a href="mailto:hello@theplacemate.in" className="text-primary hover:underline font-medium">
                hello@theplacemate.in
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* 4. APPLY MODAL (DIALOG) */}
      <Dialog open={selectedJob !== null} onOpenChange={(open) => !open && handleCloseModal()}>
        <DialogContent className="glass border-2 border-indigo-500/45 bg-gradient-to-b from-[#1b1c24] to-[#121319] p-6 md:p-8 max-w-lg rounded-3xl text-foreground text-left shadow-[0_0_80px_rgba(99,102,241,0.45)] fixed overflow-hidden">
          {/* Luminous accent lights to dynamically lift modal container */}
          <div className="absolute -top-10 -right-10 w-28 h-28 bg-primary/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-28 h-28 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />
          
          {isSuccess ? (
            <div className="flex flex-col items-center text-center py-6 space-y-5 animate-fade-up">
              <div className="h-16 w-16 rounded-full bg-emerald-500/25 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <Sparkles className="h-8 w-8 animate-pulse text-emerald-400" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white tracking-tight">Application Submitted!</h3>
                <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                  Thank you for applying, <span className="text-white font-medium">{name}</span>. Your application for <span className="text-primary font-medium">{selectedJob?.title}</span> has been received successfully.
                </p>
              </div>
              
              <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-left text-xs space-y-2.5">
                <div className="flex justify-between items-center pb-1.5 border-b border-white/5">
                  <span className="text-muted-foreground">College:</span>
                  <span className="text-white font-medium">{college}</span>
                </div>
                <div className="flex justify-between items-center pb-1.5 border-b border-white/5">
                  <span className="text-muted-foreground">Semester / Year:</span>
                  <span className="text-white font-medium">{semesterYear}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Contact Email:</span>
                  <span className="text-white font-medium">{email}</span>
                </div>
              </div>

              <p className="text-[11px] text-muted-foreground/60">
                Our operations team will review your credentials and contact you directly.
              </p>

              <Button onClick={handleCloseModal} variant="hero" className="w-full py-2.5 rounded-xl text-sm">
                Close Window
              </Button>
            </div>
          ) : (
            <>
              <DialogHeader className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-semibold uppercase tracking-widest text-primary/80 glass px-2 rounded-full border border-primary/20">
                    {selectedJob?.category}
                  </span>
                  <Badge variant="secondary" className="glass text-[10px] text-muted-foreground border border-white/5 py-0.5 px-2">
                    {selectedJob?.type}
                  </Badge>
                </div>
                <DialogTitle className="text-2xl font-bold text-white tracking-tight mt-1.5">
                  Apply for {selectedJob?.title}
                </DialogTitle>
                <DialogDescription className="text-xs text-muted-foreground leading-relaxed">
                  Complete the short form below to submit your details directly to our careers desk.
                </DialogDescription>
              </DialogHeader>

              <form onSubmit={handleSubmit} className="space-y-4.5 mt-6">
                {formError && (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 text-xs text-destructive font-medium">
                    {formError}
                  </div>
                )}

                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-semibold text-white/90">
                    Full Name <span className="text-primary">*</span>
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Abhishek Yadav"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-[#090a0d] border border-white/15 rounded-xl text-sm text-white placeholder:text-muted-foreground/40 focus:border-primary/60 focus:ring-1 focus:ring-primary/60 focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-200"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-white/90">
                      Email Address <span className="text-primary">*</span>
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="abhishek@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="bg-[#090a0d] border border-white/15 rounded-xl text-sm text-white placeholder:text-muted-foreground/40 focus:border-primary/60 focus:ring-1 focus:ring-primary/60 focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-200"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="phone" className="text-xs font-semibold text-white/90">
                      Phone Number <span className="text-primary">*</span>
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+91 63947 53801"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="bg-[#090a0d] border border-white/15 rounded-xl text-sm text-white placeholder:text-muted-foreground/40 focus:border-primary/60 focus:ring-1 focus:ring-primary/60 focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-200"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="college" className="text-xs font-semibold text-white/90">
                      College Name <span className="text-primary">*</span>
                    </label>
                    <Input
                      id="college"
                      type="text"
                      placeholder="e.g. IIT Bombay, Mumbai University"
                      value={college}
                      onChange={(e) => setCollege(e.target.value)}
                      className="bg-[#090a0d] border border-white/15 rounded-xl text-sm text-white placeholder:text-muted-foreground/40 focus:border-primary/60 focus:ring-1 focus:ring-primary/60 focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-200"
                      required
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="semesterYear" className="text-xs font-semibold text-white/90">
                      Semester / Year <span className="text-primary">*</span>
                    </label>
                    <select
                      id="semesterYear"
                      value={semesterYear}
                      onChange={(e) => setSemesterYear(e.target.value)}
                      required
                      disabled={isSubmitting}
                      className="w-full bg-[#090a0d] border border-white/15 rounded-xl text-sm text-white px-3 py-2.5 focus:border-primary/60 focus:ring-1 focus:ring-primary/60 focus:outline-none transition-all duration-200 appearance-none cursor-pointer"
                      style={{ colorScheme: "dark" }}
                    >
                      <option value="" disabled className="text-muted-foreground">Select semester / year</option>
                      <option value="1st Semester / 1st Year">1st Semester / 1st Year</option>
                      <option value="2nd Semester / 1st Year">2nd Semester / 1st Year</option>
                      <option value="3rd Semester / 2nd Year">3rd Semester / 2nd Year</option>
                      <option value="4th Semester / 2nd Year">4th Semester / 2nd Year</option>
                      <option value="5th Semester / 3rd Year">5th Semester / 3rd Year</option>
                      <option value="6th Semester / 3rd Year">6th Semester / 3rd Year</option>
                      <option value="7th Semester / 4th Year">7th Semester / 4th Year</option>
                      <option value="8th Semester / 4th Year">8th Semester / 4th Year</option>
                      <option value="Postgraduate / Masters">Postgraduate / Masters</option>
                      <option value="Graduated">Graduated</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="portfolio" className="text-xs font-semibold text-white/90">
                    Portfolio or LinkedIn Link
                  </label>
                  <Input
                    id="portfolio"
                    type="url"
                    placeholder="https://github.com/abhishek or linkedin.com/in/..."
                    value={portfolio}
                    onChange={(e) => setPortfolio(e.target.value)}
                    className="bg-[#090a0d] border border-white/15 rounded-xl text-sm text-white placeholder:text-muted-foreground/40 focus:border-primary/60 focus:ring-1 focus:ring-primary/60 focus-visible:ring-0 focus-visible:ring-offset-0 transition-all duration-200"
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="source" className="text-xs font-semibold text-white/90">
                    How did you hear about this opportunity? <span className="text-primary">*</span>
                  </label>
                  <select
                    id="source"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="w-full bg-[#090a0d] border border-white/15 rounded-xl text-sm text-white px-3 py-2.5 focus:border-primary/60 focus:ring-1 focus:ring-primary/60 focus:outline-none transition-all duration-200 appearance-none cursor-pointer"
                    style={{ colorScheme: "dark" }}
                  >
                    <option value="" disabled className="text-muted-foreground">Select an option</option>
                    <option value="LinkedIn">LinkedIn</option>
                    <option value="Instagram">Instagram</option>
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Friend / Referral">Friend / Referral</option>
                    <option value="College / University">College / University</option>
                    <option value="Google Search">Google Search</option>
                    <option value="Twitter / X">Twitter / X</option>
                    <option value="YouTube">YouTube</option>
                    <option value="Company Website">Company Website</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="flex gap-3 justify-end items-center pt-4 border-t border-white/5">
                  <Button
                    type="button"
                    variant="glass"
                    onClick={handleCloseModal}
                    className="px-5 rounded-lg text-sm border-white/10 hover:bg-secondary/40 text-muted-foreground hover:text-white"
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" variant="hero" className="px-5 rounded-lg text-sm" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Send Application"}
                  </Button>
                </div>
              </form>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};
