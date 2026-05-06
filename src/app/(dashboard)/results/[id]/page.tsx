"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, ArrowLeft, RotateCcw, Target, Award, BrainCircuit } from "lucide-react";
import { useQuizStore } from "@/store/useQuizStore";
import { MOCK_QUIZZES } from "@/lib/quiz/mockData";
import { Button } from "@/components/ui/button";

export default function ResultsPage() {
  const { id } = useParams();
  const router = useRouter();
  const { results, isCompleted, answers, resetQuiz } = useQuizStore();

  const quiz = MOCK_QUIZZES.find(q => q.id === id);

  // Redirect if accessed directly without completion
  useEffect(() => {
    if (!quiz || !isCompleted) {
      router.replace("/dashboard/practice");
    }
  }, [quiz, isCompleted, router]);

  if (!quiz || !isCompleted) return <div className="p-8 text-center">Loading results...</div>;

  const totalPoints = quiz.totalPoints;
  const earnedPoints = Object.values(results).reduce((sum, res) => sum + res.score, 0);
  const percentage = Math.round((earnedPoints / totalPoints) * 100);
  
  const correctCount = Object.values(results).filter(r => r.isCorrect).length;

  const handleRetake = () => {
    resetQuiz();
    router.push(`/dashboard/exams/${quiz.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.push("/dashboard/practice")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Exam Results</h1>
          <p className="text-muted-foreground">{quiz.title}</p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-6 rounded-3xl bg-gradient-to-br from-violet-600 to-cyan-600 text-white shadow-xl shadow-violet-500/20 flex flex-col items-center justify-center text-center relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
          <div className="relative z-10">
            <h3 className="text-lg font-medium text-white/80 mb-2">Total Score</h3>
            <div className="text-5xl font-black mb-2">{percentage}%</div>
            <p className="text-sm font-medium text-white/90">{earnedPoints} / {totalPoints} Points</p>
          </div>
        </motion.div>

        <div className="md:col-span-2 grid grid-cols-2 gap-4">
          <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="font-medium text-muted-foreground">Accuracy</h3>
            </div>
            <div className="text-3xl font-bold">{correctCount} <span className="text-lg text-muted-foreground font-medium">/ {quiz.questions.length} Correct</span></div>
          </div>
          
          <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="font-medium text-muted-foreground">Mastery Level</h3>
            </div>
            <div className="text-3xl font-bold">{percentage >= 80 ? "Expert" : percentage >= 50 ? "Proficient" : "Novice"}</div>
          </div>
          
          <div className="col-span-2 p-6 rounded-2xl bg-violet-500/5 border border-violet-500/20 shadow-sm flex items-start gap-4">
            <div className="p-2 bg-violet-500/20 text-violet-600 dark:text-violet-400 rounded-lg shrink-0 mt-1">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold text-violet-700 dark:text-violet-300 mb-1">AI Insight</h3>
              <p className="text-sm text-violet-600 dark:text-violet-400 leading-relaxed">
                {percentage >= 80 
                  ? "Outstanding performance! You have a strong grasp of these concepts. Ready to move to advanced topics."
                  : "Good effort. You missed a few key conceptual points. Review the explanations below, particularly on the topics you got wrong."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Review */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold">Detailed Review</h2>
          <Button onClick={handleRetake} variant="outline" className="gap-2">
            <RotateCcw className="h-4 w-4" /> Retake Exam
          </Button>
        </div>

        <div className="space-y-6">
          {quiz.questions.map((q, i) => {
            const res = results[q.id];
            const ans = answers[q.id];
            
            return (
              <div key={q.id} className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1">
                      {res?.isCorrect ? (
                        <CheckCircle2 className="h-6 w-6 text-emerald-500" />
                      ) : (
                        <XCircle className="h-6 w-6 text-rose-500" />
                      )}
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 block">Question {i + 1} • {q.topic}</span>
                      <h3 className="font-medium text-lg leading-snug">{q.text}</h3>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-lg font-bold">{res?.score || 0}</span>
                    <span className="text-sm text-muted-foreground"> / {q.points}</span>
                  </div>
                </div>

                <div className="ml-9 space-y-4">
                  <div className="p-4 rounded-xl bg-muted/50 border border-border/50">
                    <span className="text-xs font-semibold text-muted-foreground uppercase block mb-2">Your Answer</span>
                    <p className="text-sm font-medium">
                      {Array.isArray(ans) ? ans.join(", ") : (ans || <span className="italic text-muted-foreground">No answer provided</span>)}
                    </p>
                    {res?.feedback && (
                      <p className={`text-sm mt-3 pt-3 border-t border-border/50 ${res.isCorrect ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}>
                        {res.feedback}
                      </p>
                    )}
                  </div>
                  
                  {!res?.isCorrect && (
                    <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
                      <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase block mb-2">Correct Answer / Target Concepts</span>
                      <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                        {Array.isArray(q.correctAnswers) ? q.correctAnswers.join(" OR ") : q.correctAnswers}
                      </p>
                    </div>
                  )}

                  <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/10">
                    <span className="text-xs font-semibold text-violet-600 dark:text-violet-400 uppercase block mb-2">Explanation</span>
                    <p className="text-sm text-foreground leading-relaxed">{q.explanation}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
