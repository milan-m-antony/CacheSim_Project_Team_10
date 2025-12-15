<<<<<<< HEAD

import { Preset } from '../types';

export const PRESETS: Preset[] = [
  { id: 'example1', label: 'Example 1', refs: '1 2 3 2 4 1 5 2 3', size: 3 },
  { id: 'conflict-heavy', label: 'Conflict Heavy', refs: '1 4 7 10 1 4 7 10', size: 3 },
  { id: 'frequent-hot', label: 'Frequent Hot', refs: '2 2 2 3 4 2 5 2 2', size: 3 },
  { id: 'random', label: 'Custom Random', refs: '', size: 4 },
=======
import { Preset } from '../types';

export const PRESETS: Preset[] = [
  { id: 'example1', label: 'Simple example', refs: '1 2 3 2 4 1 5', size: 3 },
  { id: 'example2', label: 'Loop example', refs: '1 2 3 4 1 2 3 4', size: 3 },
  { id: 'random', label: 'Random', refs: '', size: 5 }
>>>>>>> e4a45b02ae5f2b80aac243d5593bb0eee767bf2c
];
