
import { SimulationResult, SimulationStep, AlgorithmType } from '../types';

/**
 * Helper to calculate final stats from steps
 */
const calculateStats = (steps: SimulationStep[], type?: AlgorithmType): SimulationResult => {
  const hits = steps.filter(s => s.status === 'HIT').length;
  const misses = steps.filter(s => s.status === 'MISS').length;
  const total = steps.length;
  return {
    steps,
    hits,
    misses,
    hitRatio: total > 0 ? hits / total : 0,
    totalReferences: total,
    algorithmType: type
  };
};

export const simulateFIFO = (references: number[], size: number): SimulationResult => {
  const steps: SimulationStep[] = [];
  // For FIFO visualization, we want to show the Queue state.
  // Left = Oldest (Head), Right = Newest (Tail).
  const queue: number[] = [];

  references.forEach((ref, index) => {
    // Current state of queue padded with nulls for visualization
    const cacheBefore = [...queue, ...Array(Math.max(0, size - queue.length)).fill(null)];
    
    let status: 'HIT' | 'MISS' = 'MISS';
    let details = '';
    let explanation = '';

    if (queue.includes(ref)) {
      status = 'HIT';
      explanation = `Hit. ${ref} is already in the queue. No change in order (FIFO does not update recency).`;
    } else {
      status = 'MISS';
      if (queue.length < size) {
        queue.push(ref);
        explanation = `Miss. ${ref} added to the queue (Right/Tail).`;
      } else {
        const victim = queue.shift(); // Remove oldest
        queue.push(ref); // Add new
        details = `Evicted ${victim}`;
        explanation = `Miss. Cache full. Evicted oldest block (${victim}) from the Left/Head. Added ${ref} to Right/Tail.`;
      }
    }

    const cacheAfter = [...queue, ...Array(Math.max(0, size - queue.length)).fill(null)];

    steps.push({
      step: index + 1,
      reference: ref,
      cacheBefore,
      cacheAfter,
      status,
      details,
      explanation
    });
  });

  return calculateStats(steps, AlgorithmType.FIFO);
};

export const simulateLRU = (references: number[], size: number): SimulationResult => {
  const steps: SimulationStep[] = [];
  // For LRU visualization: Ordered list.
  // Left = Least Recently Used. Right = Most Recently Used.
  let lruList: number[] = [];

  references.forEach((ref, index) => {
    // Previous state
    const cacheBefore = [...lruList, ...Array(Math.max(0, size - lruList.length)).fill(null)];
    
    let status: 'HIT' | 'MISS' = 'MISS';
    let details = '';
    let explanation = '';

    if (lruList.includes(ref)) {
      status = 'HIT';
      // Move to end (MRU)
      lruList = lruList.filter(item => item !== ref);
      lruList.push(ref);
      explanation = `Hit. ${ref} moved to the Right (MRU position) to update recency.`;
    } else {
      status = 'MISS';
      if (lruList.length < size) {
        lruList.push(ref);
        explanation = `Miss. ${ref} inserted at the Right (MRU position).`;
      } else {
        const victim = lruList[0]; // Leftmost is LRU
        details = `Evicted ${victim}`;
        explanation = `Miss. Cache full. Evicted ${victim} (Leftmost/LRU block). Inserted ${ref} at Right/MRU.`;
        
        lruList.shift();
        lruList.push(ref);
      }
    }

    const cacheAfter = [...lruList, ...Array(Math.max(0, size - lruList.length)).fill(null)];

    steps.push({
      step: index + 1,
      reference: ref,
      cacheBefore,
      cacheAfter,
      status,
      details,
      explanation
    });
  });

  return calculateStats(steps, AlgorithmType.LRU);
};

export const simulateLFU = (references: number[], size: number, tieBreak: 'LRU' | 'FIFO' = 'LRU'): SimulationResult => {
  const steps: SimulationStep[] = [];
  // Physical cache slots
  const cache: (number | null)[] = Array(size).fill(null);
  
  const frequencyMap = new Map<number, number>();
  let lastAccessMap = new Map<number, number>(); 
  let arrivalMap = new Map<number, number>(); 

  // Helper to format cache for display: "Value (xCount)"
  const formatCache = (c: (number|null)[]) => {
    return c.map(val => val === null ? null : `${val} (x${frequencyMap.get(val) || 0})`);
  };

  references.forEach((ref, index) => {
    const cacheBefore = formatCache([...cache]);
    let status: 'HIT' | 'MISS' = 'MISS';
    let details = '';
    let explanation = '';

    if (cache.includes(ref)) {
      status = 'HIT';
      const oldFreq = frequencyMap.get(ref) || 0;
      frequencyMap.set(ref, oldFreq + 1);
      lastAccessMap.set(ref, index);
      explanation = `Hit. ${ref} frequency incremented from ${oldFreq} to ${oldFreq + 1}.`;
    } else {
      status = 'MISS';
      const newFreq = 1;

      if (cache.some(c => c === null)) {
        const emptyIndex = cache.indexOf(null);
        cache[emptyIndex] = ref;
        frequencyMap.set(ref, newFreq);
        lastAccessMap.set(ref, index);
        arrivalMap.set(ref, index);
        explanation = `Miss. Inserted ${ref} into empty slot. Frequency = 1.`;
      } else {
        let minFreq = Infinity;
        const currentCacheItems = cache.filter((c): c is number => c !== null);
        
        currentCacheItems.forEach(item => {
          const freq = frequencyMap.get(item) || 0;
          if (freq < minFreq) minFreq = freq;
        });

        const candidates = currentCacheItems.filter(item => (frequencyMap.get(item) || 0) === minFreq);

        let victim = candidates[0];
        let tieBreakReason = '';
        
        if (candidates.length > 1) {
            if (tieBreak === 'LRU') {
                tieBreakReason = '(Tie-break: LRU)';
                let oldestAccess = lastAccessMap.get(victim) || 0;
                for (let i = 1; i < candidates.length; i++) {
                    const c = candidates[i];
                    const access = lastAccessMap.get(c) || 0;
                    if (access < oldestAccess) {
                        victim = c;
                        oldestAccess = access;
                    }
                }
            } else {
                tieBreakReason = '(Tie-break: FIFO)';
                // FIFO Tie Break
                let oldestArrival = arrivalMap.get(victim) || 0;
                for (let i = 1; i < candidates.length; i++) {
                    const c = candidates[i];
                    const arrival = arrivalMap.get(c) || 0;
                    if (arrival < oldestArrival) {
                        victim = c;
                        oldestArrival = arrival;
                    }
                }
            }
        }

        const victimIndex = cache.indexOf(victim);
        cache[victimIndex] = ref;
        details = `Evicted ${victim} (freq: ${minFreq})`;
        explanation = `Miss. Evicted ${victim} (Min Freq: ${minFreq}). ${tieBreakReason} Replaced with ${ref}.`;

        frequencyMap.delete(victim);
        lastAccessMap.delete(victim);
        arrivalMap.delete(victim);
        
        frequencyMap.set(ref, newFreq);
        lastAccessMap.set(ref, index);
        arrivalMap.set(ref, index);
      }
    }

    steps.push({
      step: index + 1,
      reference: ref,
      cacheBefore,
      cacheAfter: formatCache([...cache]),
      status,
      details,
      explanation
    });
  });

  return calculateStats(steps, AlgorithmType.LFU);
};

export const simulateDirect = (references: number[], size: number): SimulationResult => {
  const steps: SimulationStep[] = [];
  const cache: (number | null)[] = Array(size).fill(null);

  references.forEach((ref, index) => {
    const cacheBefore = [...cache];
    let status: 'HIT' | 'MISS' = 'MISS';
    let details = '';
    let explanation = '';

    const targetIndex = ref % size;
    const currentBlock = cache[targetIndex];

    if (currentBlock === ref) {
      status = 'HIT';
      explanation = `Hit. Ref ${ref} maps to Index ${targetIndex} (${ref} mod ${size}). Block matches.`;
    } else {
      status = 'MISS';
      if (currentBlock !== null) {
        details = `Replaced ${currentBlock} at idx ${targetIndex}`;
        explanation = `Miss. Ref ${ref} maps to Index ${targetIndex} (${ref} mod ${size}). Conflict: Replaced ${currentBlock}.`;
      } else {
        explanation = `Miss. Ref ${ref} maps to Index ${targetIndex} (${ref} mod ${size}). Slot empty.`;
      }
      cache[targetIndex] = ref;
    }

    steps.push({
      step: index + 1,
      reference: ref,
      cacheBefore,
      cacheAfter: [...cache],
      status,
      details,
      explanation
    });
  });

  return calculateStats(steps, AlgorithmType.DIRECT);
};

export const simulateAssociative = (references: number[], size: number, policy: 'LRU' | 'FIFO' = 'LRU'): SimulationResult => {
  let result: SimulationResult;
  // Associative re-uses the visualization logic of FIFO/LRU to show the flexible placement nature
  if (policy === 'FIFO') {
      result = simulateFIFO(references, size);
      result.steps.forEach(step => {
        if (!step.explanation) return;
        step.explanation = step.explanation?.replace('queue', 'associative set (FIFO policy)');
      });
  } else {
      result = simulateLRU(references, size);
      result.steps.forEach(step => {
        if (!step.explanation) return;
        step.explanation = step.explanation?.replace('Leftmost/LRU block', 'LRU block').replace('MRU position', 'MRU position (Associative)');
      });
  }
  return { ...result, algorithmType: AlgorithmType.ASSOCIATIVE };
};
