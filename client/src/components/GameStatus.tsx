import { useAppDispatch } from "../store/hooks";
import { useAppSelector } from "../store/hooks";
import {
  selectGameStatus,
  selectWinner,
  selectCurrentPlayer,
  clearBoard,
} from "../store/gameSlice";
import { Button } from "./ui/button";

export const GameStatus = () => {
  const dispatch = useAppDispatch();
  const gameStatus = useAppSelector(selectGameStatus);
  const winner = useAppSelector(selectWinner);
  const currentPlayer = useAppSelector(selectCurrentPlayer);

  const handleCreateNewGame = () => {
    dispatch(clearBoard());
  };

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
      <Button
        variant="secondary"
        onClick={handleCreateNewGame}
        className="w-48"
      >
        Create New Game
      </Button>
    </div>
  );
};
