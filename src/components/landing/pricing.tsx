"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    description: "Perfect for casual learners.",
    priceMonthly: "0",
    priceYearly: "0",
    features: [
      "Access to basic courses",
      "5 AI conversations per day",
      "Standard practice quizzes",
      "Community support",
    ],
    popular: false,
    buttonText: "Get Started",
    buttonVariant: "outline" as const,
  },
  {
    name: "Pro",
    description: "For dedicated students aiming high.",
    priceMonthly: "19",
    priceYearly: "15",
    features: [
      "Everything in Free",
      "Unlimited AI conversations",
      "Advanced analytics & insights",
      "Custom study paths",
      "Priority email support",
    ],
    popular: true,
    buttonText: "Start 7-Day Trial",
    buttonVariant: "default" as const,
  },
  {
    name: "Ultimate",
    description: "Maximum power for power learners.",
    priceMonthly: "39",
    priceYearly: "29",
    features: [
      "Everything in Pro",
      "1-on-1 expert human tutoring (1h/mo)",
      "Essay & Code grading AI",
      "Downloadable study materials",
      "24/7 dedicated support",
    ],
    popular: false,
    buttonText: "Upgrade to Ultimate",
    buttonVariant: "outline" as const,
  },
];

export function PricingSection() {
  const [isYearly, setIsYearly] = useState(true);

  return (
    <Section id="pricing">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Simple, transparent pricing
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Invest in your future. Choose the plan that fits your learning goals.
          </p>

          <div className="inline-flex items-center rounded-full border border-border p-1 bg-muted/50">
            <button
              onClick={() => setIsYearly(false)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                !isYearly ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition-all",
                isYearly ? "bg-background shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              Yearly <span className="ml-1 text-xs text-emerald-500 font-bold">-20%</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "relative rounded-3xl border p-8 flex flex-col bg-card",
                plan.popular ? "border-violet-500 shadow-xl shadow-violet-500/10 md:-translate-y-4" : "border-border/50 shadow-sm"
              )}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-gradient-to-r from-violet-500 to-cyan-500 text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-5xl font-extrabold tracking-tight">
                  ${isYearly ? plan.priceYearly : plan.priceMonthly}
                </span>
                {plan.priceMonthly !== "0" && (
                  <span className="text-muted-foreground ml-2">/ month</span>
                )}
              </div>

              <div className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm">
                    <Check className="h-5 w-5 text-violet-500 shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              <Button
                variant={plan.buttonVariant}
                size="lg"
                className={cn(
                  "w-full rounded-full",
                  plan.popular && "bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 text-white border-0"
                )}
              >
                {plan.buttonText}
              </Button>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
