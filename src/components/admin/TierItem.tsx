import React from 'react';
import { Tier } from '../../types';
import { Edit, Trash2, DollarSign, List, CheckSquare } from 'lucide-react';

interface TierItemProps {
  tier: Tier;
  onEdit: (tier: Tier) => void;
  onDelete: (id: string) => void;
}

const TierItem: React.FC<TierItemProps> = ({ tier, onEdit, onDelete }) => {
  return (
    <li className="bg-white shadow rounded-lg p-4 mb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center hover:shadow-md transition-shadow duration-200">
      <div className="flex-grow mb-3 sm:mb-0 pr-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-1">{tier.name}</h3>
        <p className="text-sm text-gray-600 mb-2 flex items-center">
          <DollarSign size={14} className="mr-1 text-green-600" /> ${tier.price.toFixed(2)} / month
        </p>
        <p className="text-sm text-gray-500 mb-2 line-clamp-2">{tier.description}</p>
         <div className="text-xs text-gray-500 flex items-center">
            <CheckSquare size={14} className="mr-1 text-blue-500" /> {tier.perks.length} Perk(s)
         </div>
         {/* Optionally list first few perks */}
         {/* <ul className="list-disc list-inside text-xs text-gray-500 pl-4 mt-1">
            {tier.perks.slice(0, 2).map(perk => <li key={perk.id}>{perk.description}</li>)}
            {tier.perks.length > 2 && <li>...</li>}
         </ul> */}
      </div>
      <div className="flex space-x-2 flex-shrink-0">
        <button
          onClick={() => onEdit(tier)}
          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-100 rounded-full transition-colors duration-200"
          aria-label={`Edit ${tier.name}`}
        >
          <Edit size={18} />
        </button>
        <button
          onClick={() => onDelete(tier.id)}
          className="p-2 text-red-600 hover:text-red-800 hover:bg-red-100 rounded-full transition-colors duration-200"
          aria-label={`Delete ${tier.name}`}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </li>
  );
};

export default TierItem;
