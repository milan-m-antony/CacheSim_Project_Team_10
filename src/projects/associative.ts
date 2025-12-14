
import { AlgorithmType, ProjectDef } from '../types';

export const associativeProject: ProjectDef = {
  info: {
    type: AlgorithmType.ASSOCIATIVE,
    title: 'Associative Mapping',
    description: "Any block can go into any cache line. Requires a replacement policy such as LRU or FIFO.",
    tooltip: 'Flexible placement + LRU',
    theme: 'rose',
    credit: 'Naveena Elsa Koshy'
  },
  content: {
    details: {
      title: "What is Associative Mapping?",
      content: [
        "Fully Associative Mapping allows a memory block to be placed in ANY available cache line.",
        "It offers the most flexibility but requires the hardware to search the entire cache to find a block."
      ]
    },
    uses: {
      title: "Uses & Advantages",
      content: [
        "Used in smaller caches (like TLBs) where avoiding conflict misses is more important than hardware complexity."
      ],
      bullets: [
        "No conflict misses: A block is only evicted if the cache is strictly full.",
        "Flexible: Utilization of cache space is maximized.",
        "Can use any replacement policy (LRU, FIFO, Random)."
      ]
    },
    working: {
      title: "How it Works",
      content: [
        "1. When searching for a block, all cache tags are compared simultaneously (in parallel).",
        "2. If found -> Hit.",
        "3. If not found -> Miss. The block can be placed in any empty slot.",
        "4. If full, a replacement algorithm (like LRU or FIFO) decides which block to evict."
      ]
    },
    algorithm: {
      title: "Fully Associative Cache Using FIFO or LRU",
      content: [
        "Step 1: Initialize cache with N slots.",
        "Step 2: If policy is FIFO, initialize a queue.",
        "Step 3: If policy is LRU, initialize an LRU list.",
        "Step 4: For each memory reference R, repeat Steps 5–17.",
        "Step 5: Check if R exists in the cache.",
        "Step 6: If HIT:",
        "  If policy is LRU → update recency list.",
        "  Go to Step 17.",
        "Step 7: If MISS: continue.",
        "Step 8: If cache has empty space, insert R.",
        "Step 9: If cache is full and policy = FIFO:",
        "  • Evict oldest using queue.",
        "Step 10: If cache is full and policy = LRU:",
        "  • Evict least recently used block.",
        "Step 11: Replace victim with R.",
        "Step 12: Update the queue or LRU list accordingly.",
        "Step 13: Continue to next reference.",
        "Step 14: Repeat until all references are processed."
      ]
    }
  }
};
