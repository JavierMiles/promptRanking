'use client';

import { Card } from "./card";
import { Icon } from "./icon";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

interface PieChartData {
  name: string;
  value: number;
  tooltipLabel?: string;
}

interface PieChartProps {
  data: PieChartData[];
  title?: string;
  height?: string;
  showLegend?: boolean;
  colors?: string[];
  cx?: string | number;
  cy?: string | number;
  innerRadius?: number;
  outerRadius?: number;
  tooltipLabel?: string;
}

export const PieChart = ({ 
  data, 
  title = "Chart", 
  height = 'h-64',
  showLegend = true,
  colors = ['#3B82F6', '#8B5CF6', '#EF4444', '#10B981', '#F59E0B', '#06B6D4'],
  cx = "50%",
  cy = "50%",
  innerRadius,
  outerRadius = 80,
  tooltipLabel = "Value",
}: PieChartProps) => {
  interface TooltipProps {
    active?: boolean;
    payload?: Array<{
      name: string;
      value: number;
      payload: {
        tooltipLabel?: string;
      };
    }>;
  }

  const CustomTooltip = ({ active, payload }: TooltipProps) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      if (!data) return null;
      
      const label = data.payload?.tooltipLabel || tooltipLabel;
      
      return (
        <div className="bg-gray-800 border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-white font-semibold">{data.name}</p>
          <p className="text-blue-400">{label}: {data.value}</p>
        </div>
      );
    }
    return null;
  };

  interface LegendProps {
    payload?: Array<{
      value: string;
      color: string;
    }>;
  }

  const CustomLegend = ({ payload }: LegendProps) => {
    if (!showLegend) return null;
    
    return (
      <div className="flex justify-center gap-4 mt-4 flex-wrap">
        {payload?.map((entry, index: number) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-xs text-gray-300">
              {entry.value} ({data[index]?.['value'] || 0})
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <div className="flex items-center gap-2">
          <Icon name="pie_chart" size={1.5} color="text-gray-400" />
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
            <RechartsPieChart>
              <Pie
                data={data}
                cx={cx}
                cy={cy}
                labelLine={false}
                label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                outerRadius={outerRadius}
                innerRadius={innerRadius}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend content={<CustomLegend />} />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  );
}; 