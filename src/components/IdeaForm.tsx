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
          className="w-full bg-[#1B1B1B]/80 border border-white/10 rounded-2xl p-5 pb-16 text-white placeholder-gray-500 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/40 transition-all leading-relaxed"
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
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 bg-[#323232]/60 hover:bg-[#323232] text-gray-400 hover:text-white text-xs font-medium transition-all disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isRefining ? (
              <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            ) : (
              <Sparkles className="h-3.5 w-3.5 text-primary" />
            )}
            Refine Idea
          </button>
          <button
            type="button"
            onClick={() => onGenerate(idea)}
            disabled={!idea.trim() || isLoading}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary hover:bg-primary/80 text-white text-xs font-bold transition-all shadow-lg shadow-primary/20 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
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
        <div className="rounded-2xl border border-primary/30 bg-primary/10 p-5 space-y-4 animate-in fade-in slide-in-from-top-3 duration-400">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-bold text-primary">
              <Lightbulb className="h-4 w-4" />
              Prompt Analysis
            </span>
            <span className="px-2.5 py-1 rounded-full border border-primary/40 bg-primary/20 text-white text-xs font-semibold">
              Clarity {refinement.score}/10
            </span>
          </div>

          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Expert Feedback</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-1.5">
              {refinement.feedback.map((point, i) => (
                <li key={i} className="flex items-start gap-2 text-xs text-gray-200">
                  <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-3 border-t border-white/10 space-y-2">
            <p className="text-xs font-semibold text-gray-300 uppercase tracking-wider">Recommended Refinement</p>
            <div className="p-3.5 rounded-xl bg-[#323232]/70 border border-white/10 italic text-white text-sm">
              &ldquo;{refinement.refinedIdeaPrompt}&rdquo;
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setRefinement(null)}
                className="px-3 py-1.5 rounded-lg text-gray-400 hover:text-white text-xs font-medium transition-colors"
              >
                Dismiss
              </button>
              <button
                type="button"
                onClick={useRefined}
                className="px-4 py-1.5 rounded-lg bg-primary hover:bg-primary/80 text-white text-xs font-bold transition-all"
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
