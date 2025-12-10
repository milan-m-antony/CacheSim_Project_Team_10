
export enum AlgorithmType {
  FIFO = 'FIFO',
  LRU = 'LRU',
  LFU = 'LFU',
  DIRECT = 'DIRECT',
  ASSOCIATIVE = 'ASSOCIATIVE'
}

export type SubPage = 'SIMULATION' | 'DETAILS' | 'USES' | 'WORKING' | 'ALGORITHM';

export type ColorTheme = 'indigo' | 'emerald' | 'amber' | 'violet' | 'rose' | 'cyan' | 'slate';

export interface SimulationStep {
  step: number;
  reference: number;
  cacheBefore: (number | string | null)[];
  cacheAfter: (number | string | null)[];
  status: 'HIT' | 'MISS';
  details?: string;
  explanation?: string;
}

export interface SimulationResult {
  steps: SimulationStep[];
  hits: number;
  misses: number;
  hitRatio: number;
  totalReferences: number;
  algorithmType?: AlgorithmType;
}

export interface AlgorithmInfo {
  type: AlgorithmType;
  title: string;
  description: string;
  tooltip: string;
  theme: ColorTheme;
  credit: string;
}

export interface AlgoContentSection {
  title: string;
  content: string[]; // Array of paragraphs
  bullets?: string[]; // Optional bullet points
}

export interface ProjectDef {
  info: AlgorithmInfo;
  content: {
    details: AlgoContentSection;
    uses: AlgoContentSection;
    working: AlgoContentSection;
    algorithm: AlgoContentSection;
  };
}

export interface TeamMember {
  name: string;
  role: string;
}

// --- Types for UI Controls ---

export type TieBreakStrategy = 'LRU' | 'FIFO';
export type ReplacementPolicy = 'LRU' | 'FIFO';

export interface AlgSettings {
  references: string;
  cacheSize: number;
  stepDelayMs: number;
  lfuTieBreak: TieBreakStrategy;
  associativePolicy: ReplacementPolicy;
  showCounts?: boolean;
}

export interface Preset {
  id: string;
  label: string;
  refs: string;
  size: number;
}
