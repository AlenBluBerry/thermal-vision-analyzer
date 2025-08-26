import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation } from '@/components/Navigation';
import { AuthButton } from '@/components/AuthButton';
import { FileText, Book, Code, Download } from 'lucide-react';

const Docs: React.FC = () => {
  const docSections = [
    {
      title: 'Getting Started',
      description: 'Learn the basics of thermal emission analysis',
      icon: Book,
      items: ['Quick Start Guide', 'System Requirements', 'Installation']
    },
    {
      title: 'API Reference',
      description: 'Complete API documentation for developers',
      icon: Code,
      items: ['Authentication', 'Endpoints', 'Response Formats']
    },
    {
      title: 'User Manual',
      description: 'Comprehensive guide for thermal analysis',
      icon: FileText,
      items: ['Image Upload', 'Analysis Tools', 'Report Generation']
    },
    {
      title: 'Downloads',
      description: 'Resources and sample files',
      icon: Download,
      items: ['Sample Images', 'Templates', 'SDK']
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <header className="pt-20 md:pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Documentation</h1>
              <p className="text-muted-foreground">Everything you need to know about thermal emission analysis</p>
            </div>
            <AuthButton />
          </div>
        </div>
      </header>

      {/* Documentation Grid */}
      <main className="container mx-auto px-4 pb-32 md:pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {docSections.map((section) => {
            const Icon = section.icon;
            return (
              <Card key={section.title} className="bg-card hover:bg-card-secondary transition-colors cursor-pointer group">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-foreground">{section.title}</CardTitle>
                      <CardDescription>{section.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {section.items.map((item) => (
                      <li key={item} className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Docs;