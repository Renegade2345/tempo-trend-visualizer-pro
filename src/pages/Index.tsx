
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-light text-gray-900 mb-4 tracking-tight">
            Tempo Trend Visualizer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
            Advanced time series analysis and forecasting platform with interactive visualizations
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-50 rounded-xl">
                  <Upload className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Data Upload</p>
                  <p className="text-xl font-semibold text-gray-900">CSV Ready</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-50 rounded-xl">
                  <BarChart3 className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Models</p>
                  <p className="text-xl font-semibold text-gray-900">4 Active</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-50 rounded-xl">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Accuracy</p>
                  <p className="text-xl font-semibold text-gray-900">High</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/70 backdrop-blur-sm border-0 shadow-sm hover:shadow-md transition-shadow duration-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-orange-50 rounded-xl">
                  <FileText className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 mb-1">Reports</p>
                  <p className="text-xl font-semibold text-gray-900">Ready</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* File Upload Section */}
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="pb-4">
              <CardTitle className="text-gray-900 flex items-center gap-3 text-xl font-semibold">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Upload className="h-5 w-5 text-blue-600" />
                </div>
                Data Upload
              </CardTitle>
              <CardDescription className="text-gray-600 font-light">
                Upload your time series dataset (CSV format) to begin analysis
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <FileUpload onFileUpload={handleFileUpload} />
              {fileName && (
                <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-xl">
                  <p className="text-green-700 font-medium mb-1">File loaded: {fileName}</p>
                  <p className="text-green-600 text-sm font-light">{data.length} data points ready for analysis</p>
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
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-base font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-70"
              >
                {isAnalyzing ? 'Analyzing...' : 'Run Forecasting Analysis'}
              </Button>
            </div>
          )}

          {/* Data Visualization */}
          {data.length > 0 && (
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-gray-900 flex items-center gap-3 text-xl font-semibold">
                  <div className="p-2 bg-purple-50 rounded-lg">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                  </div>
                  Time Series Visualization
                </CardTitle>
                <CardDescription className="text-gray-600 font-light">
                  Interactive charts showing your data and model predictions
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <DataVisualization data={data} isAnalyzing={isAnalyzing} />
              </CardContent>
            </Card>
          )}

          {/* Model Comparison */}
          {data.length > 0 && !isAnalyzing && (
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
              <CardHeader className="pb-4">
                <CardTitle className="text-gray-900 flex items-center gap-3 text-xl font-semibold">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  Model Performance Comparison
                </CardTitle>
                <CardDescription className="text-gray-600 font-light">
                  Compare accuracy metrics across all forecasting models
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
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
