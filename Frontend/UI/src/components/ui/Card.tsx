import React, { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className, 
  title, 
  subtitle 
}) => {
  return (
    <div className={cn(
      "bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md",
      className
    )}>
      {(title || subtitle) && (
        <div className="p-4 border-b border-gray-100">
          {title && <h3 className="text-lg font-medium text-gray-900">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
};

interface StatCardProps {
  title: string;
  value: number | string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  trend?: 'up' | 'down' | 'neutral';
  change?: number;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  trend,
  change,
  className,
}) => {
  return (
    <div className={cn(
      "bg-white rounded-lg shadow-sm border border-gray-200 p-4 transition-all duration-200 hover:shadow-md",
      className
    )}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <h4 className="mt-2 text-2xl font-semibold text-gray-900">{value}</h4>
          
          {trend && change !== undefined && (
            <div className="mt-2 flex items-center">
              <span 
                className={cn(
                  "text-xs font-medium mr-1",
                  trend === 'up' ? "text-green-600" : 
                  trend === 'down' ? "text-red-600" : 
                  "text-gray-600"
                )}
              >
                {change > 0 ? '+' : ''}{change}%
              </span>
              <span className="text-xs text-gray-500">from last month</span>
            </div>
          )}
        </div>
        
        {Icon && (
          <div className="p-2 bg-indigo-50 rounded-md">
            <Icon className="h-5 w-5 text-indigo-600" />
          </div>
        )}
      </div>
    </div>
  );
};