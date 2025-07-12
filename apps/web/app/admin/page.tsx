'use client';

import { useEffect } from 'react';
import { Tabs } from '@repo/ui/tabs';
import { Button } from '@repo/ui/button';
import { Podium } from '@repo/ui/podium';
import { useRankingsStore } from '@repo/store';
import { ModelsRanking } from '../../components/models-ranking';
import { DimensionResults } from '../../components/dimension-results';
import { PromptData } from './components/prompt-data';

export default function AdminPage() {
  const { loadSavedChampionships, allModelsRanking, allDimensionsRanking } = useRankingsStore();

  useEffect(() => {
    loadSavedChampionships();
  }, [loadSavedChampionships]);

  const tabItems = [
    {
      id: 'models',
      label: 'Models',
      content: (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-white">Models Management</h2>
          <div className="mb-8">
            <Podium models={allModelsRanking} />
          </div>
          <ModelsRanking modelRanking={allModelsRanking} />
        </div>
      )
    },
    {
      id: 'dimensions',
      label: 'Dimensions',
      content: (
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4 text-white">Dimensions Management</h2>
          <DimensionResults dimensionRanking={allDimensionsRanking} />
        </div>
      )
    },
    {
      id: 'prompt-data',
      label: 'Data by Prompt',
      content: <PromptData />
    }
  ];

  return (
    <div className="flex flex-col gap-6 min-h-dvh pb-20">
      <header className="text-center py-8">
        <div className='absolute flex justify-start items-center gap-2'>
          <Button href="/" variant="ghost" icon="arrow_left_alt" shape="circle" />
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">
        Championship Admin
        </h1>
        <p className="text-gray-400">Data management for the championship</p>
      </header>

      <Tabs items={tabItems} defaultTab="models" />

    </div>
  );
} 