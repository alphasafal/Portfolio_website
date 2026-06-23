"use client";

import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { spring } from "@/lib/motion";
import { SITE, CAL_LINK } from "@/lib/constants";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { TechBackground } from "@/components/motion/tech-background";
import { SectionHeader } from "@/components/ui/section-header";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GithubIcon, LinkedinIcon } from "@/components/ui/icons";
import { Calendar, Mail } from "lucide-react";

export function Contact() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          _gotcha: data.get("_gotcha"),
        }),
      });
      setStatus(res.ok ? "success" : "error");
      if (res.ok) form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="relative section bg-bg overflow-hidden">
      <TechBackground variant="mesh" lava="subtle" opacity={0.35} />
      <div className="relative z-10 max-site max-w-xl mx-auto">
        <ScrollReveal>
          <SectionHeader label="Contact" title="Let's Build Something Exceptional" />
          <p className="text-center text-sm text-muted mt-2 max-w-md mx-auto">{SITE.oneLiner}</p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            <Button variant="outline" asChild>
              <a href={SITE.social.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedinIcon className="h-4 w-4" />
                LinkedIn
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={SITE.social.github} target="_blank" rel="noopener noreferrer">
                <GithubIcon className="h-4 w-4" />
                GitHub
              </a>
            </Button>
            <Button variant="outline" asChild>
              <a href={`mailto:${SITE.email}`}>
                <Mail className="h-4 w-4" />
                Email
              </a>
            </Button>
            {CAL_LINK && (
              <Button variant="outline" asChild>
                <a href={CAL_LINK} target="_blank" rel="noopener noreferrer">
                  <Calendar className="h-4 w-4" />
                  Book a call
                </a>
              </Button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 space-y-4">
            <input
              type="text"
              name="_gotcha"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden
            />
            <Input name="name" placeholder="Name" required />
            <Input name="email" type="email" placeholder="Email" required />
            <Textarea name="message" placeholder="Tell me about your project..." required />
            <MagneticButton className="w-full">
              <Button type="submit" className="w-full" disabled={status === "loading"}>
                {status === "loading" ? "Sending..." : "Send message"}
              </Button>
            </MagneticButton>

            <AnimatePresence>
              {status === "success" && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={spring}
                  className="text-sm text-accent text-center"
                >
                  Message sent. Talk soon.
                </motion.p>
              )}
              {status === "error" && (
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={spring}
                  className="text-sm text-red-400 text-center"
                >
                  Something went wrong. Email me at {SITE.email}
                </motion.p>
              )}
            </AnimatePresence>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
