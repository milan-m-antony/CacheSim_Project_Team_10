
import { AlgorithmType, AlgSettings, SimulationResult } from '../types';
<<<<<<< HEAD
import {
  simulateFIFO,
  simulateLRU,
  simulateLFU,
  simulateDirect,
  simulateAssociative
=======
import { 
  simulateFIFO, 
  simulateLRU, 
  simulateLFU, 
  simulateDirect, 
  simulateAssociative 
>>>>>>> e4a45b02ae5f2b80aac243d5593bb0eee767bf2c
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

<<<<<<< HEAD
=======
  // Run the appropriate simulation based on algorithm type
>>>>>>> e4a45b02ae5f2b80aac243d5593bb0eee767bf2c
  switch (type) {
    case AlgorithmType.FIFO:
      return simulateFIFO(references, size);
    case AlgorithmType.LRU:
      return simulateLRU(references, size);
    case AlgorithmType.LFU:
<<<<<<< HEAD
      return simulateLFU(references, size, settings.lfuTieBreak);
    case AlgorithmType.DIRECT:
      return simulateDirect(references, size);
    case AlgorithmType.ASSOCIATIVE:
      return simulateAssociative(references, size, settings.associativePolicy);
    default:
      return simulateFIFO(references, size);
=======
      return simulateLFU(references, size, settings.lfuTieBreak || 'LRU');
    case AlgorithmType.DIRECT:
      return simulateDirect(references, size);
    case AlgorithmType.ASSOCIATIVE:
      return simulateAssociative(references, size, settings.associativePolicy || 'LRU');
    default:
      throw new Error(`Unknown algorithm type: ${type}`);
>>>>>>> e4a45b02ae5f2b80aac243d5593bb0eee767bf2c
  }
};
