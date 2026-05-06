"use client";

import { 
  Clock, 
  Target, 
  Award,
  FileText,
  MessageSquare,
  BookOpen
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

import { useAuthStore } from "@/store/useAuthStore";
import { StatsCard } from "@/components/dashboard/stats-card";

// Mock Data
const weeklyActivity = [
  { name: "Mon", hours: 2.5 },
  { name: "Tue", hours: 3.8 },
  { name: "Wed", hours: 1.5 },
  { name: "Thu", hours: 4.2 },
  { name: "Fri", hours: 2.0 },
  { name: "Sat", hours: 5.5 },
  { name: "Sun", hours: 4.0 },
];

const subjectProgress = [
  { subject: "Calculus", score: 85 },
  { subject: "Physics", score: 72 },
  { subject: "Chemistry", score: 90 },
  { subject: "History", score: 65 },
];

const recentTasks = [
  { id: 1, title: "Derivatives Practice", type: "Quiz", status: "Completed", score: "92%" },
  { id: 2, title: "Kinematics Review", type: "AI Tutor", status: "In Progress", score: "-" },
  { id: 3, title: "Organic Chem Basics", type: "Notes", status: "Completed", score: "-" },
];

export default function DashboardOverview() {
  const { user } = useAuthStore();
  const firstName = user?.displayName?.split(" ")[0] || "Student";

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">
            Welcome back, {firstName}!
          </h1>
          <p className="text-muted-foreground">
            You&apos;re on a 5-day study streak. Keep it up!
          </p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 px-4 py-2 rounded-xl font-medium text-sm">
            🔥 5 Day Streak
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        <StatsCard 
          title="Total Study Hours" 
          value="42.5h" 
          icon={<Clock className="h-5 w-5 text-cyan-500" />} 
          trend="+12% from last week"
          trendUp={true}
        />
        <StatsCard 
          title="Average Score" 
          value="88%" 
          icon={<Target className="h-5 w-5 text-violet-500" />} 
          trend="+4% from last week"
          trendUp={true}
        />
        <StatsCard 
          title="Quizzes Taken" 
          value="24" 
          icon={<FileText className="h-5 w-5 text-indigo-500" />} 
        />
        <StatsCard 
          title="Mastery Level" 
          value="Advanced" 
          icon={<Award className="h-5 w-5 text-emerald-500" />} 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Activity Line Chart */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-card border border-border/50 shadow-sm flex flex-col">
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Weekly Activity</h3>
            <p className="text-sm text-muted-foreground">Study hours per day</p>
          </div>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyActivity} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "8px" }}
                  itemStyle={{ color: "hsl(var(--foreground))" }}
                />
                <Line 
                  type="monotone" 
                  dataKey="hours" 
                  stroke="hsl(var(--violet-500))" 
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Subject Progress Bar Chart */}
        <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm flex flex-col">
          <div className="mb-6">
            <h3 className="text-lg font-semibold">Subject Mastery</h3>
            <p className="text-sm text-muted-foreground">Overall performance</p>
          </div>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={subjectProgress} layout="vertical" margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="subject" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false} 
                  width={80}
                  tick={{ fill: "hsl(var(--foreground))", fontSize: 12, fontWeight: 500 }}
                />
                <Tooltip 
                  cursor={{ fill: "hsl(var(--muted))" }}
                  contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "8px" }}
                />
                <Bar 
                  dataKey="score" 
                  fill="hsl(var(--cyan-500))" 
                  radius={[0, 4, 4, 0]} 
                  barSize={20}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Recent Activity</h3>
          <button className="text-sm font-medium text-violet-600 dark:text-violet-400 hover:underline">
            View all
          </button>
        </div>
        <div className="space-y-4">
          {recentTasks.map((task) => (
            <div key={task.id} className="flex items-center justify-between p-4 rounded-xl border border-border/40 hover:bg-muted/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400">
                  {task.type === "Quiz" ? <FileText className="h-5 w-5" /> : 
                   task.type === "AI Tutor" ? <MessageSquare className="h-5 w-5" /> : 
                   <BookOpen className="h-5 w-5" />}
                </div>
                <div>
                  <h4 className="font-medium">{task.title}</h4>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <span>{task.type}</span>
                    <span>•</span>
                    <span className={task.status === "Completed" ? "text-emerald-500" : "text-amber-500"}>
                      {task.status}
                    </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">{task.score}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
