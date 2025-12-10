
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
        "Fully Associative Mapping is the opposite of Direct Mapping - it allows a memory block to be placed in ANY available cache line, providing maximum flexibility.",
        "There are no restrictions on placement. When a block needs to be loaded, it can go into any empty slot. When all slots are full, a replacement policy (LRU, FIFO, etc.) decides which block to evict.",
        "The hardware must search ALL cache lines in parallel to find a block, requiring complex comparison circuitry but eliminating conflict misses entirely.",
        "Real-world analogy: Like a parking garage with no assigned spots - you can park anywhere there's space. To find your car, you must check every spot, but you'll never be turned away if there's any empty space."
      ]
    },
    uses: {
      title: "Uses & Advantages",
      content: [
        "Used in small, critical caches like TLBs (Translation Lookaside Buffers), where avoiding conflict misses is crucial and the cache is small enough to search quickly.",
        "Also used in victim caches and small L1 data caches where maximum hit rate is more important than hardware complexity."
      ],
      bullets: [
        "Zero conflict misses: A block is only evicted when the cache is completely full, maximizing cache utilization.",
        "Maximum flexibility: Any block can occupy any line, adapting perfectly to any access pattern.",
        "Best possible hit rate: For a given cache size, associative mapping achieves the highest hit rate.",
        "Can use any replacement policy: LRU, FIFO, Random, or custom policies can be implemented.",
        "Optimal space utilization: Every cache line can be used, no wasted space.",
        "Disadvantages: Expensive hardware (parallel comparators for all lines), higher power consumption, slower than direct mapping, complex replacement logic needed."
      ]
    },
    working: {
      title: "How it Works",
      content: [
        "1. When searching for a block, ALL cache tags are compared simultaneously in parallel using dedicated hardware comparators.",
        "2. If any line matches → HIT. The data is retrieved from that line.",
        "3. If no line matches → MISS. The block can be placed in any empty slot.",
        "4. If cache is full, a replacement algorithm (LRU, FIFO, etc.) selects a victim block to evict.",
        "5. The new block replaces the victim and the replacement policy's metadata is updated.",
        "Example: With 4-line cache using LRU and blocks [1,2,3,4], accessing block 5 evicts the least recently used block (say 1), resulting in [5,2,3,4]. Block 5 can go into any position - the replacement policy decides.",
        "Hardware requirement: N parallel comparators for N cache lines, plus logic for the replacement policy."
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
        "Step 17: Repeat until all references are processed."
      ]
    }
  }
};
