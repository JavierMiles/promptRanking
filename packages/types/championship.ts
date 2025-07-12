import type { ModelResponse, ModelName } from './models';
import type { Dimension } from './dimensions';
import type { Prompt } from './models';

export interface ChampionshipMatch {
  id: string;
  responseA: ModelResponse;
  responseB: ModelResponse;
  winner?: ModelName;
  dimension: Dimension;
}

export interface ChampionshipRound {
  dimension: Dimension;
  matches: ChampionshipMatch[];
  currentMatch: number;
  isComplete: boolean;
  results: (ModelName[])[]; // is an array of arrays of strings to contemplate for ties
}

export interface ChampionshipState {
  promptId: string;
  prompt: Prompt;
  dimensions: Dimension[];
  models: ModelName[];
  rounds: Record<Dimension['id'], ChampionshipRound>;
  results: Record<Dimension['id'], (ModelName[])[]>; // is an array of arrays of strings to contemplate for ties
  isComplete?: boolean;
}

export interface Result {
  models: ModelName[];
  wins: number;
}

export interface SavedChampionshipResults {
  id: string;
  prompt: Prompt;
  results: Record<Dimension['id'], Result[]>;
  completedAt: Date;
}