import React from 'react';
import { Tier } from '../../types';
import TierItem from './TierItem';
import { ListPlus } from 'lucide-react';

interface TierListProps {
  tiers: Tier[];
  onEditTier: (tier: Tier) => void;
  onDeleteTier: (id: string) => void;
}

const TierList: React.FC<TierListProps> = ({ tiers, onEditTier, onDeleteTier }) => {
  if (tiers.length === 0) {
    return (
      <div className="text-center py-10 px-4 border-2 border-dashed border-gray-300 rounded-lg">
        <ListPlus size={48} className="mx-auto text-gray-400 mb-4" />
        <p className="text-gray-500 text-lg">No membership tiers found.</p>
        <p className="text-gray-400 text-sm">Click "Create New Tier" to add one.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {tiers.map((tier) => (
        <TierItem
          key={tier.id}
          tier={tier}
          onEdit={onEditTier}
          onDelete={onDeleteTier}
        />
      ))}
    </ul>
  );
};

export default TierList;
