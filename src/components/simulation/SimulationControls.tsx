
import React from 'react';

interface SimulationControlsProps {
  isPlaying: boolean;
  canStepForward: boolean;
  canStepBackward: boolean;
  onPlayPause: () => void;
  onStepForward: () => void;
  onStepBackward: () => void;
  onReset: () => void;
  onJumpEnd: () => void;
}

const SimulationControls: React.FC<SimulationControlsProps> = ({
  isPlaying,
  canStepForward,
  canStepBackward,
  onPlayPause,
  onStepForward,
  onStepBackward,
  onReset,
  onJumpEnd
}) => {
  return (
    <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-20 shadow-sm mb-6">
      <div className="flex items-center gap-2">
        <button 
          onClick={onReset}
          className="p-2 text-slate-600 hover:bg-slate-200 rounded-lg tooltip"
          title="Reset to Start"
          aria-label="Reset"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
             <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
        </button>

        <div className="h-6 w-px bg-slate-300 mx-1"></div>

        <button 
          onClick={onStepBackward}
          disabled={!canStepBackward || isPlaying}
          className="p-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 disabled:opacity-50"
          aria-label="Step Backward"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8.445 14.832A1 1 0 0010 14v-2.798l5.445 3.63A1 1 0 0017 14V6a1 1 0 00-1.555-.832L10 8.798V6a1 1 0 00-1.555-.832l-6 4a1 1 0 000 1.664l6 4z" />
          </svg>
        </button>

        <button 
          onClick={onPlayPause}
          disabled={!canStepForward && !isPlaying}
          className={`
            px-6 py-2 rounded-lg font-bold text-white flex items-center gap-2 transition-colors
            ${isPlaying ? 'bg-amber-500 hover:bg-amber-600' : 'bg-green-600 hover:bg-green-700'}
            disabled:opacity-50 disabled:bg-slate-400
          `}
        >
          {isPlaying ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              Pause
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
              Play
            </>
          )}
        </button>

        <button 
          onClick={onStepForward}
          disabled={!canStepForward || isPlaying}
          className="p-2 bg-white border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 disabled:opacity-50"
          aria-label="Step Forward"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
             <path d="M4.555 5.168A1 1 0 003 6v8a1 1 0 001.555.832L10 11.202V14a1 1 0 001.555.832l6-4a1 1 0 000-1.664l-6-4A1 1 0 0010 6v2.798l-5.445-3.63z" />
          </svg>
        </button>

        <button 
          onClick={onJumpEnd}
          disabled={!canStepForward || isPlaying}
          className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg text-xs font-semibold uppercase"
        >
          End
        </button>
      </div>
    </div>
  );
};

export default SimulationControls;
