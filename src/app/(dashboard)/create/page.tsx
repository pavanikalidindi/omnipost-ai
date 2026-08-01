"use client"

import React, { useState } from "react"
import { RichEditor } from "@/components/post-creator/rich-editor"
import { PlatformPreview } from "@/components/post-creator/platform-preview"

export default function CreatePostPage() {
  const [content, setContent] = useState("")
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(["INSTAGRAM", "LINKEDIN", "TWITTER"])
  const [mediaUrls, setMediaUrls] = useState<string[]>([
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
  ])
  const [activePreviewPlatform, setActivePreviewPlatform] = useState("INSTAGRAM")
  const [statusMessage, setStatusMessage] = useState<string | null>(null)

  const handlePublish = async (status: "PUBLISHED" | "SCHEDULED" | "DRAFT", scheduledDate?: string) => {
    setStatusMessage(`Processing post for [${selectedPlatforms.join(", ")}]...`)
    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content,
          platforms: selectedPlatforms,
          status,
          mediaUrls,
          scheduledAt: scheduledDate || null,
        }),
      })
      const json = await res.json()
      if (json.success) {
        setStatusMessage(`Success! Post ${status.toLowerCase()} for ${selectedPlatforms.length} social channels.`)
        setTimeout(() => setStatusMessage(null), 3500)
      }
    } catch (e: any) {
      setStatusMessage(`Error: ${e.message}`)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
        <div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Multi-Platform Post Studio</h1>
          <p className="text-xs text-slate-500">Draft once, optimize with AI, and publish simultaneously to 10+ social networks.</p>
        </div>

        {statusMessage && (
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-3 py-1 rounded-xl border border-indigo-200 dark:border-indigo-800 animate-pulse">
            {statusMessage}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Composition Form & AI Toolbar */}
        <div className="lg:col-span-7 space-y-6">
          <RichEditor
            content={content}
            setContent={setContent}
            selectedPlatforms={selectedPlatforms}
            setSelectedPlatforms={setSelectedPlatforms}
            mediaUrls={mediaUrls}
            setMediaUrls={setMediaUrls}
            onPublish={handlePublish}
          />
        </div>

        {/* Right Column: Live Previews */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Preview Tab</span>
            <div className="flex gap-1">
              {selectedPlatforms.map((p) => (
                <button
                  key={p}
                  onClick={() => setActivePreviewPlatform(p)}
                  className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-colors ${
                    activePreviewPlatform === p
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <PlatformPreview
            platform={activePreviewPlatform}
            content={content}
            mediaUrls={mediaUrls}
          />
        </div>
      </div>
    </div>
  )
}
