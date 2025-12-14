
import React from 'react';
import { AlgorithmType, ProjectDef, ColorTheme } from '../../types';
import { getAllProjects } from '../../projects';

interface LandingPageProps {
  onSelectProject: (type: AlgorithmType) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSelectProject }) => {
  const projects = getAllProjects();

  const themeColors: Record<ColorTheme, string> = {
    indigo: 'bg-indigo-50 border-indigo-200 text-indigo-700 hover:border-indigo-400 hover:shadow-indigo-100',
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700 hover:border-emerald-400 hover:shadow-emerald-100',
    amber: 'bg-amber-50 border-amber-200 text-amber-700 hover:border-amber-400 hover:shadow-amber-100',
    violet: 'bg-violet-50 border-violet-200 text-violet-700 hover:border-violet-400 hover:shadow-violet-100',
    rose: 'bg-rose-50 border-rose-200 text-rose-700 hover:border-rose-400 hover:shadow-rose-100',
    cyan: 'bg-cyan-50 border-cyan-200 text-cyan-700 hover:border-cyan-400 hover:shadow-cyan-100',
    slate: 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-400 hover:shadow-slate-100',
  };

  const iconColors: Record<ColorTheme, string> = {
    indigo: 'bg-indigo-600',
    emerald: 'bg-emerald-600',
    amber: 'bg-amber-600',
    violet: 'bg-violet-600',
    rose: 'bg-rose-600',
    cyan: 'bg-cyan-600',
    slate: 'bg-slate-600',
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
      <div className="max-w-4xl w-full space-y-12">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg mb-6">
             <span className="text-3xl font-bold text-white">C</span>
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            CacheSim Pro
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Select a project module below to explore specific cache replacement algorithms and mapping techniques.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj) => {
            const { info } = proj;
            return (
              <button
                key={info.type}
                onClick={() => onSelectProject(info.type)}
                className={`
                  relative group p-6 rounded-2xl border-2 text-left transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg
                  ${themeColors[info.theme]}
                `}
              >
                <div className={`
                   w-12 h-12 rounded-lg mb-4 flex items-center justify-center text-white font-bold text-xl shadow-sm
                   ${iconColors[info.theme]}
                `}>
                  {info.title.charAt(0)}
                </div>
                
                <h3 className="text-xl font-bold mb-2 text-slate-900">
                  {info.title}
                </h3>
                
                <p className="text-sm text-slate-600 opacity-90 leading-relaxed mb-4">
                  {info.description}
                </p>

                <div className="flex items-center text-xs font-semibold uppercase tracking-wider opacity-70">
                   <span className="mr-auto">{info.credit}</span>
                   <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                   </svg>
                </div>
              </button>
            );
          })}
        </div>
        
        <div className="text-center text-slate-400 text-sm mt-12">
           v3.1.0 • Project Selector Build
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
