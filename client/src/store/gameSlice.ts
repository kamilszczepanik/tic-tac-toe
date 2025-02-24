import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface Cell {
  value: "cercle" | "cross" | null;
}

export interface GameState {
  board: Cell[][];
  gameStatus: "idle" | "playing" | "won" | "lost";
  boardSize: {
    rows: number;
    cols: number;
  };
}

const initialState: GameState = {
  board: [],
  gameStatus: "idle",
  boardSize: {
    rows: 3,
    cols: 3,
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
      }>
    ) => {
      const { rows, cols } = action.payload;
      state.board = Array(rows)
        .fill(null)
        .map(() =>
          Array(cols)
            .fill(null)
            .map(() => ({
              value: null,
              isRevealed: false,
              isFlagged: false,
            }))
        );
      state.boardSize = { rows, cols };
      state.gameStatus = "playing";
    },

    setGameStatus: (state, action: PayloadAction<GameState["gameStatus"]>) => {
      state.gameStatus = action.payload;
    },

    clearBoard: (state) => {
      state.board = [];
      state.gameStatus = "idle";
      state.boardSize = { rows: 3, cols: 3 };
    },
  },
});

export const { initializeBoard, setGameStatus, clearBoard } = gameSlice.actions;

export default gameSlice.reducer;

export const selectBoard = (state: RootState) => state.game.board;
export const selectGameStatus = (state: RootState) => state.game.gameStatus;
export const selectBoardSize = (state: RootState) => state.game.boardSize;
