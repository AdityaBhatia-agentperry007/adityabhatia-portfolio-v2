'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumb() {
  const pathname = usePathname();
  if (pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);

  return (
    <div className="font-mono text-[10px] tracking-wider uppercase text-[var(--text-3)] py-4 mb-6 select-none">
      <Link href="/" className="hover:text-[var(--text)] transition-colors">
        aditya
      </Link>
      {segments.map((seg, index) => {
        const url = '/' + segments.slice(0, index + 1).join('/');
        const isLast = index === segments.length - 1;
        const displayLabel = seg.replace(/-/g, ' ');

        return (
          <span key={url}>
            <span className="mx-2 text-neutral-600">/</span>
            {isLast ? (
              <span className="text-[var(--text-2)]">{displayLabel}</span>
            ) : (
              <Link href={url} className="hover:text-[var(--text)] transition-colors">
                {displayLabel}
              </Link>
            )}
          </span>
        );
      })}
    </div>
  );
}
