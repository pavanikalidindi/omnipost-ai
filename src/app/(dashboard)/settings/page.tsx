"use client"

import React, { useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Key, Shield, Bell, Webhook, Lock, AlertTriangle, Check } from "lucide-react"

export default function SettingsPage() {
  const [apiKey, setApiKey] = useState("omni_live_9f8a2b3c4d5e6f7a8b9c")
  const [webhookUrl, setWebhookUrl] = useState("https://api.yourcompany.com/webhooks/omnipost")
  const [saved, setSaved] = useState(false)

  const handleGenerateNewKey = () => {
    setApiKey(`omni_live_${Math.random().toString(36).substring(2, 18)}`)
  }

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="space-y-6">
      <div className="pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Security & Developer Settings</h1>
        <p className="text-xs text-slate-500">Manage REST API keys, incoming webhooks, two-factor authentication, and security preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* API Keys Card */}
        <GlassCard className="p-6 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Key className="h-4 w-4 text-indigo-500" />
            REST API Credentials
          </h3>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Secret API Key</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={apiKey}
                  className="flex-1 p-2 text-xs font-mono rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
                />
                <Button variant="outline" size="sm" onClick={handleGenerateNewKey}>
                  Roll Key
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">Webhook Endpoint</label>
              <input
                type="text"
                value={webhookUrl}
                onChange={(e) => setWebhookUrl(e.target.value)}
                className="w-full p-2.5 text-xs font-mono rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100"
              />
            </div>

            <Button variant="gradient" size="sm" className="w-full" onClick={handleSave}>
              {saved ? <Check className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
              {saved ? "Settings Saved" : "Save Webhook & Keys"}
            </Button>
          </div>
        </GlassCard>

        {/* Security & 2FA Card */}
        <GlassCard className="p-6 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Shield className="h-4 w-4 text-emerald-500" />
            Two-Factor Authentication (2FA)
          </h3>

          <p className="text-xs text-slate-500">Secure your account using TOTP Authenticator apps (Google Authenticator, 1Password, Authy).</p>

          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs font-semibold flex items-center gap-2">
            <Check className="h-4 w-4" />
            Two-Factor Authentication is currently Active
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <h4 className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5">
              <AlertTriangle className="h-4 w-4" />
              Danger Zone
            </h4>
            <Button variant="danger" size="sm">
              Delete Organization Workspace
            </Button>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
