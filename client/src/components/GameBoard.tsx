import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  selectBoard,
  selectBoardSize,
  selectGameStatus,
  play,
  selectIsReplaying,
} from "../store/gameSlice";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export const GameBoard = () => {
  const dispatch = useAppDispatch();
  const board = useAppSelector(selectBoard);
  const boardSize = useAppSelector(selectBoardSize);
  const gameStatus = useAppSelector(selectGameStatus);
  const isReplaying = useAppSelector(selectIsReplaying);
  const [lastMove, setLastMove] = useState<{ row: number; col: number } | null>(
    null
  );

  const handleCellClick = (row: number, col: number) => {
    if (isReplaying) return;
    dispatch(play({ row, col }));
    setLastMove({ row, col });
  };

  useEffect(() => {
    if (lastMove) {
      const timer = setTimeout(() => {
        setLastMove(null);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [lastMove]);

  return (
    <div className="flex justify-center">
      <div
        className="grid gap-2 p-6 bg-white rounded-lg shadow-md"
        style={{
          gridTemplateColumns: `repeat(${boardSize.cols}, minmax(0, 1fr))`,
          width: `min(100%, ${boardSize.cols * 80}px)`,
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Button
              variant="outline"
              key={`${rowIndex}-${colIndex}`}
              className={`aspect-square w-full text-2xl font-bold ${
                lastMove?.row === rowIndex && lastMove?.col === colIndex
                  ? "cell-move"
                  : ""
              }`}
              onClick={() => handleCellClick(rowIndex, colIndex)}
              disabled={
                cell.value !== null || gameStatus === "finished" || isReplaying
              }
            >
              {cell.value}
            </Button>
          ))
        )}
      </div>
    </div>
  );
};
