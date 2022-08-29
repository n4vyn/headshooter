import { Game } from '../entities/Game.js'
import { ctx } from './draw.js'

const as = new Image()
as.src = './assets/icons/as.png'

const ad = new Image()
ad.src = './assets/icons/ad.png'

const ms = new Image()
ms.src = './assets/icons/multishot.png'

const pl = new Image()
pl.src = './assets/icons/pellets.png'

const ps = new Image()
ps.src = './assets/icons/projectileSpeed.png'

const moneyDiv = document.getElementById('money')
const uDivs = []

// todo
for (const key of ['damage', 'attackSpeed', 'pellets', 'multiShot', 'projectileSpeed']) {
  uDivs[key] = document.getElementById(key)
}

/**
 * @param {Game} Game
 */
export const drawUi = (Game) => {
  // actually can't really move it to upgradeHandlers cause I need to change the color based on money
  moneyDiv.innerText = `$${Game.Player.money}`

  // todo
  for (const name of Game.Player.Shooting.valueNames) {
    const obj = Game.Player.Shooting[name]
    if ((obj.maxLvl !== 0 && (obj.maxLvl === obj.lvl))) {
      uDivs[name].style.color = 'orange'
      uDivs[name].innerText = 'FULL'
    } else {
      uDivs[name].style.color = Game.Player.money < obj.price ? 'red' : 'lime'
      uDivs[name].innerText = `$${obj.price}`
    }
  }

  ctx.fillStyle = 'yellow'
  ctx.font = '60px Segoe UI'
  ctx.fillText(`$${Math.floor(Game.Player.money)}`, 10, 900 - 20)


  ctx.fillStyle = 'rgba(32, 32, 32, 0.5)'
  ctx.fillRect(0, 0, 450 + ((''+Game.Player.Shooting.pellets.value).length * 20) + ((''+Game.Player.Shooting.damage.value).length * 20), 40)

  let padding = 15
  ctx.font = '30px Segoe UI'

  ctx.fillStyle = 'red'
  
  ctx.fillText(Game.Player.Shooting.damage.value, padding, 30)
  padding += (''+Game.Player.Shooting.damage.value).length * 18
  ctx.drawImage(ad, padding, 5, 30, 30)
  
  
  ctx.fillStyle = 'yellow'
  ctx.fillText(`${Game.Player.Shooting.attackSpeed.value}/${Game.Player.Shooting.attackSpeed.maxLvl}`, padding += 50, 30)
  
  ctx.drawImage(as, padding +=  50, 5, 30, 30)

  ctx.fillStyle = 'aqua'
  ctx.fillText(`${Game.Player.Shooting.pellets.lvl}/${Game.Player.Shooting.pellets.maxLvl}`, padding += 50, 30)
  padding += (''+Game.Player.Shooting.pellets.lvl).length * 20 + 45
  ctx.drawImage(pl, padding, 5, 30, 30)

  ctx.fillStyle = 'pink'
  ctx.fillText(`${Game.Player.Shooting.multiShot.lvl}/${Game.Player.Shooting.multiShot.maxLvl}`, padding += 45, 30)
  ctx.drawImage(ms, padding += 50, 5, 30, 30)

  ctx.fillStyle = 'lime'
  ctx.fillText(`${Game.Player.Shooting.projectileSpeed.lvl}/${Game.Player.Shooting.projectileSpeed.maxLvl}`, padding += 45, 30)
  ctx.drawImage(ps, padding += 55, 5, 30, 30)

  ctx.fillStyle = 'red'
  const maxCd = Game.Player.dash.special === 1 ? 1.5 * 60 : 3 * 60
  ctx.fillRect(Game.Player.x - Game.Player.w / 2, Game.Player.y + 35, Game.Player.w / maxCd * Game.Player.dash.remainingCooldown, 5)    

  ctx.lineWidth = 1;
  ctx.strokeStyle = 'black';
  ctx.fillStyle = 'white'
  ctx.strokeRect(1412, 5, 186, 30)
  if (Game.Player.ulti.remainingCooldown < 1800) {
    ctx.fillRect(1415, 9, 180 - (Game.Player.ulti.remainingCooldown / 10), 22)
  }

  if (Game.Player.special.choice) {
    ctx.fillStyle = 'aqua'
    ctx.strokeRect(1412, 40, 186, 30)
    ctx.fillRect(1415, 44, 180 - (180 / 600 * Game.Player.special.remainingCooldown), 22)
  }
  
  ctx.fillStyle = 'black'
  ctx.fillText(Game.killCount, 800, 30)
}
