import { specials } from '../entities/specials.js'

const specialTooltipDiv = document.getElementById('special-tooltip')

export function drawMenu (Game) {
  let html = '<h2 class="center">Placeholder!!</h2>'

  html += 
`<div class="menu-specials-block">
<h3>Full Auto</h3>
Cost: <span style="color: ${Game.Player.money < 20000 ? 'red' : 'lime'};">$20 000</span>
<div>
  <div class="menu-specials-choice ${getClassByFullAuto(Game)}" value="fullAuto">${Game.Player.Shooting.fullAuto ? 'Full Auto Unlocked' : 'Unlock Full Auto'}</div>
</div>
After maximally upgrading Attack Speed (2) and MultiShot (4), unlock Full Auto for $10 000 to further progress the shooting madness!
(you will get to upgrade those stats again)
`
  document.getElementById('menu-left').innerHTML = html

  html = '<h2 class="center">Specials!!</h2> (choose one (laser star & last row NYI)'
  for (const key in specials) {
    const special = specials[key]
    html += 
`<div class="menu-specials-block">
  <h3>Unlock at ${special.killCountRequired.toLocaleString()} kills</h3>
  New ${special.type} ability! Cost: <span style="color: ${Game.Player.money < special.price ? 'red' : 'lime'};">$${special.price.toLocaleString()}</span>
  <div>
    <div class="menu-specials-choice ${getClassByChoice(special.choice, 1)}" value="${key},special1">${special.special1.name}</div>
    |
    <div class="menu-specials-choice ${getClassByChoice(special.choice, 2)}" value="${key},special2">${special.special2.name}</div>
  </div>
</div>`
  }

  document.getElementById('menu-specials').innerHTML = html

  for (const e of document.getElementsByClassName('menu-specials-choice')) {
    e.addEventListener('mousedown', e => {
      const [i, j] = e.target.getAttribute('value').split(',')

      if (i === 'fullAuto') {
        if (Game.Player.Shooting.fullAuto) return
        if (Game.Player.Shooting.attackSpeed.lvl !== Game.Player.Shooting.attackSpeed.maxLvl || Game.Player.Shooting.multiShot.lvl !== Game.Player.Shooting.multiShot.maxLvl) return
        if (Game.Player.money < 20000) return

        player.money -= 20000
        // todo this looks like garbage design
        Game.Player.Shooting.fullAuto = true

        Game.Player.Shooting.attackSpeed.lvl = 1
        Game.Player.Shooting.attackSpeed.value = 1
        Game.Player.Shooting.attackSpeed.maxLvl = upgrades.attackSpeed.maxFullAutoLvl
        Game.Player.Shooting.attackSpeed.prices = upgrades.attackSpeed.fullAutoPrices
        Game.Player.Shooting.attackSpeed.price = upgrades.attackSpeed.prices[0]

        Game.Player.Shooting.multiShot.lvl = 1
        Game.Player.Shooting.multiShot.value = 1
        Game.Player.Shooting.multiShot.maxLvl = upgrades.multiShot.maxFullAutoLvl
        Game.Player.Shooting.multiShot.prices = upgrades.multiShot.fullAutoPrices
        Game.Player.Shooting.multiShot.price = upgrades.multiShot.prices[0]
        drawMenu(Game)
      } else {
        const special = specials[i]
        if (!special) return
        if (special.choice) return
        if (Game.killCount < special.killCountRequired || Game.Player.money < special.price) return
        Game.Player.money -= special.price
        special.choice = Number(j.slice(-1))
        special[j].handler(Game)
        drawMenu(Game)
      }
    })

    e.addEventListener('mouseover', e => {
      const [i, j] = e.target.getAttribute('value').split(',')
      const special = specials[i]
      specialTooltipDiv.innerText = special[j].tooltipText
    })

    e.addEventListener('mouseleave', e => {
      specialTooltipDiv.innerText = ''
    })
  }
}

function getClassByChoice (choice, i) {
  if (!choice) return ''
  if (choice ===  i) return 'menu-specials-chosen'
  if (choice !==  i) return 'menu-specials-abandoned'
}

function getClassByFullAuto (Game) {
  if (Game.Player.Shooting.fullAuto) return 'menu-specials-chosen'
  if (Game.Player.Shooting.attackSpeed.lvl !== Game.Player.Shooting.attackSpeed.maxLvl ||
      Game.Player.Shooting.multiShot.lvl !== Game.Player.Shooting.multiShot.maxLvl) {
    return 'menu-specials-abandoned'
  }
}