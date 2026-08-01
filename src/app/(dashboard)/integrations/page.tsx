"use client"

import React, { useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SOCIAL_PLATFORMS } from "@/lib/constants"
import { CheckCircle2, RefreshCw, Unlink, Key, ExternalLink, ShieldCheck } from "lucide-react"

export default function IntegrationsPage() {
  const [accountStates, setAccountStates] = useState<Record<string, boolean>>({
    INSTAGRAM: true,
    FACEBOOK: true,
    LINKEDIN: true,
    TWITTER: true,
    THREADS: true,
    PINTEREST: false,
    TIKTOK: true,
    YOUTUBE: true,
    GOOGLE_BUSINESS: false,
    MASTODON: true,
  })

  const [loadingPlatform, setLoadingPlatform] = useState<string | null>(null)

  const toggleConnect = (key: string) => {
    setLoadingPlatform(key)
    setTimeout(() => {
      setAccountStates((prev) => ({ ...prev, [key]: !prev[key] }))
      setLoadingPlatform(null)
    }, 800)
  }

  return (
    <div className="space-y-6">
      <div className="pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Social Accounts & API Connections</h1>
        <p className="text-xs text-slate-500">OAuth authentication status, token refresh triggers, and account permissions for 10 platforms.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(SOCIAL_PLATFORMS).map((key) => {
          const config = SOCIAL_PLATFORMS[key]
          const isConnected = accountStates[key]
          const isLoading = loadingPlatform === key

          return (
            <GlassCard key={key} className="p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div className={`h-11 w-11 rounded-2xl ${config.bgColor} text-white flex items-center justify-center font-black text-sm shrink-0 shadow-md`}>
                  {config.name.charAt(0)}
                </div>
                <div className="truncate">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-white truncate">{config.name}</span>
                    <Badge variant={isConnected ? "success" : "outline"}>
                      {isConnected ? "Connected" : "Disconnected"}
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5 font-mono">
                    {isConnected ? `@omnipost_${key.toLowerCase()}` : "OAuth Authorization Required"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {isConnected ? (
                  <>
                    <button
                      onClick={() => toggleConnect(key)}
                      className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                      title="Refresh OAuth Token"
                    >
                      <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
                    </button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleConnect(key)}
                      isLoading={isLoading}
                    >
                      <Unlink className="h-3.5 w-3.5 text-rose-500" />
                      Disconnect
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => toggleConnect(key)}
                    isLoading={isLoading}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Connect OAuth
                  </Button>
                )}
              </div>
            </GlassCard>
          )
        })}
      </div>
    </div>
  )
}
