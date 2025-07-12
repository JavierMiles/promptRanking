//TODO: Remove this store

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ModelResponse {
  id: string;
  modelName: 'gpt-4' | 'claude' | 'grok' | 'gemini';
  text: string;
  promptId: string;
}

interface ResponsesState {
  currentResponses: ModelResponse[];
  currentPrompt: string;
  setResponses: (responses: ModelResponse[], prompt: string) => void;
  clearResponses: () => void;
}

export const useResponsesStore = create<ResponsesState>()(
  persist(
    (set) => ({
      currentResponses: [],
      currentPrompt: '',
      setResponses: (responses, prompt) => set({ 
        currentResponses: responses, 
        currentPrompt: prompt 
      }),
      clearResponses: () => set({ currentResponses: [], currentPrompt: '' }),
    }),
    {
      name: 'responses-storage',
    }
  )
); 