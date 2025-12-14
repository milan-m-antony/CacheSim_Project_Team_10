
import React, { useState, useCallback } from 'react';
import { AlgorithmType, AlgSettings, AlgorithmInfo } from '../../types';
import { useSimulationState } from '../../hooks/useSimulationState';
import AlgDescription from '../common/AlgDescription';
import VarsPanel from '../simulation/VarsPanel';
import SimulationControls from '../simulation/SimulationControls';
import SimulationTable from '../simulation/SimulationTable';

interface SimulationViewProps {
  algorithm: AlgorithmType;
  info: AlgorithmInfo;
}

const SimulationView: React.FC<SimulationViewProps> = ({ algorithm, info }) => {
  const [settings, setSettings] = useState<AlgSettings>({
    references: '1 2 3 2 4 1 5',
    cacheSize: 3,
    stepDelayMs: 500,
    lfuTieBreak: 'LRU',
    associativePolicy: 'LRU',
    showCounts: true
  });

  const simState = useSimulationState(settings.stepDelayMs);

  const handleSettingsChange = useCallback((newSettings: AlgSettings) => {
    setSettings(newSettings);
  }, []);

  const handleSimulate = () => {
    simState.init(algorithm, settings);
  };

  // Reset simulation if algorithm changes
  React.useEffect(() => {
    simState.init(algorithm, settings);
  }, [algorithm]);

  return (
    <>
      <AlgDescription title="Simulation Overview" text={info.description} />

      <VarsPanel
        alg={algorithm}
        onSettingsChange={handleSettingsChange}
        onSimulate={handleSimulate}
        disabled={simState.isPlaying}
      />

      {simState.result && (
        <div className="mt-8 animate-in slide-in-from-bottom-4 duration-500">
          <SimulationControls
            isPlaying={simState.isPlaying}
            canStepForward={simState.currentStepIndex < simState.result.steps.length}
            canStepBackward={simState.currentStepIndex > 0}
            onPlayPause={simState.togglePlay}
            onStepForward={simState.stepForward}
            onStepBackward={simState.stepBackward}
            onReset={simState.jumpToStart}
            onJumpEnd={simState.jumpToEnd}
            onClear={simState.resetSimulation}
          />

          <SimulationTable
            result={simState.result}
            theme={info.theme}
            currentStepIndex={simState.currentStepIndex}
          />
        </div>
      )}
    </>
  );
};

export default SimulationView;
