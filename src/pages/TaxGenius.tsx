import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/Navigation';
import { AuthButton } from '@/components/AuthButton';
import { Calculator, TrendingUp, FileCheck, Shield } from 'lucide-react';

const TaxGenius: React.FC = () => {
  const features = [
    {
      title: 'Smart Calculations',
      description: 'AI-powered tax calculations for thermal analysis equipment',
      icon: Calculator,
    },
    {
      title: 'Depreciation Tracking',
      description: 'Track equipment depreciation and tax benefits',
      icon: TrendingUp,
    },
    {
      title: 'Compliance Reports',
      description: 'Generate tax-compliant reports for thermal equipment',
      icon: FileCheck,
    },
    {
      title: 'Audit Protection',
      description: 'Ensure your thermal analysis deductions are audit-ready',
      icon: Shield,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <header className="pt-20 md:pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Tax Genius</h1>
              <p className="text-muted-foreground">Smart tax solutions for thermal analysis equipment</p>
            </div>
            <AuthButton />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 pb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            Maximize Your <span className="gradient-primary bg-clip-text text-transparent">Tax Benefits</span>
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Turn your thermal analysis investments into tax advantages with our intelligent tax optimization platform.
          </p>
          <Button className="bg-primary hover:bg-primary-glow text-primary-foreground glow-primary">
            Get Started
          </Button>
        </div>
      </section>

      {/* Features Grid */}
      <main className="container mx-auto px-4 pb-32 md:pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} className="bg-card hover:bg-card-secondary transition-colors group">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-foreground">{feature.title}</CardTitle>
                      <CardDescription>{feature.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default TaxGenius;