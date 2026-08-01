"use client"

import React from "react"
import { AIStudioTools } from "@/components/ai-studio/prompt-tools"

export default function AIStudioPage() {
  return (
    <div className="space-y-6">
      <div className="pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">AI Content Studio</h1>
        <p className="text-xs text-slate-500">Multi-LLM playground powering Threads, Carousels, Captions, SEO Keywords & Image Prompts.</p>
      </div>

      <AIStudioTools />
    </div>
  )
}
