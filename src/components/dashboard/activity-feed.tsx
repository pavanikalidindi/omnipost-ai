import React from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { CheckCircle2, MessageSquare, Sparkles, UserPlus, Clock } from "lucide-react"

export function ActivityFeed() {
  const activities = [
    {
      id: "a1",
      icon: CheckCircle2,
      color: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
      title: "Published Instagram Carousel",
      details: "OmniPost AI Launch Announcement posted to @omnipost_official",
      time: "15m ago",
    },
    {
      id: "a2",
      icon: Sparkles,
      color: "text-indigo-500 bg-indigo-500/10 border-indigo-500/20",
      title: "AI Caption Generated",
      details: "Sarah Chen generated 4 Gen Z tone variations using GPT-4o",
      time: "42m ago",
    },
    {
      id: "a3",
      icon: MessageSquare,
      color: "text-purple-500 bg-purple-500/10 border-purple-500/20",
      title: "AI Auto-Reply Sent",
      details: "Resolved comment from David Miller on LinkedIn post",
      time: "1h ago",
    },
    {
      id: "a4",
      icon: UserPlus,
      color: "text-sky-500 bg-sky-500/10 border-sky-500/20",
      title: "New Team Member Invited",
      details: "Marcus Vance joined as Editor under Workspace 'Starlight Digital'",
      time: "3h ago",
    },
  ]

  return (
    <GlassCard className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white">Recent Team & AI Activity</h3>
        <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold cursor-pointer hover:underline">
          View Audit Logs
        </span>
      </div>

      <div className="space-y-4">
        {activities.map((act) => {
          const Icon = act.icon
          return (
            <div key={act.id} className="flex items-start gap-3 text-xs">
              <div className={`p-2 rounded-xl border ${act.color} shrink-0 mt-0.5`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-slate-100 truncate">{act.title}</span>
                  <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {act.time}
                  </span>
                </div>
                <p className="text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">{act.details}</p>
              </div>
            </div>
          )
        })}
      </div>
    </GlassCard>
  )
}
