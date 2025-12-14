
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
