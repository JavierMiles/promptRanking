import { Dimension } from "./dimensions";

export const Models = {
  'gpt-4': 'GPT-4',
  'claude': 'Claude',
  'grok': 'Grok',
  'gemini': 'Gemini'
} as const;

export type ModelName = keyof typeof Models;

export interface ModelResponse {
  id: string;
  modelName: ModelName;
  text: string;
  promptId: string;
}

export interface Prompt {
  id: string;
  text: string;
  createdAt: Date;
  responses: ModelResponse[];
  dimensions?: Dimension[];
}

export interface PromptData {
  prompt: Prompt;
  responses: ModelResponse[];
}