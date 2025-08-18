import { useState } from 'react';
import { Eye, EyeOff, Download, AlertTriangle, CheckCircle, Layers } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface EmissionData {
  type: string;
  level: 'low' | 'medium' | 'high';
  percentage: number;
  confidence: number;
  description: string;
}

interface AnalysisResultsProps {
  imageUrl: string;
  emissions: EmissionData[];
  onBack: () => void;
}

export function AnalysisResults({ imageUrl, emissions, onBack }: AnalysisResultsProps) {
  const [showHeatmap, setShowHeatmap] = useState(true);

  const getLevelColor = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'low': return 'bg-emission-low';
      case 'medium': return 'bg-emission-medium';
      case 'high': return 'bg-emission-high';
      default: return 'bg-muted';
    }
  };

  const getLevelIcon = (level: 'low' | 'medium' | 'high') => {
    switch (level) {
      case 'low': return <CheckCircle className="w-5 h-5" />;
      case 'medium': return <AlertTriangle className="w-5 h-5" />;
      case 'high': return <AlertTriangle className="w-5 h-5" />;
      default: return null;
    }
  };

  const exportReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      imageUrl,
      emissions,
      summary: `Analysis detected ${emissions.length} emission types`
    };
    
    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `thermal-analysis-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Analysis Results
          </h1>
          <p className="text-muted-foreground mt-2">
            Thermal emission analysis completed with AI detection
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="analyzer" onClick={onBack}>
            ← New Analysis
          </Button>
          <Button variant="thermal" onClick={exportReport}>
            <Download className="w-4 h-4" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Image Analysis View */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Layers className="w-5 h-5 text-primary" />
                Thermal Analysis View
              </h2>
              <Button
                variant="analyzer"
                size="sm"
                onClick={() => setShowHeatmap(!showHeatmap)}
              >
                {showHeatmap ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showHeatmap ? 'Hide' : 'Show'} Heatmap
              </Button>
            </div>

            <div className="relative">
              <img 
                src={imageUrl} 
                alt="Thermal analysis" 
                className="w-full rounded-lg shadow-card"
              />
              
              {showHeatmap && (
                <div className="absolute inset-0 bg-gradient-to-r from-thermal-cool/30 via-thermal-warm/40 to-thermal-hot/50 rounded-lg mix-blend-overlay animate-thermal-pulse" />
              )}
              
              {/* Emission Hotspots */}
              {showHeatmap && emissions.map((emission, index) => (
                <div
                  key={index}
                  className={`absolute w-4 h-4 rounded-full ${getLevelColor(emission.level)} animate-glow-pulse shadow-thermal`}
                  style={{
                    top: `${20 + index * 15}%`,
                    left: `${30 + index * 20}%`,
                  }}
                />
              ))}
            </div>

            <div className="mt-4 p-4 bg-card-secondary rounded-lg">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-thermal-cool rounded-full" />
                  <span>Low Temp</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-thermal-warm rounded-full" />
                  <span>Medium Temp</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-thermal-hot rounded-full" />
                  <span>High Temp</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Emission Detection Results */}
        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Detection Summary</h2>
            <div className="space-y-4">
              {emissions.map((emission, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getLevelIcon(emission.level)}
                      <span className="font-medium">{emission.type}</span>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`${emission.level === 'high' ? 'bg-emission-high/20 text-emission-high' : 
                                 emission.level === 'medium' ? 'bg-emission-medium/20 text-emission-medium' : 
                                 'bg-emission-low/20 text-emission-low'}`}
                    >
                      {emission.level.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Concentration</span>
                      <span className="font-mono">{emission.percentage.toFixed(2)}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${getLevelColor(emission.level)} transition-all duration-500`}
                        style={{ width: `${Math.min(emission.percentage * 10, 100)}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>Confidence</span>
                      <span className="font-mono">{emission.confidence}%</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground border-l-2 border-primary/20 pl-3">
                    {emission.description}
                  </p>

                  {index < emissions.length - 1 && <hr className="border-border" />}
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-6">
            <h3 className="font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button variant="analyzer" className="w-full justify-start">
                <Download className="w-4 h-4" />
                Download PDF Report
              </Button>
              <Button variant="analyzer" className="w-full justify-start">
                <Download className="w-4 h-4" />
                Export CSV Data
              </Button>
              <Button variant="thermal" className="w-full justify-start">
                <Layers className="w-4 h-4" />
                View Analysis History
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}