/** biome-ignore-all lint/performance/noNamespaceImport: Easier to import all schemas at once */
import * as auth from './auth';

export const schema = {
  ...auth,
};
