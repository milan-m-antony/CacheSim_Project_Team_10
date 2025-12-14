# FIFO Cache Replacement Algorithm

**Developer:** Milan M Antony

## Overview

This project implements the **FIFO (First-In, First-Out)** cache replacement algorithm with an interactive visualization tool.

FIFO is one of the simplest cache replacement algorithms that treats the cache like a queue - the oldest block is always evicted first, regardless of access patterns.

## Features

- **Interactive Simulation**: Configure cache size and memory reference sequences
- **Step-by-Step Visualization**: Watch how blocks enter and leave the cache
- **Real-time Statistics**: Track hits, misses, and hit ratio
- **Detailed Explanations**: Each step shows what's happening and why
- **Enhanced Animations**: Bounce effects for hits, pulse effects for misses

## Installation & Usage

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the simulation.

## Algorithm Details

**FIFO (First-In, First-Out)** evicts the block that has been in the cache the longest, using a queue data structure:
- **Insertion**: New blocks are added to the tail of the queue
- **Eviction**: When full, the head (oldest) block is removed
- **On Hit**: Queue order does NOT change (unlike LRU)

### Advantages
- Extremely simple to implement
- Minimal memory overhead
- Predictable behavior
- O(1) time complexity

### Disadvantages
- Poor performance with looping access pattern
- Doesn't adapt to working sets
- Can evict frequently-used blocks

----
© 2024 Milan M Antony
