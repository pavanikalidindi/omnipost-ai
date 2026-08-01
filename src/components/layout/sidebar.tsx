"use client"

import React, { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  PlusCircle,
  Calendar,
  BarChart3,
  Image,
  MessageSquareText,
  Sparkles,
  FileCode2,
  Megaphone,
  Building2,
  Users,
  Share2,
  CreditCard,
  Settings,
  Wrench,
  ChevronDown,
  Zap,
  Check,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface SidebarItem {
  name: string
  href: string
  icon: React.ElementType
  badge?: string
}

const mainNav: SidebarItem[] = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Create Post", href: "/create", icon: PlusCircle, badge: "AI Powered" },
  { name: "Calendar", href: "/calendar", icon: Calendar },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Media Library", href: "/media", icon: Image },
  { name: "Comments Inbox", href: "/inbox", icon: MessageSquareText, badge: "3 New" },
  { name: "AI Studio", href: "/ai-studio", icon: Sparkles },
  { name: "Templates", href: "/tools#templates", icon: FileCode2 },
  { name: "Campaigns", href: "/tools#campaigns", icon: Megaphone },
]

const managementNav: SidebarItem[] = [
  { name: "Organizations", href: "/organizations", icon: Building2 },
  { name: "Team & Roles", href: "/team", icon: Users },
  { name: "Integrations", href: "/integrations", icon: Share2 },
  { name: "Brand & Extras", href: "/tools", icon: Wrench },
  { name: "Billing", href: "/billing", icon: CreditCard },
  { name: "Settings", href: "/settings", icon: Settings },
]

const organizations = [
  { id: "org-1", name: "Acme Global Enterprise", plan: "Agency" },
  { id: "org-2", name: "Starlight Digital Studio", plan: "Pro" },
  { id: "org-3", name: "HyperScale Ventures", plan: "Starter" },
]

export function Sidebar() {
  const pathname = usePathname()
  const [selectedOrg, setSelectedOrg] = useState(organizations[0])
  const [orgDropdownOpen, setOrgDropdownOpen] = useState(false)

  return (
    <aside className="w-64 border-r bg-white/70 dark:bg-slate-950/70 backdrop-blur-xl border-slate-200/80 dark:border-slate-800/80 flex flex-col h-screen sticky top-0 z-30 select-none">
      {/* Brand Header */}
      <div className="p-4 border-b border-slate-200/60 dark:border-slate-800/60 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Zap className="h-5 w-5 fill-current" />
          </div>
          <div>
            <div className="font-bold text-slate-900 dark:text-white tracking-tight leading-none text-base flex items-center gap-1.5">
              OmniPost <span className="text-xs bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 font-extrabold px-1.5 py-0.5 rounded-md border border-indigo-500/20">AI</span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">Enterprise Social Platform</p>
          </div>
        </Link>
      </div>

      {/* Organization Switcher Dropdown */}
      <div className="px-3 py-2.5 relative border-b border-slate-200/40 dark:border-slate-800/40">
        <button
          onClick={() => setOrgDropdownOpen(!orgDropdownOpen)}
          className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-100/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800/80 text-left hover:bg-slate-200/60 dark:hover:bg-slate-800/60 transition-colors"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="h-7 w-7 rounded-lg bg-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
              {selectedOrg.name.charAt(0)}
            </div>
            <div className="truncate">
              <div className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">{selectedOrg.name}</div>
              <div className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">{selectedOrg.plan} Plan</div>
            </div>
          </div>
          <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />
        </button>

        {orgDropdownOpen && (
          <div className="absolute left-3 right-3 top-full mt-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl z-50 p-1.5 animate-in fade-in zoom-in-95">
            <div className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1">Switch Organization</div>
            {organizations.map((org) => (
              <button
                key={org.id}
                onClick={() => {
                  setSelectedOrg(org)
                  setOrgDropdownOpen(false)
                }}
                className={cn(
                  "w-full flex items-center justify-between p-2 rounded-lg text-xs font-medium text-left transition-colors",
                  selectedOrg.id === org.id
                    ? "bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-300"
                    : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
              >
                <span>{org.name}</span>
                {selectedOrg.id === org.id && <Check className="h-3.5 w-3.5 text-indigo-600" />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Navigation links */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-6 scrollbar-thin">
        <div>
          <div className="px-3 text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2">Workspace</div>
          <nav className="space-y-1">
            {mainNav.map((item) => {
              const active = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href))
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group",
                    active
                      ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={cn("h-4 w-4 transition-transform group-hover:scale-110", active ? "text-white" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200")} />
                    <span>{item.name}</span>
                  </div>
                  {item.badge && (
                    <span className={cn("text-[10px] font-bold px-1.5 py-0.5 rounded-full", active ? "bg-white/20 text-white" : "bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400")}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>
        </div>

        <div>
          <div className="px-3 text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-2">Management & Tools</div>
          <nav className="space-y-1">
            {managementNav.map((item) => {
              const active = pathname === item.href
              const Icon = item.icon
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all group",
                    active
                      ? "bg-indigo-600 text-white shadow-sm shadow-indigo-600/30"
                      : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white"
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className={cn("h-4 w-4 transition-transform group-hover:scale-110", active ? "text-white" : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200")} />
                    <span>{item.name}</span>
                  </div>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>

      {/* AI Usage Limit Footer Card */}
      <div className="p-3 border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="p-3 rounded-xl bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-indigo-500/20 dark:border-indigo-500/30">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-900 dark:text-white mb-1">
            <span className="flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
              AI Credits
            </span>
            <span className="text-[11px] text-indigo-600 dark:text-indigo-400">840 / 1,000</span>
          </div>
          <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 w-[84%] rounded-full" />
          </div>
          <Link
            href="/billing"
            className="block text-center text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            Upgrade Plan &rarr;
          </Link>
        </div>
      </div>
    </aside>
  )
}
