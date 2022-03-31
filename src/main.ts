import { createPane, Params } from './pane';
import { createRenderer } from "./renderer";
import { createPinchZoomHandler } from "./zoompan";

const createApp = (width: number, height: number, params: Params, originalScale = 1) => {
  const cnv = document.querySelector('#cnv') as HTMLCanvasElement;
  const overlay = document.querySelector('#overlay') as HTMLCanvasElement;
  cnv.width = width;
  cnv.height = height;
  overlay.width = width;
  overlay.height = height;

  let isPanning = false;

  const options = {
    offset: { x: 0, y: 0 },
    scale: originalScale,
  };

  const screenToWorld = (
    x: number,
    y: number,
    s = options.scale
  ): [number, number] => {
    return [x / s + options.offset.x, y / s + options.offset.y];
  };

  const pinch = createPinchZoomHandler();

  const onPointerDown = (ev: PointerEvent): void => {
    ev.preventDefault();
    isPanning = true;
    overlay.style.cursor = 'grab';
    pinch.onPointerDown(ev);
  };

  const onPointerCancel = (ev?: PointerEvent): void => {
    ev?.preventDefault();
    isPanning = false;
    overlay.style.cursor = 'auto';
  };

  const onPointerUp = (ev: PointerEvent): void => {
    ev.preventDefault();
    onPointerCancel();
    pinch.onPointerUp(ev);
  };

  const renderer = createRenderer(cnv, params);

  const zoomOffset = (x: number, y: number, prevScale: number, newScale: number): [number, number] => {
    const [xBeforeZoom, yBeforeZoom] = screenToWorld(x, y, prevScale);
    const [xAfterZoom, yAfterZoom] = screenToWorld(x, y, newScale);
    return [xBeforeZoom - xAfterZoom, yBeforeZoom - yAfterZoom];
  };

  const setOffset = (x: number, y: number) => {
    options.offset.x = x;
    options.offset.y = y;
  };

  const minInterval = 1000 / 120;
  let lastUpdateTime = 0;

  const update = () => {
    const now = Date.now();

    if (now - lastUpdateTime >= minInterval) {
      lastUpdateTime = now;
      renderer.render(options.scale, options.offset);
    }
  };

  const onPointerMove = (ev: PointerEvent) => {
    ev.preventDefault();
    const [movementX, movementY] = pinch.movement(ev);

    if (pinch.isZooming()) {
      pinch.onPointerMove(ev);
    } else if (isPanning) {
      const k = 1;
      const x = options.offset.x - k * movementX / (width * options.scale * 0.5);
      const y = options.offset.y + k * movementY / (height * options.scale * 0.5);
      setOffset(x, y);
      update();
    }
  };

  const zoomInOut = (
    centerX: number,
    centerY: number,
    newScale: number
  ): void => {
    const [deltaX, deltaY] = zoomOffset(
      2 * (centerX / width - 0.5),
      2 * (-centerY / height + 0.5),
      options.scale,
      newScale
    );

    options.scale = newScale;
    options.offset.x += deltaX;
    options.offset.y += deltaY;
    update();
  };

  const onWheel = (e: WheelEvent) => {
    e.preventDefault();
    const newScale = options.scale * (e.deltaY < 0 ? 1.1 : 0.9);
    zoomInOut(e.clientX, e.clientY, newScale);
  };

  const onResize = (): void => {
    width = cnv.clientWidth;
    height = cnv.clientHeight;
    cnv.width = width;
    cnv.height = height;
    overlay.width = width;
    overlay.height = height;
    update();
  };

  overlay.addEventListener('pointerdown', onPointerDown);
  overlay.addEventListener('pointerup', onPointerUp);
  overlay.addEventListener('pointercancel', onPointerCancel);
  overlay.addEventListener('wheel', onWheel);
  overlay.addEventListener('pointermove', onPointerMove);
  window.addEventListener('resize', onResize);
  pinch.addPinchListener(zoomInOut);

  update();

  return {
    updateParams: (newParams: Params): void => {
      renderer.updateParams(newParams);
      params = newParams;
      update();
    }
  };
};

(async () => {
  const pane = createPane();
  const app = createApp(
    window.innerWidth,
    window.innerHeight,
    pane.params(),
    1
  );

  pane.onChange(app.updateParams);
})();