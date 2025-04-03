import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom'; // Import routing components
import Header from './components/Header'; // Keep existing header
import MemberList from './components/MemberList';
import AddMemberForm from './components/AddMemberForm';
import DashboardPage from './pages/DashboardPage'; // Import Dashboard
import { Member } from './types';
import { Plus, LayoutDashboard, Users as UsersIcon } from 'lucide-react'; // Icons for nav

// Dummy data (keep as is)
const initialMembers: Member[] = [
  { id: '1', name: 'Alice Wonderland', email: 'alice@example.com', membershipLevel: 'Premium', joinDate: new Date(2023, 5, 15).toISOString() },
  { id: '2', name: 'Bob The Builder', email: 'bob@example.com', membershipLevel: 'Basic', joinDate: new Date(2024, 0, 10).toISOString() },
  { id: '3', name: 'Charlie Chaplin', email: 'charlie@example.com', membershipLevel: 'VIP', joinDate: new Date(2022, 11, 1).toISOString() },
];

function MembershipApp() {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [showAddForm, setShowAddForm] = useState(false);
  const location = useLocation(); // Get current path for active link styling

  const handleAddMember = (newMemberData: Omit<Member, 'id' | 'joinDate'>) => {
    const newMember: Member = {
      ...newMemberData,
      id: crypto.randomUUID(),
      joinDate: new Date().toISOString(),
    };
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

  // Function to pass to Dashboard Quick Actions
  const handleOpenAddMemberForm = () => {
      setShowAddForm(true);
  }

  // Simple Nav Links Data
  const navLinks = [
    { path: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/app/members', label: 'Members', icon: UsersIcon },
    // Add more links here (e.g., Settings, Communication)
  ];

  return (
    <div className="flex h-screen bg-gray-100">
       {/* Simple Sidebar Navigation */}
       <aside className="w-64 bg-white shadow-md flex flex-col">
         {/* Logo/Brand in Sidebar */}
         <div className="h-16 flex items-center justify-center border-b">
            <Link to="/app/dashboard" className="flex items-center space-x-2 text-xl font-bold text-indigo-600">
              <UsersIcon size={28} />
              <span>AmplifyHub</span>
            </Link>
         </div>
         <nav className="flex-grow p-4 space-y-2">
           {navLinks.map(link => {
              const isActive = location.pathname.startsWith(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-150 ${
                    isActive
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <link.icon size={20} className="mr-3" />
                  {link.label}
                </Link>
              );
           })}
         </nav>
          <div className="p-4 border-t">
             {/* Footer or User Info in Sidebar */}
             <p className="text-xs text-gray-500">© {new Date().getFullYear()} AmplifyHub</p>
          </div>
       </aside>

       {/* Main Content Area */}
       <div className="flex-1 flex flex-col overflow-hidden">
          {/* We might not need the top Header anymore if using sidebar */}
          {/* <Header /> */}

          {/* Content Area with Routing */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50">
            <Routes>
              {/* Default route for /app could redirect or show dashboard */}
              <Route index element={<DashboardPage onAddMemberClick={handleOpenAddMemberForm} />} />
              <Route path="dashboard" element={<DashboardPage onAddMemberClick={handleOpenAddMemberForm} />} />
              <Route path="members" element={
                <div className="p-6"> {/* Add padding around member list */}
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
                </div>
              } />
              {/* Add other app routes here */}
            </Routes>
          </main>
       </div>

      {/* Modal Add Member Form (remains outside main content flow) */}
      {showAddForm && (
        <AddMemberForm
          onAddMember={handleAddMember}
          onCancel={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
}

export default MembershipApp;
