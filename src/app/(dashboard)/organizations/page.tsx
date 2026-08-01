"use client"

import React, { useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Building2, Palette, Globe, Upload, Check } from "lucide-react"

export default function OrganizationsPage() {
  const [brandColorPrimary, setBrandColorPrimary] = useState("#6366f1")
  const [brandColorSecondary, setBrandColorSecondary] = useState("#ec4899")
  const [saved, setSaved] = useState(false)

  const handleSaveBrand = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="space-y-6">
      <div className="pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Organization Settings & Brand Kit</h1>
        <p className="text-xs text-slate-500">Configure global brand identity, custom logo watermarks, colors, and default timezone.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Building2 className="h-4 w-4 text-indigo-500" />
            Organization Details
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Organization Name</label>
              <input
                type="text"
                defaultValue="Acme Global Enterprise"
                className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Default Timezone</label>
              <select className="w-full p-2.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold">
                <option value="UTC">UTC (Coordinated Universal Time)</option>
                <option value="EST">America/New_York (EST)</option>
                <option value="PST">America/Los_Angeles (PST)</option>
                <option value="IST">Asia/Kolkata (IST)</option>
              </select>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Palette className="h-4 w-4 text-pink-500" />
            Brand Kit & Colors
          </h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Primary Brand Accent</span>
              <input
                type="color"
                value={brandColorPrimary}
                onChange={(e) => setBrandColorPrimary(e.target.value)}
                className="h-8 w-14 rounded-lg cursor-pointer border"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Secondary Accent</span>
              <input
                type="color"
                value={brandColorSecondary}
                onChange={(e) => setBrandColorSecondary(e.target.value)}
                className="h-8 w-14 rounded-lg cursor-pointer border"
              />
            </div>

            <Button variant="gradient" size="sm" className="w-full" onClick={handleSaveBrand}>
              {saved ? <Check className="h-4 w-4" /> : <Upload className="h-4 w-4" />}
              {saved ? "Brand Kit Saved!" : "Save Brand Kit"}
            </Button>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
