import Wall from "./Wall";

type PaintVolume = {
  volume: number; // in units (10 units = 1 litre)
  price: number; // in £
};

// Paint volumes (scaled by 10) and their prices
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

// Calculate paint quantities for each brand and colour
export const calculatePaintQuantities = (
  walls: Wall[],
  coats: number,
  includeWaste: boolean
): Map<string, number> => {
  const paintQuantities = new Map();

  for (const wall of walls) {
    const key = `${wall.brand}-${wall.colour}`;
    paintQuantities.set(
      key,
      (paintQuantities.has(key) ? paintQuantities.get(key) : 0) +
        Math.round(wall.calculateArea(includeWaste, coats) * 10) / 100
    );
  }

  return paintQuantities;
};

// Calculate price & paint quantity combinations
export const findCheapestPaintCombination = (
  requiredLitres: number,
  brand: string
): [number, string] => {
  // Convert required litres to integer units
  const requiredUnits = Math.round(requiredLitres * 10); // Scale by 10 and round to handle floating point precision

  // Create an array to store the minimum cost for each volume of paint
  const priceArr: number[] = Array(requiredUnits + 1).fill(Infinity);
  priceArr[0] = 0;

  // Combination table to hold combination of paints
  const combo: number[][] = Array(requiredUnits + 1).fill([]);

  const paintVolumes = /^dulux/.test(brand) ? duluxPrices : goodHomePrices;

  for (let i = 1; i <= requiredUnits; i++) {
    for (const paint of paintVolumes) {
      if (i < paint.volume) {
        const cost = paint.price;
        if (cost < priceArr[i]) {
          priceArr[i] = cost;
          combo[i] = [paint.volume];
        }
      } else {
        const cost = priceArr[i - paint.volume] + paint.price;
        if (cost < priceArr[i]) {
          priceArr[i] = cost;
          combo[i] = [...combo[i - paint.volume], paint.volume];
        }
      }
    }
  }

  const combinationString = [
    ...new Map(
      combo[requiredUnits]
        .reduce((acc, curr) => {
          const count = acc.get(curr) || 0;
          acc.set(curr, count + 1);
          return acc;
        }, new Map<number, number>())
        .entries()
    ),
  ].reduce((acc, [volume, count], index) => {
    const volumeInLitres = volume / 10;
    const prefix = index === 0 ? "" : ", ";
    return `${acc}${prefix}${count > 1 ? `${count} * ` : ""}${volumeInLitres}L`;
  }, "");

  return [priceArr[requiredUnits], combinationString];
};
