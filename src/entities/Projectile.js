import { Player } from './Player.js'
import { World } from './World.js'

export class Projectile {
  constructor (id, x, y, vector, damage) {
    this.id = id
    this.x = x
    this.y = y
    this.vector = vector
    this.damage = damage

    this.destroyed = false
    this.size = 4
  }

  move () {
    this.x += this.vector.x
    this.y += this.vector.y
    if (this.x <= 0 || this.x >= World.width || this.y <= 0 || this.y >= World.height) this.destroyed = true
  }
}