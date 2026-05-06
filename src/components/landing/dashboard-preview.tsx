"use client";

import { motion } from "framer-motion";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { 
  BarChart3, 
  BookOpen, 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  TrendingUp,
  LayoutDashboard,
  Settings,
  Bell,
  ArrowRight
} from "lucide-react";

export function DashboardPreviewSection() {
  return (
    <Section id="preview" className="overflow-hidden">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            A workspace designed for <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-cyan-500">focus</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need is perfectly organized. No clutter, just your progress and the tools to accelerate it.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="relative mx-auto max-w-5xl rounded-2xl border border-border/50 bg-background/50 shadow-2xl backdrop-blur-xl overflow-hidden"
        >
          {/* Mac window controls mockup */}
          <div className="flex items-center gap-2 border-b border-border/40 bg-muted/30 px-4 py-3">
            <div className="h-3 w-3 rounded-full bg-rose-500" />
            <div className="h-3 w-3 rounded-full bg-amber-500" />
            <div className="h-3 w-3 rounded-full bg-emerald-500" />
          </div>

          <div className="flex h-[600px]">
            {/* Sidebar Mockup */}
            <div className="hidden md:flex w-64 flex-col border-r border-border/40 bg-muted/10 p-4">
              <div className="flex items-center space-x-2 px-2 pb-6">
                <div className="h-6 w-6 rounded bg-gradient-to-br from-violet-500 to-cyan-500" />
                <span className="font-semibold text-sm">Dashboard</span>
              </div>
              <nav className="space-y-1">
                {[
                  { icon: <LayoutDashboard className="h-4 w-4" />, label: "Overview", active: true },
                  { icon: <BookOpen className="h-4 w-4" />, label: "Courses" },
                  { icon: <BarChart3 className="h-4 w-4" />, label: "Analytics" },
                  { icon: <MessageSquare className="h-4 w-4" />, label: "AI Tutor" },
                ].map((item, i) => (
                  <div
                    key={i}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
                      item.active
                        ? "bg-violet-500/10 text-violet-600 dark:text-violet-400"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </div>
                ))}
              </nav>
              <div className="mt-auto space-y-1">
                <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">
                  <Bell className="h-4 w-4" /> Notifications
                </div>
                <div className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted">
                  <Settings className="h-4 w-4" /> Settings
                </div>
              </div>
            </div>

            {/* Main Content Mockup */}
            <div className="flex-1 p-6 overflow-hidden bg-background">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-2xl font-bold">Welcome back, Alex</h3>
                  <p className="text-muted-foreground text-sm">You are 85% ready for your upcoming Calculus exam.</p>
                </div>
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-violet-400 to-cyan-400 flex items-center justify-center text-white font-bold">
                  A
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {[
                  { label: "Study Hours", value: "24.5h", trend: "+2.5h", icon: <Clock className="h-4 w-4 text-cyan-500" /> },
                  { label: "Average Score", value: "92%", trend: "+4%", icon: <TrendingUp className="h-4 w-4 text-emerald-500" /> },
                  { label: "Quizzes Taken", value: "18", trend: "+3", icon: <CheckCircle2 className="h-4 w-4 text-violet-500" /> },
                  { label: "AI Interactions", value: "142", trend: "High", icon: <MessageSquare className="h-4 w-4 text-indigo-500" /> },
                ].map((stat, i) => (
                  <div key={i} className="rounded-xl border border-border/50 bg-card p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium text-muted-foreground">{stat.label}</span>
                      {stat.icon}
                    </div>
                    <div className="flex items-end gap-2">
                      <span className="text-2xl font-bold">{stat.value}</span>
                      <span className="text-xs text-emerald-500 mb-1">{stat.trend}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Lower Section */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Graph Area */}
                <div className="lg:col-span-2 rounded-xl border border-border/50 bg-card p-4 shadow-sm flex flex-col">
                  <span className="text-sm font-semibold mb-4">Performance Timeline</span>
                  <div className="flex-1 border-b border-l border-border/50 relative mt-4 ml-4">
                    {/* Fake Chart Lines */}
                    <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                      <path d="M0,80 Q20,60 40,70 T80,40 T100,20" fill="none" stroke="currentColor" className="text-violet-500" strokeWidth="2" />
                      <path d="M0,80 L0,100 L100,100 L100,20 Q80,40 40,70 T0,80" fill="currentColor" className="text-violet-500/10" />
                    </svg>
                  </div>
                  <div className="flex justify-between text-[10px] text-muted-foreground mt-2 ml-4">
                    <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                  </div>
                </div>

                {/* AI Chat Preview */}
                <div className="rounded-xl border border-border/50 bg-card p-4 shadow-sm flex flex-col">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-sm font-semibold">Live AI Tutor</span>
                  </div>
                  <div className="flex-1 space-y-3 overflow-hidden">
                    <div className="bg-muted/50 rounded-lg rounded-tl-none p-3 text-xs">
                      Hello! Ready to review integration by parts?
                    </div>
                    <div className="bg-violet-500 text-white rounded-lg rounded-tr-none p-3 text-xs ml-4">
                      Yes, but I keep messing up the &apos;v&apos; substitution.
                    </div>
                    <div className="bg-muted/50 rounded-lg rounded-tl-none p-3 text-xs">
                      Let&apos;s use the LIATE rule to choose &apos;u&apos;. Do you remember what it stands for?
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2">
                    <div className="flex-1 rounded-full border border-border/50 bg-muted/30 px-3 py-1.5 text-xs text-muted-foreground">
                      Type your answer...
                    </div>
                    <div className="h-6 w-6 rounded-full bg-violet-500 flex items-center justify-center">
                      <ArrowRight className="h-3 w-3 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Overlay Gradient for Fade effect */}
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
        </motion.div>
      </Container>
    </Section>
  );
}
