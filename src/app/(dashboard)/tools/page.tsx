"use client"

import React, { useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Link2, QrCode, Sparkles, Copy, Check, ExternalLink } from "lucide-react"

export default function GrowthToolsPage() {
  const [baseUrl, setBaseUrl] = useState("https://omnipost.ai")
  const [source, setSource] = useState("linkedin")
  const [medium, setMedium] = useState("social")
  const [campaign, setCampaign] = useState("summer_launch")
  const [copied, setCopied] = useState(false)

  const finalUtm = `${baseUrl}?utm_source=${source}&utm_medium=${medium}&utm_campaign=${campaign}`
  const shortUrl = `https://omni.link/x9k2p`

  const handleCopy = () => {
    navigator.clipboard.writeText(finalUtm)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Growth Tools, UTM Builder & QR Generator</h1>
        <p className="text-xs text-slate-500">Shorten link URLs, attach campaign tracking tags, and generate custom branded QR codes.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* UTM Link Generator */}
        <GlassCard className="p-6 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Link2 className="h-4 w-4 text-indigo-500" />
            UTM Link Builder
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Destination URL</label>
              <input
                type="text"
                value={baseUrl}
                onChange={(e) => setBaseUrl(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold"
              />
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">UTM Source</label>
                <input
                  type="text"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-100 dark:bg-slate-900 border text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">UTM Medium</label>
                <input
                  type="text"
                  value={medium}
                  onChange={(e) => setMedium(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-100 dark:bg-slate-900 border text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-500 mb-1">Campaign</label>
                <input
                  type="text"
                  value={campaign}
                  onChange={(e) => setCampaign(e.target.value)}
                  className="w-full p-2 rounded-lg bg-slate-100 dark:bg-slate-900 border text-xs"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-950 font-mono text-xs text-indigo-600 dark:text-indigo-400 break-all border">
              {finalUtm}
            </div>

            <Button variant="gradient" size="sm" className="w-full" onClick={handleCopy}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "UTM Link Copied!" : "Copy Generated UTM Link"}
            </Button>
          </div>
        </GlassCard>

        {/* QR Code & Short Link Generator */}
        <GlassCard className="p-6 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <QrCode className="h-4 w-4 text-purple-500" />
            Short URL & QR Code Generator
          </h3>

          <div className="flex flex-col items-center justify-center p-6 border border-dashed border-slate-300 dark:border-slate-800 rounded-2xl space-y-3 bg-white/50 dark:bg-slate-950/50">
            <div className="h-32 w-32 bg-slate-900 dark:bg-white p-3 rounded-xl flex items-center justify-center shadow-md">
              {/* Clean SVG QR Code Representation */}
              <svg className="w-full h-full text-white dark:text-slate-900" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm8-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm13-2h3v2h-3v-2zm-3 3h2v3h-2v-3zm3 1h3v4h-3v-4zm-3 3h2v2h-2v-2z" />
              </svg>
            </div>
            <div className="text-center">
              <div className="font-mono text-xs font-bold text-indigo-600 dark:text-indigo-400">{shortUrl}</div>
              <p className="text-[11px] text-slate-400 mt-0.5">High-resolution vector QR code ready for print & social media</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
