import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  selectBoard,
  selectBoardSize,
  selectGameStatus,
  play,
} from "../store/gameSlice";
import { Button } from "./ui/button";

export const GameBoard = () => {
  const dispatch = useAppDispatch();
  const board = useAppSelector(selectBoard);
  const boardSize = useAppSelector(selectBoardSize);
  const gameStatus = useAppSelector(selectGameStatus);

  const handleCellClick = (row: number, col: number) => {
    dispatch(play({ row, col }));
  };

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
              className="aspect-square w-full text-2xl font-bold"
              onClick={() => handleCellClick(rowIndex, colIndex)}
              disabled={cell.value !== null || gameStatus === "finished"}
            >
              {cell.value}
            </Button>
          ))
        )}
      </div>
    </div>
  );
};
