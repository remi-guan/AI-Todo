import { json, error } from '@sveltejs/kit';
import { getTotalTasks } from '$lib/utils';
import { getResponseById } from '$lib/database/response';

export const GET = async ({ request }) => {
  const { id } = await request.json();

  if (!id) {
    throw error(400, 'Id is required');
  }

  const response = await getResponseById(id);

  return json({
    response,
    totalTasks: getTotalTasks(response)
  });
};
