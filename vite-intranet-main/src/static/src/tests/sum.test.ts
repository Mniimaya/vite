import { sum } from "./sum";

describe("sums test", () => {
  test("equal", () => {
    expect(sum(1, 2)).toBe(3);
  });

  test("not equal", () => {
    expect(sum(1, 2)).not.toBe(5);
  });
});
