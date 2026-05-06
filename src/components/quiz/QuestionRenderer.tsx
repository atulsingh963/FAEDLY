import { Question } from "@/lib/quiz/mockData";
import { useQuizStore } from "@/store/useQuizStore";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

export function QuestionRenderer({ question }: { question: Question }) {
  const { answers, setAnswer } = useQuizStore();
  const currentAnswer = answers[question.id];

  if (question.type === "mcq" || question.type === "true_false") {
    return (
      <RadioGroup 
        value={(currentAnswer as string) || ""} 
        onValueChange={(val) => setAnswer(question.id, val)}
        className="space-y-3 mt-6"
      >
        {question.options?.map((opt, i) => (
          <div key={i} className="flex items-center space-x-3 p-4 rounded-xl border border-border/50 bg-card hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => setAnswer(question.id, opt)}>
            <RadioGroupItem value={opt} id={`opt-${i}`} />
            <Label htmlFor={`opt-${i}`} className="flex-1 cursor-pointer text-base font-medium leading-relaxed">{opt}</Label>
          </div>
        ))}
      </RadioGroup>
    );
  }

  if (question.type === "multi_select") {
    const selectedAnswers = (currentAnswer as string[]) || [];
    
    const toggleOption = (opt: string) => {
      if (selectedAnswers.includes(opt)) {
        setAnswer(question.id, selectedAnswers.filter(a => a !== opt));
      } else {
        setAnswer(question.id, [...selectedAnswers, opt]);
      }
    };

    return (
      <div className="space-y-3 mt-6">
        {question.options?.map((opt, i) => (
          <div key={i} className="flex items-center space-x-3 p-4 rounded-xl border border-border/50 bg-card hover:bg-muted/50 transition-colors cursor-pointer" onClick={() => toggleOption(opt)}>
            <Checkbox 
              id={`chk-${i}`} 
              checked={selectedAnswers.includes(opt)}
              onCheckedChange={() => toggleOption(opt)}
            />
            <Label htmlFor={`chk-${i}`} className="flex-1 cursor-pointer text-base font-medium leading-relaxed">{opt}</Label>
          </div>
        ))}
      </div>
    );
  }

  if (question.type === "short_answer" || question.type === "long_answer") {
    return (
      <div className="mt-6">
        <Textarea 
          placeholder="Type your answer here..."
          value={(currentAnswer as string) || ""}
          onChange={(e) => setAnswer(question.id, e.target.value)}
          className="min-h-[150px] p-4 text-base rounded-xl border-border/50 bg-card focus-visible:ring-violet-500"
        />
        <p className="text-xs text-muted-foreground mt-2">
          Your answer will be evaluated by our AI engine for key concepts.
        </p>
      </div>
    );
  }

  return <div>Unsupported question type.</div>;
}
