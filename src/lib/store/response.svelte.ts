import type { ResponseWithRelations } from '$lib/database/response';

function createResponseStore() {
  let response: ResponseWithRelations | undefined = $state();

  return {
    get response() {
      return response;
    },
    set: (res: ResponseWithRelations) => {
      response = res;
    }
  };
}

export const responseStore = createResponseStore();
