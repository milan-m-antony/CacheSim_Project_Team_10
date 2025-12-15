from collections import OrderedDict

class AssociativeCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = OrderedDict()
        self.hits = 0
        self.misses = 0

    def access(self, block):
        if block in self.cache:
            self.hits += 1
            self.cache.move_to_end(block)
            print(f"Reference: {block} | HIT  | Cache: {list(self.cache.keys())}")
        else:
            self.misses += 1
            if len(self.cache) == self.capacity:
                self.cache.popitem(last=False)
            self.cache[block] = True
            print(f"Reference: {block} | MISS | Cache: {list(self.cache.keys())}")

    def stats(self):
        total = self.hits + self.misses
        print("\nTotal Hits:", self.hits)
        print("Total Misses:", self.misses)
        print("Hit Ratio:", self.hits / total)

# Example
assoc = AssociativeCache(3)
refs = [10, 20, 30, 10, 40, 50]
for r in refs:
    assoc.access(r)
assoc.stats()
