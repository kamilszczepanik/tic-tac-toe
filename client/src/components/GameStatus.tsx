import { selectGameStatus } from "../store/gameSlice";
import { clearBoard } from "../store/gameSlice";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { Button } from "./ui/button";

export const GameStatus = () => {
  const gameStatus = useAppSelector(selectGameStatus);
  const dispatch = useAppDispatch();

  const handleCreateNewGame = () => {
    dispatch(clearBoard());
  };
  return (
    <div>
      <div className="flex flex-row gap-2 justify-between items-center">
        <h2 className="text-xl font-bold">Game Status: {gameStatus}</h2>
      </div>

      <Button onClick={handleCreateNewGame}>Create New Game</Button>
    </div>
  );
};
