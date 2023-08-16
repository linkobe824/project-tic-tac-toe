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
        if(board[row][col].getVal() !== 0){
            console.log("not valid");
            return
        }
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

    let roundsPlayed = 0

    const winningCondition = (row, col) => {
        roundsPlayed++
        const rows = 3;
        const board = gameBoard.getBoard();
        const mark =  getActivePlayer().mark;
        
        //horizontal 
        for(let i = 0; i < rows; i++){
            if(board[row][i].getVal() !== mark){
                break
            }
            if (i === rows-1){
                return "win";
            }
        }

        //vertical
        for(let i = 0; i < rows; i++){
            if(board[i][col].getVal() !== mark){
                break;
            }
            if (i === rows-1) {
                return "win";
            }
        }

        //Diagonal situation
        if(board[1][1].getVal() === mark){
            //diagonal
            for(let i = 0; i < rows; i++){
                if(board[i][i].getVal() !== mark){
                    break
                }
                if(i === rows-1){
                    return "win";
                }
            }

            // anti-diagonal
            for(let i = 0; i < rows; i++){
                if(board[i][rows-1-i].getVal() !== mark){
                    break
                }
                if(i === rows-1){
                    return "win";
                }
            }
        }
        //if no one won by the last round time 
        if (roundsPlayed === rows**2){
            return "draw";
        }
    }


    const playRound = (row, col) => {
        console.log(`${getActivePlayer().name} marking on (${row},${col})...`);
        gameBoard.putMark(row, col, getActivePlayer().mark);
        if(winningCondition(row, col)){
            gameBoard.printBoard()
            const value = winningCondition(row,col)
            if(value === "win"){
                console.log(`${getActivePlayer().name} wins!!`)
            }else{
                console.log("Draw");
            }
            
        }else{
            switchPlayerTurn();
            printNewRound();
        }
    }
    
    printNewRound()

    return {
        playRound,
        getActivePlayer
    };
})()
//diagonal 1
// gameController.playRound(0,0)
// gameController.playRound(0,1)
// gameController.playRound(1,1)
// gameController.playRound(1,2)
// gameController.playRound(2,2)

//horizontal 2
// gameController.playRound(0,0)
// gameController.playRound(1,0)
// gameController.playRound(0,1)
// gameController.playRound(1,1)
// gameController.playRound(2,0)
// gameController.playRound(1,2)

//anti diagonal 1
// gameController.playRound(0,2)
// gameController.playRound(1,2)
// gameController.playRound(1,1)
// gameController.playRound(1,0)
// gameController.playRound(2,0)

//vertical 2
// gameController.playRound(0,0)
// gameController.playRound(1,1)
// gameController.playRound(1,0)
// gameController.playRound(2,1)
// gameController.playRound(0,2)
// gameController.playRound(0,1)

//draw
// gameController.playRound(0,0)
// gameController.playRound(1,1)
// gameController.playRound(0,2)
// gameController.playRound(0,1)
// gameController.playRound(2,1)
// gameController.playRound(1,0)
// gameController.playRound(1,2)
// gameController.playRound(2,2)
// gameController.playRound(2,0)

