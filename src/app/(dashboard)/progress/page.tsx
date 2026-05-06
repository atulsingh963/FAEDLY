"use client";

import { 
  ResponsiveContainer, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  Radar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { TrendingUp, Award, Zap, BookOpen, BrainCircuit } from "lucide-react";
import { StatsCard } from "@/components/dashboard/stats-card";

const performanceData = [
  { subject: "Calculus", score: 85, avg: 70 },
  { subject: "Physics", score: 65, avg: 60 },
  { subject: "Biology", score: 92, avg: 75 },
  { subject: "Chemistry", score: 78, avg: 65 },
  { subject: "CompSci", score: 88, avg: 80 },
];

const timeSeriesData = [
  { date: "Week 1", score: 65 },
  { date: "Week 2", score: 72 },
  { date: "Week 3", score: 68 },
  { date: "Week 4", score: 85 },
  { date: "Week 5", score: 82 },
  { date: "Week 6", score: 90 },
];

const topicDistribution = [
  { name: "Algebra", value: 30 },
  { name: "Derivatives", value: 45 },
  { name: "Integrals", value: 25 },
];

const COLORS = ["hsl(var(--violet-500))", "hsl(var(--cyan-500))", "hsl(var(--amber-500))"];

export default function ProgressAnalyticsPage() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Progress & Analytics</h1>
        <p className="text-muted-foreground">
          Track your learning journey, strengths, and areas for improvement.
        </p>
      </div>

      {/* Gamification & High Level Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard 
          title="Current Level" 
          value="Level 12" 
          icon={<Award className="h-5 w-5 text-amber-500" />} 
          trend="2,450 / 3,000 XP"
          trendUp={true}
        />
        <StatsCard 
          title="Study Streak" 
          value="5 Days" 
          icon={<Zap className="h-5 w-5 text-rose-500" />} 
          trend="Personal best: 14"
          trendUp={true}
        />
        <StatsCard 
          title="Quizzes Mastered" 
          value="18" 
          icon={<BookOpen className="h-5 w-5 text-violet-500" />} 
          trend="+3 this week"
          trendUp={true}
        />
        <StatsCard 
          title="Avg. Accuracy" 
          value="82%" 
          icon={<TrendingUp className="h-5 w-5 text-emerald-500" />} 
          trend="+5% improvement"
          trendUp={true}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Radar Chart: Subject Mastery */}
        <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm flex flex-col">
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Subject Mastery Radar</h3>
            <p className="text-sm text-muted-foreground">Your scores vs global average</p>
          </div>
          <div className="flex-1 min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={performanceData}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: "hsl(var(--foreground))", fontSize: 12 }} />
                <Radar name="You" dataKey="score" stroke="hsl(var(--violet-500))" fill="hsl(var(--violet-500))" fillOpacity={0.5} />
                <Radar name="Average" dataKey="avg" stroke="hsl(var(--muted-foreground))" fill="hsl(var(--muted))" fillOpacity={0.3} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "8px" }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Line Chart: Score Trends */}
        <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm flex flex-col">
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Score Progression</h3>
            <p className="text-sm text-muted-foreground">Overall performance over time</p>
          </div>
          <div className="flex-1 min-h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeriesData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} dy={10} />
                <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }} />
                <Tooltip 
                  contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "8px" }}
                />
                <Line type="monotone" dataKey="score" stroke="hsl(var(--emerald-500))" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Pie Chart: Topic Focus */}
        <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm flex flex-col">
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Study Focus (Mathematics)</h3>
            <p className="text-sm text-muted-foreground">Time distribution by topic</p>
          </div>
          <div className="flex-1 min-h-[300px] flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topicDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {topicDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "8px" }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <span className="text-3xl font-bold">12h</span>
              <span className="text-xs text-muted-foreground">Total</span>
            </div>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {topicDistribution.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="text-sm font-medium">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Insights Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-600 text-white shadow-lg flex flex-col relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
            <BrainCircuit className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-white/20 rounded-xl">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-xl font-bold">AI Learning Insights</h3>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10">
                <h4 className="font-semibold text-white mb-1">Strongest Subject: Biology</h4>
                <p className="text-sm text-white/80">Your accuracy in Biology is in the top 10% of students. Keep it up!</p>
              </div>
              <div className="p-4 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10">
                <h4 className="font-semibold text-white mb-1">Area of Focus: Physics (Kinematics)</h4>
                <p className="text-sm text-white/80">You&apos;ve missed 4 out of 5 questions involving projectile motion. We recommend reviewing the formula derivations.</p>
              </div>
            </div>
            
            <button className="mt-6 px-4 py-2 bg-white text-violet-600 font-semibold rounded-xl text-sm hover:bg-white/90 transition-colors w-full">
              Generate Personalized Study Plan
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
