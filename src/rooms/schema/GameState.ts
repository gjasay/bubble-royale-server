import { Schema, MapSchema, type, ArraySchema } from "@colyseus/schema";
import { BOOST_MAX, PLAYER_RADIUS, MAX_BUBBLE_RADIUS, TILE_SIZE, WORLD_WIDTH, WORLD_HEIGHT } from "../../../../util/Constants";

export class CircleEntity extends Schema {
  @type("number") x: number = 0;
  @type("number") y: number = 0;
  @type("number") radius: number = 0;

  constructor(x: number = 0, y: number = 0, radius: number = 0) {
    super();
    this.x = x;
    this.y = y;
    this.radius = radius;
  }
}

export class Player extends CircleEntity {
  @type("string") name = "";
  @type("string") color = "";
  @type("number") velocityX = 0;
  @type("number") velocityY = 0;
  @type("number") boost = BOOST_MAX;
  @type("boolean") boostEngaged = false;
  @type("number") score = 0;
  inputQueue: InputMessage[] = [];

  constructor(name: string) {
    super(0, 0, PLAYER_RADIUS);
    this.velocityX = 0.01;
    this.velocityY = 0.01;
    this.name = name;
  }
}

export class Tile extends Schema {
  @type("number") x: number = 0;
  @type("number") y: number = 0;
  @type("number") width: number = TILE_SIZE;
  @type("number") height: number = TILE_SIZE;

  constructor(
    x: number = 0,
    y: number = 0,
  ) {
    super();
    this.x = x;
    this.y = y;
  }
}

export class MyRoomState extends Schema {
  @type({ map: Player }) players = new MapSchema<Player>();
  @type(CircleEntity) bubble = new CircleEntity(WORLD_WIDTH / 2, WORLD_HEIGHT / 2, MAX_BUBBLE_RADIUS);
  @type([Tile]) tiles = new ArraySchema<Tile>();
  @type([CircleEntity]) collectible = new ArraySchema<CircleEntity>();
}
