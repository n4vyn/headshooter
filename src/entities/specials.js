// todo convert this into a class as well, maybe some SpecialsManager

export const specials = [{
  type: 'Q',
  killCountRequired: 500,
  price: 5000,
  special1: {
    name: 'Laser Star',
    tooltipText: 'Fire laser beams in 8 directions, spinning and doing massive damage.',
    handler: (Game) => { 
      Game.Player.special.choice = 1
      Game.Player.special.remainingCooldown = 0
      document.getElementById('Q').innerText = 'Laser Star'
    }
  },
  special2: {
    name: 'Shock Vortex',
    tooltipText: 'Unleash a shock vorex, pushing enemies away from you.',
    handler: (Game) => { 
      Game.Player.special.choice = 2
      Game.Player.special.remainingCooldown = 0
      document.getElementById('Q').innerText = 'Shock Vortex'
    }
  }
}, {
  type: 'dash',
  killCountRequired: 1000,
  price: 10000,
  special1: {
    name: 'Half Cooldown',
    tooltipText: 'Half the cooldown of your dash ability.',
    handler: (Game) => { Game.Player.dash.special = 1 }
  },
  special2: {
    name: 'Invinciblity Dash',
    tooltipText: 'Gain invincibility while dashing.',
    handler: (Game) => { Game.Player.dash.special = 2 }
  }
}, { 
  type: 'shooting',  
  killCountRequired: 2500,
  price: 20000,
  special1: { 
    name: 'Piercing Shots',
    tooltipText: 'Your bullets penetrate enemies, doing half damage for each subsequent enemy hit.',
    handler: (Game) => { Game.Player.Shooting.specials[0] = 1}
  },
  special2: {
    name: 'Crippling Shots',
    tooltipText: 'Your bullets cripple enemies, slowing their movement by 50% and making them take 5% of their max HP each second.',
    handler: (Game) => { Game.Player.Shooting.specials[0] = 2}
  },
}, {
  type: 'shooting',
  killCountRequired: 10000,
  price: 50000,
  special1: {
    name: 'Rear Shots',
    tooltipText: 'This sounds sucky as a choose one bonus, might move it to the left with full auto.',
    handler: (Game) => { Game.Player.Shooting.specials[1] = 1}
  },
  special2: {
    name: 'Ignite Shots',
    tooltipText: 'This is just garbage, dot effect is already in crippling shots.',
    handler: (Game) => { Game.Player.Shooting.specials[1] = 2}
  }
}]