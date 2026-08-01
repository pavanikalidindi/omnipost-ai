"use client"

import React from "react"
import { AnalyticsDashboard } from "@/components/analytics/charts"

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Performance & Telemetry Analytics</h1>
        <p className="text-xs text-slate-500">Track follower growth, CTR metrics, best performing posts, and export client PDF reports.</p>
      </div>

      <AnalyticsDashboard />
    </div>
  )
}
