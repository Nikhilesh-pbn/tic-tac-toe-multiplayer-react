import "./index.css";

const GridBox = ({ value, onClick, borderColor, highlight }) => {
  return (
    <li className="list-container">
      <div
        className={`box ${highlight ? "highlight" : ""}`}
        style={{ border: `1px solid ${borderColor}` }}
        onClick={onClick}
      >
        <i
          className={value?.icon || ""}
          style={{ color: value?.color || "#fff" }}
        ></i>
      </div>
    </li>
  );
};

export default GridBox;
