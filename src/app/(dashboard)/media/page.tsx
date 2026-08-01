"use client"

import React from "react"
import { MediaGrid } from "@/components/media/media-grid"

export default function MediaLibraryPage() {
  return (
    <div className="space-y-6">
      <div className="pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Media & Brand Library</h1>
        <p className="text-xs text-slate-500">Organize social images, reel videos, brand logos, and watermarked templates.</p>
      </div>

      <MediaGrid />
    </div>
  )
}
