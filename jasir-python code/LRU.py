from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = OrderedDict()
        self.hits = 0
        self.misses = 0

    def access(self, item):
        if item in self.cache:
            self.hits += 1
            self.cache.move_to_end(item)
            print(f"Reference: {item} | HIT  | Cache: {list(self.cache.keys())}")
        else:
            self.misses += 1
            if len(self.cache) == self.capacity:
                self.cache.popitem(last=False)
            self.cache[item] = True
            print(f"Reference: {item} | MISS | Cache: {list(self.cache.keys())}")

    def stats(self):
        total = self.hits + self.misses
        print("\nTotal Hits:", self.hits)
        print("Total Misses:", self.misses)
        print("Hit Ratio:", self.hits / total)

# Example
lru = LRUCache(3)
refs = [1, 2, 3, 1, 4, 5]
for r in refs:
    lru.access(r)
lru.stats()
