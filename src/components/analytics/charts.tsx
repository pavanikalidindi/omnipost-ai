"use client"

import React, { useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, TrendingUp, Users, Eye, MousePointer, Share2, Award, FileSpreadsheet, FileText } from "lucide-react"

export function AnalyticsDashboard() {
  const [exported, setExported] = useState<string | null>(null)

  const handleExport = (type: "CSV" | "PDF") => {
    setExported(`Exporting ${type} report...`)
    setTimeout(() => {
      setExported(`Report exported as OmniPost_Analytics_${type}_${Date.now()}.${type.toLowerCase()}`)
      setTimeout(() => setExported(null), 3000)
    }, 1200)
  }

  const topPosts = [
    { title: "OmniPost AI Launch Announcement", platform: "INSTAGRAM", engagement: "14.8%", reach: "45,200", likes: 1420 },
    { title: "5 Tactics for B2B Growth", platform: "LINKEDIN", engagement: "11.2%", reach: "28,400", likes: 890 },
    { title: "Next-gen AI Content Engine", platform: "TWITTER", engagement: "9.4%", reach: "18,900", likes: 640 },
  ]

  return (
    <div className="space-y-6">
      {/* Export Header */}
      <GlassCard className="p-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-extrabold text-sm text-slate-900 dark:text-white">Multi-Channel Analytics & Performance Reports</h2>
          <p className="text-xs text-slate-500">Real-time engagement telemetry across 10 connected social networks</p>
        </div>

        <div className="flex items-center gap-2">
          {exported && (
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 animate-pulse">
              {exported}
            </span>
          )}
          <Button variant="outline" size="sm" onClick={() => handleExport("CSV")}>
            <FileSpreadsheet className="h-3.5 w-3.5 text-emerald-500" />
            Export CSV
          </Button>
          <Button variant="gradient" size="sm" onClick={() => handleExport("PDF")}>
            <FileText className="h-3.5 w-3.5" />
            Export PDF Report
          </Button>
        </div>
      </GlassCard>

      {/* Main Bar / Metric Chart Visual Representation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Weekly Reach & Impressions Trend</h3>
            <div className="flex items-center gap-2 text-xs font-semibold">
              <span className="flex items-center gap-1 text-indigo-500">● Impressions</span>
              <span className="flex items-center gap-1 text-pink-500">● Clicks</span>
            </div>
          </div>

          <div className="h-64 flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-slate-200 dark:border-slate-800">
            {[
              { day: "Mon", impressions: 42, clicks: 18 },
              { day: "Tue", impressions: 65, clicks: 28 },
              { day: "Wed", impressions: 88, clicks: 39 },
              { day: "Thu", impressions: 72, clicks: 31 },
              { day: "Fri", impressions: 95, clicks: 45 },
              { day: "Sat", impressions: 100, clicks: 52 },
              { day: "Sun", impressions: 84, clicks: 38 },
            ].map((bar) => (
              <div key={bar.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                <div className="w-full max-w-[32px] bg-slate-100 dark:bg-slate-900 rounded-t-xl h-full flex flex-col justify-end overflow-hidden">
                  <div
                    style={{ height: `${bar.impressions}%` }}
                    className="w-full bg-gradient-to-t from-indigo-600 to-indigo-400 group-hover:brightness-110 transition-all rounded-t-xl"
                  />
                </div>
                <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">{bar.day}</span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Top Performing Posts */}
        <GlassCard className="p-6 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Award className="h-4 w-4 text-amber-500" />
            Best Performing Content
          </h3>

          <div className="space-y-3">
            {topPosts.map((post, i) => (
              <div key={i} className="p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/50 dark:bg-slate-950/50 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900 dark:text-slate-100 truncate">{post.title}</span>
                  <Badge variant="purple">{post.platform}</Badge>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono">
                  <span>Reach: {post.reach}</span>
                  <span className="text-emerald-500 font-bold">{post.engagement} ER</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
