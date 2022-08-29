import { Game } from './Game.js'

export class Enemy {
  constructor (Game, preset, hp) {
    /**
     * @type {Game}
     */
    this.Game = Game

    this.hp = hp
    this.baseHp = hp
    this.name = preset.name
    this.w = preset.w
    this.h = preset.h
    this.speed = preset.speed + Math.random() * 2
    this.reward = preset.reward
    this.probability = preset.probability

    this.isHit = false
    this.isCrippled = false
    this.hitBy = new Set()

    this.textures = preset.textures

    const { x, y } = this.getRandomSpawnCoords()
    this.x = x
    this.y = y
  }

  /** returns false if dies to cripple */
  move (tick) {
    // maybe I should do some nextTick functionality for resetting being hit
    this.isHit = false

    // todo this definitely needs some improving, cant use takeHit method tho
    if (this.isCrippled && (tick === 0)) {
      this.hp -= this.baseHp * 0.05
      if (this.hp <= 0) {
        this.Game.incKillCount()
        this.Game.Player.money += this.reward
        return false
      }
    }

    const x = this.Game.Player.x - this.x
    const y = this.Game.Player.y - this.y
    const dist = Math.sqrt(x**2 + y**2)

    if (this.Game.Player.special.remainingDuration > 110 && this.Game.Player.special.choice === 2) {
      this.x += -x / dist * this.Game.Player.speed * 13
      this.y += -y / dist * this.Game.Player.speed * 13
    } else if (this.Game.Player.ulti.remainingDuration === 0) {
      this.x += x / dist * this.speed
      this.y += y / dist * this.speed
    }

    this.hit = false

    if (Math.abs(this.x - this.Game.Player.x) <= this.Game.Player.w &&
        Math.abs(this.y - this.Game.Player.y) <= this.Game.Player.h) {
      if (this.Game.Player.dash.remainingDuration > 0 && this.Game.Player.dash.special === 2) return
      this.Game.end()
    }

    return true
  }

  cripple () {
    this.isCrippled = true
    this.speed *= 0.5
  }

  /** returns true if dead */
  takeHit (projectile) {
    this.hp -= projectile.damage
    this.isHit = true

    if (this.Game.Player.Shooting.specials[0] === 1) {
      this.hitBy.add(projectile.id)
      projectile.damage /= 2
    }

    if (this.Game.Player.Shooting.specials[0] === 2 && !this.isCrippled) {
      this.speed *= 0.5
      this.isCrippled = true
    }

    if (this.hp <= 0) {
      this.Game.incKillCount()
      this.Game.Player.money += this.reward
      return true
    }

    return false
  }

  
getRandomSpawnCoords () {
  let x, y;
  if (Math.random() > 0.5) {
    x = Math.floor(Math.random() * 160)
    y = Math.floor(Math.random() * this.Game.World.height)
  } else {
    x = Math.floor(Math.random() * this.Game.World.width)
    y = Math.floor(Math.random() * 80)
  }

  if (Math.random() > 0.5) x = this.Game.World.width - x
  if (Math.random() > 0.5) y = this.Game.World.height - y
  
  return {
    x,
    y,
  }
}
}
