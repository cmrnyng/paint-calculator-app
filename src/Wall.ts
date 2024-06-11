import { v4 as uuidv4 } from "uuid";

export default class Wall {
  id: string;
  width: string;
  height: string;
  colour: string;
  brand: string;
  excludedArea: string;

  constructor(
    width: string = "",
    height: string = "",
    colour: string = "white",
    brand: string = "dulux",
    excludedArea: string = "",
    id?: string
  ) {
    this.id = id || uuidv4();
    this.width = width;
    this.height = height;
    this.colour = colour;
    this.brand = brand;
    this.excludedArea = excludedArea;
  }

  calculateArea(includeWaste: boolean, coats: number = 1): number {
    return (
      Math.round(
        ((Number(this.width) * Number(this.height) - Number(this.excludedArea)) *
          coats *
          (includeWaste ? 1.05 : 1) +
          Number.EPSILON) *
          10
      ) / 10
    );
  }
}
