
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
<<<<<<< HEAD
        "First-In, First-Out (FIFO) is one of the simplest cache replacement algorithms. As the name suggests, it treats the cache like a queue.",
        "When the cache is full and a new block needs to be brought in, FIFO evicts the block that has been in the cache the longest, regardless of how recently or frequently it has been accessed."
=======
        "First-In, First-Out (FIFO) is one of the simplest cache replacement algorithms. As the name suggests, it treats the cache like a queue where the oldest entry is always evicted first.",
        "When the cache is full and a new block needs to be brought in, FIFO evicts the block that has been in the cache the longest, regardless of how recently or frequently it has been accessed. This makes it a 'blind' algorithm that doesn't consider usage patterns.",
        "FIFO maintains insertion order using a queue data structure. The head of the queue points to the oldest block (first candidate for eviction), while the tail points to the most recently inserted block.",
        "Real-world analogy: Think of a checkout line at a store - the first person in line is the first to be served and leave, regardless of how many items they're buying or how important they are."
>>>>>>> e4a45b02ae5f2b80aac243d5593bb0eee767bf2c
      ]
    },
    uses: {
      title: "Uses & Advantages",
      content: [
<<<<<<< HEAD
        "FIFO is primarily used in low-cost hardware buffers or simple systems where overhead must be minimized."
      ],
      bullets: [
        "Simple to implement: Requires only a pointer to the oldest block.",
        "Low overhead: No need to track timestamps or counters.",
        "Predictable behavior: Eviction order is strictly determined by arrival time."
=======
        "FIFO is primarily used in low-cost hardware buffers, embedded systems, and scenarios where simplicity is more important than optimal hit rates.",
        "Common applications include: printer spoolers, keyboard buffers, network packet queues, and simple caching layers in legacy systems."
      ],
      bullets: [
        "Extremely simple to implement: Requires only a single pointer or index to track the oldest block.",
        "Minimal memory overhead: No need to track timestamps, access counters, or maintain complex data structures.",
        "Predictable behavior: Eviction order is strictly determined by arrival time, making it easy to reason about.",
        "Fair eviction: All blocks get equal 'time' in the cache before being evicted.",
        "Low computational cost: O(1) time complexity for both insertion and eviction operations.",
        "Disadvantages: Poor performance with looping access patterns, doesn't adapt to working sets, can evict frequently-used blocks."
>>>>>>> e4a45b02ae5f2b80aac243d5593bb0eee767bf2c
      ]
    },
    working: {
      title: "How it Works",
      content: [
<<<<<<< HEAD
        "The algorithm maintains a logical queue of cache blocks.",
        "1. When a block enters, it is added to the tail of the queue.",
        "2. If the cache is full, the block at the head of the queue (the oldest) is removed.",
        "3. On a Cache Hit, the queue order does NOT change (unlike LRU). This is the key characteristic of FIFO."
=======
        "The algorithm maintains a logical queue of cache blocks with two pointers: HEAD (oldest) and TAIL (newest).",
        "1. When a new block enters the cache, it is added to the TAIL of the queue.",
        "2. If the cache is full, the block at the HEAD of the queue (the oldest) is removed first.",
        "3. On a Cache Hit, the queue order does NOT change (unlike LRU). This is the key characteristic of FIFO - access frequency and recency are completely ignored.",
        "4. The queue advances like a conveyor belt: new blocks push in from one end, old blocks fall off the other end.",
        "Example: With cache size 3 and references [1,2,3,2,4], block 1 gets evicted when 4 arrives, even though block 2 was accessed more recently."
>>>>>>> e4a45b02ae5f2b80aac243d5593bb0eee767bf2c
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
