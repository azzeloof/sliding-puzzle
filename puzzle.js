var canvas = document.getElementById("puzzle");
var ctx = canvas.getContext("2d");

var canvasTop = canvas.offsetTop + canvas.clientTop;
var canvasLeft = canvas.offsetLeft + canvas.clientLeft;

const w = 300;
const h = 300;
const n = 9;
const d = 3;
const tx = 100;
const ty = 100;

tiles = [
    {value: "A", color: "#67cb62"},
    {value: "T", color: "#f48362"},
    {value: "O", color: "#ffdb62"},
    {value: "M", color: "#c79fc7"},
    {value: "I", color: "#628cff"},
    {value: "C", color: "#d1d3d4"},
    {value: "", color: "#FFFFFF"},
    {value: "", color: "#FFFFFF"},
    {value: null, color: "#000000"},
].sort((a, b) => 0.5 - Math.random());
//https://dev.to/codebubb/how-to-shuffle-an-array-in-javascript-2ikj

function getLoc(index) {
    var row = Math.floor(index/d);
    var col = index % d;
    return [row, col];
}

function getInd(row, col) {
    return(row*d + col);
}

function draw(tile, index) {
    let row, col;
    [row, col] = getLoc(index);
    ctx.fillStyle = tile.color;
    ctx.fillRect(col*tx, row*ty, tx, ty);
    ctx.fillStyle = "#000000";
    ctx.strokeRect(col*tx, row*ty, tx, ty)
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "bold 48px sans-serif";
    ctx.fillText(tile.value, (col+0.5)*tx, (row+0.5)*ty);
}

function drawBoard() {
    ctx.clearRect(0, 0, w, h);
    for (let i=0; i<n; i++) {
        draw(tiles[i], i);
    }
}

function emptyAdjacent(index) {
    let row, col;
    [row, col] = getLoc(index);
    if (row > 0 && tiles[getInd(row-1, col)].value == null){
        return true;
    } else if (row < d-1 && tiles[getInd(row+1, col)].value == null){
        return true;
    } else if (col > 0 && tiles[getInd(row, col-1)].value == null) {
        return true;
    } else if (col < d-1 && tiles[getInd(row, col+1)].value == null) {
        return true;
    }
    return false;
}

function emptyInd() {
    for (let i=0; i<n; i++) {
        if (tiles[i].value == null) {
            return i;
        }
    }
}

canvas.addEventListener('click', function(event) {
    var col = Math.floor((event.x-canvasLeft)/tx);
    var row = Math.floor((event.y-canvasTop)/ty);
    let index = getInd(row, col);
    if (emptyAdjacent(index)) {
        empty = emptyInd();
        let A = tiles[index];
        let B = tiles[empty];
        tiles[empty] = A;
        tiles[index] = B;
        drawBoard();
    }
})

drawBoard();
