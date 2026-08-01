"use client"

import React, { useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SOCIAL_PLATFORMS } from "@/lib/constants"
import {
  Sparkles,
  Bold,
  Italic,
  Smile,
  Hash,
  Upload,
  Calendar,
  Send,
  Save,
  Wand2,
  Globe2,
  MessageSquarePlus,
  Check,
  X,
  Plus,
} from "lucide-react"

interface RichEditorProps {
  content: string
  setContent: (val: string) => void
  selectedPlatforms: string[]
  setSelectedPlatforms: (val: string[]) => void
  mediaUrls: string[]
  setMediaUrls: (val: string[]) => void
  onPublish: (status: "PUBLISHED" | "SCHEDULED" | "DRAFT", scheduledDate?: string) => void
}

export function RichEditor({
  content,
  setContent,
  selectedPlatforms,
  setSelectedPlatforms,
  mediaUrls,
  setMediaUrls,
  onPublish,
}: RichEditorProps) {
  const [tone, setTone] = useState("Professional")
  const [aiLoading, setAiLoading] = useState(false)
  const [scheduledTime, setScheduledTime] = useState("2026-07-28T14:30")

  const tones = ["Professional", "Gen Z", "Friendly", "Corporate", "Funny", "Educational"]

  const sampleImages = [
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
  ]

  const togglePlatform = (key: string) => {
    if (selectedPlatforms.includes(key)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter((p) => p !== key))
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, key])
    }
  }

  const handleGenerateAICaption = async () => {
    setAiLoading(true)
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "caption",
          prompt: content || "OmniPost AI social media platform release",
          model: "gpt-4o",
          tone,
          platform: selectedPlatforms[0] || "Instagram",
        }),
      })
      const json = await res.json()
      if (json.success) {
        setContent(json.data.content + "\n\n" + json.data.hashtags.join(" "))
      }
    } catch (e) {
      console.error(e)
    } finally {
      setAiLoading(false)
    }
  }

  const handleAddHashtags = async () => {
    setAiLoading(true)
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "hashtags",
          platform: selectedPlatforms[0] || "Instagram",
        }),
      })
      const json = await res.json()
      if (json.success) {
        setContent(content + "\n\n" + json.data.hashtags.join(" "))
      }
    } catch (e) {
      console.error(e)
    } finally {
      setAiLoading(false)
    }
  }

  return (
    <GlassCard className="p-6 space-y-6">
      {/* Target Platforms Picker */}
      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
          Target Social Accounts (Simultaneous Cross-Publishing)
        </label>
        <div className="flex flex-wrap gap-2">
          {Object.keys(SOCIAL_PLATFORMS).map((key) => {
            const platform = SOCIAL_PLATFORMS[key]
            const isSelected = selectedPlatforms.includes(key)
            return (
              <button
                key={key}
                onClick={() => togglePlatform(key)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  isSelected
                    ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30 ring-2 ring-indigo-500/40"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                <span className={`h-2 w-2 rounded-full ${isSelected ? "bg-white" : "bg-slate-400"}`} />
                {platform.name}
              </button>
            )
          })}
        </div>
      </div>

      {/* AI Tone & Toolbar Bar */}
      <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-slate-900/70 border border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-indigo-500" />
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Tone:</span>
          <div className="flex flex-wrap gap-1">
            {tones.map((t) => (
              <button
                key={t}
                onClick={() => setTone(t)}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-lg transition-colors ${
                  tone === t
                    ? "bg-indigo-600 text-white"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleGenerateAICaption}
            isLoading={aiLoading}
          >
            <Wand2 className="h-3.5 w-3.5 text-indigo-500" />
            AI Write Caption
          </Button>
          <Button variant="outline" size="sm" onClick={handleAddHashtags}>
            <Hash className="h-3.5 w-3.5 text-purple-500" />
            Suggest Hashtags
          </Button>
        </div>
      </div>

      {/* Main Text Composer */}
      <div>
        <div className="flex items-center justify-between mb-1.5 px-1">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Post Composition</span>
          <div className="flex items-center gap-2 text-slate-400">
            <button className="p-1 hover:text-slate-900 dark:hover:text-white" title="Bold">
              <Bold className="h-3.5 w-3.5" />
            </button>
            <button className="p-1 hover:text-slate-900 dark:hover:text-white" title="Italic">
              <Italic className="h-3.5 w-3.5" />
            </button>
            <button className="p-1 hover:text-slate-900 dark:hover:text-white" title="Insert Emoji">
              <Smile className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
          placeholder="Write your post caption, press AI Write to generate, or add emojis and media..."
          className="w-full p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 resize-none font-sans leading-relaxed"
        />
      </div>

      {/* Media Attachments Section */}
      <div>
        <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2">
          Attached Media Assets
        </label>
        <div className="grid grid-cols-4 gap-3">
          {mediaUrls.map((url, i) => (
            <div key={i} className="relative rounded-xl overflow-hidden aspect-video border group">
              <img src={url} alt="attached" className="w-full h-full object-cover" />
              <button
                onClick={() => setMediaUrls(mediaUrls.filter((_, idx) => idx !== i))}
                className="absolute top-1 right-1 h-6 w-6 rounded-full bg-slate-950/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}

          {mediaUrls.length < 4 && (
            <button
              onClick={() => setMediaUrls([...mediaUrls, sampleImages[mediaUrls.length % sampleImages.length]])}
              className="rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-800 flex flex-col items-center justify-center aspect-video text-slate-400 hover:border-indigo-500 hover:text-indigo-500 transition-colors p-2 text-center"
            >
              <Upload className="h-4 w-4 mb-1" />
              <span className="text-[10px] font-semibold">Upload Media</span>
            </button>
          )}
        </div>
      </div>

      {/* Publishing & Scheduling Controls Footer */}
      <div className="pt-4 border-t border-slate-200/80 dark:border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-slate-400" />
          <input
            type="datetime-local"
            value={scheduledTime}
            onChange={(e) => setScheduledTime(e.target.value)}
            className="text-xs bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-1.5 text-slate-700 dark:text-slate-300 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => onPublish("DRAFT")}>
            <Save className="h-4 w-4" />
            Save Draft
          </Button>

          <Button variant="secondary" size="sm" onClick={() => onPublish("SCHEDULED", scheduledTime)}>
            <Calendar className="h-4 w-4 text-indigo-500" />
            Schedule
          </Button>

          <Button variant="gradient" size="sm" onClick={() => onPublish("PUBLISHED")}>
            <Send className="h-4 w-4" />
            Publish Now
          </Button>
        </div>
      </div>
    </GlassCard>
  )
}
