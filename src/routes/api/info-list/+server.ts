import { json } from '@sveltejs/kit';
import { getAllInfos } from '$lib/database/response';

export const GET = async () => {
  const infos = await getAllInfos();

  return json(infos);
};
