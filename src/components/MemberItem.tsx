import React, { useState } from 'react';
import { Member } from '../types';
import { Edit, Trash2, User, Mail, Award, Calendar, Eye, Save, X } from 'lucide-react';
import { Link } from 'react-router-dom';

interface MemberItemProps {
  member: Member;
  onEdit: (updatedMember: Member) => void;
  onDelete: (id: string) => void;
}

const MemberItem: React.FC<MemberItemProps> = ({ member, onEdit, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<Partial<Member>>(member);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveEdit = () => {
    setIsEditing(false);
    onEdit({ ...member, ...editData } as Member); // Send updated data back to parent
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditData(member); // Reset editData to original member data
  };


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
          {isEditing ? (
            <input
              type="text"
              name="name"
              value={editData.name || ''}
              onChange={handleInputChange}
              className="text-lg font-semibold input-style -ml-1 -mt-1 p-1"
            />
          ) : (
            <Link to={`/app/members/${member.id}`} className="text-lg font-semibold text-indigo-600 hover:text-indigo-800 hover:underline">
              {member.name}
            </Link>
          )}
        </div>
        <div className="flex items-center text-sm text-gray-600 mb-1">
          <Mail size={16} className="mr-2" />
          {isEditing ? (
            <input
              type="email"
              name="email"
              value={editData.email || ''}
              onChange={handleInputChange}
              className="text-sm input-style -ml-1 -mt-1 p-1"
            />
          ) : (
            <span>{member.email}</span>
          )}
        </div>
         <div className="flex items-center text-sm text-gray-600 mb-1">
           <Award size={16} className="mr-2" />
           <span className="font-medium text-gray-600 mr-2">Level:</span>
           {isEditing ? (
              <select
                name="membershipLevel"
                value={editData.membershipLevel || 'Basic'}
                onChange={handleInputChange}
                className="input-style text-sm p-1"
              >
                <option value="Basic">Basic</option>
                <option value="Premium">Premium</option>
                <option value="VIP">VIP</option>
              </select>
            ) : (
              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getBadgeColor(member.membershipLevel)}`}>
                {member.membershipLevel}
              </span>
            )}
        </div>
        <div className="flex items-center text-sm text-gray-500">
          <Calendar size={16} className="mr-2" />
          <span>Joined: {new Date(member.joinDate).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="flex space-x-2 flex-shrink-0">
        {isEditing ? (
          <div className="flex space-x-2">
            <button onClick={handleSaveEdit} className="btn-primary-sm inline-flex items-center">
              <Save size={16} className="mr-1" /> Save
            </button>
            <button onClick={handleCancelEdit} className="btn-secondary-sm inline-flex items-center">
              <X size={16} className="mr-1" /> Cancel
            </button>
          </div>
        ) : (
          <>
             {/* Link to view profile */}
             <Link
               to={`/app/members/${member.id}`}
               className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-100 rounded-full transition-colors duration-200"
               aria-label={`View ${member.name}'s Profile`}
               title="View Profile"
             >
               <Eye size={18} />
             </Link>
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full transition-colors duration-200"
              aria-label={`Edit ${member.name}`}
              title="Quick Edit"
            >
              <Edit size={18} />
            </button>
            <button
              onClick={() => onDelete(member.id)}
              className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full transition-colors duration-200"
              aria-label={`Delete ${member.name}`}
              title="Delete Member"
            >
              <Trash2 size={18} />
            </button>
          </>
        )}
      </div>
       {/* Helper Styles - moved outside component for global scope or consider CSS modules */}
       <style>{`
        .input-style {
          px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm;
        }
        .btn-primary-sm {
          padding: 0.25rem 0.75rem; border: 1px solid transparent; border-radius: 0.375rem; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); font-size: 0.875rem; font-weight: 500; color: white; background-color: #4f46e5; /* bg-indigo-600 */
        }
        .btn-primary-sm:hover { background-color: #4338ca; }
        .btn-secondary-sm {
           padding: 0.25rem 0.75rem; border: 1px solid #d1d5db; border-radius: 0.375rem; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); font-size: 0.875rem; font-weight: 500; color: #374151; background-color: white;
        }
         .btn-secondary-sm:hover { background-color: #f9fafb; }
       `}</style>
    </li>
  );
};

export default MemberItem;
