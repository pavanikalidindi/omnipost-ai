"use client"

import React, { useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { AI_MODELS } from "@/lib/constants"
import {
  Sparkles,
  Bot,
  Layers,
  FileText,
  ListOrdered,
  Image as ImageIcon,
  Languages,
  CheckCircle2,
  Copy,
  Zap,
} from "lucide-react"

export function AIStudioTools() {
  const [selectedModel, setSelectedModel] = useState(AI_MODELS[0].id)
  const [activeTab, setActiveTab] = useState<"caption" | "thread" | "carousel" | "image">("caption")
  const [prompt, setPrompt] = useState("")
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleRunTask = async () => {
    setIsLoading(true)
    setResult(null)
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: activeTab === "thread" ? "thread" : activeTab === "carousel" ? "carousel" : activeTab === "image" ? "image_prompt" : "caption",
          prompt: prompt || "Next-gen AI social media distribution platform launch",
          model: selectedModel,
          platform: "Instagram",
        }),
      })
      const json = await res.json()
      if (json.success) {
        setResult(json.data)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Model Selector Bar */}
      <GlassCard className="p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-indigo-500" />
          <span className="font-bold text-sm text-slate-900 dark:text-white">Active AI Engine:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {AI_MODELS.map((model) => (
            <button
              key={model.id}
              onClick={() => setSelectedModel(model.id)}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedModel === model.id
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
                  : "bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              <span>{model.name}</span>
              <span className="text-[10px] bg-white/20 dark:bg-slate-900/40 px-1.5 py-0.5 rounded font-mono">
                {model.quality}
              </span>
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Mode Selector Tabs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { id: "caption", label: "Caption & Copy", icon: Sparkles },
          { id: "thread", label: "Twitter / X Thread", icon: ListOrdered },
          { id: "carousel", label: "Instagram Carousel", icon: Layers },
          { id: "image", label: "AI Image Prompt", icon: ImageIcon },
        ].map((tab) => {
          const Icon = tab.icon
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any)
                setResult(null)
              }}
              className={`flex items-center justify-center gap-2 p-3 rounded-2xl border text-xs font-bold transition-all ${
                isActive
                  ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/25"
                  : "bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Main Generator Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard className="p-6 space-y-4">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Zap className="h-4 w-4 text-indigo-500" />
            Prompt & Context Input
          </h3>

          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={6}
            placeholder={`Describe what you want to generate for ${activeTab}... e.g. "Create a viral 5-part guide on how to build a $100k SaaS using Next.js 15"`}
            className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 resize-none font-sans"
          />

          <Button
            variant="gradient"
            size="md"
            className="w-full"
            onClick={handleRunTask}
            isLoading={isLoading}
          >
            <Sparkles className="h-4 w-4" />
            Generate with {AI_MODELS.find((m) => m.id === selectedModel)?.name}
          </Button>
        </GlassCard>

        {/* Results Card */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800 mb-4">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">AI Output Preview</h3>
            {result && (
              <button
                onClick={() => copyToClipboard(JSON.stringify(result, null, 2))}
                className="text-xs text-indigo-600 dark:text-indigo-400 flex items-center gap-1 font-semibold hover:underline"
              >
                {copied ? <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                {copied ? "Copied!" : "Copy Result"}
              </button>
            )}
          </div>

          {isLoading ? (
            <div className="h-48 flex flex-col items-center justify-center space-y-3 text-slate-400">
              <span className="h-6 w-6 animate-spin rounded-full border-2 border-indigo-600 border-t-transparent" />
              <p className="text-xs font-medium">Processing tokens with {selectedModel}...</p>
            </div>
          ) : result ? (
            <div className="space-y-3 text-xs text-slate-800 dark:text-slate-200">
              {result.content && (
                <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-950 font-sans leading-relaxed whitespace-pre-wrap">
                  {result.content}
                </div>
              )}

              {result.thread && (
                <div className="space-y-2">
                  {result.thread.map((t: string, idx: number) => (
                    <div key={idx} className="p-3 rounded-xl bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                      {t}
                    </div>
                  ))}
                </div>
              )}

              {result.slides && (
                <div className="space-y-2">
                  {result.slides.map((s: any, idx: number) => (
                    <div key={idx} className="p-3 rounded-xl bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800">
                      <div className="font-bold text-indigo-600 dark:text-indigo-400 mb-1">{s.title}</div>
                      <div>{s.body}</div>
                    </div>
                  ))}
                </div>
              )}

              {result.imagePrompt && (
                <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-950 border font-mono text-[11px] text-purple-600 dark:text-purple-400">
                  {result.imagePrompt}
                </div>
              )}
            </div>
          ) : (
            <div className="h-48 flex flex-col items-center justify-center text-center text-slate-400 text-xs">
              <Sparkles className="h-8 w-8 mb-2 opacity-50 text-indigo-500" />
              <p>Enter your prompt above and click generate to test multi-model responses.</p>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  )
}
