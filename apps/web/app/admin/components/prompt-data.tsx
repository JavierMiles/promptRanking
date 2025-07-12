'use client';

import { useState, useMemo } from 'react';
import { useRankingsStore } from '@repo/store';

import { Card } from '@repo/ui/card';
import { Podium } from '@repo/ui/podium';
import { Tabs } from '@repo/ui/tabs';
import type { Prompt, SavedChampionshipResults } from '@repo/types';

import { ModelsRanking } from '../../../components/models-ranking';
import { DimensionResults } from '../../../components/dimension-results';

export const PromptData = () => {
  const {
    getAndCalculateRankings,
    savedChampionships,
    modelRanking,
    dimensionRanking
  } = useRankingsStore();

  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [selectedChampionship, setSelectedChampionship] = useState<SavedChampionshipResults | null>(null);

  const promptIds = useMemo(() => {
    return [...new Set(savedChampionships.map(championship => championship.prompt.id))];
  }, [savedChampionships]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleString();
  };

  const handlePromptClick = (promptId: string) => {
    const data = savedChampionships.find(championship => championship.prompt.id === promptId);

    if (!data) {
      setSelectedPrompt(null);
      setSelectedChampionship(null);
      return;
    }

    getAndCalculateRankings(data);
    setSelectedPrompt(data.prompt);
    setSelectedChampionship(data);
  };

  const tabItems = [
    {
      id: 'models-ranking',
      label: 'Models Ranking',
      content: <ModelsRanking modelRanking={modelRanking} />
    },
    {
      id: 'dimension-results',
      label: 'Dimension Results',
      content: <DimensionResults dimensionRanking={dimensionRanking} />
    }
  ];

  return (
    <div className="flex flex-col gap-6">

        <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-white mb-3">Prompt IDs</h3>
          <div className="flex flex-wrap gap-4">
            {promptIds.map((promptId) => (
              <button
                key={promptId}
                onClick={() => handlePromptClick(promptId)}
                className={`
                  px-3 py-1 text-white text-sm rounded-full transition-colors cursor-pointer min-w-50
                  ${selectedPrompt?.id === promptId ? 'bg-blue-800' : 'bg-blue-500 hover:bg-blue-500'}
                `}
              >
                {promptId}
              </button>
            ))}
          </div>
        </div>

      {selectedChampionship && selectedPrompt ? (
        <div className="flex flex-col gap-6">

          <Card className="p-6">
            <div className="flex flex-row gap-2 justify-between">
              <h4 className="text-lg font-semibold text-white mb-3">Prompt</h4>
              <p className="text-sm text-gray-500 mt-2">
                Prompt ID: {selectedPrompt.id}
              </p>
            </div>
            <p className="text-gray-300 whitespace-pre-wrap">
              {selectedPrompt.text}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Completed: {formatDate(selectedChampionship.completedAt)}
            </p>
          </Card>

          <Podium models={modelRanking} />

          <Tabs items={tabItems} defaultTab="models-ranking" />
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          <p className="text-gray-300">Select a prompt to see the data</p>
        </div>
      )}
    </div>
  );
}; 