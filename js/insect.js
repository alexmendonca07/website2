screens = document.querySelectorAll('.screen')
choose_insect_btn = document.querySelectorAll('.choose-insect-btn')
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
