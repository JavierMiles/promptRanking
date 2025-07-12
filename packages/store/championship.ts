import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { 
  ModelResponse, 
  ChampionshipState,
  ChampionshipMatch,
  ChampionshipRound,
  Dimension,
  ModelName,
  Result,
  Prompt,
  SavedChampionshipResults
} from '@repo/types';
import { useModelsStore } from './models';

interface ChampionshipStore {
  championship: ChampionshipState | null;
  round: ChampionshipRound | null;
  results: Record<Dimension['id'], Result[]>;
  savedChampionship: SavedChampionshipResults | null;
  startChampionship: (prompt: Prompt, dimensions: Dimension[], models: ModelName[]) => void;
  startRound: (dimension: Dimension) => void;
  resetRound: () => void;
  battleWinner: (winnerId: ModelName) => void;
  nextBattle: () => ChampionshipMatch | null;
  finishRound: () => void;
  clearChampionship: () => void;
  saveChampionship: (results: Record<Dimension['id'], Result[]>) => void;
}

export const useChampionshipStore = create<ChampionshipStore>()(
  persist(
    (set, get) => ({
      championship: null,
      round: null,
      results: {} as Record<Dimension['id'], Result[]>,
      savedChampionship: null,

    startChampionship: (prompt, dimensions, models) => {
      const { responses, id: promptId } = prompt;

      const baseMatches: Omit<ChampionshipMatch, 'dimension'>[] = [];

      for (let i = 0; i < responses.length; i++) {
        for (let j = i + 1; j < responses.length; j++) {
          const responseA = responses[i];
          const responseB = responses[j];
          if (responseA && responseB) {
            baseMatches.push({
              id: `match_${Date.now()}_${i}_${j}`,
              responseA,
              responseB,
            });
          }
        }
      }

      const rounds: ChampionshipState['rounds'] = dimensions.reduce((acc, dimension) => {
        const dMatches = JSON.parse(JSON.stringify(baseMatches)).map((match: any, index: number) => ({
          ...match,
          id: `match_${dimension.id}_${Date.now()}_${index}`,
          dimension,
        }));

        acc[dimension.id] = {
          dimension,
          matches: dMatches.sort(() => Math.random() - 0.5),
          currentMatch: 0,
          isComplete: false,
          results: [],
        };
        return acc;
      }, {} as ChampionshipState['rounds']);

      set({
        championship: {
          promptId,
          prompt,
          dimensions,
          models,
          rounds,
          results: {} as ChampionshipState['results'],
          isComplete: false,
        },
        round: null,
      });
    },

    startRound: (dimension: Dimension) => {
      const championship = get().championship;
      if (!championship) return;

      const round = championship.rounds[dimension.id];
      if (!round) return;

      set({ round });
    },

    resetRound: () => {
      const championship = get().championship;
      const round = get().round;

      if (!round || !championship) return;

      const dimension = round.dimension;

      const newRound = championship.rounds[dimension.id];

      if (!newRound) return;

      set({
        round: newRound,
      });
    },

    battleWinner: (winnerId: ModelName) => {
      const round = get().round;
      if (!round) return;

      const { matches, currentMatch } = round;

      const match = matches[currentMatch];
      if (!match) return;

      const updatedMatches = matches.map((m: ChampionshipMatch) =>
        match.id === m.id ? { ...m, winner: winnerId } : m
      );

      set({
        round: {
          ...round,
          matches: updatedMatches,
        },
      });
    },

    nextBattle: () => {
      const round = get().round;
      const championship = get().championship;
      if (!round || !championship) return null;

      const { matches, currentMatch, dimension } = round;

      const next = currentMatch + 1;

      const updatedRound = {
        ...round,
        currentMatch: next,
        isComplete: next >= matches.length,
      };

      set({
        round: updatedRound,
        championship: {
          ...championship,
          rounds: {
            ...championship.rounds,
            [dimension.id]: updatedRound,
          }
        }
      });

      const nextMatch = matches[next];

      if (!nextMatch) {
        get().finishRound();
      }

      return nextMatch ?? null;
    },

    finishRound: () => {
      const round = get().round;
      const championship = get().championship;
      const results = get().results;

      if (!round || !championship) return;

      const { matches, dimension } = round;

      const leaderboard = new Map<ModelName, number>(
        championship.models.map(model => [model, 0])
      );

      matches.forEach((match: ChampionshipMatch) => {
        if (match.winner) {
          leaderboard.set(match.winner, (leaderboard.get(match.winner) || 0) + 1);
        }
      });

      const groups = new Map<number, ModelName[]>();
      Array.from(leaderboard.entries()).forEach(([modelName, count]) => {
        groups.set(count, [...(groups.get(count) || []), modelName]);
      });

      const sorted = Array.from(groups.keys()).sort((a, b) => b - a);
      const result: Result[] = sorted.map(count => ({
        models: groups.get(count) || [],
        wins: count
      }));

      const newResults = {
        ...results,
        [dimension.id]: result
      };

      const isComplete = Object.values(championship.rounds)
        .map(round => round?.isComplete)
        .every(Boolean);

      if (isComplete) {
        get().saveChampionship(newResults);
      }

      set({
        results: newResults,
        championship: {
          ...championship,
          isComplete: isComplete
        }
      });
    },

    clearChampionship: () => {
      set({
        championship: null,
        round: null,
        results: {} as Record<Dimension['id'], Result[]>
      });
    },

    saveChampionship: (results: Record<Dimension['id'], Result[]>) => {
      const championship = get().championship;
      const { prompt } = useModelsStore.getState();

      if (!championship || !prompt || !results) return;

      const savedChampionship: SavedChampionshipResults = {
        id: `championship_${Date.now()}`,
        prompt,
        results,
        completedAt: new Date()
      };

      const existingData = localStorage.getItem('saved-championships');
      const savedChampionships: SavedChampionshipResults[] = existingData ? JSON.parse(existingData) : [];

      savedChampionships.push(savedChampionship);
      localStorage.setItem('saved-championships', JSON.stringify(savedChampionships));

      set({ savedChampionship });
    }
  }),
  {
    name: 'championship-storage',
  }
));