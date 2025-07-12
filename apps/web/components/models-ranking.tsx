'use client';

import { Accordion } from "@repo/ui/accordion";
import { DimensionsWinChart } from "@repo/ui/dimensions-win-chart";
import { OverallWinsChart } from "@repo/ui/overall-wins-chart";

import { Models } from '@repo/types';
import type { RankingMoled } from '@repo/types';

interface ModelsRankingProps {
  modelRanking: RankingMoled[];
}

export const ModelsRanking = ({ modelRanking }: ModelsRankingProps) => {
  return (
    <div className="flex flex-col gap-4">
      {modelRanking.map((model) => {
        return (
          <Accordion
            key={model.modelName}
            title={Models[model.modelName]}
            winner={model.dimensionWins.length > 0 ? `${model.dimensionWins.length} dimensions won` : ''}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <DimensionsWinChart
                model={model}
                title={`${Models[model.modelName]} Wins per Dimension`}
                maxValue={modelRanking.length - 1}
              />
              <OverallWinsChart
                model={model}
                totalModels={modelRanking.length}
                title={`${Models[model.modelName]} Dimension Victories`}
              />
            </div>
          </Accordion>
        );
      })}
    </div>
  );
}; 