"use client"

import React from "react"
import { CommentInbox } from "@/components/inbox/comment-inbox"

export default function CommentsPage() {
  return (
    <div className="space-y-6">
      <div className="pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Unified Comments Inbox</h1>
        <p className="text-xs text-slate-500">Respond inline, delegate team members, and auto-generate AI replies across all social channels.</p>
      </div>

      <CommentInbox />
    </div>
  )
}
