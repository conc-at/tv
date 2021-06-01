// Generics
// 1. Make this set implementation type safe, but allow any possible type.
// Don't use `any` to achieve this. The user should be able to provide the type,
// either through inference or directly but can expect the same type coming back
// from any of the following functions (except `map`, because it does not make sense).
//
// Example:
//
// const MySet = new BetterSet([1, 2, 3]);
// // returns a set of numbers
// MySet.difference(…)
//

class BetterSet<T> extends Set<T> {
  difference(b: BetterSet<T>) {
    return new BetterSet<T>([...this].filter((a) => !b.has(a)));
  }

  intersection(b: BetterSet<T>) {
    return new BetterSet<T>([...this].filter((a) => b.has(a)));
  }

  union(b: BetterSet<T>) {
    return new BetterSet<T>([...this, ...b]);
  }

  map(cb: (item: T) => any) {
    for (const a of this) {
      cb(a);
    }
  }
}