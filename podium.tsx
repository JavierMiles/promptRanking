'use client';

import { Card } from "./card";
import { Icon } from "./icon";
import type { RankingMoled } from '@repo/types';

interface PodiumProps {
  models: RankingMoled[];
}

const heights: Record<number, string> = {
  0: 'h-32',
  1: 'h-24',
  2: 'h-16'
};

const colors: Record<number, string> = {
  0: 'bg-yellow-500',
  1: 'bg-gray-400',
  2: 'bg-amber-600'
};

const icons: Record<number, string> = {
  0: 'emoji_events',
  1: 'military_tech',
  2: 'workspace_premium'
};

const positionLabels: Record<number, string> = {
  0: '1st',
  1: '2nd',
  2: '3rd'
};

const badgeColors: Record<number, string> = {
  0: 'text-yellow-500',
  1: 'text-gray-400',
  2: 'text-amber-600'
};

const Position = ({ model, position }: { model: RankingMoled, position: number }) => {

  return (
    <div className="flex flex-col items-center">
      <div className={`text-center mb-2 ${badgeColors[position]}`}>
        <div className="flex items-center justify-center mb-1">
          <Icon name={icons[position]!} size={2} />
        </div>
        <p className="text-sm font-semibold">
          {positionLabels[position]}
        </p>
      </div>

      <div className={`w-24 ${heights[position]} ${colors[position]} rounded-t-lg flex items-center justify-center`}>
        <div className="text-center">
          <p className="text-sm font-bold text-white mb-1">{model.modelName}</p>
          <p className="text-xs text-white/80">{model.dimensionWins.length} dimensions</p>
          <p className="text-xs text-white/80">{model.overallWins} wins</p>
        </div>
      </div>
    </div>
  )
}

export const Podium = ({ models }: PodiumProps) => {
  const top3 = models.slice(0, 3);

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">
        Overall Championship Podium
      </h2>

      <div className="flex items-end justify-center gap-4 px-8">
        {top3[1] && (<Position model={top3[1]} position={1} />)}
        {top3[0] && (<Position model={top3[0]} position={0} />)}
        {top3[2] && (<Position model={top3[2]} position={2} />)}
      </div>

      {models.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <Icon name="pending" size={3} color="text-gray-500" />
          <p>No championship results yet</p>
        </div>
      )}
    </Card>
  );
}; 