import { useAppSelector } from "../store/hooks";
import { selectGameStatus } from "../store/gameSlice";
import { Navigate } from "react-router-dom";
import { GameStatus } from "../components/GameStatus";
import { GameBoard } from "../components/GameBoard";

export function Game() {
  const gameStatus = useAppSelector(selectGameStatus);

  console.log(gameStatus);
  if (gameStatus === "idle") {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex flex-row gap-2 justify-center h-screen">
      <GameStatus />
      <GameBoard />
    </div>
  );
}
