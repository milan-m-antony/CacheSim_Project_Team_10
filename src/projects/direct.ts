
import { AlgorithmType, ProjectDef } from '../types';

export const directProject: ProjectDef = {
  info: {
    type: AlgorithmType.DIRECT,
    title: 'Direct Mapping',
    description: "Each memory block maps to a single fixed cache line (index = block % lines). Fast but vulnerable to conflict misses.",
    tooltip: 'Fixed mapping (Block % Size)',
    theme: 'violet',
    credit: 'Nehu Sam Abraham'
  },
  content: {
    details: {
      title: "What is Direct Mapping?",
      content: [
        "Direct Mapping is a hardware mapping technique, not just a replacement policy. It dictates exactly where a memory block can go.",
        "Each block of main memory maps to exactly one cache line based on its address."
      ]
    },
    uses: {
      title: "Uses & Advantages",
      content: [
        "Used in L1 caches where speed is critical."
      ],
      bullets: [
        "Fastest lookup: The hardware knows exactly where to look.",
        "Simple hardware: Requires simple modulo arithmetic circuits.",
        "Low power consumption: Only one tag needs to be checked."
      ]
    },
    working: {
      title: "How it Works",
      content: [
        "The placement is calculated using the formula: Index = Block Address % Cache Size.",
        "1. Calculate the index for the incoming block.",
        "2. Check only that specific index.",
        "3. If occupied by a different block, the existing block MUST be evicted (Conflict Miss).",
        "4. No replacement policy is needed because there is no choice involved."
      ]
    },
    algorithm: {
      title: "Direct Mapping Algorithm",
      content: [
        "Step 1: Initialize a cache of size N.",
        "Step 2: For each memory reference R, repeat Steps 3–7.",
        "Step 3: Compute the index as index = R mod N.",
        "Step 4: If cache[index] == R, mark HIT.",
        "Step 5: If cache[index] != R, mark MISS.",
        "Step 6: Replace cache[index] with R.",
        "Step 7: Continue to next reference.",
        "Step 8: Stop after all references are processed."
      ]
    }
  }
};
