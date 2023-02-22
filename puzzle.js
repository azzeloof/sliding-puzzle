var canvas = document.getElementById("puzzle");
var ctx = canvas.getContext("2d");

const w = 300;
const h = 300;
const n = 9;
const tx = 100;
const ty = 100;

tiles = [
    {value: "A", color: "#00FF00"},
    {value: "T", color: "#00FF00"},
    {value: "O", color: "#00FF00"},
    {value: "M", color: "#00FF00"},
    {value: "I", color: "#00FF00"},
    {value: "C", color: "#00FF00"},
    {value: "", color: "#00FF00"},
    {value: "", color: "#00FF00"},
];

function draw(tile, index) {
    var row = Math.floor(index/Math.sqrt(n));
    var col = index % Math.floor(Math.sqrt(n));
    console.log(row, col);
    ctx.fillStyle = tile.color;
    ctx.fillRect(0, 0, 100, 100);
}

for (let i=0; i<n; i++) {
    draw(tiles[i], i);
}