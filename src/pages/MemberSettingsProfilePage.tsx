import React, { useState, useEffect } from 'react';
import { User, Mail, Save, Info, Briefcase, Star } from 'lucide-react';

// Mock data for the "logged-in" member (replace with actual auth context later)
const mockLoggedInMember = {
  id: 'user-self',
  name: 'Current User',
  email: 'user@example.com',
  // Mock custom fields for the user
  customFields: {
    'Job Title': 'Software Developer',
    'Interests': ['React', 'Hiking'],
    'Communication Preferences': 'Email Only', // Example setting
  }
};

// Mock Custom Field Definitions relevant to self-service
const mockSelfServiceFields = [
    { id: 'cf1', name: 'Job Title', type: 'text', editable: true },
    { id: 'cf2', name: 'Interests', type: 'tags', editable: true },
    { id: 'cf4', name: 'Communication Preferences', type: 'select', options: ['Email Only', 'Email & In-App', 'All Channels'], editable: true },
];

const MemberSettingsProfilePage: React.FC = () => {
  const [userData, setUserData] = useState({ ...mockLoggedInMember });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handleCustomFieldChange = (fieldName: string, value: any) => {
    setUserData(prev => ({
      ...prev,
      customFields: {
        ...(prev.customFields || {}),
        [fieldName]: value,
      },
    }));
  };

  const handleSave = () => {
    setLoading(true);
    console.log("Saving self-service profile data (placeholder):", userData);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert("Profile updated successfully (placeholder)!");
      // Potentially refetch data or update context here
    }, 700);
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">My Profile Settings</h2>
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl mx-auto">
        <form onSubmit={(e) => { e.preventDefault(); handleSave(); }} className="space-y-6">
          {/* Basic Info */}
          <div className="border-b pb-4">
             <h3 className="text-lg font-medium text-gray-700 mb-3">Basic Information</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <div className="relative">
                        <User size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input type="text" id="name" name="name" value={userData.name} onChange={handleInputChange} className="input-style pl-8 w-full" />
                    </div>
                </div>
                 <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                     <div className="relative">
                        <Mail size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input type="email" id="email" name="email" value={userData.email} onChange={handleInputChange} className="input-style pl-8 w-full" />
                    </div>
                </div>
             </div>
          </div>

          {/* Custom Fields */}
          <div className="border-b pb-4">
             <h3 className="text-lg font-medium text-gray-700 mb-3">Additional Information</h3>
             <div className="space-y-4">
                {mockSelfServiceFields.filter(f => f.editable).map(field => (
                    <div key={field.id}>
                        <label htmlFor={`custom-${field.id}`} className="block text-sm font-medium text-gray-700 mb-1">{field.name}</label>
                         <div className="relative">
                             {/* Simple icons */}
                             {field.name === 'Job Title' && <Briefcase size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
                             {field.name === 'Interests' && <Star size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}
                             {field.name === 'Communication Preferences' && <Info size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />}

                             {field.type === 'select' && field.options ? (
                                <select
                                    id={`custom-${field.id}`}
                                    value={userData.customFields[field.name] || ''}
                                    onChange={(e) => handleCustomFieldChange(field.name, e.target.value)}
                                    className="input-style pl-8 w-full appearance-none" // appearance-none needed for custom arrow potentially
                                >
                                    <option value="">-- Select --</option>
                                    {field.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                                </select>
                             ) : field.type === 'tags' ? (
                                <input
                                    type="text"
                                    id={`custom-${field.id}`}
                                    value={Array.isArray(userData.customFields[field.name]) ? userData.customFields[field.name].join(', ') : userData.customFields[field.name] || ''}
                                    onChange={(e) => handleCustomFieldChange(field.name, e.target.value.split(',').map(s => s.trim()))}
                                    className="input-style pl-8 w-full"
                                    placeholder="tag1, tag2, ..."
                                />
                             ) : (
                                <input
                                    type="text"
                                    id={`custom-${field.id}`}
                                    value={userData.customFields[field.name] || ''}
                                    onChange={(e) => handleCustomFieldChange(field.name, e.target.value)}
                                    className="input-style pl-8 w-full"
                                />
                             )}
                         </div>
                    </div>
                ))}
             </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button type="submit" className="btn-primary inline-flex items-center" disabled={loading}>
              <Save size={18} className="mr-2" />
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
       {/* Helper styles (can be centralized later) */}
       <style>{`
        .input-style {
          padding: 0.5rem 0.75rem; border: 1px solid #d1d5db; border-radius: 0.375rem; box-shadow: inset 0 1px 2px 0 rgba(0, 0, 0, 0.05); font-size: 0.875rem; line-height: 1.25rem; width: 100%;
        }
        .input-style:focus { outline: 2px solid transparent; outline-offset: 2px; border-color: #4f46e5; box-shadow: 0 0 0 1px #4f46e5; }
        .btn-primary {
          padding: 0.5rem 1rem; border: 1px solid transparent; border-radius: 0.375rem; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); font-size: 0.875rem; font-weight: 500; color: white; background-color: #4f46e5; /* bg-indigo-600 */
        }
        .btn-primary:hover { background-color: #4338ca; }
        .btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
       `}</style>
    </div>
  );
};

export default MemberSettingsProfilePage;
