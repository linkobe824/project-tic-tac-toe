//logica del tablero
const gameBoard = (() => {
    //crear tablero
    const rows = 3;
    const columns = 3;
    const board = [];

    //retornar el tablero
    const getBoard = () => board;

    for(let i = 0; i < rows; i++){
        board[i] = [];
        for(let j = 0; j < columns; j++){
            board[i].push(Cell())
        }
    }
    //poner marca en tablero
    const putMark = (row, col, player) => {
        if (board[row][col] === 0) return
        board[row][col].addMark(player)
    }
    //mostrar tablero
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getVal()));
        console.log(boardWithCellValues);
    }
    return {
        getBoard, putMark, printBoard
    }
})();

//comportamiento de cada celda
function Cell() {
    let value = 0;

    // player puede ser X o O, es el {mark} del player
    const addMark = player => {
        value = player;
    };

    const getVal = () => value;

    return {
        addMark,
        getVal
    };
}

//logica del juego
const gameController = ((playerOneName = "Player One", playerTwoName = "Player Two") => {
    // jugadores
    const players = [
        {
            name: playerOneName,
            mark: "X"
        },
        {
            name: playerTwoName,
            mark: "O"
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;
    // jugar un turno
    // mostrar tablero actualizado
    const printNewRound = () => {
        gameBoard.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`)
    }

    const playRound = (row, col) => {
        console.log(`${getActivePlayer().name} marking on (${row},${col})...`);
        gameBoard.putMark(row, col, getActivePlayer().mark);

        switchPlayerTurn();
        printNewRound();
    }
    
    printNewRound()

    return {
        playRound,
        getActivePlayer
    };
})()

