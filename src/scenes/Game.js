import Phaser from '../lib/phaser.js'

export default class Game extends Phaser.Scene {
  removedRobots = 0

  /**@type {Phaser.Physics.Arcade.Sprite} */
  female
  male
  adventure

  /**@type {Phaser.Physics.Arcade.StaticGroup} */
  zombies

  /**@type {Phaser.Physics.Arcade.StaticGroup} */
  robots

  /**@type {Phaser.Input.Mouse} */
  cursors

  /**@type {Phaser.GameObjects.Text} */
  removedRobotsNumText

  constructor() {
    super('game')
  }

  init() {}

  preload() {
    this.load.image('background', 'assets/background/bg_layer1.jpg')
    this.load.image('female', 'assets/female/female_standing.png')
    this.load.image('male', 'assets/male/male_standing.png')
    this.load.image('robot', 'assets/robot/robot_standing.png')
    this.load.image('zombie', 'assets/zombie/zombie_standing.png')
    this.load.image('adventurer', 'assets/adventurer/adventurer_standing.png')
  }

  create() {
    this.add.image(450, 260, 'background').scale = 1.65

    this.female = this.physics.add.sprite(140, 320, 'female')
    this.dragCharacters(this.female)

    this.male = this.physics.add.sprite(80, 420, 'male')
    this.dragCharacters(this.male)

    this.adventure = this.physics.add.sprite(200, 390, 'adventurer')
    this.dragCharacters(this.adventure)

    this.robots = this.physics.add.staticGroup()

    for (let i = 1; i < 20; i++) {
      const x = Phaser.Math.FloatBetween(0, 900)
      const y = Phaser.Math.FloatBetween(0, 500)

      /** @type {Phaser.Physics.Arcade.Sprite} */
      const robot = this.robots.create(x, y, 'robot')
      robot.scale = 0.4

      /** @type {Phaser.Physics.Arcade.StaticBody} */
      const robotBody = robot.body
      robotBody.updateFromGameObject()
    }

    this.physics.add.overlap(
      this.female,
      this.robots,
      this.handleKillRobots,
      undefined,
      this,
    )

    const style = {
      color: 'limegreen',
      fontSize: 52,
    }
    this.removedRobotsNumText = this.add
      .text(450, 20, 'Removed Robots: 0', style)
      .setScrollFactor(0)
      .setOrigin(0.5, 0)
  }

  update() {}

  // drag 콜백 함수 정의..
  /**@param {Phaser.GameObjects.Sprite} character  */
  dragCharacters(character) {
    character.setInteractive()
    this.input.setDraggable(character)
    this.input.on('drag', (pointer, gameObject, dragX, dragY) => {
      gameObject.x = dragX
      gameObject.y = dragY
    })
  }

  /**
   * @param {Phaser.Physics.Arcade.Sprite} female
   * @param {Phaser.Physics.Arcade.Sprite} robot
   */
  handleKillRobots(player, robot) {
    console.log('collide')
    this.robots.killAndHide(robot)

    this.physics.world.disableBody(robot.body)
  }
}
