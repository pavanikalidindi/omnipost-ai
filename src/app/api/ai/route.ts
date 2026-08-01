import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"
import { generateAICaption, generateTwitterThread, generateCarouselSlides, generateAIImagePrompt } from "@/lib/ai-providers"

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { action, prompt, model, tone, platform, topic, count } = body

    if (action === "caption") {
      const result = await generateAICaption({ prompt, model, tone, platform })
      return NextResponse.json({ success: true, data: result })
    }

    if (action === "thread") {
      const thread = await generateTwitterThread(topic || prompt || "SaaS Growth", count || 5)
      return NextResponse.json({ success: true, data: { thread } })
    }

    if (action === "carousel") {
      const slides = await generateCarouselSlides(topic || prompt || "Social Media Strategy")
      return NextResponse.json({ success: true, data: { slides } })
    }

    if (action === "image_prompt") {
      const imagePrompt = await generateAIImagePrompt(prompt || "Modern aesthetic tech workspace")
      return NextResponse.json({ success: true, data: { imagePrompt } })
    }

    if (action === "hashtags") {
      const hashtags = [
        `#${(platform || "social").replace(/\s+/g, '')}`,
        "#OmniPostAI",
        "#ContentStrategy",
        "#GrowthMarketing",
        "#AITools",
        "#SocialMediaManager",
        "#ViralContent",
        "#Automation"
      ]
      return NextResponse.json({ success: true, data: { hashtags } })
    }

    return NextResponse.json({ success: false, error: "Invalid action" }, { status: 400 })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || "AI API Error" }, { status: 500 })
  }
}
