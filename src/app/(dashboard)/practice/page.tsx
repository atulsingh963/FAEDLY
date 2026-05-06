"use client";

import { motion } from "framer-motion";
import { BookOpen, Clock, Target, Play, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { MOCK_QUIZZES } from "@/lib/quiz/mockData";
import { Button } from "@/components/ui/button";

export default function PracticePage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Practice & Quizzes</h1>
          <p className="text-muted-foreground">
            Test your knowledge with AI-generated quizzes and structured exams.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-semibold">Recommended for you</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MOCK_QUIZZES.map((quiz, i) => (
              <motion.div
                key={quiz.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm flex flex-col hover:border-violet-500/50 transition-colors group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium px-2 py-1 bg-muted rounded-full text-muted-foreground">
                    {quiz.subject}
                  </span>
                </div>
                
                <h3 className="font-semibold text-lg mb-2 group-hover:text-violet-500 transition-colors">
                  {quiz.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-6 flex-1">
                  {quiz.description}
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {quiz.durationMinutes > 0 ? `${quiz.durationMinutes} min` : "Untimed"}
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="h-3.5 w-3.5" />
                      {quiz.questions.length} Qs
                    </div>
                  </div>
                  
                  <Link href={`/dashboard/exams/${quiz.id}`}>
                    <Button size="sm" className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl">
                      <Play className="h-3.5 w-3.5 mr-1.5" /> Start
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Study Focus</h2>
          <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-full bg-rose-500/10 text-rose-500">
                <ShieldAlert className="h-5 w-5" />
              </div>
              <h3 className="font-medium">Weak Areas</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Our AI detected that you&apos;re struggling with these topics. We recommend focusing your practice here.
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/50">
                <span className="text-sm font-medium">Integration by Parts</span>
                <span className="text-xs text-rose-500 font-medium">45% Mastery</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border/50">
                <span className="text-sm font-medium">Thermodynamics</span>
                <span className="text-xs text-amber-500 font-medium">60% Mastery</span>
              </div>
            </div>
            <Button variant="outline" className="w-full mt-4 rounded-xl">
              Generate Focus Quiz
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
