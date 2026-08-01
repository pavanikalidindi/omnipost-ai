"use client"

import React, { useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, UserPlus, Shield, Check, Trash2, Mail } from "lucide-react"

export default function TeamPage() {
  const [members, setMembers] = useState([
    { id: "tm-1", name: "Alex Rivera", email: "alex@omnipost.ai", role: "Owner", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" },
    { id: "tm-2", name: "Sarah Chen", email: "sarah@omnipost.ai", role: "Admin", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80" },
    { id: "tm-3", name: "Marcus Vance", email: "marcus@omnipost.ai", role: "Editor", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" },
  ])

  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState("Editor")
  const [msg, setMsg] = useState("")

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault()
    if (!inviteEmail) return
    const newMember = {
      id: `tm-${Date.now()}`,
      name: inviteEmail.split("@")[0],
      email: inviteEmail,
      role: inviteRole,
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80",
    }
    setMembers([...members, newMember])
    setInviteEmail("")
    setMsg(`Invitation sent to ${inviteEmail}`)
    setTimeout(() => setMsg(""), 3000)
  }

  const removeMember = (id: string) => {
    setMembers(members.filter((m) => m.id !== id))
  }

  return (
    <div className="space-y-6">
      <div className="pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Team Members & Access Control</h1>
        <p className="text-xs text-slate-500">Manage role-based permissions (Owner, Admin, Editor, Viewer) and invites.</p>
      </div>

      {/* Invite Bar */}
      <GlassCard className="p-5">
        <form onSubmit={handleInvite} className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[240px]">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="email"
              value={inviteEmail}
              onChange={(e) => setInviteEmail(e.target.value)}
              placeholder="Enter teammate email address..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
            />
          </div>

          <select
            value={inviteRole}
            onChange={(e) => setInviteRole(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none"
          >
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Viewer">Viewer</option>
          </select>

          <Button variant="gradient" size="sm" type="submit">
            <UserPlus className="h-4 w-4" />
            Send Invite
          </Button>

          {msg && <span className="text-xs text-emerald-500 font-bold ml-2">{msg}</span>}
        </form>
      </GlassCard>

      {/* Member List Grid */}
      <GlassCard className="p-6">
        <div className="space-y-4">
          {members.map((member) => (
            <div key={member.id} className="flex items-center justify-between p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 bg-white/40 dark:bg-slate-950/40">
              <div className="flex items-center gap-3">
                <img src={member.avatar} alt="avatar" className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
                    {member.name}
                    <Badge variant={member.role === "Owner" ? "purple" : member.role === "Admin" ? "default" : "outline"}>
                      {member.role}
                    </Badge>
                  </div>
                  <div className="text-[11px] text-slate-500 font-mono mt-0.5">{member.email}</div>
                </div>
              </div>

              {member.role !== "Owner" && (
                <button
                  onClick={() => removeMember(member.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}
