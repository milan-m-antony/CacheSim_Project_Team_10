
import { AlgorithmType, ProjectDef } from '../types';

export const lfuProject: ProjectDef = {
  info: {
    type: AlgorithmType.LFU,
    title: 'LFU Replacement',
    description: "Evicts the block with the lowest access frequency. Tie-break can be LRU or FIFO.",
    tooltip: 'Evicts least frequently used',
    theme: 'amber',
    credit: 'Mahi Manoj'
  },
  content: {
    details: {
      title: "What is LFU?",
      content: [
        "Least Frequently Used (LFU) bases its decisions on popularity. It assumes that an item used many times is important and should be kept.",
        "It maintains a frequency counter for every block. When the cache is full, the block with the lowest access count is removed."
      ]
    },
    uses: {
      title: "Uses & Advantages",
      content: [
        "LFU is excellent for static access patterns where certain data is permanently popular (e.g., CDN caching, DNS caches)."
      ],
      bullets: [
        "Resistant to scan pollution: One-time sequential scans don't flush out popular items.",
        "Long-term optimization: Keeps historically popular items."
      ]
    },
    working: {
      title: "How it Works",
      content: [
        "Every cache block has an associated counter.",
        "1. New blocks are inserted with a frequency of 1.",
        "2. On a Hit, the counter for that block is incremented.",
        "3. On eviction, find the block with the minimum counter value.",
        "4. Tie-breaking: If multiple blocks have the same low frequency, a secondary policy (like LRU or FIFO) is used to pick the victim."
      ]
    },
    algorithm: {
      title: "LFU Algorithm",
      content: [
        "Step 1: Initialize a cache of size N.",
        "Step 2: Initialize three maps:",
        "  • frequency[R] → number of accesses",
        "  • lastAccess[R] → last used step",
        "  • arrival[R] → order of insertion",
        "Step 3: Set a step counter = 0.",
        "Step 4: For each reference R, increment step counter and repeat Steps 5–18.",
        "Step 5: Check if R exists in the cache.",
        "Step 6: If R is found, mark HIT and update:",
        "  • frequency[R]++",
        "  • lastAccess[R] = step",
        "  Go to Step 18.",
        "Step 7: If R is not found, mark MISS.",
        "Step 8: If cache has empty space, insert R and set:",
        "  • frequency[R] = 1",
        "  • lastAccess[R] = step",
        "  • arrival[R] = step",
        "  Then go to Step 18.",
        "Step 9: If cache is full, determine the victim by:",
        "  Step 10: Choosing items with the minimum frequency.",
        "  Step 11: If a tie, choose the item with the oldest lastAccess.",
        "  Step 12: If still tied, choose the item with the earliest arrival time.",
        "Step 13: Evict the victim block.",
        "Step 14: Insert R into victim’s position.",
        "Step 15: Set frequency[R] = 1.",
        "Step 16: Update lastAccess[R] = step.",
        "Step 17: Update arrival[R] = step.",
        "Step 18: Continue with next reference."
      ]
    }
  }
};
