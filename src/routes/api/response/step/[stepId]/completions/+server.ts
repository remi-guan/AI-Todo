import { json } from '@sveltejs/kit';
import { updateStepCompletions } from '$lib/database/response';

export const PUT = async ({ request, params }) => {
  const stepId = Number(params.stepId);
  const completions = await request.json();

  try {
    // Update completions for the given step
    await updateStepCompletions(stepId, completions);
    return json({ message: 'Completions updated successfully' }, { status: 200 });
  } catch (error) {
    return json({ error: 'Failed to update completions' }, { status: 500 });
  }
};
