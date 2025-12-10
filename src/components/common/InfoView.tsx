
import React from 'react';
import { AlgoContentSection, ColorTheme } from '../../types';

interface InfoViewProps {
  section: AlgoContentSection;
  theme: ColorTheme;
}

const InfoView: React.FC<InfoViewProps> = ({ section, theme }) => {
  const themeColors: Record<ColorTheme, string> = {
    indigo: 'border-indigo-500 text-indigo-900',
    emerald: 'border-emerald-500 text-emerald-900',
    amber: 'border-amber-500 text-amber-900',
    violet: 'border-violet-500 text-violet-900',
    rose: 'border-rose-500 text-rose-900',
    cyan: 'border-cyan-500 text-cyan-900',
    slate: 'border-slate-500 text-slate-900',
  };

  return (
    <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className={`text-2xl font-bold mb-6 pb-2 border-b-2 ${themeColors[theme]}`}>
        {section.title}
      </h2>
      
      <div className="space-y-6">
        {section.content.map((paragraph, idx) => (
          <p key={idx} className="text-slate-700 leading-relaxed text-lg">
            {paragraph}
          </p>
        ))}

        {section.bullets && (
          <ul className="list-disc pl-6 space-y-3 mt-4 bg-slate-50 p-6 rounded-lg">
            {section.bullets.map((bullet, idx) => (
              <li key={idx} className="text-slate-700 pl-2 marker:text-slate-400">
                {bullet}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default InfoView;
