import { WallInfo } from "./WallInfo";
import { useState } from "react";
import Wall from "./Wall";
import "./styles.css";
import { Output } from "./Output";

export const App = () => {
  const [walls, setWalls] = useState<Wall[]>([new Wall()]);
  const [includeWaste, setIncludeWaste] = useState<boolean>(false);
  const [coats, setCoats] = useState<number>(2);

  const deleteWall = (i: number): void => {
    setWalls(prev => {
      const newWalls = prev.filter((_, index) => index !== i);
      return newWalls;
    });
  };

  const addWall = (): void => {
    setWalls(prev => [...prev, new Wall()]);
  };

  const updateWall = (index: number, updatedWall: Wall): void => {
    setWalls(prev => {
      const newWalls = [...prev];
      newWalls[index] = updatedWall;
      return newWalls;
    });
  };

  const handleWasteChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setIncludeWaste(e.target.checked);
  };

  const handleCoatsChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCoats(parseInt(e.target.value));
  };

  return (
    <>
      <div className="main">
        <div className="inputs">
          <div className="wall-container">
            <h1>What are the wall dimensions you want to cover?</h1>
            <div className="walls">
              {walls.map((wall, i) => (
                <WallInfo
                  key={wall.id}
                  index={i}
                  deleteWall={deleteWall}
                  walls={walls}
                  updateWall={updateWall}
                />
              ))}
            </div>
            <button className="add" onClick={addWall}>
              Add another wall
            </button>
          </div>
          <div className="coats-container">
            <h1>How many coats of paint do you want to apply to the area?</h1>
            <div className="subcontainer">
              <fieldset className="coats-field">
                <div className="selection">
                  <input
                    type="radio"
                    name="coats"
                    id="1"
                    value="1"
                    checked={coats === 1}
                    onChange={handleCoatsChange}
                  />
                  <label htmlFor="1">1 coat</label>
                </div>
                <div className="selection">
                  <input
                    type="radio"
                    name="coats"
                    id="2"
                    value="2"
                    checked={coats === 2}
                    onChange={handleCoatsChange}
                  />
                  <label htmlFor="2">2 coats</label>
                </div>
                <div className="selection">
                  <input
                    type="radio"
                    name="coats"
                    id="3"
                    value="3"
                    checked={coats === 3}
                    onChange={handleCoatsChange}
                  />
                  <label htmlFor="3">3 coats</label>
                </div>
                <div className="selection">
                  <input
                    type="radio"
                    name="coats"
                    id="4"
                    value="4"
                    checked={coats === 4}
                    onChange={handleCoatsChange}
                  />
                  <label htmlFor="4">4 coats</label>
                </div>
              </fieldset>
              <div className="waste-box">
                <div className="cb-group">
                  <input
                    type="checkbox"
                    name="includewaste"
                    id="includewaste"
                    checked={includeWaste}
                    onChange={handleWasteChange}
                  />
                  <label htmlFor="includewaste">Include 5% wastage?</label>
                </div>
                <p>It is recommended to purchase 5% extra paint to account for mistakes</p>
              </div>
            </div>
          </div>
        </div>
        <Output walls={walls} coats={coats} includeWaste={includeWaste} />
      </div>
    </>
  );
};
