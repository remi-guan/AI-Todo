import axios from 'axios';
import { groupBy, isEmpty } from 'lodash-es';
import type { Info } from '$lib/database/schema';

function createInfosStore() {
  let infos: Record<string, Info[]> = $state({});

  return {
    get infos() {
      return infos;
    },
    get isEmpty() {
      return isEmpty(infos);
    },
    update: async () => {
      const { data } = await axios.get('/api/info');
      infos = groupBy(data, 'category');
    }
  };
}

export const infosStore = createInfosStore();
