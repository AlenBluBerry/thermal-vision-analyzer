import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Home, FileText, Calculator, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigationItems = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Docs', href: '/docs', icon: FileText },
  { name: 'Tax Genius', href: '/tax-genius', icon: Calculator },
  { name: 'More', href: '/more', icon: MoreHorizontal },
];

export const Navigation: React.FC = () => {
  const location = useLocation();

  return (
    <>
      {/* Desktop Navigation - Top */}
      <nav className="hidden md:fixed md:top-4 md:left-1/2 md:transform md:-translate-x-1/2 md:flex md:z-50 bg-card/90 backdrop-blur-md border border-border rounded-full px-2 py-2 shadow-card">
        <div className="flex items-center space-x-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200",
                  isActive
                    ? "bg-foreground text-background font-medium shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm">{item.name}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Mobile Navigation - Bottom */}
      <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex md:hidden z-50 bg-card/90 backdrop-blur-md border border-border rounded-full px-2 py-2 shadow-card">
        <div className="flex items-center space-x-1">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href;
            
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={cn(
                  "flex flex-col items-center justify-center px-3 py-2 rounded-full transition-all duration-200 min-w-[60px]",
                  isActive
                    ? "bg-foreground text-background font-medium shadow-sm"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <Icon className="h-4 w-4 mb-1" />
                <span className="text-xs">{item.name}</span>
              </NavLink>
            );
          })}
        </div>
      </nav>
    </>
  );
};