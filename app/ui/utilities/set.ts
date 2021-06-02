export class BetterSet<T> extends Set<T> {
  difference(b: BetterSet<T>) {
    return new BetterSet([...this].filter((a) => !b.has(a)));
  }

  intersection(b: BetterSet<T>) {
    return new BetterSet([...this].filter((a) => b.has(a)));
  }

  union(b: BetterSet<T>) {
    return new BetterSet([...this, ...b]);
  }

  map<R>(cb: (a: T) => R) {
    for (const a of this) {
      cb(a);
    }
  }
}
