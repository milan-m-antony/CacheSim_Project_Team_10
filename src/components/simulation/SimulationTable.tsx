
import React, { useRef, useEffect, useState } from 'react';
import { SimulationResult, ColorTheme } from '../../types';

interface SimulationTableProps {
  result: SimulationResult;
  theme: ColorTheme;
  currentStepIndex: number;
}

const SimulationTable: React.FC<SimulationTableProps> = ({ result, theme, currentStepIndex }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showExplanation, setShowExplanation] = useState(false);

  useEffect(() => {
    if (scrollRef.current && currentStepIndex > 0) {
      const rows = scrollRef.current.querySelectorAll('tbody tr');
      const currentRow = rows[currentStepIndex - 1];
      if (currentRow) {
        currentRow.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [currentStepIndex]);

  const visibleSteps = result.steps.slice(0, currentStepIndex);

  const currentHits = visibleSteps.filter(s => s.status === 'HIT').length;
  const currentMisses = visibleSteps.filter(s => s.status === 'MISS').length;
  const currentRatio = visibleSteps.length > 0 ? (currentHits / visibleSteps.length) : 0;

  const currentStep = currentStepIndex > 0 ? result.steps[currentStepIndex - 1] : null;

  const textThemeClass: Record<ColorTheme, string> = {
    indigo: 'text-indigo-600',
    emerald: 'text-emerald-600',
    amber: 'text-amber-600',
    violet: 'text-violet-600',
    rose: 'text-rose-600',
    cyan: 'text-cyan-600',
    slate: 'text-slate-600',
  };

  const bgThemeClass: Record<ColorTheme, string> = {
    indigo: 'bg-indigo-50 border-indigo-200 text-indigo-700',
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    amber: 'bg-amber-50 border-amber-200 text-amber-700',
    violet: 'bg-violet-50 border-violet-200 text-violet-700',
    rose: 'bg-rose-50 border-rose-200 text-rose-700',
    cyan: 'bg-cyan-50 border-cyan-200 text-cyan-700',
    slate: 'bg-slate-50 border-slate-200 text-slate-700',
  };

  const currentTextColor = textThemeClass[theme];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col items-center">
          <span className="text-xs text-slate-500 font-medium uppercase mb-1">Hits</span>
          <span className="text-2xl font-bold text-slate-800">{currentHits}</span>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col items-center">
          <span className="text-xs text-slate-500 font-medium uppercase mb-1">Misses</span>
          <span className="text-2xl font-bold text-slate-800">{currentMisses}</span>
        </div>
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm flex flex-col items-center">
          <span className="text-xs text-slate-500 font-medium uppercase mb-1">Ratio</span>
          <span className={`text-2xl font-bold ${currentTextColor}`}>
            {(currentRatio * 100).toFixed(1)}%
          </span>
        </div>
      </div>


      {visibleSteps.length > 0 && (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden max-h-[400px] overflow-y-auto">
          <div className="px-4 py-3 border-b border-slate-100 bg-gradient-to-r from-blue-50 to-indigo-50 sticky top-0 z-10">
            <h4 className="font-bold text-blue-900 text-sm flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Step-by-Step Analysis
            </h4>
          </div>
          <div className="divide-y divide-slate-100">
            {visibleSteps.map((step, idx) => {
              const isLatest = idx === currentStepIndex - 1;
              return step.explanation ? (
                <div
                  key={step.step}
                  className={`p-4 transition-all duration-300 ${isLatest ? 'bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500' : 'hover:bg-slate-50'}`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${step.status === 'HIT' ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-600'
                      }`}>
                      {step.step}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-slate-900">Reference: {step.reference}</span>
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${step.status === 'HIT' ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-600'
                          }`}>
                          {step.status}
                        </span>
                      </div>
                      <p className="text-sm text-slate-700 leading-relaxed">
                        {step.explanation}
                      </p>
                    </div>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </div>
      )}

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col max-h-[500px]">
        <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50 flex justify-between">
          <h3 className="font-semibold text-slate-800">Execution Log</h3>
          <span className="text-xs text-slate-500 font-mono">Step: {currentStepIndex} / {result.steps.length}</span>
        </div>

        <div ref={scrollRef} className="overflow-y-auto overflow-x-auto flex-1 scroll-smooth scrollbar-thin">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200 sticky top-0 z-10">
              <tr>
                <th className="px-6 py-3 w-16 text-center">#</th>
                <th className="px-6 py-3 w-20 text-center">Ref</th>
                <th className="px-6 py-3">Cache State</th>
                <th className="px-6 py-3 w-24 text-center">Status</th>
                <th className="px-6 py-3 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visibleSteps.map((step, idx) => {
                const isLatest = idx === currentStepIndex - 1;
                return (
                  <tr key={step.step} className={`transition-all duration-500 animate-in fade-in slide-in-from-left ${isLatest ? 'bg-gradient-to-r from-blue-50 to-indigo-50 shadow-sm' : 'hover:bg-slate-50'}`}>
                    <td className="px-6 py-3 text-center font-mono text-slate-400 text-xs">
                      {step.step}
                    </td>
                    <td className="px-6 py-3 text-center">
                      <span className="font-bold text-slate-700">{step.reference}</span>
                    </td>
                    <td className="px-6 py-3">
                      <div className="flex gap-2 flex-wrap">
                        {step.cacheAfter.map((block, bIdx) => {
                          // Logic to determine if this specific block was part of the action
                          let isHitBlock = false;
                          let isNewBlock = false;

                          // Parse block value if it's a string (e.g. "5 (x2)")
                          let blockVal: number | null = null;
                          if (typeof block === 'number') blockVal = block;
                          else if (typeof block === 'string') blockVal = parseInt(block.split(' ')[0]);

                          if (step.status === 'HIT' && blockVal === step.reference) isHitBlock = true;
                          // Check previous step to see if this slot changed
                          const prevBlock = idx > 0 ? result.steps[idx - 1].cacheAfter[bIdx] : null;
                          if (step.status === 'MISS' && block !== prevBlock) isNewBlock = true;

                          let cellClass = "bg-white border-slate-300 text-slate-600";
                          if (block === null) cellClass = "bg-slate-50 border-slate-200 text-slate-300";
                          else if (isHitBlock && isLatest) cellClass = "bg-gradient-to-br from-green-100 to-green-200 border-green-500 text-green-900 scale-125 shadow-lg animate-bounce";
                          else if (isNewBlock && isLatest) cellClass = `${bgThemeClass[theme]} ring-4 ring-offset-2 scale-125 shadow-xl animate-pulse`;

                          // Adjust size for longer text (LFU counters)
                          const isLongText = typeof block === 'string' && block.length > 3;
                          const sizeClass = isLongText ? "w-16 text-xs px-1" : "w-10 text-sm";

                          // Generate tooltip text
                          let tooltipText = '';
                          if (block === null) {
                            tooltipText = 'Empty slot';
                          } else if (isHitBlock && isLatest) {
                            tooltipText = `HIT: Block ${block} found in cache (no replacement needed)`;
                          } else if (isNewBlock && isLatest) {
                            tooltipText = `MISS: Block ${block} just loaded into this slot`;
                          } else {
                            tooltipText = `Block ${block} in cache`;
                          }

                          return (
                            <div
                              key={bIdx}
                              className={`${sizeClass} h-10 flex items-center justify-center border-2 rounded-md font-mono transition-all duration-300 ${cellClass} cursor-help`}
                              title={tooltipText}
                            >
                              {block ?? '·'}
                            </div>
                          );
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-3 text-center">
                      <span
                        className={`
                        inline-block px-2 py-1 rounded-md text-xs font-bold w-16 text-center cursor-help
                        ${step.status === 'HIT' ? 'bg-green-100 text-green-700' : 'bg-red-50 text-red-600'}
                      `}
                        title={step.status === 'HIT'
                          ? `HIT: Block ${step.reference} was already in cache`
                          : `MISS: Block ${step.reference} was not in cache, replacement occurred`}
                      >
                        {step.status}
                      </span>
                    </td>
                    <td
                      className="px-6 py-3 text-right text-xs text-slate-500 cursor-help"
                      title={step.details || 'No additional details'}
                    >
                      {step.details}
                    </td>
                  </tr>
                );
              })}
              {visibleSteps.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                    Ready to start. Click 'Initialize Simulation' then 'Play'.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SimulationTable;
