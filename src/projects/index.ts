
import { AlgorithmType, ProjectDef } from '../types';
import { associativeProject } from './associative';

export const PROJECTS: Record<string, ProjectDef> = {
  [AlgorithmType.ASSOCIATIVE]: associativeProject,
};

export const getAllProjects = () => Object.values(PROJECTS);
