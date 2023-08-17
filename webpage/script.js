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
            let cell = Cell()
            //add indices for reference
            cell.addIndeces(i,j);
            board[i].push(cell)         
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
    let i = 0;
    let j = 0;
    // player puede ser X o O, es el {mark} del player
    const addMark = player => {
        value = player;
    };

    const getVal = () => value;
    
    const addIndeces= (index_i, index_j) => {
        i = index_i;
        j = index_j;
    }

    const getIndeces = () => [i, j];

    return {
        addMark,
        getVal,
        addIndeces,
        getIndeces
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
                // make the board not clickable
                document.querySelector('.board').style.pointerEvents = "none";
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
        getActivePlayer,
    };
})();

const screenController = (() => {
    const board = gameBoard;
    const game = gameController;
    //get the board div
    const boardDiv = document.querySelector(".board");

    const updateScreen = () => {
        const playerTitle = document.querySelector('.turn');
        //clear the div
        boardDiv.textContent = "";
        playerTitle.textContent = gameController.getActivePlayer().name;


        //add cells as buttons in the boardDiv
        board.getBoard().forEach( row => {
            row.forEach(cell => {
                const cellButton = document.createElement("button");
                cellButton.classList.add("cell");
                cellButton.dataset.row = cell.getIndeces()[0];
                cellButton.dataset.col = cell.getIndeces()[1];

                cellButton.textContent = cell.getVal()

                boardDiv.appendChild(cellButton)
            })
        })   
    }

    //play the game
    boardDiv.addEventListener('click', e => {
        game.playRound(e.target.dataset.row, e.target.dataset.col);
        updateScreen();
    })

    updateScreen()
})()

