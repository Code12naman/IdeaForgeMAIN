import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { cn } from "@/lib/utils"

interface MarkdownRendererProps {
  content: string
  className?: string
}

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  // Simple normalization — AI now writes plain paragraphs, headings come from UI code
  const normalized = content
    .replace(/\\r\\n/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\\t/g, "\t")
    .replace(/\\r/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim()

  return (
    <div
      className={cn(
        "prose prose-invert max-w-none",
        // Headings
        "prose-headings:text-white prose-headings:font-bold prose-headings:tracking-tight",
        // Body text
        "prose-p:text-slate-300 prose-p:leading-relaxed",
        // Lists
        "prose-li:text-slate-300 prose-ul:text-slate-300 prose-ol:text-slate-300",
        // Strong / emphasis
        "prose-strong:text-white prose-em:text-slate-200",
        // Links
        "prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline",
        // Code
        "prose-code:text-cyan-300 prose-code:bg-white/8 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-mono prose-code:text-xs",
        "prose-pre:bg-[#0a1628] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl",
        // HR / blockquote
        "prose-hr:border-white/10",
        "prose-blockquote:border-l-cyan-500/50 prose-blockquote:text-slate-400",
        // Tables
        "prose-th:text-white prose-td:text-slate-300 prose-thead:border-white/10 prose-tbody:divide-white/5",
        className
      )}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{normalized}</ReactMarkdown>
    </div>
  )
}
