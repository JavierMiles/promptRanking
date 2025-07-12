import { generateMockResponses } from './mock-responses';

import type { ModelResponse, ModelName } from '@repo/types';

interface Response {
  data: ModelResponse[];
  error: string | null;
}

export const getModelResponses = async (prompt: string, models: ModelName[]): Promise<Response> => {
  try {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const responses = generateMockResponses(prompt, models);

    return { data: responses ?? [], error: null };
  } catch (error) {
    return { data: [], error: `${error}` };
  }
}
