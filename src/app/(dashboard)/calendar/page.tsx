"use client"

import React from "react"
import { CalendarView } from "@/components/calendar/calendar-view"

export default function CalendarPage() {
  return (
    <div className="space-y-6">
      <div className="pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Social Content Calendar</h1>
        <p className="text-xs text-slate-500">Interactive drag-and-drop posting schedule with holiday AI content suggestions.</p>
      </div>

      <CalendarView />
    </div>
  )
}
