import { useState } from "react";
import Wall from "./Wall";
import deleteIcon from "./assets/deleteicon.svg";
import "./wallInfo.css";

interface WallInfoProps {
  index: number;
  deleteWall: (index: number) => void;
  walls: Wall[];
  updateWall: (index: number, updatedWall: Wall) => void;
}

const colorMap: { [key: string]: string } = {
  white: "#F7F7F0",
  beige: "#F5F5DC",
  cream: "#FFFDD0",
  brown: "#B48F62",
  grey: "#808080",
  green: "#93C572",
  orange: "#E07C4F",
  purple: "#805B87",
  pink: "#FFC0CB",
  red: "#BB4B4B",
  yellow: "#FBEC5D",
};

export const WallInfo: React.FC<WallInfoProps> = ({ index, deleteWall, walls, updateWall }) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const wall = walls[index];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    type: "width" | "height" | "colour" | "brand" | "exclusion"
  ): void => {
    e.preventDefault();
    const { value } = e.target;
    if (type === "colour" || type === "brand" || value === "" || /^\d*\.?\d*$/.test(value)) {
      const updatedWall: Wall = new Wall(
        type === "width" ? value : wall.width,
        type === "height" ? value : wall.height,
        type === "colour" ? value : wall.colour,
        type === "brand" ? value : wall.brand,
        type === "exclusion" ? value : wall.excludedArea,
        wall.id
      );

      const area: number = updatedWall.calculateArea(false);

      if (area < 0) {
        setErrorMessage("Please ensure the excluded area is less than the area of your wall");
      } else {
        setErrorMessage("");
        updateWall(index, updatedWall);
      }
    }
  };

  const backgroundColor = colorMap[wall.colour];

  return (
    <div className="wall" style={{ backgroundColor }}>
      <p className="wall-label">Wall {index + 1}</p>
      <div className="wall-upper">
        <div className="input-container">
          <label htmlFor="height">Height (m)</label>
          <input
            type="text"
            name="height"
            id="height"
            className="wall-inputs"
            value={wall.width}
            onChange={e => handleChange(e, "width")}
          />
        </div>
        <div className="input-container">
          <label htmlFor="width">Width (m)</label>
          <input
            type="text"
            name="width"
            id="width"
            className="wall-inputs"
            value={wall.height}
            onChange={e => handleChange(e, "height")}
          />
        </div>
        <div className="input-container">
          <label htmlFor="brand">Brand</label>
          <select
            name="brand"
            id="brand"
            value={wall.brand}
            onChange={e => handleChange(e, "brand")}
          >
            <option value="dulux">Dulux</option>
            <option value="goodhome">GoodHome</option>
          </select>
        </div>
        <div className="input-container">
          <label htmlFor="colour">Colour</label>
          <select
            name="colour"
            id="colour"
            value={wall.colour}
            onChange={e => handleChange(e, "colour")}
          >
            <option value="white">White</option>
            <option value="beige">Beige</option>
            <option value="cream">Cream</option>
            <option value="brown">Brown</option>
            <option value="grey">Grey</option>
            <option value="green">Green</option>
            <option value="orange">Orange</option>
            <option value="purple">Purple</option>
            <option value="pink">Pink</option>
            <option value="red">Red</option>
            <option value="yellow">Yellow</option>
          </select>
        </div>
      </div>
      {walls.length > 1 && (
        <button className="delete" onClick={() => deleteWall(index)}>
          <img src={deleteIcon} className="icon" />
        </button>
      )}
      <div className="wall-lower">
        <label htmlFor="exclusion">Exclusions (m²)</label>
        <input
          type="text"
          name="exclusion"
          id="exclusion"
          className="wall-inputs"
          value={wall.excludedArea}
          onChange={e => handleChange(e, "exclusion")}
        />
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
};
