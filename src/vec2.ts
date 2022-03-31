
export class Vec2 {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public addMut({ x, y }: Vec2): void {
    this.x += x;
    this.y += y;
  }

  public add({ x, y }: Vec2): Vec2 {
    return vec2(this.x + x, this.y + y);
  }

  public subMut({ x, y }: Vec2): void {
    this.x -= x;
    this.y -= y;
  }

  public sub({ x, y }: Vec2): Vec2 {
    return vec2(this.x - x, this.y - y);
  }

  public timesMut(k: number): void {
    this.x *= k;
    this.y *= k;
  }

  public times(k: number): Vec2 {
    return vec2(this.x * k, this.y * k);
  }

  public divMut(k: number): void {
    this.x /= k;
    this.y /= k;
  }

  public div(k: number): Vec2 {
    return vec2(this.x / k, this.y / k);
  }

  public distSq({ x, y }: Vec2): number {
    return (x - this.x) ** 2 + (y - this.y) ** 2;
  }

  public dist(v: Vec2): number {
    return Math.sqrt(this.distSq(v));
  }

  public length(): number {
    return Math.sqrt(this.lengthSq());
  }

  public lengthSq(): number {
    return this.x ** 2 + this.y ** 2;
  }

  public normalize(): Vec2 {
    return this.div(this.length());
  }

  public normalizeMut(): void {
    this.divMut(this.length());
  }

  public copy({ x, y }: Vec2): void {
    this.x = x;
    this.y = y;
  }

  public clone(): Vec2 {
    return vec2(this.x, this.y);
  }

  public dot({ x, y }: Vec2): number {
    return this.x * x + this.y * y;
  }

  public reflect(normal: Vec2): Vec2 {
    return this.sub(normal.times(2 * this.dot(normal)));
  }
}

export const vec2 = (x: number, y: number) => new Vec2(x, y);