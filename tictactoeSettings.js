const main = document.querySelector('main')

// Réglages par défaut: le jeu se joue à deux, chacun son tour.
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
    twoPlayersButton.onclick = onTwoPlayer

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
    let difficulties = ['Easy', 'Normal', 'Hard']
    for(difficulty of difficulties) {
        let button = document.createElement('button')
        button.textContent = difficulty
        main.appendChild(button)
        button.onclick = () => {
            gameSettings['difficulty'] = difficulty.toLowerCase()
            console.log(gameSettings)
            clearMain()
            drawGrid()
        }
    }            
}

function onTwoPlayer() {
    clearMain()
    drawGrid()
    console.log(gameSettings)
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
