"use client"

import * as React from "react"
import { Download, FileText, CheckCircle2, ChevronRight, Share2 } from "lucide-react"
import { MarkdownRenderer } from "./MarkdownRenderer"
import { BlueprintVisualization } from "./BlueprintVisualizations"
import { type BlueprintOutput } from "@/ai/flows/generate-blueprint"

interface BlueprintViewerProps {
  blueprint: BlueprintOutput
  originalIdea: string
}

// Each module defines: display info + the sub-sections (label + blueprint key)
const MODS = (blueprint: BlueprintOutput) => [
  {
    id: "idea", label: "The Idea", icon: "💡",
    headerGrad: "from-[#FFE7D0]/20 via-transparent to-transparent", dotColor: "bg-secondary",
    sections: [
      { label: "Simple Summary",  text: blueprint.idea_simpleSummary },
      { label: "The Main Benefit", text: blueprint.idea_mainBenefit },
      { label: "The Pitch",        text: blueprint.idea_pitch },
    ],
  },
  {
    id: "crowd", label: "The Crowd", icon: "👥",
    headerGrad: "from-primary/20 via-transparent to-transparent", dotColor: "bg-primary",
    sections: [
      { label: "How Many People?", text: blueprint.crowd_marketSize },
      { label: "The Rivals",       text: blueprint.crowd_rivals },
      { label: "Our Edge",         text: blueprint.crowd_edge },
    ],
  },
  {
    id: "plan", label: "The Plan", icon: "🗺️",
    headerGrad: "from-secondary/20 via-transparent to-transparent", dotColor: "bg-secondary",
    sections: [
      { label: "Go-To-Market: First 90 Days", text: blueprint.plan_goToMarket },
      { label: "Partnerships & Channels",     text: blueprint.plan_channels },
      { label: "Milestones",                   text: blueprint.plan_milestones },
    ],
  },
  {
    id: "warning", label: "The Warning", icon: "⚠️",
    headerGrad: "from-primary/15 via-transparent to-transparent", dotColor: "bg-primary",
    sections: [
      { label: "Biggest Risk",      text: blueprint.warning_biggestRisk },
      { label: "How to Mitigate",   text: blueprint.warning_mitigation },
      { label: "Red Flags to Watch", text: blueprint.warning_redFlags },
    ],
  },
  {
    id: "profit", label: "Profit", icon: "💰",
    headerGrad: "from-secondary/20 via-transparent to-transparent", dotColor: "bg-secondary",
    sections: [
      { label: "Revenue Model",         text: blueprint.profit_revenueModel },
      { label: "Unit Economics",         text: blueprint.profit_unitEcon },
      { label: "Path to Profitability",  text: blueprint.profit_profitPath },
    ],
  },
  {
    id: "growth", label: "Growth", icon: "🚀",
    headerGrad: "from-secondary/15 via-transparent to-transparent", dotColor: "bg-secondary",
    sections: [
      { label: "Growth Loops",       text: blueprint.growth_loops },
      { label: "Marketing Channels", text: blueprint.growth_channels },
      { label: "Scaling Strategy",   text: blueprint.growth_scaling },
    ],
  },
  {
    id: "decision", label: "Decision", icon: "🏆",
    headerGrad: "from-primary/20 via-transparent to-transparent", dotColor: "bg-primary",
    sections: [
      { label: "Verdict",           text: blueprint.decision_verdict },
      { label: "Founder Fit Score", text: blueprint.decision_founderFit },
      { label: "The One Thing",     text: blueprint.decision_oneThing },
    ],
  },
]

export function BlueprintViewer({ blueprint, originalIdea }: BlueprintViewerProps) {
  const [activeTab, setActiveTab] = React.useState("idea")
  const [animKey, setAnimKey] = React.useState(0)
  const mods = MODS(blueprint)
  const active = mods.find((m) => m.id === activeTab)!

  const switchTab = (id: string) => {
    setActiveTab(id)
    setAnimKey((k) => k + 1)
  }

  const exportMarkdown = () => {
    const fullReport = `# IdeaForge Startup Blueprint: ${originalIdea}\n\n${mods
      .map((m) =>
        `## ${m.icon} ${m.label}\n\n` +
        m.sections.map((s) => `### ${s.label}\n\n${s.text || ""}`).join("\n\n")
      )
      .join("\n\n")}`.trim()
    const blob = new Blob([fullReport], { type: "text/markdown" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `ideaforge-blueprint-${Date.now()}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="w-full space-y-8 animate-in fade-in duration-700">

      {/* ── Title bar ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 pb-7 border-b border-white/10">
        <div className="space-y-1.5">
          <h2 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Startup Architect Plan
          </h2>
          <p className="flex items-start gap-2 text-gray-300 text-sm">
            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
            <span>
              <span>Ready for:&nbsp;</span>
              <span className="italic text-white font-medium">
                &ldquo;{originalIdea}&rdquo;
              </span>
            </span>
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          {/* Share button */}
          <button className="group flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 bg-[#323232]/60 backdrop-blur hover:bg-[#323232] hover:border-white/20 hover:scale-[1.03] active:scale-95 text-white text-sm font-medium transition-all duration-200 shadow-lg shadow-primary/10">
            <Share2 className="h-4 w-4 group-hover:text-primary transition-colors" />
            Share
          </button>
          {/* Export button */}
          <button
            onClick={exportMarkdown}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary hover:bg-primary/80 hover:scale-[1.03] active:scale-95 text-white text-sm font-bold transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-primary/40"
          >
            <Download className="h-4 w-4" />
            Export Markdown
          </button>
        </div>
      </div>

      {/* ── Tab bar ── */}
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-wrap items-center justify-center gap-1 p-1.5 rounded-2xl bg-[#1B1B1B]/80 backdrop-blur-md border border-white/5 shadow-inner shadow-black/20">
          {mods.map((m) => (
            <button
              key={m.id}
              onClick={() => switchTab(m.id)}
              className={`relative flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${
                activeTab === m.id
                  ? "bg-primary text-white shadow-lg shadow-primary/30 scale-[1.04]"
                  : "text-gray-400 hover:text-white hover:bg-[#1B1B1B]/80 hover:scale-[1.02]"
              }`}
            >
              <span className="text-base leading-none">{m.icon}</span>
              <span>{m.label}</span>
              {activeTab === m.id && (
                <span className="absolute inset-0 rounded-xl ring-1 ring-primary/40 pointer-events-none" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Main content grid ── */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-7">

        {/* ── Quick Links sidebar ── */}
        <div className="lg:col-span-1">
          <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#323232]/60 backdrop-blur-md shadow-xl shadow-primary/10 sticky top-24">
            {/* Sidebar header */}
            <div className="flex items-center gap-2.5 px-5 py-4 bg-gradient-to-r from-primary/20 to-secondary/15 border-b border-white/10">
              <FileText className="h-4 w-4 text-primary shrink-0" />
              <span className="font-bold text-white text-sm tracking-wide">Quick Links</span>
            </div>
            {/* Sidebar items */}
            <div className="divide-y divide-white/5">
              {mods.map((m) => (
                <button
                  key={m.id}
                  onClick={() => switchTab(m.id)}
                  className={`w-full flex items-center justify-between px-5 py-4 text-sm font-medium transition-all duration-200 text-left group hover:-translate-y-px ${
                    activeTab === m.id
                      ? "bg-gradient-to-r from-primary/15 to-transparent border-l-2 border-primary text-white pl-[18px]"
                      : "text-gray-400 hover:bg-[#1B1B1B]/40 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-base leading-none">{m.icon}</span>
                    <span>{m.label}</span>
                  </span>
                  <ChevronRight
                    className={`h-4 w-4 transition-all duration-200 ${
                      activeTab === m.id
                        ? "text-primary translate-x-0.5"
                        : "text-gray-600 group-hover:text-gray-400 group-hover:translate-x-0.5"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Content panel ── */}
        <div className="lg:col-span-3">
          {/* Outer glow wrapper */}
          <div className="rounded-3xl p-px bg-gradient-to-br from-primary/30 via-secondary/20 to-primary/20 shadow-[0_0_80px_rgba(252,110,32,0.15)] shadow-primary/10">
            <div
              key={animKey}
              className="rounded-3xl overflow-hidden bg-[#1B1B1B]/95 backdrop-blur-sm animate-in fade-in slide-in-from-bottom-3 duration-350"
            >
              {/* Panel header */}
              <div className={`flex items-start gap-5 px-8 py-7 border-b border-white/10 bg-gradient-to-r ${active.headerGrad} bg-[#1B1B1B]/40`}>
                {/* Icon circle */}
                <div className="h-14 w-14 rounded-2xl bg-[#1B1B1B]/80 border border-white/10 flex items-center justify-center text-3xl shadow-lg shrink-0">
                  {active.icon}
                </div>
                <div className="space-y-1 pt-1">
                  <h3 className="text-xl font-bold text-white tracking-tight">{active.label} Section</h3>
                  <p className="text-sm text-gray-400">Detailed advice from IdeaForge</p>
                </div>
                {/* Dot indicator */}
                <div className="ml-auto flex items-center gap-1.5 pt-1">
                  <span className={`h-2 w-2 rounded-full ${active.dotColor} shadow-sm shadow-current animate-pulse`} />
                  <span className="text-xs text-gray-400 font-medium">Live Analysis</span>
                </div>
              </div>

              {/* Panel body */}
              <div className="p-8 md:p-10 ideaforge-scroll overflow-y-auto max-h-[620px] space-y-10">
                {active.sections.map((section, i) => (
                  <div key={i} className="space-y-3">
                    {/* Section heading — always rendered from code, never from AI text */}
                    <div className="flex items-center gap-3">
                      <div className="h-px flex-1 bg-white/10" />
                      <h4 className="text-primary font-bold text-sm uppercase tracking-widest whitespace-nowrap">
                        {section.label}
                      </h4>
                      <div className="h-px flex-1 bg-white/10" />
                    </div>
                    {/* Plain paragraph content — AI just writes text, no heading needed */}
                    <MarkdownRenderer content={section.text || "*Generating...*"} />
                  </div>
                ))}
                
                {/* Visual Representation - After Text */}
                <div className="mt-8">
                  <BlueprintVisualization sectionId={activeTab} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
