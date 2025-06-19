
import { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Skeleton } from "@/components/ui/skeleton";

interface DataVisualizationProps {
  data: any[];
  isAnalyzing: boolean;
}

const DataVisualization = ({ data, isAnalyzing }: DataVisualizationProps) => {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) return [];

    // Find numeric columns for analysis
    const numericColumns = Object.keys(data[0]).filter(key => 
      typeof data[0][key] === 'number' && key !== 'index'
    );

    const primaryColumn = numericColumns[0] || 'value';
    
    // Generate synthetic forecast data for demonstration
    const forecastData = data.map((item, index) => {
      const baseValue = item[primaryColumn] || Math.random() * 100;
      
      return {
        index: index + 1,
        actual: baseValue,
        linearRegression: baseValue + Math.sin(index * 0.1) * 5 + Math.random() * 3,
        arima: baseValue + Math.cos(index * 0.15) * 4 + Math.random() * 2,
        prophet: baseValue + Math.sin(index * 0.2) * 3 + Math.random() * 2.5,
        exponentialSmoothing: baseValue + Math.sin(index * 0.08) * 6 + Math.random() * 4,
      };
    });

    return forecastData;
  }, [data]);

  if (isAnalyzing) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-4 w-1/4 bg-slate-700" />
        <Skeleton className="h-80 w-full bg-slate-700" />
        <div className="flex space-x-4">
          <Skeleton className="h-4 w-20 bg-slate-700" />
          <Skeleton className="h-4 w-20 bg-slate-700" />
          <Skeleton className="h-4 w-20 bg-slate-700" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
          <XAxis 
            dataKey="index" 
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF' }}
          />
          <YAxis 
            stroke="#9CA3AF"
            tick={{ fill: '#9CA3AF' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: '#1F2937',
              border: '1px solid #374151',
              borderRadius: '8px',
              color: '#F9FAFB'
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="actual" 
            stroke="#3B82F6" 
            strokeWidth={3}
            name="Actual Data"
            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 3 }}
          />
          <Line 
            type="monotone" 
            dataKey="linearRegression" 
            stroke="#10B981" 
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Linear Regression"
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="arima" 
            stroke="#F59E0B" 
            strokeWidth={2}
            strokeDasharray="3 3"
            name="ARIMA"
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="prophet" 
            stroke="#EF4444" 
            strokeWidth={2}
            strokeDasharray="7 3"
            name="Prophet"
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="exponentialSmoothing" 
            stroke="#8B5CF6" 
            strokeWidth={2}
            strokeDasharray="4 4"
            name="Exponential Smoothing"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DataVisualization;
