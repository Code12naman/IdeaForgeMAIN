"use client"

import * as React from "react"
import { BarChart, Bar, LineChart, Line, PieChart, Pie, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Cell, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, Users, Target, AlertTriangle, DollarSign, Rocket, Award } from "lucide-react"

interface VisualizationProps {
  sectionId: string
}

export function BlueprintVisualization({ sectionId }: VisualizationProps) {
  switch (sectionId) {
    case "idea":
      return <IdeaVisualization />
    case "crowd":
      return <CrowdVisualization />
    case "plan":
      return <PlanVisualization />
    case "warning":
      return <WarningVisualization />
    case "profit":
      return <ProfitVisualization />
    case "growth":
      return <GrowthVisualization />
    case "decision":
      return <DecisionVisualization />
    default:
      return null
  }
}

// The Idea Section - Value Proposition Breakdown
function IdeaVisualization() {
  const data = [
    { aspect: "Innovation", value: 85, fullMark: 100 },
    { aspect: "Market Fit", value: 78, fullMark: 100 },
    { aspect: "Uniqueness", value: 92, fullMark: 100 },
    { aspect: "Feasibility", value: 75, fullMark: 100 },
    { aspect: "Impact", value: 88, fullMark: 100 },
  ]

  const chartConfig = {
    value: { label: "Score", color: "hsl(22, 98%, 56%)" },
  }

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/20 border border-secondary/40">
        <Target className="h-4 w-4 text-secondary" />
        <span className="text-sm font-semibold text-white">Value Proposition Analysis</span>
      </div>
      <ChartContainer config={chartConfig} className="h-[280px] w-full">
        <RadarChart data={data}>
          <PolarGrid stroke="rgba(255,255,255,0.1)" />
          <PolarAngleAxis 
            dataKey="aspect" 
            tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]}
            tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }}
          />
          <Radar 
            name="Idea Strength" 
            dataKey="value" 
            stroke="hsl(22, 98%, 56%)" 
            fill="hsl(22, 98%, 56%)" 
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
        </RadarChart>
      </ChartContainer>
    </div>
  )
}

// The Crowd Section - Market Analysis
function CrowdVisualization() {
  const marketData = [
    { segment: "Target Users", value: 45, fill: "hsl(22, 98%, 56%)" },
    { segment: "Secondary Market", value: 30, fill: "hsl(22, 98%, 65%)" },
    { segment: "Future Expansion", value: 25, fill: "hsl(30, 100%, 94%)" },
  ]

  const competitionData = [
    { name: "Your Solution", advantage: 85 },
    { name: "Competitor A", advantage: 65 },
    { name: "Competitor B", advantage: 55 },
    { name: "Competitor C", advantage: 48 },
  ]

  const chartConfig = {
    advantage: { label: "Competitive Edge", color: "hsl(22, 98%, 56%)" },
  }

  return (
    <div className="w-full space-y-6">
      {/* Market Segmentation */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 border border-primary/40">
          <Users className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-white">Market Distribution</span>
        </div>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <PieChart>
            <Pie
              data={marketData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={5}
              dataKey="value"
              label={({ segment, value }) => `${segment}: ${value}%`}
              labelLine={{ stroke: 'rgba(255,255,255,0.3)' }}
            >
              {marketData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ChartContainer>
      </div>

      {/* Competitive Positioning */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 border border-primary/40">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-white">Competitive Positioning</span>
        </div>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <BarChart data={competitionData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 11 }}
              angle={-15}
              textAnchor="end"
              height={60}
            />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 10 }} />
            <Bar dataKey="advantage" fill="hsl(22, 98%, 56%)" radius={[8, 8, 0, 0]} />
            <ChartTooltip content={<ChartTooltipContent />} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  )
}

// The Plan Section - Timeline & Milestones
function PlanVisualization() {
  const timelineData = [
    { month: "Month 1", progress: 25, milestone: "Launch MVP" },
    { month: "Month 2", progress: 45, milestone: "User Testing" },
    { month: "Month 3", progress: 70, milestone: "Market Entry" },
    { month: "Month 4-6", progress: 85, milestone: "Scale Up" },
    { month: "Month 7-9", progress: 95, milestone: "Optimization" },
    { month: "Month 10-12", progress: 100, milestone: "Full Launch" },
  ]

  const chartConfig = {
    progress: { label: "Completion %", color: "hsl(22, 98%, 56%)" },
  }

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-secondary/20 border border-secondary/40">
        <Target className="h-4 w-4 text-secondary" />
        <span className="text-sm font-semibold text-white">Go-to-Market Timeline</span>
      </div>
      <ChartContainer config={chartConfig} className="h-[280px] w-full">
        <LineChart data={timelineData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="month" 
            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10 }}
            angle={-15}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
            label={{ value: 'Progress %', angle: -90, position: 'insideLeft', fill: 'rgba(255,255,255,0.6)' }}
          />
          <Line 
            type="monotone" 
            dataKey="progress" 
            stroke="hsl(22, 98%, 56%)" 
            strokeWidth={3}
            dot={{ fill: 'hsl(22, 98%, 56%)', r: 5 }}
            activeDot={{ r: 7 }}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
        </LineChart>
      </ChartContainer>
      {/* Milestone Legend */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        {timelineData.map((item, i) => (
          <div key={i} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 border border-white/10">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-xs text-gray-300">{item.month}: {item.milestone}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// The Warning Section - Risk Assessment
function WarningVisualization() {
  const riskData = [
    { category: "Market Risk", level: 65, fullMark: 100 },
    { category: "Financial Risk", level: 45, fullMark: 100 },
    { category: "Technical Risk", level: 38, fullMark: 100 },
    { category: "Competition Risk", level: 72, fullMark: 100 },
    { category: "Regulatory Risk", level: 28, fullMark: 100 },
  ]

  const chartConfig = {
    level: { label: "Risk Level", color: "hsl(22, 98%, 56%)" },
  }

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 border border-primary/30">
        <AlertTriangle className="h-4 w-4 text-primary" />
        <span className="text-sm font-semibold text-white">Risk Assessment Matrix</span>
      </div>
      <ChartContainer config={chartConfig} className="h-[280px] w-full">
        <RadarChart data={riskData}>
          <PolarGrid stroke="rgba(255,255,255,0.1)" />
          <PolarAngleAxis 
            dataKey="category" 
            tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11 }}
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 100]}
            tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
          />
          <Radar 
            name="Risk Level" 
            dataKey="level" 
            stroke="hsl(22, 98%, 56%)" 
            fill="hsl(22, 98%, 56%)" 
            fillOpacity={0.3}
            strokeWidth={2}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
        </RadarChart>
      </ChartContainer>
      <div className="flex items-center justify-center gap-6 mt-4 px-4 py-3 rounded-lg bg-white/5 border border-white/10">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-green-500" />
          <span className="text-xs text-gray-300">Low (0-33)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-yellow-500" />
          <span className="text-xs text-gray-300">Medium (34-66)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <span className="text-xs text-gray-300">High (67-100)</span>
        </div>
      </div>
    </div>
  )
}

// Profit Section - Revenue Model
function ProfitVisualization() {
  const revenueStreams = [
    { stream: "Subscriptions", amount: 45, fill: "hsl(22, 98%, 56%)" },
    { stream: "Transactions", amount: 25, fill: "hsl(22, 98%, 65%)" },
    { stream: "Premium Features", amount: 20, fill: "hsl(30, 100%, 80%)" },
    { stream: "Partnerships", amount: 10, fill: "hsl(30, 100%, 94%)" },
  ]

  const profitabilityData = [
    { quarter: "Q1", revenue: 50, costs: 80, profit: -30 },
    { quarter: "Q2", revenue: 95, costs: 75, profit: 20 },
    { quarter: "Q3", revenue: 160, costs: 85, profit: 75 },
    { quarter: "Q4", revenue: 240, costs: 90, profit: 150 },
  ]

  const chartConfig = {
    revenue: { label: "Revenue", color: "hsl(22, 98%, 56%)" },
    costs: { label: "Costs", color: "hsl(0, 84%, 60%)" },
    profit: { label: "Profit", color: "hsl(142, 76%, 55%)" },
  }

  return (
    <div className="w-full space-y-6">
      {/* Revenue Streams */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 border border-primary/30">
          <DollarSign className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-white">Revenue Stream Breakdown</span>
        </div>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <PieChart>
            <Pie
              data={revenueStreams}
              cx="50%"
              cy="50%"
              outerRadius={90}
              dataKey="amount"
              label={({ stream, amount }) => `${stream}: ${amount}%`}
              labelLine={{ stroke: 'rgba(255,255,255,0.3)' }}
            >
              {revenueStreams.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <ChartTooltip content={<ChartTooltipContent />} />
          </PieChart>
        </ChartContainer>
      </div>

      {/* Path to Profitability */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 border border-primary/30">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-white">Path to Profitability</span>
        </div>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <LineChart data={profitabilityData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="quarter" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11 }} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} />
            <Line type="monotone" dataKey="revenue" stroke="hsl(22, 98%, 56%)" strokeWidth={2} />
            <Line type="monotone" dataKey="costs" stroke="hsl(0, 84%, 60%)" strokeWidth={2} />
            <Line type="monotone" dataKey="profit" stroke="hsl(142, 76%, 55%)" strokeWidth={3} strokeDasharray="5 5" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Legend />
          </LineChart>
        </ChartContainer>
      </div>
    </div>
  )
}

// Growth Section - Growth Trajectory
function GrowthVisualization() {
  const growthData = [
    { month: "M1", users: 100, growth: 0 },
    { month: "M2", users: 250, growth: 150 },
    { month: "M3", users: 580, growth: 330 },
    { month: "M4", users: 1240, growth: 660 },
    { month: "M5", users: 2350, growth: 1110 },
    { month: "M6", users: 4200, growth: 1850 },
    { month: "M7", users: 7100, growth: 2900 },
    { month: "M8", users: 11500, growth: 4400 },
  ]

  const channelData = [
    { channel: "Organic", effectiveness: 85 },
    { channel: "Referrals", effectiveness: 78 },
    { channel: "Paid Ads", effectiveness: 65 },
    { channel: "Partnerships", effectiveness: 72 },
    { channel: "Content", effectiveness: 88 },
  ]

  const chartConfig = {
    users: { label: "Total Users", color: "hsl(22, 98%, 56%)" },
    effectiveness: { label: "Effectiveness", color: "hsl(22, 98%, 56%)" },
  }

  return (
    <div className="w-full space-y-6">
      {/* User Growth */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 border border-primary/30">
          <Rocket className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-white">User Growth Trajectory</span>
        </div>
        <ChartContainer config={chartConfig} className="h-[250px] w-full">
          <LineChart data={growthData}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="month" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11 }} />
            <YAxis tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} />
            <Line 
              type="monotone" 
              dataKey="users" 
              stroke="hsl(22, 98%, 56%)" 
              strokeWidth={3}
              dot={{ fill: 'hsl(22, 98%, 56%)', r: 4 }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
          </LineChart>
        </ChartContainer>
      </div>

      {/* Marketing Channels */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 border border-primary/30">
          <TrendingUp className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-white">Marketing Channel Effectiveness</span>
        </div>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <BarChart data={channelData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis type="number" tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }} />
            <YAxis 
              dataKey="channel" 
              type="category" 
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11 }}
              width={100}
            />
            <Bar dataKey="effectiveness" fill="hsl(22, 98%, 56%)" radius={[0, 8, 8, 0]} />
            <ChartTooltip content={<ChartTooltipContent />} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  )
}

// Decision Section - Final Verdict
function DecisionVisualization() {
  const scoreData = [
    { metric: "Market Opportunity", score: 88, fullMark: 100 },
    { metric: "Competitive Advantage", score: 82, fullMark: 100 },
    { metric: "Execution Feasibility", score: 75, fullMark: 100 },
    { metric: "Financial Viability", score: 79, fullMark: 100 },
    { metric: "Growth Potential", score: 92, fullMark: 100 },
    { metric: "Team Fit", score: 85, fullMark: 100 },
  ]

  const overallScore = Math.round(
    scoreData.reduce((sum, item) => sum + item.score, 0) / scoreData.length
  )

  const chartConfig = {
    score: { label: "Score", color: "hsl(22, 98%, 56%)" },
  }

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-400"
    if (score >= 60) return "text-yellow-400"
    return "text-orange-400"
  }

  const getScoreLabel = (score: number) => {
    if (score >= 80) return "Strong Recommendation"
    if (score >= 60) return "Proceed with Caution"
    return "High Risk - Revise Strategy"
  }

  return (
    <div className="w-full space-y-6">
      {/* Overall Score */}
      <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20">
        <Award className="h-12 w-12 text-primary mb-3" />
        <div className="text-6xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-2">
          {overallScore}
        </div>
        <div className="text-sm text-gray-400 mb-1">Overall IdeaForge Score</div>
        <div className={`text-lg font-bold ${getScoreColor(overallScore)}`}>
          {getScoreLabel(overallScore)}
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/20 border border-primary/30">
          <Target className="h-4 w-4 text-primary" />
          <span className="text-sm font-semibold text-white">Detailed Score Breakdown</span>
        </div>
        <ChartContainer config={chartConfig} className="h-[280px] w-full">
          <RadarChart data={scoreData}>
            <PolarGrid stroke="rgba(255,255,255,0.1)" />
            <PolarAngleAxis 
              dataKey="metric" 
              tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 10 }}
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 100]}
              tick={{ fill: 'rgba(255,255,255,0.4)', fontSize: 10 }}
            />
            <Radar 
              name="Score" 
              dataKey="score" 
              stroke="hsl(22, 98%, 56%)" 
              fill="hsl(22, 98%, 56%)" 
              fillOpacity={0.4}
              strokeWidth={2}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
          </RadarChart>
        </ChartContainer>
      </div>

      {/* Score Legend */}
      <div className="grid grid-cols-3 gap-3">
        <div className="flex flex-col items-center gap-2 px-3 py-3 rounded-lg bg-green-500/10 border border-green-500/20">
          <div className="text-2xl font-bold text-green-400">80-100</div>
          <div className="text-xs text-gray-300 text-center">Strong</div>
        </div>
        <div className="flex flex-col items-center gap-2 px-3 py-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
          <div className="text-2xl font-bold text-yellow-400">60-79</div>
          <div className="text-xs text-gray-300 text-center">Moderate</div>
        </div>
        <div className="flex flex-col items-center gap-2 px-3 py-3 rounded-lg bg-orange-500/10 border border-orange-500/20">
          <div className="text-2xl font-bold text-orange-400">&lt;60</div>
          <div className="text-xs text-gray-300 text-center">Weak</div>
        </div>
      </div>
    </div>
  )
}
