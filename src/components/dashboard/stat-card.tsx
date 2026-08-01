import React from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { TrendingUp, TrendingDown } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  change: string
  isPositive?: boolean
  icon: React.ElementType
  description: string
}

export function StatCard({ title, value, change, isPositive = true, icon: Icon, description }: StatCardProps) {
  return (
    <GlassCard className="p-5 overflow-hidden group hover:border-indigo-500/40 transition-colors">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">{title}</span>
        <div className="h-9 w-9 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
          <Icon className="h-4 w-4" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">{value}</span>
        <span
          className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full ${
            isPositive
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/80 dark:text-emerald-400"
              : "bg-rose-100 text-rose-700 dark:bg-rose-950/80 dark:text-rose-400"
          }`}
        >
          {isPositive ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
          {change}
        </span>
      </div>

      <p className="mt-2 text-[11px] text-slate-500 dark:text-slate-400 font-medium">{description}</p>
    </GlassCard>
  )
}
