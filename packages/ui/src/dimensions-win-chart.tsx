'use client';

import { BarChart } from "./bar-chart";
import type { RankingMoled } from '@repo/types';

interface DimensionsWinChartProps {
  model: RankingMoled;
  title?: string;
  height?: string;
  color?: string;
  maxValue?: number;
}

const getBarChartData = (model: RankingMoled) => {
  return model.wins
    .map(win => ({
      name: win.dimension,
      value: win.amount,
      tooltipLabel: 'Wins'
    }))
    .sort((a, b) => b.value - a.value);
};

export const DimensionsWinChart = ({ 
  model, 
  title = "Wins per Dimension",
  color = '#3B82F6',
  maxValue
}: DimensionsWinChartProps) => {
  return (
    <BarChart
      data={getBarChartData(model)}
      title={title}
      color={color}
      maxValue={maxValue}
      tooltipLabel="Wins"
    />
  );
}; 