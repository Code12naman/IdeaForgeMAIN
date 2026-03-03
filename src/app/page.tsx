"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Rocket, Sparkles, ArrowRight, Zap, ShieldCheck, LayoutGrid, Users } from "lucide-react"

export default function LandingPage() {
  const router = useRouter()
  const [idea, setIdea] = React.useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!idea.trim()) return
    router.push(`/output?idea=${encodeURIComponent(idea.trim())}`)
  }

  return (
    <div
      className="min-h-screen flex flex-col selection:bg-cyan-500/30"
      style={{ background: "linear-gradient(135deg, #080d1a 0%, #0c1c34 55%, #08172b 100%)" }}
    >
      {/* Navbar */}
      <header className="w-full px-6 md:px-12 py-5 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center">
            <Rocket className="h-5 w-5 text-cyan-400" />
          </div>
          <span className="text-xl font-bold text-cyan-400 tracking-tight">IdeaForge</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-slate-400 font-medium">
          <a href="#" className="text-white hover:text-cyan-400 transition-colors">Home</a>
          <a href="#" className="hover:text-white transition-colors">Features</a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
        </nav>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold">
            <Sparkles className="h-3 w-3" />
            <span>AI Powered</span>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="flex-grow flex flex-col items-center justify-center px-4 gap-14 py-16">
        <div className="text-center space-y-5 max-w-3xl animate-in fade-in slide-in-from-bottom-6 duration-700">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-white leading-[1.1]">
            Forge Your{" "}
            <span className="text-cyan-400 drop-shadow-[0_0_24px_rgba(34,211,238,0.4)]">
              Startup
            </span>{" "}
            Blueprint.
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-xl mx-auto leading-relaxed">
            Share your 1-2 line idea. Our seven AI agents instantly build a
            comprehensive, investor-ready blueprint in seconds.
          </p>
          <button
            type="button"
            onClick={() => document.getElementById("idea-input")?.focus()}
            className="mt-1 px-6 py-2.5 rounded-full border border-white/20 text-white/70 text-sm hover:bg-white/10 hover:text-white transition-all"
          >
            Try With Demo →
          </button>
        </div>

        {/* Input card */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md shadow-[0_8px_48px_rgba(0,0,0,0.5)] p-5 space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000"
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sm font-semibold text-cyan-400">
              <Rocket className="h-4 w-4" />
              IdeaForge
            </span>
            <span className="text-xs text-slate-500">Enter your idea below</span>
          </div>

          <textarea
            id="idea-input"
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder-slate-500 text-base resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/40 transition-all leading-relaxed"
            placeholder="Describe your startup idea in 1-2 lines...  e.g. 'A subscription healthy meal kit for busy developers'"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                if (idea.trim()) router.push(`/output?idea=${encodeURIComponent(idea.trim())}`)
              }
            }}
          />

          <div className="flex items-center justify-between gap-3">
            <span className="text-xs text-slate-600">
              Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-slate-400 font-mono text-xs">Enter</kbd> or click Forge
            </span>
            <button
              type="submit"
              disabled={!idea.trim()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-slate-900 font-bold text-sm transition-all shadow-lg shadow-cyan-500/25"
            >
              Forge Blueprint
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>

        {/* Feature chips */}
        <div className="flex flex-wrap items-center justify-center gap-3 animate-in fade-in duration-1000">
          {[
            { icon: <Zap className="h-4 w-4 text-cyan-400" />, label: "Rapid Ideation" },
            { icon: <ShieldCheck className="h-4 w-4 text-cyan-400" />, label: "Risk Analysis" },
            { icon: <LayoutGrid className="h-4 w-4 text-cyan-400" />, label: "Tech Architecture" },
            { icon: <Users className="h-4 w-4 text-cyan-400" />, label: "Market Insight" },
          ].map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-slate-400 text-xs font-medium"
            >
              {f.icon}
              {f.label}
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-8 py-5 border-t border-white/5 flex items-center justify-between text-xs text-slate-600">
        <span>IdeaForge © 2026</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-slate-400 transition-colors">Privacy</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Terms</a>
          <a href="#" className="hover:text-slate-400 transition-colors">Support</a>
        </div>
      </footer>
    </div>
  )
}
