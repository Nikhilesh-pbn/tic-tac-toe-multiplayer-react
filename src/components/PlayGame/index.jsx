import { useNavigate } from "react-router-dom";
import Grid from "../Grid";
import "./index.css";
import { symbol } from "framer-motion/client";

const symbols = [
  { id: 0, icon: "fa-solid fa-x", color: "#257039" },
  { id: 1, icon: "fa-solid fa-o", color: "#a82831" },
  { id: 2, icon: "fa-regular fa-square", color: "#240bb5" },
  { id: 3, icon: "fa-regular fa-star", color: "#b5a10b" },
];

const PlayGame = () => {
  const navigate = useNavigate();

  const gameSettings = JSON.parse(localStorage.getItem("gameSettings"));
  if (!gameSettings) {
    navigate("/");
    return null;
  }

  const { playerCount, grid } = gameSettings;

  const handleBack = () => {
    localStorage.removeItem("gameSettings");
    navigate("/");
  };

  return (
    <div className="game-container">
      <div className="grid-containers">
        {/* <div className="info-container">
          <button onClick={handleBack}>Back</button>
          <p>Current player:{symbols[0].id}</p>
          <h1>timer:{10}s</h1>
        </div> */}
        <Grid gridDimension={grid} players={symbols.slice(0, playerCount)} />/
      </div>
    </div>
  );
};

export default PlayGame;
