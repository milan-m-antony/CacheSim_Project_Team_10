
import { AlgorithmType, ProjectDef } from '../types';
import { fifoProject } from './fifo';
import { lruProject } from './lru';
import { lfuProject } from './lfu';
import { directProject } from './direct';
import { associativeProject } from './associative';

export const PROJECTS: Record<string, ProjectDef> = {
  [AlgorithmType.FIFO]: fifoProject,
  [AlgorithmType.LRU]: lruProject,
  [AlgorithmType.LFU]: lfuProject,
  [AlgorithmType.DIRECT]: directProject,
  [AlgorithmType.ASSOCIATIVE]: associativeProject,
};

export const getAllProjects = () => Object.values(PROJECTS);
