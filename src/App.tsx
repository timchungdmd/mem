import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import MemberList from './components/MemberList';
import AddMemberForm from './components/AddMemberForm';
import { Member } from './types';
import { Plus } from 'lucide-react';

// Dummy data for initial state
const initialMembers: Member[] = [
  { id: '1', name: 'Alice Wonderland', email: 'alice@example.com', membershipLevel: 'Premium', joinDate: new Date(2023, 5, 15).toISOString() },
  { id: '2', name: 'Bob The Builder', email: 'bob@example.com', membershipLevel: 'Basic', joinDate: new Date(2024, 0, 10).toISOString() },
  { id: '3', name: 'Charlie Chaplin', email: 'charlie@example.com', membershipLevel: 'VIP', joinDate: new Date(2022, 11, 1).toISOString() },
];

function App() {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null); // For future edit functionality

  // Basic Add Member Handler
  const handleAddMember = (newMemberData: Omit<Member, 'id' | 'joinDate'>) => {
    const newMember: Member = {
      ...newMemberData,
      id: crypto.randomUUID(), // Generate unique ID
      joinDate: new Date().toISOString(),
    };
    setMembers([...members, newMember]);
    setShowAddForm(false); // Close form after adding
  };

  // Basic Delete Member Handler
  const handleDeleteMember = (id: string) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
       setMembers(members.filter(member => member.id !== id));
    }
  };

  // Placeholder Edit Handler - Sets the member to be edited
   const handleEditMember = (member: Member) => {
    console.log("Editing member:", member);
    // setEditingMember(member);
    // setShowEditForm(true); // Need an edit form state/component
    alert("Edit functionality not yet implemented.");
  };


  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-gray-700">Members</h2>
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            <Plus size={20} className="mr-2" />
            Add Member
          </button>
        </div>

        <MemberList
          members={members}
          onEditMember={handleEditMember}
          onDeleteMember={handleDeleteMember}
        />

        {showAddForm && (
          <AddMemberForm
            onAddMember={handleAddMember}
            onCancel={() => setShowAddForm(false)}
          />
        )}

        {/* Placeholder for Edit Form */}
        {/* {editingMember && showEditForm && (
          <EditMemberForm
            member={editingMember}
            onUpdateMember={handleUpdateMember}
            onCancel={() => { setEditingMember(null); setShowEditForm(false); }}
          />
        )} */}
      </main>
       <footer className="text-center py-4 mt-8 text-gray-500 text-sm">
        Membership Management App © {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;
