'use server';
/**
 * @fileOverview An AI assistant that helps refine and optimize business idea prompts for clearer and more effective blueprint generation.
 *
 * - refineIdeaPrompt - A function that handles the prompt refinement process.
 * - RefineIdeaPromptInput - The input type for the refineIdeaPrompt function.
 * - RefineIdeaPromptOutput - The return type for the refineIdeaPrompt function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * Retry with exponential backoff for rate limits
 */
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      const isRateLimit = 
        error?.message?.includes('RESOURCE_EXHAUSTED') ||
        error?.message?.includes('429') ||
        error?.message?.includes('Quota exceeded');
      
      if (!isRateLimit || i === maxRetries - 1) throw error;
      
      const delayMatch = error?.message?.match(/retry in ([\d.]+)s/);
      const delay = delayMatch 
        ? parseFloat(delayMatch[1]) * 1000 
        : Math.pow(2, i) * 2000;
      
      console.log(`⏳ Rate limit - waiting ${Math.round(delay/1000)}s... (${i+1}/${maxRetries})`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error('Max retries exceeded');
}

const RefineIdeaPromptInputSchema = z.object({
  ideaPrompt: z.string().describe('The initial 1-2 line business idea prompt from the user.'),
});
export type RefineIdeaPromptInput = z.infer<typeof RefineIdeaPromptInputSchema>;

const RefineIdeaPromptOutputSchema = z.object({
  refinedIdeaPrompt: z.string().describe('The optimized and refined version of the business idea prompt.'),
  feedback: z
    .array(z.string())
    .describe('A list of specific feedback points and suggestions to improve the original prompt.'),
  score: z
    .number()
    .describe(
      'A score from 1-10 indicating the clarity and completeness of the original prompt for blueprint generation, where 10 is excellent.'
    ),
});
export type RefineIdeaPromptOutput = z.infer<typeof RefineIdeaPromptOutputSchema>;

export async function refineIdeaPrompt(input: RefineIdeaPromptInput): Promise<RefineIdeaPromptOutput> {
  return refineIdeaPromptFlow(input);
}

const refineIdeaPromptPrompt = ai.definePrompt({
  name: 'refineIdeaPromptPrompt',
  input: {schema: RefineIdeaPromptInputSchema},
  output: {schema: RefineIdeaPromptOutputSchema},
  prompt: `You are an AI assistant specialized in optimizing business idea prompts for comprehensive startup blueprint generation. Your goal is to take a user's initial 1-2 line business idea and provide constructive feedback, a clarity score, and an improved, more detailed prompt that will yield a better blueprint. Focus on ensuring the refined prompt is clear, concise, and provides enough context for a detailed analysis across product, market, business, technical, and UI/UX aspects.

**Original Business Idea Prompt:**
{{{ideaPrompt}}}

**Task:**
1.  **Analyze** the original prompt for clarity, specificity, and completeness regarding a business idea.
2.  **Provide feedback**: List specific suggestions on how the original prompt could be improved, e.g., by adding target audience, unique features, problem it solves, technology involved, or monetization strategy. Aim for 3-5 distinct feedback points.
3.  **Refine the prompt**: Create an optimized version of the prompt that incorporates potential improvements and is ready for detailed blueprint generation. This should be a concise, yet comprehensive, 1-3 sentence summary of the idea.
4.  **Score the original prompt**: Assign a clarity and completeness score (1-10) to the original prompt, where 1 is very vague and 10 is excellent.

Please output your response in the specified JSON format.`,
});

const refineIdeaPromptFlow = ai.defineFlow(
  {
    name: 'refineIdeaPromptFlow',
    inputSchema: RefineIdeaPromptInputSchema,
    outputSchema: RefineIdeaPromptOutputSchema,
  },
  async input => {
    const {output} = await retryWithBackoff(() => refineIdeaPromptPrompt(input));
    return output!;
  }
);
