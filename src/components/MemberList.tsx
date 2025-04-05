import React, { useState, useEffect } from 'react';
import { Member } from '../types';
import MemberItem from './MemberItem';
import { Users } from 'lucide-react';
import { supabase } from '../supabaseClient';

interface MemberListProps {
  members: Member[];
  onEditMember: (updatedMember: Member) => void;
  onDeleteMember: (id: string) => void;
  refresh: boolean;
}

const MemberList: React.FC<MemberListProps> = ({ members, onEditMember, onDeleteMember, refresh }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [memberList, setMemberList] = useState<Member[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      try {
        const { data, error } = await supabase
          .from('members')
          .select('*');

        if (error) {
          setError(error.message);
        } else if (data) {
          // Type assertion to ensure data is of type Member[]
          setMemberList(data as Member[]);
        }
      } catch (err) {
        setError('Failed to fetch members.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [refresh]);

  const handleQuickEditSave = (updatedMember: Member) => {
    // Update member in the list
    const updatedMembers = memberList.map(m => m.id === updatedMember.id ? updatedMember : m);
    onEditMember(updatedMembers); // Pass the updated list back to parent
  };

  if (loading) {
    return <div className="text-center py-10 px-4">Loading members...</div>;
  }

  if (error) {
    return <div className="text-center py-10 px-4 text-red-500">Error: {error}</div>;
  }

  if (memberList.length === 0) {
    return (
      <div className="text-center py-10 px-4">
        <Users size={48} className="mx-auto text-gray-400 mb-4" />
        <p className="text-gray-500 text-lg">No members found.</p>
        <p className="text-gray-400 text-sm">Click "Add Member" to get started.</p>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {memberList.map((member) => (
        <MemberItem
          key={member.id}
          member={member}
          onEdit={handleQuickEditSave} // Pass the quick edit handler
          onDelete={onDeleteMember}
        />
      ))}
    </ul>
  );
};

export default MemberList;
