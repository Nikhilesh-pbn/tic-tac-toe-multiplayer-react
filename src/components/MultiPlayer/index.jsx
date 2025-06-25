import { useState } from "react";
import clickSound from "../../assets/sounds/click.mp3";
import "./index.css";

const MultiPlayer = (props) => {
  const { modeSelect, onClick, isActive } = props;
  const { id, name } = modeSelect;
  const color = isActive ? "isActive" : "";

  const changeColor = () => {
    const audio = new Audio(clickSound);
    audio.play();
    onClick(id);
  };

  return (
    <li>
      <button
        type="button"
        onClick={changeColor}
        className={`player-button ${color}`}
      >
        <i className="fa-solid fa-users"></i>&nbsp;&nbsp;
        {name}
      </button>
    </li>
  );
};
export default MultiPlayer;
