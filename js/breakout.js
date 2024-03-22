
blockRowCount = 9
blockColumnCount = 5

score = 0

paddle = {
    x: canvas.width / 2 - 40,
    y: canvas.height - 20,
    w: 80,
    h: 10,
    speed: 8,
    dx: 0,
}

blockInfo = {
    w: 70,
    h: 20,
    padding: 10,
    offsetX: 45,
    offsetY: 60,
    visible: true,
}

blocks = []
for (let i = 0; i < blockRowCount; i++) {
    blocks[i] = []
    for (let j = 0; j < blockColumnCount; j++) {
        x = i * (blockInfo.w + blockInfo.padding) + blockInfo.offsetX
        y = j * (blockInfo.h + blockInfo.padding) + blockInfo.offsetY
        blocks[i][j] = {x, y, ...blockInfo}
    }
}

function drawPaddle() {
    ctx.beginPath()
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h)
    ctx.fillStyle = '#009599'
    ctx.fill()
    ctx.closePath()
}

function drawScore() {
    ctx.font = '20px Arial'
    ctx.fillText(`Score: ${score}`, canvas.width-100, 30)
}

function drawBlocks() {
    blocks.forEach(column => {
        column.forEach(block => {
            ctx.beginPath()
            ctx.rect(block.x, block.y, block.w, block.h)
            ctx.fillStyle = block.visible ? '#0095dd' : 'transparent';
            ctx.fill()
            ctx.closePath()
        })
    })
}



function draw() {
    drawPaddle()
    drawBall()
    drawScore()
    drawBlocks()
}

draw()
