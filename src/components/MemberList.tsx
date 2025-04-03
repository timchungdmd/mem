import React from 'react';
import { Member } from '../types';
import MemberItem from './MemberItem';
import { Users } from 'lucide-react';

interface MemberListProps {
  members: Member[];
  onEditMember: (member: Member) => void;
  onDeleteMember: (id: string) => void;
}

const MemberList: React.FC<MemberListProps> = ({ members, onEditMember, onDeleteMember }) => {
  if (members.length === 0) {
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
      {members.map((member) => (
        <MemberItem
          key={member.id}
          member={member}
          onEdit={onEditMember}
          onDelete={onDeleteMember}
        />
      ))}
    </ul>
  );
};

export default MemberList;
