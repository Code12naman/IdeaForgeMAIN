"use client"

import { BlueprintHeader } from '@/components/BlueprintHeader'
import { Rocket, Sparkles, Target, Zap, Brain, Users, TrendingUp, Shield, Code, Lightbulb } from 'lucide-react'

export default function AboutPage() {
  const stats = [
    { value: "7", label: "AI Agents", icon: <Brain className="h-6 w-6" /> },
    { value: "<60s", label: "Generation Time", icon: <Zap className="h-6 w-6" /> },
    { value: "100%", label: "Comprehensive", icon: <Target className="h-6 w-6" /> },
    { value: "∞", label: "Ideas Supported", icon: <Lightbulb className="h-6 w-6" /> }
  ]

  const values = [
    {
      icon: <Sparkles className="h-7 w-7 text-cyan-400" />,
      title: "Innovation First",
      description: "We leverage the latest AI technology to help entrepreneurs transform ideas into reality with unprecedented speed and accuracy."
    },
    {
      icon: <Users className="h-7 w-7 text-cyan-400" />,
      title: "Founder Focused",
      description: "Built by entrepreneurs for entrepreneurs. We understand the challenges of turning an idea into a successful startup."
    },
    {
      icon: <Shield className="h-7 w-7 text-cyan-400" />,
      title: "Quality Guaranteed",
      description: "Every blueprint is generated using proven business frameworks and validated market research methodologies."
    },
    {
      icon: <TrendingUp className="h-7 w-7 text-cyan-400" />,
      title: "Continuous Improvement",
      description: "Our AI models are constantly learning and improving to provide even better insights and recommendations."
    }
  ]

  const howItWorks = [
    {
      step: "01",
      title: "Share Your Idea",
      description: "Enter your startup idea in 1-2 lines. Be as specific or broad as you like - our AI adapts to your input.",
      icon: <Lightbulb className="h-8 w-8" />
    },
    {
      step: "02",
      title: "AI Analysis",
      description: "Seven specialized AI agents simultaneously analyze your idea from multiple perspectives: market, finance, operations, technology, and more.",
      icon: <Brain className="h-8 w-8" />
    },
    {
      step: "03",
      title: "Blueprint Generation",
      description: "Our system synthesizes insights from all agents into a comprehensive, structured blueprint with actionable recommendations.",
      icon: <Code className="h-8 w-8" />
    },
    {
      step: "04",
      title: "Launch Ready",
      description: "Receive an investor-ready document complete with market analysis, financial projections, team structure, and go-to-market strategy.",
      icon: <Rocket className="h-8 w-8" />
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <BlueprintHeader />
      
      <main className="container mx-auto px-4 sm:px-8 py-16">
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-20 space-y-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Rocket className="h-8 w-8 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-semibold uppercase tracking-wider">About IdeaForge</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
            Turn Ideas Into{" "}
            <span className="text-cyan-400 drop-shadow-[0_0_24px_rgba(34,211,238,0.4)]">
              Action Plans
            </span>
          </h1>
          <p className="text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto">
            IdeaForge is an AI-powered platform that transforms your startup ideas into comprehensive, investor-ready blueprints in under 60 seconds. We combine cutting-edge artificial intelligence with proven business frameworks to help entrepreneurs validate, plan, and launch their ventures with confidence.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-24">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm text-center hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300"
            >
              <div className="flex justify-center mb-3 text-cyan-400">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-slate-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Mission Section */}
        <div className="max-w-4xl mx-auto mb-24">
          <div className="p-12 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
              Our Mission
            </h2>
            <p className="text-lg text-slate-300 leading-relaxed text-center mb-6">
              We believe every entrepreneur deserves access to world-class business planning tools, regardless of their budget or experience level. Our mission is to democratize startup planning by making professional-grade business analysis accessible to everyone.
            </p>
            <p className="text-lg text-slate-300 leading-relaxed text-center">
              IdeaForge eliminates the weeks of research, analysis, and planning traditionally required to create a comprehensive business plan. Instead, we deliver instant, actionable insights that help you make informed decisions and move faster from idea to execution.
            </p>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How IdeaForge Works
            </h2>
            <p className="text-lg text-slate-400">
              Our sophisticated AI pipeline transforms your idea into a complete blueprint in four simple steps.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {howItWorks.map((item, index) => (
              <div
                key={index}
                className="group p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:bg-cyan-500/20 transition-all">
                      {item.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold text-cyan-400 mb-2">
                      STEP {item.step}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {item.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-slate-400">
              The principles that guide everything we build and deliver.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div className="mb-4">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-slate-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Technology Section */}
        <div className="max-w-4xl mx-auto mb-24">
          <div className="p-12 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6 justify-center">
              <Brain className="h-8 w-8 text-cyan-400" />
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Powered by Advanced AI
              </h2>
            </div>
            <p className="text-lg text-slate-300 leading-relaxed mb-6">
              IdeaForge leverages Google's Gemini 2.5 Flash model, one of the most advanced large language models available. Our platform uses seven specialized AI agents, each trained to analyze different aspects of your business:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-300">
              <div className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span><strong>Market Analysis Agent:</strong> Evaluates market size, trends, and opportunities</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span><strong>Financial Modeling Agent:</strong> Creates revenue projections and cost structures</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span><strong>Competitive Analysis Agent:</strong> Maps competitive landscape and positioning</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span><strong>Product Strategy Agent:</strong> Defines features, roadmap, and development plan</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span><strong>Go-to-Market Agent:</strong> Designs customer acquisition and growth strategies</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span><strong>Risk Assessment Agent:</strong> Identifies challenges and mitigation strategies</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-cyan-400 mt-1">•</span>
                <span><strong>Team Planning Agent:</strong> Determines hiring needs and organizational structure</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="p-12 rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 backdrop-blur-sm">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Start Building?
            </h2>
            <p className="text-slate-300 mb-8 text-lg">
              Transform your startup idea into a comprehensive blueprint in less than 60 seconds.
            </p>
            <a
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-cyan-500 hover:bg-cyan-400 text-white font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] hover:scale-105"
            >
              <Rocket className="h-5 w-5" />
              Forge Your Blueprint
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
