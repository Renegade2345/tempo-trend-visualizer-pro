
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
    
    // Generate synthetic forecast data for the four models
    const forecastData = data.map((item, index) => {
      const baseValue = item[primaryColumn] || Math.random() * 100;
      
      return {
        index: index + 1,
        actual: baseValue,
        arima: baseValue + Math.sin(index * 0.1) * 5 + Math.random() * 3,
        sarima: baseValue + Math.cos(index * 0.15) * 4 + Math.random() * 2.5,
        prophet: baseValue + Math.sin(index * 0.2) * 3 + Math.random() * 2,
        lstm: baseValue + Math.sin(index * 0.08) * 6 + Math.random() * 4,
      };
    });

    return forecastData;
  }, [data]);

  if (isAnalyzing) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-4 w-1/4 bg-gray-100 rounded-lg" />
        <Skeleton className="h-80 w-full bg-gray-100 rounded-xl" />
        <div className="flex space-x-4">
          <Skeleton className="h-4 w-20 bg-gray-100 rounded-lg" />
          <Skeleton className="h-4 w-20 bg-gray-100 rounded-lg" />
          <Skeleton className="h-4 w-20 bg-gray-100 rounded-lg" />
          <Skeleton className="h-4 w-20 bg-gray-100 rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" />
          <XAxis 
            dataKey="index" 
            stroke="#9CA3AF"
            tick={{ fill: '#6B7280', fontSize: 12 }}
            axisLine={{ stroke: '#E5E7EB' }}
          />
          <YAxis 
            stroke="#9CA3AF"
            tick={{ fill: '#6B7280', fontSize: 12 }}
            axisLine={{ stroke: '#E5E7EB' }}
          />
          <Tooltip 
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: 'none',
              borderRadius: '16px',
              color: '#111827',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
              backdropFilter: 'blur(16px)'
            }}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="actual" 
            stroke="#007AFF" 
            strokeWidth={3}
            name="Actual Data"
            dot={{ fill: '#007AFF', strokeWidth: 2, r: 3 }}
          />
          <Line 
            type="monotone" 
            dataKey="arima" 
            stroke="#34C759" 
            strokeWidth={2.5}
            strokeDasharray="5 5"
            name="ARIMA"
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="sarima" 
            stroke="#FF9500" 
            strokeWidth={2.5}
            strokeDasharray="3 3"
            name="SARIMA"
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="prophet" 
            stroke="#FF3B30" 
            strokeWidth={2.5}
            strokeDasharray="7 3"
            name="Prophet"
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="lstm" 
            stroke="#AF52DE" 
            strokeWidth={2.5}
            strokeDasharray="4 4"
            name="LSTM"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DataVisualization;
