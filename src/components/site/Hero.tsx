'use client';

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowRight, Sparkles, Send } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import heroBg from "@/assets/hero-bg.jpg";
import { SITE } from "@/data/site";

const enquirySchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  service: z.string().trim().optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a bit more").max(1000),
});

export const Hero = () => {
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const parsed = enquirySchema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      service: fd.get("service"),
      message: fd.get("message"),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }

    setLoading(true);

    const { name, email, phone, service, message } = parsed.data;
    const text =
      `*New Quote Enquiry - Silver Wolf Technologies*\n\n` +
      `*Name:* ${name}\n` +
      `*Email:* ${email}\n` +
      (phone ? `*Phone:* ${phone}\n` : "") +
      (service ? `*Service:* ${service}\n` : "") +
      `*Message:* ${message}`;

    const whatsappUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

    toast.success("Opening WhatsApp to send your quote request...");
    window.open(whatsappUrl, "_blank");
    form.reset();
    setLoading(false);
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img src={heroBg.src} alt="" width={1920} height={1080} className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      </div>
      <div className="absolute inset-0 grid-bg -z-10" />

      <div className="container relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left side — Heading & Info */}
          <div className="animate-fade-up text-left">
            <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 mb-8">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">10+ years of experience · Trusted by brands worldwide</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.05] mb-6">
              Top <span className="text-gradient">Digital & Development</span><br />
              Agency in <span className="text-gradient-primary">India</span>
            </h1>
            <p className="text-base md:text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed">
              We build high-performance websites, mobile apps, CRMs and growth-driven marketing campaigns
              for startups, SMBs and global enterprises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button asChild variant="hero" size="xl">
                <Link href="/contact">Get Free Consultation <ArrowRight /></Link>
              </Button>
              <Button asChild variant="glass" size="xl">
                <Link href="/portfolio">View Our Work</Link>
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-lg">
              {[
                ["10+", "Years Experience"],
                ["15+", "Service Verticals"],
                ["20+", "Cities Served"],
                ["24h", "Response Time"],
              ].map(([n, l]) => (
                <div key={l} className="text-center sm:text-left">
                  <div className="text-2xl md:text-3xl font-bold text-gradient">{n}</div>
                  <div className="text-xs text-muted-foreground mt-1">{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side — Enquiry Form */}
          <div className="animate-fade-up" style={{ animationDelay: "0.15s" }}>
            <form onSubmit={onSubmit} className="glass rounded-2xl p-6 md:p-8 space-y-4 relative overflow-hidden">
              {/* Decorative glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative">
                <div className="flex items-center gap-2 mb-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Quick Enquiry</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold mb-1">Get a Free Quote</h3>
                <p className="text-xs text-muted-foreground mb-4">Fill in the details below and our team will respond within 24 hours.</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 relative">
                <div>
                  <Label htmlFor="hero-name" className="text-xs">Full Name</Label>
                  <Input id="hero-name" name="name" placeholder="Your name" className="mt-1 bg-secondary/50 border-border h-9 text-sm" maxLength={100} required />
                </div>
                <div>
                  <Label htmlFor="hero-email" className="text-xs">Email</Label>
                  <Input id="hero-email" name="email" type="email" placeholder="you@company.com" className="mt-1 bg-secondary/50 border-border h-9 text-sm" maxLength={255} required />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4 relative">
                <div>
                  <Label htmlFor="hero-phone" className="text-xs">Phone</Label>
                  <Input id="hero-phone" name="phone" type="tel" placeholder="+91 ..." className="mt-1 bg-secondary/50 border-border h-9 text-sm" maxLength={20} />
                </div>
                <div>
                  <Label htmlFor="hero-service" className="text-xs">Service Needed</Label>
                  <select
                    id="hero-service"
                    name="service"
                    className="mt-1 w-full h-9 rounded-md border border-border bg-secondary/50 px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select a service</option>
                    <option value="Website Development">Website Development</option>
                    <option value="E-commerce Development">E-commerce Development</option>
                    <option value="Mobile App Development">Mobile App Development</option>
                    <option value="CRM Development">CRM Development</option>
                    <option value="SaaS & Web Apps">SaaS & Web Apps</option>
                    <option value="SEO Services">SEO Services</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Social Media Marketing">Social Media Marketing</option>
                    <option value="Video Editing">Video Editing</option>
                    <option value="Photo Editing">Photo Editing</option>
                    <option value="Graphic Design">Graphic Design</option>
                    <option value="UI/UX Design">UI/UX Design</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="relative">
                <Label htmlFor="hero-message" className="text-xs">Project Details</Label>
                <Textarea
                  id="hero-message"
                  name="message"
                  placeholder="Tell us about your project..."
                  rows={3}
                  className="mt-1 bg-secondary/50 border-border resize-none text-sm"
                  maxLength={1000}
                  required
                />
              </div>

              <Button type="submit" variant="hero" size="lg" disabled={loading} className="w-full relative">
                {loading ? "Sending..." : <>Send Enquiry <Send className="h-4 w-4" /></>}
              </Button>
              <p className="text-[10px] text-muted-foreground text-center">We respond within 24 hours · Your info is never shared.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
