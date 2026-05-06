"use client";

import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What makes FAEDLY different from regular online courses?",
    answer: "FAEDLY isn't a static course. It's an adaptive AI tutor that learns how you learn. It adjusts explanations, pacing, and practice questions in real-time based on your specific strengths and weaknesses.",
  },
  {
    question: "Can I use FAEDLY for any subject?",
    answer: "Yes! While we excel in STEM subjects (Math, Physics, Computer Science), our AI is trained on a vast corpus of educational material and can assist with history, literature, languages, and more.",
  },
  {
    question: "How accurate is the AI tutor?",
    answer: "Our underlying models are specifically fine-tuned on educational content and use retrieval-augmented generation (RAG) referencing verified textbooks to ensure high accuracy. However, like any tool, it's best used alongside your official curriculum.",
  },
  {
    question: "Is there a limit to how many questions I can ask?",
    answer: "Free users have a daily limit on AI conversations to ensure system stability. Pro and Ultimate users enjoy unlimited AI interactions and practice quiz generations.",
  },
  {
    question: "Can I cancel my subscription at any time?",
    answer: "Absolutely. You can cancel your subscription from your account settings at any time. You'll retain access to your plan's features until the end of your current billing cycle.",
  },
];

export function FAQSection() {
  return (
    <Section id="faq">
      <Container className="max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Got questions? We&apos;ve got answers.
          </p>
        </div>

        <Accordion className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-border/50 py-2">
              <AccordionTrigger className="text-left text-lg font-medium hover:no-underline hover:text-violet-500 transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Container>
    </Section>
  );
}
