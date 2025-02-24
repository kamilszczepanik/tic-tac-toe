import { useAppSelector } from "../store/hooks";
import { selectGameStatus } from "../store/gameSlice";
import { useNavigate } from "react-router-dom";
import { GameStatus } from "../components/GameStatus";
import { GameBoard } from "../components/GameBoard";

export function Game() {
  const navigate = useNavigate();
  const gameStatus = useAppSelector(selectGameStatus);

  if (gameStatus === "idle") {
    navigate("/");
  }

  return (
    <div className="space-y-4">
      <GameStatus />
      <GameBoard />
    </div>
  );
}
