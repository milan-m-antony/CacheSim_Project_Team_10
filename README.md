# CacheSim Project - Team 10

A comprehensive interactive cache simulation tool implementing **five different cache replacement and mapping algorithms**. This educational tool helps visualize how different cache strategies work and compare their performance.

## Team Members

| Name | Algorithm/Module | Branch |
|------|------------------|--------|
| **Milan M Antony** | FIFO (First-In, First-Out) | `milan-fifo-module` |
| **Nehu Sam Abraham** | Direct Mapping | `nehu-direct-module` |
| **Muhammed Jasir P P** | LRU (Least Recently Used) | `jasir-lru-module` |
| **Naveena Elsa Koshy** | Associative Mapping | `naveena-associative-module` |
| **Mahi Manoj** | LFU (Least Frequently Used) | `mahi-lfu-module` |

## Project Overview

This project provides interactive simulations for five cache replacement and mapping algorithms:

1. **FIFO** - First-In, First-Out replacement
2. **LRU** - Least Recently Used replacement  
3. **LFU** - Least Frequently Used replacement
4. **Direct Mapping** - Fixed block-to-line mapping
5. **Associative Mapping** - Flexible block placement

Each algorithm includes:-
- **Step-by-step visualization** of cache operations
- **Real-time statistics** (hits, misses, hit ratio)
- **Detailed explanations** of each step
- **Algorithm documentation** with use cases and trade-offs
- **Interactive controls** to configure cache size and memory sequene.

## Installation & Usage

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/milan-m-antony/CacheSim_Project_Team_10.git
   cd CacheSim_Project_Team_10
   ```

2. **Install dependencies**
   ```bash
   npm install to install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```
   
4. **Open in browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to view the simulation tool.

### Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## Cache Algorithms

### 1. FIFO (First-In, First-Out)
- **Developer:** Milan M Antony
- **Code Location:** `src/projects/fifo.ts`
- **Description:** Evicts the oldest block in the cache (queue-based)
- **Best For:** Simple systems where implementation simplicity is key
- **Advantages:** 
  - Extremely simple to implement
  - Minimal memory overhead
  - Predictable O(1) performance
- **Disadvantages:**
  - Poor performance with looping patterns
  - Doesn't consider access frequency

### 2. LRU (Least Recently Used)
- **Developer:** Muhammed Jasir P P
- **Code Location:** `src/projects/lru.ts`
- **Description:** Evicts the block that hasn't been accessed for the longest time
- **Best For:** General-purpose caching with temporal locality
- **Advantages:**
  - High hit rate for most workloads
  - Adapts to changing access patterns
  - Handles loops effectively
- **Disadvantages:**
  - More complex than FIFO
  - Vulnerable to sequential scans

### 3. LFU (Least Frequently Used)
- **Developer:** Mahi Manoj
- **Code Location:** `src/projects/lfu.ts`
- **Description:** Evicts the block with the lowest access count
- **Best For:** Workloads with stable, long-term popularity patterns
- **Advantages:**
  - Protects frequently-used data
  - Resistant to scan pollution
  - Good for static workloads
- **Disadvantages:**
  - Slow to adapt to pattern changes
  - Requires frequency counters (more memory)

### 4. Direct Mapping
- **Developer:** Nehu Sam Abraham
- **Code Location:** `src/projects/direct.ts`
- **Description:** Each memory block maps to exactly one cache line (block % cache_size)
- **Best For:** L1 caches where speed is critical
- **Advantages:**
  - Blazing fast lookup (O(1))
  - Simple hardware implementation
  - Low power consumption
- **Disadvantages:**
  - High conflict miss rate
  - Poor cache utilization

### 5. Associative Mapping (Fully Associative)
- **Developer:** Naveena Elsa Koshy
- **Code Location:** `src/projects/associative.ts`
- **Description:** Any block can go into any cache line (requires replacement policy)
- **Best For:** Small critical caches like TLBs
- **Advantages:**
  - Zero conflict misses
  - Maximum flexibility
  - Optimal space utilization
- **Disadvantages:**
  - Expensive parallel search hardware
  - Higher power consumption

## How to Run/Compare Algorithms

### Running Individual Algorithms

1. Start the development server (`npm run dev`)
2. Navigate to the landing page
3. Select an algorithm from the sidebar:
   - FIFO Replacement
   - LRU Replacement
   - LFU Replacement
   - Direct Mapping
   - Associative Mapping
4. Configure parameters:
   - **Cache Size:** Number of cache lines
   - **Memory Reference Sequence:** Space-separated block addresses
5. Click "Run Simulation" to see step-by-step execution
6. View statistics and explanations for each step

### Comparing Algorithms

1. Navigate to the "Compare" view
2. Select multiple algorithms to compare
3. Use the same reference sequence for fair comparison
4. Analyze hit ratios and miss patterns side-by-side

## Project Structure

```
CacheSim_Project_Team_10/
├── src/
│   ├── projects/              # Algorithm implementations
│   │   ├── fifo.ts           # FIFO algorithm
│   │   ├── lru.ts            # LRU algorithm
│   │   ├── lfu.ts            # LFU algorithm
│   │   ├── direct.ts         # Direct Mapping
│   │   ├── associative.ts    # Associative Mapping
│   │   └── index.ts          # Algorithm registry
│   ├── services/
│   │   └── cacheAlgorithms.ts # Simulation engines
│   ├── components/           # React UI components
│   ├── types/                # TypeScript type definitions
│   ├── data/                 # Team info, presets
│   └── App.tsx               # Main application
├── package.json              # Project dependencies
├── vite.config.ts           # Vite configuration
└── README.md                # This file
```

## Technology Stack

- **Frontend Framework:** React 18.2.0
- **Language:** TypeScript 5.8.2
- **Build Tool:** Vite 6.2.0
- **Styling:** CSS with custom animations

## Development

### Adding a New Algorithm

1. Create a new file in `src/projects/` (e.g., `myalgorithm.ts`)
2. Export a `ProjectDef` object with algorithm metadata
3. Register it in `src/projects/index.ts`
4. Add the simulation logic in `src/services/cacheAlgorithms.ts`
5. Update the `AlgorithmType` enum in `src/types/index.ts`

### Testing

Currently, testing is manual through the interactive UI. Future enhancements could include:
- Unit tests for simulation algorithms
- Integration tests for UI components
- Automated comparison tests

## License

© 2024 Team 10 - Cache Simulation Project

---

## Acknowledgments

Special thanks to all team members for their contributions to making this comprehensive cache simulation tool possible.
