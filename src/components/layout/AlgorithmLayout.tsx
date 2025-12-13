
import React from 'react';
import { AlgorithmInfo, ColorTheme } from '../../types';

interface AlgorithmLayoutProps {
  info: AlgorithmInfo;
  children: React.ReactNode;
}

const AlgorithmLayout: React.FC<AlgorithmLayoutProps> = ({ info, children }) => {
  
  const themeColorMap: Record<ColorTheme, string> = {
    indigo: 'text-indigo-900 border-indigo-200 bg-indigo-50',
    emerald: 'text-emerald-900 border-emerald-200 bg-emerald-50',
    amber: 'text-amber-900 border-amber-200 bg-amber-50',
    violet: 'text-violet-900 border-violet-200 bg-violet-50',
    rose: 'text-rose-900 border-rose-200 bg-rose-50',
    cyan: 'text-cyan-900 border-cyan-200 bg-cyan-50',
    slate: 'text-slate-900 border-slate-200 bg-slate-100',
  };

  const themeTitleColor: Record<ColorTheme, string> = {
    indigo: 'text-indigo-700',
    emerald: 'text-emerald-700',
    amber: 'text-amber-700',
    violet: 'text-violet-700',
    rose: 'text-rose-700',
    cyan: 'text-cyan-700',
    slate: 'text-slate-700',
  };

  const themeClass = themeColorMap[info.theme];
  const titleClass = themeTitleColor[info.theme];

  return (
    <div className="animate-in fade-in zoom-in-95 duration-500">
      {/* Header Card */}
      <div className={`rounded-xl border p-6 mb-8 shadow-sm ${themeClass} relative overflow-hidden`}>
        <div className="relative z-10">
          <div className="flex justify-between items-start">
            <div>
              <h2 className={`text-2xl font-bold mb-2 ${titleClass}`}>{info.title}</h2>
              <p className="text-sm md:text-base opacity-90 max-w-3xl leading-relaxed">
                {info.description}
              </p>
            </div>
            <div className={`hidden md:flex h-12 w-12 rounded-full items-center justify-center bg-white/50 backdrop-blur-sm ${titleClass} font-bold text-xl shadow-sm`}>
               {info.title.charAt(0)}
            </div>
          </div>
        </div>
        
        {/* Decorative background element */}
        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/20 rounded-full blur-2xl pointer-events-none"></div>
      </div>

      {/* Main Content (Input + Results) */}
      <div className="space-y-8">
        {children}
      </div>

      {/* Personal Credit Footer for this Algorithm */}
      <div className="mt-12 pt-6 border-t border-slate-200 flex justify-end">
        <div className="text-right">
          <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Algorithm Implementation</p>
          <p className="text-sm text-slate-600 italic">Developed by {info.credit}</p>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmLayout;
