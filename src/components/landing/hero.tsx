"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import Link from "next/link";

export function HeroSection() {
  return (
    <div className="relative overflow-hidden pt-32 pb-20 lg:pt-48 lg:pb-32">
      {/* Abstract Background Elements */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-violet-500/20 rounded-full blur-3xl opacity-50 dark:opacity-20 pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/20 rounded-full blur-3xl opacity-50 dark:opacity-20 pointer-events-none -z-10" />

      <Container className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 text-sm font-medium text-violet-600 dark:text-violet-300 backdrop-blur-sm">
            <Sparkles className="mr-2 h-4 w-4" />
            <span>Introducing FAEDLY 1.0</span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight max-w-5xl mx-auto mb-8"
        >
          Master Any Subject with Your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-cyan-500">
            Personal AI Tutor
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto max-w-2xl text-xl text-muted-foreground leading-relaxed mb-10"
        >
          Experience the future of education. FAEDLY adapts to your learning style, providing personalized quizzes, real-time feedback, and dynamic study paths.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
        >
          <Link href="/signup" className="w-full sm:w-auto">
            <Button size="lg" className="rounded-full px-8 bg-foreground text-background hover:bg-foreground/90 h-14 text-lg w-full transition-transform hover:scale-105">
              Start Learning for Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="#preview" className="w-full sm:w-auto">
            <Button size="lg" variant="outline" className="rounded-full px-8 h-14 text-lg w-full border-border/60 bg-background/50 backdrop-blur-sm hover:bg-muted/50 transition-colors">
              View Dashboard
            </Button>
          </Link>
        </motion.div>

        {/* Trusted By Section (Mock) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-20 pt-10 border-t border-border/40"
        >
          <p className="text-sm font-medium text-muted-foreground mb-6 uppercase tracking-wider">
            Trusted by students from top institutions
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50 grayscale">
            {/* Mock University Logos using text for demo */}
            <span className="text-xl font-bold font-serif">Stanford</span>
            <span className="text-xl font-bold font-serif">MIT</span>
            <span className="text-xl font-bold font-serif">Harvard</span>
            <span className="text-xl font-bold font-serif">Oxford</span>
          </div>
        </motion.div>
      </Container>
    </div>
  );
}
