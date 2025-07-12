import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Ranking, RankingMoled, Results, SavedChampionshipResults, DimensionRanking } from '@repo/types';

import { useChampionshipStore } from './championship';
import {  getModelRanking, getAllRankings, getDimensionRanking } from './ranking-utils';

interface RankingsState {
  results: Results | null;
  dimensionRanking: DimensionRanking | null;
  modelRanking: RankingMoled[];
  allDimensionsRanking: DimensionRanking | null;
  allModelsRanking: RankingMoled[];
  savedChampionships: SavedChampionshipResults[];
  setRankings: (savedChampionships: SavedChampionshipResults[]) => void;
  setAllRankings: (savedChampionships: SavedChampionshipResults[]) => void;
  getAndCalculateRankings: (championship?: SavedChampionshipResults) => void;
  loadSavedChampionships: () => SavedChampionshipResults[];
}

export const useRankingsStore = create<RankingsState>()(
  persist(
    (set, get) => ({
      results: null,
      dimensionRanking: null,
      modelRanking: [],
      allDimensionsRanking: null,
      allModelsRanking: [],
      savedChampionships: [],

      setRankings: (savedChampionships) => {
        if (!savedChampionships || !savedChampionships.length) return;

        const championship = savedChampionships[0];
        if (!championship) return;

        const dimensionRanking = getDimensionRanking(championship);
        const modelRanking = getModelRanking(championship);

        set({ dimensionRanking, modelRanking });
      },

      setAllRankings: (savedChampionships) => {
        if (!savedChampionships || savedChampionships.length === 0) {
          set({
            allDimensionsRanking: null,
            allModelsRanking: []
          });
          return;
        }

        const { dimensionRanking, modelRanking } = getAllRankings(savedChampionships);

        set({
          allDimensionsRanking: dimensionRanking,
          allModelsRanking: modelRanking
        });
      },

      getAndCalculateRankings: (championship) => {
        if (championship) {
          get().setRankings([championship]);
          return
        }

        const { savedChampionship } = useChampionshipStore.getState();

        if (savedChampionship) {
          get().setRankings([savedChampionship]);
        }
      },

      loadSavedChampionships: () => {
        try {
          const existingData = localStorage.getItem('saved-championships');
          if (!existingData) {
            set({ savedChampionships: [] });
            return [];
          }

          const parsedData = JSON.parse(existingData);
          const transformedChampionships: SavedChampionshipResults[] = parsedData.map((championship: any) => ({
            ...championship,
            completedAt: new Date(championship.completedAt)
          }));

          get().setAllRankings(transformedChampionships);
          set({ savedChampionships: transformedChampionships });

          return transformedChampionships;
        } catch (error) {
          console.error('Error loading saved championships:', error);
          set({ savedChampionships: [] });
          return [];
        }
      },
    }),
    {
      name: 'rankings-storage',
    }
  )
); 