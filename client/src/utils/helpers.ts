import { Cell } from "../store/gameSlice";

const checkLine = (line: Cell[]): "O" | "X" | null => {
  const firstValue = line[0]?.value;
  if (!firstValue) return null;

  return line.every((cell) => cell.value === firstValue) ? firstValue : null;
};

export const checkWinner = (
  board: Cell[][],
  requiredInRow: number
): "O" | "X" | null => {
  const rows = board.length;
  const cols = board[0].length;

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j <= cols - requiredInRow; j++) {
      const line = board[i].slice(j, j + requiredInRow);
      const winner = checkLine(line);
      if (winner) return winner;
    }
  }

  for (let i = 0; i <= rows - requiredInRow; i++) {
    for (let j = 0; j < cols; j++) {
      const line = Array.from(
        { length: requiredInRow },
        (_, k) => board[i + k][j]
      );
      const winner = checkLine(line);
      if (winner) return winner;
    }
  }

  for (let i = 0; i <= rows - requiredInRow; i++) {
    for (let j = 0; j <= cols - requiredInRow; j++) {
      const line = Array.from(
        { length: requiredInRow },
        (_, k) => board[i + k][j + k]
      );
      const winner = checkLine(line);
      if (winner) return winner;
    }
  }

  for (let i = 0; i <= rows - requiredInRow; i++) {
    for (let j = requiredInRow - 1; j < cols; j++) {
      const line = Array.from(
        { length: requiredInRow },
        (_, k) => board[i + k][j - k]
      );
      const winner = checkLine(line);
      if (winner) return winner;
    }
  }

  return null;
};

export const everyCellFilled = (board: Cell[][]): boolean => {
  return board.every((row) => row.every((cell) => cell.value !== null));
};
