function newTicTacToeGame() {
    gameSettings()   
}

function gameSettings() {
    let onePlayerButton = document.createElement('button')
    onePlayerButton.textContent = 'One player'

    let twoPlayersButton = document.createElement('button')
    twoPlayersButton.textContent = 'Two players'

    document.querySelector('main').appendChild(onePlayerButton)
    document.querySelector('main').appendChild(twoPlayersButton)
}