"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="absolute top-4 right-4 md:top-8 md:right-8 z-50">
        <ThemeToggle />
      </div>

      {/* Left Form Section */}
      <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:px-20 xl:px-24 bg-background">
        <div className="mx-auto w-full max-w-sm lg:w-96 relative z-10 py-12 md:py-0">
          <Link href="/" className="flex items-center space-x-2 mb-8 group inline-flex">
            <div className="bg-gradient-to-br from-violet-500 to-cyan-500 p-1.5 rounded-lg text-white group-hover:scale-105 transition-transform">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70 dark:from-white dark:to-white/70">
              FAEDLY
            </span>
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {children}
          </motion.div>
        </div>
      </div>

      {/* Right Decor Section */}
      <div className="hidden md:flex flex-1 relative bg-muted/30 border-l border-border/50 items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-background to-cyan-500/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-violet-500/20 rounded-full blur-3xl opacity-30 pointer-events-none -z-10" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative z-10 max-w-md p-8 rounded-3xl bg-card border border-border/50 shadow-xl backdrop-blur-sm"
        >
          <div className="mb-6 inline-block rounded-2xl bg-violet-500/10 p-3 text-violet-500">
            <Sparkles className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold mb-4 leading-tight">
            &quot;FAEDLY is the closest thing to having a personal genius sitting right next to you.&quot;
          </h2>
          <div className="flex items-center gap-3 mt-6">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-violet-500 to-cyan-500 flex items-center justify-center text-white font-bold">
              AJ
            </div>
            <div>
              <p className="font-semibold text-sm">Alex Johnson</p>
              <p className="text-xs text-muted-foreground">Computer Science Major</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
