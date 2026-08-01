import React from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { SOCIAL_PLATFORMS } from "@/lib/constants"
import { Heart, MessageCircle, Share2, Bookmark, Repeat, Send, MoreHorizontal, ThumbsUp, Globe } from "lucide-react"

interface PlatformPreviewProps {
  platform: string
  content: string
  mediaUrls: string[]
  authorName?: string
  authorAvatar?: string
}

export function PlatformPreview({
  platform,
  content,
  mediaUrls,
  authorName = "Alex Rivera",
  authorAvatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
}: PlatformPreviewProps) {
  const config = SOCIAL_PLATFORMS[platform] || SOCIAL_PLATFORMS["INSTAGRAM"]

  return (
    <GlassCard className="p-5 max-w-md mx-auto">
      <div className="flex items-center justify-between pb-3 border-b border-slate-200/60 dark:border-slate-800/60 mb-3">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-full ${config.bgColor}`} />
          {config.name} Live Preview
        </span>
        <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono px-2 py-0.5 rounded">
          {content.length} / {config.maxChars} chars
        </span>
      </div>

      {/* INSTAGRAM PREVIEW */}
      {platform === "INSTAGRAM" && (
        <div className="bg-white dark:bg-black rounded-xl border border-slate-200 dark:border-slate-800 p-3 text-slate-900 dark:text-slate-100">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <img src={authorAvatar} alt="avatar" className="h-7 w-7 rounded-full object-cover border" />
              <span className="text-xs font-bold">omnipost_official</span>
            </div>
            <MoreHorizontal className="h-4 w-4 text-slate-400" />
          </div>

          {/* Media Container */}
          {mediaUrls.length > 0 ? (
            <div className="rounded-lg overflow-hidden my-2 aspect-square bg-slate-900 relative">
              <img src={mediaUrls[0]} alt="preview" className="w-full h-full object-cover" />
            </div>
          ) : (
            <div className="rounded-lg bg-gradient-to-br from-indigo-900 to-purple-900 text-white p-6 my-2 text-center text-xs italic font-medium">
              [Image or Carousel Slide Preview]
            </div>
          )}

          <div className="flex items-center justify-between my-2 text-slate-700 dark:text-slate-200">
            <div className="flex items-center gap-3">
              <Heart className="h-5 w-5 text-rose-500 fill-rose-500" />
              <MessageCircle className="h-5 w-5" />
              <Send className="h-5 w-5" />
            </div>
            <Bookmark className="h-5 w-5" />
          </div>

          <div className="text-xs space-y-1">
            <div className="font-bold">1,482 likes</div>
            <div>
              <span className="font-bold mr-1.5">omnipost_official</span>
              <span>{content || "Your caption preview will appear here in real-time..."}</span>
            </div>
            <div className="text-[10px] text-slate-400 uppercase mt-1">2 hours ago</div>
          </div>
        </div>
      )}

      {/* LINKEDIN PREVIEW */}
      {platform === "LINKEDIN" && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 text-slate-900 dark:text-slate-100">
          <div className="flex items-start gap-2.5 mb-3">
            <img src={authorAvatar} alt="avatar" className="h-9 w-9 rounded-full object-cover" />
            <div>
              <div className="text-xs font-bold leading-none">{authorName}</div>
              <div className="text-[10px] text-slate-500">Head of Growth • OmniPost AI</div>
              <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                <span>1h •</span> <Globe className="h-2.5 w-2.5" />
              </div>
            </div>
          </div>

          <p className="text-xs whitespace-pre-wrap leading-relaxed">
            {content || "Drafting your LinkedIn insight..."}
          </p>

          {mediaUrls.length > 0 && (
            <div className="rounded-lg overflow-hidden my-3 max-h-56 bg-slate-900">
              <img src={mediaUrls[0]} alt="preview" className="w-full h-full object-cover" />
            </div>
          )}

          <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800 text-slate-500 text-xs font-medium mt-3">
            <span className="flex items-center gap-1 hover:text-blue-600">
              <ThumbsUp className="h-4 w-4" /> Like
            </span>
            <span className="flex items-center gap-1 hover:text-blue-600">
              <MessageCircle className="h-4 w-4" /> Comment
            </span>
            <span className="flex items-center gap-1 hover:text-blue-600">
              <Share2 className="h-4 w-4" /> Repost
            </span>
          </div>
        </div>
      )}

      {/* TWITTER PREVIEW */}
      {platform === "TWITTER" && (
        <div className="bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 p-4 text-slate-900 dark:text-slate-100">
          <div className="flex items-start gap-3">
            <img src={authorAvatar} alt="avatar" className="h-9 w-9 rounded-full object-cover" />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-xs">
                <span className="font-bold">{authorName}</span>
                <span className="text-slate-500">@omnipost_ai</span>
                <span className="text-slate-400">• 45m</span>
              </div>

              <p className="text-xs mt-1 whitespace-pre-wrap leading-normal">
                {content || "What's happening?"}
              </p>

              {mediaUrls.length > 0 && (
                <div className="rounded-xl overflow-hidden my-2 border border-slate-200 dark:border-slate-800 max-h-48">
                  <img src={mediaUrls[0]} alt="preview" className="w-full h-full object-cover" />
                </div>
              )}

              <div className="flex items-center justify-between text-slate-400 text-xs mt-3">
                <span className="flex items-center gap-1"><MessageCircle className="h-3.5 w-3.5" /> 24</span>
                <span className="flex items-center gap-1"><Repeat className="h-3.5 w-3.5" /> 88</span>
                <span className="flex items-center gap-1"><Heart className="h-3.5 w-3.5" /> 340</span>
                <span className="flex items-center gap-1"><Bookmark className="h-3.5 w-3.5" /> 12</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FACEBOOK PREVIEW */}
      {platform === "FACEBOOK" && (
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-3 text-slate-900 dark:text-slate-100">
          <div className="flex items-center gap-2 mb-2">
            <img src={authorAvatar} alt="avatar" className="h-8 w-8 rounded-full object-cover" />
            <div>
              <div className="text-xs font-bold">OmniPost AI Page</div>
              <div className="text-[10px] text-slate-400">Sponsored • Published by AI</div>
            </div>
          </div>
          <p className="text-xs mb-2">{content || "Facebook post preview content..."}</p>
          {mediaUrls.length > 0 && (
            <div className="rounded-md overflow-hidden max-h-48">
              <img src={mediaUrls[0]} alt="fb media" className="w-full h-full object-cover" />
            </div>
          )}
        </div>
      )}

      {/* THREADS PREVIEW */}
      {platform === "THREADS" && (
        <div className="bg-white dark:bg-zinc-950 rounded-xl border border-slate-200 dark:border-slate-800 p-3 text-slate-900 dark:text-slate-100">
          <div className="flex items-start gap-2.5">
            <img src={authorAvatar} alt="avatar" className="h-8 w-8 rounded-full object-cover" />
            <div className="flex-1">
              <div className="text-xs font-bold">@omnipost_threads</div>
              <p className="text-xs mt-1">{content || "Threads post content..."}</p>
            </div>
          </div>
        </div>
      )}
    </GlassCard>
  )
}
