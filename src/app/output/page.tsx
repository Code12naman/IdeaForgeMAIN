"use client"

import * as React from "react"
import { Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Loader2, BrainCircuit, LayoutGrid, Zap, ShieldCheck, Layers, Database, ArrowLeft, Rocket } from "lucide-react"
import { generateBlueprint, type BlueprintOutput } from "@/ai/flows/generate-blueprint"
import { BlueprintViewer } from "@/components/BlueprintViewer"
import { IdeaForm } from "@/components/IdeaForm"

const loadingSteps = [
  { icon: <BrainCircuit className="h-5 w-5" />, label: "Activating Idea Analyzer Agent..." },
  { icon: <LayoutGrid className="h-5 w-5" />, label: "Scoping Market Competition Data..." },
  { icon: <Zap className="h-5 w-5" />, label: "Modeling Revenue & Growth Strategies..." },
  { icon: <ShieldCheck className="h-5 w-5" />, label: "Running Risk Red-Team Simulation..." },
  { icon: <Layers className="h-5 w-5" />, label: "Architecting Tech Stack & Components..." },
  { icon: <Database className="h-5 w-5" />, label: "Finalizing Founder's Verdict..." },
]

function OutputContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const initialIdea = searchParams.get("idea") ?? ""

  const [blueprint, setBlueprint] = React.useState<BlueprintOutput | null>(null)
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [loadingStep, setLoadingStep] = React.useState(0)
  const [lastIdea, setLastIdea] = React.useState(initialIdea)
  const [error, setError] = React.useState<string | null>(null)

  const generate = React.useCallback(async (ideaText: string) => {
    if (!ideaText.trim()) return
    setIsGenerating(true)
    setLoadingStep(0)
    setLastIdea(ideaText)
    setBlueprint(null)
    setError(null)

    const stepInterval = setInterval(() => {
      setLoadingStep((prev) => (prev + 1) % loadingSteps.length)
    }, 3500)

    try {
      const result = await generateBlueprint({ businessIdea: ideaText })
      setBlueprint(result)
      localStorage.setItem("last_blueprint", JSON.stringify(result))
      localStorage.setItem("last_idea", ideaText)
    } catch (err) {
      console.error("Generation failed:", err)
      setError("Something went wrong. Please try again.")
    } finally {
      clearInterval(stepInterval)
      setIsGenerating(false)
    }
  }, [])

  React.useEffect(() => {
    if (initialIdea) generate(initialIdea)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialIdea])

  return (
    <div
      className="min-h-screen flex flex-col selection:bg-cyan-500/30"
      style={{ background: "linear-gradient(160deg, #080d1a 0%, #0b1628 50%, #080d1a 100%)" }}
    >
      {/* Header */}
      <header className="w-full px-6 md:px-12 py-4 flex items-center gap-4 border-b border-white/8 bg-[#080d1a]/80 backdrop-blur-md sticky top-0 z-50">
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-1.5 text-slate-400 hover:text-white text-sm font-medium transition-all group"
        >
          <ArrowLeft className="h-4 w-4 group-hover:-translate-x-0.5 transition-transform" />
          Back
        </button>
        <div className="w-px h-4 bg-white/10" />
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 flex items-center justify-center">
            <Rocket className="h-4 w-4 text-cyan-400" />
          </div>
          <span className="text-lg font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">IdeaForge</span>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center gap-8">
        {isGenerating ? (
          /* ── Loading state ── */
          <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 animate-in fade-in duration-500">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full scale-150 animate-pulse" />
              <div className="relative h-24 w-24 rounded-3xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center shadow-2xl">
                <Loader2 className="h-12 w-12 text-cyan-400 animate-spin" />
              </div>
            </div>
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-extrabold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Forging Your Blueprint...</h2>
              <div className="inline-flex items-center gap-3 justify-center px-6 py-3 rounded-full bg-white/5 border border-cyan-500/20 text-slate-300 font-semibold text-sm shadow-lg">
                {loadingSteps[loadingStep].icon}
                <span>{loadingSteps[loadingStep].label}</span>
              </div>
              <p className="text-sm text-slate-500 italic">Our AI agents are analyzing your idea right now.</p>
            </div>
          </div>
        ) : error ? (
          /* ── Error state ── */
          <div className="text-center space-y-4 mt-20">
            <p className="text-red-400 font-semibold">{error}</p>
            <button
              onClick={() => generate(lastIdea)}
              className="px-5 py-2.5 bg-cyan-500 text-slate-900 rounded-xl font-bold text-sm hover:bg-cyan-400 transition-all"
            >
              Try Again
            </button>
          </div>
        ) : blueprint ? (
          /* ── Results ── */
          <div className="w-full space-y-6 animate-in fade-in duration-700">
            {/* Re-submit bar */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 bg-white/[0.04] backdrop-blur-md border border-white/8 p-4 rounded-2xl shadow-xl shadow-black/20">
              <div className="flex items-center gap-3 shrink-0">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/20 flex items-center justify-center">
                  <BrainCircuit className="h-4 w-4 text-cyan-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">Refine or try a new idea</p>
                  <p className="text-xs text-slate-500">Adjust your prompt to explore a different strategy.</p>
                </div>
              </div>
              <div className="w-full">
                <IdeaForm onGenerate={generate} isLoading={isGenerating} />
              </div>
            </div>
            <BlueprintViewer blueprint={blueprint} originalIdea={lastIdea} />
          </div>
        ) : null}
      </main>
    </div>
  )
}

export default function OutputPage() {
  return (
    <Suspense
      fallback={
        <div
          className="min-h-screen flex items-center justify-center"
          style={{ background: "linear-gradient(135deg, #080d1a 0%, #0c1c34 55%, #08172b 100%)" }}
        >
          <Loader2 className="h-10 w-10 text-cyan-400 animate-spin" />
        </div>
      }
    >
      <OutputContent />
    </Suspense>
  )
}
