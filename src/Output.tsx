import Wall from "./Wall";
import { findCheapestPaintCombination, duluxPrices, goodHomePrices } from "./paintUtils";
import { OutputEntry } from "./OutputEntry";

interface OutputProps {
  walls: Wall[];
  coats: number;
  includeWaste: boolean;
}

export const Output: React.FC<OutputProps> = ({ walls, coats, includeWaste }) => {
  const paintQuantities = new Map();

  for (const wall of walls) {
    const key = `${wall.brand}-${wall.colour}`;
    paintQuantities.set(
      key,
      (paintQuantities.has(key) ? paintQuantities.get(key) : 0) +
        Math.round(wall.calculateArea(includeWaste, coats) * 10) / 100
    );
  }
  console.log(paintQuantities);

  const quantitiesArr = Array.from(paintQuantities.entries());

  return (
    <div className="outputs">
      <h2>Result</h2>
      <table>
        <thead>
          <tr>
            <th>Brand</th>
            <th>Colour</th>
            <th>Volume</th>
            <th>Cheapest Combination</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {quantitiesArr.map(([brandColour, quantity], i) => {
            const [price, combo] = findCheapestPaintCombination(quantity, brandColour);
            return (
              <OutputEntry
                key={i}
                brandColour={brandColour}
                quantity={quantity}
                price={price}
                combo={combo}
              />
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <th className="total" colSpan={4}>
              Total:
            </th>
            <td>
              £
              {quantitiesArr
                .reduce((totalPrice, [brandColour, quantity]) => {
                  const [price, _combo] = findCheapestPaintCombination(quantity, brandColour);
                  return totalPrice + price;
                }, 0)
                .toFixed(2)}
            </td>
          </tr>
        </tfoot>
      </table>
      <hr />
      <h2>Prices</h2>
      <div className="pricing-tables">
        <div className="table-group">
          <p className="table-title">Dulux</p>
          <table>
            <thead>
              <tr>
                <th>Volume</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {duluxPrices.map(({ volume, price }, i) => (
                <tr key={i}>
                  <td>{volume / 10}L</td>
                  <td>£{price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-group">
          <p className="table-title">GoodHome</p>
          <table>
            <thead>
              <tr>
                <th>Volume</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {goodHomePrices.map(({ volume, price }, i) => (
                <tr key={i}>
                  <td>{volume / 10}L</td>
                  <td>£{price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="note">
        *Calculated for paint with a coverage of <span>10m²/L</span>
      </p>
    </div>
  );
};
