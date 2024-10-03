import { json, error } from '@sveltejs/kit';
import yaml from 'js-yaml';
import OpenAI from 'openai';
import { AI_ENABLED } from '$env/static/private';
import { ResponseSchema } from '$lib/schemas';
import { parseMarkdownLists } from '$lib/utils';
import { mockResponse } from '$lib/mock-response';

const systemPrompt = `
You are ChatGPT, a large language model trained by OpenAI.
Knowledge cutoff: 2024-07
Current date: 2024-09

Your reply should be valid YAML, and strings must be quoted.
The properties MUST be the same as the types. Your reply should be the same as the user's language and give the moneyUnit symbol match their local.
No more than 3-4 steps, always use numeric list for sub-steps. Always include money cost and time cost.

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
  console.log({ ena: AI_ENABLED });
  if (AI_ENABLED === 'true' && prompt !== 'How to make egg tarts?') {
    const openai = new OpenAI();
    console.log({ openai });

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
async function parseResponse(response: string) {
  let totalTasks = 0;

  try {
    const parsed = ResponseSchema.parse(yaml.load(response));

    for (const step of parsed.steps) {
      const tasksCount = parseMarkdownLists(step.details).length;
      step.completions = new Array(tasksCount).fill(false);
      totalTasks += tasksCount;
    }

    return {
      totalTasks,
      response: parsed
    };
  } catch (e) {
    throw error(500, 'Failed to parse the response');
  }
}

/**
 * POST request handler
 */
export const POST = async ({ request }) => {
  const { prompt } = await request.json();

  if (!prompt) {
    throw error(400, 'Prompt is required');
  }

  // Fetch and parse the response from OpenAI
  const aiResponse = await getResponse(prompt);
  const parsedResponse = await parseResponse(aiResponse);

  return json({
    totalTasks: parsedResponse.totalTasks,
    response: parsedResponse.response
  });
};
