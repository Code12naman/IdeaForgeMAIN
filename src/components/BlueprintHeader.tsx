import { Rocket, Sparkles } from 'lucide-react';

export function BlueprintHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 sm:px-8">
        <div className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <Rocket className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-primary font-headline">IdeaForge</span>
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Blueprint Engine</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <nav className="flex items-center gap-4 text-sm font-medium">
            <a href="/" className="transition-colors hover:text-primary">Home</a>
            <a href="/features" className="transition-colors hover:text-primary">Features</a>
            <a href="/about" className="transition-colors hover:text-primary">About</a>
          </nav>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold">
            <Sparkles className="h-3 w-3" />
            <span>AI Powered</span>
          </div>
        </div>
      </div>
    </header>
  );
}