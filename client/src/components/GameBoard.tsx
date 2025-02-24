import { useAppSelector } from "../store/hooks";
import { selectBoard, selectBoardSize } from "../store/gameSlice";

export const GameBoard = () => {
  const board = useAppSelector(selectBoard);
  const boardSize = useAppSelector(selectBoardSize);

  return (
    <div>
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: `repeat(${boardSize.cols}, minmax(0, 1fr))`,
        }}
      >
        {board.map((row, rowIndex) =>
          row.map((cell, colIndex) => (
            <button
              key={`${rowIndex}-${colIndex}`}
              className="aspect-square bg-gray-100 rounded-md hover:bg-gray-200 flex items-center justify-center text-2xl font-bold"
            >
              {cell.value}
            </button>
          ))
        )}
      </div>
    </div>
  );
};
