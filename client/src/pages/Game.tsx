import { useAppSelector } from "../store/hooks";
import { selectGameStatus } from "../store/gameSlice";
import { Navigate } from "react-router-dom";
import { GameStatus } from "../components/GameStatus";
import { GameBoard } from "../components/GameBoard";

export function Game() {
  const gameStatus = useAppSelector(selectGameStatus);

  if (gameStatus === "idle") {
    return <Navigate to="/" />;
  }

  return (
    <div className=" items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-2xl space-y-8">
        <GameStatus />
        <GameBoard />
      </div>
    </div>
  );
}
