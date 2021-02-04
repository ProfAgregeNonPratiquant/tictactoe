


let gameSettings = {
    'playerOne': 'human',
    'playerTwo': 'human',
    'shapeForPlayerOne': 'x',
    'shapeForPlayerTwo': 'o',
    'difficulty': null
} 

function newTicTacToeGame() {
    clearMain()
    clearGameSettings()
    console.log(gameSettings)
    setGameSettings()   
}

function newBigTacToeGame() {
    clearMain()
    clearGameSettings()
    let workinProgress = document.createElement('h3')
    workinProgress.style.textAlign = 'center'
    workinProgress.textContent = 'Work in progress...'
    main.appendChild(workinProgress)
}

function clearGameSettings() {
    gameSettings = {
        'playerOne': 'human',
        'playerTwo': 'human',
        'shapeForPlayerOne': 'x',
        'shapeForPlayerTwo': 'o',
        'difficulty': null
    }  
}

function setGameSettings() {
    let onePlayerButton = document.createElement('button')
    onePlayerButton.textContent = 'One player'
    onePlayerButton.onclick = onOnePlayer

    let twoPlayersButton = document.createElement('button')
    twoPlayersButton.textContent = 'Two players'
    twoPlayersButton.onclick = play

    main.appendChild(onePlayerButton)
    main.appendChild(twoPlayersButton)
}

function onOnePlayer() {
    gameSettings.playerTwo = 'computer'
    clearMain()
    chooseShape()
}

function chooseShape() {
    let cross = document.createElement('button')
    cross.textContent = 'Cross'
    cross.onclick = () => {
        clearMain()
        chooseDifficulty()
    }

    let circle = document.createElement('button')
    circle.textContent = 'Circle'
    circle.onclick = () => {
        gameSettings.shapeForPlayerOne = 'o'
        gameSettings.shapeForPlayerTwo = 'x'
        clearMain()
        chooseDifficulty()
    }

    main.appendChild(cross)
    main.appendChild(circle)
}

function chooseDifficulty() {
        let easy = document.createElement('button')
        easy.textContent = 'Easy'
        easy.onclick = () => {
            gameSettings['difficulty'] = 'easy'
            console.log(gameSettings)
            play()
        }    
        main.appendChild(easy)
        let normal = document.createElement('button')
        normal.textContent = 'Normal'
        normal.onclick = () => {
            gameSettings['difficulty'] = 'normal'
            console.log(gameSettings)
            play()
        }    
        main.appendChild(normal)

        let hard = document.createElement('button')
        hard.textContent = 'Hard'
        hard.onclick = () => {
            gameSettings['difficulty'] = 'hard'
            console.log(gameSettings)
            play()
        }    
        main.appendChild(hard)
}

function play() {
    clearMain()
    drawGrid()
    const tictactoe = new TicTacToe(gameSettings)
    let restart = document.createElement('button')
    restart.textContent = 'Restart'
    restart.onclick = () => {
        play()
    }
    main.appendChild(restart)
    tictactoe.setGridEvents()
}


function clearMain() {
     while (main.firstChild) {
         main.removeChild(main.lastChild)
     }
}

function drawGrid() {
    for (let i = 0; i < 3; i++) {
        let row = document.createElement('div')
        row.className = 'gridRow'

        if (i > 0) row.style.borderTop = "solid grey 3px"
        
        for (let j = 0; j < 3; j++) {
            let cell = document.createElement('div')
            cell.className = 'gridCell'
            let canvas = document.createElement('canvas')
            let id = i.toString() + j.toString()
            canvas.setAttribute('id', id)
            if (j > 0) cell.style.borderLeft = "solid grey 3px"
            cell.append(canvas)
            row.appendChild(cell)
        }
        main.appendChild(row)
    }
}
