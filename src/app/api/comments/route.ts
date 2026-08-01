import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

let mockComments = [
  {
    id: "comment-1",
    platform: "INSTAGRAM",
    authorName: "Elena Rostova",
    authorAvatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80",
    content: "Does OmniPost AI support multi-user team approval workflows for agency client accounts?",
    postTitle: "OmniPost AI Launch Announcement",
    createdAt: "10 mins ago",
    isResolved: false,
    assignedToName: "Alex Rivera",
    replies: [
      {
        id: "reply-1",
        content: "Yes, Elena! Our Agency and Professional plans include role-based team permissions (Owner, Admin, Editor, Viewer) with full post draft approvals.",
        sentAt: "5 mins ago",
        isAIReply: true,
      }
    ],
  },
  {
    id: "comment-2",
    platform: "LINKEDIN",
    authorName: "David Miller",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    content: "Loved the breakdown on LinkedIn growth tactics. Are there any specific best posting times for B2B SaaS?",
    postTitle: "Weekly Growth Hacking Tips",
    createdAt: "45 mins ago",
    isResolved: false,
    assignedToName: "Sarah Chen",
    replies: [],
  },
  {
    id: "comment-3",
    platform: "TWITTER",
    authorName: "TechStack Daily",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    content: "Can we connect custom AI prompts or export analytics into CSV format automatically?",
    postTitle: "Product Showcase Video Reel",
    createdAt: "2 hours ago",
    isResolved: true,
    assignedToName: "Marcus Vance",
    replies: [
      {
        id: "reply-2",
        content: "Absolutely! You can export both PDF and CSV analytics reports and customize prompt templates in AI Studio.",
        sentAt: "1 hour ago",
        isAIReply: false,
      }
    ],
  }
]

export async function GET() {
  return NextResponse.json({ success: true, data: mockComments })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { commentId, replyContent, isAIReply } = body

    const target = mockComments.find((c) => c.id === commentId)
    if (target) {
      const newReply = {
        id: `reply-${Date.now()}`,
        content: replyContent,
        sentAt: "Just now",
        isAIReply: !!isAIReply,
      }
      target.replies.push(newReply)
      target.isResolved = true
      return NextResponse.json({ success: true, data: target })
    }

    return NextResponse.json({ success: false, error: "Comment not found" }, { status: 404 })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
