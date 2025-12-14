import { Preset } from '../types';

export const PRESETS: Preset[] = [
  { id: 'example1', label: 'Simple example', refs: '1 2 3 2 4 1 5', size: 3 },
  { id: 'example2', label: 'Loop example', refs: '1 2 3 4 1 2 3 4', size: 3 },
  { id: 'random', label: 'Random', refs: '', size: 5 }
];
