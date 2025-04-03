import React from 'react';

interface StatCardProps {
  icon: React.ElementType;
  title: string;
  value: string | number;
  change?: string; // e.g., "+5%" or "-10"
  changeType?: 'positive' | 'negative' | 'neutral';
  bgColorClass?: string; // Optional background color class
  iconColorClass?: string; // Optional icon color class
}

const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  title,
  value,
  change,
  changeType = 'neutral',
  bgColorClass = 'bg-indigo-500',
  iconColorClass = 'text-indigo-100'
}) => {
  const changeColor = changeType === 'positive' ? 'text-green-500' : changeType === 'negative' ? 'text-red-500' : 'text-gray-500';

  return (
    <div className="bg-white p-5 rounded-lg shadow-md border border-gray-100 flex items-center space-x-4 hover:shadow-lg transition-shadow duration-200">
      <div className={`p-3 rounded-full ${bgColorClass} ${iconColorClass}`}>
        <Icon size={24} />
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
        <div className="flex items-baseline space-x-2">
           <p className="text-2xl font-semibold text-gray-900">{value}</p>
           {change && (
             <span className={`text-sm font-medium ${changeColor}`}>
               {change}
             </span>
           )}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
