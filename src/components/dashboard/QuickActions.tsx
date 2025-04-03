import React from 'react';
import { UserPlus, Mail, Settings } from 'lucide-react';
import { Link } from 'react-router-dom'; // Assuming actions might link elsewhere

interface QuickActionsProps {
  onAddMemberClick: () => void; // Propagate click to parent if form is modal
}

const QuickActions: React.FC<QuickActionsProps> = ({ onAddMemberClick }) => {
  return (
    <div className="bg-white p-5 rounded-lg shadow-md border border-gray-100">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <button
          onClick={onAddMemberClick}
          className="flex flex-col items-center justify-center p-4 bg-indigo-50 text-indigo-700 rounded-lg hover:bg-indigo-100 transition-colors duration-200"
        >
          <UserPlus size={24} className="mb-1" />
          <span className="text-sm font-medium">Add Member</span>
        </button>
        {/* Placeholder for future actions */}
        <button className="flex flex-col items-center justify-center p-4 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors duration-200 opacity-50 cursor-not-allowed" disabled title="Coming Soon">
          <Mail size={24} className="mb-1" />
          <span className="text-sm font-medium">Send Email</span>
        </button>
         <button className="flex flex-col items-center justify-center p-4 bg-gray-50 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors duration-200 opacity-50 cursor-not-allowed" disabled title="Coming Soon">
          <Settings size={24} className="mb-1" />
          <span className="text-sm font-medium">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
