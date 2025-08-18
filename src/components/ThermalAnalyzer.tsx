import { useState } from 'react';
import { ThermalUploader } from './ThermalUploader';
import { AnalysisResults } from './AnalysisResults';
import { AuthButton } from './AuthButton';
import { Card } from '@/components/ui/card';
import { Loader2, Zap, Thermometer } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
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
  const { user } = useAuth();
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
      <div className="min-h-screen">
        {/* Header */}
        <header className="border-b border-border/40 bg-background/50 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm opacity-80" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Thermal Analyzer
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user?.user_metadata?.full_name || user?.email || 'User'}
              </span>
              <AuthButton />
            </div>
          </div>
        </header>

        {/* Processing Content */}
        <div className="flex items-center justify-center p-6 min-h-[calc(100vh-80px)]">
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
      </div>
    );
  }

  if (currentState === 'results') {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-border/40 bg-background/50 backdrop-blur-sm">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-sm opacity-80" />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Thermal Analyzer
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user?.user_metadata?.full_name || user?.email || 'User'}
              </span>
              <AuthButton />
            </div>
          </div>
        </header>

        {/* Results Content */}
        <div className="p-6">
          <AnalysisResults 
            imageUrl={imageUrl}
            emissions={analysisResults}
            onBack={handleBackToUpload}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      {/* Header */}
      <header className="border-b border-border/40 bg-background/50 backdrop-blur-sm relative z-20">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
              <div className="w-4 h-4 bg-white rounded-sm opacity-80" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Thermal Analyzer
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">
              Welcome, {user?.user_metadata?.full_name || user?.email || 'User'}
            </span>
            <AuthButton />
          </div>
        </div>
      </header>

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
      <div className="relative z-10 p-6">
        <ThermalUploader 
          onFileUpload={handleFileUpload}
          onStartAnalysis={handleStartAnalysis}
          isProcessing={isProcessing}
        />
      </div>
    </div>
  );
}