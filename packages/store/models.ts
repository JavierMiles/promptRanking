import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Dimension, ModelResponse, Prompt } from '@repo/types';

interface ModelsState {
  responses: ModelResponse[];
  prompt: Prompt | null;
  setResponses: (responses: ModelResponse[], prompt: string, dimensions?: Dimension[]) => void;
  clearResponses: () => void;
}

export const useModelsStore = create<ModelsState>()(
  persist(
    (set) => ({
      responses: [],
      prompt: null,
      setResponses: (responses, prompt, dimensions) => set({
        responses: responses, 
        prompt: {
          id: `prompt_${Date.now()}`,
          text: prompt,
          createdAt: new Date(),
          responses: responses,
          dimensions: dimensions
        }
      }),
      clearResponses: () => set({ responses: [], prompt: null }),
    }),
    {
      name: 'models-storage',
    }
  )
); 