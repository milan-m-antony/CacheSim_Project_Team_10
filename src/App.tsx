
import React, { useState } from 'react';
import { AlgorithmType, SubPage, ProjectDef } from './types';
import { PROJECTS } from './projects';

// Layout Components
import Sidebar from './components/layout/Sidebar';
import AlgorithmLayout from './components/layout/AlgorithmLayout';
import Footer from './components/layout/Footer';

// Views
import LandingPage from './components/views/LandingPage';
import SimulationView from './components/views/SimulationView';
import InfoView from './components/common/InfoView';

function App() {
  const [activeProject, setActiveProject] = useState<ProjectDef | null>(null);
  const [activeSubPage, setActiveSubPage] = useState<SubPage>('SIMULATION');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSelectProject = (type: AlgorithmType) => {
    setActiveProject(PROJECTS[type]);
    setActiveSubPage('SIMULATION');
  };

  const handleBackToHome = () => {
    setActiveProject(null);
  };

  const handleNavigate = (subPage: SubPage) => {
    setActiveSubPage(subPage);
  };

  // 1. Landing Page View (No Project Selected)
  if (!activeProject) {
    return <LandingPage onSelectProject={handleSelectProject} />;
  }

  // 2. Project View
  const { info, content } = activeProject;

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans">
      <Sidebar
        project={activeProject}
        activeSubPage={activeSubPage}
        onNavigate={handleNavigate}
        onBack={handleBackToHome}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden relative w-full">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-slate-200 h-16 flex items-center justify-between px-4 shrink-0">
          <div className="flex items-center gap-2">
            <button onClick={handleBackToHome} className="text-slate-500">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </button>
            <span className="font-bold text-slate-800">{info.title}</span>
          </div>
          <button onClick={() => setSidebarOpen(true)} className="p-2 text-slate-500 hover:bg-slate-100 rounded-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </header>

        <main className="flex-1 overflow-y-auto scroll-smooth">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
            <AlgorithmLayout info={info}>
              {activeSubPage === 'SIMULATION' && (
                <SimulationView algorithm={info.type} info={info} />
              )}

              {activeSubPage === 'DETAILS' && (
                <InfoView section={content.details} theme={info.theme} />
              )}

              {activeSubPage === 'USES' && (
                <InfoView section={content.uses} theme={info.theme} />
              )}

              {activeSubPage === 'WORKING' && (
                <InfoView section={content.working} theme={info.theme} />
              )}

              {activeSubPage === 'ALGORITHM' && (
                <InfoView section={content.algorithm} theme={info.theme} />
              )}
            </AlgorithmLayout>
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}

export default App;
