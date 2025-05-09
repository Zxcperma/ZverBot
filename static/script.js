let tg = window.Telegram.WebApp;
tg.expand();

document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    const resetButton = document.getElementById("resetGame");
    const themeButton = document.getElementById("toggleTheme");
    const gameStatus = document.querySelector("h1"); // Заголовок для отображения хода
    let currentPlayer = "X";
    let board = Array(9).fill(null);

    function updateStatus() {
        gameStatus.textContent = `${currentPlayer} - ваш ход`;
    }

    function checkWinner() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        
        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                setTimeout(() => alert(`${board[a]} победил!`), 100);
                return true;
            }
        }

        // Проверка на ничью (если все клетки заняты)
        if (!board.includes(null)) {
            setTimeout(() => alert("Ничья!"), 100);
            return true;
        }

        return false;
    }

    function handleClick(event) {
        const index = event.target.dataset.index;
        if (!board[index]) {
            board[index] = currentPlayer;
            event.target.textContent = currentPlayer;
            event.target.classList.add("taken");
            if (checkWinner()) return;
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            updateStatus();
        }
    }

    function resetGame() {
        board.fill(null);
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("taken");
        });
        currentPlayer = "X";
        updateStatus();
    }

    function toggleTheme() {
        document.body.classList.toggle("dark-theme");
        localStorage.setItem("theme", document.body.classList.contains("dark-theme") ? "dark" : "light");
    }

    // Загрузка темы при старте
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-theme");
    }

    updateStatus(); // Установить начальный статус
    cells.forEach(cell => cell.addEventListener("click", handleClick));
    resetButton.addEventListener("click", resetGame);
    themeButton.addEventListener("click", toggleTheme);
});
