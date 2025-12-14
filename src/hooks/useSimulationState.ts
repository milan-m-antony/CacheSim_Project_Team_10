
import { useState, useEffect, useRef, useCallback } from 'react';
import { AlgorithmType, AlgSettings, SimulationResult } from '../types';
import { runSimulation } from '../utils/simulationAdapter';

export interface UseSimulationState {
  currentStepIndex: number;
  result: SimulationResult | null;
  isPlaying: boolean;
  init: (type: AlgorithmType, settings: AlgSettings) => void;
  stepForward: () => void;
  stepBackward: () => void;
  jumpToStart: () => void;
  jumpToEnd: () => void;
  togglePlay: () => void;
  resetSimulation: () => void;
}

export const useSimulationState = (initialDelay: number = 500): UseSimulationState => {
  const [result, setResult] = useState<SimulationResult | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<number | null>(null);
  const delayRef = useRef(initialDelay);

  useEffect(() => {
    delayRef.current = initialDelay;
  }, [initialDelay]);

  const init = useCallback((type: AlgorithmType, settings: AlgSettings) => {
    setIsPlaying(false);
    if (timerRef.current) window.clearInterval(timerRef.current);

    const simResult = runSimulation(type, settings);
    setResult(simResult);
    setCurrentStepIndex(0);
  }, []);

  const stepForward = useCallback(() => {
    if (!result) return;
    setCurrentStepIndex(prev => {
      if (prev < result.steps.length) return prev + 1;
      setIsPlaying(false);
      return prev;
    });
  }, [result]);

  const stepBackward = useCallback(() => {
    setCurrentStepIndex(prev => (prev > 0 ? prev - 1 : 0));
  }, []);

  const jumpToStart = useCallback(() => setCurrentStepIndex(0), []);

  const jumpToEnd = useCallback(() => {
    if (result) setCurrentStepIndex(result.steps.length);
    setIsPlaying(false);
  }, [result]);

  const togglePlay = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  const resetSimulation = useCallback(() => {
    setResult(null);
    setIsPlaying(false);
    setCurrentStepIndex(0);
  }, []);

  useEffect(() => {
    if (isPlaying && result) {
      if (currentStepIndex >= result.steps.length) {
        setIsPlaying(false);
        return;
      }

      timerRef.current = window.setInterval(() => {
        setCurrentStepIndex(prev => {
          if (prev < result.steps.length) {
            return prev + 1;
          } else {
            setIsPlaying(false);
            return prev;
          }
        });
      }, delayRef.current);
    } else {
      if (timerRef.current) window.clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [isPlaying, result, currentStepIndex]);

  return {
    currentStepIndex,
    result,
    isPlaying,
    init,
    stepForward,
    stepBackward,
    jumpToStart,
    jumpToEnd,
    togglePlay,
    resetSimulation
  };
};
