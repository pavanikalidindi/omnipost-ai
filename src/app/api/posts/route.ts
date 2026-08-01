import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

// Mock store for dynamic runtime API testing
let mockPosts: any[] = [
  {
    id: "post-1",
    title: "OmniPost AI Launch Announcement",
    content: "We're beyond thrilled to announce the official release of OmniPost AI! Automate your social media strategy, generate AI content in seconds, and cross-post across 10+ platforms seamlessly. 🚀📈",
    platforms: ["INSTAGRAM", "LINKEDIN", "TWITTER", "FACEBOOK"],
    status: "PUBLISHED",
    mediaUrls: ["https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"],
    hashtags: ["#OmniPostAI", "#SaaS", "#SocialMediaAI"],
    authorName: "Alex Rivera",
    publishedAt: "2026-07-26T10:00:00Z",
    likesCount: 1420,
    commentsCount: 380,
    reachCount: 45200,
  },
  {
    id: "post-2",
    title: "Weekly Growth Hacking Tips",
    content: "5 proven tactics to double your LinkedIn post reach in under 30 days without spending on paid ads. Slide through for the breakdown! 👇",
    platforms: ["LINKEDIN", "THREADS"],
    status: "SCHEDULED",
    mediaUrls: ["https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80"],
    hashtags: ["#GrowthHacking", "#LinkedInTips"],
    authorName: "Sarah Chen",
    scheduledAt: "2026-07-28T14:30:00Z",
  },
  {
    id: "post-3",
    title: "Product Showcase Video Reel",
    content: "Watch how simple it is to generate an entire month's content calendar in under 5 minutes with OmniPost AI. Multi-model support with GPT-4o, Claude, and Gemini!",
    platforms: ["INSTAGRAM", "TIKTOK", "YOUTUBE"],
    status: "SCHEDULED",
    mediaUrls: ["https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80"],
    hashtags: ["#Productivity", "#AITools", "#Reels"],
    authorName: "Alex Rivera",
    scheduledAt: "2026-07-30T18:00:00Z",
  },
  {
    id: "post-4",
    title: "Draft: Q3 Marketing Campaign",
    content: "Early concept draft for our upcoming summer growth campaign. Focus on enterprise agency workflows and team collaboration features.",
    platforms: ["TWITTER", "MASTODON"],
    status: "DRAFT",
    mediaUrls: [],
    hashtags: ["#MarketingDraft"],
    authorName: "Marcus Vance",
    createdAt: "2026-07-25T16:00:00Z",
  }
]

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const status = searchParams.get("status")

  if (status) {
    const filtered = mockPosts.filter((p) => p.status === status.toUpperCase())
    return NextResponse.json({ success: true, data: filtered })
  }

  return NextResponse.json({ success: true, data: mockPosts })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const newPost = {
      id: `post-${Date.now()}`,
      title: body.title || "Untitled Post",
      content: body.content,
      platforms: body.platforms || ["INSTAGRAM"],
      status: body.status || "DRAFT",
      mediaUrls: body.mediaUrls || [],
      hashtags: body.hashtags || [],
      authorName: body.authorName || "Current User",
      scheduledAt: body.scheduledAt || null,
      publishedAt: body.status === "PUBLISHED" ? new Date().toISOString() : null,
      createdAt: new Date().toISOString(),
      likesCount: 0,
      commentsCount: 0,
      reachCount: 0,
    }

    mockPosts.unshift(newPost)
    return NextResponse.json({ success: true, data: newPost })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")
  if (id) {
    mockPosts = mockPosts.filter((p) => p.id !== id)
    return NextResponse.json({ success: true, message: "Post deleted" })
  }
  return NextResponse.json({ success: false, error: "ID required" }, { status: 400 })
}
