import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import MultiPlayer from "../MultiPlayer";

const modeSelect = [
  { id: 2, name: "2-player" },
  { id: 3, name: "3-player" },
  { id: 4, name: "4-player" },
];

const MainMenu = () => {
  const [selectedId, setSelectedId] = useState(2);
  const navigate = useNavigate();

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  const handleGame = () => {
    const settings = {
      playerCount: selectedId,
      settings: false,
      grid: selectedId + 1,
    };

    localStorage.setItem("gameSettings", JSON.stringify(settings));
    navigate("/play");
  };

  return (
    <div className="menu-container">
      <div className="text-container">
        <h1 className="main-heading">Tic-Tac-Toe</h1>
        <h3>Survival Mode</h3>
        <ul className="button-grid">
          {modeSelect.map((each) => (
            <MultiPlayer
              key={each.id}
              isActive={selectedId === each.id}
              modeSelect={each}
              onClick={handleSelect}
            />
          ))}
        </ul>
        <div className="btn-container">
          <button type="button" className="st-btn" onClick={handleGame}>
            <i className="fa-solid fa-gamepad"></i>&nbsp;&nbsp; Start Game
          </button>
          <button type="Settings" className="sett-btn">
            <i className="fa-solid fa-gear"></i>&nbsp;&nbsp; Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainMenu;
