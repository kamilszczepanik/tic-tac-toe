import { useState } from "react";
import { useAppDispatch } from "./store/hooks";
import { initializeBoard } from "./store/gameSlice";
import { Button } from "./components/ui/button";

function App() {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    rows: 3,
    cols: 3,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      initializeBoard({
        rows: formData.rows,
        cols: formData.cols,
      })
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseInt(value) || 0,
    }));
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-md p-6 space-y-4"
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
            className=""
          />
        </div>

        <Button variant={"default"} type="submit" className="">
          Start Game
        </Button>
      </form>
    </div>
  );
}

export default App;
