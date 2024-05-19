rulesBtn = document.getElementById('rules-btn')
rules = document.getElementById('rules')
closeBtn = document.getElementById('close-btn')
canvas = document.getElementById('canvas')
ctx = canvas.getContext('2d')
startBtn = document.getElementById('start-btn')

rulesBtn.addEventListener('click', () => {
    rules.classList.add('show')
})

closeBtn.addEventListener('click', () => {
    rules.classList.remove('show')
})

startBtn.addEventListener('click', () => {
    startBtn.classList.add('.play')
    canvas.classList.add('.play')
    ball.dx = 4
    ball.dy = 4
    update()
})

blockRowCount = 9
blockColumnCount = 5

score = 0

ball = {
    x: 400,
    y: 300,
    w: 80,
    h: 10,
    dx: 0,
    dy: 0
}

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

function drawBall() {
    ctx.beginPath()
    ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2, true)
    ctx.fillStyle = '#0095dd'
    ctx.fill()
    ctx.closePath()
}

function drawPaddle() {
    ctx.beginPath()
    ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h)
    ctx.fillStyle = '#0095dd'
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
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawPaddle()
    drawBall()
    drawScore()
    drawBlocks()
}

function movePaddle() {
    paddle.x = paddle.x + paddle.dx

    if (paddle.x < 0) {
        paddle.x = 0
    }
    if (paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w
    }
}

function keyDown(e) {
    ball.dx = 4
    ball.dy = 4
    if (e.key == 'ArrowRight' || e.key == 'Right') {
        paddle.dx = paddle.speed
    }
    if (e.key == 'ArrowLeft' || e.key == 'Left') {
        paddle.dx = -paddle.speed
    }
}

function keyUp(e) {
    if (e.key == 'ArrowRight' || e.key == 'Right' || e.key == 'ArrowLeft' || e.key == 'Left') {
        paddle.dx = 0
    }
}

document.addEventListener('keydown', keyDown)
document.addEventListener('keyup', keyUp)

function moveBall() {
    ball.x = ball.x + ball.dx
    ball.y = ball.y + ball.dy

    if (ball.y + ball.size < 0) {
        ball.dy = -1 * ball.dy
    }
    if (ball.x + ball.size > canvas.width || ball.x + ball.size < 0) {
      ball.dx = -1 * ball.dx
    }
    if (ball.y + ball.size > canvas.height) {
        canvas.classList.add('pause')
        startBtn.classList.add('start-btn')
        showAllBlocks()
        score = 0
    }

    blocks.forEach(column => {
        column.forEach(block => {
            if (block.visible) {
                if (
                    ball.x - ball.size > block.x &&
                    ball.x + ball.size < block.x + block.w &&
                    ball.y - ball.size < block.y + block.h &&
                    ball.y + ball.size > block.y
                ) {
                    ball.dy = -1 * ball.speed
                    block.visible = false
                    increaseScore()
                }
            }
        })
    })
}

function increaseScore() {
    score++

    if (score == blockRowCount * blockColumnCount) {
        score = 0
        showAllBlocks()
    }
}

function showAllBlocks() {
    blocks.forEach(column => {
        column.forEach(block => {
            block.visible = true
        })
    })
}

function update() {
    moveBall()
    movePaddle()
    draw()
    if (canvas.classList != 'canvas pause' && canvas.classList == 'canvas')
    {
        requestAnimationFrame(update())
    }
}

update()