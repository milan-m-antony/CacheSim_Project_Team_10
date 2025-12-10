
import { AlgorithmType, AlgSettings, SimulationResult } from '../types';
import {
  simulateFIFO,
  simulateLRU,
  simulateLFU,
  simulateDirect,
  simulateAssociative
} from '../services/cacheAlgorithms';

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

  switch (type) {
    case AlgorithmType.FIFO:
      return simulateFIFO(references, size);
    case AlgorithmType.LRU:
      return simulateLRU(references, size);
    case AlgorithmType.LFU:
      return simulateLFU(references, size, settings.lfuTieBreak);
    case AlgorithmType.DIRECT:
      return simulateDirect(references, size);
    case AlgorithmType.ASSOCIATIVE:
      return simulateAssociative(references, size, settings.associativePolicy);
    default:
      return simulateFIFO(references, size);
  }
};
