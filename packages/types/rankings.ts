import { ModelName } from './models';
import { Result } from './championship';

export interface Ranking {
  id: string;
  promptId: string;
  position: number;
  modelName: ModelName[];
  dimensionWins: number;
  overallWins: number;
}

export interface DimensionRank {
  modelName: ModelName[];
  wins: number;
}

export interface DimensionRanking {
  [key: string]: {
    id: string;
    promptId: string;
    ranking: DimensionRank[];
  }
}

export interface RankingMoled {
  promptId: string;
  modelName: ModelName;
  dimensionWins: string[];
  overallWins: number;
  wins: { dimension: string; amount: number }[];
  score: number;
  rank: number;
}

export interface Results {
  [dimensionId: string]: Result[];
}