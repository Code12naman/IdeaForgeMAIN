'use server';
/**
 * @fileOverview A Genkit flow for generating a structured startup blueprint.
 * Each sub-section is a separate schema field so the AI writes plain paragraphs
 * and the UI renders section headings from code — no text formatting required.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Input Schema
const IdeaSubmissionInputSchema = z.object({
  businessIdea: z
    .string()
    .describe('A 1-2 line business idea to generate a structured startup blueprint for.'),
});
export type IdeaSubmissionInput = z.infer<typeof IdeaSubmissionInputSchema>;

// Output Schema — each sub-section is its own field (plain paragraph, no headings needed)
const BlueprintOutputSchema = z.object({
  // Module 1: The Idea
  idea_simpleSummary:  z.string().describe("The Idea — Simple Summary: 4-5 sentences explaining the product clearly"),
  idea_mainBenefit:    z.string().describe("The Idea — Main Benefit: Why users deeply care. 2 short paragraphs (users + business side)"),
  idea_pitch:          z.string().describe("The Idea — The Pitch: 5-6 persuasive investor-pitch sentences"),
  // Module 2: The Crowd
  crowd_marketSize:    z.string().describe("The Crowd — Market Size: TAM / SAM / SOM with reasoning"),
  crowd_rivals:        z.string().describe("The Crowd — The Rivals: 2-3 top competitors, 2-3 lines each"),
  crowd_edge:          z.string().describe("The Crowd — Our Edge: specific differentiation that is hard to copy"),
  // Module 3: The Plan
  plan_goToMarket:     z.string().describe("The Plan — Go-To-Market First 90 Days: step-by-step launch strategy"),
  plan_channels:       z.string().describe("The Plan — Partnerships & Channels: key distribution channels and partners"),
  plan_milestones:     z.string().describe("The Plan — Milestones: 3-5 concrete milestones with realistic timeframes"),
  // Module 4: The Warning
  warning_biggestRisk: z.string().describe("The Warning — Biggest Risk: the single greatest risk and why it matters"),
  warning_mitigation:  z.string().describe("The Warning — How to Mitigate: concrete steps to reduce the risk"),
  warning_redFlags:    z.string().describe("The Warning — Red Flags to Watch: 2-3 early warning signs founders must track"),
  // Module 5: Profit
  profit_revenueModel: z.string().describe("Profit — Revenue Model: exactly how the business makes money"),
  profit_unitEcon:     z.string().describe("Profit — Unit Economics: CAC, LTV, gross margin estimates"),
  profit_profitPath:   z.string().describe("Profit — Path to Profitability: realistic timeline and the key triggers"),
  // Module 6: Growth
  growth_loops:        z.string().describe("Growth — Growth Loops: core viral or compounding growth mechanism"),
  growth_channels:     z.string().describe("Growth — Marketing Channels: top 3 channels with clear reasoning"),
  growth_scaling:      z.string().describe("Growth — Scaling Strategy: how to 10x revenue without breaking operations"),
  // Module 7: Decision
  decision_verdict:    z.string().describe("Decision — Verdict: strong GO or NO-GO with clear reasoning"),
  decision_founderFit: z.string().describe("Decision — Founder Fit Score X/10: why this founder is or isn't suited"),
  decision_oneThing:   z.string().describe("Decision — The One Thing: the single most important action to take this week"),
});
export type BlueprintOutput = z.infer<typeof BlueprintOutputSchema>;

// Wrapper function
export async function generateBlueprint(
  input: IdeaSubmissionInput
): Promise<BlueprintOutput> {
  return generateBlueprintFlow(input);
}

// Prompt definition
const blueprintPrompt = ai.definePrompt({
  name: 'blueprintGeneratorPrompt',
  input: {schema: IdeaSubmissionInputSchema},
  output: {schema: BlueprintOutputSchema},
  prompt: `You are IdeaForge, a world-class Startup Architect.

Analyze this business idea: "{{{businessIdea}}}"

Fill every JSON output field with focused, expert content.

RULES:
- Write 3-6 plain sentences per field. No bullet points. No sub-headings. Just clear paragraphs.
- Be specific, actionable, and use real numbers / examples where possible.
- Each field's description tells you exactly what to cover — follow it precisely.
- Do NOT repeat the field label or add any heading inside the text.
`,
});

// Flow definition
const generateBlueprintFlow = ai.defineFlow(
  {
    name: 'generateBlueprintFlow',
    inputSchema: IdeaSubmissionInputSchema,
    outputSchema: BlueprintOutputSchema,
  },
  async (input) => {
    const {output} = await blueprintPrompt(input);
    if (!output) {
      throw new Error('Failed to generate blueprint output.');
    }
    return output;
  }
);
