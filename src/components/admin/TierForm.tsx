import React, { useState, useEffect } from 'react';
import { Tier, Perk } from '../../types';
import { PlusCircle, X, Trash2, Save } from 'lucide-react';

interface TierFormProps {
  initialData?: Tier | null; // Pass tier data for editing, null/undefined for creating
  onSubmit: (tierData: Omit<Tier, 'id'> | Tier) => void;
  onCancel: () => void;
}

const TierForm: React.FC<TierFormProps> = ({ initialData, onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [description, setDescription] = useState('');
  const [perks, setPerks] = useState<Perk[]>([]);
  const [newPerk, setNewPerk] = useState('');

  const isEditing = !!initialData;

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setPrice(initialData.price);
      setDescription(initialData.description);
      setPerks(initialData.perks);
    } else {
      // Reset form for creation
      setName('');
      setPrice('');
      setDescription('');
      setPerks([]);
    }
  }, [initialData]);

  const handleAddPerk = () => {
    if (newPerk.trim()) {
      setPerks([...perks, { id: crypto.randomUUID(), description: newPerk.trim() }]);
      setNewPerk('');
    }
  };

  const handleRemovePerk = (id: string) => {
    setPerks(perks.filter(p => p.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || price === '' || price < 0) {
      alert('Please fill in name and a valid price (0 or more).');
      return;
    }

    const tierData = {
      name,
      price: Number(price),
      description,
      perks,
    };

    if (isEditing && initialData) {
      onSubmit({ ...tierData, id: initialData.id }); // Submit with ID for update
    } else {
      onSubmit(tierData); // Submit without ID for creation
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-lg relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          aria-label="Close form"
        >
          <X size={24} />
        </button>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">
          {isEditing ? 'Edit Membership Tier' : 'Create New Membership Tier'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Tier Details */}
          <div>
            <label htmlFor="tierName" className="block text-sm font-medium text-gray-700">Tier Name</label>
            <input type="text" id="tierName" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full input-style" />
          </div>
          <div>
            <label htmlFor="tierPrice" className="block text-sm font-medium text-gray-700">Monthly Price ($)</label>
            <input type="number" id="tierPrice" value={price} onChange={(e) => setPrice(e.target.value === '' ? '' : parseFloat(e.target.value))} required min="0" step="0.01" className="mt-1 block w-full input-style" />
          </div>
          <div>
            <label htmlFor="tierDescription" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea id="tierDescription" value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="mt-1 block w-full input-style"></textarea>
          </div>

          {/* Perks Management */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-medium text-gray-700 mb-2">Perks</h3>
            <div className="space-y-2 mb-3 max-h-40 overflow-y-auto pr-2">
              {perks.length === 0 && <p className="text-sm text-gray-500 italic">No perks added yet.</p>}
              {perks.map((perk) => (
                <div key={perk.id} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                  <span className="text-sm text-gray-800">{perk.description}</span>
                  <button
                    type="button"
                    onClick={() => handleRemovePerk(perk.id)}
                    className="text-red-500 hover:text-red-700"
                    aria-label={`Remove perk: ${perk.description}`}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={newPerk}
                onChange={(e) => setNewPerk(e.target.value)}
                placeholder="Enter perk description"
                className="flex-grow input-style"
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddPerk(); }}}
              />
              <button
                type="button"
                onClick={handleAddPerk}
                className="p-2 bg-green-500 text-white rounded hover:bg-green-600"
                aria-label="Add Perk"
              >
                <PlusCircle size={18} />
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button type="button" onClick={onCancel} className="btn-secondary">Cancel</button>
            <button type="submit" className="btn-primary inline-flex items-center">
              <Save size={18} className="mr-2" />
              {isEditing ? 'Save Changes' : 'Create Tier'}
            </button>
          </div>
        </form>
      </div>
      {/* Simple helper for input styling */}
      <style>{`
        .input-style {
          px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm;
        }
        .btn-primary {
          px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500;
        }
        .btn-secondary {
           px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500;
        }
      `}</style>
    </div>
  );
};

export default TierForm;
