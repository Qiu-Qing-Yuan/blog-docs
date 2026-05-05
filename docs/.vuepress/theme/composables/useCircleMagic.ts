import { onMounted, onUnmounted } from "vue";

interface CircleOptions {
  color?: string;
  radius?: number;
  density?: number;
  clearOffset?: number;
}

interface CircleState {
  pos: { x: number; y: number };
  alpha: number;
  scale: number;
  speed: number;
  color: string;
  draw: () => void;
}

function circleMagic(options: CircleOptions): () => void {
  let width: number;
  let height: number;
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;
  let animateHeader = true;
  const circles: CircleState[] = [];
  let animationId: number;

  const settings: Required<CircleOptions> = {
    color: options.color ?? "rgba(255,255,255,.5)",
    radius: options.radius ?? 10,
    density: options.density ?? 0.3,
    clearOffset: options.clearOffset ?? 0.2,
  };

  let container = document.getElementById("bubbles") as HTMLElement;
  if (!container) {
    return () => {};
  }

  function initCanvas(): HTMLCanvasElement {
    const canvasElement = document.createElement("canvas");
    canvasElement.id = "homeTopCanvas";
    canvasElement.style.pointerEvents = "none";
    container.appendChild(canvasElement);
    if (canvasElement.parentElement) {
      canvasElement.parentElement.style.overflow = "hidden";
    }
    return canvasElement;
  }

  function scrollCheck() {
    animateHeader = document.body.scrollTop <= height;
  }

  function resize() {
    width = container.clientWidth;
    height = container.clientHeight;
    container.style.height = height + "px";
    canvas.width = width;
    canvas.height = height;
  }

  function randomColor(): string {
    const r = Math.floor(Math.random() * 255);
    const g = Math.floor(Math.random() * 255);
    const b = Math.floor(Math.random() * 255);
    const alpha = Math.random().toPrecision(2);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function createCircle(): CircleState {
    const state: CircleState = {
      pos: { x: 0, y: 0 },
      alpha: 0,
      scale: 0,
      speed: 0,
      color: "",
      draw: () => {},
    };

    function init() {
      state.pos.x = Math.random() * width;
      state.pos.y = height + Math.random() * 100;
      state.alpha = 0.1 + Math.random() * settings.clearOffset;
      state.scale = 0.1 + Math.random() * 0.2;
      state.speed = Math.random() * 0.6;
      state.color = settings.color === "random" ? randomColor() : settings.color;
    }

    init();

    state.draw = () => {
      if (state.alpha <= 0) {
        init();
      }
      state.pos.y -= state.speed;
      state.alpha -= 0.0005;
      ctx.beginPath();
      ctx.arc(state.pos.x, state.pos.y, state.scale * settings.radius, 0, 2 * Math.PI, false);
      ctx.fillStyle = state.color;
      ctx.fill();
      ctx.closePath();
    };

    return state;
  }

  function animate() {
    if (animateHeader) {
      ctx.clearRect(0, 0, width, height);
      for (const circle of circles) {
        circle.draw();
      }
    }
    animationId = requestAnimationFrame(animate);
  }

  // Init
  width = container.offsetWidth;
  height = container.offsetHeight - 120;

  canvas = initCanvas();
  canvas.width = width;
  canvas.height = height;
  canvas.style.position = "absolute";
  canvas.style.left = "0";
  canvas.style.bottom = "0";
  ctx = canvas.getContext("2d")!;

  for (let x = 0; x < width * settings.density; x++) {
    circles.push(createCircle());
  }

  animate();
  window.addEventListener("scroll", scrollCheck, false);
  window.addEventListener("resize", resize, false);

  // Return cleanup function
  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener("scroll", scrollCheck, false);
    window.removeEventListener("resize", resize, false);
    if (canvas && canvas.parentElement) {
      canvas.parentElement.removeChild(canvas);
    }
    circles.length = 0;
  };
}

export const useCircleMagic = () => {
  let cleanup: (() => void) | undefined;

  onMounted(() => {
    cleanup = circleMagic({
      radius: 15,
      density: 0.3,
      color: "random",
      clearOffset: 0.2,
    });
  });

  onUnmounted(() => {
    cleanup?.();
  });
};
