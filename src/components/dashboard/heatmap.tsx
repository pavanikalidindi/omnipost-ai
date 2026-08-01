import React from "react"
import { GlassCard } from "@/components/ui/glass-card"

export function PublishingHeatmap() {
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const hours = ["6 AM", "9 AM", "12 PM", "3 PM", "6 PM", "9 PM"]

  // Matrix intensity levels (0 = low, 3 = maximum engagement)
  const heatmapData = [
    [1, 3, 2, 3, 2, 0], // Mon
    [2, 3, 3, 2, 3, 1], // Tue
    [3, 3, 2, 3, 3, 1], // Wed
    [2, 2, 3, 3, 2, 0], // Thu
    [1, 3, 3, 2, 3, 2], // Fri
    [0, 1, 2, 2, 1, 1], // Sat
    [0, 1, 1, 2, 1, 0], // Sun
  ]

  const getColorClass = (level: number) => {
    switch (level) {
      case 3:
        return "bg-indigo-600 dark:bg-indigo-500 shadow-sm shadow-indigo-500/50"
      case 2:
        return "bg-indigo-400 dark:bg-indigo-700"
      case 1:
        return "bg-indigo-200 dark:bg-indigo-900/60"
      default:
        return "bg-slate-100 dark:bg-slate-800/50"
    }
  }

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-sm text-slate-900 dark:text-white">AI Recommended Publishing Heatmap</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">Peak audience activity times based on 30-day historical reach</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-semibold">
          <span>Low</span>
          <span className="h-2.5 w-2.5 rounded bg-slate-100 dark:bg-slate-800" />
          <span className="h-2.5 w-2.5 rounded bg-indigo-200 dark:bg-indigo-900/60" />
          <span className="h-2.5 w-2.5 rounded bg-indigo-400 dark:bg-indigo-700" />
          <span className="h-2.5 w-2.5 rounded bg-indigo-600 dark:bg-indigo-500" />
          <span>Optimal</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[400px]">
          <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-bold text-slate-500 dark:text-slate-400">
            {hours.map((h) => (
              <div key={h}>{h}</div>
            ))}
            <div>Best Time</div>
          </div>
          {days.map((day, dayIndex) => (
            <div key={day} className="flex items-center gap-2 mb-2">
              <span className="w-10 text-xs font-bold text-slate-500 dark:text-slate-400">{day}</span>
              <div className="grid grid-cols-6 gap-2 flex-1">
                {heatmapData[dayIndex].map((level, hIndex) => (
                  <div
                    key={hIndex}
                    className={`h-7 rounded-lg transition-all duration-200 hover:scale-105 cursor-pointer ${getColorClass(
                      level
                    )}`}
                    title={`${day} @ ${hours[hIndex]} - Engagement Score: ${level * 33}%`}
                  />
                ))}
              </div>
              <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 w-14 text-right">
                {dayIndex % 2 === 0 ? "12:30 PM" : "6:00 PM"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </GlassCard>
  )
}
