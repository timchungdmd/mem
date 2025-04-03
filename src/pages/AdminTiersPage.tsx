import React, { useState } from 'react';
import { Tier } from '../types';
import TierList from '../components/admin/TierList';
import TierForm from '../components/admin/TierForm';
import { PlusCircle } from 'lucide-react';

// Mock initial tiers data
const initialTiers: Tier[] = [
  {
    id: 'tier-basic',
    name: 'Basic',
    price: 10,
    description: 'Access to core community features and standard content.',
    perks: [
      { id: 'p1', description: 'Community Forum Access' },
      { id: 'p2', description: 'Monthly Newsletter' },
    ],
  },
  {
    id: 'tier-premium',
    name: 'Premium',
    price: 25,
    description: 'Enhanced access, exclusive content, and priority support.',
    perks: [
      { id: 'p3', description: 'All Basic Perks' },
      { id: 'p4', description: 'Exclusive Webinars' },
      { id: 'p5', description: 'Resource Library Access' },
      { id: 'p6', description: 'Priority Email Support' },
    ],
  },
   {
    id: 'tier-vip',
    name: 'VIP',
    price: 50,
    description: 'Top-level access with personalized support and early access.',
    perks: [
      { id: 'p7', description: 'All Premium Perks' },
      { id: 'p8', description: '1-on-1 Onboarding Call' },
      { id: 'p9', description: 'Early Access to New Features' },
      { id: 'p10', description: 'Dedicated Account Manager' },
    ],
  },
];

const AdminTiersPage: React.FC = () => {
  const [tiers, setTiers] = useState<Tier[]>(initialTiers);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTier, setEditingTier] = useState<Tier | null>(null);

  const handleOpenCreateForm = () => {
    setEditingTier(null);
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (tier: Tier) => {
    setEditingTier(tier);
    setIsFormOpen(true);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setEditingTier(null);
  };

  const handleAddTier = (newTierData: Omit<Tier, 'id'>) => {
    const newTier: Tier = {
      ...newTierData,
      id: crypto.randomUUID(),
    };
    setTiers([...tiers, newTier]);
    handleCloseForm();
  };

  const handleUpdateTier = (updatedTierData: Tier) => {
    setTiers(tiers.map(t => t.id === updatedTierData.id ? updatedTierData : t));
    handleCloseForm();
  };

  const handleDeleteTier = (id: string) => {
    if (window.confirm('Are you sure you want to delete this tier? This cannot be undone.')) {
      setTiers(tiers.filter(t => t.id !== id));
    }
  };

  const handleSubmit = (tierData: Omit<Tier, 'id'> | Tier) => {
     if ('id' in tierData) {
       handleUpdateTier(tierData);
     } else {
       handleAddTier(tierData);
     }
  };


  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-semibold text-gray-700">Manage Membership Tiers</h2>
        <button
          onClick={handleOpenCreateForm}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
        >
          <PlusCircle size={20} className="mr-2" />
          Create New Tier
        </button>
      </div>

      <TierList
        tiers={tiers}
        onEditTier={handleOpenEditForm}
        onDeleteTier={handleDeleteTier}
      />

      {isFormOpen && (
        <TierForm
          initialData={editingTier}
          onSubmit={handleSubmit}
          onCancel={handleCloseForm}
        />
      )}
    </div>
  );
};

export default AdminTiersPage;
