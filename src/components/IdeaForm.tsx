"use client"

import * as React from "react"
import { Sparkles, ArrowRight, RefreshCw, Lightbulb } from "lucide-react"
import { refineIdeaPrompt, type RefineIdeaPromptOutput } from "@/ai/flows/refine-idea-prompt"

interface IdeaFormProps {
  onGenerate: (idea: string) => void
  isLoading: boolean
}

export function IdeaForm({ onGenerate, isLoading }: IdeaFormProps) {
  const [idea, setIdea] = React.useState("")
  const [refinement, setRefinement] = React.useState<RefineIdeaPromptOutput | null>(null)
  const [isRefining, setIsRefining] = React.useState(false)

  const handleRefine = async () => {
    if (!idea.trim() || isRefining) return
    setIsRefining(true)
    try {
      const result = await refineIdeaPrompt({ ideaPrompt: idea })
      setRefinement(result)
    } catch (error) {
      console.error("Refinement error:", error)
    } finally {
      setIsRefining(false)
    }
  }

  const useRefined = () => {
    if (refinement) {
      setIdea(refinement.refinedIdeaPrompt)
      setRefinement(null)
    }
  }

  return (
    <div className="space-y-4 w-full">
      {/* Textarea box */}
      <div className="relative">
        <textarea
          rows={4}
          placeholder="Describe your 1-2 line business idea here... (e.g., 'A subscription-based healthy meal kit for busy developers')"
          className="w-full bg-[#0d1f38] border border-white/10 rounded-2xl p-5 pb-16 text-white placeholder-slate-500 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/40 transition-all leading-relaxed"
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault()
              if (idea.trim() && !isLoading) onGenerate(idea)
            }
          }}
        />
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button
            type="button"
            onClick={handleRefine}
            disabled={!idea.trim() || isRefining || isLoading}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isRefining ? (
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            )}
            Refine Idea
          </button>
          <button
            type="button"
            onClick={() => onGenerate(idea)}
            disabled={!idea.trim() || isLoading}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 text-xs font-bold transition-all shadow-lg shadow-cyan-500/20 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
          >
            {isLoading ? (
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <ArrowRight className="h-3.5 w-3.5" />
            )}
            Forge Blueprint
          </button>
        </div>
      </div>

      {/* Refinement card */}
      {refinement && (
        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-5 space-y-4 animate-in fade-in slide-in-from-top-3 duration-400">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-bold text-cyan-400">
              <Lightbulb className="h-4 w-4" />
              Prompt Analysis
            </span>
            <span className="px-2.5 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300 text-xs font-semibold">
              Clarity {refinement.score}/10
            </span>
          </div>

          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Expert Feedback</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
              {refinement.feedback.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-3 border-t border-white/8 space-y-2">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Recommended Refinement</p>
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/8 italic text-slate-300 text-sm">
              &ldquo;{refinement.refinedIdeaPrompt}&rdquo;
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setRefinement(null)}
                className="px-3 py-1.5 rounded-lg text-slate-500 hover:text-slate-300 text-xs font-medium transition-colors"
              >
                Dismiss
              </button>
              <button
                type="button"
                onClick={useRefined}
                className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-900 text-xs font-bold transition-all"
              >
                Use This Prompt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
