import { Game } from './Game.js'
import { Projectile } from './Projectile.js'
import { Shooting } from './Shooting.js'

export class Player {
  constructor (Game) {
    /**
     * @type {Game}
     */
    this.Game = Game

    this.x = this.Game.World.width / 2
    this.y = this.Game.World.height / 2

    this.Shooting = new Shooting(Game)
    this.texture = new Image()
    this.texture.src = './assets/bevis.png'
  }

  w = 68 * 0.8
  h = 96 * 0.8

  speed = 4
  money = 100

  dash = {
    remainingDuration: 0,
    remainingCooldown: 0,
    special: 0,
  }

  ulti = {
    remainingDuration: 0,
    remainingCooldown: 0,
    special: 0,
  }

  special = {
    choice: 0,
    remainingDuration: 0,
    remainingCooldown: 0,
  }


  shoot () {
    const geometricValues = geoValues[this.Shooting.pellets.value]

    for (let i = 0; i < this.Shooting.pellets.value; i++) {
      const vx = this.Game.mouseCoords.x - this.x
      const vy = this.Game.mouseCoords.y - this.y
  
      const { sin, cos } = geometricValues[i]
  
      const nx = cos * vx - sin * vy
      const ny = sin * vx + cos * vy
  
      const dist = Math.sqrt(nx**2 + ny**2)
      const vector = {
        x: nx / dist * this.Shooting.projectileSpeed.baseValue * this.Shooting.projectileSpeed.value,
        y: ny / dist * this.Shooting.projectileSpeed.baseValue * this.Shooting.projectileSpeed.value,
      }
  
      for (let j = 0; j < this.Shooting.multiShot.value; j++) {
        this.Game.World.projectiles.push(new Projectile(
          Date.now() + i + '.' + j,
          this.x + (vector.x * j * 2),
          this.y + (vector.y * j * 2),
          vector,
          this.Shooting.damage.value,
        ))
      }
    }

    if (this.Shooting.fullAuto) {
      this.Shooting.tickCooldown = 20 - (this.Shooting.attackSpeed.lvl * (16 / this.Shooting.attackSpeed.maxLvl))
    } else {
      this.Shooting.tickCooldown = 60 - (this.Shooting.attackSpeed.lvl * (40 / this.Shooting.attackSpeed.maxLvl))
    }
  }

  useSpecial () {
    if (!this.special.choice) return
    if (this.special.remainingCooldown > 0) return
    if (this.special.choice === 1) {
      this.special.remainingCooldown = 60
    } else {
      this.special.remainingDuration = 60 * 2
      this.special.remainingCooldown = 60 * 10
    }
  }

  useUlti () {
    if (this.ulti.remainingDuration > 0 || this.ulti.remainingCooldown > 0) return

    this.ulti.remainingCooldown = 35 * 60
    this.ulti.remainingDuration = 5 * 60
  }

  useDash () {
    if (this.dash.remainingCooldown > 0) return
    this.dash.remainingCooldown = this.dash.special === 1 ? 1.5 * 60 : 3 * 60
    this.dash.remainingDuration = 12
  }
}

const geoValues = [null, [{sin: 0, cos: 1}]]

for (let pellets = 2; pellets <= 10; pellets++) {
  const values = []
  const mid = (1 + pellets) / 2
  for (let j = 0; j < pellets; j++) {
    const angle = toRadians(9 * (j + 1 - mid))
    values.push({ sin: Math.sin(angle), cos: Math.cos(angle) })
  }
  geoValues.push(values)
}

function toRadians (angle) {
  return angle * (Math.PI / 180);
}
