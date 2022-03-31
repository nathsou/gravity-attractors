import { randomInt } from "./rand";
import { vec2, Vec2 } from "./vec2";

export type Circle = {
  center: Vec2,
  radius: number,
};

const MIN_DIST_BETWEEN_PLANETS = 0.1;

const circlesTooClose = (a: Circle, b: Circle) => {
  return a.center.distSq(b.center) <= (a.radius + b.radius + MIN_DIST_BETWEEN_PLANETS) ** 2;
};

type CirclePackingStrategy = 'retry' | 'shrink' | 'exact';

const randomCircle = (
  minRadius: number,
  maxRadius: number,
  width: number,
  height: number,
): Circle => {
  return {
    center: vec2(randomInt(0, width), randomInt(0, height)),
    radius: randomInt(minRadius, maxRadius),
  };
};

const packCircle = (
  circles: Circle[],
  minRadius: number,
  maxRadius: number,
  width: number,
  height: number,
  strategy: CirclePackingStrategy
) => {
  const strategies = {
    retry: (): Circle => {
      const c = randomCircle(minRadius, maxRadius, width, height);

      if (circles.some(c2 => circlesTooClose(c, c2))) {
        return strategies.retry();
      }

      return c;
    },
    shrink: (): Circle => {
      const c = randomCircle(minRadius, maxRadius, width, height);

      while (circles.some(c2 => circlesTooClose(c, c2)) && c.radius >= minRadius) {
        c.radius -= 1;
      }

      if (c.radius < minRadius) {
        return strategies.shrink();
      }

      return c;
    },
    exact: (): Circle => {
      const center = vec2(randomInt(0, width), randomInt(0, height));
      const radius = Math.min(
        randomInt(minRadius, maxRadius),
        ...circles.map(c2 => c2.center.dist(center) - c2.radius)
      );

      if (radius < minRadius + MIN_DIST_BETWEEN_PLANETS) {
        return strategies.exact();
      }

      return { center, radius };
    }
  };

  return strategies[strategy]();
};

export const packCircles = (
  count: number,
  minRadius: number,
  maxRadius: number,
  width: number,
  height: number,
  strategy: CirclePackingStrategy
): Circle[] => {
  const circles: Circle[] = [];

  for (let i = 0; i < count; i++) {
    circles.push(packCircle(
      circles,
      minRadius,
      maxRadius,
      width,
      height,
      strategy
    ));
  }

  return circles;
};
