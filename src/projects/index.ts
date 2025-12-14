
import { AlgorithmType, ProjectDef } from '../types';
import { fifoProject } from './fifo';

export const PROJECTS: Record<string, ProjectDef> = {
  [AlgorithmType.FIFO]: fifoProject,
};

export const getAllProjects = () => Object.values(PROJECTS);
