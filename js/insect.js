screens = document.querySelectorAll('.screen')
choose_insect_btns = document.querySelectorAll('.choose-insect-btn')
game_container = document.getElementById('game-container')
start_btn = document.getElementById('start-btn')
timeEl = document.getElementById('time')
scoreEl = document.getElementById('score')
message = document.getElementById('message')
let seconds = 0
let score = 0
let selected_insect = {}

start_btn.addEventListener('click', () => {
    screens[0].classList.add('up')
})

choose_insect_btns.forEach(btn => {
    btn.addEventListener('click', () => {
        img = btn.querySelector('img')
        alt = img.getAttribute('alt')
        src = img.getAttribute('src')
        screen[1].classList.add('up')
    })
})
