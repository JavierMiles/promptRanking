'use client';

import { Card } from "./card";
import { Icon } from "./icon";
import {
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  Legend
} from 'recharts';

interface RadarChartData {
  subject: string;
  [key: string]: any; // Allow additional properties for different series
}

interface RadarChartProps {
  data: RadarChartData[];
  title?: string;
  height?: string;
  showLegend?: boolean;
  colors?: string[];
  dataKeys?: string[];
}

export const RadarChart = ({ 
  data, 
  title = "Chart", 
  height = 'h-64',
  showLegend = true,
  colors = ['#3B82F6', '#8B5CF6', '#EF4444', '#10B981', '#F59E0B', '#06B6D4'],
  dataKeys = []
}: RadarChartProps) => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-white font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }: any) => {
    if (!showLegend) return null;
    
    return (
      <div className="flex justify-center gap-4 mt-4 flex-wrap">
        {payload.map((entry: any, index: number) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-gray-300">
              {entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  // If no dataKeys provided, use all keys except 'subject'
  const keysToRender = dataKeys.length > 0 
    ? dataKeys 
    : Object.keys(data[0] || {}).filter(key => key !== 'subject');

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div className="flex items-center gap-2">
          <Icon name="radar" size={1.5} color="text-gray-400" />
        </div>
      </div>
      
      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Icon name="pending" size={3} color="text-gray-500" />
          <p className="mt-2">No data available</p>
        </div>
      ) : (
        <div className={height}>
          <ResponsiveContainer width="100%" height="100%">
            <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid stroke="#374151" />
              <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: '#9CA3AF', fontSize: 12 }}
              />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 'dataMax']} 
                tick={{ fill: '#9CA3AF', fontSize: 10 }}
              />
              {keysToRender.map((key, index) => (
                <Radar
                  key={key}
                  name={key}
                  dataKey={key}
                  stroke={colors[index % colors.length]}
                  fill={colors[index % colors.length]}
                  fillOpacity={0.3}
                />
              ))}
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
            </RechartsRadarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}; 