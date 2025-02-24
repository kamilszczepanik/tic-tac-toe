import { Cell } from "../store/gameSlice";

const checkLine = (line: Cell[]): "O" | "X" | null => {
  const firstValue = line[0]?.value;
  if (!firstValue) return null;

  return line.every((cell) => cell.value === firstValue) ? firstValue : null;
};

export const checkWinner = (board: Cell[][]): "O" | "X" | null => {
  for (let i = 0; i < 3; i++) {
    const row = board[i];
    const rowWinner = checkLine([row[0], row[1], row[2]]);
    if (rowWinner) return rowWinner;
  }

  for (let j = 0; j < 3; j++) {
    const column = [board[0][j], board[1][j], board[2][j]];
    const columnWinner = checkLine(column);
    if (columnWinner) return columnWinner;
  }

  const diagonal1 = [board[0][0], board[1][1], board[2][2]];
  const diagonal1Winner = checkLine(diagonal1);
  if (diagonal1Winner) return diagonal1Winner;

  // Check diagonal from top-right to bottom-left
  const diagonal2 = [board[2][0], board[1][1], board[0][2]];
  const diagonal2Winner = checkLine(diagonal2);
  if (diagonal2Winner) return diagonal2Winner;

  return null;
};

export const everyCellFilled = (board: Cell[][]): boolean => {
  return board.every((row) => row.every((cell) => cell.value !== null));
};
