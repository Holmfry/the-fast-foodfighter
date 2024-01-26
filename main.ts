controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    music.play(music.createSoundEffect(WaveShape.Sawtooth, 1, 935, 255, 0, 100, SoundExpressionEffect.Vibrato, InterpolationCurve.Linear), music.PlaybackMode.UntilDone)
    projectile = sprites.createProjectileFromSprite(assets.image`shortburstweiner`, ship, 0, -140)
    projectile.startEffect(effects.coolRadial, 100)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprite.destroy()
    otherSprite.destroy(effects.disintegrate)
    info.changeScoreBy(1)
    music.play(music.createSoundEffect(WaveShape.Noise, 496, 57, 111, 0, 500, SoundExpressionEffect.Tremolo, InterpolationCurve.Logarithmic), music.PlaybackMode.UntilDone)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    otherSprite.destroy(effects.disintegrate)
    sprite.startEffect(effects.fire, 200)
    info.changeLifeBy(-1)
    music.play(music.createSoundEffect(WaveShape.Square, 101, 1, 255, 0, 100, SoundExpressionEffect.None, InterpolationCurve.Curve), music.PlaybackMode.UntilDone)
})
let projectile: Sprite = null
let ship: Sprite = null
scene.setBackgroundColor(15)
game.splash("The Fast Foodfighter", "Holmade Games 2024")
let asteroids = [
assets.image`pickle`,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . 4 4 4 e e . . . . 
    . . . . . 4 e 4 4 4 e 4 e . . . 
    . . . . 4 4 4 e . 4 4 4 4 . . . 
    . . . . 4 e . . . . . 4 4 . . . 
    . . . . 4 e . . . . . 4 4 . . . 
    . . . . 4 e . . . . . 4 e . . . 
    . . . . 4 4 4 e . . . 4 4 . . . 
    . . . . . 4 4 4 4 4 e 4 4 . . . 
    . . . . . . . 4 4 4 4 . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `,
assets.image`hamburger steve`,
assets.image`fries of all kiinz`,
assets.image`Dr DoNot`,
img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . e e e e . . . . . e 1 e e . . 
    . e e 1 e e . . . e e e e e e . 
    e e e e e e e . . e e e e e 1 . 
    e e e . . e e e e e e . e e e . 
    1 e e . . . e e e e . . . e e . 
    e e e . . . e 1 e e . . . e e . 
    e e e . . . e e e 1 . . . e . . 
    . e 1 e . . e e e e . . e e . . 
    . e e e e . e e e e e e e 1 . . 
    . . e e 1 e e . . e e e e . . . 
    . . . e e e e e e e e . . . . . 
    . . e e e . . . . e 1 e . . . . 
    . . 1 e e . . . . . e e 1 . . . 
    . . . . . . . . . . . . . . . . 
    `
]
ship = sprites.create(assets.image`CaptainSoosaj`, SpriteKind.Player)
ship.setStayInScreen(true)
ship.bottom = 120
controller.moveSprite(ship, 100, 100)
info.setLife(3)
effects.starField.startScreenEffect()
music.play(music.createSong(assets.song`DrumStart`), music.PlaybackMode.LoopingInBackground)
game.onUpdateInterval(500, function () {
    projectile = sprites.createProjectileFromSide(asteroids[randint(0, asteroids.length - 1)], 0, 75)
    projectile.setKind(SpriteKind.Enemy)
    projectile.x = randint(10, 150)
})
