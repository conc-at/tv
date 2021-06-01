// Read-Only properties
// 1. A developer has messed up some code by re-assigning a wrong value to the year.
// Make sure that TypeScript prevents such accidents in the future.

class BetterDate {
  day: number;
  month: number;
  readonly year: number;

  constructor(day: number, month: number, year: number) {
    this.day = day;
    this.month = month;
    this.year = year;
  }
}

class NowDate extends BetterDate {
  public thisYear() {
    // this should not be allowed
  }
}

const now = new NowDate(25, 5, 2020);
now.thisYear();
