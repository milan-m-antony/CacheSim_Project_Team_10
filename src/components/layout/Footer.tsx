
import React from 'react';
import { TEAM_MEMBERS } from '../../data/team';

const Footer: React.FC = () => {
  if (TEAM_MEMBERS.length === 0) return null;
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
          {TEAM_MEMBERS.map((member, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <span className="text-sm font-bold text-slate-800">{member.name}</span>
              <span className="text-xs text-slate-500 font-mono mt-1">{member.role}</span>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
