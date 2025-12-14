
import { AlgorithmType, AlgSettings, SimulationResult } from '../types';
import { simulateFIFO } from '../services/cacheAlgorithms';

export const generateRandomSequence = (length: number, maxVal: number): string => {
  return Array.from({ length }, () => Math.floor(Math.random() * maxVal)).join(' ');
};

export const parseReferences = (refString: string): number[] => {
  return refString
    .trim()
    .split(/[\s,]+/)
    .filter(s => s.length > 0)
    .map(Number)
    .filter(n => !isNaN(n));
};

export const runSimulation = (
  type: AlgorithmType,
  settings: AlgSettings
): SimulationResult => {
  const references = parseReferences(settings.references);
  const size = settings.cacheSize;

  // This app is focused on FIFO only — always run FIFO simulation.
  return simulateFIFO(references, size);
};
