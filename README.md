# Fully Associative Cache Mapping

**Developer:** Naveena Elsa Koshy

## Overview

This project implements **Fully Associative Mapping** cache organization with an interactive visualization tool.

Associative Mapping allows any memory block to be placed in any cache line, providing maximum flexibility and eliminating conflict misses.

## Features

- **Interactive Simulation**: Configure cache size, memory sequences, and replacement policy
- **Step-by-Step Visualization**: Watch flexible block placement in action
- **Real-time Statistics**: Track hits, misses, and hit ratio
- **Detailed Explanations**: Each step shows placement decisions
- **Enhanced Animations**: Bounce effects for hits, pulse effects for misses
- **Policy Selection**: Choose between LRU or FIFO replacement

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

**Fully Associative Mapping** provides complete placement flexibility:
- **Any Block, Any Line**: No restrictions on placement
- **Parallel Search**: All cache lines checked simultaneously
- **Zero Conflict Misses**: Only evict when completely full
- **Replacement Policy**: LRU or FIFO decides victim selection

### Advantages
- Zero conflict misses
- Maximum flexibility
- Best possible hit rate
- Optimal space utilization
- Can use any replacement policy

### Disadvantages
- Expensive hardware (parallel comparators)
- Higher power consumption
- Slower than direct mapping
- Complex replacement logic needed

---
© 2024 Naveena Elsa Koshy
