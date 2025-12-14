
import React, { useState } from 'react';
import { ColorTheme } from '../../types';

interface SimpleInputProps {
  onSimulate: (references: number[], size: number) => void;
  theme: ColorTheme;
}

const SimpleInput: React.FC<SimpleInputProps> = ({ onSimulate, theme }) => {
  const [refInput, setRefInput] = useState('1 2 3 2 4 1 5');
  const [sizeInput, setSizeInput] = useState('3');
  const [error, setError] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const buttonThemeClass: Record<ColorTheme, string> = {
    indigo: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500',
    emerald: 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500',
    amber: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500',
    violet: 'bg-violet-600 hover:bg-violet-700 focus:ring-violet-500',
    rose: 'bg-rose-600 hover:bg-rose-700 focus:ring-rose-500',
    cyan: 'bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500',
    slate: 'bg-slate-700 hover:bg-slate-800 focus:ring-slate-500',
  };

  const focusRingClass: Record<ColorTheme, string> = {
    indigo: 'focus:ring-indigo-500 focus:border-indigo-500',
    emerald: 'focus:ring-emerald-500 focus:border-emerald-500',
    amber: 'focus:ring-amber-500 focus:border-amber-500',
    violet: 'focus:ring-violet-500 focus:border-violet-500',
    rose: 'focus:ring-rose-500 focus:border-rose-500',
    cyan: 'focus:ring-cyan-500 focus:border-cyan-500',
    slate: 'focus:ring-slate-500 focus:border-slate-500',
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSimulating(true);

    // Small artificial delay for "processing" feel
    setTimeout(() => {
      // Parse Cache Size
      const size = parseInt(sizeInput, 10);
      if (isNaN(size) || size <= 0) {
        setError("Cache size must be a positive integer.");
        setIsSimulating(false);
        return;
      }

      // Parse References
      const refs = refInput
        .trim()
        .split(/[\s,]+/)
        .filter(s => s.length > 0)
        .map(s => Number(s));
      
      if (refs.some(isNaN)) {
        setError("References must be valid numbers separated by spaces.");
        setIsSimulating(false);
        return;
      }

      if (refs.length === 0) {
        setError("Please enter at least one reference.");
        setIsSimulating(false);
        return;
      }

      onSimulate(refs, size);
      setIsSimulating(false);
    }, 400);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
      <h3 className="text-lg font-medium text-slate-800 mb-4 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
        Configuration
      </h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Memory References
            </label>
            <div className="relative">
              <input
                type="text"
                value={refInput}
                onChange={(e) => setRefInput(e.target.value)}
                placeholder="e.g. 1 2 3 2 4 1 5"
                className={`w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 outline-none transition-all ${focusRingClass[theme]}`}
              />
            </div>
            <p className="mt-2 text-xs text-slate-500 flex items-center gap-1">
              <span className="inline-block w-1 h-1 rounded-full bg-slate-400"></span>
              Enter integers separated by space or comma
            </p>
          </div>
          
          <div className="md:col-span-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Cache Size (Blocks)
            </label>
            <input
              type="number"
              value={sizeInput}
              onChange={(e) => setSizeInput(e.target.value)}
              min="1"
              className={`w-full px-4 py-3 border border-slate-300 rounded-lg shadow-sm focus:ring-2 outline-none transition-all ${focusRingClass[theme]}`}
            />
          </div>
        </div>

        {error && (
          <div className="p-4 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200 flex items-start gap-2 animate-pulse">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            {error}
          </div>
        )}

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={isSimulating}
            className={`
              px-8 py-3 text-white font-medium rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all transform hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed
              ${buttonThemeClass[theme]}
            `}
          >
            {isSimulating ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : "Run Simulation"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SimpleInput;
