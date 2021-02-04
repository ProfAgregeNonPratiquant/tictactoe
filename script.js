const main = document.querySelector('main')

function drawCross(cell, ctx) {
    ctx.clearRect(0, 0, cell.width, cell.height)
    ctx.beginPath()
    ctx.moveTo(17, 17)
    ctx.lineTo(83, 83)
    ctx.moveTo(83, 17)
    ctx.lineTo(17, 83)
    ctx.lineWidth = 5
    ctx.strokeStyle = '#ffcc00'
    ctx.stroke()
}

function drawCircle(cell, ctx) {
    ctx.clearRect(0, 0, cell.width, cell.height)
    ctx.beginPath()
    ctx.arc(50, 50, 37, 0, 2 * Math.PI)
    ctx.lineWidth = 5
    ctx.strokeStyle = '#0066ff'
    ctx.stroke()
}


//const api_url = 'http://127.0.0.1:5000'
const api_url = 'http://khyf.pythonanywhere.com'

function fetchAPI(endPoint, jsonGridState) {
    return fetch(api_url + '/' + endPoint, {
        method: 'post',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(jsonGridState)
    })}