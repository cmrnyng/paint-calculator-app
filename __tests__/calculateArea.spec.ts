import Wall from "../src/Wall";

describe("calculateArea", () => {
  it("calculates the area correctly without exclusions and without waste", () => {
    const wall = new Wall("10", "2", "white", "dulux", "0");
    expect(wall.calculateArea(false, 2)).toBe(40);
  });

  it("calculates the area correctly with exclusions and without waste", () => {
    const wall = new Wall("10", "2", "white", "dulux", "2");
    expect(wall.calculateArea(false, 2)).toBe(36);
  });

  it("calculates the area correctly with waste", () => {
    const wall = new Wall("10", "2", "white", "dulux", "0");
    expect(wall.calculateArea(true, 2)).toBe(42);
  });

  it("calculates the area correctly with exclusions and waste", () => {
    const wall = new Wall("10", "2", "white", "dulux", "2");
    expect(wall.calculateArea(true, 2)).toBe(37.8);
  });

  it("calculates the area correctly with no coats", () => {
    const wall = new Wall("10", "2", "white", "dulux", "0");
    expect(wall.calculateArea(false, 0)).toBe(0);
  });

  it("calculates the area correctly when the excluded area is larger than the wall area", () => {
    const wall = new Wall("5", "4", "white", "dulux", "30");
    expect(wall.calculateArea(false, 2)).toBe(-20);
  });

  it("rounds the calculated area to one decimal place", () => {
    const wall = new Wall("10.016", "2.567", "white", "dulux", "0");
    expect(wall.calculateArea(false, 2)).toBe(51.4);
  });
});
