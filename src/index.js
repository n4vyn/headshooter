import { Game as GameClass } from './entities/Game.js'

// const menuDiv = document.getElementById('menu')

let Game

function startGame() {
  if (Game) Game.end()
  Game = new GameClass()
  Game.start()

  // todo reset specials, probably have a specialManager class
}

const stopButton = document.getElementById('stopButton')
stopButton.onclick = e => { Game.end() }

document.addEventListener('keydown', e => {
  if (e.key === 'w') Game.pressedKeys.w = 1
  else if (e.key === 'a') Game.pressedKeys.a = 2
  else if (e.key === 's') Game.pressedKeys.s = 4
  else if (e.key === 'd') Game.pressedKeys.d = 8
  else if (e.key === '+') Game.Player.Shooting.upgradeAttribute('damage')
  else if (e.key === 'ě') Game.Player.Shooting.upgradeAttribute('attackSpeed')
  else if (e.key === 'š') Game.Player.Shooting.upgradeAttribute('pellets')
  else if (e.key === 'č') Game.Player.Shooting.upgradeAttribute('multiShot')
  else if (e.key === 'ř') Game.Player.Shooting.upgradeAttribute('projectileSpeed')
  else if (e.key === 'm') Game.setPreset()
  // else if (e.key === 'r') startGame()
  else if (e.key === 'Shift' || e.key === 'q') {
    e.preventDefault()
    Game.Player.useSpecial()
  }
  else if (e.key === 'Control' || e.key === 'e') {
    e.preventDefault()
    Game.Player.useUlti()
  }
  else if (e.key === ' ') {
    e.preventDefault()
    Game.Player.useDash()
  }
  else if (e.key === 'Tab') { 
    e.preventDefault()
    Game.toggleMenu()
  }
})


document.addEventListener('keyup', e => {
  if (!['w', 'a', 's', 'd'].includes(e.key)) return
  Game.pressedKeys[e.key] = 0
})

canvas.addEventListener('mousedown', e => {
  e.preventDefault()
  Game.mousePressed = true
})

canvas.addEventListener('mouseup', e => {
  e.preventDefault()
  Game.mousePressed = false
})

canvas.addEventListener('mousemove', e => {
  Game.mouseCoords.x = e.clientX
  Game.mouseCoords.y = e.clientY
})

document.addEventListener('contextmenu', e => e.preventDefault())

startGame()
