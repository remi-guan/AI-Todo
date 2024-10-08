import { json } from '@sveltejs/kit';
import { updateStepCompletions } from '$lib/database/response';

export const POST = async ({ request, params }) => {
  const stepId = Number(params.stepId); // Get stepId from URL
  const { completions } = await request.json(); // Get completions from request body

  if (!Array.isArray(completions) || completions.some((c) => typeof c !== 'boolean')) {
    return json({ error: 'Invalid completions array' }, { status: 400 });
  }

  try {
    // Update completions for the given step
    await updateStepCompletions(stepId, completions);
    return json({ message: 'Completions updated successfully' }, { status: 200 });
  } catch (error) {
    return json({ error: 'Failed to update completions' }, { status: 500 });
  }
};
