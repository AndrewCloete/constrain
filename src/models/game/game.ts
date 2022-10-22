type Point = { x: number; y: number };

const start: Point = { x: 0, y: 0 };

function calcDistance(a: Point, b: Point): number {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

function toRads(degrees: number) {
  return degrees * (Math.PI / 180);
}

function spericalToCart(distance: number, directionDeg: number): Point {
  const rads = toRads(directionDeg);
  const x = Math.cos(rads) * distance;
  const y = Math.sin(rads) * distance;
  return { x, y };
}

export class Terrain {
  private goal: Point;
  private threshold: number;
  private path: Point[];

  constructor(goal: Point) {
    this.goal = goal;
    this.threshold = 0.1;
    this.path = [start];
  }

  startPosition() {
    return this.path[0]
  }

  currentPosition() {
    return this.path[this.path.length - 1];
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

  vectorDistanceFromStart() {
    return calcDistance(this.startPosition(), this.currentPosition())
  }

  shortestDistance() {
    return calcDistance(this.startPosition(), this.goal);
  }
}
