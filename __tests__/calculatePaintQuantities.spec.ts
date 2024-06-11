import { calculatePaintQuantities } from "../src/paintUtils";
import Wall from "../src/Wall";

describe("calculatePaintQuantities", () => {
  it("should correctly calculate paint quantities for each brand and colour, waste included and 2 coats", () => {
    const walls = [
      new Wall("10", "2", "white", "dulux", "0"),
      new Wall("5", "3", "white", "goodhome", "0"),
      new Wall("12", "2.4", "white", "dulux", "0"),
      new Wall("8", "2", "green", "goodhome", "0"),
    ];

    const result = calculatePaintQuantities(walls, 2, true);

    expect(result.get("dulux-white")).toBe(10.25);
    expect(result.get("goodhome-white")).toBe(3.15);
    expect(result.get("goodhome-green")).toBe(3.36);
  });

  it("should handle no walls", () => {
    const walls: Wall[] = [];
    const result = calculatePaintQuantities(walls, 2, true);
    expect(result.size).toBe(0);
  });

  it("should handle a single wall", () => {
    const walls = [new Wall("10", "2", "white", "dulux", "0")];
    const result = calculatePaintQuantities(walls, 2, true);
    expect(result.get("dulux-white")).toBe(4.2);
  });

  it("should handle multiple walls of the same brand and colour", () => {
    const walls = [
      new Wall("10", "2", "white", "dulux", "0"),
      new Wall("5", "3", "white", "dulux", "0"),
    ];
    const result = calculatePaintQuantities(walls, 2, true);
    expect(result.get("dulux-white")).toBe(7.35);
  });

  it("should handle multiple walls of different brands and colours", () => {
    const walls = [
      new Wall("10", "2", "white", "dulux", "0"),
      new Wall("5", "3", "white", "goodhome", "0"),
    ];
    const result = calculatePaintQuantities(walls, 2, true);
    expect(result.get("dulux-white")).toBe(4.2);
    expect(result.get("goodhome-white")).toBe(3.15);
  });

  it("should handle different number of coats", () => {
    const walls = [new Wall("10", "2", "white", "dulux", "0")];
    let result = calculatePaintQuantities(walls, 1, true);
    expect(result.get("dulux-white")).toBe(2.1);

    result = calculatePaintQuantities(walls, 3, true);
    expect(result.get("dulux-white")).toBe(6.3);
  });

  it("should handle inclusion and exclusion of waste", () => {
    const walls = [new Wall("10", "2", "white", "dulux", "0")];
    let result = calculatePaintQuantities(walls, 2, true);
    expect(result.get("dulux-white")).toBe(4.2);

    result = calculatePaintQuantities(walls, 2, false);
    expect(result.get("dulux-white")).toBe(4.0);
  });

  it("should handle walls with excluded areas", () => {
    const walls = [new Wall("10", "2", "white", "dulux", "4")];
    const result = calculatePaintQuantities(walls, 2, true);
    expect(result.get("dulux-white")).toBe(3.36);
  });
});
