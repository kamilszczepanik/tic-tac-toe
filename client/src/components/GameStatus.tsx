import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  selectGameStatus,
  selectWinner,
  selectCurrentPlayer,
  selectCanUndo,
  selectCanRedo,
  clearBoard,
  undo,
  redo,
} from "../store/gameSlice";
import { Button } from "./ui/button";

export const GameStatus = () => {
  const dispatch = useAppDispatch();
  const gameStatus = useAppSelector(selectGameStatus);
  const winner = useAppSelector(selectWinner);
  const currentPlayer = useAppSelector(selectCurrentPlayer);
  const canUndo = useAppSelector(selectCanUndo);
  const canRedo = useAppSelector(selectCanRedo);

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-white rounded-lg shadow-md">
      <p>Game {gameStatus}</p>
      {gameStatus === "finished" && winner ? (
        <p className="text-lg font-bold text-green-600">
          Player {winner} wins!
        </p>
      ) : gameStatus === "finished" && !winner ? (
        <p className="text-lg font-bold">It's a draw!</p>
      ) : (
        <p className="text-lg font-bold">Current Player: {currentPlayer}</p>
      )}
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => dispatch(undo())}
          disabled={!canUndo}
          className="w-24"
        >
          Undo
        </Button>
        <Button
          variant="outline"
          onClick={() => dispatch(redo())}
          disabled={!canRedo}
          className="w-24"
        >
          Redo
        </Button>
      </div>
      <Button
        variant="outline"
        onClick={() => dispatch(clearBoard())}
        className="w-48"
      >
        Create New Game
      </Button>
    </div>
  );
};
