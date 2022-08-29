import { draw } from '../helpers/draw.js'
import { EnemyManager } from './EnemyManager.js'
import { Game } from './Game.js'
import { Player } from './Player.js'
import { Projectile } from './Projectile.js'

const Q = Math.sqrt(2) / 2
// if: w = 1, a = 2, s = 4, d = 8
const movementVectors = {
  0: null,
  1: { x: 0, y: -1 },  // ↑ 
  2: { x: -1, y: 0 },  // ← 
  3: { x: -Q, y: -Q }, // ←↑ 
  4: { x: 0, y: 1 },   // ↓ 
  5: null,             // + 
  6: { x: -Q, y: Q },  // ←↓ 
  7: { x: -1, y: 0 },  // = a 
  8: { x: 1, y: 0 },   // →
  9: { x: Q, y: -Q },  // ↑→ 
  10: null,            // + 
  11: { x: 0, y: -1 }, // = w 
  12: { x: Q, y: Q },  // ↓→ 
  13: { x: 1, y: 0 },  // = d 
  14: { x: 0, y: 1 },  // = s 
  15: null,            // + 
}

export class World {
  constructor (Game) {
    /**
     * @type {Game}
     */
    this.Game = Game
    
    /**
    * @type {Projectile[]}
    */
    this.projectiles = []

    this.EnemyManager = new EnemyManager(this.Game)    
  }

  width = 1600
  height = 900

  cam = {
    x: 0,
    y: 0,
  }

  texts = []

  moveCam () {
    const vector = movementVectors[Object.values(this.Game.pressedKeys).reduce((acc, curr) => acc + curr)]
    const d = this.Game.Player.dash.remainingDuration > 0 ? 5 : 1
    if (vector) {
      const x = vector.x * this.Game.Player.speed * d
      const y = vector.y * this.Game.Player.speed * d
      
      this.cam.x = (this.cam.x + x) % 52
      this.cam.y = (this.cam.y + y) % 52
  
      for (const e of this.EnemyManager.enemies) {
        e.x -= x
        e.y -= y
      }
  
      for (const p of this.projectiles) {
        p.x -= x
        p.y -= y
      }
    }
  }

  moveProjectiles () {
    for (const projectile of this.projectiles) {
      projectile.move()
    }
  }

  calculateHits () {
    l1:
    for (const enemy of this.EnemyManager.enemies) {
      for (const projectile of this.projectiles) {
        if (projectile.destroyed || enemy.hitBy.has(projectile.id)) continue

        if (Math.abs(projectile.x + (projectile.size / 2) - enemy.x) <= (enemy.w / 2) &&
            Math.abs(projectile.y + (projectile.size / 2) - enemy.y) <= (enemy.h / 2)) {

          if (this.Game.Player.Shooting.specials[0] !== 1) projectile.destroyed = true

          this.texts.push({ x: projectile.x, y: projectile.y, text: projectile.damage, size: 28 })

          if (enemy.takeHit(projectile)) continue l1
        }
      }
    }

    // todo
    this.EnemyManager.deleteDead()
    this.projectiles = this.projectiles.filter(p => !p.destroyed)
  }

  draw () {
    draw(this.Game)
  }

}
