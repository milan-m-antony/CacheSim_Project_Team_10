
import { AlgorithmType, ProjectDef } from '../types';

export const lruProject: ProjectDef = {
  info: {
    type: AlgorithmType.LRU,
    title: 'LRU Replacement',
    description: "Evicts the block that has not been used for the longest time. Good for workloads with temporal locality.",
    tooltip: 'Evicts least recently accessed',
    theme: 'emerald',
    credit: 'Muhammed Jasir P P'
  },
  content: {
    details: {
      title: "What is LRU?",
      content: [
        "Least Recently Used (LRU) is a popular and effective replacement algorithm that relies on the 'Temporal Locality' principle: if an item was accessed recently, it is likely to be accessed again soon.",
        "LRU keeps track of when each block was last accessed. When eviction is needed, it removes the item that has not been used for the longest period of time, assuming it's least likely to be needed again.",
        "Unlike FIFO, LRU is 'smart' - it adapts to access patterns. Every time a block is accessed (hit or miss), its recency is updated, giving frequently and recently accessed blocks priority to stay in cache.",
        "Real-world analogy: Like organizing your desk - you keep frequently used items within reach and push rarely-used items to the back. Eventually, the items you haven't touched in the longest time get moved to storage."
      ]
    },
    uses: {
      title: "Uses & Advantages",
      content: [
        "LRU is widely used in modern operating systems (page replacement), database buffer pools, web browsers (cache management), and CDN edge servers.",
        "It's the gold standard for general-purpose caching because it balances performance with reasonable implementation complexity."
      ],
      bullets: [
        "High hit rate: Adapts well to changing access patterns and exploits temporal locality.",
        "Handles loops effectively: Works well for repeated data access patterns and working sets.",
        "Intuitive behavior: Closely mimics how humans manage working memory - keep recent items accessible.",
        "Near-optimal for many workloads: Often approaches the performance of the theoretical optimal algorithm (Bélády's).",
        "Self-adjusting: Automatically adapts when access patterns change over time.",
        "Disadvantages: Higher implementation complexity than FIFO, requires tracking access order, vulnerable to sequential scans that can flush the entire cache."
      ]
    },
    working: {
      title: "How it Works",
      content: [
        "The cache is organized like a stack or doubly-linked list, with the Most Recently Used (MRU) item at the top and Least Recently Used (LRU) item at the bottom.",
        "1. When a block is accessed (Hit or Miss), it is moved to the MRU position (top of the stack).",
        "2. All other blocks effectively shift down in the recency order.",
        "3. When space is needed, the block at the LRU position (bottom of stack) is evicted.",
        "4. This creates a dynamic ranking where blocks 'age out' if not accessed.",
        "Example: With cache [1,2,3] and accessing 2, the order becomes [2,1,3]. If 4 arrives, 3 (LRU) is evicted, resulting in [4,2,1].",
        "Implementation note: Can use a hash map + doubly-linked list for O(1) access and update operations."
      ]
    },
    algorithm: {
      title: "LRU Algorithm",
      content: [
        "Step 1: Initialize a cache with N empty slots.",
        "Step 2: Initialize an empty LRU list to track recency order.",
        "Step 3: For each memory reference R, repeat Steps 4–13.",
        "Step 4: Check whether R exists in the cache.",
        "Step 5: If R is found, mark HIT.",
        "Step 6: Remove R from its position in the LRU list.",
        "Step 7: Append R to the end of the LRU list (most recently used).",
        "Step 8: If R is not found, mark MISS.",
        "Step 9: If the cache has empty space, insert R and add it to LRU list.",
        "Step 10: If the cache is full, select the first item in the LRU list (least recently used).",
        "Step 11: Evict this block from the cache.",
        "Step 12: Insert R into its place and append R to the end of the LRU list.",
        "Step 13: Continue with the next reference."
      ]
    }
  }
};
