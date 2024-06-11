import { findCheapestPaintCombination } from "../src/paintUtils";

type PaintVolume = {
  volume: number; // in units (10 units = 1 litre)
  price: number; // in £
};

export const duluxPrices: PaintVolume[] = [
  { volume: 100, price: 55 },
  { volume: 50, price: 29.5 },
  { volume: 25, price: 17.5 },
  { volume: 10, price: 9 },
];

export const goodHomePrices: PaintVolume[] = [
  { volume: 100, price: 30 },
  { volume: 50, price: 16 },
  { volume: 25, price: 10 },
  { volume: 10, price: 5 },
];

//

describe("findCheapestPaintCombination", () => {
  it("should return the correct price of the cheapest combination for the Dulux brand", () => {
    const [price, combo] = findCheapestPaintCombination(7, "dulux-blue");
    expect(price).toEqual(47);
    expect(combo).toEqual("2.5L, 5L");
  });

  it("should return the correct price of the cheapest combination for the GoodHome brand", () => {
    const [price, combo] = findCheapestPaintCombination(18, "goodhome-green");
    expect(price).toEqual(60);
    expect(combo).toEqual("2 * 10L");
  });

  it("should return the correct price of the cheapest combination for the Dulux brand for a fractional input", () => {
    const [price, combo] = findCheapestPaintCombination(12.3, "dulux-green");
    expect(price).toEqual(72.5);
    expect(combo).toEqual("2.5L, 10L");
  });
});
