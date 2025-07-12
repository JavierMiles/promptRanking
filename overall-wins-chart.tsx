'use client';

import { PieChart } from "./pie-chart";
import type { RankingMoled } from '@repo/types';

interface OverallWinsChartProps {
  model: RankingMoled;
  totalModels: number;
  title?: string;
  height?: string;
  colors?: string[];
}

const getData = (model: RankingMoled, totalModels: number) => {
  const amountOfBattles = (totalModels - 1) * 8; // Assuming 8 dimensions

  const data: { name: string; value: number; tooltipLabel?: string }[] = [];
  const losses = amountOfBattles - model.dimensionWins.length;

  data.push({ name: 'Losses', value: losses, tooltipLabel: 'Value' });

  model.wins.forEach(win => {
    if (!win.amount) return;

    data.push({ name: win.dimension, value: win.amount, tooltipLabel: 'Wins' });
  });

  return data;
};

export const OverallWinsChart = ({ 
  model, 
  totalModels,
  title = "Dimension Victories",
  colors = ['#10B981', '#3B82F6', '#8B5CF6', '#EF4444', '#F59E0B', '#06B6D4', '#EC4899', '#84CC16']
}: OverallWinsChartProps) => {
  const data = getData(model, totalModels);
  
  return (
    <PieChart
      data={data}
      title={title}
      colors={colors}
    />
  );
}; 