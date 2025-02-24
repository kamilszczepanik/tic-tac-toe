import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { initializeBoard } from "../store/gameSlice";
import { Button } from "../components/ui/button";

export function Home() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rows: 3,
    cols: 3,
    requiredInRow: 3,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      initializeBoard({
        rows: formData.rows,
        cols: formData.cols,
        requiredInRow: formData.requiredInRow,
      })
    );
    navigate("/game");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newValue = parseInt(value) || 0;

    setFormData((prev) => {
      const updates = { ...prev, [name]: newValue };

      // If rows or columns are updated, adjust requiredInRow if needed
      if (name === "rows" || name === "cols") {
        const maxAllowed = Math.max(updates.rows, updates.cols);
        if (updates.requiredInRow > maxAllowed) {
          updates.requiredInRow = maxAllowed;
        }
      }

      // If requiredInRow is updated, ensure it doesn't exceed max allowed
      if (name === "requiredInRow") {
        const maxAllowed = Math.max(prev.rows, prev.cols);
        updates.requiredInRow = Math.max(newValue, maxAllowed);
      }

      return updates;
    });
  };

  const maxRequiredInRow = Math.max(formData.rows, formData.cols);

  return (
    <div className="flex flex-col gap-2 justify-center h-screen">
      <h1 className="text-2xl font-bold">Tic Tac Toe</h1>
      <p className="text-sm text-gray-600">Choose the size of the board</p>
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md space-y-4"
      >
        <div className="space-y-2">
          <label
            htmlFor="rows"
            className="block text-sm font-medium text-gray-700"
          >
            Rows:
          </label>
          <input
            type="number"
            id="rows"
            name="rows"
            min="3"
            max="10"
            value={formData.rows}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="cols"
            className="block text-sm font-medium text-gray-700"
          >
            Columns:
          </label>
          <input
            type="number"
            id="cols"
            name="cols"
            min="3"
            max="10"
            value={formData.cols}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="requiredInRow"
            className="block text-sm font-medium text-gray-700"
          >
            Required in Row: (max: {maxRequiredInRow})
          </label>
          <input
            type="number"
            id="requiredInRow"
            name="requiredInRow"
            min="3"
            max={maxRequiredInRow}
            value={formData.requiredInRow}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          />
        </div>

        <Button variant="default" type="submit" className="w-full">
          Start Game
        </Button>
      </form>
    </div>
  );
}
