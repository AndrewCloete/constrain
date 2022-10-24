export type Point = { x: number; y: number };
export type Line = { a: Point; b: Point };

const MININUM_RADIUS = 15;
const RADIUS = 50;

const start: Point = { x: RADIUS, y: -RADIUS };

function calcDistance(a: Point, b: Point): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function toRads(degrees: number) {
  return degrees * (Math.PI / 180);
}

function addPoints(a: Point, b: Point): Point {
  return { x: a.x + b.x, y: a.y + b.y };
}

function spericalToCart(distance: number, directionDeg: number): Point {
  const rads = toRads(directionDeg);
  const x = Math.cos(rads) * distance;
  const y = Math.sin(rads) * distance;
  return { x, y };
}

export type GameState = {
  steps: number;
  traveled: number;
  fromHome: number;
  temperature: number;
  efficiency: number;
  complete: boolean;
};

export function randomPoint(): Point {
  function randomInterval(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
  function randomSign(): number {
    return Math.random() - 0.5 > 0 ? 1 : -1;
  }
  // Set a random radius
  const randR = randomInterval(MININUM_RADIUS, RADIUS);
  // Set a random X in that radius
  const randX = randomInterval(-randR, randR);
  // Select one of the Y values that intersect the X and radius
  const calcY = Math.sqrt(randR ** 2 - randX ** 2) * randomSign();
  const point = { x: randX, y: calcY };
  return point;
}

export function newGoal(): Point {
  return addPoints(randomPoint(), start);
}

export class Game {
  private goal: Point;
  private threshold: number;
  private path: Point[];

  constructor(goal: Point) {
    this.goal = goal;
    this.threshold = 1;
    this.path = [start];
  }

  startPosition() {
    return this.path[0];
  }

  currentPosition() {
    return this.path[this.path.length - 1];
  }

  goalPosition() {
    return this.goal;
  }

  step(distance: number, directionDeg: number) {
    const move = spericalToCart(distance, directionDeg);
    const current = this.currentPosition();
    const newPoint = { x: current.x + move.x, y: current.y + move.y };
    this.path.push(newPoint);
  }

  travelDistance() {
    if (this.path.length <= 1) {
      return 0;
    }
    let distance = 0;
    let index = 0;
    let length = this.path.length;
    do {
      let current = this.path[index];
      let next = this.path[index + 1];
      distance += calcDistance(current, next);
      index++;
    } while (index < length - 1);
    return distance;
  }

  steps() {
    return this.path.length - 1;
  }

  vectorDistanceFromStart() {
    return calcDistance(this.startPosition(), this.currentPosition());
  }
  vectorDistanceToGoal() {
    return calcDistance(this.currentPosition(), this.goal);
  }

  efficiency(): number {
    // Add threshold to travel since the player gets it for "free"
    const travel = this.travelDistance() + 2;
    if (travel > 0) {
      return this.shortestDistance() / travel;
    }
    return 0;
  }

  complete() {
    return this.vectorDistanceToGoal() < this.threshold;
  }

  temperature() {
    const shortest = this.shortestDistance();
    const diff = this.vectorDistanceToGoal();
    return (shortest - diff) / shortest;
  }

  shortestDistance() {
    return calcDistance(this.startPosition(), this.goal);
  }

  getLines(): Line[] {
    const lines: Line[] = [];
    const len = this.path.length;
    for (let i = 0; i < len - 1; i++) {
      lines.push({ a: this.path[i], b: this.path[i + 1] });
    }
    return lines;
  }

  state(): GameState {
    return {
      steps: this.steps(),
      traveled: this.travelDistance(),
      fromHome: this.vectorDistanceFromStart(),
      temperature: this.temperature(),
      efficiency: this.efficiency(),
      complete: this.complete(),
    };
  }
}
