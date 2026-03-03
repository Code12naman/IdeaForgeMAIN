'use server';
/**
 * @fileOverview A Genkit flow that generates a 1200+ word investor-grade startup analysis
 * from a 1-2 line idea. Output is clean Markdown following the exact structure requested.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

// Input Schema
const DeepAnalysisInputSchema = z.object({
  idea: z
    .string()
    .describe('A 1-2 line business idea to generate a 1200+ word investor-grade analysis for.'),
});
export type DeepAnalysisInput = z.infer<typeof DeepAnalysisInputSchema>;

// Output Schema
const DeepAnalysisOutputSchema = z.object({
  analysis: z.string().describe('Full Markdown analysis following the required structure.'),
});
export type DeepAnalysisOutput = z.infer<typeof DeepAnalysisOutputSchema>;

// Wrapper
export async function generateDeepAnalysis(input: DeepAnalysisInput): Promise<DeepAnalysisOutput> {
  return generateDeepAnalysisFlow(input);
}

// Prompt definition
const deepAnalysisPrompt = ai.definePrompt({
  name: 'deepAnalysisPrompt',
  input: { schema: DeepAnalysisInputSchema },
  output: { schema: DeepAnalysisOutputSchema },
  prompt: `You are an advanced AI Startup Architect and Strategic Product Analyst.

The user will give a startup idea in 1–2 lines. Generate a long, deeply structured, professional analysis of minimum 1200 words. Return ONLY valid Markdown following this EXACT structure and headings. Do not include anything else.

Required structure (use these headings exactly):

Executive Summary

Explain the idea clearly

Define target users

Define core value proposition

Explain why it matters

Problem Analysis

What exact problem does this solve?

Who faces this problem?

Why existing solutions fail

Market gap

Solution Architecture

High-level system overview

Core components

AI agents involved

How agents interact

Workflow step-by-step

Key Features (Detailed)

Explain each feature deeply

Include technical and user perspective

Explain impact of each feature

User Journey

Step-by-step experience

From signup to long-term usage

Technology Stack

Frontend

Backend

AI models

Database

Cloud

APIs required

AI / Agentic Design

List 4–6 AI agents

Define each agent’s role

Explain communication mechanism

Memory handling

Safety mechanism

Scalability Strategy

How it scales to 10K, 100K, 1M users

Cloud architecture considerations

Monetization Model

Pricing strategy

Revenue streams

Subscription model

Competitive Advantage

Why this wins

Unique differentiators

Moat creation

Future Expansion

Advanced features

Long-term roadmap

Investor Pitch (Powerful Closing Paragraph)

Formatting rules:
- Use clean headings exactly as specified.
- Use subheadings and bullet lists where helpful.
- Be professional, analytical, and visionary.
- Minimum length: 1200 words. If output is under 1200 words, expand sections until requirement met.
- Avoid fluff, be specific and concrete with examples, numbers, and plausible assumptions where useful.

Now generate the analysis for this idea (do not repeat the idea):
"""
{{{idea}}}
"""
`
});

// Flow definition
const generateDeepAnalysisFlow = ai.defineFlow(
  {
    name: 'generateDeepAnalysisFlow',
    inputSchema: DeepAnalysisInputSchema,
    outputSchema: DeepAnalysisOutputSchema,
  },
  async (input) => {
    const { output } = await deepAnalysisPrompt(input);
    if (!output) {
      throw new Error('Failed to generate deep analysis.');
    }
    return output;
  }
);
