export class Rationale {
  public readonly p: number;
  public readonly q: number;

  constructor(p: number, q: number) {
    this.p = p;
    this.q = q;
  }

  get float() {
    return this.p / this.q;
  }

  intermediate(r: Rationale) {
    if (this.float >= r.float) {
      throw new Error('Provided value must be greater than current value.');
    }

    let pl = 0;
    let ql = 1;
    let ph = 1;
    let qh = 0;
    let p, q;

    if (this.p * r.q + 1 != r.p * this.q) {
      while (true) {
        p = pl + ph;
        q = ql + qh;

        if (p * this.q <= q * this.p) {
          pl = p;
          ql = q;
        } else if (r.p * q <= r.q * p) {
          ph = p;
          qh = q;
        } else {
          break;
        }
      }
    } else {
      p = this.p + r.p;
      q = this.q + r.q;
    }

    return new Rationale(p, q);
  }
}
