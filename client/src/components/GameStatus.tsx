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
    <div className="text-center mb-4">
      {gameStatus === "won" ? (
        <div className="text-2xl font-bold text-green-600">
          Player {winner} wins!
        </div>
      ) : (
        <div className="text-xl font-bold">Current Player: {currentPlayer}</div>
      )}
      <Button variant={"secondary"} onClick={handleCreateNewGame}>
        Create New Game
      </Button>
    </div>
  );
};
