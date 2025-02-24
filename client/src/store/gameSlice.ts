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
    boards: Cell[][][];
    currentIndex: number;
  };
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
    boards: [],
    currentIndex: -1,
  },
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
      state.board = newBoard;
      state.boardSize = { rows, cols };
      state.requiredInRow = requiredInRow;
      state.gameStatus = "in_progress";
      state.history = {
        boards: [JSON.parse(JSON.stringify(newBoard))],
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
        boards: [],
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

        state.history.boards = [
          ...state.history.boards.slice(0, state.history.currentIndex + 1),
          JSON.parse(JSON.stringify(state.board)),
        ];
        state.history.currentIndex++;

        const winner = checkWinner(state.board, state.requiredInRow);
        if (winner) {
          state.winner = winner;
          state.gameStatus = "finished";
          return;
        } else if (!winner && everyCellFilled(state.board)) {
          state.gameStatus = "finished";
          return;
        }

        state.currentPlayer = state.currentPlayer === "O" ? "X" : "O";
      }
    },

    undo: (state) => {
      if (state.history.currentIndex > 0) {
        state.history.currentIndex--;
        state.board = JSON.parse(
          JSON.stringify(state.history.boards[state.history.currentIndex])
        );
        state.currentPlayer = state.currentPlayer === "O" ? "X" : "O";
        state.gameStatus = "in_progress";
        state.winner = null;
      }
    },

    redo: (state) => {
      if (state.history.currentIndex < state.history.boards.length - 1) {
        state.history.currentIndex++;
        state.board = JSON.parse(
          JSON.stringify(state.history.boards[state.history.currentIndex])
        );
        state.currentPlayer = state.currentPlayer === "O" ? "X" : "O";
      }
    },
  },
});

export const { initializeBoard, setGameStatus, clearBoard, play, undo, redo } =
  gameSlice.actions;

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
  state.game.history.currentIndex < state.game.history.boards.length - 1;
