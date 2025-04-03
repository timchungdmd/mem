import React, { useState } from 'react';
import { Member } from '../types';
import { PlusCircle, X } from 'lucide-react';

interface AddMemberFormProps {
  onAddMember: (newMember: Omit<Member, 'id' | 'joinDate'>) => void;
  onCancel: () => void;
}

const AddMemberForm: React.FC<AddMemberFormProps> = ({ onAddMember, onCancel }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [membershipLevel, setMembershipLevel] = useState<'Basic' | 'Premium' | 'VIP'>('Basic');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) {
      alert('Please fill in all fields.'); // Simple validation
      return;
    }
    onAddMember({ name, email, membershipLevel });
    // Reset form could happen here or in the parent component after successful add
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md relative">
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          aria-label="Close form"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add New Member</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="membershipLevel" className="block text-sm font-medium text-gray-700">
              Membership Level
            </label>
            <select
              id="membershipLevel"
              value={membershipLevel}
              onChange={(e) => setMembershipLevel(e.target.value as 'Basic' | 'Premium' | 'VIP')}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="Basic">Basic</option>
              <option value="Premium">Premium</option>
              <option value="VIP">VIP</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3">
             <button
              type="button"
              onClick={onCancel}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <PlusCircle size={18} className="mr-2" />
              Add Member
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMemberForm;
