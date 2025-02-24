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
      state.board = Array(rows)
        .fill(null)
        .map(() =>
          Array(cols)
            .fill(null)
            .map(() => ({
              value: null,
            }))
        );
      state.boardSize = { rows, cols };
      state.requiredInRow = requiredInRow;
      state.gameStatus = "in_progress";
    },

    setGameStatus: (state, action: PayloadAction<GameState["gameStatus"]>) => {
      state.gameStatus = action.payload;
    },

    clearBoard: (state) => {
      state.board = [];
      state.gameStatus = "idle";
      state.boardSize = { rows: 3, cols: 3 };
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

        const winner = checkWinner(state.board);
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
  },
});

export const { initializeBoard, setGameStatus, clearBoard, play } =
  gameSlice.actions;

export default gameSlice.reducer;

export const selectBoard = (state: RootState) => state.game.board;
export const selectGameStatus = (state: RootState) => state.game.gameStatus;
export const selectBoardSize = (state: RootState) => state.game.boardSize;
export const selectCurrentPlayer = (state: RootState) =>
  state.game.currentPlayer;
export const selectWinner = (state: RootState) => state.game.winner;
