'use client';

import { Card } from "./card";
import { Icon } from "./icon";
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface BarChartData {
  name: string;
  value: number;
  tooltipLabel?: string;
}

interface BarChartProps {
  data: BarChartData[];
  title?: string;
  height?: string;
  dataKey?: string;
  color?: string;
  xAxisDataKey?: string;
  maxValue?: number;
  tooltipLabel?: string;
}

export const BarChart = ({ 
  data, 
  title = "Chart", 
  height = 'h-64',
  dataKey = 'value',
  color = '#3B82F6',
  xAxisDataKey = 'name',
  maxValue,
  tooltipLabel = "Value"
}: BarChartProps) => {
  interface TooltipProps {
    active?: boolean;
    payload?: Array<{
      name: string;
      value: number;
      color?: string;
      payload: {
        tooltipLabel?: string;
      };
    }>;
    label?: string;
  }

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-white font-semibold">{label}</p>
          {payload.map((entry, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.payload?.tooltipLabel || tooltipLabel}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div className="flex items-center gap-2">
          <Icon name="analytics" size={1.5} color="text-gray-400" />
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
            <RechartsBarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey={xAxisDataKey} 
                stroke="#9CA3AF"
                fontSize={12}
                tick={{ fill: '#9CA3AF' }}
              />
              <YAxis 
                stroke="#9CA3AF"
                fontSize={12}
                tick={{ fill: '#9CA3AF' }}
                domain={maxValue ? [0, maxValue] : undefined}
              />
              <Tooltip content={<CustomTooltip />} />
              <Bar 
                dataKey={dataKey} 
                fill={color}
                radius={[4, 4, 0, 0]}
              />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}; 