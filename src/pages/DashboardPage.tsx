import React from 'react';
import StatCard from '../components/dashboard/StatCard';
import RecentActivityFeed from '../components/dashboard/RecentActivityFeed';
import MembershipTierDistributionChart from '../components/dashboard/MembershipTierDistributionChart';
import QuickActions from '../components/dashboard/QuickActions';
import { Users, DollarSign, UserCheck, BarChartHorizontal } from 'lucide-react';

// Mock Data Generation
const generateMockData = () => {
  const totalMembers = 1250;
  const newMembersThisMonth = 75;
  const monthlyRevenue = 5230.50;
  const previousMonthRevenue = 4980.00;
  const revenueChange = (((monthlyRevenue - previousMonthRevenue) / previousMonthRevenue) * 100).toFixed(1);

  const activities = [
    { id: 'a1', type: 'new_member', description: 'Alice Johnson joined (Premium)', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() },
    { id: 'a2', type: 'renewal', description: 'Bob Smith renewed (Basic)', timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString() },
    { id: 'a3', type: 'tier_change', description: 'Charlie Brown upgraded to VIP', timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString() },
    { id: 'a4', type: 'new_member', description: 'Diana Prince joined (Basic)', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() },
  ] as const; // Use 'as const' for stricter type inference if needed

  const tierData = [
    { name: 'Basic', value: Math.floor(totalMembers * 0.6) },
    { name: 'Premium', value: Math.floor(totalMembers * 0.3) },
    { name: 'VIP', value: Math.floor(totalMembers * 0.1) },
  ] as const;

  // Ensure tier counts roughly add up to totalMembers (adjust last one)
  const calculatedSum = tierData.reduce((sum, tier) => sum + tier.value, 0);
  tierData[tierData.length - 1].value += totalMembers - calculatedSum;


  return {
    stats: {
      totalMembers,
      newMembersThisMonth,
      monthlyRevenue,
      revenueChange: `+${revenueChange}%`, // Format change string
      activeMembers: Math.floor(totalMembers * 0.85), // Mock active members for "Engagement"
    },
    activities,
    tierData,
  };
};


interface DashboardPageProps {
   onAddMemberClick: () => void; // To open the Add Member form modal
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onAddMemberClick }) => {
  const mockData = generateMockData();

  return (
    <div className="p-6 bg-gray-50 min-h-full"> {/* Ensure page takes height */}
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard Overview</h2>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          icon={Users}
          title="Total Members"
          value={mockData.stats.totalMembers}
          change={`+${mockData.stats.newMembersThisMonth} this month`}
          changeType="positive"
          bgColorClass="bg-blue-500"
          iconColorClass="text-blue-100"
        />
        <StatCard
          icon={DollarSign}
          title="Monthly Revenue"
          value={`$${mockData.stats.monthlyRevenue.toFixed(2)}`}
          change={mockData.stats.revenueChange}
          changeType="positive"
           bgColorClass="bg-green-500"
           iconColorClass="text-green-100"
        />
         <StatCard
          icon={UserCheck}
          title="Active Members"
          value={mockData.stats.activeMembers}
          // change="-2% vs last month" // Example change
          // changeType="negative"
           bgColorClass="bg-yellow-500"
           iconColorClass="text-yellow-100"
        />
         <StatCard
          icon={BarChartHorizontal} // Placeholder for Engagement/Analytics
          title="Engagement Score"
          value="7.8/10" // Mock score
          change="+0.2"
          changeType="positive"
           bgColorClass="bg-purple-500"
           iconColorClass="text-purple-100"
        />
      </div>

      {/* Quick Actions */}
       <div className="mb-6">
         <QuickActions onAddMemberClick={onAddMemberClick} />
       </div>


      {/* Charts and Feeds Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
           <MembershipTierDistributionChart data={mockData.tierData} />
        </div>
        <div className="lg:col-span-2">
          <RecentActivityFeed activities={mockData.activities} />
        </div>
      </div>

       {/* Placeholder for Exclusive Content/Offers stats */}
       {/* <div className="mt-6 bg-white p-5 rounded-lg shadow-md border border-gray-100">
         <h3 className="text-lg font-semibold text-gray-800 mb-4">Content & Offer Performance</h3>
         <p className="text-gray-500 text-sm">Analytics on premium content access and offer conversion rates will appear here.</p>
       </div> */}

    </div>
  );
};

export default DashboardPage;
