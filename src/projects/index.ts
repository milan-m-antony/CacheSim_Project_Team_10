
import { AlgorithmType, ProjectDef } from '../types';
import { lruProject } from './lru';

export const PROJECTS: Record<string, ProjectDef> = {
  [AlgorithmType.LRU]: lruProject,
};

export const getAllProjects = () => Object.values(PROJECTS);
