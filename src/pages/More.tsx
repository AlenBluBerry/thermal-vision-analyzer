import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navigation } from '@/components/Navigation';
import { AuthButton } from '@/components/AuthButton';
import { Settings, Users, HelpCircle, Mail, Zap, Star } from 'lucide-react';

const More: React.FC = () => {
  const sections = [
    {
      title: 'Account Settings',
      description: 'Manage your profile and preferences',
      icon: Settings,
      items: ['Profile Settings', 'Notifications', 'Privacy']
    },
    {
      title: 'Team Management',
      description: 'Collaborate with your team',
      icon: Users,
      items: ['Invite Members', 'Role Management', 'Team Analytics']
    },
    {
      title: 'Support',
      description: 'Get help when you need it',
      icon: HelpCircle,
      items: ['Help Center', 'Contact Support', 'Community Forum']
    },
    {
      title: 'Contact Us',
      description: 'Reach out to our team',
      icon: Mail,
      items: ['Sales Inquiry', 'Technical Support', 'Feedback']
    },
    {
      title: 'Integrations',
      description: 'Connect with your favorite tools',
      icon: Zap,
      items: ['API Access', 'Webhooks', 'Third-party Apps']
    },
    {
      title: 'Premium Features',
      description: 'Unlock advanced capabilities',
      icon: Star,
      items: ['Advanced Analytics', 'Priority Support', 'Custom Reports']
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
              <h1 className="text-3xl font-bold text-foreground mb-2">More Options</h1>
              <p className="text-muted-foreground">Additional tools and settings for your thermal analysis platform</p>
            </div>
            <AuthButton />
          </div>
        </div>
      </header>

      {/* Sections Grid */}
      <main className="container mx-auto px-4 pb-32 md:pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Card key={section.title} className="bg-card hover:bg-card-secondary transition-colors cursor-pointer group">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-sm font-medium text-foreground">{section.title}</CardTitle>
                      <CardDescription className="text-xs">{section.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-1">
                    {section.items.map((item) => (
                      <li key={item} className="text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
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

export default More;