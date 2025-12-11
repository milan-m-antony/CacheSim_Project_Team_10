
import { AlgorithmType, ProjectDef } from '../types';
import { lfuProject } from './lfu';

export const PROJECTS: Record<string, ProjectDef> = {
  [AlgorithmType.LFU]: lfuProject,
};

export const getAllProjects = () => Object.values(PROJECTS);
