import React from 'react';
import { UserPlus, Repeat, Award } from 'lucide-react'; // Icons for different activities

interface ActivityItem {
  id: string;
  type: 'new_member' | 'renewal' | 'tier_change';
  description: string;
  timestamp: string; // ISO string or formatted string
}

interface RecentActivityFeedProps {
  activities: ActivityItem[];
}

const ActivityIcon: React.FC<{ type: ActivityItem['type'] }> = ({ type }) => {
  switch (type) {
    case 'new_member':
      return <UserPlus size={16} className="text-green-500" />;
    case 'renewal':
      return <Repeat size={16} className="text-blue-500" />;
    case 'tier_change':
      return <Award size={16} className="text-purple-500" />;
    default:
      return null;
  }
};

const RecentActivityFeed: React.FC<RecentActivityFeedProps> = ({ activities }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md border border-gray-100 h-full">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
      {activities.length === 0 ? (
        <p className="text-gray-500 text-sm">No recent activity.</p>
      ) : (
        <ul className="space-y-3">
          {activities.map((activity) => (
            <li key={activity.id} className="flex items-center space-x-3 text-sm">
              <div className="flex-shrink-0">
                <ActivityIcon type={activity.type} />
              </div>
              <div className="flex-grow">
                <p className="text-gray-700">{activity.description}</p>
                <p className="text-xs text-gray-400">{new Date(activity.timestamp).toLocaleString()}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
       {/* Add a "View All" link if needed */}
       {/* <div className="mt-4 text-right">
         <a href="#" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">View all</a>
       </div> */}
    </div>
  );
};

export default RecentActivityFeed;
