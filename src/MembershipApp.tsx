import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Header from './components/Header'; // Keep existing header (or remove if sidebar is enough)
import MemberList from './components/MemberList';
import AddMemberForm from './components/AddMemberForm';
import DashboardPage from './pages/DashboardPage';
import AdminTiersPage from './pages/AdminTiersPage'; // Import Admin Tiers Page
import { Member, Tier } from './types'; // Import Tier type if needed here later
import { Plus, LayoutDashboard, Users as UsersIcon, Settings, ShieldCheck } from 'lucide-react'; // Added Settings/ShieldCheck for Admin

// Dummy data (keep as is for members)
const initialMembers: Member[] = [
  { id: '1', name: 'Alice Wonderland', email: 'alice@example.com', membershipLevel: 'Premium', joinDate: new Date(2023, 5, 15).toISOString() },
  { id: '2', name: 'Bob The Builder', email: 'bob@example.com', membershipLevel: 'Basic', joinDate: new Date(2024, 0, 10).toISOString() },
  { id: '3', name: 'Charlie Chaplin', email: 'charlie@example.com', membershipLevel: 'VIP', joinDate: new Date(2022, 11, 1).toISOString() },
];

function MembershipApp() {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [showAddForm, setShowAddForm] = useState(false);
  const location = useLocation();

  // Member Handlers (keep as is)
  const handleAddMember = (newMemberData: Omit<Member, 'id' | 'joinDate'>) => {
    const newMember: Member = {
      ...newMemberData,
      id: crypto.randomUUID(),
      joinDate: new Date().toISOString(),
    };
    // TODO: Update membershipLevel based on selected Tier if tiers are dynamic
    setMembers([...members, newMember]);
    setShowAddForm(false);
  };

  const handleDeleteMember = (id: string) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
       setMembers(members.filter(member => member.id !== id));
    }
  };

   const handleEditMember = (member: Member) => {
    console.log("Editing member:", member);
    alert("Edit functionality not yet implemented.");
  };

  const handleOpenAddMemberForm = () => {
      setShowAddForm(true);
  }

  // Navigation Links Data (Add Admin link)
  const navLinks = [
    { path: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/app/members', label: 'Members', icon: UsersIcon },
    // Add Admin Section Link
    { path: '/app/admin/tiers', label: 'Manage Tiers', icon: Settings, admin: true },
    // Add more links here (e.g., Communication, Settings)
  ];

  return (
    <div className="flex h-screen bg-gray-100">
       {/* Sidebar Navigation */}
       <aside className="w-64 bg-white shadow-md flex flex-col">
         <div className="h-16 flex items-center justify-center border-b">
            <Link to="/app/dashboard" className="flex items-center space-x-2 text-xl font-bold text-indigo-600">
              <UsersIcon size={28} />
              <span>AmplifyHub</span>
            </Link>
         </div>
         <nav className="flex-grow p-4 space-y-1"> {/* Reduced space-y */}
           {navLinks.filter(link => !link.admin).map(link => { // Regular Links
              const isActive = location.pathname.startsWith(link.path);
              return (
                <Link key={link.path} to={link.path} className={`nav-link ${isActive ? 'active' : ''}`}>
                  <link.icon size={20} className="mr-3" /> {link.label}
                </Link>
              );
           })}

           {/* Admin Section Separator */}
           <div className="pt-4 mt-4 border-t border-gray-200">
              <span className="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider flex items-center">
                 <ShieldCheck size={16} className="mr-2"/> Admin
              </span>
           </div>

            {navLinks.filter(link => link.admin).map(link => { // Admin Links
              const isActive = location.pathname.startsWith(link.path);
              return (
                <Link key={link.path} to={link.path} className={`nav-link mt-2 ${isActive ? 'active' : ''}`}>
                  <link.icon size={20} className="mr-3" /> {link.label}
                </Link>
              );
           })}
         </nav>
          <div className="p-4 border-t">
             <p className="text-xs text-gray-500">© {new Date().getFullYear()} AmplifyHub</p>
          </div>
       </aside>

       {/* Main Content Area */}
       <div className="flex-1 flex flex-col overflow-hidden">
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
            <Routes>
              {/* App Routes */}
              <Route index element={<DashboardPage onAddMemberClick={handleOpenAddMemberForm} />} />
              <Route path="dashboard" element={<DashboardPage onAddMemberClick={handleOpenAddMemberForm} />} />
              <Route path="members" element={
                <div className="p-6">
                   <div className="flex justify-between items-center mb-6">
                     <h2 className="text-3xl font-semibold text-gray-700">Members</h2>
                     <button onClick={() => setShowAddForm(true)} className="btn-primary inline-flex items-center">
                       <Plus size={20} className="mr-2" /> Add Member
                     </button>
                   </div>
                   <MemberList members={members} onEditMember={handleEditMember} onDeleteMember={handleDeleteMember} />
                </div>
              } />

              {/* Admin Routes */}
              <Route path="admin/tiers" element={<AdminTiersPage />} />

              {/* Add other app/admin routes here */}
            </Routes>
          </main>
       </div>

      {/* Modal Add Member Form */}
      {showAddForm && (
        <AddMemberForm
          onAddMember={handleAddMember}
          onCancel={() => setShowAddForm(false)}
          // Pass tiers here if needed for dropdown selection in AddMemberForm
        />
      )}

       {/* Helper styles for NavLink */}
       <style>{`
        .nav-link {
          display: flex;
          align-items: center;
          padding: 0.75rem 1rem; /* py-3 px-4 */
          border-radius: 0.375rem; /* rounded-md */
          font-size: 0.875rem; /* text-sm */
          font-weight: 500; /* font-medium */
          color: #4b5563; /* text-gray-600 */
          transition: background-color 150ms ease-in-out, color 150ms ease-in-out;
        }
        .nav-link:hover {
          background-color: #f9fafb; /* hover:bg-gray-50 */
          color: #111827; /* hover:text-gray-900 */
        }
        .nav-link.active {
          background-color: #e0e7ff; /* bg-indigo-100 */
          color: #4338ca; /* text-indigo-700 */
        }
         .btn-primary { /* Ensure consistency */
          padding: 0.5rem 1rem; border: 1px solid transparent; border-radius: 0.375rem; box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05); font-size: 0.875rem; font-weight: 500; color: white; background-color: #4f46e5; /* bg-indigo-600 */
        }
        .btn-primary:hover {
           background-color: #4338ca; /* hover:bg-indigo-700 */
        }
       `}</style>
    </div>
  );
}

export default MembershipApp;
