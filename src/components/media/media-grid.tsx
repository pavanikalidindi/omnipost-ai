"use client"

import React, { useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Folder, Image as ImageIcon, Video, FileText, Plus, Search, Filter, Trash2, Eye } from "lucide-react"

export function MediaGrid() {
  const [activeFolder, setActiveFolder] = useState("All Assets")

  const folders = [
    { name: "All Assets", count: 24 },
    { name: "Campaign Banners", count: 8 },
    { name: "Product Videos", count: 5 },
    { name: "Brand Logos", count: 4 },
    { name: "Infographics", count: 7 },
  ]

  const mediaItems = [
    {
      id: "m1",
      name: "omnipost_launch_banner.png",
      url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
      type: "IMAGE",
      size: "2.4 MB",
      dimensions: "1920x1080",
      folder: "Campaign Banners",
    },
    {
      id: "m2",
      name: "social_growth_chart.jpg",
      url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
      type: "IMAGE",
      size: "1.8 MB",
      dimensions: "1080x1080",
      folder: "Infographics",
    },
    {
      id: "m3",
      name: "ai_studio_demo.mp4",
      url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
      type: "VIDEO",
      size: "14.2 MB",
      dimensions: "1080x1920",
      folder: "Product Videos",
    },
    {
      id: "m4",
      name: "brand_logo_dark.png",
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80",
      type: "IMAGE",
      size: "450 KB",
      dimensions: "512x512",
      folder: "Brand Logos",
    },
  ]

  const filtered = activeFolder === "All Assets" ? mediaItems : mediaItems.filter((m) => m.folder === activeFolder)

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Folder Tree Sidebar */}
      <GlassCard className="p-4 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <Folder className="h-4 w-4 text-indigo-500" />
            Media Folders
          </h3>
          <button className="p-1 text-slate-400 hover:text-slate-900 dark:hover:text-white">
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-1">
          {folders.map((f) => (
            <button
              key={f.name}
              onClick={() => setActiveFolder(f.name)}
              className={`w-full flex items-center justify-between p-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeFolder === f.name
                  ? "bg-indigo-600 text-white shadow-sm"
                  : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
              }`}
            >
              <span className="flex items-center gap-2">
                <Folder className="h-3.5 w-3.5" />
                {f.name}
              </span>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeFolder === f.name ? "bg-white/20" : "bg-slate-200 dark:bg-slate-800"}`}>
                {f.count}
              </span>
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Media Grid Main Area */}
      <GlassCard className="lg:col-span-3 p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search assets by tag or name..."
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
            />
          </div>

          <Button variant="gradient" size="sm">
            <Plus className="h-4 w-4" />
            Upload New File
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div key={item.id} className="rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden group bg-white/40 dark:bg-slate-900/40">
              <div className="aspect-video relative overflow-hidden bg-slate-950">
                <img src={item.url} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button className="p-2 rounded-full bg-white text-slate-900 hover:bg-slate-100">
                    <Eye className="h-4 w-4" />
                  </button>
                  <button className="p-2 rounded-full bg-rose-600 text-white hover:bg-rose-700">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="p-3">
                <div className="font-bold text-xs text-slate-900 dark:text-slate-100 truncate">{item.name}</div>
                <div className="flex items-center justify-between text-[10px] text-slate-400 mt-1 font-mono">
                  <span>{item.size}</span>
                  <span>{item.dimensions}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
