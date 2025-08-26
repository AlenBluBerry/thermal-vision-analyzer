import { useState } from 'react';
import { ThermalUploader } from './ThermalUploader';
import { AnalysisResults } from './AnalysisResults';
import { Card } from '@/components/ui/card';
import { Loader2, Zap, Thermometer } from 'lucide-react';
import thermalHero from '@/assets/thermal-hero.jpg';

type AnalysisState = 'upload' | 'processing' | 'results';

interface EmissionData {
  type: string;
  level: 'low' | 'medium' | 'high';
  percentage: number;
  confidence: number;
  description: string;
}

export function ThermalAnalyzer() {
  const [currentState, setCurrentState] = useState<AnalysisState>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [analysisResults, setAnalysisResults] = useState<EmissionData[]>([]);

  const isProcessing = currentState === 'processing';

  const handleFileUpload = (file: File) => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setImageUrl(url);
  };

  const handleStartAnalysis = () => {
    setCurrentState('processing');
    
    // Simulate AI analysis with realistic delay
    setTimeout(() => {
      // Mock analysis results
      const mockResults: EmissionData[] = [
        {
          type: 'Methane (CH₄)',
          level: 'high',
          percentage: 3.24,
          confidence: 94,
          description: 'Significant methane emissions detected near pipeline junction. Immediate attention recommended.'
        },
        {
          type: 'Carbon Dioxide (CO₂)',
          level: 'medium',
          percentage: 1.87,
          confidence: 87,
          description: 'Moderate CO₂ levels detected from industrial ventilation system.'
        },
        {
          type: 'Nitrogen Oxides (NOx)',
          level: 'low',
          percentage: 0.42,
          confidence: 76,
          description: 'Low-level NOx emissions within acceptable limits for industrial facility.'
        }
      ];

      setAnalysisResults(mockResults);
      setCurrentState('results');
    }, 4000);
  };

  const handleBackToUpload = () => {
    setCurrentState('upload');
    setSelectedFile(null);
    setImageUrl('');
    setAnalysisResults([]);
  };

  if (currentState === 'processing') {
    return (
      <div className="flex items-center justify-center p-6 min-h-[50vh]">
        <Card className="p-12 text-center max-w-md w-full">
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
                  <Thermometer className="w-10 h-10 text-primary animate-thermal-pulse" />
                </div>
                <div className="absolute inset-0 bg-primary/10 rounded-full animate-glow-pulse" />
              </div>
            </div>
            
            <div className="space-y-3">
              <h2 className="text-2xl font-bold">Analyzing Thermal Image</h2>
              <p className="text-muted-foreground">
                AI models are processing your image for emission detection...
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span className="font-mono">Processing thermal data...</span>
              </div>
              
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-gradient-to-r from-primary to-primary-glow h-2 rounded-full animate-scanning" />
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <span>Analyzing spectral signatures</span>
                </div>
                <div className="flex items-center gap-2">
                  <Thermometer className="w-4 h-4 text-primary" />
                  <span>Detecting emission patterns</span>
                </div>
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-primary animate-spin" />
                  <span>Computing confidence scores</span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  if (currentState === 'results') {
    return (
      <div className="container mx-auto px-4">
        <AnalysisResults 
          imageUrl={imageUrl}
          emissions={analysisResults}
          onBack={handleBackToUpload}
        />
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Hero Background */}
      <div className="absolute inset-0 opacity-5">
        <img 
          src={thermalHero} 
          alt="Thermal analysis background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <ThermalUploader 
          onFileUpload={handleFileUpload}
          onStartAnalysis={handleStartAnalysis}
          isProcessing={isProcessing}
        />
      </div>
    </div>
  );
}