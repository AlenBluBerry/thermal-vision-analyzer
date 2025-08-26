import { ThermalAnalyzer } from '@/components/ThermalAnalyzer';
import { Navigation } from '@/components/Navigation';
import { AuthButton } from '@/components/AuthButton';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <header className="pt-20 md:pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Thermal Emission Analyzer</h1>
              <p className="text-muted-foreground">Advanced thermal analysis and emission detection</p>
            </div>
            <AuthButton />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pb-32 md:pb-8">
        <ThermalAnalyzer />
      </main>
    </div>
  );
};

export default Index;
