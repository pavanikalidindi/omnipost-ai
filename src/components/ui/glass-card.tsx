import React from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  glow?: boolean
}

export function GlassCard({ children, className, glow = false, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border transition-all duration-300 backdrop-blur-md",
        "bg-white/80 dark:bg-slate-900/80 border-slate-200/80 dark:border-slate-800/80",
        "shadow-sm hover:shadow-md dark:shadow-slate-950/50",
        glow && "before:absolute before:-inset-px before:rounded-2xl before:bg-gradient-to-r before:from-indigo-500/20 before:to-pink-500/20 before:opacity-0 hover:before:opacity-100 before:transition-opacity before:-z-10",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
