
import { useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, BarChart3, TrendingUp, FileText } from 'lucide-react';
import FileUpload from '@/components/FileUpload';
import DataVisualization from '@/components/DataVisualization';
import ModelComparison from '@/components/ModelComparison';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [data, setData] = useState<any[]>([]);
  const [fileName, setFileName] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = useCallback((uploadedData: any[], name: string) => {
    setData(uploadedData);
    setFileName(name);
    toast({
      title: "File uploaded successfully!",
      description: `${name} has been processed and is ready for analysis.`,
    });
  }, [toast]);

  const handleAnalyze = useCallback(() => {
    setIsAnalyzing(true);
    // Simulate analysis time
    setTimeout(() => {
      setIsAnalyzing(false);
      toast({
        title: "Analysis Complete!",
        description: "All forecasting models have been applied to your data.",
      });
    }, 2000);
  }, [toast]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Tempo Trend Visualizer Pro
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Advanced time series analysis and forecasting platform. Upload your data and compare multiple ML models with interactive visualizations.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border-blue-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Upload className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <p className="text-blue-400 text-sm font-medium">Data Upload</p>
                  <p className="text-white text-2xl font-bold">CSV Ready</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border-purple-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <BarChart3 className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-purple-400 text-sm font-medium">Models</p>
                  <p className="text-white text-2xl font-bold">4 Active</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/20 to-green-600/20 border-green-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-green-400" />
                </div>
                <div>
                  <p className="text-green-400 text-sm font-medium">Accuracy</p>
                  <p className="text-white text-2xl font-bold">High</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 border-orange-500/20 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-orange-500/20 rounded-lg">
                  <FileText className="h-6 w-6 text-orange-400" />
                </div>
                <div>
                  <p className="text-orange-400 text-sm font-medium">Reports</p>
                  <p className="text-white text-2xl font-bold">Ready</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* File Upload Section */}
          <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Data Upload
              </CardTitle>
              <CardDescription className="text-slate-400">
                Upload your time series dataset (CSV format) to begin analysis
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload onFileUpload={handleFileUpload} />
              {fileName && (
                <div className="mt-4 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-green-400 font-medium">File loaded: {fileName}</p>
                  <p className="text-slate-400 text-sm">{data.length} data points ready for analysis</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Analysis Button */}
          {data.length > 0 && (
            <div className="flex justify-center">
              <Button 
                onClick={handleAnalyze}
                disabled={isAnalyzing}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 text-lg"
              >
                {isAnalyzing ? 'Analyzing...' : 'Run Forecasting Analysis'}
              </Button>
            </div>
          )}

          {/* Data Visualization */}
          {data.length > 0 && (
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  Time Series Visualization
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Interactive charts showing your data and model predictions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DataVisualization data={data} isAnalyzing={isAnalyzing} />
              </CardContent>
            </Card>
          )}

          {/* Model Comparison */}
          {data.length > 0 && !isAnalyzing && (
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Model Performance Comparison
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Compare accuracy metrics across all forecasting models
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ModelComparison data={data} />
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
