import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { checkWinner, everyCellFilled } from "../utils/helpers";

export interface Cell {
  value: "O" | "X" | null;
}

export interface GameState {
  board: Cell[][];
  gameStatus: "idle" | "in_progress" | "finished";
  boardSize: {
    rows: number;
    cols: number;
  };
  currentPlayer: "O" | "X";
  winner: "O" | "X" | null;
  requiredInRow: number;
  history: {
    states: {
      board: Cell[][];
      gameStatus: GameState["gameStatus"];
      currentPlayer: "O" | "X";
      winner: "O" | "X" | null;
    }[];
    currentIndex: number;
  };
  isReplaying: boolean;
}

const initialState: GameState = {
  board: [],
  gameStatus: "idle",
  boardSize: {
    rows: 3,
    cols: 3,
  },
  currentPlayer: "X",
  winner: null,
  requiredInRow: 3,
  history: {
    states: [],
    currentIndex: -1,
  },
  isReplaying: false,
};

type GameStateHistory = {
  board: Cell[][];
  gameStatus: GameState["gameStatus"];
  currentPlayer: "O" | "X";
  winner: "O" | "X" | null;
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    initializeBoard: (
      state,
      action: PayloadAction<{
        rows: number;
        cols: number;
        requiredInRow: number;
      }>
    ) => {
      const { rows, cols, requiredInRow } = action.payload;
      const newBoard = Array(rows)
        .fill(null)
        .map(() =>
          Array(cols)
            .fill(null)
            .map(() => ({
              value: null,
            }))
        );

      const initialGameState = {
        board: newBoard,
        gameStatus: "in_progress" as const,
        currentPlayer: "X" as const,
        winner: null,
      };

      state.board = newBoard;
      state.boardSize = { rows, cols };
      state.requiredInRow = requiredInRow;
      state.gameStatus = "in_progress";
      state.history = {
        states: [initialGameState],
        currentIndex: 0,
      };
    },

    setGameStatus: (state, action: PayloadAction<GameState["gameStatus"]>) => {
      state.gameStatus = action.payload;
    },

    clearBoard: (state) => {
      state.board = [];
      state.gameStatus = "idle";
      state.boardSize = { rows: 3, cols: 3 };
      state.history = {
        states: [],
        currentIndex: -1,
      };
    },

    play: (
      state,
      action: PayloadAction<{
        row: number;
        col: number;
      }>
    ) => {
      const { row, col } = action.payload;

      if (
        state.board[row][col].value === null &&
        state.gameStatus === "in_progress"
      ) {
        state.board[row][col].value = state.currentPlayer;

        const winner = checkWinner(state.board, state.requiredInRow);
        const newGameStatus =
          winner || everyCellFilled(state.board) ? "finished" : "in_progress";

        const newGameState: GameStateHistory = {
          board: JSON.parse(JSON.stringify(state.board)),
          gameStatus: newGameStatus as GameState["gameStatus"],
          currentPlayer: state.currentPlayer === "O" ? "X" : "O",
          winner: winner || null,
        };

        state.history.states = [
          ...state.history.states.slice(0, state.history.currentIndex + 1),
          newGameState,
        ];
        state.history.currentIndex++;

        state.gameStatus = newGameStatus;
        state.winner = winner || null;
        state.currentPlayer = newGameState.currentPlayer;
      }
    },

    undo: (state) => {
      if (state.history.currentIndex > 0) {
        state.history.currentIndex--;
        const previousState = state.history.states[state.history.currentIndex];

        state.board = JSON.parse(JSON.stringify(previousState.board));
        state.gameStatus = previousState.gameStatus;
        state.currentPlayer = previousState.currentPlayer;
        state.winner = previousState.winner;
      }
    },

    redo: (state) => {
      if (state.history.currentIndex < state.history.states.length - 1) {
        state.history.currentIndex++;
        const nextState = state.history.states[state.history.currentIndex];

        state.board = JSON.parse(JSON.stringify(nextState.board));
        state.gameStatus = nextState.gameStatus;
        state.currentPlayer = nextState.currentPlayer;
        state.winner = nextState.winner;
      }
    },

    startReplay: (state) => {
      state.isReplaying = true;
      state.board = Array(state.boardSize.rows)
        .fill(null)
        .map(() =>
          Array(state.boardSize.cols)
            .fill(null)
            .map(() => ({ value: null }))
        );
      state.currentPlayer = "X";
    },

    stopReplay: (state) => {
      state.isReplaying = false;
      const lastState = state.history.states[state.history.currentIndex];
      state.board = JSON.parse(JSON.stringify(lastState.board));
      state.currentPlayer = lastState.currentPlayer;
    },

    setReplayMove: (state, action: PayloadAction<GameStateHistory>) => {
      const nextState = action.payload;
      state.board = JSON.parse(JSON.stringify(nextState.board));
      state.currentPlayer = nextState.currentPlayer;
      state.gameStatus = nextState.gameStatus;
      state.winner = nextState.winner;
    },
  },
});

export const {
  initializeBoard,
  setGameStatus,
  clearBoard,
  play,
  undo,
  redo,
  startReplay,
  stopReplay,
  setReplayMove,
} = gameSlice.actions;

export default gameSlice.reducer;

export const selectBoard = (state: RootState) => state.game.board;
export const selectGameStatus = (state: RootState) => state.game.gameStatus;
export const selectBoardSize = (state: RootState) => state.game.boardSize;
export const selectCurrentPlayer = (state: RootState) =>
  state.game.currentPlayer;
export const selectWinner = (state: RootState) => state.game.winner;
export const selectCanUndo = (state: RootState) =>
  state.game.history.currentIndex > 0;
export const selectCanRedo = (state: RootState) =>
  state.game.history.currentIndex < state.game.history.states.length - 1;
export const selectIsReplaying = (state: RootState) => state.game.isReplaying;
export const selectHistory = (state: RootState) => state.game.history;
