import { Vec2 } from "./vec2";

export type Color = {
  r: number,
  g: number,
  b: number,
};

export type Planet = {
  position: Vec2,
  radius: number,
  mass: number,
  color: { r: number, g: number, b: number },
};

export const Planet = (
  position: Vec2,
  radius: number,
  color: Color,
): Planet => ({
  position,
  radius,
  mass: Math.PI * radius * radius * 10000000,
  color,
});