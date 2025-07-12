'use client';

import { PieChart } from "./pie-chart";
import { Models} from '@repo/types';
import type { DimensionRanking, ModelName } from '@repo/types';

export interface DimensionPieChartProps {
  results: DimensionRanking;
  title?: string;
  height?: string;
  colors?: string[];
}

const getPieChartData = (results: DimensionRanking) => {
  const data: { name: string; value: number }[] = [];

  const dimensionKey = Object.keys(results)[0];
  if (!dimensionKey) return data;

  const dimensionRanking = results[dimensionKey];

  if (!dimensionRanking?.ranking) return data;

  dimensionRanking.ranking.forEach((rank: { modelName: ModelName[]; wins: number }) => {
    rank.modelName.forEach((model: ModelName) => {
      data.push({
        name: Models[model],
        value: rank.wins
      });
    });
  });

  return data; 
};

export const DimensionPieChart = ({
  results, 
  title = "Wins Distribution",
  colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#F97316', '#EC4899']
}: DimensionPieChartProps) => {
  return (
    <PieChart
      data={getPieChartData(results)}
      innerRadius={40}
      outerRadius={80}
      title={title}
      colors={colors}
    />
  );
}; 