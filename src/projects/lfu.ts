
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
        "Least Frequently Used (LFU) bases its eviction decisions on popularity rather than recency. It assumes that blocks accessed many times are important and should be kept in cache.",
        "LFU maintains a frequency counter for every block, tracking how many times it has been accessed. When the cache is full, the block with the lowest access count is removed.",
        "Unlike LRU which forgets old history, LFU has 'long-term memory' - a block accessed 100 times yesterday is valued more than a block accessed once today.",
        "Real-world analogy: Like a library keeping popular books on display shelves - books that are checked out frequently stay accessible, while rarely-borrowed books get moved to storage, regardless of when they were last borrowed."
      ]
    },
    uses: {
      title: "Uses & Advantages",
      content: [
        "LFU excels in scenarios with static or slowly-changing access patterns where certain data is permanently popular (e.g., CDN caching, DNS caches, database query caches).",
        "It's ideal when you want to protect 'hot' data from being evicted by temporary bursts of one-time accesses."
      ],
      bullets: [
        "Resistant to scan pollution: One-time sequential scans don't flush out popular items from the cache.",
        "Long-term optimization: Keeps historically popular items even during temporary access pattern changes.",
        "Protects hot data: Frequently accessed blocks are very difficult to evict, providing stable performance.",
        "Good for stable workloads: Performs excellently when access patterns don't change dramatically.",
        "Disadvantages: Slow to adapt to changing patterns, suffers from 'cache pollution' (old popular items stay too long), requires more memory for counters, complex tie-breaking needed."
      ]
    },
    working: {
      title: "How it Works",
      content: [
        "Every cache block has an associated frequency counter that tracks the number of accesses.",
        "1. New blocks are inserted with an initial frequency of 1.",
        "2. On a Hit, the counter for that block is incremented (frequency++).",
        "3. On eviction, the algorithm finds the block(s) with the minimum counter value.",
        "4. Tie-breaking: If multiple blocks have the same low frequency, a secondary policy (like LRU or FIFO) is used to pick the victim.",
        "5. The victim is evicted and the new block takes its place with frequency = 1.",
        "Example: Cache [A(5), B(3), C(1)] with frequencies in parentheses. When D arrives, C is evicted (lowest frequency), resulting in [A(5), B(3), D(1)].",
        "Challenge: Counters never decrease, so old popular blocks can become 'immortal' even if they're no longer accessed."
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
