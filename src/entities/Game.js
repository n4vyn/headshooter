import { draw } from '../helpers/draw.js'
import { drawMenu } from '../helpers/drawMenu.js'
import { Player } from './Player.js'
import { World } from './World.js'

export class Game {
  constructor () {
    this.World = new World(this)
    this.Player = new Player(this)
  }

  FPS = 60
  HZ = 1000 / this.FPS
  tick = 1
  paused = false
  difficulty = 1
  killCount = 0

  mousePressed = false
  mouseCoords = {
    x: 0,
    y: 0,
  }
  pressedKeys = {
    'w': 0,
    'a': 0,
    's': 0,
    'd': 0,
  }

  gameClock = null

  async start () {
    this.gameClock = setInterval(() => { this.onTick() }, this.HZ)
  }

  onTick () {
    if (this.paused) {
      draw(this)
      return
    }

    this.tick++
    if (this.tick === 60) this.tick = 0
    
    this.World.EnemyManager.spawn()

    if (this.Player.special.remainingCooldown > 0) this.Player.special.remainingCooldown--

    if (this.Player.special.remainingDuration > 0) {
      this.Player.special.remainingDuration--
    }

    if (this.Player.Shooting.tickCooldown > 0) this.Player.Shooting.tickCooldown--

    if (this.Player.dash.remainingDuration > 0) this.Player.dash.remainingDuration--
    if (this.Player.dash.remainingCooldown > 0) this.Player.dash.remainingCooldown--
    if (this.Player.ulti.remainingDuration > 0) this.Player.ulti.remainingDuration--
    if (this.Player.ulti.remainingCooldown > 0) this.Player.ulti.remainingCooldown--

    this.World.moveCam()
    this.World.moveProjectiles()
    this.World.EnemyManager.moveEnemies()

    if (this.mousePressed && this.Player.Shooting.tickCooldown === 0) {
      // shoot(pressedMouse, Player, shooting, projectiles)
      this.Player.shoot()
    }

    this.World.calculateHits()
    
    this.World.draw()
  }

  incKillCount () {
    this.killCount++
    
    if (this.killCount === 10) this.upgradeDifficulty()
    if (this.killCount === 50) this.upgradeDifficulty()
    if (this.killCount === 100) this.upgradeDifficulty()
    if (this.killCount === 250) this.upgradeDifficulty()
    if (this.killCount === 500) this.upgradeDifficulty()
    if (this.killCount === 1000) this.upgradeDifficulty()
    if (this.killCount === 5000) this.upgradeDifficulty()
  }

  toggleMenu () {
    // todo
    const menuDiv = document.getElementById('menu')
    if (this.paused) {
      menuDiv.style.display = 'none'
    } else {
      drawMenu(this)
      menuDiv.style.display = 'block'
    }
    this.paused = !this.paused
  }

  upgradeDifficulty () {
    this.World.EnemyManager.upgradeDifficulty()
  }

  end () {
    clearInterval(this.gameClock)
    alert('Game Over')
  }

  setPreset () {
    this.killCount = 2672
    this.Player.money = 3120 + 5000 + 20000

    this.Player.Shooting.fullAuto = true

    this.Player.Shooting.damage.value = 115
    this.Player.Shooting.damage.price = 1150

    this.Player.Shooting.attackSpeed.value = 5
    this.Player.Shooting.attackSpeed.lvl = 5
    this.Player.Shooting.attackSpeed.price = 7000

    this.Player.Shooting.pellets.value = 9
    this.Player.Shooting.pellets.lvl = 9
    this.Player.Shooting.pellets.price = 900

    this.Player.Shooting.multiShot.value = 3
    this.Player.Shooting.multiShot.lvl = 3
    this.Player.Shooting.multiShot.maxLvl = 3

    this.upgradeDifficulty()
    this.upgradeDifficulty()
    this.upgradeDifficulty()
    this.upgradeDifficulty()
    this.upgradeDifficulty()
    this.upgradeDifficulty()
  }
}
