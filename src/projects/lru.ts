
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
        "Least Recently Used (LRU) is a popular replacement algorithm that relies on the 'Temporal Locality' principle: if an item was accessed recently, it is likely to be accessed again soon.",
        "LRU keeps track of usage history. When eviction is needed, it removes the item that has not been used for the longest period of time."
      ]
    },
    uses: {
      title: "Uses & Advantages",
      content: [
        "LRU is widely used in modern operating systems, database buffer pools, and web browsers."
      ],
      bullets: [
        "High performance: Adapts well to changing access patterns.",
        "Handles loops: Works well for repeated data access patterns.",
        "Intuitive: Closely mimics how humans manage working memory."
      ]
    },
    working: {
      title: "How it Works",
      content: [
        "The cache is organized like a stack or a linked list.",
        "1. When a block is accessed (Hit or Miss), it is moved to the 'Most Recently Used' (MRU) position.",
        "2. All other blocks are effectively pushed down.",
        "3. When space is needed, the block at the 'Least Recently Used' position (bottom of stack) is evicted."
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
