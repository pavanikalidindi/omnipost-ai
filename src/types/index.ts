import { SocialPlatform, PostStatus, MediaType, SubscriptionPlan, RoleType } from "@prisma/client"

export interface UserProfile {
  id: string
  name: string
  email: string
  avatar: string
  role: RoleType
  organizationName: string
  workspaceName: string
  plan: SubscriptionPlan
}

export interface SocialAccountItem {
  id: string
  platform: SocialPlatform
  accountName: string
  accountHandle: string
  avatarUrl: string
  isConnected: boolean
  followersCount: number
  tokenExpiresAt?: string
}

export interface PostItem {
  id: string
  title?: string
  content: string
  richTextHtml?: string
  platforms: SocialPlatform[]
  status: PostStatus
  mediaUrls: string[]
  hashtags: string[]
  authorName: string
  scheduledAt?: string
  publishedAt?: string
  createdAt: string
  likesCount?: number
  commentsCount?: number
  reachCount?: number
}

export interface CommentItem {
  id: string
  platform: SocialPlatform
  authorName: string
  authorAvatar: string
  content: string
  postTitle?: string
  createdAt: string
  isResolved: boolean
  assignedToName?: string
  replies: {
    id: string
    content: string
    sentAt: string
    isAIReply: Boolean
  }[]
}

export interface AnalyticsSummary {
  connectedAccountsCount: number
  scheduledPostsCount: number
  publishedPostsCount: number
  totalFollowers: number
  totalReach: number
  totalEngagement: number
  totalClicks: number
  avgCTR: number
  estimatedRevenue: string
}

export interface MediaItem {
  id: string
  name: string
  url: string
  thumbnailUrl?: string
  mediaType: MediaType
  sizeFormatted: string
  dimensions?: string
  folderName: string
  createdAt: string
}
