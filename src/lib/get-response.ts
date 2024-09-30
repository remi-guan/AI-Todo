import yaml from 'js-yaml';
import { ResponseSchema } from '$lib/schemas';
import { parseMarkdownLists } from '$lib/utils';

// TODO: currently mock response from ChatGPT
// Will use OpenAI API later
const response = `info:
  title: "How to Make Egg Tarts?"
  icon: "🥧"
  category: "Baking"
  type: "steps"
  moneyUnit: "$"

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

  - title: "Make Egg Tart Filling"
    icon: "🥄"
    details: |
      1. Mix the egg yolks and sugar, stirring until the sugar dissolves.
      2. Add the milk and heavy cream, and mix well.
      3. Strain the mixture to ensure there are no lumps.
    moneyCost: 20
    timeCost: 15

  - title: "Bake the Egg Tarts"
    icon: "🍮"
    details: |
      1. Press the puff pastry into tart molds, making sure it fits tightly.
      2. Pour the egg mixture into the molds, filling them about 80%.
      3. Place the tarts into a preheated oven at 200°C, and bake for around 20 minutes until the surface is lightly golden.
      4. Let the tarts cool slightly before serving.
    moneyCost: 20
    timeCost: 20`;

export async function getResponse(prompt: string) {
  let totalTasks = 0;
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
}