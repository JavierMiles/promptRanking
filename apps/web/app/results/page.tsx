'use client';

import { useEffect } from 'react';

import { useChampionshipStore, useModelsStore } from '@repo/store';
import { useRankingsStore } from '@repo/store';

import { Button } from "@repo/ui/button";
import { Podium } from "@repo/ui/podium";
import { Tabs } from "@repo/ui/tabs";

import { ModelsRanking } from '../../components/models-ranking';
import { DimensionResults } from '../../components/dimension-results';

export default function ResultsPage() {
  const { prompt } = useModelsStore();

  const { savedChampionship } = useChampionshipStore();
  const { getAndCalculateRankings, modelRanking, dimensionRanking } = useRankingsStore();

  useEffect(() => {
    getAndCalculateRankings();
  }, [getAndCalculateRankings, savedChampionship]);

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
    <div className="flex flex-col gap-6 min-h-dvh pb-20">
      <header className="text-center py-8">
        <div className='absolute flex justify-start items-center gap-2'>
          <Button href="/" variant="ghost" icon="arrow_left_alt" shape="circle" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">
          Championship Results
        </h1>
        {prompt && (
          <p className="text-md text-gray-400 mt-2">
            {`${prompt?.text || '...'}`}
          </p>
        )}
      </header>

      <div className="max-w-4xl mx-auto w-full">
        <div className="mb-8">
          <Podium models={modelRanking} />
        </div>

        <Tabs items={tabItems} defaultTab="models-ranking" />
      </div>
    </div>
  );
} 