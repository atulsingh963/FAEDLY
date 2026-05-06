"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

const testimonials = [
  {
    quote: "FAEDLY completely changed how I study. The AI tutor explained calculus concepts that my professor couldn't make me understand. I went from a C to an A in one semester.",
    author: "Sarah J.",
    role: "Computer Science Student",
    initials: "SJ",
    color: "bg-violet-500",
  },
  {
    quote: "The smart practice feature is mind-blowing. It noticed I was struggling with organic chemistry reactions and automatically generated targeted quizzes until I mastered them.",
    author: "Michael T.",
    role: "Pre-Med Student",
    initials: "MT",
    color: "bg-cyan-500",
  },
  {
    quote: "As someone who gets anxious asking questions in class, having a judgment-free AI tutor available 24/7 is incredible. It's like having a genius best friend.",
    author: "Elena R.",
    role: "High School Senior",
    initials: "ER",
    color: "bg-emerald-500",
  },
];

export function TestimonialsSection() {
  return (
    <Section id="testimonials" className="bg-muted/30">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Loved by students worldwide
          </h2>
          <p className="text-lg text-muted-foreground">
            Don&apos;t just take our word for it. Here is what our community has to say about their learning experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-3xl bg-card border border-border/50 shadow-sm flex flex-col h-full"
            >
              <div className="flex items-center gap-1 mb-6 text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-muted-foreground mb-8 flex-1 italic leading-relaxed">&quot;{t.quote}&quot;</p>
              <div className="flex items-center gap-4">
                <div className={`h-12 w-12 rounded-full ${t.color} flex items-center justify-center text-white font-bold text-lg`}>
                  {t.initials}
                </div>
                <div>
                  <div className="font-semibold">{t.author}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
