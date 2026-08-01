"use client"

import React, { useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { SUBSCRIPTION_PLANS } from "@/lib/constants"
import { Check, Sparkles, CreditCard, ShieldCheck } from "lucide-react"

export default function BillingPage() {
  const [selectedPlan, setSelectedPlan] = useState("STARTER")

  return (
    <div className="space-y-6">
      <div className="pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Subscriptions & Usage Limits</h1>
        <p className="text-xs text-slate-500">Scale your social automation with higher AI credit quotas and agency workspace seats.</p>
      </div>

      {/* Plan Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {SUBSCRIPTION_PLANS.map((plan) => {
          const isCurrent = selectedPlan === plan.id
          return (
            <GlassCard
              key={plan.id}
              className={`p-5 flex flex-col justify-between space-y-4 relative ${
                plan.popular ? "border-indigo-500 ring-2 ring-indigo-500/30" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-2.5 py-0.5 rounded-full bg-indigo-600 text-white text-[10px] font-black uppercase tracking-wider">
                  Most Popular
                </div>
              )}

              <div>
                <div className="font-extrabold text-sm text-slate-900 dark:text-white">{plan.name}</div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-2xl font-black text-slate-900 dark:text-white">{plan.price}</span>
                  <span className="text-[10px] text-slate-400 font-medium">/{plan.period}</span>
                </div>

                <div className="mt-4 space-y-2">
                  {plan.features.map((f, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
                      <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                variant={isCurrent ? "outline" : plan.popular ? "gradient" : "primary"}
                size="sm"
                onClick={() => setSelectedPlan(plan.id)}
                className="w-full"
              >
                {isCurrent ? "Current Plan" : "Upgrade"}
              </Button>
            </GlassCard>
          )
        })}
      </div>
    </div>
  )
}
