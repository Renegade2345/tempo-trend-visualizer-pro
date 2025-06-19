
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, X } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface FileUploadProps {
  onFileUpload: (data: any[], fileName: string) => void;
}

const FileUpload = ({ onFileUpload }: FileUploadProps) => {
  const [isDragActive, setIsDragActive] = useState(false);
  const { toast } = useToast();

  const parseCSV = (csvText: string) => {
    const lines = csvText.split('\n').filter(line => line.trim());
    const headers = lines[0].split(',').map(h => h.trim());
    
    const data = lines.slice(1).map((line, index) => {
      const values = line.split(',').map(v => v.trim());
      const row: any = { index: index + 1 };
      
      headers.forEach((header, i) => {
        const value = values[i];
        // Try to parse as number, fallback to string
        const numValue = parseFloat(value);
        row[header] = isNaN(numValue) ? value : numValue;
        
        // Also try to parse dates
        if (!isNaN(Date.parse(value))) {
          row[`${header}_date`] = new Date(value);
        }
      });
      
      return row;
    });

    return data;
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV file.",
        variant: "destructive",
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const csvText = e.target?.result as string;
        const parsedData = parseCSV(csvText);
        
        if (parsedData.length === 0) {
          toast({
            title: "Empty file",
            description: "The CSV file appears to be empty.",
            variant: "destructive",
          });
          return;
        }

        onFileUpload(parsedData, file.name);
      } catch (error) {
        toast({
          title: "Error parsing file",
          description: "There was an error reading the CSV file.",
          variant: "destructive",
        });
      }
    };
    reader.readAsText(file);
  }, [onFileUpload, toast]);

  const { getRootProps, getInputProps, isDragActive: dropzoneActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        dropzoneActive
          ? 'border-blue-400 bg-blue-500/10'
          : 'border-slate-600 hover:border-slate-500 bg-slate-700/30'
      }`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center space-y-4">
        <div className={`p-4 rounded-full ${
          dropzoneActive ? 'bg-blue-500/20' : 'bg-slate-600/20'
        }`}>
          <Upload className={`h-8 w-8 ${
            dropzoneActive ? 'text-blue-400' : 'text-slate-400'
          }`} />
        </div>
        <div>
          <p className="text-lg font-medium text-white">
            {dropzoneActive ? 'Drop your CSV file here' : 'Drag & drop your CSV file here'}
          </p>
          <p className="text-slate-400 mt-2">
            or click to browse files
          </p>
        </div>
        <div className="text-sm text-slate-500">
          Supported format: CSV files only
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
