
import { Preset } from '../types';

export const PRESETS: Preset[] = [
  { id: 'example1', label: 'Example 1', refs: '1 2 3 2 4 1 5 2 3', size: 3 },
  { id: 'conflict-heavy', label: 'Conflict Heavy', refs: '1 4 7 10 1 4 7 10', size: 3 },
  { id: 'frequent-hot', label: 'Frequent Hot', refs: '2 2 2 3 4 2 5 2 2', size: 3 },
  { id: 'random', label: 'Custom Random', refs: '', size: 4 },
];
