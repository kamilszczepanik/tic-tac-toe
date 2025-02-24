import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  selectBoard,
  selectBoardSize,
  selectCurrentPlayer,
  play,
} from "../store/gameSlice";
import { Button } from "./ui/button";

export const GameBoard = () => {
  const dispatch = useAppDispatch();
  const board = useAppSelector(selectBoard);
  const boardSize = useAppSelector(selectBoardSize);
  const currentPlayer = useAppSelector(selectCurrentPlayer);

  const handleCellClick = (row: number, col: number) => {
    dispatch(play({ row, col }));
  };

  return (
    <div>
      <div className="text-xl font-bold mb-4">
        Current Player: {currentPlayer}
      </div>
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${boardSize.cols}, minmax(0, 1fr))`,
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <Button
              variant={"outline"}
              key={`${rowIndex}-${colIndex}`}
              className="w-16 h-16 text-2xl font-bold"
              onClick={() => handleCellClick(rowIndex, colIndex)}
              disabled={cell.value !== null}
            >
              {cell.value}
            </Button>
          ))
        )}
      </div>
    </div>
  );
};
