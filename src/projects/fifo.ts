
import { AlgorithmType, ProjectDef } from '../types';

export const fifoProject: ProjectDef = {
  info: {
    type: AlgorithmType.FIFO,
    title: 'FIFO Replacement',
    description: "Evicts the block that entered first. Simple queue behavior — does not consider recency or frequency.",
    tooltip: 'Evicts the oldest block added',
    theme: 'indigo',
    credit: 'Milan M Antony'
  },
  content: {
    details: {
      title: "What is FIFO?",
      content: [
        "First-In, First-Out (FIFO) is one of the simplest cache replacement algorithms. As the name suggests, it treats the cache like a queue.",
        "When the cache is full and a new block needs to be brought in, FIFO evicts the block that has been in the cache the longest, regardless of how recently or frequently it has been accessed."
      ]
    },
    uses: {
      title: "Uses & Advantages",
      content: [
        "FIFO is primarily used in low-cost hardware buffers or simple systems where overhead must be minimized."
      ],
      bullets: [
        "Simple to implement: Requires only a pointer to the oldest block.",
        "Low overhead: No need to track timestamps or counters.",
        "Predictable behavior: Eviction order is strictly determined by arrival time."
      ]
    },
    working: {
      title: "How it Works",
      content: [
        "The algorithm maintains a logical queue of cache blocks.",
        "1. When a block enters, it is added to the tail of the queue.",
        "2. If the cache is full, the block at the head of the queue (the oldest) is removed.",
        "3. On a Cache Hit, the queue order does NOT change (unlike LRU). This is the key characteristic of FIFO."
      ]
    },
    algorithm: {
      title: "FIFO Algorithm",
      content: [
        "Step 1: Initialize an empty cache with N slots.",
        "Step 2: Initialize an empty queue to store the order of inserted blocks.",
        "Step 3: For each memory reference R, repeat Steps 4–10.",
        "Step 4: Check whether R is present in the cache.",
        "Step 5: If found, mark HIT and go to Step 10.",
        "Step 6: If not found, mark MISS.",
        "Step 7: If cache has empty space, insert R and enqueue R.",
        "Step 8: If cache is full, dequeue the oldest block from the queue.",
        "Step 9: Replace the evicted block in the cache with R, then enqueue R.",
        "Step 10: Continue to the next reference.",
        "Step 11: End the algorithm after all references are processed."
      ]
    }
  }
};
