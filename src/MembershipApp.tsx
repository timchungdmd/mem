import React, { useState } from 'react';
import { Routes, Route, Link, useLocation, Outlet } from 'react-router-dom';
// Import Pages
import DashboardPage from './pages/DashboardPage';
import AdminTiersPage from './pages/AdminTiersPage';
import MemberProfilePage from './pages/MemberProfilePage';
import MemberSettingsProfilePage from './pages/MemberSettingsProfilePage';
import AdminImportPage from './pages/AdminImportPage';
import AdminExportPage from './pages/AdminExportPage';
// Import Components
import MemberList from './components/MemberList';
import AddMemberForm from './components/AddMemberForm';
// Import Types
import { Member } from './types';
// Import Icons
import { Plus, LayoutDashboard, Users as UsersIcon, Settings, ShieldCheck, Upload, Download, UserCog } from 'lucide-react';
import { supabase } from './supabaseClient'; // Import Supabase client

// Dummy data - REMOVE MOCK DATA
const initialMembers: Member[] = [];


function MembershipApp() {
  const [members, setMembers] = useState<Member[]>(initialMembers); // Initialize with empty array
  const [showAddForm, setShowAddForm] = useState(false);
  const location = useLocation();

  // Function to refresh the member list
  const [refreshMembers, setRefreshMembers] = useState(false);
  const toggleRefreshMembers = () => {
    setRefreshMembers(prev => !prev);
  };

  // Member Handlers
  const handleAddMember = async (newMemberData: Omit<Member, 'id' | 'joinDate'>) => {
    try {
      const { data, error } = await supabase
        .from('members')
        .insert([
          {
            ...newMemberData,
            join_date: new Date().toISOString(),
            membership_level: newMemberData.membershipLevel, // Corrected: Use membership_level
          },
        ])
        .select(); // Select to return the newly inserted row

      if (error) {
        console.error('Supabase insert error:', error);
        alert(`Failed to add member: ${error.message}`); // Display the error message to the user
        throw error; // Re-throw to stop further execution
      }

      if (data && data.length > 0) {
        // Assuming insert returns the newly created member
        const addedMember = data[0] as Member; // Type cast to Member
        // Instead of updating local state, we should ideally refetch members from DB to keep data consistent, or handle optimistic updates
        // For simplicity, let's just log the success for now. In a real app, you'd refresh the member list.
        console.log('Member added successfully:', addedMember);
        // In a real app, you might want to refresh the member list here or use optimistic updates
        toggleRefreshMembers();
      } else {
        throw new Error('Failed to add member: No data returned from insert operation.');
      }
    } catch (err) {
      console.error('Database error adding member:', err);
      throw err; // Re-throw to let the form handle the error
    }
  };


  const handleDeleteMember = (id: string) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
       setMembers(members.filter(member => member.id !== id));
    }
  };

   const handleEditMemberList = (updatedMembers: Member[]) => {
    setMembers(updatedMembers); // Update the members state with the new list from MemberList
  };


  const handleOpenAddMemberForm = () => {
      setShowAddForm(true);
  }

  // --- Navigation Links Data ---
  const navLinks = [
    // Main App Links
    { path: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard, section: 'main' },
    { path: '/app/members', label: 'Members', icon: UsersIcon, section: 'main' },
    // Settings Links (for logged-in user)
    { path: '/app/settings/profile', label: 'My Profile', icon: UserCog, section: 'settings' },
    // Admin Links
    { path: '/app/admin/tiers', label: 'Manage Tiers', icon: Settings, section: 'admin' },
    { path: '/app/admin/import', label: 'Import Data', icon: Upload, section: 'admin' },
    { path: '/app/admin/export', label: 'Export Data', icon: Download, section: 'admin' },
    // Add more links here
  ];

  // Helper to render nav links by section
  const renderNavLinks = (section: 'main' | 'settings' | 'admin') => {
     return navLinks.filter(link => link.section === section).map(link => {
        // Make matching more specific for nested routes if needed (e.g., /app/members should match /app/members/:id)
        const isActive = location.pathname === link.path || (link.path !== '/app/dashboard' && location.pathname.startsWith(link.path));
        return (
          <Link key={link.path} to={link.path} className={`nav-link ${isActive ? 'active' : ''}`}>
            <link.icon size={20} className="mr-3 flex-shrink-0" />
            <span className="truncate">{link.label}</span>
          </Link>
        );
     });
  }

  return (
    <div className="flex h-screen bg-gray-100">
       {/* --- Sidebar Navigation --- */}
       <aside className="w-64 bg-white shadow-md flex flex-col flex-shrink-0">
         <div className="h-16 flex items-center justify-center border-b px-4">
            <Link to="/app/dashboard" className="flex items-center space-x-2 text-xl font-bold text-indigo-600 truncate">
              <UsersIcon size={28} className="flex-shrink-0"/>
              <span className="truncate">AmplifyHub</span>
            </Link>
         </div>
         <nav className="flex-grow p-4 space-y-4 overflow-y-auto">
            {/* Main Section */}
            <div>{renderNavLinks('main')}</div>

            {/* Settings Section */}
            <div className="pt-4 border-t border-gray-200">
                <span className="nav-section-header">
                    <UserCog size={16} className="mr-2"/> Settings
                </span>
                <div className="mt-1 space-y-1">{renderNavLinks('settings')}</div>
            </div>

            {/* Admin Section */}
            <div className="pt-4 border-t border-gray-200">
                <span className="nav-section-header">
                    <ShieldCheck size={16} className="mr-2"/> Admin
                </span>
                <div className="mt-1 space-y-1">{renderNavLinks('admin')}</div>
            </div>
         </nav>
          <div className="p-4 border-t flex-shrink-0">
             <p className="text-xs text-gray-500">© {new Date().getFullYear()} AmplifyHub</p>
          </div>
       </aside>

       {/* --- Main Content Area --- */}
       <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
            <Routes>
              {/* App Routes */}
              <Route index element={<DashboardPage onAddMemberClick={handleOpenAddMemberForm} />} />
              <Route path="dashboard" element={<DashboardPage onAddMemberClick={handleOpenAddMemberForm} />} />
              {/* Member Routes */}
              <Route path="members">
                 <Route index element={
                    <div className="p-6">
                       <div className="flex justify-between items-center mb-6">
                         <h2 className="text-3xl font-semibold text-gray-700">Members</h2>
                         <button onClick={() => setShowAddForm(true)} className="btn-primary inline-flex items-center">
                           <Plus size={20} className="mr-2" /> Add Member
                         </button>
                       </div>
                       <MemberList members={members} onEditMember={handleEditMemberList} onDeleteMember={handleDeleteMember} refresh={refreshMembers} />
                    </div>
                 } />
                 <Route path=":id" element={<MemberProfilePage />} />
              </Route>

              {/* Settings Routes */}
               <Route path="settings">
                  <Route path="profile" element={<MemberSettingsProfilePage />} />
                  {/* Add other settings routes: account, billing, etc. */}
               </Route>

              {/* Admin Routes */}
              <Route path="admin">
                  <Route path="tiers" element={<AdminTiersPage />} />
                  <Route path="import" element={<AdminImportPage />} />
                  <Route path="export" element={<AdminExportPage />} />
                  {/* Add other admin routes */}
              </Route>

              {/* Fallback for unknown /app routes */}
              <Route path="*" element={<div className="p-6 text-center">Page not found within the app.</div>} />
            </Routes>
          </main>
       </div>

      {/* Modal Add Member Form */}
      {showAddForm && (
        <AddMemberForm
          onAddMember={handleAddMember}
          onCancel={() => setShowAddForm(false)}
        />
      )}

       {/* --- Helper styles --- */}
       <style>{`
        .nav-link {
          display: flex; align-items: center; padding: 0.6rem 1rem;
          border-radius: 0.375rem; font-size: 0.875rem; font-weight: 500;
          color: #4b5563;
          transition: background-color 150ms ease-in-out, color 150ms ease-in-out;
        }
        .nav-link:hover { background-color: #f9fafb; color: #111827; }
        .nav-link.active { background-color: #e0e7ff; color: #4338ca; }
        .nav-section-header {
            display: flex; align-items: center; padding: 0 1rem;
            margin-top: 0.5rem;
            font-size: 0.75rem; font-semibold; color: #6b7280;
            text-transform: uppercase; letter-spacing: 0.05em;
        }
         .btn-primary {
          padding: 0.5rem 1rem; border: 1px solid transparent; border-radius: 0.375rem; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); font-size: 0.875rem; font-weight: 500; color: white; background-color: #4f46e5;
        }
        .btn-primary:hover { background-color: #4338ca; }
       `}</style>
    </div>
  );
}

export default MembershipApp;
