export class Player {
  number: number;
  name: string;
  score: number;
  physics: Phaser.Physics.Arcade.ArcadePhysics;
  buildings: Phaser.Physics.Arcade.StaticGroup;
  gameObject: Phaser.Physics.Arcade.Image;
  playerGroup: Phaser.Physics.Arcade.Group;

  constructor(
    physics: Phaser.Physics.Arcade.ArcadePhysics,
    buildings: Phaser.Physics.Arcade.StaticGroup,
    playerGroup: Phaser.Physics.Arcade.Group,
  ) {
    this.playerGroup = playerGroup;
    const playerNumber = this.playerGroup ? this.playerGroup.getChildren().length ? 1 : 0 : 0
    this.number = playerNumber;
    this.physics = physics;
    this.buildings = buildings;
    this.name = `Player ${this.number}`;
    this.score = 0;

    const goalBuilding = this.determineGoalBuilding();

    const player = this.physics.add.image(goalBuilding.x, 0, 'rat').setScale(0.7);
    this.gameObject = player;
    // todo fix scale for real sprite
    // todo figure out if we need a group or the game object or if we can use one or the other. 
    this.gameObject.body?.setSize(126, 179);
    this.gameObject.body?.setOffset(0, 0);
    this.playerGroup.add(player);
    this.setupPlayerPhysics();
  }

  determineGoalBuilding() {
    const buildingCount = this.buildings.getChildren().length;
    

    const whichBuilding = this.number === 0 ? 1 : buildingCount - 2;
    
    return this.buildings.getChildren()[
      whichBuilding
    ] as Phaser.Physics.Arcade.Image;
  }

  resetPlayer() {
    const goalBuilding = this.determineGoalBuilding();

    // todo do we need anymore?
    this.gameObject.setPosition(goalBuilding.x, 0);
    this.gameObject.setVelocity(0, 0);
    this.gameObject.setAcceleration(0, 0);
  }

  setupPlayerPhysics() {
    this.gameObject.setBounce(0.2);
    this.gameObject.setCollideWorldBounds(true);
    this.physics.add.collider(this.gameObject, this.buildings);
  }
}
