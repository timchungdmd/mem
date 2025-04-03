import React from 'react';
import { Member } from '../types';
import { Edit, Trash2, User, Mail, Award, Calendar } from 'lucide-react';

interface MemberItemProps {
  member: Member;
  onEdit: (member: Member) => void; // Placeholder for edit functionality
  onDelete: (id: string) => void; // Placeholder for delete functionality
}

const MemberItem: React.FC<MemberItemProps> = ({ member, onEdit, onDelete }) => {
  const getBadgeColor = (level: Member['membershipLevel']) => {
    switch (level) {
      case 'Premium': return 'bg-yellow-100 text-yellow-800';
      case 'VIP': return 'bg-purple-100 text-purple-800';
      case 'Basic':
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  return (
    <li className="bg-white shadow-md rounded-lg p-4 mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center transition-shadow duration-200 hover:shadow-lg">
      <div className="flex-grow mb-3 sm:mb-0">
        <div className="flex items-center mb-2">
          <User size={18} className="text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
        </div>
        <div className="flex items-center text-sm text-gray-600 mb-1">
          <Mail size={16} className="mr-2" />
          <span>{member.email}</span>
        </div>
         <div className="flex items-center text-sm text-gray-600 mb-1">
           <Award size={16} className="mr-2" />
           <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getBadgeColor(member.membershipLevel)}`}>
             {member.membershipLevel}
           </span>
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar size={16} className="mr-2" />
          <span>Joined: {new Date(member.joinDate).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="flex space-x-2 flex-shrink-0">
        <button
          onClick={() => onEdit(member)}
          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full transition-colors duration-200"
          aria-label={`Edit ${member.name}`}
        >
          <Edit size={18} />
        </button>
        <button
          onClick={() => onDelete(member.id)}
          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full transition-colors duration-200"
          aria-label={`Delete ${member.name}`}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </li>
  );
};

export default MemberItem;
