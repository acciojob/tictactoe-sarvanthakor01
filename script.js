//your JS code here. If required.

document.getElementById("submit").addEventListener("click", function() {
            const player1 = document.getElementById("player-1").value;
            const player2 = document.getElementById("player-2").value;
            
            if (!player1 || !player2) {
                alert("Please enter both player names");
                return;
            }
            
            document.getElementById("playerForm").classList.add("hidden");
            document.getElementById("game").classList.remove("hidden");
            startGame(player1, player2);
        });
        
        function startGame(player1, player2) {
            let currentPlayer = player1;
            let symbol = "X";
            document.querySelector(".message").textContent = `${currentPlayer}, you're up!`;
            
            const board = document.getElementById("board");
            board.innerHTML = "";
            
            let cells = [];
            for (let i = 1; i <= 9; i++) {
                let cell = document.createElement("div");
                cell.classList.add("cell");
                cell.setAttribute("id", i);
                cell.addEventListener("click", function() {
                    if (!cell.textContent) {
                        cell.textContent = symbol;
                        if (checkWinner()) {
                            document.querySelector(".message").textContent = `${currentPlayer}, congratulations you won!`;
                            disableBoard();
                        } else {
                            currentPlayer = currentPlayer === player1 ? player2 : player1;
                            symbol = symbol === "X" ? "O" : "X";
                            document.querySelector(".message").textContent = `${currentPlayer}, you're up!`;
                        }
                    }
                });
                board.appendChild(cell);
                cells.push(cell);
            }
        }
        
        function checkWinner() {
            const winPatterns = [
                [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
                [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
                [0, 4, 8], [2, 4, 6] // Diagonals
            ];
            
            const cells = document.querySelectorAll(".cell");
            for (let pattern of winPatterns) {
                const [a, b, c] = pattern;
                if (cells[a].textContent && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
                    return true;
                }
            }
            return false;
        }
        
        function disableBoard() {
            document.querySelectorAll(".cell").forEach(cell => cell.style.pointerEvents = "none");
        }
