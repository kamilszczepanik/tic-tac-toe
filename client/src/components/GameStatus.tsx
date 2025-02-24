import { useAppDispatch, useAppSelector } from "../store/hooks";
import {
  selectGameStatus,
  selectWinner,
  selectCurrentPlayer,
  selectIsReplaying,
  selectHistory,
  selectCanUndo,
  selectCanRedo,
  clearBoard,
  undo,
  redo,
  startReplay,
  stopReplay,
  setReplayMove,
} from "../store/gameSlice";
import { Button } from "./ui/button";
import { useEffect, useRef } from "react";

export const GameStatus = () => {
  const dispatch = useAppDispatch();
  const gameStatus = useAppSelector(selectGameStatus);
  const winner = useAppSelector(selectWinner);
  const currentPlayer = useAppSelector(selectCurrentPlayer);
  const isReplaying = useAppSelector(selectIsReplaying);
  const history = useAppSelector(selectHistory);
  const canUndo = useAppSelector(selectCanUndo);
  const canRedo = useAppSelector(selectCanRedo);
  const replayTimeoutRef = useRef<number | null>(null);

  const handleReplayClick = () => {
    dispatch(startReplay());
    let moveIndex = 0;

    const playNextMove = () => {
      if (moveIndex < history.states.length) {
        const nextState = history.states[moveIndex];
        dispatch(setReplayMove(nextState));
        moveIndex++;
        replayTimeoutRef.current = window.setTimeout(playNextMove, 300);
      } else {
        dispatch(stopReplay());
      }
    };

    replayTimeoutRef.current = window.setTimeout(playNextMove, 300);
  };

  useEffect(() => {
    return () => {
      if (replayTimeoutRef.current) {
        window.clearTimeout(replayTimeoutRef.current);
      }
    };
  }, []);

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
          disabled={!canUndo || isReplaying}
          className="w-24"
        >
          Undo
        </Button>
        <Button
          variant="outline"
          onClick={() => dispatch(redo())}
          disabled={!canRedo || isReplaying}
          className="w-24"
        >
          Redo
        </Button>
      </div>
      {(gameStatus === "finished" || isReplaying) && (
        <Button
          variant="outline"
          onClick={handleReplayClick}
          className="w-48"
          disabled={isReplaying}
        >
          Show game replay
        </Button>
      )}
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
