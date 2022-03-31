import { Pane } from "tweakpane";
import { packCircles } from "./packing";
import { Planet } from "./planet";
import { randomColor } from "./rand";

export interface Params {
  colorShift: number,
  brightnessFactor: number,
  maxIterations: number,
  deltaT: number,
  planets: Planet[],
}

export const createPane = () => {
  const params = {
    'color shift': 1.6,
    // 'max iterations': 100,
    'max iterations': 1,
    'brightness factor': 4,
    'Δt': 0.01,
    'planets count': 3,
  };

  const pane = new Pane({
    container: document.querySelector('#pane') as HTMLElement,
    title: 'parameters'
  });

  const genPlanets = (count: number) => {
    const circles = packCircles(
      count,
      20,
      400,
      window.innerWidth,
      window.innerHeight,
      'retry'
    );

    return circles.map(c => Planet(
      c.center.div(400),
      c.radius / 400,
      randomColor(),
    ));
  };

  let prevPlanets: Planet[] = [];

  const genParams = (ps: typeof params): Params => ({
    colorShift: ps['color shift'],
    brightnessFactor: -ps['brightness factor'],
    maxIterations: ps['max iterations'],
    deltaT: ps['Δt'],
    planets: (() => {
      const count = ps['planets count'];
      if (prevPlanets.length === count) {
        return prevPlanets
      } else {
        prevPlanets = genPlanets(count);
        return prevPlanets;
      }
    })(),
  });

  pane.addInput(
    params,
    'color shift',
    { min: 0, max: Math.PI }
  );

  pane.addInput(
    params,
    'brightness factor',
    { min: 0.01, max: 12 }
  );

  pane.addInput(
    params,
    'max iterations',
    { min: 1, max: 1000, step: 1 }
  );

  pane.addInput(
    params,
    'Δt',
    { min: 0.00001, max: 0.1 }
  );

  pane.addInput(
    params,
    'planets count',
    { min: 1, max: 100, step: 1 }
  );

  const btn = pane.addButton({
    title: 'save image'
  });

  btn.on('click', () => {
    const downloadLink = document.querySelector('#download-link') as HTMLAnchorElement;
    const cnv = document.querySelector('#cnv') as HTMLCanvasElement;
    downloadLink.href = cnv.toDataURL('image/png');
    console.log(downloadLink.href);
    downloadLink.click();
  });

  return {
    params: () => genParams(params),
    onChange: (handler: (params: Params) => void) => {
      pane.on('change', () => {
        handler(genParams(params));
      });
    },
  };
};