const Gameboard = (() => {
  let gameBoard = ['', '', '', '', '', '', '', '', ''];

  const placeField = (index, mark) => {
    gameBoard[index] = mark;
  };

  const getField = index => {
    return gameBoard[index];
  };

  const resetBoard = () => {
    for (let i = 0; i < gameBoard.length; i++) {
      gameBoard[i] = '';
    }
  };

  return { placeField, getField, resetBoard, gameBoard };
})();

// Player Object
const Player = mark => {
  this.mark;

  const getMark = () => {
    return mark;
  };

  return { getMark };
};

// Controls entire game
const gameController = (() => {
  const board = Gameboard.gameBoard;
  let playersTurn = 'X';
  let playerX = [];
  let playerO = [];

  const switchTurns = () => {
    if (playersTurn === 'X') {
      playersTurn = 'O';
    } else {
      playersTurn = 'X';
    }
  };

  const startGame = index => {
    Gameboard.placeField(index, playersTurn);
    switchTurns();
  };

  const checkWin = () => {
    const winCombo = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < board.length; i++) {
      if (board[i] === 'X') {
        playerX.push(i);
      }
    }

    for (let i = 0; i < board.length; i++) {
      if (board[i] === 'O') {
        playerO.push(i);
      }
    }

    for (let i = 0; i < winCombo.length; i++) {
      if (winCombo[i].every(item => playerX.includes(item))) {
        return 'X wins!';
      } else if (winCombo[i].every(item => playerO.includes(item))) {
        return 'O wins!';
      } else if (board.indexOf('') < 0) {
        return 'Draw!';
      }
    }
  };

  const reset = () => {
    playersTurn = 'X';
    playerX = [];
    playerO = [];
  };

  return { startGame, checkWin, reset };
})();

// displays marks
const displayController = (() => {
  const cells = document.querySelectorAll('.cells');
  const resultMessage = document.getElementById('result-message');
  const reset = document.getElementById('reset');

  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', e => {
      const target = e.target;
      const cellIndex = parseInt(target.getAttribute('data-cell'));

      if (!target.innerHTML && !gameController.checkWin()) {
        gameController.startGame(cellIndex);
        target.innerHTML = `<p>${Gameboard.getField(cellIndex)}</p>`;
        if (resultMessage.textContent === "X's Turn") {
          resultMessage.textContent = "O's Turn";
        } else {
          resultMessage.textContent = "X's Turn";
        }
        if (gameController.checkWin()) {
          resultMessage.textContent = `${gameController.checkWin()}`;
        }
      }
    });
  }

  reset.addEventListener('click', e => {
    resultMessage.textContent = "X's Turn";
    gameController.reset();
    Gameboard.resetBoard();

    for (let i = 0; i < cells.length; i++) {
      cells[i].textContent = '';
    }
  });
})();
