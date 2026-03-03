"use client"

import * as React from "react"
import { BarChart2, Users, Clipboard, Settings2, Share2 } from "lucide-react"
import { BlueprintHeader } from "@/components/BlueprintHeader"

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-blue-50 text-foreground selection:bg-accent/30">
      <BlueprintHeader />

      <main className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Sidebar */}
          <aside className="md:col-span-3 bg-white rounded-2xl shadow-lg p-6 sticky top-24">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-10 w-10 rounded-lg bg-sky-50 flex items-center justify-center text-sky-600 font-bold">IF</div>
              <div>
                <div className="text-sm font-semibold">IdeaForge</div>
                <div className="text-xs text-slate-500">Dashboard</div>
              </div>
            </div>

            <nav className="space-y-2">
              <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50" href="#">
                <BarChart2 className="h-5 w-5 text-slate-600" />
                <span className="text-sm font-medium">Overview</span>
              </a>
              <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50" href="#">
                <Users className="h-5 w-5 text-slate-600" />
                <span className="text-sm font-medium">Teams</span>
              </a>
              <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50" href="#">
                <Clipboard className="h-5 w-5 text-slate-600" />
                <span className="text-sm font-medium">Blueprints</span>
              </a>
              <a className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50" href="#">
                <Settings2 className="h-5 w-5 text-slate-600" />
                <span className="text-sm font-medium">Settings</span>
              </a>
            </nav>

            <div className="mt-6">
              <button className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 bg-sky-600 text-white rounded-lg shadow-lg hover:brightness-95 transition">
                <Share2 className="h-4 w-4" /> Share Workspace
              </button>
            </div>
          </aside>

          {/* Main content */}
          <section className="md:col-span-9 space-y-6">
            <div className="rounded-2xl bg-white shadow-lg p-6 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold">Welcome back</h2>
                <p className="text-sm text-slate-600">Your recent blueprints and activity summary.</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="py-2 px-4 bg-white border rounded-lg shadow-sm hover:shadow-md">New Blueprint</button>
                <button className="py-2 px-4 bg-sky-600 text-white rounded-lg shadow-lg hover:brightness-95">Import Idea</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <div className="text-sm text-slate-500">Total Blueprints</div>
                <div className="text-2xl font-bold mt-2">128</div>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <div className="text-sm text-slate-500">Active Projects</div>
                <div className="text-2xl font-bold mt-2">21</div>
              </div>
              <div className="rounded-2xl bg-white p-6 shadow-lg">
                <div className="text-sm text-slate-500">Avg. Strength Score</div>
                <div className="text-2xl font-bold mt-2">72</div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Recent Blueprints</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg border bg-slate-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold">AI friend for kids</div>
                      <div className="text-sm text-slate-500">Generated 2 days ago</div>
                    </div>
                    <div className="text-sm text-slate-600">Score: 74</div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border bg-slate-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold">Micro-learning platform</div>
                      <div className="text-sm text-slate-500">Generated 1 week ago</div>
                    </div>
                    <div className="text-sm text-slate-600">Score: 68</div>
                  </div>
                </div>

                <div className="p-4 rounded-lg border bg-slate-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold">Personalized news curator</div>
                      <div className="text-sm text-slate-500">Generated 2 weeks ago</div>
                    </div>
                    <div className="text-sm text-slate-600">Score: 63</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Workspace Activity</h3>
              <div className="text-sm text-slate-600">No recent activity to show. Create a new blueprint to get started.</div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}
