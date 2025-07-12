'use client';

import { Accordion } from "@repo/ui/accordion";
import { DimensionPieChart } from "@repo/ui/dimension-pie-chart";

import { Models } from '@repo/types'
import type { ModelName, DimensionRank, DimensionRanking } from '@repo/types';

const getWinner = (ranking: DimensionRank[]) => {
  const first = ranking[0]
  if (!first) return '';

  return first.modelName.map((model: ModelName) => Models[model]).join(', ');
}

interface DimensionResultsProps {
  dimensionRanking: DimensionRanking | null;
}

export const DimensionResults = ({ dimensionRanking }: DimensionResultsProps) => {
  return (
    <div className="flex flex-col gap-4">
      {Object.entries(dimensionRanking ?? {}).map(([key, value]) => (
        <div key={key}>
          <Accordion
            title={key}
            winner={getWinner(value.ranking)}
          >
            <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-6">
              <div className="flex flex-col gap-3 mt-2 mdmt-4">
                {value.ranking?.map((rank: DimensionRank, rankIndex: number) => (
                  <div key={rankIndex} className="flex items-center gap-2">
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-600 text-white text-sm font-bold">
                      {rankIndex + 1}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {rank.modelName.map((modelName: ModelName) => (
                        <p
                          key={modelName}
                          className="px-2 py-1 bg-gray-700 rounded text-sm text-gray-300"
                        >
                          {Models[modelName]}
                        </p>
                      ))}
                    </div>
                    <div className="ml-auto text-xs text-gray-400">
                      {rank.wins} wins
                    </div>
                  </div>
                ))}
              </div>

              <DimensionPieChart
                results={{ [key]: value }}
                title={`${key} Wins Distribution`}
              />
            </div>
          </Accordion>

        </div>
      ))}
    </div>
  );
}; 