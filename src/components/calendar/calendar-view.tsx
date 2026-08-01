"use client"

import React, { useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock } from "lucide-react"

export function CalendarView() {
  const [currentMonth] = useState("July 2026")
  const [viewMode, setViewMode] = useState<"month" | "week" | "day">("month")

  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1)
  const scheduledEvents: Record<number, any[]> = {
    4: [{ time: "10:00 AM", title: "Product Teaser Reel", platform: "INSTAGRAM", color: "bg-pink-500" }],
    12: [{ time: "02:30 PM", title: "LinkedIn B2B Article", platform: "LINKEDIN", color: "bg-sky-600" }],
    18: [{ time: "05:00 PM", title: "Twitter Thread #1", platform: "TWITTER", color: "bg-slate-900" }],
    26: [{ time: "11:00 AM", title: "OmniPost AI Launch", platform: "INSTAGRAM", color: "bg-indigo-600" }],
    28: [{ time: "04:30 PM", title: "Weekly Growth Hacks", platform: "LINKEDIN", color: "bg-sky-600" }],
    30: [{ time: "06:00 PM", title: "Product Demo Video", platform: "YOUTUBE", color: "bg-red-600" }],
  }

  return (
    <GlassCard className="p-6 space-y-6">
      {/* Calendar Header Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-indigo-500" />
            {currentMonth}
          </h2>
          <div className="flex items-center border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-900">
            <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-2">
          <div className="flex bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800">
            {(["month", "week", "day"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={`px-3 py-1 text-xs font-bold rounded-lg capitalize transition-all ${
                  viewMode === mode
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>

          <button
            onClick={() => (window.location.href = "/create")}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 shadow-sm"
          >
            <Plus className="h-4 w-4" />
            Schedule Post
          </button>
        </div>
      </div>

      {/* Days Header */}
      <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold uppercase tracking-wider text-slate-400">
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
        <div>Sun</div>
      </div>

      {/* Calendar Grid Matrix */}
      <div className="grid grid-cols-7 gap-2">
        {daysInMonth.map((day) => {
          const events = scheduledEvents[day] || []
          const isToday = day === 26
          return (
            <div
              key={day}
              className={`min-h-[100px] p-2 rounded-2xl border transition-all hover:border-indigo-500/50 flex flex-col justify-between ${
                isToday
                  ? "bg-indigo-50/70 dark:bg-indigo-950/40 border-indigo-500/50"
                  : "bg-white/50 dark:bg-slate-950/50 border-slate-200/60 dark:border-slate-800/60"
              }`}
            >
              <div className="flex items-center justify-between text-xs mb-1">
                <span
                  className={`h-6 w-6 rounded-full flex items-center justify-center font-bold ${
                    isToday ? "bg-indigo-600 text-white" : "text-slate-700 dark:text-slate-300"
                  }`}
                >
                  {day}
                </span>
                {events.length > 0 && (
                  <span className="text-[10px] text-slate-400 font-mono">{events.length} post</span>
                )}
              </div>

              <div className="space-y-1 flex-1">
                {events.map((ev, idx) => (
                  <div
                    key={idx}
                    className={`p-1.5 rounded-xl ${ev.color} text-white text-[10px] font-semibold truncate shadow-xs cursor-pointer hover:scale-102 transition-transform`}
                    title={`${ev.time} - ${ev.title}`}
                  >
                    <div className="flex items-center gap-1 font-mono text-[9px] opacity-90">
                      <Clock className="h-2.5 w-2.5" />
                      {ev.time}
                    </div>
                    <div className="truncate">{ev.title}</div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </GlassCard>
  )
}
