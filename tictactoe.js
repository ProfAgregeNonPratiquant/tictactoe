class TicTacToe {
    constructor(gamesSettings) {
        this.gamesSettings = gameSettings
        this.turn = 0
        this.jsonGridState =  this.initJsonGridState()
        this.isEmpty = this.initIsEmpty()
        this.winnerAlert = document.createElement('h2')
        this.winnerAlert.style.textAlign = 'center'
    }

    initJsonGridState() {
        return {
            "00": 0, "01": 0, "02": 0,
            "10": 0, "11": 0, "12": 0,
            "20": 0, "21": 0, "22": 0
            }
    }

    initIsEmpty() {
        return [
            [true, true, true], 
            [true, true, true], 
            [true, true, true]
        ]
    }

    falsifyIsEmpty() {
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                this.isEmpty[i][j] = false
            }
        }
    }

    setGridEvents() {
        let cells = []
        
        
        main.appendChild(this.winnerAlert)

        
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
    
                cells.push([])
        
                let s = i.toString() + j.toString()
        
                let cell = document.getElementById(s)
                cells[i].push(cell)
                let ctx = cell.getContext('2d')
        
                cells[i][j].addEventListener(
                    'click',
                    () => {
                        if (this.gamesSettings.playerTwo === 'human') this.eventWhenThereIsTwoHumansPlaying(cell, ctx, i, j, s)
                        else {
                            this.eventWhenPlayingAgainstTheComputer(cell, ctx, i, j, s)
                        }
                    }
                )
            }   
        }
    }

    eventWhenThereIsTwoHumansPlaying(cell, ctx, i, j, s) {
        if (this.isEmpty[i][j]) {
            this.turn % 2 === 0 ? drawCross(cell, ctx) : drawCircle(cell, ctx)
            this.jsonGridState[s] = this.turn % 2 === 0 ? 1 : -1
            
            this.isEmpty[i][j] = false
            this.turn++

            fetchAPI('check', this.jsonGridState).then(
                res => res.json().then(
                    (res) => {
                        let who = res.who
                        if (who != 0) {
                            this.winnerAlert.textContent = who === 1 ? 'X wins!' : 'O wins!'
                            this.falsifyIsEmpty()
                        }
                        if ( this.turn === 9 && who === 0) {
                            this.winnerAlert.textContent = 'Draw !'
                        }
                    }
                )
            )   
        }
    }

    eventWhenPlayingAgainstTheComputer(cell, ctx, i, j, s) {
        console.log(this.gamesSettings)
        let difficulty = this.gamesSettings.difficulty
        let shape = this.gamesSettings.shapeForPlayerOne

        if (this.isEmpty[i][j] && this.turn % 2 === 0) {
            this.isEmpty[i][j] = false
            this.turn++
            this.jsonGridState[s] = 1
            shape === 'x' ? drawCross(cell, ctx) : drawCircle(cell, ctx)

            fetchAPI(difficulty, this.jsonGridState).then(
                res => res.json().then(
                    res => {
                        if (res.row != null) {
                            let row = res.row
                            let col = res.col
                            this.isEmpty[row][col] = false
                            let id = row.toString() + col.toString()

                            let _cell = document.getElementById(id)
                            let _ctx = _cell.getContext('2d')
                            
                            shape === 'o' ? drawCross(_cell, _ctx) : drawCircle(_cell, _ctx)
                            this.jsonGridState[id] = -1
                            
                        }
                        if (res.winner != 0) {
                            this.winnerAlert.textContent = res.winner === 1 ? 'You win!' : 'You lose...'
                            this.falsifyIsEmpty()
                        }
                        if (res.row == null && res.winner === 0) {
                            this.winnerAlert.textContent = 'Draw!'
                            
                        }
                        this.turn++   
                    }
                )
            )
        }
    }
}