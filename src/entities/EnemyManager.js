import { Game } from './Game.js'
import { Enemy } from './Enemy.js'

export class EnemyManager {
  constructor (Game) {
    /**
     * @type {Game}
     */
    this.Game = Game

    /**
     * @type {Enemy[]}
     */
    this.enemies = []

    for (const preset of this.presets) {
      const [name, extension] = preset.textureName.split('.')
      for (const type of this.textureTypes) {
        const img = new Image()
        img.src = `assets/${name}_${type}.${extension}`
        preset.textures[type] = img
      }
    }
  }

  settings = {
    minEntities: 1,
    maxMinEntities: 10,
    maxEntities: 10,
    maxMaxEntities: 100,
    spawnRate: 10,
    maxSpawnRate: 30,
  }

  presets = [{
    name: 'navijak',
    w: 72 * 0.8,
    h: 96 * 0.8,
    speed: 2.2,
    baseHp: 10,
    hp: 10,
    reward: 10,
    probability: 10,
    textureName: 'navijak.png',
    textures: {}
  }, {
    name: 'spekounNavijak',
    w: 72 * 1.5,
    h: 96 * 1.5,
    speed: 1,
    baseHp: 100,
    hp: 100,
    reward: 100,
    probability: 1,
    textureName: 'navijak.png',
    textures: {}
  }]

  textureTypes = ['default', 'hit', 'crippled']

  spawn () {
    if (this.Game.Player.ulti.remainingDuration > 0) return
  
    if (this.enemies.length > this.settings.minEntities) {
      if ((Math.random() * 1000) > this.settings.spawnRate) return
  
      if (this.enemies.length >= this.settings.maxEntities) return
    }

    let selectedPreset = null
    const max = this.presets.reduce((acc, curr) => acc + curr.probability, 0)
    let q = Math.floor(Math.random() * max) + 1
  
    for (const preset of this.presets) {
      q -= preset.probability
      if (q <= 0) {
        selectedPreset = preset
        break
      }
    }

    const hp = selectedPreset.hp * (1 + this.Game.killCount / 100)
    this.enemies.push(new Enemy(this.Game, selectedPreset, hp))
  }

  moveEnemies () {
    this.enemies = this.enemies.filter(e => e.move(this.Game.tick))
  }
  
  upgradeDifficulty () {
    if (this.settings.spawnRate < this.settings.maxSpawnRate) {
      this.settings.spawnRate += 5
      for (const preset of this.presets) {
        preset.hp = preset.hp * 1.1
        // preset.hp = preset.baseHp * (1 + this.difficulty / 10)
      }
    } else {
      for (const preset of this.presets) {
        preset.hp = preset.hp * 1.2
      }
    }
  
    if (this.settings.minEntities < this.settings.maxMinEntities) this.settings.minEntities += 2
    if (this.settings.maxEntities < this.settings.maxMaxEntities) this.settings.maxEntities += 10
    this.presets[1].probability++
  }

  deleteDead () {
    this.enemies = this.enemies.filter(e => e.hp > 0)
  }
}