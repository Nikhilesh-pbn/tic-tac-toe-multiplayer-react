import { useState, useEffect } from "react";
import GridBox from "../GridBox";
import "./index.css";

const Grid = ({ gridDimension, players }) => {
  const [board, setBoard] = useState(
    Array.from({ length: gridDimension }, () => Array(gridDimension).fill(null))
  );
  const [active, setActive] = useState(0);
  const [feature, setFeature] = useState({});
  const [highlightCell, setHighlightCell] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const isOutOfIndex = (row, col) => {
    return row >= 0 && col >= 0 && row < gridDimension && col < gridDimension;
  };

  const checkWin = (newBoard, row, col) => {
    const directions = [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, -1],
    ];
    const currentPlayer = newBoard[row][col].id;

    for (const [dr, dc] of directions) {
      let count = 1;

      let r = row + dr,
        c = col + dc;
      while (
        isOutOfIndex(r, c) &&
        newBoard[r][c] !== null &&
        newBoard[r][c].id === currentPlayer
      ) {
        count += 1;
        r += dr;
        c += dc;
      }

      r = row - dr;
      c = col - dc;
      while (
        isOutOfIndex(r, c) &&
        newBoard[r][c] !== null &&
        newBoard[r][c].id === currentPlayer
      ) {
        count += 1;
        r -= dr;
        c -= dc;
      }

      if (count >= 3) {
        alert(`${currentPlayer} has won!`);
        return true;
      }
    }
    return false;
  };

  useEffect(() => {
    const playerMoves = feature[active] || [];
    if (playerMoves.length === 3) {
      setHighlightCell(playerMoves[0]);
    } else {
      setHighlightCell(null);
    }
  }, [feature, active]);

  const handleCell = (row, col) => {
    if (gameOver || board[row][col] !== null) return;

    const newBoard = board.map((r) => [...r]);
    const newFeature = { ...feature };
    const moves = [...(newFeature[active] || []), [row, col]];

    if (moves.length > 3) {
      const [oldRow, oldCol] = moves.shift();
      newBoard[oldRow][oldCol] = null;
    }

    newBoard[row][col] = players[active];
    setBoard(newBoard);
    setFeature({ ...newFeature, [active]: moves });
    setHighlightCell(null);

    setTimeout(() => {
      if (checkWin(newBoard, row, col)) {
        setGameOver(true);
      }
    }, 100);

    setActive((prev) => (prev + 1) % players.length);
  };

  const handleReset = () => {
    setBoard(
      Array.from({ length: gridDimension }, () =>
        Array(gridDimension).fill(null)
      )
    );
    setFeature({});
    setActive(0);
    setHighlightCell(null);
    setGameOver(false);
  };

  return (
    <div className="grid-container">
      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${gridDimension}, 1fr)`,
          gridTemplateRows: `repeat(${gridDimension}, 1fr)`,
        }}
      >
        {board.map((rowArr, rowIdx) =>
          rowArr.map((cellValue, colIdx) => (
            <GridBox
              key={`${rowIdx},${colIdx}`}
              value={cellValue}
              onClick={() => handleCell(rowIdx, colIdx)}
              borderColor={players[active].color}
              highlight={
                highlightCell &&
                highlightCell[0] === rowIdx &&
                highlightCell[1] === colIdx
              }
            />
          ))
        )}
      </div>

      <button onClick={handleReset} className="reset-btn">
        Reset Game
      </button>
    </div>
  );
};

export default Grid;
