interface OutputEntryProps {
  brandColour: string;
  quantity: number;
  price: number;
  combo: string;
}

export const OutputEntry: React.FC<OutputEntryProps> = ({
  brandColour,
  quantity,
  price,
  combo,
}) => {
  return (
    <tr>
      <td>{/^dulux/.test(brandColour) ? "Dulux" : "GoodHome"}</td>
      <td className="uppercase">{brandColour.match(/(?<=-)[\w-]+/i)}</td>
      <td>{quantity.toFixed(1)}L</td>
      <td>{combo}</td>
      <td>£{price.toFixed(2)}</td>
    </tr>
  );
};
