# LRU Cache Replacement Algorithm

**Developer:** Muhammed Jasir P P

## Overview

This project implements the **LRU (Least Recently Used)** cache replacement algorithm with an interactive visualization tool.

LRU is a popular and effective algorithm that relies on temporal locality - if an item was accessed recently, it's likely to be accessed again soon.

## Features

- **Interactive Simulation**: Configure cache size and memory reference sequences
- **Step-by-Step Visualization**: Watch how blocks move based on recency
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

**LRU (Least Recently Used)** maintains a recency-ordered list and evicts the least recently accessed block:
- **On Access**: Block moves to MRU (Most Recently Used) position
- **Eviction**: When full, the LRU (leftmost) block is removed
- **Dynamic Ranking**: Blocks "age out" if not accessed

### Advantages
- High hit rate for most workloads
- Adapts to changing access patterns
- Handles loops effectively
- Near-optimal performance

### Disadvantages
- Higher implementation complexity than FIFO
- Requires tracking access order
- Vulnerable to sequential scans

---
© 2024 Muhammed Jasir P P
