import { NextResponse } from "next/server"

export async function GET() {
  const summary = {
    connectedAccountsCount: 8,
    scheduledPostsCount: 14,
    publishedPostsCount: 128,
    totalFollowers: 148500,
    totalReach: 1240500,
    totalEngagement: 8.4,
    totalClicks: 34200,
    avgCTR: 4.8,
    estimatedRevenue: "$24,850",
  }

  const weeklyEngagement = [
    { day: "Mon", impressions: 42000, clicks: 1800, likes: 3200 },
    { day: "Tue", impressions: 58000, clicks: 2400, likes: 4500 },
    { day: "Wed", impressions: 72000, clicks: 3100, likes: 5800 },
    { day: "Thu", impressions: 64000, clicks: 2800, likes: 4900 },
    { day: "Fri", impressions: 89000, clicks: 4200, likes: 7100 },
    { day: "Sat", impressions: 95000, clicks: 4900, likes: 8200 },
    { day: "Sun", impressions: 81000, clicks: 3900, likes: 6400 },
  ]

  const platformPerformance = [
    { name: "Instagram", followers: 64500, engagement: "9.2%", posts: 42 },
    { name: "LinkedIn", followers: 32400, engagement: "7.8%", posts: 28 },
    { name: "Twitter / X", followers: 28900, engagement: "6.4%", posts: 65 },
    { name: "Facebook", followers: 18200, engagement: "5.1%", posts: 18 },
    { name: "TikTok", followers: 4500, engagement: "14.2%", posts: 12 },
  ]

  return NextResponse.json({
    success: true,
    data: {
      summary,
      weeklyEngagement,
      platformPerformance,
    },
  })
}
