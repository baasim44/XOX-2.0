const board = document.getElementById('board');
const statusText = document.getElementById('status');

let currentPlayer = 'X';
let cells = Array(9).fill(null);
let gameActive = true;

// Draw the board
function createBoard() {
  board.innerHTML = '';
  cells.forEach((value, index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = index;
    cell.innerText = value ? value : '';
    cell.addEventListener('click', handleMove);
    board.appendChild(cell);
  });
}

// Handle player move
function handleMove(e) {
  const index = e.target.dataset.index;
  if (!gameActive || cells[index]) return;

  cells[index] = currentPlayer;
  e.target.innerText = currentPlayer;

  if (checkWinner()) {
    statusText.innerText = `Player ${currentPlayer} wins!`;
    gameActive = false;
  } else if (cells.every(cell => cell)) {
    statusText.innerText = "It's a draw!";
    gameActive = false;
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.innerText = `Player ${currentPlayer}'s turn`;
  }
}

// Check for win
function checkWinner() {
  const winCombos = [
    [0,1,2],[3,4,5],[6,7,8], // rows
    [0,3,6],[1,4,7],[2,5,8], // cols
    [0,4,8],[2,4,6]          // diagonals
  ];

  return winCombos.some(combo => {
    const [a, b, c] = combo;
    return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
  });
}

// Restart game
function restartGame() {
  cells = Array(9).fill(null);
  currentPlayer = 'X';
  gameActive = true;
  statusText.innerText = `Player ${currentPlayer}'s turn`;
  createBoard();
}

createBoard();
