import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Prompt } from '@repo/types';

interface PromptsState {
  prompts: Prompt[];
  currentPrompt: Prompt | null;
  setPrompts: (prompts: Prompt[]) => void;
  addPrompt: (prompt: Prompt) => void;
  setCurrentPrompt: (prompt: Prompt | null) => void;
}

export const usePromptsStore = create<PromptsState>()(
  persist(
    (set, get) => ({
      prompts: [],
      currentPrompt: null,
      setPrompts: (prompts) => set({ prompts }),
      addPrompt: (prompt) => set((state) => ({ 
        prompts: [...state.prompts, prompt] 
      })),
      setCurrentPrompt: (prompt) => set({ currentPrompt: prompt }),
    }),
    {
      name: 'prompts-storage',
    }
  )
); 