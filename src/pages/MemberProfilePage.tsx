import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Member } from '../types'; // Assuming Tier might be needed later
import { ArrowLeft, User, Mail, Award, Calendar, Edit, Save, X, Info, Briefcase, Star } from 'lucide-react';

// Mock function to fetch member data (replace with API call later)
const fetchMemberById = async (id: string): Promise<Member | null> => {
  console.log(`Fetching member with ID: ${id}`);
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 300));
  // Find member in dummy data (or return a default mock)
  const dummyMembers: Member[] = [
    { id: '1', name: 'Alice Wonderland', email: 'alice@example.com', membershipLevel: 'Premium', joinDate: new Date(2023, 5, 15).toISOString() },
    { id: '2', name: 'Bob The Builder', email: 'bob@example.com', membershipLevel: 'Basic', joinDate: new Date(2024, 0, 10).toISOString() },
    { id: '3', name: 'Charlie Chaplin', email: 'charlie@example.com', membershipLevel: 'VIP', joinDate: new Date(2022, 11, 1).toISOString() },
  ];
   const foundMember = dummyMembers.find(m => m.id === id);
   if (foundMember) {
     // Add mock custom fields
     return {
       ...foundMember,
       // @ts-ignore - adding mock fields dynamically
       customFields: {
         'Job Title': 'Curious Explorer',
         'Interests': ['Tea Parties', 'Logic Puzzles'],
         'Referral Source': 'White Rabbit',
       }
     };
   }
  return null; // Or return a default mock member structure
};

// Mock Custom Field Definition (replace with dynamic loading later)
const mockCustomFieldDefinitions = [
    { id: 'cf1', name: 'Job Title', type: 'text' },
    { id: 'cf2', name: 'Interests', type: 'tags' }, // Example types
    { id: 'cf3', name: 'Referral Source', type: 'text' },
];


const MemberProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  // State to hold edited values (initialize with member data when editing starts)
  const [editData, setEditData] = useState<Partial<Member> & { customFields?: Record<string, any> }>({});

  useEffect(() => {
    if (id) {
      setLoading(true);
      fetchMemberById(id)
        .then(data => {
          if (data) {
            setMember(data);
            // @ts-ignore
            setEditData({ ...data, customFields: { ...(data.customFields || {}) } }); // Initialize edit data
          } else {
            setError('Member not found.');
          }
        })
        .catch(err => {
          console.error("Error fetching member:", err);
          setError('Failed to load member data.');
        })
        .finally(() => setLoading(false));
    } else {
      setError('No member ID provided.');
      setLoading(false);
    }
  }, [id]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

   const handleCustomFieldChange = (fieldName: string, value: any) => {
    setEditData(prev => ({
      ...prev,
      customFields: {
        ...(prev.customFields || {}),
        [fieldName]: value,
      },
    }));
  };

  const handleSave = () => {
    // --- Placeholder for actual update logic ---
    console.log('Saving updated member data (placeholder):', editData);
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
        // Update the main member state with edited data
        setMember(prev => ({ ...prev, ...editData } as Member));
        setIsEditing(false);
        setLoading(false);
        alert('Member data updated (placeholder)!');
    }, 500);
    // --- End Placeholder ---
  };

  const handleCancelEdit = () => {
    // Reset editData to original member data
    if (member) {
        // @ts-ignore
        setEditData({ ...member, customFields: { ...(member.customFields || {}) } });
    }
    setIsEditing(false);
  };


  if (loading) return <div className="p-6 text-center">Loading member profile...</div>;
  if (error) return <div className="p-6 text-center text-red-600">{error}</div>;
  if (!member) return <div className="p-6 text-center">Member data could not be loaded.</div>;

  // @ts-ignore - Accessing mock custom fields
  const customFields = member.customFields || {};
  // @ts-ignore
  const editCustomFields = editData.customFields || {};


  return (
    <div className="p-6">
      <Link to="/app/members" className="inline-flex items-center text-indigo-600 hover:text-indigo-800 mb-4">
        <ArrowLeft size={18} className="mr-1" /> Back to Members List
      </Link>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 border-b flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-semibold text-gray-800 flex items-center">
              <User size={24} className="mr-2 text-gray-500" />
              {isEditing ? (
                 <input
                    type="text"
                    name="name"
                    value={editData.name || ''}
                    onChange={handleInputChange}
                    className="text-2xl font-semibold input-style -m-1 p-1" // Basic styling
                 />
              ) : (
                 member.name
              )}
            </h2>
            <p className="text-sm text-gray-500 flex items-center mt-1">
              <Mail size={14} className="mr-1" />
               {isEditing ? (
                 <input
                    type="email"
                    name="email"
                    value={editData.email || ''}
                    onChange={handleInputChange}
                    className="text-sm input-style -m-1 p-1"
                 />
              ) : (
                 member.email
              )}
            </p>
          </div>
          <div>
            {isEditing ? (
              <div className="flex space-x-2">
                <button onClick={handleSave} className="btn-primary-sm inline-flex items-center" disabled={loading}>
                  <Save size={16} className="mr-1" /> {loading ? 'Saving...' : 'Save'}
                </button>
                 <button onClick={handleCancelEdit} className="btn-secondary-sm inline-flex items-center">
                   <X size={16} className="mr-1" /> Cancel
                 </button>
              </div>
            ) : (
              <button onClick={() => setIsEditing(true)} className="btn-secondary-sm inline-flex items-center">
                <Edit size={16} className="mr-1" /> Edit Profile
              </button>
            )}
          </div>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Core Info */}
          <div className="md:col-span-1 space-y-4">
             <h3 className="text-lg font-medium text-gray-700 border-b pb-1 mb-2">Membership Details</h3>
             <div className="flex items-center text-sm">
                <Award size={16} className="mr-2 text-gray-500" />
                <span className="font-medium text-gray-600 mr-2">Level:</span>
                 {isEditing ? (
                    <select
                        name="membershipLevel"
                        value={editData.membershipLevel || ''}
                        onChange={handleInputChange}
                        className="input-style text-sm p-1"
                    >
                        <option value="Basic">Basic</option>
                        <option value="Premium">Premium</option>
                        <option value="VIP">VIP</option>
                    </select>
                 ) : (
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        member.membershipLevel === 'Premium' ? 'bg-yellow-100 text-yellow-800' :
                        member.membershipLevel === 'VIP' ? 'bg-purple-100 text-purple-800' :
                        'bg-blue-100 text-blue-800'
                    }`}>
                        {member.membershipLevel}
                    </span>
                 )}
             </div>
             <div className="flex items-center text-sm">
                <Calendar size={16} className="mr-2 text-gray-500" />
                <span className="font-medium text-gray-600 mr-2">Joined:</span>
                <span className="text-gray-700">{new Date(member.joinDate).toLocaleDateString()}</span>
             </div>
             {/* Add more core fields here: Status, Renewal Date etc. */}
          </div>

          {/* Custom Fields */}
          <div className="md:col-span-2 space-y-4">
             <h3 className="text-lg font-medium text-gray-700 border-b pb-1 mb-2">Additional Information</h3>
             {mockCustomFieldDefinitions.map(field => (
                <div key={field.id} className="flex items-start text-sm">
                    {/* Choose icon based on field type or name */}
                    {field.name === 'Job Title' && <Briefcase size={16} className="mr-2 mt-0.5 text-gray-500 flex-shrink-0" />}
                    {field.name === 'Interests' && <Star size={16} className="mr-2 mt-0.5 text-gray-500 flex-shrink-0" />}
                    {field.name !== 'Job Title' && field.name !== 'Interests' && <Info size={16} className="mr-2 mt-0.5 text-gray-500 flex-shrink-0" />}

                    <span className="font-medium text-gray-600 mr-2 w-28 flex-shrink-0">{field.name}:</span>
                    {isEditing ? (
                        // Render input based on field type (simplified)
                        field.type === 'tags' ? (
                             <input
                                type="text"
                                value={Array.isArray(editCustomFields[field.name]) ? editCustomFields[field.name].join(', ') : editCustomFields[field.name] || ''}
                                onChange={(e) => handleCustomFieldChange(field.name, e.target.value.split(',').map(s => s.trim()))} // Simple comma separation
                                className="input-style text-sm p-1 flex-grow"
                                placeholder="tag1, tag2, ..."
                             />
                        ) : (
                             <input
                                type="text"
                                value={editCustomFields[field.name] || ''}
                                onChange={(e) => handleCustomFieldChange(field.name, e.target.value)}
                                className="input-style text-sm p-1 flex-grow"
                             />
                        )
                    ) : (
                        <span className="text-gray-700">
                            {/* Display based on type */}
                            {field.type === 'tags' && Array.isArray(customFields[field.name])
                                ? customFields[field.name].map((tag: string) => <span key={tag} className="bg-gray-200 text-gray-700 px-2 py-0.5 rounded text-xs mr-1">{tag}</span>)
                                : customFields[field.name] || <i className="text-gray-400">Not set</i>
                            }
                        </span>
                    )}
                </div>
             ))}
             {!isEditing && Object.keys(customFields).length === 0 && <p className="text-sm text-gray-400 italic">No additional information provided.</p>}
          </div>

          {/* Placeholder Sections */}
           <div className="md:col-span-3 border-t pt-6 space-y-4">
                <h3 className="text-lg font-medium text-gray-700">Activity & History (Placeholders)</h3>
                <p className="text-sm text-gray-500">Membership history, event attendance, communication logs, etc., will appear here.</p>
                {/* Add placeholder elements for history, notes, etc. */}
           </div>
        </div>
      </div>
       {/* Helper styles */}
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
    </div>
  );
};

export default MemberProfilePage;
