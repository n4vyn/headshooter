import { Game } from './Game.js'
import { drawMenu } from '../helpers/drawMenu.js'

export class Shooting {
  
  constructor (Game) {
    /**
     * @type {Game}
     */
    this.Game = Game
  }

  // size = 4,
  // baseSpeed = 4,

  fullAuto = false
  specials = []

  tickCooldown = 0

  valueNames = ['damage', 'attackSpeed', 'pellets', 'multiShot', 'projectileSpeed']

  damage = {
    value: 5,
    price: 50,
    priceInc: 50,
    valueInc: 5,
    lvl: 0,
    maxLvl: 0,
  }

  attackSpeed = {
    value: 1,
    price: 100,
    prices: [100, 200, 500, 1000, 1500, 2000, 2500, 3000],
    priceInc: 50,
    valueInc: 1,
    lvl: 1,
    maxLvl: 8,
    maxFullAutoLvl: 8,
    fullAutoPrices: [5000, 5500, 6000, 6500, 7000, 7500, 8000, 8500],
  }

  pellets = {
    value: 1,
    price: 100,
    prices: [100, 250, 500, 1000, 1500, 2000, 2500, 3000, 4000, 5000],
    priceInc: 200,
    valueInc: 1,
    lvl: 1,
    maxLvl: 10,
  }

  multiShot = {
    value: 1,
    price: 1000,
    prices: [1000, 2000, 3000, 4000, 5000],
    priceInc: 1000,
    valueInc: 1,
    lvl: 1,
    maxLvl: 5,
    maxFullAutoLvl: 3,
    fullAutoPrices: [5000, 7500, 1000],
  }

  projectileSpeed = {
    baseValue: 4,
    value: 2,
    price: 50,
    priceInc: 50,
    valueInc: 1,
    lvl: 1,
    maxLvl: 3,
  }

  upgradeAttribute (type) {
    // todo maybe nicer attribute access
    if (this.Game.Player.money < this[type].price) return
    if (this[type].maxLvl !== 0 && this[type].lvl >= this[type].maxLvl) return
  
    this[type].value += this[type].valueInc
    this.Game.Player.money -= this[type].price
    this[type].lvl++

  
    if (this[type].prices) {
      this[type].price = this[type].prices[this[type].lvl - 1]
    } else {
      this[type].price += this[type].priceInc
    }
  
    if (this.Game.paused) drawMenu(this.Game)
  }
}