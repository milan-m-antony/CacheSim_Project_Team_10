
import { AlgorithmType, ProjectDef } from '../types';
import { directProject } from './direct';

export const PROJECTS: Record<string, ProjectDef> = {
  [AlgorithmType.DIRECT]: directProject,
};

export const getAllProjects = () => Object.values(PROJECTS);
