import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'; // Need to install recharts

interface TierData {
  name: 'Basic' | 'Premium' | 'VIP';
  value: number;
}

interface MembershipTierDistributionChartProps {
  data: TierData[];
}

const COLORS = {
  Basic: '#3b82f6', // blue-500
  Premium: '#f59e0b', // amber-500
  VIP: '#8b5cf6', // violet-500
};

const MembershipTierDistributionChart: React.FC<MembershipTierDistributionChartProps> = ({ data }) => {
  // Simple fallback if recharts isn't available or for basic display
  const renderFallback = () => (
     <ul className="space-y-2">
      {data.map((entry) => (
        <li key={entry.name} className="flex justify-between items-center text-sm">
          <span className="flex items-center">
             <span className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: COLORS[entry.name] }}></span>
             {entry.name}
          </span>
          <span className="font-medium text-gray-700">{entry.value} members</span>
        </li>
      ))}
    </ul>
  );


  return (
    <div className="bg-white p-5 rounded-lg shadow-md border border-gray-100 h-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Membership Distribution</h3>
       {/* Basic list fallback - uncomment Recharts section below after installing */}
       {renderFallback()}

      {/* Recharts Pie Chart - Requires installation: npm install recharts */}
      {/* <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {data.map((entry) => (
              <Cell key={`cell-${entry.name}`} fill={COLORS[entry.name]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer> */}
    </div>
  );
};

export default MembershipTierDistributionChart;
