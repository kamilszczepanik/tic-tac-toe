Tic-tac-toe Assessment
Time Limit: 2-3 hours
Task Description
Create a Tic-tac-toe game using React and TypeScript with undo/redo functionality. The
game should allow two players to play alternately and keep track of game history.
Core Requirements

1. Game Board Implementation
   • Create a 3x3 grid game board
   • Players take turns placing X and O
   • Clearly display whose turn it is (X or O)
   • Show game status (in progress, winner, or draw)
   • Highlight the winning line when a player wins
2. Game History Features
   • Implement Undo button to revert to the previous move
   • Implement Redo button to replay undone moves
   • Disable Redo button when` a new move is made after an undo
   • Maintain move history throughout the game
3. Technical Requirements
   • Use React with TypeScript
   • Use Redux Toolkit for state management
   • Implement proper TypeScript types/interfaces
   • Follow React best practices for component structure
   • Style your components (you may use Tailwind CSS)
   Required Features
4. Game Rules
   – X always goes first
   – Players alternate turns
   – A winner is declared when 3 marks are in a row (horizontal, vertical, or
   diagonal)
   – Game ends in a draw when all cells are filled with no winner
5. User Interface
   – Display game board with clear X and O markers
   – Show current player’s turn
   – Display game status (in progress/winner/draw)
   – Include Undo/Redo buttons
   – Add New Game button to reset the board
6. State Management
   – Track game board state
   – Maintain move history
   – Handle undo/redo state
   – Manage game status
   Bonus Features (Optional)
   • Add move animations
   • Add game replay functionality
   • Make board size configurable
