
    class TicTacToe {
      constructor() {
        this.board = ["", "", "", "", "", "", "", "", ""];
        this.currentPlayer = "X";
        this.isGameActive = true;
        this.scores = { X: 0, O: 0 };
        this.winningCombos = [
          [0,1,2], [3,4,5], [6,7,8], // rows
          [0,3,6], [1,4,7], [2,5,8], // columns
          [0,4,8], [2,4,6]           // diagonals
        ];
        
        this.initializeElements();
        this.bindEvents();
        this.updateDisplay();
      }
      
      initializeElements() {
        this.cells = document.querySelectorAll(".cell");
        this.statusDisplay = document.getElementById("status");
        this.currentPlayerDisplay = document.getElementById("current-player");
        this.scoreXDisplay = document.getElementById("score-x");
        this.scoreODisplay = document.getElementById("score-o");
        this.resetBtn = document.getElementById("reset");
        this.newGameBtn = document.getElementById("new-game");
        this.winModal = document.getElementById("win-modal");
        this.winnerIcon = document.getElementById("winner-icon");
        this.winnerText = document.getElementById("winner-text");
        this.playAgainBtn = document.getElementById("play-again");
        this.fireworksContainer = document.getElementById("fireworks");
      }
      
      bindEvents() {
        this.cells.forEach(cell => {
          cell.addEventListener("click", (e) => this.handleCellClick(e));
        });
        
        this.resetBtn.addEventListener("click", () => this.resetGame());
        this.newGameBtn.addEventListener("click", () => this.newGame());
        this.playAgainBtn.addEventListener("click", () => this.playAgain());
        
        // Close modal on backdrop click
        this.winModal.addEventListener("click", (e) => {
          if (e.target === this.winModal) {
            this.closeModal();
          }
        });
      }
      
      handleCellClick(e) {
        const cell = e.currentTarget;
        const index = parseInt(cell.dataset.index);
        
        if (!this.isGameActive || this.board[index]) return;
        
        this.makeMove(cell, index);
      }
      
      makeMove(cell, index) {
        // Update board state
        this.board[index] = this.currentPlayer;
        
        // Update cell display with animation
        const cellContent = cell.querySelector('.cell-content');
        cellContent.textContent = this.currentPlayer;
        cell.classList.add('filled', this.currentPlayer.toLowerCase());
        
        // Add sound effect (if you want to add audio later)
        this.playMoveSound();
        
        // Check for win or tie
        const winner = this.checkWin();
        if (winner) {
          this.handleWin(winner);
        } else if (this.board.every(cell => cell)) {
          this.handleTie();
        } else {
          this.switchPlayer();
        }
      }
      
      checkWin() {
        for (let combo of this.winningCombos) {
          const [a, b, c] = combo;
          if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
            this.highlightWinningCells(combo, this.board[a]);
            return this.board[a];
          }
        }
        return null;
      }
      
      highlightWinningCells(combo, winner) {
        combo.forEach(index => {
          const cell = this.cells[index];
          cell.classList.add(`winning-${winner.toLowerCase()}`);
        });
      }
      
      handleWin(winner) {
        this.isGameActive = false;
        this.scores[winner]++;
        this.updateScoreDisplay(winner);
        
        setTimeout(() => {
          this.showWinModal(winner);
          this.createFireworks();
        }, 1000);
      }
      
      handleTie() {
        this.isGameActive = false;
        setTimeout(() => {
          this.showTieModal();
        }, 500);
      }
      
      switchPlayer() {
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
        this.updateDisplay();
        
        // Add player switch animation
        this.currentPlayerDisplay.classList.remove('player-x', 'player-o');
        this.currentPlayerDisplay.classList.add(`player-${this.currentPlayer.toLowerCase()}`);
      }
      
      updateDisplay() {
        this.currentPlayerDisplay.textContent = this.currentPlayer;
        this.currentPlayerDisplay.className = `current-player player-${this.currentPlayer.toLowerCase()}`;
      }
      
      updateScoreDisplay(winner) {
        const scoreElement = winner === 'X' ? this.scoreXDisplay : this.scoreODisplay;
        scoreElement.textContent = this.scores[winner];
        scoreElement.classList.add('animate-score');
        
        setTimeout(() => {
          scoreElement.classList.remove('animate-score');
        }, 800);
      }
      
      showWinModal(winner) {
        this.winnerIcon.className = `winner-icon ${winner.toLowerCase()}`;
        this.winnerText.textContent = `Player ${winner} Wins!`;
        this.winModal.classList.add('show');
      }
      
      showTieModal() {
        this.winnerIcon.className = 'winner-icon tie';
        this.winnerText.textContent = "It's a Tie!";
        this.winModal.classList.add('show');
      }
      
      closeModal() {
        this.winModal.classList.remove('show');
        this.clearFireworks();
      }
      
      createFireworks() {
        const colors = ['#00d4ff', '#ff006e', '#39ff14', '#bf00ff', '#ff4500'];
        
        for (let i = 0; i < 15; i++) {
          setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'firework';
            firework.style.left = Math.random() * 100 + '%';
            firework.style.top = Math.random() * 100 + '%';
            firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            firework.style.boxShadow = `0 0 20px ${firework.style.backgroundColor}`;
            
            this.fireworksContainer.appendChild(firework);
            
            setTimeout(() => {
              firework.remove();
            }, 2000);
          }, i * 200);
        }
      }
      
      clearFireworks() {
        this.fireworksContainer.innerHTML = '';
      }
      
      resetGame() {
        this.board = ["", "", "", "", "", "", "", "", ""];
        this.currentPlayer = "X";
        this.isGameActive = true;
        
        this.cells.forEach(cell => {
          const cellContent = cell.querySelector('.cell-content');
          cellContent.textContent = "";
          cell.className = "cell";
        });
        
        this.updateDisplay();
        this.closeModal();
      }
      
      newGame() {
        this.resetGame();
        this.scores = { X: 0, O: 0 };
        this.scoreXDisplay.textContent = "0";
        this.scoreODisplay.textContent = "0";
      }
      
      playAgain() {
        this.resetGame();
      }
      
      playMoveSound() {
        // Placeholder for sound effect
        // You can add audio files and play them here
        // const audio = new Audio('move-sound.mp3');
        // audio.play();
      }
    }
    
    // Initialize the game when the DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
      new TicTacToe();
    });
    
    // Add keyboard support
    document.addEventListener('keydown', (e) => {
      if (e.key >= '1' && e.key <= '9') {
        const index = parseInt(e.key) - 1;
        const cell = document.querySelector(`[data-index="${index}"]`);
        if (cell) {
          cell.click();
        }
      }
    });
  
