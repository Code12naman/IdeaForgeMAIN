"use client"

import { BlueprintHeader } from '@/components/BlueprintHeader'
import { Rocket, Sparkles, Zap, ShieldCheck, Brain, BarChart3, FileText, Target, Lightbulb, Users } from 'lucide-react'

export default function FeaturesPage() {
  const features = [
    {
      icon: <Brain className="h-8 w-8 text-cyan-400" />,
      title: "AI-Powered Blueprint Generation",
      description: "Seven specialized AI agents work together to analyze your idea and create a comprehensive startup blueprint in seconds. Each agent focuses on a specific aspect of your business plan."
    },
    {
      icon: <Zap className="h-8 w-8 text-cyan-400" />,
      title: "Lightning Fast Results",
      description: "Get your complete startup blueprint in under 60 seconds. Our optimized AI pipeline processes your idea through multiple analysis layers simultaneously for maximum efficiency."
    },
    {
      icon: <Target className="h-8 w-8 text-cyan-400" />,
      title: "Market Analysis",
      description: "Receive detailed market research including target audience demographics, market size estimation, competitive landscape analysis, and growth opportunities."
    },
    {
      icon: <BarChart3 className="h-8 w-8 text-cyan-400" />,
      title: "Financial Projections",
      description: "Get comprehensive financial forecasts including revenue models, cost structures, break-even analysis, and 3-year financial projections tailored to your business model."
    },
    {
      icon: <Users className="h-8 w-8 text-cyan-400" />,
      title: "Team & Resource Planning",
      description: "Understand exactly what team members you need, when to hire them, and what resources are required to execute your vision effectively."
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-cyan-400" />,
      title: "Risk Assessment",
      description: "Identify potential risks and challenges before they become problems. Our AI analyzes market, operational, financial, and technical risks with mitigation strategies."
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-cyan-400" />,
      title: "Innovation Insights",
      description: "Discover unique value propositions, competitive advantages, and innovative approaches that can set your startup apart in the market."
    },
    {
      icon: <FileText className="h-8 w-8 text-cyan-400" />,
      title: "Investor-Ready Documentation",
      description: "Generate professional documentation formatted for investor presentations, including executive summaries, pitch deck content, and detailed business plans."
    },
    {
      icon: <Rocket className="h-8 w-8 text-cyan-400" />,
      title: "Go-to-Market Strategy",
      description: "Receive actionable strategies for launching your product, acquiring customers, and scaling your business from day one to profitability."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <BlueprintHeader />
      
      <main className="container mx-auto px-4 sm:px-8 py-16">
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles className="h-6 w-6 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">Features</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white leading-tight">
            Everything You Need to{" "}
            <span className="text-cyan-400 drop-shadow-[0_0_24px_rgba(34,211,238,0.4)]">
              Launch Your Startup
            </span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed">
            IdeaForge combines cutting-edge AI technology with proven business frameworks to transform your idea into a comprehensive, actionable blueprint.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300 hover:shadow-[0_0_40px_rgba(34,211,238,0.15)]"
            >
              <div className="mb-5 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-24 text-center max-w-2xl mx-auto">
          <div className="p-12 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Forge Your Blueprint?
            </h2>
            <p className="text-slate-300 mb-8 text-lg">
              Join thousands of founders who have turned their ideas into actionable plans.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:scale-105"
            >
              <Rocket className="h-5 w-5" />
              Start Forging Now
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
