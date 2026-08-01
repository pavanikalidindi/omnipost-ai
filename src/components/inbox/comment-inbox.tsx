"use client"

import React, { useState, useEffect } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CommentItem } from "@/types"
import { MessageSquare, Sparkles, Send, CheckCircle2, User, Clock, Filter } from "lucide-react"

export function CommentInbox() {
  const [comments, setComments] = useState<CommentItem[]>([])
  const [selectedComment, setSelectedComment] = useState<CommentItem | null>(null)
  const [replyText, setReplyText] = useState("")
  const [aiGenerating, setAiGenerating] = useState(false)

  useEffect(() => {
    fetch("/api/comments")
      .then((r) => r.json())
      .then((json) => {
        if (json.success) {
          setComments(json.data)
          if (json.data.length > 0) setSelectedComment(json.data[0])
        }
      })
  }, [])

  const handleGenerateAIReply = async () => {
    if (!selectedComment) return
    setAiGenerating(true)
    try {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "caption",
          prompt: `Reply politely and helpfully to social media comment: "${selectedComment.content}"`,
          model: "gpt-4o",
          tone: "Friendly",
        }),
      })
      const json = await res.json()
      if (json.success) {
        setReplyText(json.data.content)
      }
    } catch (e) {
      console.error(e)
    } finally {
      setAiGenerating(false)
    }
  }

  const handleSendReply = async () => {
    if (!selectedComment || !replyText.trim()) return
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          commentId: selectedComment.id,
          replyContent: replyText,
          isAIReply: true,
        }),
      })
      const json = await res.json()
      if (json.success) {
        setSelectedComment(json.data)
        setComments(comments.map((c) => (c.id === json.data.id ? json.data : c)))
        setReplyText("")
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left List Pane */}
      <GlassCard className="p-4 space-y-3">
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
          <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-indigo-500" />
            Social Inbox ({comments.length})
          </h3>
          <Filter className="h-4 w-4 text-slate-400 cursor-pointer" />
        </div>

        <div className="space-y-2">
          {comments.map((c) => (
            <div
              key={c.id}
              onClick={() => setSelectedComment(c)}
              className={`p-3 rounded-2xl border transition-all cursor-pointer ${
                selectedComment?.id === c.id
                  ? "bg-indigo-50 dark:bg-indigo-950/60 border-indigo-500/50 shadow-sm"
                  : "bg-white/50 dark:bg-slate-950/50 border-slate-200/60 dark:border-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-900"
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <img src={c.authorAvatar} alt="avatar" className="h-6 w-6 rounded-full object-cover" />
                  <span className="text-xs font-bold text-slate-900 dark:text-slate-100">{c.authorName}</span>
                </div>
                <Badge variant={c.platform === "INSTAGRAM" ? "purple" : "default"}>{c.platform}</Badge>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">{c.content}</p>
              <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2">
                <span>{c.createdAt}</span>
                {c.isResolved && <span className="text-emerald-500 font-semibold flex items-center gap-1"><CheckCircle2 className="h-3 w-3" /> Resolved</span>}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Right Reply Workspace Pane */}
      {selectedComment ? (
        <GlassCard className="lg:col-span-2 p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <img src={selectedComment.authorAvatar} alt="avatar" className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">{selectedComment.authorName}</h4>
                  <p className="text-xs text-slate-500">Post: "{selectedComment.postTitle}"</p>
                </div>
              </div>
              <Badge variant={selectedComment.isResolved ? "success" : "warning"}>
                {selectedComment.isResolved ? "Resolved" : "Pending Action"}
              </Badge>
            </div>

            {/* Comment Thread */}
            <div className="space-y-3">
              <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 leading-relaxed">
                <span className="font-bold block mb-1 text-indigo-600 dark:text-indigo-400">{selectedComment.authorName}:</span>
                {selectedComment.content}
              </div>

              {selectedComment.replies.map((reply) => (
                <div key={reply.id} className="p-4 rounded-2xl bg-indigo-600 text-white ml-6 text-xs space-y-1 shadow-sm">
                  <div className="flex items-center justify-between font-bold text-[11px] opacity-90">
                    <span className="flex items-center gap-1">
                      {reply.isAIReply && <Sparkles className="h-3 w-3 fill-current" />}
                      {reply.isAIReply ? "OmniPost AI Auto-Reply" : "Team Member"}
                    </span>
                    <span>{reply.sentAt}</span>
                  </div>
                  <p className="leading-relaxed">{reply.content}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Reply Composition Box */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Draft Reply</span>
              <Button variant="outline" size="sm" onClick={handleGenerateAIReply} isLoading={aiGenerating}>
                <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
                AI Suggest Reply
              </Button>
            </div>

            <textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              rows={3}
              placeholder="Write a response or click AI Suggest Reply..."
              className="w-full p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 resize-none font-sans"
            />

            <div className="flex justify-end gap-2">
              <Button variant="gradient" size="sm" onClick={handleSendReply}>
                <Send className="h-3.5 w-3.5" />
                Send & Resolve
              </Button>
            </div>
          </div>
        </GlassCard>
      ) : (
        <div className="lg:col-span-2 flex items-center justify-center p-12 text-slate-400 text-xs">
          Select a comment from the list to view thread details.
        </div>
      )}
    </div>
  )
}
