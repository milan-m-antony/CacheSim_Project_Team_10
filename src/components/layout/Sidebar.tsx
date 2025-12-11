
import React from 'react';
import { SubPage, ProjectDef } from '../../types';

interface SidebarProps {
  project: ProjectDef;
  activeSubPage: SubPage;
  onNavigate: (subPage: SubPage) => void;
  onBack: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  project,
  activeSubPage,
  onNavigate,
  onBack,
  isOpen,
  setIsOpen
}) => {

  const subMenuItems: { id: SubPage; label: string }[] = [
    { id: 'SIMULATION', label: 'Simulation' },
    { id: 'DETAILS', label: 'Details (What is it?)' },
    { id: 'USES', label: 'Uses / Advantages' },
    { id: 'WORKING', label: 'Working' },
    { id: 'ALGORITHM', label: 'Algorithm' },
  ];

  const themeColorText: Record<string, string> = {
    indigo: 'text-indigo-700 bg-indigo-50 border-indigo-200',
    emerald: 'text-emerald-700 bg-emerald-50 border-emerald-200',
    amber: 'text-amber-700 bg-amber-50 border-amber-200',
    violet: 'text-violet-700 bg-violet-50 border-violet-200',
    rose: 'text-rose-700 bg-rose-50 border-rose-200',
    cyan: 'text-cyan-700 bg-cyan-50 border-cyan-200',
    slate: 'text-slate-800 bg-slate-100 border-slate-200',
  };

  const activeClass = themeColorText[project.info.theme];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 z-20 md:hidden backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`
          fixed top-0 left-0 z-30 h-full w-72 bg-white border-r border-slate-200 shadow-xl transition-transform duration-300 ease-in-out
          md:translate-x-0 md:static md:shadow-none flex flex-col
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Logo Area */}
        <div className="h-16 flex items-center px-6 border-b border-slate-100 shrink-0">
          <button
            onClick={onBack}
            className="mr-3 p-1.5 rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-700 transition-colors"
            title="Back to Projects"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
          </button>
          <span className="text-xl font-bold text-slate-800 tracking-tight truncate">{project.info.title}</span>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-2">

          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">
            Project Menu
          </div>

          {subMenuItems.map((item) => {
            const isActive = activeSubPage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  if (window.innerWidth < 768) setIsOpen(false);
                }}
                className={`
                  w-full text-left px-4 py-3 text-sm font-medium rounded-lg transition-all
                  ${isActive
                    ? `shadow-sm border ${activeClass}`
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900 border border-transparent'
                  }
                `}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-100 shrink-0">
          <div className="bg-slate-50 rounded-lg p-4">
            <div className="text-xs font-bold text-slate-400 uppercase mb-1">Project Lead</div>
            <div className="text-sm font-medium text-slate-800">{project.info.credit}</div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
