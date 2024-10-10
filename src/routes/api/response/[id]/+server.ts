import { json, error } from '@sveltejs/kit';
import { getResponseById, deleteResponseById } from '$lib/database/response';

export const GET = async ({ params }) => {
  const id = Number(params.id);
  if (!id) {
    throw error(400, 'Id is required');
  }

  const response = await getResponseById(id);
  if (!response) {
    throw error(400, 'Response not found');
  }

  return json(response);
};

export const DELETE = async ({ params }) => {
  const id = Number(params.id);
  if (!id) {
    throw error(400, 'Id is required');
  }

  await deleteResponseById(id);
  return json({ message: 'Delete success' });
};
