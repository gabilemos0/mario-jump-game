const mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const clouds = document.querySelector('.clouds')
const restart = document.querySelector('.restart')

const score = document.querySelector('.score')
const level = document.querySelector('.level')

const deadSound = new Audio('./css/assets/audio/dead-sound.mp3')
const jumpSound = new Audio('./css/assets/audio/jump-sound.mp3')
const themeSound = new Audio('./css/assets/audio/theme-sound.mp3')
const levelUpSound = new Audio('./css/assets/audio/levelup-sound.mp3')

function stop(audio) {
  audio.pause()
  audio.currentTime = 0
}

function play(audio) {
  audio.play()
}

themeSound.loop = true
play(themeSound)

let isAlive = true

let jumpCounter = 0
let levelCounter = 1

function updateJumpCounter(newValue) {
  jumpCounter = newValue

  score.innerHTML = newValue
  if (jumpCounter === 0) {
    levelCounter = 1
    level.innerHTML = levelCounter
  } else if (jumpCounter % 10 === 0) {
    levelUpSound.play()
    levelCounter = levelCounter + 1

    level.innerHTML = levelCounter
  }
}

const jump = () => {
  if (!isAlive) {
    return
  }
  play(jumpSound)
  mario.classList.add('jump')

  setTimeout(() => {
    mario.classList.remove('jump')
    if (isAlive) {
      updateJumpCounter(jumpCounter + 1)
    }
  }, 500)
}

function createLoop() {
  const loopInterno = setInterval(() => {
    const pipePosition = pipe.offsetLeft
    const marioPosition = +window
      .getComputedStyle(mario)
      .bottom.replace('px', '')

    if (pipePosition <= 95 && pipePosition > 0 && marioPosition <= 60) {
      isAlive = false
      pipe.style.animation = 'none'
      pipe.style.left = `${pipePosition}px`

      mario.style.animation = 'none'
      mario.style.bottom = `${marioPosition}px`

      mario.src = './css/assets/img/game-over.png'
      mario.style.width = '60px'
      mario.style.marginLeft = '50px'

      clouds.style.animation = 'none'

      restart.src = './css/assets/img/restart.png'

      stop(themeSound)
      stop(jumpSound)
      play(deadSound)

      clearInterval(loopInterno)
    }
  }, 10)
  return loopInterno
}

let loop = createLoop()

const restartGame = () => {
  stop(deadSound)
  play(themeSound)

  pipe.style.left = ``
  pipe.style.animation = 'pipe-animation 2s infinite linear'

  mario.style.animation = ''
  mario.style.bottom = ``
  mario.src = './css/assets/img/mario.gif'
  mario.style.width = '100px'
  mario.style.marginLeft = ''

  clouds.style.animation = 'clouds-animation 20s infinite linear'

  restart.src = ''

  loop = createLoop()
  isAlive = true

  updateJumpCounter(0)
}

document.addEventListener('keydown', jump)
restart.addEventListener('click', restartGame)
