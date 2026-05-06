import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string;
  icon: ReactNode;
  trend?: string;
  trendUp?: boolean;
  className?: string;
}

export function StatsCard({ title, value, icon, trend, trendUp, className }: StatsCardProps) {
  return (
    <div className={cn("p-6 rounded-2xl bg-card border border-border/50 shadow-sm", className)}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="p-2 bg-muted/50 rounded-lg text-foreground">
          {icon}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div className="text-3xl font-bold tracking-tight">{value}</div>
        {trend && (
          <div className={cn(
            "text-sm font-medium",
            trendUp ? "text-emerald-500" : "text-rose-500"
          )}>
            {trend}
          </div>
        )}
      </div>
    </div>
  );
}
