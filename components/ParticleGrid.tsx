'use client';
import { useEffect, useRef } from 'react';

export default function ParticleGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const GRID = 42;       // px between dots
    const DOT_R = 1.1;     // dot radius
    const MOUSE_R = 100;   // mouse influence radius

    let W = window.innerWidth;
    let H = Math.max(
      document.documentElement.scrollHeight,
      document.documentElement.clientHeight,
      window.innerHeight
    );
    let raf: number;
    let mouse = { x: -999, y: -999 };
    let scrollY = 0;

    canvas.width = W;
    canvas.height = H;

    type Dot = { x: number; y: number; phase: number; speed: number };
    const dots: Dot[] = [];

    const buildDots = () => {
      dots.length = 0;
      // Recalculate H to cover the entire page
      H = Math.max(
        document.documentElement.scrollHeight,
        document.documentElement.clientHeight,
        window.innerHeight
      );
      canvas.width = W;
      canvas.height = H;
      for (let x = GRID / 2; x < W; x += GRID) {
        for (let y = GRID / 2; y < H; y += GRID) {
          dots.push({ x, y, phase: Math.random() * Math.PI * 2, speed: 0.25 + Math.random() * 0.35 });
        }
      }
    };
    buildDots();

    let t = 0;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const my = mouse.y + scrollY;

      // Detect theme dynamically from data-theme attribute on root
      const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      const rgb = isDark ? '236,236,236' : '30,58,138';
      const baseA = isDark ? 0.09 : 0.14;

      for (const d of dots) {
        const dy = d.y + Math.sin(t * d.speed + d.phase) * 1.4;
        const dx2 = d.x - mouse.x;
        const dy2 = dy - my;
        const dist = Math.sqrt(dx2 * dx2 + dy2 * dy2);
        const boost = dist < MOUSE_R ? (1 - dist / MOUSE_R) * 0.22 : 0;
        ctx.beginPath();
        ctx.arc(d.x, dy, DOT_R, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},${baseA + boost})`;
        ctx.fill();
      }


      t += 0.007;
      raf = requestAnimationFrame(draw);
    };
    draw();

    const onResize = () => {
      W = window.innerWidth;
      buildDots();
    };
    const onMouse = (e: MouseEvent) => { mouse = { x: e.clientX, y: e.clientY }; };
    const onScroll = () => { scrollY = window.scrollY; };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouse);
    window.addEventListener('scroll', onScroll);

    // Watch for document body size changes (e.g. dynamic content loads)
    const resizeObserver = new ResizeObserver(() => {
      buildDots();
    });
    resizeObserver.observe(document.body);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('scroll', onScroll);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 0,
        opacity: 1,
      }}
    />
  );
}
