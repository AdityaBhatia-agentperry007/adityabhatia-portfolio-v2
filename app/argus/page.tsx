'use client';
import Link from 'next/link';

export default function ArgusPage() {
  return (
    <div className="space-y-8 pt-4 select-none">
      <div className="flex justify-between items-center border-b border-[var(--border)] pb-4">
        <span className="font-mono text-xs text-[var(--text-3)]">// classified node</span>
        <span className="flex items-center space-x-2 font-mono text-[9px] text-emerald-500">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
          <span>ACTIVE PIPELINE</span>
        </span>
      </div>

      <div>
        <div className="font-mono text-xs text-[var(--text-3)]">// platform telemetry</div>
        <h1 className="font-sans font-bold text-4xl tracking-tight mt-1 text-[var(--text)]">Argus</h1>
        <p className="font-mono text-xs text-[var(--text-2)] mt-2">
          multi-camera surveillance ingestion & correlation engine
        </p>
      </div>

      <div className="border border-[var(--border)] p-6 bg-[var(--surface)] space-y-4 font-sans text-sm text-[var(--text-2)] leading-relaxed">
        <p>
          argus is built on top of the RT-correlation vision pipeline. it takes direct feeds from multiple localized IP surveillance cameras, ingests them asynchronously via background workers, and applies real-time object tracking models locally.
        </p>
        <p>
          instead of just storing footage like traditional CCTV systems, it evaluates movements, calculates path histories across camera positions, and creates unified logs showing trajectory timelines.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
        <div className="border border-[var(--border)] p-4 bg-[var(--surface)]">
          <div className="text-[var(--text-3)] mb-2 uppercase text-[9px] tracking-wider">// telemetry data</div>
          <ul className="space-y-2 text-[var(--text-2)]">
            <li>feeder count: 3 streams</li>
            <li>frame ingestion: 30 FPS</li>
            <li>latency: ~80ms local</li>
            <li>storage: local sqlite logs</li>
          </ul>
        </div>
        <div className="border border-[var(--border)] p-4 bg-[var(--surface)]">
          <div className="text-[var(--text-3)] mb-2 uppercase text-[9px] tracking-wider">// components</div>
          <ul className="space-y-2 text-[var(--text-2)]">
            <li>ingest: FFmpeg + RTSP</li>
            <li>inference: YOLO-TensorRT</li>
            <li>tracking: SORT Kalman</li>
            <li>dashboard: NextJS / React</li>
          </ul>
        </div>
      </div>

      <div className="border border-dashed border-[var(--border)] p-8 text-center bg-[var(--surface)]/50">
        <div className="font-mono text-xs text-[var(--accent)] animate-pulse">
          [ FEED VISUALIZER NOT RENDERED - EXTERNAL DISPLAY LOCK ]
        </div>
        <p className="text-[10px] text-[var(--text-3)] mt-2 max-w-xs mx-auto font-sans leading-relaxed">
          video interfaces are configured for local system monitors. web panels show structural stats only.
        </p>
      </div>
    </div>
  );
}
