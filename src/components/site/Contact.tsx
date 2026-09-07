"use client";
import { useState } from "react";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, Phone, MapPin, MessageCircle, Send } from "lucide-react";
import { SITE } from "@/data/site";

const schema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(20).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a bit more").max(1000),
});

type Props = { compact?: boolean; presetService?: string };

export const Contact = ({ compact = false, presetService }: Props) => {
  const [loading, setLoading] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const parsed = schema.safeParse({
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      message: fd.get("message"),
    });
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }

    setLoading(true);

    const { name, email, phone, message } = parsed.data;
    const text =
      `*New Contact Message - Silver Wolf Technologies*\n\n` +
      `*Name:* ${name}\n` +
      `*Email:* ${email}\n` +
      (phone ? `*Phone:* ${phone}\n` : "") +
      (presetService ? `*Service:* ${presetService}\n` : "") +
      `*Message:* ${message}`;

    const whatsappUrl = `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text)}`;

    toast.success("Opening WhatsApp to send your message...");
    window.open(whatsappUrl, "_blank");
    form.reset();
    setLoading(false);
  };

  return (
    <section id="contact" className={`${compact ? "py-16" : "py-24 md:py-32"} relative`}>
      <div className="container">
        <div className="grid lg:grid-cols-5 gap-10 items-start">
          <div className="lg:col-span-2 animate-fade-up">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Get in Touch</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
              Let's build something <span className="text-gradient">extraordinary.</span>
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Tell us about your project and our senior team will respond within 24 hours with strategy, timeline and a transparent quote.
            </p>
            <div className="space-y-4">
              <a href={`tel:${SITE.phoneRaw}`} className="flex items-center gap-4 glass rounded-xl p-4 hover:border-primary/40 transition-colors">
                <Phone className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-xs text-muted-foreground">Strategic Support</div>
                  <div className="font-medium">{SITE.phone}</div>
                </div>
              </a>
              <a href={`mailto:${SITE.email}`} className="flex items-center gap-4 glass rounded-xl p-4 hover:border-primary/40 transition-colors">
                <Mail className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-xs text-muted-foreground">Direct Email</div>
                  <div className="font-medium break-all">{SITE.email}</div>
                </div>
              </a>
              <a href={`https://wa.me/${SITE.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-4 glass rounded-xl p-4 hover:border-primary/40 transition-colors">
                <MessageCircle className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-xs text-muted-foreground">WhatsApp</div>
                  <div className="font-medium">Chat with our team instantly</div>
                </div>
              </a>
              <div className="flex items-center gap-4 glass rounded-xl p-4">
                <MapPin className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-xs text-muted-foreground">Global Presence</div>
                  <div className="font-medium">{SITE.presence}</div>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={onSubmit} className="lg:col-span-3 glass rounded-2xl p-8 space-y-5 animate-fade-up">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Your full name" className="mt-1.5 bg-secondary/50 border-border" maxLength={100} required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="you@company.com" className="mt-1.5 bg-secondary/50 border-border" maxLength={255} required />
              </div>
            </div>
            <div>
              <Label htmlFor="phone">Phone (optional)</Label>
              <Input id="phone" name="phone" type="tel" placeholder="+91 ..." className="mt-1.5 bg-secondary/50 border-border" maxLength={20} />
            </div>
            <div>
              <Label htmlFor="message">Tell us about your project</Label>
              <Textarea
                id="message"
                name="message"
                defaultValue={presetService ? `I'm interested in ${presetService}. ` : ""}
                placeholder="What are you trying to build or grow?"
                rows={5}
                className="mt-1.5 bg-secondary/50 border-border resize-none"
                maxLength={1000}
                required
              />
            </div>
            <Button type="submit" variant="hero" size="lg" disabled={loading} className="w-full">
              {loading ? "Sending..." : <>Send Inquiry <Send /></>}
            </Button>
            <p className="text-xs text-muted-foreground text-center">We respond within 24 hours · Your info is never shared.</p>
          </form>
        </div>
      </div>
    </section>
  );
};
