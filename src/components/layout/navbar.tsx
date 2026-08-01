"use client"

import React, { useState } from "react"
import { Search, Bell, Sun, Moon, Sparkles, CheckCircle2, AlertTriangle, MessageSquare, ChevronDown } from "lucide-react"
import { useTheme } from "./theme-provider"
import { Button } from "@/components/ui/button"

export function Navbar() {
  const { theme, toggleTheme } = useTheme()
  const [notifOpen, setNotifOpen] = useState(false)
  const [unreadCount, setUnreadCount] = useState(3)

  const notifications = [
    {
      id: "n1",
      icon: CheckCircle2,
      color: "text-emerald-500",
      title: "Publishing Succeeded",
      desc: "Instagram Reel 'Product Showcase' published to @omnipost_official.",
      time: "2 mins ago",
    },
    {
      id: "n2",
      icon: MessageSquare,
      color: "text-indigo-500",
      title: "New High-Intent Comment",
      desc: "Elena Rostova asked about team workflows on Instagram.",
      time: "12 mins ago",
    },
    {
      id: "n3",
      icon: AlertTriangle,
      color: "text-amber-500",
      title: "Token Refresh Warning",
      desc: "Twitter OAuth token expires in 48 hours. Reconnect account.",
      time: "1 hour ago",
    },
  ]

  return (
    <header className="h-16 border-b border-slate-200/80 dark:border-slate-800/80 bg-white/60 dark:bg-slate-950/60 backdrop-blur-xl sticky top-0 z-20 flex items-center justify-between px-6">
      {/* Global Search input */}
      <div className="relative w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search posts, analytics, campaign tags (⌘K)..."
          className="w-full pl-9 pr-4 py-1.5 text-xs rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40"
        />
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-3">
        {/* Quick AI Post Generator Button */}
        <Button
          variant="gradient"
          size="sm"
          onClick={() => (window.location.href = "/create")}
          className="hidden sm:inline-flex"
        >
          <Sparkles className="h-4 w-4" />
          Quick AI Post
        </Button>

        {/* Theme switcher */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Toggle Light/Dark Theme"
        >
          {theme === "dark" ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-indigo-600" />}
        </button>

        {/* Notification Bell Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen(!notifOpen)
              setUnreadCount(0)
            }}
            className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-rose-500 animate-pulse" />
            )}
          </button>

          {notifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-3">
                <span className="font-bold text-sm text-slate-900 dark:text-white">Notifications</span>
                <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold cursor-pointer">Mark all as read</span>
              </div>
              <div className="space-y-3">
                {notifications.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.id} className="flex gap-3 text-xs p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <Icon className={`h-4 w-4 ${item.color} shrink-0 mt-0.5`} />
                      <div>
                        <div className="font-semibold text-slate-900 dark:text-slate-100">{item.title}</div>
                        <div className="text-slate-500 dark:text-slate-400 text-[11px] leading-snug">{item.desc}</div>
                        <div className="text-[10px] text-slate-400 mt-1">{item.time}</div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
          <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-0.5">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
              alt="Alex Rivera"
              className="h-full w-full rounded-full object-cover"
            />
          </div>
          <div className="hidden md:block text-left">
            <div className="text-xs font-bold text-slate-900 dark:text-slate-100 leading-none">Alex Rivera</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">Head of Growth</div>
          </div>
          <ChevronDown className="h-3.5 w-3.5 text-slate-400 hidden md:block" />
        </div>
      </div>
    </header>
  )
}
