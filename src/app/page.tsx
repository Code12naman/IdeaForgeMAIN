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
      className="min-h-screen flex flex-col selection:bg-primary/30"
      style={{ background: "linear-gradient(135deg, #1B1B1B 0%, #323232 55%, #1B1B1B 100%)" }}
    >
      {/* Navbar */}
      <header className="w-full px-6 md:px-12 py-5 flex items-center justify-between border-b border-white/10">
        <div className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center">
            <Rocket className="h-5 w-5 text-primary" />
          </div>
          <span className="text-xl font-bold text-primary tracking-tight">IdeaForge</span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm text-gray-400 font-medium">
          <a href="/" className="text-white hover:text-primary transition-colors">Home</a>
          <a href="/features" className="hover:text-white transition-colors">Features</a>
          <a href="/about" className="hover:text-white transition-colors">About</a>
        </nav>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary/20 border border-secondary/40 text-white text-xs font-semibold">
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
            <span className="text-primary drop-shadow-[0_0_24px_rgba(252,110,32,0.5)]">
              Startup
            </span>{" "}
            Blueprint.
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-xl mx-auto leading-relaxed">
            Share your 1-2 line idea. Our seven AI agents instantly build a
            comprehensive, investor-ready blueprint in seconds.
          </p>
          <button
            type="button"
            onClick={() => document.getElementById("idea-input")?.focus()}
            className="mt-1 px-6 py-2.5 rounded-full border border-white/20 text-gray-400 text-sm hover:bg-white/10 hover:text-white transition-all"
          >
            Try With Demo →
          </button>
        </div>

        {/* Input card */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#323232]/60 backdrop-blur-md shadow-[0_8px_48px_rgba(252,110,32,0.15)] p-5 space-y-4 animate-in fade-in slide-in-from-bottom-8 duration-1000"
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sm font-semibold text-primary">
              <Rocket className="h-4 w-4" />
              IdeaForge
            </span>
            <span className="text-xs text-gray-400">Enter your idea below</span>
          </div>

          <textarea
            id="idea-input"
            rows={4}
            className="w-full bg-[#1B1B1B]/80 border border-white/10 rounded-xl p-4 text-white placeholder-gray-500 text-base resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/40 transition-all leading-relaxed"
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
            <span className="text-xs text-gray-400">
              Press <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-gray-300 font-mono text-xs">Enter</kbd> or click Forge
            </span>
            <button
              type="submit"
              disabled={!idea.trim()}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/80 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm transition-all shadow-lg shadow-primary/25"
            >
              Forge Blueprint
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </form>

        {/* Feature chips */}
        <div className="flex flex-wrap items-center justify-center gap-3 animate-in fade-in duration-1000">
          {[
            { icon: <Zap className="h-4 w-4 text-primary" />, label: "Rapid Ideation" },
            { icon: <ShieldCheck className="h-4 w-4 text-primary" />, label: "Risk Analysis" },
            { icon: <LayoutGrid className="h-4 w-4 text-primary" />, label: "Tech Architecture" },
            { icon: <Users className="h-4 w-4 text-primary" />, label: "Market Insight" },
          ].map((f, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-[#323232]/50 text-gray-300 text-xs font-medium"
            >
              {f.icon}
              {f.label}
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full px-8 py-5 border-t border-white/10 flex items-center justify-between text-xs text-gray-500">
        <span>IdeaForge © 2026</span>
        <div className="flex gap-6">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Support</a>
        </div>
      </footer>
    </div>
  )
}
