# LFU Cache Replacement Algorithm

**Developer:** Mahi Manoj

## Overview

This project implements the **LFU (Least Frequently Used)** cache replacement algorithm with an interactive visualization tool.

LFU bases eviction decisions on popularity - blocks accessed many times are considered important and kept in cache.

## Features

- **Interactive Simulation**: Configure cache size, memory sequences, and tie-break policy
- **Step-by-Step Visualization**: Watch frequency counters update in real-time
- **Real-time Statistics**: Track hits, misses, and hit ratio
- **Detailed Explanations**: Each step shows what's happening and why
- **Enhanced Animations**: Bounce effects for hits, pulse effects for misses
- **Tie-Breaking**: Choose between LRU or FIFO for equal frequencies

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

**LFU (Least Frequently Used)** maintains frequency counters and evicts the least frequently accessed block:
- **Tracking**: Each block has a frequency counter
- **On Hit**: Counter increments
- **Eviction**: Block with minimum frequency is removed
- **Tie-Breaking**: Secondary policy (LRU/FIFO) resolves ties

### Advantages
- Resistant to scan pollution
- Protects hot (popular) data
- Long-term optimization
- Excellent for stable workloads

### Disadvantages
- Slow to adapt to pattern changes
- Cache pollution (old popular items stay too long)
- Requires more memory for counters
- Complex tie-breaking needed

---
© 2024 Mahi Manoj
