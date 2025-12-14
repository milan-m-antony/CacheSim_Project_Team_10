
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
        "Direct Mapping is a hardware cache organization technique where each memory block maps to exactly one specific cache line based on its address. It's not a replacement policy - it's a placement strategy.",
        "The mapping is deterministic: given a block address, you can instantly calculate which cache line it must occupy using the formula: Cache Line = (Block Address) mod (Number of Cache Lines).",
        "This creates a many-to-one mapping: multiple memory blocks compete for the same cache line, leading to potential conflict misses even when other cache lines are empty.",
        "Real-world analogy: Like assigned parking spots in a garage - your car (memory block) must park in your designated spot (cache line) even if other spots are empty. If someone else's car is in your spot, it must be moved."
      ]
    },
    uses: {
      title: "Uses & Advantages",
      content: [
        "Direct mapping is used in L1 instruction caches and scenarios where ultra-fast lookup speed is critical and cache size is relatively small.",
        "It's the simplest and fastest cache organization, making it ideal for high-performance processors where every nanosecond counts."
      ],
      bullets: [
        "Blazing fast lookup: Hardware knows exactly where to look - only ONE cache line needs to be checked.",
        "Simple hardware implementation: Requires only simple modulo arithmetic circuits, no complex search logic.",
        "Low power consumption: Only one tag comparison per access, minimal energy usage.",
        "Deterministic access time: Always takes the same time to check, making timing predictable.",
        "Minimal hardware cost: Cheapest cache organization to implement.",
        "Disadvantages: High conflict miss rate, poor cache utilization (some lines may stay empty while others thrash), no flexibility in placement."
      ]
    },
    working: {
      title: "How it Works",
      content: [
        "The cache line placement is calculated using: Index = (Block Address) mod (Cache Size).",
        "1. For incoming block B, calculate its cache line: Index = B mod N (where N = cache size).",
        "2. Check ONLY that specific cache line - no searching needed.",
        "3. If cache[Index] contains block B → HIT (data found).",
        "4. If cache[Index] is empty or contains a different block → MISS.",
        "5. On MISS: The existing block at cache[Index] MUST be evicted (no choice), and B is placed there.",
        "6. No replacement policy needed - the mapping formula dictates everything.",
        "Example: With cache size 4, blocks 1, 5, 9, 13 all map to line 1 (since 1%4=5%4=9%4=13%4=1). They will constantly evict each other, causing thrashing."
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
