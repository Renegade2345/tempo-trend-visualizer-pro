
import { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ModelComparisonProps {
  data: any[];
}

const ModelComparison = ({ data }: ModelComparisonProps) => {
  const performanceMetrics = useMemo(() => {
    // Generate realistic performance metrics for demonstration
    const metrics = [
      {
        model: 'Linear Regression',
        mae: 12.45,
        rmse: 18.23,
        mape: 8.7,
        r2: 0.85,
        color: '#10B981'
      },
      {
        model: 'ARIMA',
        mae: 10.32,
        rmse: 15.67,
        mape: 7.2,
        r2: 0.89,
        color: '#F59E0B'
      },
      {
        model: 'Prophet',
        mae: 9.87,
        rmse: 14.45,
        mape: 6.8,
        r2: 0.92,
        color: '#EF4444'
      },
      {
        model: 'Exponential Smoothing',
        mae: 11.76,
        rmse: 16.89,
        mape: 8.1,
        r2: 0.87,
        color: '#8B5CF6'
      }
    ];

    return metrics.sort((a, b) => a.mae - b.mae);
  }, [data]);

  const getBestModelBadge = (metricValue: number, metricType: string) => {
    const isLowest = metricType !== 'r2';
    const sortedValues = performanceMetrics
      .map(m => m[metricType as keyof typeof m] as number)
      .sort((a, b) => isLowest ? a - b : b - a);
    
    const isBest = metricValue === sortedValues[0];
    
    return isBest ? (
      <Badge className="ml-2 bg-green-500/20 text-green-400 border-green-500/30">
        Best
      </Badge>
    ) : null;
  };

  return (
    <div className="space-y-6">
      {/* Performance Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {performanceMetrics.map((model) => (
          <Card key={model.model} className="bg-slate-700/30 border-slate-600">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-sm flex items-center">
                <div 
                  className="w-3 h-3 rounded-full mr-2" 
                  style={{ backgroundColor: model.color }}
                />
                {model.model}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-xs">MAE</span>
                <div className="flex items-center">
                  <span className="text-white font-mono text-sm">{model.mae}</span>
                  {getBestModelBadge(model.mae, 'mae')}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-xs">RMSE</span>
                <div className="flex items-center">
                  <span className="text-white font-mono text-sm">{model.rmse}</span>
                  {getBestModelBadge(model.rmse, 'rmse')}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-xs">MAPE %</span>
                <div className="flex items-center">
                  <span className="text-white font-mono text-sm">{model.mape}</span>
                  {getBestModelBadge(model.mape, 'mape')}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-xs">R²</span>
                <div className="flex items-center">
                  <span className="text-white font-mono text-sm">{model.r2}</span>
                  {getBestModelBadge(model.r2, 'r2')}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Performance Comparison Chart */}
      <Card className="bg-slate-700/30 border-slate-600">
        <CardHeader>
          <CardTitle className="text-white">Model Performance Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="model" 
                  stroke="#9CA3AF"
                  tick={{ fill: '#9CA3AF', fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
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
                <Bar 
                  dataKey="mae" 
                  fill="#3B82F6"
                  name="MAE"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Winner Announcement */}
      <Card className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30">
        <CardContent className="p-6">
          <div className="text-center">
            <h3 className="text-xl font-bold text-green-400 mb-2">
              🏆 Best Performing Model
            </h3>
            <p className="text-white text-lg">
              <strong>{performanceMetrics[0].model}</strong> achieved the lowest error rates
            </p>
            <p className="text-slate-300 text-sm mt-2">
              MAE: {performanceMetrics[0].mae} | RMSE: {performanceMetrics[0].rmse} | R²: {performanceMetrics[0].r2}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ModelComparison;
