"use client"

import React from "react"
import Link from "next/link"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SUBSCRIPTION_PLANS } from "@/lib/constants"
import {
  Sparkles,
  Zap,
  Share2,
  Calendar,
  BarChart3,
  MessageSquareText,
  Bot,
  ShieldCheck,
  ArrowRight,
  Check,
} from "lucide-react"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 overflow-hidden font-sans">
      {/* Background Decorative Glow Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-tr from-indigo-600/30 via-purple-600/20 to-pink-500/20 blur-[120px] pointer-events-none -z-10" />

      {/* Navigation Header */}
      <header className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
            <Zap className="h-6 w-6 fill-current" />
          </div>
          <span className="font-extrabold text-xl tracking-tight text-white">
            OmniPost <span className="text-xs bg-indigo-500/20 text-indigo-400 font-extrabold px-2 py-0.5 rounded-md border border-indigo-500/30">AI</span>
          </span>
        </div>

        <nav className="hidden md:flex items-center gap-8 text-xs font-semibold text-slate-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#ai-engine" className="hover:text-white transition-colors">AI Models</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#integrations" className="hover:text-white transition-colors">Integrations</a>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">Sign In</Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="gradient" size="sm">
              Launch Dashboard &rarr;
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-5xl mx-auto px-6 pt-16 pb-20 text-center space-y-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold animate-pulse">
          <Sparkles className="h-3.5 w-3.5" />
          Powered by GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro & DeepSeek V3
        </div>

        <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
          The Enterprise <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">AI Social Platform</span> For High-Growth Teams
        </h1>

        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
          Create, schedule, cross-publish, and auto-reply across Instagram, X, LinkedIn, Threads, Facebook, TikTok, YouTube & Pinterest with unified multi-model AI telemetry.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          <Link href="/create">
            <Button variant="gradient" size="lg">
              <Sparkles className="h-5 w-5" />
              Create AI Post Now
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button variant="outline" size="lg">
              Explore Live Dashboard Demo
            </Button>
          </Link>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-black text-white tracking-tight">Everything You Need To Scale Social Impact</h2>
          <p className="text-sm text-slate-400">Enterprise grade architecture designed for marketing agencies, startups, and creators.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <GlassCard className="p-6 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-600/20 text-indigo-400 flex items-center justify-center">
              <Share2 className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-base text-white">10+ Social Integrations</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Native API wrappers for Instagram, Facebook, LinkedIn, Twitter/X, Threads, Pinterest, TikTok, YouTube, Google Business, and Mastodon.
            </p>
          </GlassCard>

          <GlassCard className="p-6 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
              <Bot className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-base text-white">Multi-LLM AI Studio</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Switch dynamically between GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, and DeepSeek for captions, threads, carousels, and image generation.
            </p>
          </GlassCard>

          <GlassCard className="p-6 space-y-3">
            <div className="h-10 w-10 rounded-xl bg-pink-600/20 text-pink-400 flex items-center justify-center">
              <MessageSquareText className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-base text-white">Unified AI Inbox</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Consolidate DMs and post comments across all channels. Auto-suggest contextually accurate replies and resolve customer inquiries fast.
            </p>
          </GlassCard>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-800 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl font-black text-white tracking-tight">Flexible Plans For Every Growth Stage</h2>
          <p className="text-sm text-slate-400">Upgrade or downgrade anytime. No hidden fees.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {SUBSCRIPTION_PLANS.map((plan) => (
            <GlassCard key={plan.id} className="p-5 flex flex-col justify-between space-y-4">
              <div>
                <div className="font-extrabold text-sm text-white">{plan.name}</div>
                <div className="mt-2 text-2xl font-black text-white">{plan.price}</div>
                <div className="mt-3 space-y-1.5 text-xs text-slate-400">
                  {plan.features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <Check className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
              <Link href="/dashboard">
                <Button variant="gradient" size="sm" className="w-full">
                  Get Started
                </Button>
              </Link>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-10 text-center text-xs text-slate-500">
        <p>&copy; {new Date().getFullYear()} OmniPost AI Inc. All rights reserved. Enterprise Social Media Management Platform.</p>
      </footer>
    </div>
  )
}
