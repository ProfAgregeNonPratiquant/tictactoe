class TicTacToe {
    constructor(gamesSettings) {
        this.gamesSettings = gameSettings
        this.turn = 0
        this.jsonGridState =  this.initJsonGridState()
        this.isEmpty = this.initIsEmpty()
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
        let winnerAlert = document.createElement('h2')
        winnerAlert.style.textAlign = 'center'
        main.appendChild(winnerAlert)

        
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
                                            winnerAlert.textContent = who === 1 ? 'X wins!' : 'O wins!'
                                            this.falsifyIsEmpty()
                                        }
                                        if ( this.turn === 9 && who === 0) {
                                            winnerAlert.textContent = 'Draw !'
                                        }
                                    }
                                )
                            )   
                        }
                    }
                )
            }   
        }
    }
}