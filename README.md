# Direct Mapping Cache Organization

**Developer:** Nehu Sam Abraham

## Overview

This project implements **Direct Mapping** cache organization with an interactive visualization tool.

Direct Mapping is a hardware cache organization where each memory block maps to exactly one specific cache line using a deterministic formula.

## Features

- **Interactive Simulation**: Configure cache size and memory reference sequences
- **Step-by-Step Visualization**: Watch how blocks map to specific cache lines
- **Real-time Statistics**: Track hits, misses, and conflict misses
- **Detailed Explanations**: Each step shows the mapping calculation
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

## Algorithm Details of Direct Mapping

**Direct Mapping** uses the formula: `Cache Line = (Block Address) mod (Cache Size)`
- **Deterministic**: Each block has exactly one possible cache line
- **No Choice**: Replacement is automatic based on mapping
- **Fast Lookup**: Only one cache line needs to be checked
- **Conflict Misses**: Multiple blocks competing for same line
- **Low Cost**: It is a low cost technique as it requires minimal hardware
- **Simple Implementation**:It is the simplest cache mapping technique to implement

### Advantages of Direct Mapping
- Blazing fast lookup (O(1))
- Simple hardware implementation
- Low power consumption
- Deterministic access time
- Minimal hardware cost
- No need of replacement polcy
- Predictable performance

### Disadvantages of Direct Mapping
- High conflict miss rate
- Poor cache utilization
- No flexibility in placement
- Thrashing with certain patterns
- Not suitable for larger caches
- Not adaptive

---
© 2024 Nehu Sam Abraham
