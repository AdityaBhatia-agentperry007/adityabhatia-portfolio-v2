'use client';
import { useEffect, useRef } from 'react';

export default function AsciiDonut() {
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    const pre = preRef.current;
    if (!pre) return;

    let A = 0;
    let B = 0;
    let raf: number;

    let isVisible = true;
    const observer = new IntersectionObserver((entries) => {
      isVisible = entries[0].isIntersecting;
    });
    if (pre) observer.observe(pre);

    const render = () => {
      if (isVisible) {
        const b: string[] = [];
        const z: number[] = [];
        const width = 40;
        const height = 22;

        for (let k = 0; k < width * height; k++) {
          b[k] = k % width === width - 1 ? '\n' : ' ';
          z[k] = 0;
        }

        for (let j = 0; j < 6.28; j += 0.07) {
          for (let i = 0; i < 6.28; i += 0.02) {
            const c = Math.sin(i);
            const d = Math.cos(j);
            const e = Math.sin(A);
            const f = Math.sin(j);
            const g = Math.cos(A);
            const h = d + 2;
            const D = 1 / (c * h * e + f * g + 5);
            const l = Math.cos(i);
            const m = Math.cos(B);
            const n = Math.sin(B);
            const t = c * h * g - f * e;

            const x = Math.floor(width / 2 + (width / 2.5) * D * (l * h * m - t * n));
            const y = Math.floor(height / 2 + (height / 2.5) * D * (l * h * n + t * m));
            const o = x + width * y;
            const N = Math.floor(8 * ((f * e - c * d * g) * m - c * d * e - f * g - l * d * n));

            if (y > 0 && y < height && x > 0 && x < width && D > z[o]) {
              z[o] = D;
              b[o] = '.,-~:;=!*#$@'[N > 0 ? N : 0];
            }
          }
        }

        // Detect theme
        const isDark = document.documentElement.getAttribute('data-theme') !== 'light';

        if (pre) {
          pre.textContent = b.join('');
          pre.style.color = isDark ? '#ececec' : '#171717';
        }

        A += 0.04;
        B += 0.02;
      }
      
      raf = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="terminal-box">
      <div className="terminal-header border-b border-[var(--border)]">
        <span className="font-mono text-[9px] text-[var(--text-3)] uppercase tracking-wider">
          donut.c
        </span>
      </div>
      <div className="flex items-center justify-center p-3" style={{ background: 'var(--code-bg)' }}>
        <pre
          ref={preRef}
          className="font-mono leading-none select-none"
          style={{ fontSize: '10px', letterSpacing: '2px', lineHeight: '12px' }}
        />
      </div>
    </div>
  );
}
