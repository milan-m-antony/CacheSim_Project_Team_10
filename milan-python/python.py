from collections import deque

class FIFOCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = deque()
        self.hits = 0
        self.misses = 0

    def access(self, item):
        if item in self.cache:
            self.hits += 1
            print(f"Reference: {item} | HIT  | Cache: {list(self.cache)}")
        else:
            self.misses += 1
            if len(self.cache) == self.capacity:
                self.cache.popleft()
            self.cache.append(item)
            print(f"Reference: {item} | MISS | Cache: {list(self.cache)}")

    def stats(self):
        total = self.hits + self.misses
        print("\nTotal Hits:", self.hits)
        print("Total Misses:", self.misses)
        print("Hit Ratio:", self.hits / total)


fifo = FIFOCache(3)
refs = [1, 2, 3, 1, 4, 5]
for r in refs:
    fifo.access(r)
fifo.stats()
