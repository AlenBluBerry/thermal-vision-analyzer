import { useState, useCallback } from 'react';
import { Upload, FileImage, Scan, Thermometer } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface ThermalUploaderProps {
  onFileUpload: (file: File) => void;
  onStartAnalysis: () => void;
  isProcessing?: boolean;
}

export function ThermalUploader({ onFileUpload, onStartAnalysis, isProcessing = false }: ThermalUploaderProps) {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { toast } = useToast();

  const validateFileType = (file: File): boolean => {
    const supportedTypes = [
      'image/jpeg',
      'image/jpg', 
      'image/png',
      'image/tiff',
      'image/tif'
    ];
    
    const supportedExtensions = ['.jpg', '.jpeg', '.png', '.tiff', '.tif'];
    const fileExtension = file.name.toLowerCase().substring(file.name.lastIndexOf('.'));
    
    return supportedTypes.includes(file.type) || supportedExtensions.includes(fileExtension);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const imageFile = files.find(file => validateFileType(file));
    
    if (imageFile) {
      handleFileSelect(imageFile);
    } else if (files.length > 0) {
      toast({
        title: "Unsupported File Format",
        description: "Please upload a thermal image in JPG, PNG, or TIFF format.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const handleFileSelect = (file: File) => {
    if (!validateFileType(file)) {
      toast({
        title: "Unsupported File Format",
        description: "Please upload a thermal image in JPG, PNG, or TIFF format.",
        variant: "destructive",
      });
      return;
    }

    setSelectedFile(file);
    onFileUpload(file);
    
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
    
    toast({
      title: "Image Uploaded Successfully",
      description: "Your thermal image is ready for analysis.",
    });
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
    // Reset input value to allow selecting the same file again
    e.target.value = '';
  };

  const startAnalysis = () => {
    if (selectedFile) {
      onStartAnalysis();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-4 bg-card rounded-full border border-primary/20 shadow-glow">
            <Thermometer className="w-8 h-8 text-primary animate-thermal-pulse" />
          </div>
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
          Thermal Emission Analyzer
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Upload thermal images to detect and analyze methane, CO₂, and other industrial emissions with AI-powered precision
        </p>
      </div>

      {/* Upload Area */}
      <Card className="p-8">
        <div
          className={`
            border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300
            ${dragOver 
              ? 'border-primary bg-primary/5 shadow-glow' 
              : 'border-border hover:border-primary/50 hover:bg-card-secondary'
            }
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {previewUrl ? (
            <div className="space-y-6">
              <div className="relative inline-block">
                <img 
                  src={previewUrl} 
                  alt="Thermal image preview" 
                  className="max-w-md max-h-64 rounded-lg shadow-card mx-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg" />
              </div>
              <div className="space-y-2">
                <p className="text-foreground font-medium">{selectedFile?.name}</p>
                <p className="text-sm text-muted-foreground">
                  {selectedFile && (selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex justify-center">
                <Upload className="w-16 h-16 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl font-semibold">Upload Thermal Image</h3>
                <p className="text-muted-foreground">
                  Drag and drop your thermal image here, or click to browse
                </p>
                <p className="text-sm text-muted-foreground">
                  Supports JPG, PNG, TIFF, and FLIR formats
                </p>
              </div>
            </div>
          )}

          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
            <div>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.tiff,.tif"
                onChange={handleFileInput}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload">
                <Button variant="analyzer" size="lg" className="cursor-pointer" asChild>
                  <span>
                    <FileImage className="w-5 h-5" />
                    {previewUrl ? 'Change Image' : 'Browse Files'}
                  </span>
                </Button>
              </label>
            </div>

            {selectedFile && (
              <Button 
                variant="thermal" 
                size="lg" 
                onClick={startAnalysis}
                disabled={isProcessing}
                className="animate-glow-pulse"
              >
                <Scan className="w-5 h-5" />
                {isProcessing ? 'Analyzing...' : 'Start Analysis'}
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Analysis Types */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 text-center border-primary/20 hover:border-primary/40 transition-colors duration-300">
          <div className="w-12 h-12 bg-emission-low/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <div className="w-6 h-6 bg-emission-low rounded-full animate-thermal-pulse" />
          </div>
          <h3 className="font-semibold text-emission-low mb-2">Methane Detection</h3>
          <p className="text-sm text-muted-foreground">Detect CH₄ leaks and emissions</p>
        </Card>

        <Card className="p-6 text-center border-primary/20 hover:border-primary/40 transition-colors duration-300">
          <div className="w-12 h-12 bg-emission-medium/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <div className="w-6 h-6 bg-emission-medium rounded-full animate-thermal-pulse" />
          </div>
          <h3 className="font-semibold text-emission-medium mb-2">CO₂ Analysis</h3>
          <p className="text-sm text-muted-foreground">Carbon dioxide emission tracking</p>
        </Card>

        <Card className="p-6 text-center border-primary/20 hover:border-primary/40 transition-colors duration-300">
          <div className="w-12 h-12 bg-emission-high/20 rounded-lg flex items-center justify-center mx-auto mb-4">
            <div className="w-6 h-6 bg-emission-high rounded-full animate-thermal-pulse" />
          </div>
          <h3 className="font-semibold text-emission-high mb-2">Multi-Gas Detection</h3>
          <p className="text-sm text-muted-foreground">NOx, SO₂ and other compounds</p>
        </Card>
      </div>
    </div>
  );
}