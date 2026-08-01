"use client"

import React from "react"
import Link from "next/link"
import { StatCard } from "@/components/dashboard/stat-card"
import { PublishingHeatmap } from "@/components/dashboard/heatmap"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Share2,
  Calendar,
  Send,
  Users,
  Eye,
  MousePointer,
  Percent,
  DollarSign,
  Plus,
  Sparkles,
  Upload,
  ArrowRight,
} from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Banner & Quick Action Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            Social Command Center 👋
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            OmniPost AI engine actively monitoring 8 social accounts across 3 organization workspaces.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link href="/create">
            <Button variant="gradient" size="sm">
              <Plus className="h-4 w-4" />
              Create Post
            </Button>
          </Link>
          <Link href="/ai-studio">
            <Button variant="outline" size="sm">
              <Sparkles className="h-4 w-4 text-indigo-500" />
              AI Studio
            </Button>
          </Link>
          <Link href="/media">
            <Button variant="secondary" size="sm">
              <Upload className="h-4 w-4" />
              Upload Asset
            </Button>
          </Link>
        </div>
      </div>

      {/* Top 8 Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Connected Accounts"
          value="8 Platforms"
          change="+2 this month"
          isPositive={true}
          icon={Share2}
          description="Instagram, X, LinkedIn, FB, Threads, TikTok, YT, Pinterest"
        />
        <StatCard
          title="Scheduled Posts"
          value="14 Posts"
          change="Next @ 14:30"
          isPositive={true}
          icon={Calendar}
          description="Queued across Instagram & LinkedIn"
        />
        <StatCard
          title="Published Posts"
          value="128 Posts"
          change="+18.4%"
          isPositive={true}
          icon={Send}
          description="Total published in current billing period"
        />
        <StatCard
          title="Total Audience"
          value="148.5K"
          change="+12.4%"
          isPositive={true}
          icon={Users}
          description="Combined follower count across all channels"
        />
        <StatCard
          title="Monthly Reach"
          value="1.24M"
          change="+24.8%"
          isPositive={true}
          icon={Eye}
          description="Organic impressions & view telemetry"
        />
        <StatCard
          title="Link Clicks"
          value="34,200"
          change="+8.1%"
          isPositive={true}
          icon={MousePointer}
          description="Total CTA conversions back to your domain"
        />
        <StatCard
          title="Avg Engagement (CTR)"
          value="4.8%"
          change="+0.6%"
          isPositive={true}
          icon={Percent}
          description="Above industry average for B2B tech SaaS"
        />
        <StatCard
          title="Est. Social Revenue"
          value="$24,850"
          change="+32.0%"
          isPositive={true}
          icon={DollarSign}
          description="Attributed sales from social campaign UTM links"
        />
      </div>

      {/* Main Split Grid: Heatmap + Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PublishingHeatmap />

          {/* Upcoming Scheduled Posts Preview */}
          <GlassCard className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Upcoming Queued Posts</h3>
                <p className="text-xs text-slate-500">Auto-publishing via OmniPost Cron Engine</p>
              </div>
              <Link href="/calendar" className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1">
                View Calendar <ArrowRight className="h-3 w-3" />
              </Link>
            </div>

            <div className="space-y-3">
              {[
                {
                  title: "Weekly Growth Hacking Tips",
                  time: "July 28 @ 14:30",
                  platforms: ["LINKEDIN", "THREADS"],
                  author: "Sarah Chen",
                },
                {
                  title: "Product Showcase Video Reel",
                  time: "July 30 @ 18:00",
                  platforms: ["INSTAGRAM", "TIKTOK", "YOUTUBE"],
                  author: "Alex Rivera",
                },
              ].map((item, idx) => (
                <div key={idx} className="p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/40 dark:bg-slate-950/40 flex items-center justify-between gap-4">
                  <div>
                    <div className="font-bold text-xs text-slate-900 dark:text-slate-100">{item.title}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Scheduled for <span className="font-semibold text-indigo-600 dark:text-indigo-400">{item.time}</span> by {item.author}
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    {item.platforms.map((p) => (
                      <Badge key={p} variant="default">{p}</Badge>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        <div className="space-y-6">
          <ActivityFeed />
        </div>
      </div>
    </div>
  )
}
