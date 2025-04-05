import React, { useState, useEffect } from 'react';
import StatCard from '../components/dashboard/StatCard';
import RecentActivityFeed from '../components/dashboard/RecentActivityFeed';
import MembershipTierDistributionChart from '../components/dashboard/MembershipTierDistributionChart';
import QuickActions from '../components/dashboard/QuickActions';
import { Users, DollarSign, UserCheck, BarChartHorizontal } from 'lucide-react';
import { supabase } from '../supabaseClient';

interface DashboardPageProps {
   onAddMemberClick: () => void; // To open the Add Member form modal
}

const DashboardPage: React.FC<DashboardPageProps> = ({ onAddMemberClick }) => {
  const [totalMembers, setTotalMembers] = useState(0);
  const [newMembersThisMonth, setNewMembersThisMonth] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [activeMembers, setActiveMembers] = useState(0);
  const [tierData, setTierData] = useState<{ name: string; value: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch total members
        const { data: membersData, error: membersError } = await supabase
          .from('members')
          .select('*', { count: 'exact' });

        if (membersError) {
          setError(membersError.message);
          throw membersError;
        }

        const totalMembersCount = membersData ? membersData.length : 0;
        setTotalMembers(totalMembersCount);

        // Fetch new members this month
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        const { data: newMembersData, error: newMembersError } = await supabase
          .from('members')
          .select('*', { count: 'exact' })
          .gte('join_date', startOfMonth.toISOString());

        if (newMembersError) {
          setError(newMembersError.message);
          throw newMembersError;
        }

        const newMembersCount = newMembersData ? newMembersData.length : 0;
        setNewMembersThisMonth(newMembersCount);

        // Fetch monthly revenue (This is a placeholder, you'll need to implement actual revenue tracking)
        // const { data: revenueData, error: revenueError } = await supabase
        //   .from('payments')
        //   .select('sum(amount)')
        //   .gte('date', startOfMonth.toISOString());

        // if (revenueError) {
        //   setError(revenueError.message);
        //   throw revenueError;
        // }

        // const totalRevenue = revenueData && revenueData[0]?.sum ? revenueData[0].sum : 0;
        setMonthlyRevenue(5230.50); // setting mock data

         // Fetch active members (This is a placeholder, you'll need to implement actual active tracking)
        setActiveMembers(Math.floor(totalMembersCount * 0.85));

        // Fetch tier data
        const basicMembers = Math.floor(totalMembersCount * 0.6);
        const premiumMembers = Math.floor(totalMembersCount * 0.3);
        const vipMembers = totalMembersCount - basicMembers - premiumMembers;

        setTierData([
          { name: 'Basic', value: basicMembers },
          { name: 'Premium', value: premiumMembers },
          { name: 'VIP', value: vipMembers },
        ]);

      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to fetch dashboard data.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate revenue change (This is a placeholder, you'll need to implement actual previous month revenue tracking)
  const previousMonthRevenue = 4980.00;
  const revenueChange = (((monthlyRevenue - previousMonthRevenue) / previousMonthRevenue) * 100).toFixed(1);

  if (loading) {
    return <div className="p-6">Loading dashboard data...</div>;
  }

  if (error) {
    return <div className="p-6 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-6 bg-gray-50 min-h-full"> {/* Ensure page takes height */}
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Dashboard Overview</h2>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard
          icon={Users}
          title="Total Members"
          value={totalMembers}
          change={`+${newMembersThisMonth} this month`}
          changeType="positive"
          bgColorClass="bg-blue-500"
          iconColorClass="text-blue-100"
        />
        <StatCard
          icon={DollarSign}
          title="Monthly Revenue"
          value={`$${monthlyRevenue.toFixed(2)}`}
          change={`+${revenueChange}%`}
          changeType="positive"
           bgColorClass="bg-green-500"
           iconColorClass="text-green-100"
        />
         <StatCard
          icon={UserCheck}
          title="Active Members"
          value={activeMembers}
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
           <MembershipTierDistributionChart data={tierData} />
        </div>
        <div className="lg:col-span-2">
          <RecentActivityFeed activities={[]} />
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
