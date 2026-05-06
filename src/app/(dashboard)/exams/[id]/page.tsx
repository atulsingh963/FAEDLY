"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, ChevronLeft, ChevronRight, Flag, CheckCircle2, LayoutGrid } from "lucide-react";
import { useQuizStore } from "@/store/useQuizStore";
import { MOCK_QUIZZES } from "@/lib/quiz/mockData";
import { QuestionRenderer } from "@/components/quiz/QuestionRenderer";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function ExamPage() {
  const { id } = useParams();
  const router = useRouter();
  const [showPalette, setShowPalette] = useState(false);
  const [flagged, setFlagged] = useState<Record<number, boolean>>({});

  const { 
    activeQuiz, 
    startQuiz, 
    currentQuestionIndex, 
    nextQuestion, 
    prevQuestion, 
    jumpToQuestion,
    timeRemaining,
    tickTimer,
    submitQuiz,
    isCompleted,
    answers
  } = useQuizStore();

  useEffect(() => {
    const quiz = MOCK_QUIZZES.find(q => q.id === id);
    if (quiz && (!activeQuiz || activeQuiz.id !== id)) {
      startQuiz(quiz);
    }
  }, [id, activeQuiz, startQuiz]);

  useEffect(() => {
    if (activeQuiz && activeQuiz.durationMinutes > 0 && !isCompleted) {
      const timer = setInterval(() => tickTimer(), 1000);
      return () => clearInterval(timer);
    }
  }, [activeQuiz, isCompleted, tickTimer]);

  useEffect(() => {
    if (isCompleted && activeQuiz) {
      router.push(`/dashboard/results/${activeQuiz.id}`);
    }
  }, [isCompleted, activeQuiz, router]);

  if (!activeQuiz) {
    return <div className="p-8 text-center">Loading exam...</div>;
  }

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const currentQuestion = activeQuiz.questions[currentQuestionIndex];
  const progressPercent = ((currentQuestionIndex + 1) / activeQuiz.questions.length) * 100;

  const toggleFlag = () => {
    setFlagged(prev => ({ ...prev, [currentQuestionIndex]: !prev[currentQuestionIndex] }));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] -m-4 sm:-m-6 lg:-m-8 bg-background">
      
      {/* Top Bar */}
      <div className="h-16 border-b border-border/50 bg-card flex items-center justify-between px-4 sm:px-6 flex-shrink-0 z-20">
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={() => router.push("/dashboard/practice")} className="text-muted-foreground">
            Exit
          </Button>
          <div className="hidden sm:block w-px h-6 bg-border" />
          <h1 className="font-semibold text-sm sm:text-base line-clamp-1">{activeQuiz.title}</h1>
        </div>
        
        <div className="flex items-center gap-4">
          {activeQuiz.durationMinutes > 0 && (
            <div className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg font-mono text-sm font-medium border",
              timeRemaining < 300 ? "border-rose-500/50 text-rose-500 bg-rose-500/10" : "border-border/50 bg-muted/50"
            )}>
              <Clock className="h-4 w-4" />
              {formatTime(timeRemaining)}
            </div>
          )}
          <Button onClick={submitQuiz} className="bg-emerald-600 hover:bg-emerald-700 text-white">
            Submit
          </Button>
          <Button variant="outline" size="icon" className="lg:hidden" onClick={() => setShowPalette(!showPalette)}>
            <LayoutGrid className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1 w-full bg-muted flex-shrink-0">
        <div className="h-full bg-violet-600 transition-all duration-300" style={{ width: `${progressPercent}%` }} />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* Question Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-8 lg:p-12">
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentQuestion.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-sm font-semibold text-violet-500 uppercase tracking-wider">
                    Question {currentQuestionIndex + 1} of {activeQuiz.questions.length}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-medium px-2 py-1 bg-muted rounded-md text-muted-foreground">
                      {currentQuestion.points} points
                    </span>
                    <button 
                      onClick={toggleFlag}
                      className={cn(
                        "p-1.5 rounded-md transition-colors",
                        flagged[currentQuestionIndex] ? "text-amber-500 bg-amber-500/10" : "text-muted-foreground hover:bg-muted"
                      )}
                      title="Flag for review"
                    >
                      <Flag className={cn("h-4 w-4", flagged[currentQuestionIndex] && "fill-current")} />
                    </button>
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-medium leading-relaxed">
                  {currentQuestion.text}
                </h2>

                <QuestionRenderer question={currentQuestion} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Question Palette Sidebar (Desktop) */}
        <div className={cn(
          "w-72 border-l border-border/50 bg-muted/10 p-4 overflow-y-auto flex-shrink-0 transition-all lg:block absolute lg:relative inset-y-0 right-0 z-10 bg-background",
          showPalette ? "block shadow-2xl" : "hidden"
        )}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-sm">Question Palette</h3>
            <Button variant="ghost" size="icon" className="lg:hidden h-8 w-8" onClick={() => setShowPalette(false)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-5 gap-2">
            {activeQuiz.questions.map((q, i) => {
              const isAnswered = answers[q.id] !== undefined && answers[q.id] !== "" && answers[q.id].length !== 0;
              const isFlagged = flagged[i];
              const isActive = i === currentQuestionIndex;

              return (
                <button
                  key={q.id}
                  onClick={() => jumpToQuestion(i)}
                  className={cn(
                    "h-10 rounded-lg text-sm font-medium flex items-center justify-center relative transition-all border",
                    isActive ? "ring-2 ring-violet-500 ring-offset-2 ring-offset-background border-transparent" : "border-border/50",
                    isAnswered ? "bg-violet-600 text-white border-transparent" : "bg-card hover:bg-muted text-foreground",
                  )}
                >
                  {i + 1}
                  {isFlagged && (
                    <div className="absolute -top-1 -right-1 h-3 w-3 bg-amber-500 rounded-full border-2 border-background" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-8 space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-violet-600" /> Answered
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded bg-card border border-border/50" /> Not Answered
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-amber-500" /> Flagged
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Navigation */}
      <div className="h-20 border-t border-border/50 bg-card flex items-center justify-between px-4 sm:px-8 flex-shrink-0 z-20">
        <Button 
          variant="outline" 
          onClick={prevQuestion} 
          disabled={currentQuestionIndex === 0}
          className="gap-2"
        >
          <ChevronLeft className="h-4 w-4" /> Previous
        </Button>
        
        {currentQuestionIndex === activeQuiz.questions.length - 1 ? (
          <Button onClick={submitQuiz} className="gap-2 bg-emerald-600 hover:bg-emerald-700 text-white">
            <CheckCircle2 className="h-4 w-4" /> Submit Exam
          </Button>
        ) : (
          <Button onClick={nextQuestion} className="gap-2 bg-violet-600 hover:bg-violet-700 text-white">
            Next <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>

    </div>
  );
}
