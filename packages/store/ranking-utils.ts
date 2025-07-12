import type {
  Dimension,
  DimensionRanking,
  DimensionRank,
  ModelName,
  Ranking,
  RankingMoled,
  Result,
  Results,
  SavedChampionshipResults
} from '@repo/types';

export const getDimensionRanking = (data: SavedChampionshipResults): DimensionRanking | null => {
  const { results, prompt } = data;
  if (!results || !prompt ) return null;

  const dimensionRanking: DimensionRanking = {};

  Object.entries(results).forEach(([key, result]) => {
    dimensionRanking[key] = {
      id: `${prompt.id}_dimension_${key}`,
      promptId: prompt.id,
      ranking: result.map((r: Result) => ({
        modelName: r.models,
        wins: r.wins
      }))
    };
  });

  return dimensionRanking;
}

export const getModelRanking = (data: SavedChampionshipResults): RankingMoled[] => {
  const { results, prompt } = data;
  if (!results || !prompt ) return [];

  const stats = new Map<ModelName, { dimensionWins: string[]; overallWins: number; wins: { dimension: string; amount: number }[] }>();

  Object.keys(results).forEach((key: Dimension['id']) => {
    const result = results[key];
    if (!result) return;

    const dimensionName = key;

    result.forEach((r: Result, pos: number) => {
      r.models.forEach((model: ModelName) => {
        const currentStats = stats.get(model) || { dimensionWins: [], overallWins: 0, wins: [] };
        if (pos === 0) {
          currentStats.dimensionWins.push(dimensionName);
        }

        currentStats.wins.push({
          dimension: dimensionName,
          amount: r.wins
        });

        currentStats.overallWins += r.wins;
        stats.set(model, currentStats);
      });
    });
  });

  const modelRanking = Array.from(stats.entries())
    .map(([modelName, stats]) => ({
      promptId: prompt.id,
      modelName,
      dimensionWins: stats.dimensionWins,
      overallWins: stats.overallWins,
      wins: stats.wins,
      score: stats.dimensionWins.length + stats.overallWins / 100
    }))
    .sort((a, b) => b.score - a.score)
    .map((model, index) => ({
      ...model,
      rank: index + 1
    }));

  return modelRanking;
};

const aggregateDimensionRankings = (dimensionRankings: DimensionRanking[]): DimensionRanking => {
  const intermediate: {
    [dimension: string]: Partial<Record<ModelName, number>>;
  } = {};

  // Step 1: Aggregate raw win counts
  dimensionRankings.forEach(entry => {
    for (const [dimension, data] of Object.entries(entry)) {
      if (!intermediate[dimension]) {
        intermediate[dimension] = {};
      }

      data.ranking.forEach(item => {
        item.modelName.forEach(name => {
          intermediate[dimension]![name] = (intermediate[dimension]![name] ?? 0) + item.wins;
        });
      });
    }
  });

  // Step 2: Group by win count
  const result: DimensionRanking = {};

  for (const [dimension, modelWinMap] of Object.entries(intermediate)) {
    const winGroups = new Map<number, ModelName[]>();

    for (const [modelNameStr, wins] of Object.entries(modelWinMap)) {
      const modelName = modelNameStr as ModelName;
      const winVal = wins ?? 0;
      if (!winGroups.has(winVal)) {
        winGroups.set(winVal, []);
      }
      winGroups.get(winVal)!.push(modelName);
    }

    // Step 3: Convert grouped map to DimensionRank[], sorted by wins descending
    const ranking: DimensionRank[] = Array.from(winGroups.entries())
      .map(([wins, modelNames]) => ({ modelName: modelNames, wins }))
      .sort((a, b) => b.wins - a.wins);

    result[dimension] = {
      id: `aggregated_dimension_${dimension}`,
      promptId: `aggregated_dimension_ranking_propmt_${dimension}`,
      ranking,
    };
  }

  return result;
};

interface AggregatedModelData {
  modelName: ModelName;
  overallWins: number;
  wins: Record<string, number>;
  dimensionWinsSet: Set<string>;
}

interface RankedModel {
  modelName: ModelName;
  rank: number;
  score: number;
  overallWins: number;
  dimensionWins: string[];
  wins: { dimension: string; amount: number }[];
}

const aggregateModelRankings = (
  modelRankings: (RankingMoled[])[]
): RankedModel[] => {
  const modelMap: Record<ModelName, AggregatedModelData> = {} as Record<
    ModelName,
    AggregatedModelData
  >;

  modelRankings.flat().forEach(modelEntry => {
    const name = modelEntry.modelName;

    if (!modelMap[name]) {
      modelMap[name] = {
        modelName: name,
        overallWins: 0,
        wins: {},
        dimensionWinsSet: new Set()
      };
    }

    modelMap[name].overallWins += modelEntry.overallWins;

    modelEntry.wins.forEach(({ dimension, amount }) => {
      if (!modelMap[name].wins[dimension]) {
        modelMap[name].wins[dimension] = 0;
      }
      modelMap[name].wins[dimension]! += amount;

      if (amount > 0) {
        modelMap[name].dimensionWinsSet.add(dimension);
      }
    });
  });

  // Convert to array and compute score
  const result: RankedModel[] = Object.values(modelMap).map(model => {
    const dimensionWinList = Array.from(model.dimensionWinsSet);
    const winArray = Object.entries(model.wins).map(([dimension, amount]) => ({
      dimension,
      amount
    }));
    const totalWinScore = winArray.reduce((sum, w) => sum + w.amount, 0);
    const score = totalWinScore + model.overallWins / 1000;

    return {
      modelName: model.modelName,
      rank: 0, // placeholder
      score,
      overallWins: model.overallWins,
      dimensionWins: dimensionWinList,
      wins: winArray
    };
  });

  // Sort by score descending and assign ranks
  result.sort((a, b) => b.score - a.score).forEach((model, idx) => {
    model.rank = idx + 1;
  });

  return result;
};

export const getAllRankings = (savedChampionships: SavedChampionshipResults[]): {
  dimensionRanking: DimensionRanking;
  modelRanking: RankingMoled[];
} => {
  if (!savedChampionships || !savedChampionships.length) {
    return { dimensionRanking: {}, modelRanking: [] };
  }

  const dimensionRankings: (DimensionRanking)[] = [];
  const modelRankings: (RankingMoled[])[] = [];
  savedChampionships.forEach((championship) => {
    const dimensionRanking = getDimensionRanking(championship);
    if (dimensionRanking) {
      dimensionRankings.push(dimensionRanking);
    }

    const modelRanking = getModelRanking(championship);
    if (modelRanking) {
      modelRankings.push(modelRanking);
    }
  });

  const aggregatedDimensionRankings = aggregateDimensionRankings(dimensionRankings);
  const dimensionRanking: DimensionRanking = {}
  Object.entries(aggregatedDimensionRankings).forEach(([dimension, data]) => {
    dimensionRanking[dimension] = {
      id: `aggregated_dimension_${dimension}`,
      promptId: `ggregated_dimension_ranking_propmt_${dimension}`,
      ranking: data.ranking
    }
  })

  const aggregatedModelRankings = aggregateModelRankings(modelRankings);
  const modelRanking = aggregatedModelRankings.map(ranking => ({
    promptId: 'aggregated_model_ranking',
    modelName: ranking.modelName,
    dimensionWins: ranking.dimensionWins,
    overallWins: ranking.overallWins,
    wins: ranking.wins,
    score: ranking.score,
    rank: ranking.rank,
  }));

  return {
    dimensionRanking,
    modelRanking
  };
}; 