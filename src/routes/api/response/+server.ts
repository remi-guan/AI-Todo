import yaml from 'js-yaml';
import OpenAI from 'openai';
import { mockResponse } from '$lib/mocks';
import { json, error } from '@sveltejs/kit';
import { saveResponse } from '$lib/database/response';
import type { ParsedResponse } from '$lib/schemas';
import { ParsedResponseSchema } from '$lib/schemas';
import { AI_ENABLED, OPENAI_API_KEY } from '$env/static/private';
import { parseMarkdownLists, getTotalTasks } from '$lib/utils';

const systemPrompt = `
You are ChatGPT, a large language model trained by OpenAI.
Knowledge cutoff: 2024-07
Current date: 2024-10

Your reply should be valid YAML, and strings must be quoted.
The properties MUST be the same as the types. Your reply should be the same as the user's language and give the moneyUnit symbol match their local.
No more than 3-4 steps, each step must contain at least one sub-step. Always use numeric list for sub-steps, with text description if needed (see example). Always include money cost and time cost.

For example:
info:
  title: "How to Make Egg Tarts?"
  moneyUnit: "$"
  icon: "🥧"
  category: "Baking"

steps:
  - title: "Prepare Ingredients"
    icon: "🍳"
    details: |
      Prepare the following ingredients:
      1. 4 egg yolks
      2. 50g sugar
      3. 200ml milk
      4. 100ml heavy cream
      5. Puff pastry, as needed

      Make sure to have all ingredients ready. You can buy pre-made puff pastry or make it yourself.
    moneyCost: 20
    timeCost: 10
`;

/**
 * Get a response from ChatGPT-4o-mini.
 * If AI_ENABLED is false or the prompt is the default one, return the mock response.
 */
async function getResponse(prompt: string) {
  if (AI_ENABLED === 'true' && prompt !== 'How to make egg tarts?') {
    const openai = new OpenAI({
      apiKey: OPENAI_API_KEY
    });

    const response = await openai.chat.completions.create({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: prompt }
      ],
      model: 'gpt-4o-mini-2024-07-18'
    });

    console.log({ response });
    return response.choices[0]?.message?.content || '';
  }
  return mockResponse;
}

/**
 * Parse the OpenAI response into the expected schema.
 */
async function parseResponse(aiResponse: string): Promise<ParsedResponse> {
  try {
    const response = ParsedResponseSchema.parse(yaml.load(aiResponse));
    for (const step of response.steps) {
      const tasksCount = parseMarkdownLists(step.details).length;
      step.completions = new Array(tasksCount).fill(false);
    }

    return response;
  } catch (e) {
    throw error(500, 'Failed to parse the response');
  }
}

export const POST = async ({ request }) => {
  const { prompt } = await request.json();

  if (!prompt) {
    throw error(400, 'Prompt is required');
  }

  // Fetch and parse the response from OpenAI
  const aiResponse = await getResponse(prompt);
  const parsed = await parseResponse(aiResponse);
  const response = await saveResponse(parsed);

  return json({
    response,
    totalTasks: getTotalTasks(response)
  });
};
