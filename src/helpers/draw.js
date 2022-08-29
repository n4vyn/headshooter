import { Game } from '../entities/Game.js';
import { drawUi } from './drawUi.js';

const canvas = document.getElementById('canvas')
export const ctx = canvas.getContext('2d')

const bg = new Image()
bg.src = './assets/grass.jpg'

const cripple = new Image()
cripple.src = './assets/icons/cripple_particle.png'

/**
 * @param {Game} Game
 */
export const draw = (Game) => {
  // drawBackground(Game)
  ctx.drawImage(bg, Game.World.cam.x, Game.World.cam.y, Game.World.width, Game.World.height, -52, -52, Game.World.width + 52, Game.World.height + 52)

  ctx.drawImage(Game.Player.texture, Game.Player.x - Game.Player.w / 2, Game.Player.y - Game.Player.h / 2, Game.Player.w, Game.Player.h);

  if (Game.Player.special.remainingDuration > 0) {
    if (Game.Player.special.choice === 1) {

    } else {
      ctx.beginPath();
      ctx.arc(Game.Player.x, Game.Player.y, 25 * (120 - Game.Player.special.remainingDuration), 0, 2 * Math.PI)
      ctx.lineWidth = 5;
      ctx.strokeStyle = 'aqua';
      ctx.stroke();
    }
  }

  for (const projectile of Game.World.projectiles) {
    ctx.fillStyle = Game.Player.Shooting.specials[0] === 2 ? 'yellowgreen' : 'white'
    ctx.fillRect(Math.round(projectile.x), Math.round(projectile.y), projectile.size, projectile.size)
  }

  for (const enemy of Game.World.EnemyManager.enemies) {
    const texture = getTexture(enemy, Game.Player)
    ctx.drawImage(texture, enemy.x - enemy.w / 2, enemy.y - enemy.h / 2, enemy.w, enemy.h)
    if (enemy.isCrippled) {
      const x = Math.floor(Math.random() * enemy.w - (enemy.w / 2)) + enemy.x
      const y = Math.floor(Math.random() * enemy.h- (enemy.h / 2)) + enemy.y
      ctx.drawImage(cripple, x, y, 32, 32)
    }
  }

  ctx.fillStyle = 'blue'
  const newTexts = []
  for (const text of Game.World.texts) {
    if (text.size > 39) continue
    ctx.font = text.size+'px Segoe UI'
    ctx.fillText(text.text, text.x, text.y)
    text.size += 2
    newTexts.push(text)
  }
  Game.World.texts = newTexts

  // UI
  drawUi(Game)
}

function getTexture (enemy, player) {
  if (enemy.isHit || player.ulti.remainingDuration > 0) return enemy.textures.hit
  else if (enemy.isCrippled) return enemy.textures.crippled
  else return enemy.textures.default
}
