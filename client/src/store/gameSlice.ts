import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface GameState {
  gameId?: string;
}

const initialState: GameState = {
  gameId: "new id",
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameId(state, action: PayloadAction<string | undefined>) {
      state.gameId = action.payload;
    },
  },
});

export const { setGameId } = gameSlice.actions;
export default gameSlice.reducer;

export const selectGameId = (state: RootState) => state.game.gameId;
