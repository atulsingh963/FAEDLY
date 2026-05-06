"use client";

import { motion } from "framer-motion";
import { BrainCircuit, BookOpen, Sparkles, Target, LineChart, MessageSquare } from "lucide-react";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";

const features = [
  {
    icon: <BrainCircuit className="h-10 w-10 text-violet-500" />,
    title: "Adaptive Learning",
    description: "Our AI engine analyzes your performance and tailors every lesson to your exact needs, closing knowledge gaps instantly.",
    color: "from-violet-500/10 to-transparent",
  },
  {
    icon: <BookOpen className="h-10 w-10 text-cyan-500" />,
    title: "Smart Practice",
    description: "Generate infinite practice questions and mock exams. Get instant, detailed explanations for every mistake.",
    color: "from-cyan-500/10 to-transparent",
  },
  {
    icon: <MessageSquare className="h-10 w-10 text-indigo-500" />,
    title: "AI Conversations",
    description: "Stuck on a concept? Chat directly with your AI tutor to break down complex topics into simple, digestible pieces.",
    color: "from-indigo-500/10 to-transparent",
  },
  {
    icon: <Target className="h-10 w-10 text-rose-500" />,
    title: "Dynamic Study Paths",
    description: "Set your goals and let the AI generate a structured, day-by-day roadmap optimized for retention and speed.",
    color: "from-rose-500/10 to-transparent",
  },
  {
    icon: <LineChart className="h-10 w-10 text-emerald-500" />,
    title: "Advanced Analytics",
    description: "Track your mastery level across all subjects. Identify weak points before they become a problem on test day.",
    color: "from-emerald-500/10 to-transparent",
  },
  {
    icon: <Sparkles className="h-10 w-10 text-amber-500" />,
    title: "Instant Feedback",
    description: "Submit essays, math problems, or code snippets and receive immediate, actionable feedback graded by AI.",
    color: "from-amber-500/10 to-transparent",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function FeaturesSection() {
  return (
    <Section id="features" className="bg-muted/30">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-500 to-cyan-500">excel</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            FAEDLY combines cutting-edge AI with proven learning methodologies to help you study smarter, not harder.
          </p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-8 rounded-3xl bg-card border border-border/50 shadow-sm hover:shadow-md transition-all relative overflow-hidden group hover:-translate-y-1"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="relative z-10">
                <div className="mb-6 inline-block rounded-2xl bg-background p-3 shadow-sm border border-border/50">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </Section>
  );
}
