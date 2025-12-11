
import React from 'react';

interface AlgDescriptionProps {
  title: string;
  text: string;
}

const AlgDescription: React.FC<AlgDescriptionProps> = ({ title, text }) => {
  return (
    <div className="bg-slate-50 border-l-4 border-indigo-500 p-4 rounded-r-md mb-6 shadow-sm">
      <h3 className="font-bold text-slate-800 text-lg mb-1">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{text}</p>
    </div>
  );
};

export default AlgDescription;
