
import React, { useState, useEffect } from 'react';
import { AlgorithmType, AlgSettings, TieBreakStrategy, ReplacementPolicy } from '../../types';
import { PRESETS } from '../../data/presets';
import { generateRandomSequence } from '../../utils/simulationAdapter';

interface VarsPanelProps {
  alg: AlgorithmType;
  onSettingsChange: (settings: AlgSettings) => void;
  onSimulate: () => void;
  disabled?: boolean;
}

const VarsPanel: React.FC<VarsPanelProps> = ({ alg, onSettingsChange, onSimulate, disabled }) => {
  const [refs, setRefs] = useState(PRESETS[0].refs);
  const [size, setSize] = useState(PRESETS[0].size);
  const [delay, setDelay] = useState(500);
  const [lfuTieBreak, setLfuTieBreak] = useState<TieBreakStrategy>('LRU');
  const [assocPolicy, setAssocPolicy] = useState<ReplacementPolicy>('LRU');
  const [selectedPreset, setSelectedPreset] = useState('example1');
  const [randLen, setRandLen] = useState(10);
  const [randMax, setRandMax] = useState(8);

  useEffect(() => {
    onSettingsChange({
      references: refs,
      cacheSize: size,
      stepDelayMs: delay,
      lfuTieBreak,
      associativePolicy: assocPolicy,
    });
  }, [refs, size, delay, lfuTieBreak, assocPolicy, onSettingsChange]);

  const handlePresetChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelectedPreset(val);
    const p = PRESETS.find(pr => pr.id === val);
    if (p && val !== 'random') {
      setRefs(p.refs);
      setSize(p.size);
    } else if (val === 'random') {
      const newRefs = generateRandomSequence(randLen, randMax);
      setRefs(newRefs);
    }
  };

  const handleRandomGen = () => {
    const newRefs = generateRandomSequence(randLen, randMax);
    setRefs(newRefs);
    setSelectedPreset('random');
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6 text-slate-900">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Preset Scenario</label>
          <select 
            value={selectedPreset} 
            onChange={handlePresetChange}
            disabled={disabled}
            className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 py-2.5 px-3"
          >
            {PRESETS.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
          </select>

          {selectedPreset === 'random' && (
             <div className="mt-3 flex gap-2 items-center text-sm p-3 bg-slate-50 rounded-lg border border-slate-200">
               <span className="text-slate-600 font-medium">Gen:</span>
               <input 
                 type="number" 
                 className="w-16 bg-white text-slate-900 border border-slate-300 rounded px-2 py-1 text-center focus:ring-1 focus:ring-indigo-500" 
                 placeholder="Len" 
                 value={randLen} 
                 onChange={e => setRandLen(Number(e.target.value))} 
               />
               <span className="text-slate-500">items (1-</span>
               <input 
                 type="number" 
                 className="w-16 bg-white text-slate-900 border border-slate-300 rounded px-2 py-1 text-center focus:ring-1 focus:ring-indigo-500" 
                 placeholder="Max" 
                 value={randMax} 
                 onChange={e => setRandMax(Number(e.target.value))} 
               />
               <span className="text-slate-500">)</span>
               <button 
                 onClick={handleRandomGen} 
                 className="ml-auto text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 px-2 py-1 rounded text-xs font-bold uppercase transition-colors"
               >
                 Regen
               </button>
             </div>
          )}
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="block text-sm font-medium text-slate-700">Playback Speed</label>
            <span className="text-xs font-mono bg-indigo-50 text-indigo-700 px-2 py-1 rounded">{delay} ms</span>
          </div>
          <input 
            type="range" min="50" max="2000" step="50" 
            value={delay} onChange={e => setDelay(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-3">
           <label className="block text-sm font-medium text-slate-700 mb-2">References Sequence</label>
           <input 
             type="text" 
             value={refs} 
             onChange={e => setRefs(e.target.value)}
             disabled={disabled}
             placeholder="e.g. 1 2 3 2 4 1"
             className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 font-mono py-2.5 px-3"
           />
        </div>
        <div>
           <label className="block text-sm font-medium text-slate-700 mb-2">Cache Size</label>
           <input 
             type="number" min="1" max="20"
             value={size} 
             onChange={e => setSize(Number(e.target.value))}
             disabled={disabled}
             className="w-full bg-white text-slate-900 border border-slate-300 rounded-lg shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 py-2.5 px-3"
           />
        </div>
      </div>

      {alg === AlgorithmType.LFU && (
        <div className="flex items-center gap-4 bg-amber-50 p-4 rounded-lg border border-amber-200">
          <span className="text-sm font-bold text-amber-900">LFU Tie-Break Policy:</span>
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center cursor-pointer">
              <input 
                type="radio" 
                value="LRU" 
                checked={lfuTieBreak === 'LRU'} 
                onChange={() => setLfuTieBreak('LRU')} 
                className="w-4 h-4 text-amber-600 border-amber-300 focus:ring-amber-500"
              />
              <span className="ml-2 text-sm text-amber-900">LRU</span>
            </label>
            <label className="inline-flex items-center cursor-pointer">
              <input 
                type="radio" 
                value="FIFO" 
                checked={lfuTieBreak === 'FIFO'} 
                onChange={() => setLfuTieBreak('FIFO')} 
                className="w-4 h-4 text-amber-600 border-amber-300 focus:ring-amber-500"
              />
              <span className="ml-2 text-sm text-amber-900">FIFO</span>
            </label>
          </div>
        </div>
      )}

      {alg === AlgorithmType.ASSOCIATIVE && (
        <div className="flex items-center gap-4 bg-rose-50 p-4 rounded-lg border border-rose-200">
          <span className="text-sm font-bold text-rose-900">Replacement Policy:</span>
          <div className="flex items-center gap-4">
            <label className="inline-flex items-center cursor-pointer">
              <input 
                type="radio" 
                value="LRU" 
                checked={assocPolicy === 'LRU'} 
                onChange={() => setAssocPolicy('LRU')} 
                className="w-4 h-4 text-rose-600 border-rose-300 focus:ring-rose-500"
              />
              <span className="ml-2 text-sm text-rose-900">LRU</span>
            </label>
            <label className="inline-flex items-center cursor-pointer">
              <input 
                type="radio" 
                value="FIFO" 
                checked={assocPolicy === 'FIFO'} 
                onChange={() => setAssocPolicy('FIFO')} 
                className="w-4 h-4 text-rose-600 border-rose-300 focus:ring-rose-500"
              />
              <span className="ml-2 text-sm text-rose-900">FIFO</span>
            </label>
          </div>
        </div>
      )}

      <div className="flex justify-end pt-2 border-t border-slate-100">
         <button 
           onClick={onSimulate}
           disabled={disabled}
           className="bg-indigo-600 text-white px-8 py-2.5 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md hover:shadow-lg font-medium flex items-center gap-2"
         >
           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
           </svg>
           Initialize Simulation
         </button>
      </div>
    </div>
  );
};

export default VarsPanel;
