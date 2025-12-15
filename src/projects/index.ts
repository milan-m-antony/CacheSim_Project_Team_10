
import { AlgorithmType, ProjectDef } from '../types';
<<<<<<< HEAD
import { directProject } from './direct';

export const PROJECTS: Record<string, ProjectDef> = {
  [AlgorithmType.DIRECT]: directProject,
=======
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
>>>>>>> e4a45b02ae5f2b80aac243d5593bb0eee767bf2c
};

export const getAllProjects = () => Object.values(PROJECTS);
